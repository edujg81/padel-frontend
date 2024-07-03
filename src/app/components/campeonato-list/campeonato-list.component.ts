import { Component, OnInit } from '@angular/core';
import { CampeonatoService } from '../../services/campeonato.service';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { Campeonato } from '../../models/campeonato.model';
import { AppComponent } from '../../app.component';
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-campeonato-list',
  standalone: true,
  imports: [
    AppComponent,
    CommonModule,
    NgIf,
    NgFor,
    MatCard,
    MatCardContent,
    MatCardActions,
    MatCardTitle
  ],
  templateUrl: './campeonato-list.component.html',
  styleUrl: './campeonato-list.component.scss'
})
export class CampeonatoListComponent implements OnInit {
deleteCampeonato(arg0: number) {
throw new Error('Method not implemented.');
}
editCampeonato(arg0: number) {
throw new Error('Method not implemented.');
}
  campeonatos: Campeonato[] = [];

  constructor(private campeonatoService: CampeonatoService) { }

  ngOnInit(): void {
    this.campeonatoService.getCampeonatos().subscribe({
      next: data => this.campeonatos = data,
      error: error => console.error('Error al recuperar campeonatos', error)
    });
  }
}
