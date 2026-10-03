import metodosRaw from "@/data/metodos.json";
import graosRaw from "@/data/graos.json";
import coffeeRatiosRaw from "@/coffee-ratios.json";
import type { Grao, Intensidade, Metodo, Receita } from "@/lib/types";

export const metodos = metodosRaw.metodos as Metodo[];
export const graos = graosRaw.graos as Grao[];

/** Variedades, sem a espécie — é o que o catálogo e o seletor listam. */
export const variedades = graos.filter((g) => g.tipo === "variedade");

export function getMetodo(id: string): Metodo | undefined {
  return metodos.find((m) => m.id === id);
}

export function getGrao(id: string): Grao | undefined {
  return graos.find((g) => g.id === id);
}

export function getAllGraoIds() {
  return graos.map((g) => ({ slug: g.id }));
}

/*
 * coffee-ratios.json é o resultado da pesquisa de proporções por grão × método.
 * Ele nomeia dois métodos de forma diferente do design system, daí o alias.
 * "Coado de papel" não foi pesquisado e cai na proporção base do método.
 */
const ALIAS_METODO_PESQUISA: Record<string, string> = {
  prensa: "french-press",
  moka: "italiana",
};

interface RatioPesquisado {
  grão_id: string;
  método_id: string;
  proporção_base: string;
}

const ratiosPesquisados = coffeeRatiosRaw as RatioPesquisado[];

function proporcaoPesquisada(graoId: string, metodoId: string): number | null {
  const metodoNaPesquisa = ALIAS_METODO_PESQUISA[metodoId] ?? metodoId;
  const achado = ratiosPesquisados.find(
    (r) => r.grão_id === graoId && r.método_id === metodoNaPesquisa
  );
  if (!achado) return null;

  const denominador = Number(achado.proporção_base.split(":")[1]);
  return Number.isFinite(denominador) && denominador > 0 ? denominador : null;
}

const AJUSTE_INTENSIDADE: Record<Intensidade, number> = {
  leve: 1,
  equilibrado: 0,
  intenso: -1,
};

/**
 * Monta a receita.
 *
 * A proporção parte do método. Quando existe pesquisa para o par grão × método,
 * ela substitui a base. A intensidade então soma 1 (mais leve) ou subtrai 1
 * (mais intenso) do denominador.
 */
export function montarReceita(
  metodoId: string,
  graoId: string | null,
  aguaMl: number,
  intensidade: Intensidade
): Receita | null {
  const metodo = getMetodo(metodoId);
  if (!metodo) return null;

  const grao = graoId ? getGrao(graoId) ?? null : null;

  if (metodo.proporcao === null) {
    return {
      metodo,
      grao,
      aguaMl,
      intensidade,
      proporcao: null,
      cafeG: null,
      ajustadaPeloGrao: false,
    };
  }

  const pesquisada = grao ? proporcaoPesquisada(grao.id, metodo.id) : null;
  const base = pesquisada ?? metodo.proporcao;
  const proporcao = base + AJUSTE_INTENSIDADE[intensidade];

  return {
    metodo,
    grao,
    aguaMl,
    intensidade,
    proporcao,
    cafeG: aguaMl / proporcao,
    ajustadaPeloGrao: pesquisada !== null && pesquisada !== metodo.proporcao,
  };
}
