import { Component, Inject, OnInit } from '@angular/core';
import { CampeonatoService } from '../../services/campeonato.service';
import { JugadorService } from '../../services/jugador.service';
import { InscripcionService } from '../../services/inscripcion.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Campeonato } from '../../models/campeonato.model';
import { Jugador } from '../../models/jugador.model';
import { Inscripcion } from '../../models/inscripcion.model';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
    selector: 'app-inscripcion-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatCardModule,
        MatListModule
    ],
    templateUrl: './inscripcion-list.component.html',
    styleUrl: './inscripcion-list.component.scss'
})
export class InscripcionListComponent implements OnInit {
  campeonatos: Campeonato[] = [];
  jugadores: Jugador[] = [];
  inscripciones: Inscripcion[] = [];
  jugadoresInscritos: Jugador[] = [];
  jugadoresInscritosPorCampeonato: { [key: number]: Jugador[] } = {}

  constructor(
    private readonly campeonatoService: CampeonatoService,
    private readonly inscripcionService: InscripcionService
  ) {}

  ngOnInit(): void {
    this.getCampeonatos();
  }

  private getCampeonatos(): void {
    this.campeonatoService.getCampeonatos().subscribe({
      next: campeonatos => {
        this.campeonatos = campeonatos.filter(campeonato => campeonato.activo === true);
        campeonatos.forEach(campeonato => {
          this.getJugadoresInscritos(campeonato.id);
        })
      },
      error: error => console.error('Error al recuperar campeonatos', error)
    });
  }

  // private getJugadoresInscritos(campeonatoId: number): void {
  //   this.inscripcionService.getInscripcionesByCampeonatoId(campeonatoId).subscribe({
  //     next: (inscripciones: any[]) => {
  //       this.inscripciones = inscripciones;
  //       if (inscripciones && inscripciones.length > 0) {
  //         this.jugadoresInscritosPorCampeonato[campeonatoId] = inscripciones.map((inscripcion: any) => inscripcion.jugador);
  //       } else {
  //         this.jugadoresInscritosPorCampeonato[campeonatoId] = [];
  //       }
  //     },
  //     error: error => console.error('Error al obtener inscripciones', error)
  //   });
  // }

  private getJugadoresInscritos(campeonatoId: number): void {
    this.inscripcionService.getInscripcionesByCampeonatoId(campeonatoId).subscribe({
      next: inscripciones => {
        this.jugadoresInscritosPorCampeonato[campeonatoId] = inscripciones.map(inscripcion => inscripcion.jugador) || [];
      },
      error: error => {
        console.error('Error al obtener inscripciones', error);
        alert('Hubo un error al cargar las inscripciones.');
      }
    });
  }

  isInscripcionDisponible(campeonatoId: number): boolean {
    const jugadores = this.jugadoresInscritosPorCampeonato[campeonatoId];
    // return jugadores ? jugadores.length < 20 : false;
    return (jugadores?.length || 0) < 20;
  }

  hayInscripciones(campeonatoId: number): boolean {
    const jugadores = this.jugadoresInscritosPorCampeonato[campeonatoId];
    // return jugadores ? jugadores.length > 0 : false;
    return (jugadores?.length || 0) > 0;
  }
}