export interface Jugador {
    id: number;
    dni: string;
    nombreCompleto: string;
    telefono: number;
    email: string;
    sexo: string;
    estado: string;
    lesionado: boolean;
    fechaAlta: Date;
    fechaBaja: Date;
}