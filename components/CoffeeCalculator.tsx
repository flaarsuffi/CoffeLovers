"use client";

import { useState, useMemo } from "react";

// Types
export interface Bean {
  id: string;
  nome: string;
}

export interface Method {
  id: string;
  nome: string;
}

export interface Ratio {
  grão_id: string;
  método_id: string;
  proporção_base: string;
  variações: {
    leve: string;
    equilibrado: string;
    intenso: string;
  };
  moagem_recomendada?: string;
  votos_proporção?: Record<string, number>;
}

export interface CoffeeCalculatorProps {
  beans: Bean[];
  methods: Method[];
  ratios: Ratio[];
  className?: string;
}

export function CoffeeCalculator({
  beans,
  methods,
  ratios,
  className = "",
}: CoffeeCalculatorProps) {
  // State
  const [selectedBeanId, setSelectedBeanId] = useState<string>(beans[0]?.id || "");
  const [selectedMethodId, setSelectedMethodId] = useState<string>(methods[0]?.id || "");
  const [waterAmount, setWaterAmount] = useState<number>(350);

  // Validation
  const isValid = selectedBeanId && selectedMethodId && waterAmount > 0;

  // Get current ratio
  const currentRatio = useMemo(() => {
    return ratios.find(
      (r) => r.grão_id === selectedBeanId && r.método_id === selectedMethodId
    );
  }, [selectedBeanId, selectedMethodId, ratios]);

  // Calculate coffee amount
  const coffeeAmount = useMemo(() => {
    if (!currentRatio || !isValid) return null;

    const [, denominator] = currentRatio.proporção_base.split(":").map(Number);
    return Math.round(waterAmount / denominator);
  }, [currentRatio, waterAmount, isValid]);

  const selectedBean = beans.find((b) => b.id === selectedBeanId);
  const selectedMethod = methods.find((m) => m.id === selectedMethodId);

  return (
    <div className={`w-full ${className}`}>
      {/* Grão Selector */}
      <div className="mb-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-text-tertiary mb-2">
          Grão
        </label>
        <select
          value={selectedBeanId}
          onChange={(e) => setSelectedBeanId(e.target.value)}
          className="w-full px-4 py-3 bg-bg-subtle border border-border rounded-md text-base text-text-primary font-light transition-colors duration-200 hover:border-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          aria-label="Selecione o tipo de grão de café"
        >
          {beans.map((bean) => (
            <option key={bean.id} value={bean.id}>
              {bean.nome}
            </option>
          ))}
        </select>
      </div>

      {/* Método Selector */}
      <div className="mb-6">
        <label className="block text-xs font-bold uppercase tracking-wider text-text-tertiary mb-2">
          Método
        </label>
        <select
          value={selectedMethodId}
          onChange={(e) => setSelectedMethodId(e.target.value)}
          className="w-full px-4 py-3 bg-bg-subtle border border-border rounded-md text-base text-text-primary font-light transition-colors duration-200 hover:border-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          aria-label="Selecione o método de preparo"
        >
          {methods.map((method) => (
            <option key={method.id} value={method.id}>
              {method.nome}
            </option>
          ))}
        </select>
      </div>

      {/* Selection Summary */}
      {isValid && selectedBean && selectedMethod && (
        <div className="p-4 bg-bg-subtle border border-border rounded-md mb-6">
          <div className="text-xs text-text-tertiary uppercase tracking-wider mb-1">
            Você selecionou
          </div>
          <div className="text-sm text-text-primary font-light">
            {selectedBean.nome} × {selectedMethod.nome}
          </div>
        </div>
      )}
    </div>
  );
}
