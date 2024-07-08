import { Component, OnInit } from '@angular/core';
import { Campeonato } from '../../models/campeonato.model';
import { CampeonatoService } from '../../services/campeonato.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-campeonato-list',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatCardModule, 
    HttpClientModule],
  templateUrl: './campeonato-list.component.html',
  styleUrls: ['./campeonato-list.component.scss']
})
export class CampeonatoListComponent implements OnInit {

  campeonatos: Campeonato[] = [];

  constructor(private campeonatoService: CampeonatoService) { }

  ngOnInit(): void {
    this.campeonatoService.getCampeonatos().subscribe({
      next: data => this.campeonatos = data,
      error: error => console.error('Error al recuperar campeonatos', error)
    });
  }
  
	deleteCampeonato(arg0: number) {
		throw new Error('Method not implemented.');
	}
	editCampeonato(arg0: number) {
		throw new Error('Method not implemented.');
	}
}
