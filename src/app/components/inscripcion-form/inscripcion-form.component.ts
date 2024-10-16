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
  campeonato: any;
  inscripcionForm!: FormGroup;
  inscripcionId!: number | null;
  jugadoresDisponibles: Jugador[] = [];
  jugadoresInscritos: Jugador[] = [];
  jugadoresSeleccionados: any[] = [];
  jugadorSeleccionado: any;

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
    console.log("Jugadores inscritos al campeonato: ", this.jugadoresInscritos);
    this.jugadorService.getJugadores().subscribe({
      next: jugadores => {
        const noInscrito = (jugador: Jugador) => !this.jugadoresInscritos.some(jugadorInscrito => jugadorInscrito.id === jugador.id);
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

  onChange(event: MatSelectChange) {
    this.jugadorSeleccionado = event.value;
  }

  eliminarJugador(jugador: Jugador): void {
    throw new Error('Method not implemented.');
  }
}
