import { Component, OnInit } from '@angular/core';
import { Campeonato } from '../../models/campeonato.model';
import { CampeonatoService } from '../../services/campeonato.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-campeonato-list',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatCardModule, 
  ],
  templateUrl: './campeonato-list.component.html',
  styleUrls: ['./campeonato-list.component.scss']
})
export class CampeonatoListComponent implements OnInit {

  title = 'Lista de Campeonatos';
  
  campeonatos: Campeonato[] = [];

  verDetalleButton = true;
  selCampeonatoId = -1;

  constructor(private campeonatoService: CampeonatoService) { }
  
  ngOnInit(): void {
    this.campeonatoService.getCampeonatos().subscribe({
      next: (data: Campeonato[]) => this.campeonatos = data,
      error: error => console.error('Error al recuperar campeonatos', error)
    });
  }
  
	deleteCampeonato(arg0: number) {
		throw new Error('Method not implemented.');
	}
	editCampeonato(arg0: number) {
		throw new Error('Method not implemented.');
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
