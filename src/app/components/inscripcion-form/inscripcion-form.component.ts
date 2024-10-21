import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InscripcionService } from '../../services/inscripcion.service';
import { CampeonatoService } from '../../services/campeonato.service';
import { JugadorService } from '../../services/jugador.service';
import { Jugador } from '../../models/jugador.model';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Campeonato } from '../../models/campeonato.model';
import { Inscripcion } from '../../models/inscripcion.model';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-inscripcion-form',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    RouterLink,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './inscripcion-form.component.html',
  styleUrl: './inscripcion-form.component.scss'
})
export class InscripcionFormComponent implements OnInit {
  campeonatoId!: number;
  campeonato!: Campeonato;
  inscripcion!: Inscripcion;
  inscripcionForm!: FormGroup;
  inscripcionId!: number | null;
  jugadoresDisponibles: Jugador[] = [];
  jugadoresInscritos: Jugador[] = [];
  jugadoresSeleccionados: any[] = [];
  jugadorSeleccionado: any;
  jugadoresInscritosEnOtrosCampeonatosActivos: Jugador[] = [];

  constructor(
    private readonly inscripcionService: InscripcionService,
    private readonly campeonatoService: CampeonatoService,
    private readonly jugadorService: JugadorService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.campeonatoId = Number(this.route.snapshot.params['id']);
    this.campeonatoService.getCampeonato(this.campeonatoId).subscribe({
      next: campeonato => {
        this.campeonato = campeonato;
        this.getJugadoresInscritos();
      },
      error: error => console.error('Error al obtener el campeonato', error)
    });
  }

  getJugadoresDisponibles(): void {
    this.getJugadoresInscritosEnOtrosCampeonatosActivos();
    this.jugadorService.getJugadores().subscribe({
      next: jugadores => {
        const noInscrito = (jugador: Jugador) => !this.jugadoresInscritos.some(jugadorInscrito => jugadorInscrito.id === jugador.id) && !this.jugadoresInscritosEnOtrosCampeonatosActivos.some(jugadorInscrito => jugadorInscrito.id === jugador.id);
        this.jugadoresDisponibles = jugadores.filter(jugador => {
          if (this.campeonato.categoria === 'Mixto') {
            return jugador.estado === 'Alta' && !jugador.lesionado && noInscrito(jugador);
          } else {
            return jugador.sexo === this.campeonato.categoria && jugador.estado === 'Alta' && !jugador.lesionado && noInscrito(jugador);
          }
        });
      },
      error: error => console.error('Error al obtener los jugadores disponibles', error)
    });
  }

  getJugadoresInscritos(): void {
    this.inscripcionService.getInscripcionesByCampeonatoId(this.campeonatoId).subscribe({
      next: (inscripciones: any[]) => {
        this.jugadoresInscritos = inscripciones.map((inscripcion: any) => inscripcion.jugador);
        this.getJugadoresDisponibles();
      },
      error: error => console.error('Error al obtener los jugadores inscritos', error)
    });
  }

  inscribirJugador(): void {
    if (this.jugadorSeleccionado && this.jugadoresInscritos.length < 20) {
      const jugador = this.jugadoresDisponibles.find(jugador => jugador === this.jugadorSeleccionado);
      if(jugador) {
        this.inscripcionService.inscribirJugador(this.campeonatoId, jugador.id).subscribe({
          next: () => {
            this.jugadoresInscritos.push(jugador);
            this.jugadoresDisponibles = this.jugadoresDisponibles.filter(jugador => jugador.id !== this.jugadorSeleccionado.id);
          },
          error: error => console.error('Error al inscribir al jugador', error)
        });
      }
    }
  }

  getJugadoresInscritosEnOtrosCampeonatosActivos(): void {
    //const jugadoresInscritosEnOtrosCampeonatosActivos: Jugador[] = [];
    this.campeonatoService.getCampeonatos().subscribe({
      next: (campeonatos: Campeonato[]) => {
        const campeonatosActivos = campeonatos.filter((campeonato: Campeonato) => campeonato.activo === true && campeonato.categoria === this.campeonato.categoria && campeonato.id !== this.campeonato.id);
                        
        campeonatosActivos.forEach((campeonato: Campeonato) => {
          this.obtenerInscripcionesPorCampeonato(campeonato).subscribe({
            next: (jugadoresEnCampeonato: Jugador[]) => {
              console.log('Jugadores inscritos en el campeonato:', jugadoresEnCampeonato);
              this.jugadoresInscritosEnOtrosCampeonatosActivos.push(...jugadoresEnCampeonato);
              console.log('Jugadores inscritos en otros campeonatos activos:', this.jugadoresInscritosEnOtrosCampeonatosActivos);
            },
            error: (error: any) => console.error('Error al obtener los jugadores inscritos en otros campeonatos activos', error)
          });
        });

        console.log('Jugadores inscritos en otros campeonatos activos (global):', this.jugadoresInscritosEnOtrosCampeonatosActivos);
      },
      error: error => console.error('Error al obtener los campeonatos activos', error)
    });
  }

  obtenerInscripcionesPorCampeonato(campeonato: Campeonato): Observable<Jugador[]> {
    if (!campeonato.id) {
      throw new Error('No se proporcionó un ID de campeonato válido');
    }
    
    const jugadoresInscritos: Jugador[] = [];

    this.inscripcionService.getInscripcionesByCampeonatoId(campeonato.id).subscribe({
      next: (inscripciones: Inscripcion[]) => {
        inscripciones.forEach((inscripcion: Inscripcion) => {
          if (inscripcion) {
            //jugadoresInscritos.push(this.buscarJugadores(inscripcion));
            jugadoresInscritos.push(Object.values(inscripcion)[1]);
          }
        });
        return jugadoresInscritos;
      },
      error: error => console.error('Error al obtener las inscripciones', error)
    });
    return of(jugadoresInscritos) as Observable<Jugador[]>; // Retornar un observable de jugadoresInscritos;
  }

  // buscarJugadores(inscripcion: Inscripcion): Jugador {
  //   if (!Object.values(inscripcion)[1].id) {
  //     throw new Error('No se proporcionó un ID de jugador válido');
  //   } 
    
  //   let jugadorEncontrado: Jugador | null = null;
    
  //   console.log('Jugador a buscar:', Object.values(inscripcion)[1].id);
  //   this.jugadorService.getJugadorById(Object.values(inscripcion)[1].id).subscribe({
  //       next: jugador => {
  //         console.log('Jugador encontrado:', jugador);
  //         //return jugador;
  //         jugadorEncontrado = jugador;
  //       },
  //       error: error => console.error('Error al obtener el jugador con ID: ' + Object.values(inscripcion)[1].id, error)
  //   });

  //   return jugadorEncontrado as unknown as Jugador;
  // }

  onChange(event: MatSelectChange) {
    this.jugadorSeleccionado = event.value;
  }

  eliminarJugador(jugador: Jugador): void {
    const index = this.jugadoresInscritos.indexOf(jugador);
    if (index !== -1) {
      this.jugadoresInscritos.splice(index, 1);
      this.inscripcionService.getInscripcion(jugador.id).subscribe({
        next: inscripcion => {
          if (inscripcion) {
            this.inscripcionService.desinscribirJugador(this.campeonatoId, jugador.id).subscribe({
            next: () => console.log('Inscripción eliminada correctamente'),
            error: error => console.error('Error al eliminar inscripción', error)
          });
        }
        },
        error: error => {
          console.error('Error al obtener ID de la inscripción', error);
        }
      });
    }
  }
}