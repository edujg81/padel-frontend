import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { CampeonatoService } from '../../services/campeonato.service';
import { Campeonato } from '../../models/campeonato.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InscripcionService } from '../../services/inscripcion.service';
import { Inscripcion } from '../../models/inscripcion.model';
import { distinctUntilChanged } from 'rxjs/operators';
import { ClasificacionService } from '../../services/clasificacion.service';
import { Clasificacion } from '../../models/clasificacion.model';
import { MatTableModule } from '@angular/material/table';
import { Jugador } from '../../models/jugador.model';
import { JugadorService } from '../../services/jugador.service';

@Component({
    selector: 'app-campeonato-detail',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatGridListModule,
        MatTableModule,
        RouterModule,
        RouterLink,
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './campeonato-detail.component.html',
    styleUrls: ['./campeonato-detail.component.scss']
})
export class CampeonatoDetailComponent implements OnInit {
  //route: ActivatedRoute = Inject(ActivatedRoute);
  //campeonatoService = Inject(CampeonatoService);
  campeonato: Campeonato | undefined;
  selCampeonatoId: number = -1;
  estadoControl = new FormControl();
  jugadoresInscritos: number = 0;
  clasificacion: Clasificacion[] = [];
  jugadores: Jugador[] = [];
  displayedColumns: string[] = ['posicion', 'jugador', 'puntos', 'jugados', 'ganados', 'perdidos', 'sets', 'juegos'];


  constructor(
    private readonly inscripcionesService: InscripcionService,
    private readonly campeonatoService: CampeonatoService,
    private readonly clasificacionService: ClasificacionService,
    private readonly jugadorService: JugadorService,
    @Inject(ActivatedRoute) private readonly route: ActivatedRoute,
    @Inject(Router) private readonly router: Router
  ) {

  }

  ngOnInit(): void {

    this.selCampeonatoId = +this.route.snapshot.paramMap.get('id')!;

    this.obtenerCampeonato();

    // Suscribirse al control de cambios en el estado con 'distinctUntilChanged' y confirmación de usuario
    this.estadoControl.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: (estado: string) => {
        if (this.permiteCambioEstado(estado)) {
          const confirmChange = window.confirm(`¿Estás seguro de que quieres cambiar el estado a "${estado}"?`);
          if (confirmChange) {
            this.campeonatoService.cambiarEstadoCampeonato(this.selCampeonatoId, estado).subscribe({
              next: () => {
                console.log('Campeonato con ID', this.selCampeonatoId, 'cambiado a estado', estado, 'con éxito');
                this.toggleEstadoControl();
              },
              error: (error: any) => console.error('Error al cambiar estado del campeonato', error)
            });
          } else {
            // Restaurar el estado anterior si el usuario cancela
            this.estadoControl.setValue(this.campeonato?.estado, { emitEvent: false });
          }
        }
      },
      error: (error: any) => console.error(error)
    });
  }

  private obtenerCampeonato(): void {
    if (isNaN(this.selCampeonatoId)) {
      console.error('ID de campeonato no válido');
      return;
    }

    const id = this.selCampeonatoId;

    this.campeonatoService.getCampeonato(id).subscribe({
      next: (data: Campeonato) => {
        this.campeonato = data;
        this.estadoControl.setValue(this.campeonato!.estado);
        this.getJugadoresInscritos();
        this.cargarClasificacion();
      },
      error: (error: any) => console.error('Error al obtener el campeonato:', error)
    });
  }

  private permiteCambioEstado(estado: string): boolean {
    return (
      (this.campeonato?.estado === 'Sin iniciar' && estado === 'En curso' && this.jugadoresInscritos >= 12) ||
      (this.campeonato?.estado === 'En curso' && estado === 'Finalizado')
    );
  }

  getJugadoresInscritos():void {
    this.inscripcionesService.getInscripcionesByCampeonatoId(this.selCampeonatoId).subscribe({
      next: (inscripciones: Inscripcion[]) => {
        this.jugadoresInscritos = inscripciones.length;

        this.toggleEstadoControl();
      },
      error: error => console.error('Error al obtener jugadores inscritos:', error)
    });
  }

  cargarClasificacion(): void {
    this.clasificacionService.getClasificacionByCampeonatoId(this.selCampeonatoId!).subscribe({
      next: (data: Clasificacion[]) => {
        this.clasificacion = data;
        // Obtener la lista de jugadores
        this.jugadorService.getJugadores().subscribe({
          next: (jugadores: Jugador[]) => {
            this.jugadores = jugadores;

            // Mapear los nombres de los jugadores a la clasificación
            this.clasificacion = this.clasificacion.map((clasif) => {
              const jugador = this.jugadores.find((j) => j.id === clasif.jugadorId);
              return {
                ...clasif,
                jugadorNombre: jugador ? jugador.nombreCompleto : 'Desconocido'
              };
            });

            console.log('Clasificación cargada con nombres:', this.clasificacion);
          },
          error: (err: any) => console.error('Error al obtener los jugadores:', err)
        });
      },
      error: (err: any) => console.error('Error al obtener la clasificación:', err),
    });
  }

  private toggleEstadoControl(): void {
    const habilitarCambioEstado = 
      (this.estadoControl.value === 'Sin iniciar' && this.jugadoresInscritos >= 12) ||
      (this.estadoControl.value === 'En curso');

    habilitarCambioEstado ? this.estadoControl.enable() : this.estadoControl.disable();
  }
}