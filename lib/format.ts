/*
 * Formatação pt-BR feita à mão, de propósito.
 * toLocaleString pode divergir entre o render do servidor e o do cliente e
 * provocar erro de hidratação; estas funções são determinísticas.
 */

/** 21.875 → "21,9" */
export function gramas(valor: number): string {
  return valor.toFixed(1).replace(".", ",");
}

/** 1000 → "1.000" */
export function mililitros(valor: number): string {
  return String(Math.round(valor)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
