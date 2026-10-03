import { describe, expect, it } from "vitest";
import { montarReceita } from "@/lib/data";

/*
 * O cálculo combina duas fontes: a proporção base de cada método, vinda do
 * design system, e a pesquisa por par grão × método em coffee-ratios.json.
 * Estes testes fixam o comportamento dessa combinação.
 */

const receita = (metodo: string, grao: string | null, agua = 350) =>
  montarReceita(metodo, grao, agua, "equilibrado");

describe("proporção base do método", () => {
  it.each([
    ["v60", 16],
    ["aeropress", 15],
    ["prensa", 15],
    ["coado", 16],
  ])("%s sem grão usa 1:%i", (metodo, esperado) => {
    expect(receita(metodo, null)?.proporcao).toBe(esperado);
  });
});

describe("refinamento pela pesquisa grão × método", () => {
  it("Bourbon Amarelo no V60 desce de 1:16 para 1:15", () => {
    expect(receita("v60", null)?.proporcao).toBe(16);
    expect(receita("v60", "bourbon-amarelo")?.proporcao).toBe(15);
  });

  it("Geisha na Prensa sobe de 1:15 para 1:16, resolvendo o alias french-press", () => {
    expect(receita("prensa", null)?.proporcao).toBe(15);
    expect(receita("prensa", "geisha")?.proporcao).toBe(16);
  });

  it("mantém a base quando a pesquisa concorda com ela", () => {
    expect(receita("v60", "geisha")?.proporcao).toBe(16);
    expect(receita("aeropress", "bourbon")?.proporcao).toBe(15);
  });

  it("cai na base quando o par não foi pesquisado", () => {
    // Coado de papel não está em coffee-ratios.json
    expect(receita("coado", "geisha")?.proporcao).toBe(16);
    expect(receita("coado", "bourbon-amarelo")?.proporcao).toBe(16);
  });
});

describe("sinalização do ajuste", () => {
  it("marca quando a pesquisa muda a proporção", () => {
    expect(receita("v60", "bourbon-amarelo")?.ajustadaPeloGrao).toBe(true);
    expect(receita("prensa", "geisha")?.ajustadaPeloGrao).toBe(true);
  });

  it("não marca quando a pesquisa concorda com a base do método", () => {
    expect(receita("v60", "geisha")?.ajustadaPeloGrao).toBe(false);
    expect(receita("aeropress", "bourbon")?.ajustadaPeloGrao).toBe(false);
  });

  it("não marca sem grão nem em par não pesquisado", () => {
    expect(receita("v60", null)?.ajustadaPeloGrao).toBe(false);
    expect(receita("coado", "geisha")?.ajustadaPeloGrao).toBe(false);
  });

  it("é exatamente o conjunto esperado em toda a matriz", () => {
    const metodos = ["v60", "aeropress", "prensa", "coado"];
    const graos = [
      "bourbon",
      "catuai",
      "bourbon-amarelo",
      "geisha",
      "acaia",
      "icatu",
      "arabica",
    ];

    const ajustados = metodos.flatMap((m) =>
      graos
        .filter((g) => receita(m, g)?.ajustadaPeloGrao)
        .map((g) => `${g}+${m}`)
    );

    expect(ajustados.sort()).toEqual(["bourbon-amarelo+v60", "geisha+prensa"]);
  });
});

describe("intensidade", () => {
  it("mais leve soma 1 ao denominador e rende menos café", () => {
    const r = montarReceita("v60", null, 350, "leve");
    expect(r?.proporcao).toBe(17);
    expect(r?.cafeG).toBeCloseTo(350 / 17, 5);
  });

  it("mais intenso subtrai 1 e rende mais café", () => {
    const r = montarReceita("v60", null, 350, "intenso");
    expect(r?.proporcao).toBe(15);
    expect(r?.cafeG).toBeCloseTo(350 / 15, 5);
  });

  it("aplica-se sobre a proporção já refinada, não sobre a base", () => {
    // Bourbon Amarelo no V60 é refinado para 15; leve leva a 16, não a 17
    expect(
      montarReceita("v60", "bourbon-amarelo", 350, "leve")?.proporcao
    ).toBe(16);
  });
});

describe("gramas de café", () => {
  it.each([
    [100, 6.25],
    [350, 21.875],
    [1000, 62.5],
  ])("%i ml no V60 equilibrado rende %f g", (agua, esperado) => {
    expect(receita("v60", null, agua)?.cafeG).toBeCloseTo(esperado, 5);
  });
});

describe("Moka", () => {
  it("não produz proporção nem quantidade", () => {
    const r = receita("moka", null);
    expect(r?.proporcao).toBeNull();
    expect(r?.cafeG).toBeNull();
  });

  it("ignora o grão e continua sem cálculo", () => {
    expect(receita("moka", "geisha")?.cafeG).toBeNull();
  });
});

describe("entradas inválidas", () => {
  it("método inexistente não monta receita", () => {
    expect(receita("chemex", null)).toBeNull();
  });

  it("grão inexistente é tratado como ausente", () => {
    const r = receita("v60", "inexistente");
    expect(r?.grao).toBeNull();
    expect(r?.proporcao).toBe(16);
  });
});
