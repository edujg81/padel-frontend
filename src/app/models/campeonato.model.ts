export interface Campeonato {
    id: number;
    year: number;
    categoria: string;
    division: number;
    estado: string;
    puntosPorVictoria: number;
    puntosPorDerrota: number;
    activo: boolean;
  }