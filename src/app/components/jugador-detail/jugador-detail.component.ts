import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { JugadorService } from '../../services/jugador.service';
import { Jugador } from '../../models/jugador.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-jugador-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './jugador-detail.component.html',
  styleUrl: './jugador-detail.component.scss'
})
export class JugadorDetailComponent implements OnInit {
  
  jugador: Jugador | undefined;

  selJugadorId = -1;
 
  
  constructor(private readonly jugadorService: JugadorService, private router: Router, private readonly route: ActivatedRoute) {
    this.selJugadorId = Number(this.route.snapshot.params['id']);
  }

  ngOnInit(): void {
    const id = this.selJugadorId;
    this.jugadorService.getJugadorById(id).subscribe((jugador: Jugador) => {
      this.jugador = jugador;
    });
  }

  editJugador(id: number): void {
    this.router.navigate(['/jugadores/edit', id]);
  }

  deleteJugador(id: number): void {
    this.jugadorService.deleteJugador(id).subscribe({
      next: () => {
        this.router.navigate(['/jugadores']);
      },
      error: error => console.error('Error al borrar jugador', error)
    });
  }
}