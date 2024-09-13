import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JugadorService } from '../../services/jugador.service';
import { Jugador } from '../../models/jugador.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-jugador-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatOption,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './jugador-form.component.html',
  styleUrl: './jugador-form.component.scss'
})
export class JugadorFormComponent implements OnInit {
  jugadorForm!: FormGroup;
  jugadorId!: number | null;
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private jugadorService: JugadorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.jugadorId = +this.route.snapshot.paramMap.get('id')!;

    // Si existe un id, es edición
    if (this.jugadorId) {
      this.isEditing = true;
      this.jugadorService.getJugadorById(this.jugadorId).subscribe({
        next: (jugador: Jugador) => this.jugadorForm.patchValue(jugador),
        error: error => console.error('Error al recuperar el jugador', error)
      });
    }
  }

  private initializeForm() {
    this.jugadorForm = this.fb.group({
      dni: ['', Validators.required],
      nombreCompleto: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
      sexo: ['', Validators.required],
      estado: ['', Validators.required],
      lesionado: [false, Validators.required],
      fechaAlta: ['', Validators.required]
      // Agrega más campos según sea necesario
    });
  }

  onSubmit(): void {
    if (this.jugadorForm.invalid) {
      return;
    }

    const jugador: Jugador = this.jugadorForm.value;

    if (this.isEditing) {
      this.jugadorService.updateJugador(jugador).subscribe({
        next: () => {
          this.router.navigate(['/jugadores']); // Redirige a la lista de jugadores
        },
        error: error => console.error('Error al actualizar jugador', error)
      });
    } else {
      this.jugadorService.createJugador(jugador).subscribe({
        next: () => {
          this.router.navigate(['/jugadores']); // Redirige a la lista de jugadores
        },
        error: error => console.error('Error al crear jugador', error)
      });
    }
  }

  // Cancelar y regresar a la lista
  onCancel() {
    this.router.navigate(['/jugadores']);
  }
}