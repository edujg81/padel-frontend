export interface Clasificacion {
    id: number;
    campeonatoId: number;
    jugadorId: number;
    jugadorNombre?: string;
    posicion: number;
    puntos: number;
    partidosJugados: number;
    partidosGanados: number;
    partidosPerdidos: number;
    setsGanados: number;
    setsPerdidos: number;
    juegosGanados: number;
    juegosPerdidos: number;
  }