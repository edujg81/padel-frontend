import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PartidoService } from '../../services/partido.service';
import { Partido } from '../../models/partido.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    ReactiveFormsModule
  ],
  templateUrl: './partido-form.component.html',
  styleUrls: ['./partido-form.component.scss'],
})
export class PartidoFormComponent implements OnInit {
  //partido!: Partido;
  partido: Partido = {} as Partido;
  formGroup: FormGroup;

  setMappings: { [key: number]: { equipo1: keyof Partido; equipo2: keyof Partido } } = {
    1: { equipo1: 'juegosGanadosEquipo1Set1', equipo2: 'juegosGanadosEquipo2Set1' },
    2: { equipo1: 'juegosGanadosEquipo1Set2', equipo2: 'juegosGanadosEquipo2Set2' },
    3: { equipo1: 'juegosGanadosEquipo1Set3', equipo2: 'juegosGanadosEquipo2Set3' },
  };

  constructor(
    private readonly partidoService: PartidoService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    @Inject(ActivatedRoute) private readonly route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({
      set3: this.fb.group({
        equipo1: [{ value: 0, disabled: true }],
        equipo2: [{ value: 0, disabled: true }]
      })
    });
  }

  ngOnInit(): void {
    const partidoId = Number(this.route.snapshot.params['id']);
    this.partidoService.getPartidoById(partidoId).subscribe({
      next: (data) => (this.partido = data),
      error: (err) => console.error('Error al obtener los datos del partido:', err),
    });
  }

  /**
   * Valida si el formulario está listo para enviar.
   */
  isFormValid(): boolean {
    // return !!this.partido?.fecha &&
    //      !!this.partido?.pista &&
    //      [1, 2, 3].every((set) => {
    //        const equipo1 = this.partido?.[this.setMappings[set].equipo1];
    //        const equipo2 = this.partido?.[this.setMappings[set].equipo2];

    //        // Verifica que equipo1 y equipo2 son de tipo number y mayores o iguales a 0
    //        return typeof equipo1 === 'number' && equipo1 >= 0 &&
    //               typeof equipo2 === 'number' && equipo2 >= 0 && 
    //               (((equipo1 <= 6 && equipo2 <= equipo1 - 2) || (equipo1 === 7 && equipo2 >= 5)) || 
    //               ((equipo2 <= 6 && equipo1 <= equipo2 - 2) || (equipo2 === 7 && equipo1 >= 5)));
    //      });
    if (!this.partido?.fecha || !this.partido?.pista) {
      return false;
    }
  
    const setsGanados = [1, 2].map((set) => {
      const equipo1 = this.partido?.[this.setMappings[set].equipo1];
      const equipo2 = this.partido?.[this.setMappings[set].equipo2];
  
      if (typeof equipo1 === 'number' && equipo1 >= 0 &&
          typeof equipo2 === 'number' && equipo2 >= 0) {
        if ((equipo1 <= 6 && equipo2 <= equipo1 - 2) || (equipo1 === 7 && equipo2 >= 5)) {
          return 'equipo1';
        } else if ((equipo2 <= 6 && equipo1 <= equipo2 - 2) || (equipo2 === 7 && equipo1 >= 5)) {
          return 'equipo2';
        }
      }
      return null;
    });
  
    const set3Necesario = setsGanados[0] !== setsGanados[1];
  
    if (!set3Necesario) {
      // Deshabilitar campos del Set 3 y establecerlos en 0
      this.formGroup.get('set3.equipo1')?.setValue(0);
      this.formGroup.get('set3.equipo1')?.disable();
      this.formGroup.get('set3.equipo2')?.setValue(0);
      this.formGroup.get('set3.equipo2')?.disable();
    } else {
      // Habilitar campos del Set 3
      this.formGroup.get('set3.equipo1')?.enable();
      this.formGroup.get('set3.equipo2')?.enable();
    }
  
    // Validar Set 3 solo si es necesario
    if (set3Necesario) {
      const equipo1Set3 = this.partido?.[this.setMappings[3].equipo1];
      const equipo2Set3 = this.partido?.[this.setMappings[3].equipo2];
  
      if (!(typeof equipo1Set3 === 'number' && equipo1Set3 >= 0 &&
            typeof equipo2Set3 === 'number' && equipo2Set3 >= 0 &&
            (((equipo1Set3 <= 6 && equipo2Set3 <= equipo1Set3 - 2) || (equipo1Set3 === 7 && equipo2Set3 >= 5)) ||
             ((equipo2Set3 <= 6 && equipo1Set3 <= equipo2Set3 - 2) || (equipo2Set3 === 7 && equipo1Set3 >= 5))))) {
        return false;
      }
    }
  
    return true;
  }

 /**
   * Registra el resultado del partido.
   */
  registrarResultado(): void {
    if (!this.isFormValid()) {
      this.snackBar.open('Completa todos los campos antes de registrar el resultado.', 'Cerrar', { duration: 3000 });
      return;
    }

    this.partidoService.updatePartido(this.partido.id, this.partido).subscribe({
      next: (updatedPartido) => {
        console.log('Resultado registrado:', updatedPartido);
        //alert('Resultado registrado con éxito');
        this.snackBar.open('Resultado registrado con éxito', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/jornadas']);
      },
      error: (err) => {
        console.error('Error al registrar el resultado:', err);
        this.snackBar.open('Error al registrar el resultado. Intenta de nuevo.', 'Cerrar', { duration: 3000 });
      },
    });
  }

  /**
   * Cancela el formulario y regresa a la lista.
   */
  cancelar(): void {
    this.router.navigate(['/jornadas']);
  }
}