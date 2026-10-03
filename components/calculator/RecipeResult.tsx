"use client";

import type { RefObject } from "react";
import { ArrowUpRight, CircleDot, Clock3 } from "lucide-react";
import type { Intensidade, Receita } from "@/lib/types";
import { gramas, mililitros } from "@/lib/format";

const RESUMO_INTENSIDADE: Record<Intensidade, string> = {
  leve: "mais leve",
  equilibrado: "equilibrada",
  intenso: "mais intensa",
};

interface Props {
  receita: Receita;
  guiaAberto: boolean;
  anuncio: string;
  botaoRef: RefObject<HTMLButtonElement>;
  onAlternarGuia: () => void;
}

export function RecipeResult({
  receita,
  guiaAberto,
  anuncio,
  botaoRef,
  onAlternarGuia,
}: Props) {
  const { metodo, grao, aguaMl, intensidade, proporcao, cafeG } = receita;
  const semCalculo = cafeG === null;

  return (
    <section className="cl-recipe" aria-labelledby="cl-result-title">
      <div className="cl-recipe-top">
        <h2 id="cl-result-title">
          <span className="cl-live-dot" />
          Sua próxima xícara
        </h2>
        <span className="cl-recipe-method">{metodo.nome}</span>
      </div>

      {semCalculo ? (
        <div className="cl-moka-info">
          <strong>
            Cada tamanho,
            <br />
            uma medida.
          </strong>
          Água abaixo da válvula. Café no funil, sem prensar. Respeite a
          capacidade da sua cafeteira.
        </div>
      ) : (
        <div>
          <div className="cl-recipe-grain">
            {grao ? grao.nome : "Receita base"} ·{" "}
            {RESUMO_INTENSIDADE[intensidade]}
          </div>

          <div className="cl-amounts">
            <div className="cl-amount">
              <strong>{gramas(cafeG)}</strong>
              <span>g</span>
              <p>de café</p>
            </div>
            <div className="cl-amount">
              <strong className="cl-water-total">{mililitros(aguaMl)}</strong>
              <span>ml</span>
              <p>de água</p>
            </div>
          </div>

          <div className="cl-ratio">
            <span>Proporção</span>
            <strong>1:{proporcao}</strong>
            <span>· café : água</span>
          </div>

          <div className="cl-specs">
            <div className="cl-spec">
              <CircleDot aria-hidden="true" />
              <div>
                <span>Moagem</span>
                <strong>{metodo.moagem}</strong>
              </div>
            </div>
            <div className="cl-spec">
              <Clock3 aria-hidden="true" />
              <div>
                <span>Tempo de preparo</span>
                <strong>{metodo.tempo}</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        ref={botaoRef}
        className="cl-primary"
        type="button"
        aria-expanded={guiaAberto}
        aria-controls="cl-guide"
        onClick={onAlternarGuia}
      >
        <span>{guiaAberto ? "Ocultar passo a passo" : "Ver como preparar"}</span>
        <ArrowUpRight aria-hidden="true" />
      </button>

      <div className="cl-recipe-foot">
        Uma receita inicial. O melhor ajuste é o seu.
      </div>

      <p
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clipPath: "inset(50%)",
        }}
      >
        {anuncio}
      </p>
    </section>
  );
}
