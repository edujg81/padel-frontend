import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JugadorService } from '../../services/jugador.service';
import { Jugador } from '../../models/jugador.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jugador-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule
  ],
  templateUrl: './jugador-form.component.html',
  styleUrl: './jugador-form.component.scss'
})
export class JugadorFormComponent implements OnInit {
  jugadorForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private jugadorService: JugadorService,
    private router: Router
  ) {
    this.jugadorForm = this.fb.group({
      dni: ['', Validators.required],
      nombreCompleto: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
      sexo: ['', Validators.required],
      estado: ['', Validators.required],
      lesionado: [false, Validators.required]
      // Agrega más campos según sea necesario
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.jugadorForm.valid) {
      this.jugadorService.createJugador(this.jugadorForm.value).subscribe({
        next: () => this.router.navigate(['/jugadores']),
        error: error => console.error('Error creando jugador:', error)
      });
    }
  }
}