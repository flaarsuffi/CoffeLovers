"use client";

import { useEffect, useState } from "react";
import { CoffeeCalculator } from "./CoffeeCalculator";
import type { Bean, Method, Ratio } from "./CoffeeCalculator";

interface CoffeeCalculatorSectionProps {
  beans: Bean[];
  methods: Method[];
  ratios: Ratio[];
}

export function CoffeeCalculatorSection({
  beans,
  methods,
  ratios,
}: CoffeeCalculatorSectionProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="max-w-2xl mx-auto" suppressHydrationWarning>
        <h2 className="font-serif text-4xl font-bold mb-8 letter-spacing-tight text-center">
          Calculadora de Proporção
        </h2>
        <p className="text-base text-text-secondary text-center mb-12 leading-relaxed">
          Selecione seu grão e método de preparo para calcular a proporção ideal de café e água.
        </p>
        <div className="h-96 bg-bg-subtle rounded-md animate-pulse" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="font-serif text-4xl font-bold mb-8 letter-spacing-tight text-center">
        Calculadora de Proporção
      </h2>
      <p className="text-base text-text-secondary text-center mb-12 leading-relaxed">
        Selecione seu grão e método de preparo para calcular a proporção ideal de café e água.
      </p>
      <CoffeeCalculator beans={beans} methods={methods} ratios={ratios} />
    </div>
  );
}
