import { Jornada } from "./jornada.model";

export interface Campeonato {
    id: number;
    year: number;
    categoria: string;
    division: number;
    estado: string;
    puntosPorVictoria: number;
    puntosPorDerrota: number;
    activo: boolean;
    jornadas?: Jornada[]; // Agregar jornadas como propiedad opcional
  }