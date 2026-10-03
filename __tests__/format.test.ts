import { describe, expect, it } from "vitest";
import { gramas, mililitros } from "@/lib/format";

/*
 * Estas funções existem para não depender de toLocaleString, que pode
 * divergir entre o render do servidor e o do cliente e quebrar a hidratação.
 */

describe("gramas", () => {
  it("usa vírgula decimal e uma casa", () => {
    expect(gramas(21.875)).toBe("21,9");
    expect(gramas(23.333333)).toBe("23,3");
  });

  it("mantém a casa decimal em valores inteiros", () => {
    expect(gramas(20)).toBe("20,0");
  });
});

describe("mililitros", () => {
  it("não separa valores abaixo de mil", () => {
    expect(mililitros(100)).toBe("100");
    expect(mililitros(350)).toBe("350");
    expect(mililitros(999)).toBe("999");
  });

  it("usa ponto como separador de milhar", () => {
    expect(mililitros(1000)).toBe("1.000");
  });
});
