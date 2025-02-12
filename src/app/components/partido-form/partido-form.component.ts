import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PartidoService } from '../../services/partido.service';
import { Partido } from '../../models/partido.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
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
  ],
  templateUrl: './partido-form.component.html',
  styleUrls: ['./partido-form.component.scss'],
})
export class PartidoFormComponent implements OnInit {
  //partido!: Partido;
  partido: Partido = {} as Partido;

  setMappings: { [key: number]: { equipo1: keyof Partido; equipo2: keyof Partido } } = {
    1: { equipo1: 'juegosGanadosEquipo1Set1', equipo2: 'juegosGanadosEquipo2Set1' },
    2: { equipo1: 'juegosGanadosEquipo1Set2', equipo2: 'juegosGanadosEquipo2Set2' },
    3: { equipo1: 'juegosGanadosEquipo1Set3', equipo2: 'juegosGanadosEquipo2Set3' },
  };

  constructor(
    private readonly partidoService: PartidoService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    @Inject(ActivatedRoute) private readonly route: ActivatedRoute
  ) {}

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
    return !!this.partido?.fecha &&
         !!this.partido?.pista &&
         [1, 2, 3].every((set) => {
           const equipo1 = this.partido?.[this.setMappings[set].equipo1];
           const equipo2 = this.partido?.[this.setMappings[set].equipo2];

           // Verifica que equipo1 y equipo2 son de tipo number y mayores o iguales a 0
           return typeof equipo1 === 'number' && equipo1 >= 0 &&
                  typeof equipo2 === 'number' && equipo2 >= 0;
         });
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