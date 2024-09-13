import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JugadorService } from '../../services/jugador.service';
import { Jugador } from '../../models/jugador.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jugador-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jugador-detail.component.html',
  styleUrl: './jugador-detail.component.scss'
})
export class JugadorDetailComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  jugadorService = inject(JugadorService);
  jugador: Jugador | undefined;

  selJugadorId = -1;
  
  constructor() {
    this.selJugadorId = Number(this.route.snapshot.params['id']);
  }

  ngOnInit(): void {
   const id = this.selJugadorId;
    this.jugadorService.getJugadorById(id).subscribe(data => {
      this.jugador = data;
    });
  }
}