import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampeonatoService } from '../../services/campeonato.service';
import { Campeonato } from '../../models/campeonato.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-campeonato-detail',
  standalone: true,
  imports: [CommonModule],
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