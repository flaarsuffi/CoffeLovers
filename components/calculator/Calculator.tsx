"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Grao, Intensidade, Metodo, Receita } from "@/lib/types";
import { montarReceita } from "@/lib/data";
import { gramas, mililitros } from "@/lib/format";
import { AGUA_MAX, AGUA_MIN, RecipeForm } from "./RecipeForm";
import { RecipeResult } from "./RecipeResult";
import { PreparationGuide } from "./PreparationGuide";

const AGUA_PADRAO = 350;

function aguaEhValida(texto: string): boolean {
  const n = Number(texto);
  return (
    texto.trim() !== "" &&
    Number.isInteger(n) &&
    n >= AGUA_MIN &&
    n <= AGUA_MAX
  );
}

interface Props {
  metodos: Metodo[];
  graos: Grao[];
}

export function Calculator({ metodos, graos }: Props) {
  const params = useSearchParams();

  // Métodos e grãos podem chegar pré-selecionados pelos catálogos.
  const metodoInicial =
    metodos.find((m) => m.id === params.get("metodo"))?.id ?? metodos[0].id;
  const graoInicial = graos.find((g) => g.id === params.get("grao"))?.id ?? "";

  const [metodoId, setMetodoId] = useState(metodoInicial);
  const [graoId, setGraoId] = useState(graoInicial);
  const [aguaTexto, setAguaTexto] = useState(String(AGUA_PADRAO));
  const [aguaMl, setAguaMl] = useState(AGUA_PADRAO);
  const [intensidade, setIntensidade] = useState<Intensidade>("equilibrado");
  const [guiaAberto, setGuiaAberto] = useState(false);
  const [anuncio, setAnuncio] = useState("");

  const botaoGuiaRef = useRef<HTMLButtonElement>(null);

  const aguaValida = aguaEhValida(aguaTexto);

  const receita = useMemo(
    () => montarReceita(metodoId, graoId || null, aguaMl, intensidade),
    [metodoId, graoId, aguaMl, intensidade]
  );

  const anunciar = useCallback((r: Receita | null) => {
    if (!r) return;
    setAnuncio(
      r.cafeG === null
        ? "Receita para Moka: use a capacidade da sua cafeteira."
        : `Receita atualizada: ${gramas(r.cafeG)} gramas de café para ${mililitros(
            r.aguaMl
          )} mililitros de água. Método ${r.metodo.nome}.`
    );
  }, []);

  const handleMetodo = (id: string) => {
    setMetodoId(id);
    anunciar(montarReceita(id, graoId || null, aguaMl, intensidade));
  };

  const handleGrao = (id: string) => {
    setGraoId(id);
    anunciar(montarReceita(metodoId, id || null, aguaMl, intensidade));
  };

  const handleIntensidade = (valor: Intensidade) => {
    setIntensidade(valor);
    anunciar(montarReceita(metodoId, graoId || null, aguaMl, valor));
  };

  /*
   * Um volume inválido não substitui o último válido: a receita exibida
   * continua coerente enquanto o campo mostra o erro.
   * `commit` separa o arrastar do slider (silencioso) do fim da interação,
   * para não anunciar a cada pixel.
   */
  const handleAgua = (texto: string, commit: boolean) => {
    setAguaTexto(texto);
    if (!aguaEhValida(texto)) return;

    const valor = Number(texto);
    setAguaMl(valor);
    if (commit) {
      anunciar(montarReceita(metodoId, graoId || null, valor, intensidade));
    }
  };

  const alternarGuia = () => setGuiaAberto((aberto) => !aberto);

  const fecharGuia = () => {
    setGuiaAberto(false);
    botaoGuiaRef.current?.focus();
  };

  if (!receita) return null;

  return (
    <>
      <div className="cl-workspace">
        <RecipeForm
          metodos={metodos}
          graos={graos}
          metodoId={metodoId}
          graoId={graoId}
          aguaTexto={aguaTexto}
          aguaValida={aguaValida}
          intensidade={intensidade}
          semCalculo={receita.cafeG === null}
          onMetodo={handleMetodo}
          onGrao={handleGrao}
          onAguaTexto={handleAgua}
          onIntensidade={handleIntensidade}
        />

        <RecipeResult
          receita={receita}
          guiaAberto={guiaAberto}
          anuncio={anuncio}
          botaoRef={botaoGuiaRef}
          onAlternarGuia={alternarGuia}
        />
      </div>

      <PreparationGuide
        metodo={receita.metodo}
        aberto={guiaAberto}
        onFechar={fecharGuia}
      />
    </>
  );
}
