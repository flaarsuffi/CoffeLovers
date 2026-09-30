import graosRaw from "@/conteudo/graos.json";
import metodosRaw from "@/conteudo/metodos.json";
import type { Grao, Metodo } from "./types";

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
