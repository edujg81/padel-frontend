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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerControl, MatDatepickerModule, MatDatepickerPanel } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-jornada-list',
    standalone: true,
    providers: [
      { provide: MAT_DATE_LOCALE, useValue: 'es-ES' } // Opcional: Configura el idioma para el Datepicker
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        FormsModule
    ],
    templateUrl: './jornada-list.component.html',
    styleUrls: ['./jornada-list.component.scss']
})
export class JornadaListComponent implements OnInit {
    campeonatoId: number | null = null;
    jornadas: Jornada[] = []; // Jornadas con los partidos asociados
    jugadores: Jugador[] = []; // Lista de jugadores obtenidos de la API

    campeonato!: Campeonato;
    fechaInicio: Date = new Date();

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
        error: (err: any) => {
          console.error('Error al obtener jugadores:', err);
          alert('Error al cargar los jugadores. Por favor, intente nuevamente.');
        }
      });
    }
  
    // obtenerJornadas(): void {
    //   this.jornadaService.getJornadasByCampeonatoId(this.campeonatoId!).subscribe({
    //     next: (data: Jornada[] | null) => {
    //       if (!data) {
    //         //console.warn('El backend devolvió null o undefined para las jornadas.');
    //         this.jornadas = [];
    //         return;
    //       }

    //       this.jornadas = data.map((jornada) => {
    //         return {
    //           ...jornada,
    //           partidos: (jornada.partidos || []).map((partido: Partido) => ({
    //             ...partido,
    //             equipo1Jugador1Nombre: this.obtenerNombreJugador(partido.equipo1Jugador1Id),
    //             equipo1Jugador2Nombre: this.obtenerNombreJugador(partido.equipo1Jugador2Id),
    //             equipo2Jugador1Nombre: this.obtenerNombreJugador(partido.equipo2Jugador1Id),
    //             equipo2Jugador2Nombre: this.obtenerNombreJugador(partido.equipo2Jugador2Id),
    //             resultado: partido.resultado || 'Partido pendiente',
    //           })),
    //         };
    //       });
    //     },
    //     error: (err: any) => {
    //       console.error('Error al obtener jornadas:', err);
    //       this.jornadas = []; // Inicializa jornadas como vacío en caso de error
    //     },
    //   });
    // }

    obtenerJornadas(): void {
      this.jornadaService.getJornadasByCampeonatoId(this.campeonatoId!).subscribe({
        next: (data: Jornada[]) => {
          this.jornadas = data.map((jornada) => ({
            ...jornada,
            partidos: jornada.partidos.map((partido: Partido) => ({
              ...partido,
              equipo1Jugador1Nombre: this.obtenerNombreJugador(partido.equipo1Jugador1Id),
              equipo1Jugador2Nombre: this.obtenerNombreJugador(partido.equipo1Jugador2Id),
              equipo2Jugador1Nombre: this.obtenerNombreJugador(partido.equipo2Jugador1Id),
              equipo2Jugador2Nombre: this.obtenerNombreJugador(partido.equipo2Jugador2Id),
              resultado: partido.resultado || 'Partido pendiente',
            })),
          }));
        },
        error: () => {
          alert('Error al cargar las jornadas. Por favor, intente nuevamente.');
          this.jornadas = [];
        },
      });
    }
  
    obtenerNombreJugador(jugadorId: number): string {
      const jugador = this.jugadores.find((j) => j.id === jugadorId);
      return jugador ? jugador.nombreCompleto : 'Desconocido';
    }  

    puedeGenerarJornada(): boolean {
      return this.campeonato?.estado === 'En curso';
    }

    generarNuevaJornada(): void {
      console.log('Generando jornada para el campeonato ID:', this.campeonatoId);

      if (!this.campeonatoId) {
        console.error('No se puede generar una jornada sin un ID de campeonato');
        return;
      }

      console.log('Generando jornada para el campeonato ID:', this.campeonatoId, 'con fecha de inicio:', this.formatDateToYYYYMMDD(this.fechaInicio));

      if (!this.fechaInicio) {
        alert('Por favor, selecciona una fecha de inicio válida.');
        return;
      }

      this.jornadaService.createJornada(this.campeonatoId, this.formatDateToYYYYMMDD(this.fechaInicio)).subscribe({
        next: (nuevaJornada: Jornada) => {
          console.log('Nueva jornada generada:', nuevaJornada);
          this.obtenerJornadas(); // Actualizar la lista
        },
        error: (err: any) => {
          console.error('Error al generar una nueva jornada:', err);
          alert('Ocurrió un error al intentar generar la jornada. Revisa la consola para más detalles.');
        },
      });
    }
  
    verDetalleJornada(jornadaId: number): void {
      this.router.navigate(['/jornadas', jornadaId]);
    }

    private formatDateToYYYYMMDD(date: Date): string {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son base 0
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    verPartido(partidoId: number): void {
      this.router.navigate(['/partidos', partidoId]);
    }
  }