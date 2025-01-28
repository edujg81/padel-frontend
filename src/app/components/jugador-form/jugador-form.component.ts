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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Observable, of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-jugador-form',
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
        MatCheckboxModule,
        MatSelectModule,
        MatIconModule
    ],
    templateUrl: './jugador-form.component.html',
    styleUrl: './jugador-form.component.scss'
})
export class JugadorFormComponent implements OnInit {
  jugadorForm!: FormGroup;
  jugadorId!: number | null;
  isEditing: boolean = false;
  jugador$: Observable<Jugador>;

  constructor(
    private readonly fb: FormBuilder, 
    private readonly jugadorService: JugadorService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.jugador$ = of(null as unknown as Jugador); // Initialize with null
  }

  ngOnInit(): void {
    this.initializeForm();
    this.jugadorId = +this.route.snapshot.paramMap.get('id')!;

    // Si existe un id, es edición
    if (this.jugadorId) {
      this.isEditing = true;
      this.jugador$ = this.jugadorService.getJugadorById(this.jugadorId);
      this.jugador$.subscribe({
        next: (jugador: Jugador) => this.jugadorForm.patchValue({
          id: jugador.id,
          dni: jugador.dni,
          nombreCompleto: jugador.nombreCompleto,
          telefono: jugador.telefono,
          email: jugador.email,
          lesionado: jugador.lesionado,
          fechaAlta: jugador.fechaAlta,
          fechaBaja: jugador.fechaBaja,
          sexo: jugador.sexo,
          estado: jugador.estado
        }),
        error: error => console.error('Error al recuperar el jugador', error)
      });
    }
  }

  private initializeForm() {
    this.jugadorForm = this.fb.group({
      id: [''],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}[A-Z]$')]],
      nombreCompleto: ['', Validators.required],
      telefono: [''],
      email: ['', [Validators.required, Validators.email]],
      sexo: ['', Validators.required],
      estado: [''],
      lesionado: [false],
      fechaAlta: ['']
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