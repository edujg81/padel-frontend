import { Component, OnInit } from '@angular/core';
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
  campeonato: Campeonato | undefined;

  constructor(
    private route: ActivatedRoute,
    private campeonatoService: CampeonatoService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.campeonatoService.getCampeonato(id).subscribe(data => {
      this.campeonato = data;
    });
  }
}