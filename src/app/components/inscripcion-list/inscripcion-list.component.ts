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
//import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-inscripcion-list',
  standalone: true,
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
        console.log("campeonatos", this.campeonatos);
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
        console.log(`Inscripciones para el campeonato ${campeonatoId}`, this.inscripciones);
        if (inscripciones && inscripciones.length > 0) {
          this.jugadoresInscritosPorCampeonato[campeonatoId] = inscripciones.map((inscripcion: any) => inscripcion.jugador);
          console.log(`Jugadores inscritos para el campeonato ${campeonatoId}`, this.jugadoresInscritosPorCampeonato[campeonatoId]);
        } else {
          this.jugadoresInscritosPorCampeonato[campeonatoId] = [];
          console.log(`No hay inscripciones para el campeonato ${campeonatoId}`);
        }
      },
      error: error => console.error('Error al obtener inscripciones', error)
    });
  }
}