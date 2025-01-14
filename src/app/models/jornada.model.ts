import { Partido } from "./partido.model";

export interface Jornada {
    id: number;
    numero: number;
    fechaInicio: Date;
    ampeonatoId: number;
    partidos: Partido[];
}
