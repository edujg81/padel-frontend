import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JugadorService } from '../../services/jugador.service';
import { Jugador } from '../../models/jugador.model';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTable } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-jugador-list',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbar,
    MatTable,
    MatIcon
  ],
  templateUrl: './jugador-list.component.html',
  styleUrl: './jugador-list.component.scss'
})
export class JugadorListComponent implements OnInit {
 
  dibujaColumnas: string[] = ['nombreCompleto', 'email', 'sexo', 'estado', 'acciones'];
  jugadores: Jugador[] = [];

  constructor(private jugadorService: JugadorService) {}

  ngOnInit(): void {
    this.jugadorService.getJugadores().subscribe((data: Jugador[]) => {
      this.jugadores = data;
    });
  }

  editarJugador(jugador: Jugador): void {
    // Lógica para editar el jugador
    console.log('Editar jugador:', jugador);
  }
}
