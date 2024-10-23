import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './campeonato-detail.component.html',
  styleUrl: './campeonato-detail.component.scss'
})
export class CampeonatoDetailComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  campeonatoService = inject(CampeonatoService);
  campeonato: Campeonato | undefined;
  selCampeonatoId = -1;
  estadoControl = new FormControl();
  jugadoresInscritos: number = 0;


  constructor(private readonly inscripcionesService: InscripcionService) {
    this.selCampeonatoId = Number(this.route.snapshot.params['id']);
  }

  ngOnInit(): void {
    const id = this.selCampeonatoId;
    this.campeonatoService.getCampeonato(id).subscribe(data => {
      this.campeonato = data;
      this.estadoControl.setValue(this.campeonato.estado);

      this.getJugadoresInscritos();
    });

    this.estadoControl.valueChanges.subscribe({
      next: (estado: string) => {
        if ((this.campeonato?.estado === 'Sin iniciar' && estado === 'En curso' && this.jugadoresInscritos >= 12) || 
            (this.campeonato?.estado === 'En curso' && estado === 'Finalizado')) {
            this.campeonatoService.cambiarEstadoCampeonato(this.selCampeonatoId, estado).subscribe({
              error: error => console.error('Error al cambiar estado del campeonato', error)
          })
        }
        else {
          console.log('No se puede cambiar el estado del campeonato');
        }
      }, 
      error: error => console.error(error)
    });
  }

  getJugadoresInscritos():void {
    this.inscripcionesService.getInscripcionesByCampeonatoId(this.selCampeonatoId).subscribe({
      next: (inscripciones: Inscripcion[]) => {
        this.jugadoresInscritos = inscripciones.length

        this.estadoControl = new FormControl({
          value: this.campeonato?.estado,
          disabled: !(this.campeonato?.estado === 'Sin iniciar' && this.jugadoresInscritos >= 12)
        });
      },
      error: error => console.error(error)
    });
  }
}