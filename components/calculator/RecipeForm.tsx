"use client";

import type { Grao, Intensidade, Metodo } from "@/lib/types";
import { mililitros } from "@/lib/format";

const SEM_GRAO = "";

const INTENSIDADES: { valor: Intensidade; rotulo: string }[] = [
  { valor: "leve", rotulo: "Mais leve" },
  { valor: "equilibrado", rotulo: "Equilibrado" },
  { valor: "intenso", rotulo: "Mais intenso" },
];

export const AGUA_MIN = 100;
export const AGUA_MAX = 1000;

interface Props {
  metodos: Metodo[];
  graos: Grao[];
  metodoId: string;
  graoId: string;
  aguaTexto: string;
  aguaValida: boolean;
  intensidade: Intensidade;
  semCalculo: boolean;
  onMetodo: (id: string) => void;
  onGrao: (id: string) => void;
  onAguaTexto: (texto: string, commit: boolean) => void;
  onIntensidade: (valor: Intensidade) => void;
}

export function RecipeForm({
  metodos,
  graos,
  metodoId,
  graoId,
  aguaTexto,
  aguaValida,
  intensidade,
  semCalculo,
  onMetodo,
  onGrao,
  onAguaTexto,
  onIntensidade,
}: Props) {
  return (
    <section className="cl-form" aria-labelledby="cl-form-title">
      <div className="cl-section-label">
        <h2 id="cl-form-title">Vamos preparar?</h2>
        <span>O resultado muda com você</span>
      </div>

      <div className="cl-fields">
        <div>
          <label className="cl-label" htmlFor="cl-method">
            Método
          </label>
          <select
            id="cl-method"
            value={metodoId}
            onChange={(e) => onMetodo(e.target.value)}
          >
            {metodos.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="cl-label" htmlFor="cl-grain">
            Grão <span>· opcional</span>
          </label>
          <select
            id="cl-grain"
            value={graoId}
            onChange={(e) => onGrao(e.target.value)}
          >
            <option value={SEM_GRAO}>Não sei meu grão</option>
            {graos.map((g) => (
              <option key={g.id} value={g.id}>
                {g.nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      {semCalculo ? (
        <div>
          <p className="cl-note" style={{ fontSize: 14, marginTop: 22 }}>
            Na Moka, a quantidade depende do tamanho da sua cafeteira.
          </p>
          <p className="cl-note" style={{ fontSize: 13 }}>
            Use o reservatório e o funil como referência, seguindo as
            orientações do fabricante.
          </p>
        </div>
      ) : (
        <div>
          <div className="cl-water">
            <div className="cl-water-heading">
              <label className="cl-label" htmlFor="cl-water">
                Água para o preparo
              </label>
              <div className="cl-number">
                <input
                  id="cl-water"
                  type="number"
                  min={AGUA_MIN}
                  max={AGUA_MAX}
                  step={1}
                  inputMode="numeric"
                  value={aguaTexto}
                  aria-describedby="cl-water-error"
                  aria-invalid={!aguaValida}
                  onChange={(e) => onAguaTexto(e.target.value, false)}
                  onBlur={(e) => onAguaTexto(e.target.value, true)}
                />
                <span>ml</span>
              </div>
            </div>

            <input
              id="cl-slider"
              type="range"
              min={AGUA_MIN}
              max={AGUA_MAX}
              step={1}
              value={aguaValida ? aguaTexto : AGUA_MIN}
              aria-label="Ajustar água em mililitros"
              onChange={(e) => onAguaTexto(e.target.value, false)}
              onPointerUp={(e) => onAguaTexto(e.currentTarget.value, true)}
              onKeyUp={(e) => onAguaTexto(e.currentTarget.value, true)}
            />

            <div className="cl-scale">
              <span>{mililitros(AGUA_MIN)} ml</span>
              <span>1 litro</span>
            </div>

            <p id="cl-water-error" className="cl-error" role="alert" hidden={aguaValida}>
              Use um volume entre {mililitros(AGUA_MIN)} e {mililitros(AGUA_MAX)} ml.
            </p>
          </div>

          <div className="cl-preference">
            <span className="cl-label">Como você gosta?</span>
            <div className="cl-segments" role="group" aria-label="Intensidade do café">
              {INTENSIDADES.map(({ valor, rotulo }) => (
                <button
                  key={valor}
                  type="button"
                  aria-pressed={intensidade === valor}
                  onClick={() => onIntensidade(valor)}
                >
                  {rotulo}
                </button>
              ))}
            </div>
          </div>

          <p className="cl-note">
            A receita base segue o método. O grão é opcional.
          </p>
        </div>
      )}
    </section>
  );
}
