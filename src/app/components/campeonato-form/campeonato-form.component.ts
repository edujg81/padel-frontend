import { ChangeDetectionStrategy, Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { CampeonatoService } from '../../services/campeonato.service';
import { CommonModule } from '@angular/common';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Campeonato } from '../../models/campeonato.model';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-campeonato-form',
    standalone: true,
    templateUrl: './campeonato-form.component.html',
    styleUrls: ['./campeonato-form.component.scss'],
    imports: [
        CommonModule, // Añade CommonModule a la lista de imports
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        FormsModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        RouterModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampeonatoFormComponent implements OnInit {
  campeonatoForm!: FormGroup;  // Declaración de FormGroup
  campeonatoId!: number | null;
  isEditing: boolean = false;
  campeonato$: Observable<Campeonato>;

  constructor(
    @Inject(FormBuilder) private readonly fb: FormBuilder,  // Inyección de FormBuilder en el constructor
    private readonly campeonatoService: CampeonatoService,
    @Inject(ActivatedRoute) private readonly route: ActivatedRoute,
    @Inject(Router) private readonly router: Router
  ) {
    this.campeonato$ = of(null as unknown as Campeonato); // Initialize with null
  }

  alertFormValues(formGroup: FormGroup) {
    alert(JSON.stringify(formGroup.value, null, 2));
  }

  ngOnInit(): void {
    this.initializeForm();
    this.campeonatoId = +this.route.snapshot.paramMap.get('id')!;

    // Si existe un id, es edición
    if (this.campeonatoId) {
      this.isEditing = true;
      this.campeonato$ = this.campeonatoService.getCampeonato(this.campeonatoId);
      this.campeonato$.subscribe({
        next: (campeonato: Campeonato) => this.campeonatoForm.patchValue({
          year: campeonato.year,
          categoria: campeonato.categoria,
          division: campeonato.division,
          estado: campeonato.estado,
          puntosPorVictoria: campeonato.puntosPorVictoria,
          puntosPorDerrota: campeonato.puntosPorDerrota, // Puntos por derrota antes de la edición
          activo: campeonato.activo
        }),
        error: error => console.error('Error al recuperar el campeonato', error)
      });
    }
  }
  initializeForm() {
    this.campeonatoForm = this.fb.group({
      year: ['', Validators.required],
      categoria: ['', Validators.required],
      division: ['', Validators.required],
      estado: ['Sin iniciar', Validators.required],
      puntosPorVictoria: ['2', Validators.required],
      puntosPorDerrota: ['0', Validators.required],
      activo: [true]
    });
  }

  onSubmit(): void {
    if (this.campeonatoForm.valid) {
      const campeonato: Campeonato = this.campeonatoForm.value;

      if (this.isEditing) {
        this.campeonatoService.updateCampeonato(this.campeonatoId ?? 0, campeonato).subscribe({
          next: () => {
            console.log('Campeonato actualizado');
            this.router.navigate(['/campeonatos']); // Redirige a la lista de campeonatos
          },
          error: error => console.error('Error al actualizar campeonato', error)
        });
      } else {
          this.campeonatoService.createCampeonato(this.campeonatoForm.value).subscribe({
            next: () => { 
              console.log('Campeonato creado'); 
              this.router.navigate(['/campeonatos'])
            },
            error: error => console.error('Error creando campeonato:', error)
          });
      }
    }
  } 
}