export interface Grao {
  id: string;
  nome: string;
  regiao: string;
  pais: string;
  altitude: string;
  origin: string;
  origin_story?: string;
  altitude_implications?: string;
  tasting_guide?: string;
  pairings?: string;
  recipe_notes?: string;
  flavor: {
    descricao: string;
    acidez: string;
    corpo: string;
    docura: string;
    notas: string[];
  };
  metodos_recomendados: string[];
  recipe: {
    cafe_gramas: number;
    agua_ml: number;
    proporcao: string;
    temperatura: string;
    tempo_total_minutos: number;
    granulometria: string;
    passos: Array<{
      numero: number;
      titulo: string;
      descricao: string;
    }>;
  };
  especificacoes: {
    cafeina_percentual: string;
    producao_global: string;
    altitude_ideal: string;
    clima: string;
  };
}

export interface Metodo {
  id: string;
  nome: string;
  icone: string;
  tagline: string;
  descricao: string;
  dificuldade: string;
  tempo_minutos: number;
  investimento: string;
  origem: string;
  vibe: string;
  tutorial: {
    passos: Array<{
      numero: number;
      titulo: string;
      descricao: string;
      dica: string;
    }>;
  };
  tecnicas: {
    temperatura: string;
    tempo: string;
    proporcao: string;
    granulometria: string;
  };
  equipment: Array<{
    nome: string;
    descricao: string;
  }>;
  recipe: {
    cafe_gramas: number;
    agua_ml: number;
    tempo_total_minutos: number;
  };
  graos_combinam: string[];
  pros: string[];
  cons: string[];
}
