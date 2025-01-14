import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { JornadaService } from '../../services/jornada.service';
import { Jornada } from '../../models/jornada.model';
import { CommonModule } from '@angular/common';
import { CampeonatoService } from '../../services/campeonato.service';
import { Campeonato } from '../../models/campeonato.model';
import { MatButtonModule } from '@angular/material/button';
import { JugadorService } from '../../services/jugador.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Jugador } from '../../models/jugador.model';
import { Partido } from '../../models/partido.model';

@Component({
    selector: 'app-jornada-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule
    ],
    templateUrl: './jornada-list.component.html',
    styleUrls: ['./jornada-list.component.scss']
})
export class JornadaListComponent implements OnInit {
    //jornadaService = Inject(JornadaService);
    //campeonatoService = Inject(CampeonatoService);
    //route = Inject(ActivatedRoute);
    //router = Inject(Router);
  
    campeonatoId: number | null = null;
    jornadas: Jornada[] = []; // Jornadas con los partidos asociados
    jugadores: Jugador[] = []; // Lista de jugadores obtenidos de la API

    campeonato!: Campeonato;

     constructor(
        private readonly jornadaService: JornadaService,
        private readonly campeonatoService: CampeonatoService,
        private readonly jugadorService: JugadorService,
        @Inject(ActivatedRoute) private readonly route: ActivatedRoute,
        @Inject(Router) private readonly router: Router
      ) {
      }
  
    ngOnInit(): void {
      this.campeonatoId = Number(this.route.snapshot.params['id']);
      this.campeonatoService.getCampeonato(this.campeonatoId).subscribe({
        next: campeonato => {
          this.campeonato = campeonato;
          this.cargarDatos();
        },
        error: error => console.error('Error al obtener el campeonato', error)
      });
    }

    cargarDatos(): void {
      // Primero cargamos los jugadores, luego las jornadas
      this.jugadorService.getJugadores().subscribe({
        next: (data: Jugador[]) => {
          this.jugadores = data;
          this.obtenerJornadas();
        },
        error: (err: any) => console.error('Error al obtener jugadores:', err),
      });
    }
  
    obtenerJornadas(): void {
      // this.jornadaService.getJornadasByCampeonatoId(this.campeonatoId!).subscribe({
      //   next: (data: Jornada[]) => {
      //     this.jornadas = data;
      //   },
      //   error: (err: any) => console.error('Error al obtener jornadas:', err)
      // });
      this.jornadaService.getJornadasByCampeonatoId(this.campeonatoId!).subscribe({
        next: (data: Jornada[]) => {
          // Transformar los datos para incluir las propiedades `equipo1` y `equipo2`
          this.jornadas = data.map((jornada) => {
            return {
              ...jornada,
              partidos: jornada.partidos.map((partido: Partido) => ({
                ...partido,
                // equipo1: [partido.equipo1Jugador1Id, partido.equipo1Jugador2Id],
                // equipo2: [partido.equipo2Jugador1Id, partido.equipo2Jugador2Id],
                // equipo1: this.mapearEquipo([
                //   { id: partido.equipo1Jugador1Id, nombre: this.obtenerNombreJugador(partido.equipo1Jugador1Id) },
                //   { id: partido.equipo1Jugador2Id, nombre: this.obtenerNombreJugador(partido.equipo1Jugador2Id) },
                // ]),
                // equipo2: this.mapearEquipo([
                //   { id: partido.equipo2Jugador1Id, nombre: this.obtenerNombreJugador(partido.equipo2Jugador1Id) },
                //   { id: partido.equipo2Jugador2Id, nombre: this.obtenerNombreJugador(partido.equipo2Jugador2Id) },
                // ]),
                equipo1Jugador1Nombre: this.obtenerNombreJugador(partido.equipo1Jugador1Id),
                equipo1Jugador2Nombre: this.obtenerNombreJugador(partido.equipo1Jugador2Id),
                equipo2Jugador1Nombre: this.obtenerNombreJugador(partido.equipo2Jugador1Id),
                equipo2Jugador2Nombre: this.obtenerNombreJugador(partido.equipo2Jugador2Id),
                resultado: partido.resultado || 'Partido pendiente',
              })),
            };
          });
        },
        error: (err: any) => console.error('Error al obtener jornadas:', err),
      });
    }
  
    // mapearEquipo(equipo: { id: number; nombre: string }[]): { id: number; nombre: string }[] {
    //   return equipo.map((jugador) => ({
    //     ...jugador,
    //     nombre: this.obtenerNombreJugador(jugador.id),
    //   }));
    // }
  
    obtenerNombreJugador(jugadorId: number): string {
      const jugador = this.jugadores.find((j) => j.id === jugadorId);
      return jugador ? jugador.nombreCompleto : 'Desconocido';
    }  

    generarNuevaJornada(): void {
      this.jornadaService.generarJornada(this.campeonatoId!).subscribe({
        next: (jornada: Jornada) => {
          console.log('Nueva jornada generada:', jornada);
          this.obtenerJornadas(); // Actualizar la lista
        },
        error: (err: any) => console.error('Error al generar jornada:', err)
      });
    }
  
    verDetalleJornada(jornadaId: number): void {
      this.router.navigate(['/jornadas', jornadaId]);
    }
  }