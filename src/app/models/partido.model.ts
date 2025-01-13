export interface Partido {
    id: number;
    jornadaId: number;
    equipo1: { jugador1: string, jugador2: string };
    equipo2: { jugador1: string, jugador2: string };
    puntosEquipo1: { set1: number, set2: number, set3: number };
    puntosEquipo2: { set1: number, set2: number, set3: number };
    equipoGanador: string;
}
