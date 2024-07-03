import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CampeonatoService } from '../../services/campeonato.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-campeonato-form',
  standalone: true,
  templateUrl: './campeonato-form.component.html',
  styleUrls: ['./campeonato-form.component.scss'],
  imports: [
    CommonModule,  // Añade CommonModule a la lista de imports
    ReactiveFormsModule
  ]
})
export class CampeonatoFormComponent implements OnInit {
  campeonatoForm: FormGroup;  // Declaración de FormGroup

  constructor(
    private fb: FormBuilder,  // Inyección de FormBuilder en el constructor
    private campeonatoService: CampeonatoService,
    private router: Router
  ) {
    this.campeonatoForm = this.fb.group({
      year: ['', Validators.required],
      categoria: ['', Validators.required],
      division: ['', Validators.required],
      estado: ['Sin iniciar', Validators.required],
      activo: [true],
      puntosPorVictoria: [2, Validators.required],
      puntosPorDerrota: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    // Implementación opcional de inicialización
  }

  onSubmit(): void {
    if (this.campeonatoForm.valid) {
      this.campeonatoService.createCampeonato(this.campeonatoForm.value).subscribe({
        next: () => this.router.navigate(['/campeonatos']),
        error: error => console.error('Error creando campeonato:', error)
      });
    }
  }
}