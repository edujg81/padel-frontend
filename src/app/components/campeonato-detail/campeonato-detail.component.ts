import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CampeonatoService } from '../../services/campeonato.service';
import { Campeonato } from '../../models/campeonato.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-campeonato-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
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

  constructor() {
    this.selCampeonatoId = Number(this.route.snapshot.params['id']);
  }

  ngOnInit(): void {
   const id = this.selCampeonatoId;
    this.campeonatoService.getCampeonato(id).subscribe(data => {
      this.campeonato = data;
    });
  }
}