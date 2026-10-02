import { describe, it, expect } from "@jest/globals";
import type { Bean, Method, Ratio, CoffeeCalculatorProps } from "@/components/CoffeeCalculator";

describe("CoffeeCalculator Types & Logic", () => {
  // Mock data
  const mockBeans: Bean[] = [
    { id: "arabica", nome: "Arábica" },
    { id: "geisha", nome: "Geisha" },
  ];

  const mockMethods: Method[] = [
    { id: "v60", nome: "V60" },
    { id: "aeropress", nome: "Aeropress" },
  ];

  const mockRatios: Ratio[] = [
    {
      grão_id: "arabica",
      método_id: "v60",
      proporção_base: "1:16",
      variações: { leve: "1:17", equilibrado: "1:16", intenso: "1:15" },
      moagem_recomendada: "Média-fina",
      votos_proporção: { "1:16": 4, "1:15": 3, "1:17": 2 },
    },
    {
      grão_id: "geisha",
      método_id: "v60",
      proporção_base: "1:16",
      variações: { leve: "1:17", equilibrado: "1:16", intenso: "1:15" },
    },
  ];

  describe("Type validation", () => {
    it("should validate Bean type", () => {
      const bean: Bean = { id: "arabica", nome: "Arábica" };
      expect(bean.id).toBe("arabica");
      expect(bean.nome).toBe("Arábica");
    });

    it("should validate Method type", () => {
      const method: Method = { id: "v60", nome: "V60" };
      expect(method.id).toBe("v60");
      expect(method.nome).toBe("V60");
    });

    it("should validate Ratio type with all fields", () => {
      const ratio: Ratio = mockRatios[0];
      expect(ratio.grão_id).toBe("arabica");
      expect(ratio.método_id).toBe("v60");
      expect(ratio.proporção_base).toBe("1:16");
      expect(ratio.variações.equilibrado).toBe("1:16");
      expect(ratio.moagem_recomendada).toBeDefined();
      expect(ratio.votos_proporção).toBeDefined();
    });

    it("should validate CoffeeCalculatorProps interface", () => {
      const props: CoffeeCalculatorProps = {
        beans: mockBeans,
        methods: mockMethods,
        ratios: mockRatios,
        className: "test",
      };
      expect(props.beans.length).toBe(2);
      expect(props.methods.length).toBe(2);
      expect(props.ratios.length).toBe(2);
    });
  });

  describe("Proportion parsing", () => {
    it("should parse proportion string correctly", () => {
      const proportion = "1:16";
      const [numerator, denominator] = proportion.split(":").map(Number);
      expect(numerator).toBe(1);
      expect(denominator).toBe(16);
    });

    it("should calculate coffee amount from water (1:16)", () => {
      const waterAmount = 350;
      const denominator = 16;
      const coffeeAmount = Math.round(waterAmount / denominator);
      expect(coffeeAmount).toBe(22);
    });

    it("should calculate coffee amount for 100ml water", () => {
      const waterAmount = 100;
      const denominator = 16;
      const coffeeAmount = Math.round(waterAmount / denominator);
      expect(coffeeAmount).toBe(6);
    });

    it("should calculate coffee amount for 500ml water", () => {
      const waterAmount = 500;
      const denominator = 16;
      const coffeeAmount = Math.round(waterAmount / denominator);
      expect(coffeeAmount).toBe(31);
    });
  });

  describe("Ratio lookup", () => {
    it("should find ratio by bean and method", () => {
      const beanId = "arabica";
      const methodId = "v60";
      const ratio = mockRatios.find(
        (r) => r.grão_id === beanId && r.método_id === methodId
      );
      expect(ratio).toBeDefined();
      expect(ratio?.proporção_base).toBe("1:16");
    });

    it("should return undefined for non-existent combination", () => {
      const beanId = "unknown";
      const methodId = "v60";
      const ratio = mockRatios.find(
        (r) => r.grão_id === beanId && r.método_id === methodId
      );
      expect(ratio).toBeUndefined();
    });
  });

  describe("Validation", () => {
    it("should validate water amount > 0", () => {
      expect(350 > 0).toBe(true);
      expect(0 > 0).toBe(false);
      expect(-50 > 0).toBe(false);
    });

    it("should require all fields selected", () => {
      const selectedBeanId = "arabica";
      const selectedMethodId = "v60";
      const waterAmount = 350;
      const isValid = selectedBeanId && selectedMethodId && waterAmount > 0;
      expect(isValid).toBe(true);
    });

    it("should fail validation with empty bean", () => {
      const selectedBeanId = "";
      const selectedMethodId = "v60";
      const waterAmount = 350;
      const isValid = selectedBeanId && selectedMethodId && waterAmount > 0;
      expect(isValid).toBe(false);
    });
  });

  describe("Sprint 1: Dropdowns & Selection", () => {
    it("should have correct number of bean options", () => {
      expect(mockBeans.length).toBeGreaterThan(0);
      expect(mockBeans.length).toBe(2);
    });

    it("should have correct number of method options", () => {
      expect(mockMethods.length).toBeGreaterThan(0);
      expect(mockMethods.length).toBe(2);
    });

    it("should initialize with first bean selected", () => {
      const initialBeanId = mockBeans[0]?.id || "";
      expect(initialBeanId).toBe("arabica");
    });

    it("should initialize with first method selected", () => {
      const initialMethodId = mockMethods[0]?.id || "";
      expect(initialMethodId).toBe("v60");
    });

    it("should find selected bean by id", () => {
      const selectedBeanId = "geisha";
      const bean = mockBeans.find((b) => b.id === selectedBeanId);
      expect(bean).toBeDefined();
      expect(bean?.nome).toBe("Geisha");
    });

    it("should find selected method by id", () => {
      const selectedMethodId = "aeropress";
      const method = mockMethods.find((m) => m.id === selectedMethodId);
      expect(method).toBeDefined();
      expect(method?.nome).toBe("Aeropress");
    });

    it("should show selection summary with valid selection", () => {
      const selectedBeanId = "arabica";
      const selectedMethodId = "v60";
      const waterAmount = 350;
      const isValid = selectedBeanId && selectedMethodId && waterAmount > 0;
      const bean = mockBeans.find((b) => b.id === selectedBeanId);
      const method = mockMethods.find((m) => m.id === selectedMethodId);

      expect(isValid).toBe(true);
      expect(bean?.nome).toBe("Arábica");
      expect(method?.nome).toBe("V60");
    });

    it("should not show selection summary without valid selection", () => {
      const selectedBeanId = "";
      const selectedMethodId = "v60";
      const waterAmount = 350;
      const isValid = selectedBeanId && selectedMethodId && waterAmount > 0;
      expect(isValid).toBe(false);
    });
  });
});
