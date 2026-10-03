export interface Passo {
  titulo: string;
  descricao: string;
}

export interface Metodo {
  id: string;
  nome: string;
  /** Denominador da proporção café:água. `null` quando o método não tem medida universal (Moka). */
  proporcao: number | null;
  moagem: string;
  tempo: string;
  nivel: string;
  /** Nome do ícone Lucide, em kebab-case. */
  icone: string;
  descricao: string;
  passos: Passo[];
}

export type Intensidade = "leve" | "equilibrado" | "intenso";

export interface Fonte {
  url: string;
  publicacao: string;
}

export interface Grao {
  id: string;
  nome: string;
  /** Arábica é espécie; as demais são variedades dentro dela. */
  tipo: "variedade" | "especie";
  perfil: string;
  notas: string[];
  corpo: string;
  sensorial: string;
  historia: string;
  fonte: Fonte;
  degustacao: string;
  cultivo: string;
  preparo: string;
  harmonizacao: string;
  metodosSugeridos: string[];
}

export interface Receita {
  metodo: Metodo;
  grao: Grao | null;
  aguaMl: number;
  intensidade: Intensidade;
  /** Denominador final já com o ajuste de intensidade. `null` na Moka. */
  proporcao: number | null;
  /** Gramas de café. `null` na Moka. */
  cafeG: number | null;
  /**
   * Verdadeiro quando a pesquisa por grão × método mudou a proporção em
   * relação à base do método. Falso quando a pesquisa concorda com a base,
   * para não sinalizar um ajuste que não alterou nada.
   */
  ajustadaPeloGrao: boolean;
}
