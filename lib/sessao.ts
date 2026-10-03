import type { Intensidade } from "@/lib/types";

/*
 * A seleção da receita sobrevive à navegação entre páginas, mas não ao
 * fechamento da aba — é o comportamento que o design system descreve para o
 * protótipo, onde o estado vive em memória numa única tela.
 *
 * sessionStorage pode lançar (janela privada, cookies bloqueados) e volta
 * vazio em vários contextos; toda leitura e escrita é tolerante a falha.
 */

const CHAVE = "coffeelovers:receita";

export interface ReceitaSalva {
  metodoId: string;
  graoId: string;
  aguaMl: number;
  intensidade: Intensidade;
}

export function lerSessao(): Partial<ReceitaSalva> | null {
  try {
    const bruto = sessionStorage.getItem(CHAVE);
    return bruto ? (JSON.parse(bruto) as Partial<ReceitaSalva>) : null;
  } catch {
    return null;
  }
}

export function salvarSessao(receita: ReceitaSalva): void {
  try {
    sessionStorage.setItem(CHAVE, JSON.stringify(receita));
  } catch {
    // Sem persistência a calculadora continua funcionando com o padrão.
  }
}
