import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { CampeonatoService } from '../../services/campeonato.service';
import { Campeonato } from '../../models/campeonato.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InscripcionService } from '../../services/inscripcion.service';
import { Inscripcion } from '../../models/inscripcion.model';
import { distinctUntilChanged } from 'rxjs/operators';

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
        // RouterModule,
        // RouterLink,
        // FormsModule,
        // ReactiveFormsModule
    ],
    templateUrl: './campeonato-detail.component.html',
    styleUrl: './campeonato-detail.component.scss'
})
export class CampeonatoDetailComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  campeonatoService = inject(CampeonatoService);
  campeonato: Campeonato | undefined;
  selCampeonatoId: number = -1;
  estadoControl = new FormControl();
  jugadoresInscritos: number = 0;


  constructor(private readonly inscripcionesService: InscripcionService
  ) {
    this.selCampeonatoId = Number(this.route.snapshot.params['id']);
  }

  ngOnInit(): void {
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
              error: error => console.error('Error al cambiar estado del campeonato', error)
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
      next: data => {
        this.campeonato = data;
        this.estadoControl.setValue(this.campeonato.estado);
        this.getJugadoresInscritos();
      },
      error: error => console.error('Error al obtener el campeonato:', error)
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

  private toggleEstadoControl(): void {
    const habilitarCambioEstado = 
      (this.estadoControl.value === 'Sin iniciar' && this.jugadoresInscritos >= 12) ||
      (this.estadoControl.value === 'En curso');

    habilitarCambioEstado ? this.estadoControl.enable() : this.estadoControl.disable();
  }
}