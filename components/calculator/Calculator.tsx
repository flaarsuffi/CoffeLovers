"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Grao, Intensidade, Metodo, Receita } from "@/lib/types";
import { montarReceita } from "@/lib/data";
import { gramas, mililitros } from "@/lib/format";
import { lerSessao, salvarSessao, type ReceitaSalva } from "@/lib/sessao";
import { AGUA_MAX, AGUA_MIN, RecipeForm } from "./RecipeForm";
import { RecipeResult } from "./RecipeResult";
import { PreparationGuide } from "./PreparationGuide";

const AGUA_PADRAO = 350;

const INTENSIDADES_VALIDAS: Intensidade[] = [
  "leve",
  "equilibrado",
  "intenso",
];

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

  /*
   * A seleção salva é aplicada depois da hidratação: sessionStorage não existe
   * no servidor, e ler durante o render faria o HTML divergir.
   * A query string tem precedência — quem veio de um catálogo pediu aquilo
   * explicitamente; a sessão só preenche o que a URL não trouxe.
   */
  useEffect(() => {
    const salvo = lerSessao();
    if (!salvo) return;

    if (
      !params.get("metodo") &&
      metodos.some((m) => m.id === salvo.metodoId)
    ) {
      setMetodoId(salvo.metodoId!);
    }
    if (!params.get("grao") && salvo.graoId !== undefined) {
      setGraoId(graos.some((g) => g.id === salvo.graoId) ? salvo.graoId : "");
    }
    if (salvo.aguaMl && aguaEhValida(String(salvo.aguaMl))) {
      setAguaMl(salvo.aguaMl);
      setAguaTexto(String(salvo.aguaMl));
    }
    if (salvo.intensidade && INTENSIDADES_VALIDAS.includes(salvo.intensidade)) {
      setIntensidade(salvo.intensidade);
    }
    // Só na montagem: depois disso o estado da tela é a fonte da verdade.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const aguaValida = aguaEhValida(aguaTexto);

  /*
   * Persistir é uma reação ao que a pessoa fez, não ao estado em tela.
   * Salvar dentro de um efeito sobre o estado gravaria também a montagem,
   * apagando a sessão anterior com os valores padrão antes de o efeito de
   * leitura aplicar o que foi recuperado.
   */
  const persistir = (mudanca: Partial<ReceitaSalva>) => {
    salvarSessao({ metodoId, graoId, aguaMl, intensidade, ...mudanca });
  };

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
    persistir({ metodoId: id });
    anunciar(montarReceita(id, graoId || null, aguaMl, intensidade));
  };

  const handleGrao = (id: string) => {
    setGraoId(id);
    persistir({ graoId: id });
    anunciar(montarReceita(metodoId, id || null, aguaMl, intensidade));
  };

  const handleIntensidade = (valor: Intensidade) => {
    setIntensidade(valor);
    persistir({ intensidade: valor });
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
    persistir({ aguaMl: valor });
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
