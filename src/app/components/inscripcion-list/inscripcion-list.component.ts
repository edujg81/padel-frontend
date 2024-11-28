import { Component, OnInit } from '@angular/core';
import { CampeonatoService } from '../../services/campeonato.service';
import { JugadorService } from '../../services/jugador.service';
import { InscripcionService } from '../../services/inscripcion.service';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FilterByCampeonatoPipe } from '../../shared/filterByCampeonato.pipe';
import { MatButtonModule } from '@angular/material/button';
import { Campeonato } from '../../models/campeonato.model';
import { Jugador } from '../../models/jugador.model';
import { Inscripcion } from '../../models/inscripcion.model';

@Component({
    selector: 'app-inscripcion-list',
    imports: [
        NgFor,
        NgIf,
        RouterLink,
        FilterByCampeonatoPipe,
        MatButtonModule
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
    private readonly jugadorService: JugadorService,
    private readonly inscripcionService: InscripcionService,
    private readonly router: Router
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

  private getJugadoresInscritos(campeonatoId: number): void {
    this.inscripcionService.getInscripcionesByCampeonatoId(campeonatoId).subscribe({
      next: (inscripciones: any[]) => {
        this.inscripciones = inscripciones;
        if (inscripciones && inscripciones.length > 0) {
          this.jugadoresInscritosPorCampeonato[campeonatoId] = inscripciones.map((inscripcion: any) => inscripcion.jugador);
        } else {
          this.jugadoresInscritosPorCampeonato[campeonatoId] = [];
        }
      },
      error: error => console.error('Error al obtener inscripciones', error)
    });
  }

  isInscripcionDisponible(campeonatoId: number): boolean {
    const jugadores = this.jugadoresInscritosPorCampeonato[campeonatoId];
    return jugadores ? jugadores.length < 20 : false;
  }

  hayInscripciones(campeonatoId: number): boolean {
    const jugadores = this.jugadoresInscritosPorCampeonato[campeonatoId];
    return jugadores ? jugadores.length > 0 : false;
  }
}