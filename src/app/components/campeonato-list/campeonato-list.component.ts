import { Component, OnInit } from '@angular/core';
import { CampeonatoService } from '../../services/campeonato.service';
import { CommonModule } from '@angular/common';
import { Campeonato } from '../../models/campeonato.model';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-campeonato-list',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgFor
  ],
  templateUrl: './campeonato-list.component.html',
  styleUrl: './campeonato-list.component.scss'
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
}
