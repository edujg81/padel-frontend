export interface Partido {
    id: number;
    fecha: Date;
    pista: string;
    resultado: string;
    equipoGanador: string;
    registrado: boolean;
    jornadaId: number; // ID de la jornada a la que pertenece el partido
    // equipo1: [
    equipo1Jugador1Id: number; // ID del jugador 1 del equipo 1
    equipo1Jugador2Id: number; // ID del jugador 2 del equipo 1
    // ];
    // equipo2: [
    equipo2Jugador1Id: number; // ID del jugador 1 del equipo 2
    equipo2Jugador2Id: number; // ID del jugador 2 del equipo 2
    // ]

    equipo1Jugador1Nombre?: string;
    equipo1Jugador2Nombre?: string;
    equipo2Jugador1Nombre?: string;
    equipo2Jugador2Nombre?: string;

    //ausencias: Ausencia[];

    /* Juegos ganados por equipos en cada set */
    juegosGanadosEquipo1Set1: number | null;
    juegosGanadosEquipo2Set1: number | null;
    juegosGanadosEquipo1Set2: number | null;
    juegosGanadosEquipo2Set2: number | null;
    juegosGanadosEquipo1Set3: number | null;
    juegosGanadosEquipo2Set3: number | null;
    setsGanadosEquipo1: number | null;
    setsGanadosEquipo2: number | null;
}
