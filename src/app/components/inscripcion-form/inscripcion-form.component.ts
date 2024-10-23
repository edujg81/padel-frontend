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
    this.jugadorService.getJugadoresDisponiblesParaCampeonato(this.campeonatoId).subscribe({
      next: (jugadores: any[]) => {
        this.jugadoresDisponibles = jugadores;
      },
      error: error => console.error('Error al obtener los jugadores disponibles', error)
    })
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

  onChange(event: MatSelectChange) {
    this.jugadorSeleccionado = event.value;
  }

  eliminarJugador(jugador: Jugador): void {
    const index = this.jugadoresInscritos.indexOf(jugador);
    if (index !== -1) {
      this.jugadoresInscritos.splice(index, 1);
      this.inscripcionService.getInscripcionByCampeonatoIdAndJugadorId(this.campeonatoId, jugador.id).subscribe({
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