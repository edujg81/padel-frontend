import { Component, Inject, OnInit } from '@angular/core';
import { Campeonato } from '../../models/campeonato.model';
import { CampeonatoService } from '../../services/campeonato.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

@Component({
    selector: 'app-campeonato-list',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        RouterModule,
        FlexLayoutModule,
        NgFor,
        NgIf,
        RouterModule,
        RouterLink
    ],
    templateUrl: './campeonato-list.component.html',
    styleUrls: ['./campeonato-list.component.scss']
})
export class CampeonatoListComponent implements OnInit {

  title = 'Lista de Campeonatos';
  
  campeonatos: Campeonato[] = [];

  verDetalleButton = true;
  selCampeonatoId: number = -1;

  constructor(private readonly campeonatoService: CampeonatoService, @Inject(Router) private readonly router: Router) { }
  
  /**
   * OnInit lifecycle hook.
   *
   * Subscribes to CampeonatoService.getCampeonatos() and assigns the response to the campeonatos property.
   *
   * If there is an error, logs the error to the console.
   */
  ngOnInit(): void {
    this.campeonatoService.getCampeonatos().subscribe({
      next: (data: Campeonato[]) => this.campeonatos = data,
      error: error => console.error('Error al recuperar campeonatos', error)
    });
  }
  
	deleteCampeonato(id: number): void {
    this.campeonatoService.deleteCampeonato(id).subscribe({
      next: () => {
        this.campeonatos = this.campeonatos.filter(campeonato => campeonato.id !== id);
      },
      error: error => console.error('Error al borrar campeonato', error)
    })
	}
  
	editCampeonato(id: number): void {
		this.router.navigate(['/campeonatos/edit', id]);
	}

  onFocus(campeonato: Campeonato): void {
    console.log(`Focused on campeonato: ${campeonato.id}`);
    // Aquí puedes añadir la lógica que desees al enfocar el campeonato
  }

  onBlur(campeonato: Campeonato): void {
    console.log(`Blurred from campeonato: ${campeonato.id}`);
    // Aquí puedes añadir la lógica que desees al quitar el foco del campeonato
  }
}
