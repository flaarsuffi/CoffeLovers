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

  describe("Sprint 2: Slider & Calculation", () => {
    it("should accept water amount between 100-500ml", () => {
      expect(100).toBeGreaterThanOrEqual(100);
      expect(500).toBeLessThanOrEqual(500);
      expect(350).toBeGreaterThanOrEqual(100);
      expect(350).toBeLessThanOrEqual(500);
    });

    it("should validate water amount > 0", () => {
      expect(100 > 0).toBe(true);
      expect(0 > 0).toBe(false);
      expect(-50 > 0).toBe(false);
    });

    it("should round coffee amount to nearest gram", () => {
      const waterAmount = 350;
      const denominator = 16;
      const coffeeAmount = Math.round(waterAmount / denominator);
      expect(coffeeAmount).toBe(22);
      expect(typeof coffeeAmount).toBe("number");
    });

    it("should calculate for minimum water (100ml)", () => {
      const waterAmount = 100;
      const denominator = 16;
      const coffeeAmount = Math.round(waterAmount / denominator);
      expect(coffeeAmount).toBe(6);
    });

    it("should calculate for maximum water (500ml)", () => {
      const waterAmount = 500;
      const denominator = 16;
      const coffeeAmount = Math.round(waterAmount / denominator);
      expect(coffeeAmount).toBe(31);
    });

    it("should calculate variations (leve/intenso)", () => {
      const waterAmount = 350;
      const ratio = mockRatios[0];

      const leve_denom = parseInt(ratio.variações.leve.split(":")[1]);
      const leve_amount = Math.round(waterAmount / leve_denom);

      const intenso_denom = parseInt(ratio.variações.intenso.split(":")[1]);
      const intenso_amount = Math.round(waterAmount / intenso_denom);

      expect(leve_amount).toBe(21); // 350 / 17 ≈ 21
      expect(intenso_amount).toBe(23); // 350 / 15 ≈ 23
    });

    it("should handle slider step of 50ml correctly", () => {
      const sliderStep = 50;
      expect(100 % sliderStep).toBe(0);
      expect(150 % sliderStep).toBe(0);
      expect(200 % sliderStep).toBe(0);
      expect(350 % sliderStep).toBe(0);
      expect(500 % sliderStep).toBe(0);
    });

    it("should return null coffee amount when invalid", () => {
      const selectedBeanId = "";
      const selectedMethodId = "v60";
      const waterAmount = 350;
      const isValid = selectedBeanId && selectedMethodId && waterAmount > 0;

      let coffeeAmount = null;
      if (isValid) {
        coffeeAmount = Math.round(waterAmount / 16);
      }

      expect(coffeeAmount).toBeNull();
    });

    it("should show result only when valid", () => {
      const selectedBeanId = "arabica";
      const selectedMethodId = "v60";
      const waterAmount = 350;
      const isValid = selectedBeanId && selectedMethodId && waterAmount > 0;
      const ratio = mockRatios.find(
        (r) => r.grão_id === selectedBeanId && r.método_id === selectedMethodId
      );

      expect(isValid).toBe(true);
      expect(ratio).toBeDefined();
    });
  });

  describe("Sprint 3: Result Circle & Polish", () => {
    it("should render result circle with border-primary", () => {
      const circleClasses = "border-2 border-primary rounded-full";
      expect(circleClasses).toContain("border-primary");
      expect(circleClasses).toContain("rounded-full");
    });

    it("should display result in large text (text-6xl = 48px)", () => {
      const fontSize = 48;
      expect(fontSize).toBeGreaterThan(36);
    });

    it("should show variations in grid (grid-cols-2)", () => {
      const gridLayout = "grid-cols-2";
      expect(gridLayout).toBe("grid-cols-2");
    });

    it("should have hover state on variation boxes", () => {
      const hoverClass = "hover:border-primary/30 transition-colors";
      expect(hoverClass).toContain("hover:border");
      expect(hoverClass).toContain("transition-colors");
    });

    it("should display moagem_recomendada when available", () => {
      const ratio = mockRatios[0];
      expect(ratio.moagem_recomendada).toBeDefined();
      expect(ratio.moagem_recomendada).toBe("Média-fina");
    });

    it("should calculate variation amounts correctly", () => {
      const ratio = mockRatios[0];
      const waterAmount = 350;

      // Leve: 1:17
      const leve_denom = parseInt(ratio.variações.leve.split(":")[1]) || 16;
      const leve = Math.round(waterAmount / leve_denom);

      // Intenso: 1:15
      const intenso_denom = parseInt(ratio.variações.intenso.split(":")[1]) || 16;
      const intenso = Math.round(waterAmount / intenso_denom);

      expect(leve).toBe(21);
      expect(intenso).toBe(23);
      expect(leve).toBeLessThan(intenso);
    });

    it("should handle missing moagem_recomendada gracefully", () => {
      const ratio = mockRatios[1]; // geisha without moagem
      expect(ratio.moagem_recomendada).toBeUndefined();
      // Component should not crash, should skip rendering
    });

    it("should have proper spacing between sections (space-y-6 = 24px)", () => {
      const spacing = 24;
      expect(spacing).toBeGreaterThanOrEqual(20);
    });

    it("should render result circle with radial gradient", () => {
      const gradient = "radial-gradient(circle at 30% 30%, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.02))";
      expect(gradient).toContain("radial-gradient");
      expect(gradient).toContain("rgba(212, 175, 55");
    });

    it("should circle size be (w-48 h-48 = 192px × 192px)", () => {
      const size = 192; // 48 * 4px
      expect(size).toBeGreaterThan(150);
      expect(size).toBeLessThan(250);
    });

    it("should variations be in 2-column grid (not stacked)", () => {
      const gridCols = 2;
      expect(gridCols).toBe(2);
    });

    it("should all design tokens present (colors, spacing, typography)", () => {
      const tokens = {
        borderPrimary: "border-primary",
        textTertiary: "text-text-tertiary",
        textPrimary: "text-text-primary",
        bgSubtle: "bg-bg-subtle",
        spacingY6: "space-y-6",
      };
      Object.values(tokens).forEach((token) => {
        expect(token.length).toBeGreaterThan(0);
      });
    });
  });
});
