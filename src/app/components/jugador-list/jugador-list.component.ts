import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JugadorService } from '../../services/jugador.service';
import { Jugador } from '../../models/jugador.model';

@Component({
  selector: 'app-jugador-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jugador-list.component.html',
  styleUrl: './jugador-list.component.scss'
})
export class JugadorListComponent implements OnInit {
  jugadores: Jugador[] = [];

  constructor(private jugadorService: JugadorService) {}

  ngOnInit(): void {
    this.jugadorService.getJugadores().subscribe((data: Jugador[]) => {
      this.jugadores = data;
    });
  }
}
