import graosRaw from "@/conteudo/graos.json";
import metodosRaw from "@/conteudo/metodos.json";
import coffeeRatiosRaw from "@/coffee-ratios.json";
import type { Grao, Metodo } from "./types";
import type { Bean, Method, Ratio } from "@/components/CoffeeCalculator";

export const graos = (graosRaw as any).graos as Grao[];
export const metodos = (metodosRaw as any).metodos as Metodo[];

export function getGraoById(id: string): Grao | undefined {
  return graos.find((g) => g.id === id);
}

export function getMetodoById(id: string): Metodo | undefined {
  return metodos.find((m) => m.id === id);
}

export function getAllGraoIds() {
  return graos.map((g) => ({ id: g.id }));
}

export function getAllMetodoIds() {
  return metodos.map((m) => ({ id: m.id }));
}

export function getCoffeeCalculatorData() {
  const ratiosRaw = (coffeeRatiosRaw as any[]);

  const beansSet = new Set<string>();
  const methodsSet = new Set<string>();
  const ratios: Ratio[] = [];

  const beanMap = new Map<string, { id: string; nome: string }>();
  const methodMap = new Map<string, { id: string; nome: string }>();

  ratiosRaw.forEach((entry) => {
    beansSet.add(entry.grão_id);
    methodsSet.add(entry.método_id);

    beanMap.set(entry.grão_id, {
      id: entry.grão_id,
      nome: entry.grão_nome,
    });

    methodMap.set(entry.método_id, {
      id: entry.método_id,
      nome: entry.método_nome,
    });

    ratios.push({
      grão_id: entry.grão_id,
      método_id: entry.método_id,
      proporção_base: entry.proporção_base,
      variações: entry.variações,
      moagem_recomendada: entry.moagem_recomendada,
      votos_proporção: entry.votos_proporção,
    });
  });

  const beans: Bean[] = Array.from(beanMap.values());
  const methods: Method[] = Array.from(methodMap.values());

  return { beans, methods, ratios };
}
