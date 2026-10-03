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
        <div className="p-4 bg-bg-subtle border border-border rounded-md mb-8">
          <div className="text-xs text-text-tertiary uppercase tracking-wider mb-1">
            Você selecionou
          </div>
          <div className="text-sm text-text-primary font-light">
            {selectedBean.nome} × {selectedMethod.nome}
          </div>
        </div>
      )}

      {/* Water Amount Display */}
      {isValid && (
        <div className="mb-6">
          <div className="flex items-baseline justify-between mb-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-text-tertiary">
              Quantidade de água
            </label>
            <div className="text-3xl font-light text-primary">
              {waterAmount}
              <span className="text-xs text-text-tertiary ml-1">ml</span>
            </div>
          </div>

          {/* Slider */}
          <input
            type="range"
            min="100"
            max="500"
            step="50"
            value={waterAmount}
            onChange={(e) => setWaterAmount(parseInt(e.target.value))}
            className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
            aria-label="Quantidade de água em mililitros"
          />

          {/* Slider Labels */}
          <div className="flex justify-between mt-3 text-xs text-text-tertiary">
            <span>100ml</span>
            <span>300ml</span>
            <span>500ml</span>
          </div>
        </div>
      )}

      {/* Coffee Result */}
      {isValid && coffeeAmount !== null && (
        <div className="p-6 bg-gradient-to-br from-primary/5 to-primary/0 border border-primary rounded-lg text-center">
          <div className="text-xs font-bold uppercase tracking-wider text-text-tertiary mb-2">
            Café moído recomendado
          </div>
          <div className="text-5xl font-light text-primary mb-1">
            {coffeeAmount}
          </div>
          <div className="text-sm text-text-secondary">gramas</div>

          {/* Variations */}
          {currentRatio && (
            <div className="mt-6 pt-6 border-t border-primary/20 text-xs text-text-secondary space-y-1">
              <div>Leve: {Math.round(waterAmount / (parseInt(currentRatio.variações.leve.split(":")[1]) || 16))}g</div>
              <div>Intenso: {Math.round(waterAmount / (parseInt(currentRatio.variações.intenso.split(":")[1]) || 16))}g</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
