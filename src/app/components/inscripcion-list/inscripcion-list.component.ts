import { Component, OnInit } from '@angular/core';
import { CampeonatoService } from '../../services/campeonato.service';
import { JugadorService } from '../../services/jugador.service';
import { InscripcionService } from '../../services/inscripcion.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-inscripcion-list',
  standalone: true,
  imports: [
    NgFor,
    NgIf
  ],
  templateUrl: './inscripcion-list.component.html',
  styleUrl: './inscripcion-list.component.scss'
})
export class InscripcionListComponent implements OnInit {
  campeonatos: any[] = [];
  jugadores: any[] = [];
  inscripciones: any[] = [];
  campeonatoSeleccionado: number = 0;
  jugadorSeleccionado: number = 0;

  constructor(
    private readonly campeonatoService: CampeonatoService,
    private readonly jugadorService: JugadorService,
    private readonly inscripcionesService: InscripcionService
  ) {}

  ngOnInit(): void {
    this.campeonatoService.getCampeonatos().subscribe(campeonatos => {
      this.campeonatos = campeonatos.filter(campeonato => campeonato.activo === true);
    });

    this.jugadorService.getJugadores().subscribe((jugadores => {
      this.jugadores = jugadores;
    }));

    this.inscripcionesService.getAllInscripciones().subscribe(inscripciones => {
      this.inscripciones = inscripciones.filter(inscripcion => {
        const campeonatoActivo = this.campeonatos.find(campeonato => campeonato.id === inscripcion.campeonatoId);
        return campeonatoActivo.activo === true;
      });
    });
  }
}
