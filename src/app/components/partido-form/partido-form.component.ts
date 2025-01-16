import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PartidoService } from '../../services/partido.service';
import { Partido } from '../../models/partido.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-partido-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './partido-form.component.html',
  styleUrls: ['./partido-form.component.scss'],
})
export class PartidoFormComponent implements OnInit {
  partido!: Partido;

  setMappings: { [key: number]: { equipo1: keyof Partido; equipo2: keyof Partido } } = {
    1: { equipo1: 'juegosGanadosEquipo1Set1', equipo2: 'juegosGanadosEquipo2Set1' },
    2: { equipo1: 'juegosGanadosEquipo1Set2', equipo2: 'juegosGanadosEquipo2Set2' },
    3: { equipo1: 'juegosGanadosEquipo1Set3', equipo2: 'juegosGanadosEquipo2Set3' },
  };

  constructor(
    private readonly partidoService: PartidoService,
    private readonly router: Router,
    @Inject(ActivatedRoute) private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const partidoId = Number(this.route.snapshot.params['id']);
    this.partidoService.getPartidoById(partidoId).subscribe({
      next: (data) => (this.partido = data),
      error: (err) => console.error('Error al obtener los datos del partido:', err),
    });
  }

  registrarResultado(): void {
    this.partidoService.updatePartido(this.partido.id, this.partido).subscribe({
      next: (updatedPartido) => {
        console.log('Resultado registrado:', updatedPartido);
        alert('Resultado registrado con éxito');
        this.router.navigate(['/jornadas']);
      },
      error: (err) => console.error('Error al registrar el resultado:', err),
    });
  }
}