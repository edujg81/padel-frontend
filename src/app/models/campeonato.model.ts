export interface Campeonato {
    id: number;
    year: number;
    categoria: string;
    division: number;
    estado: string;
    activo: boolean;
    puntosPorVictoria: number;
    puntosPorDerrota: number;
  }