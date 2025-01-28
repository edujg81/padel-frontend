import { Component, OnInit, Inject } from '@angular/core';
import { CampeonatoService } from '../../services/campeonato.service';
import { JornadaService } from '../../services/jornada.service';
import { PartidoService } from '../../services/partido.service';
import { Campeonato } from '../../models/campeonato.model';
import { Jornada } from '../../models/jornada.model';
import { Partido } from '../../models/partido.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-partido-list',
  imports: [
      CommonModule,
      RouterModule,
      MatButtonModule,
      MatCardModule
  ],
  templateUrl: './partido-list.component.html',
  styleUrls: ['./partido-list.component.scss'],
})
export class PartidoListComponent implements OnInit {
  campeonatos: Campeonato[] = []; // Lista de campeonatos

  constructor(
    private campeonatoService: CampeonatoService,
    private jornadaService: JornadaService,
    private partidoService: PartidoService,
    @Inject(Router) private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarCampeonatos();
  }

  /**
   * Cargar campeonatos con jornadas y partidos asociados
   */
  private cargarCampeonatos(): void {
    this.campeonatoService.getCampeonatos().subscribe({
      next: (campeonatos) => {
        this.campeonatos = campeonatos.map((campeonato) => ({
          ...campeonato,
          jornadas: [],
        }));

        this.campeonatos.forEach((campeonato) => {
          this.cargarJornadas(campeonato);
        });
      },
      error: (err) => console.error('Error al cargar campeonatos:', err),
    });
  }

  /**
   * Cargar jornadas asociadas a un campeonato
   */
  private cargarJornadas(campeonato: Campeonato): void {
    this.jornadaService.getJornadasByCampeonatoId(campeonato.id).subscribe({
      next: (jornadas) => {
        campeonato.jornadas = jornadas.map((jornada) => ({
          ...jornada,
          partidos: [],
        }));

        campeonato.jornadas.forEach((jornada) => {
          this.cargarPartidos(jornada);
        });
      },
      error: (err) => console.error(`Error al cargar jornadas del campeonato ${campeonato.id}:`, err),
    });
  }

  /**
   * Cargar partidos asociados a una jornada
   */
  private cargarPartidos(jornada: Jornada): void {
    this.partidoService.getPartidosByJornadaId(jornada.id).subscribe({
      next: (partidos: Partido[]) => {
        jornada.partidos = partidos.map((partido: Partido) => ({
          ...partido,
          equipo1Jugador1Nombre: this.obtenerNombreJugador(partido.equipo1Jugador1Id),
          equipo1Jugador2Nombre: this.obtenerNombreJugador(partido.equipo1Jugador2Id),
          equipo2Jugador1Nombre: this.obtenerNombreJugador(partido.equipo2Jugador1Id),
          equipo2Jugador2Nombre: this.obtenerNombreJugador(partido.equipo2Jugador2Id),
        }));
      },
      error: (err: any) => console.error(`Error al cargar partidos de la jornada ${jornada.id}:`, err),
    });
  }

  /**
   * Obtener el nombre del jugador por su ID
   */
  private obtenerNombreJugador(jugadorId: number): string {
    // Lógica para obtener el nombre del jugador (puedes optimizarlo si tienes la lista de jugadores cargada previamente)
    return `Jugador ${jugadorId}`;
  }

  /**
   * Navegar a la vista de detalles de un partido
   */
  verPartido(partidoId: number): void {
    this.router.navigate(['/partidos', partidoId]);
  }
}
