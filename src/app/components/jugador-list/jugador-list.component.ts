import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JugadorService } from '../../services/jugador.service';
import { Jugador } from '../../models/jugador.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';  // Esto es necesario para el funcionamiento de `mat-datepicker`.
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { Router, RouterLink } from '@angular/router';
//import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-jugador-list',
  standalone: true,
  imports: [
    CommonModule,
  //  ReactiveFormsModule,
  //  FormsModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginator,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatDatepickerModule, // Asegúrate de incluirlo aquí
    MatNativeDateModule,  // Importa también este módulo para las fechas
    FlexLayoutModule,
    RouterLink
  ],
  templateUrl: './jugador-list.component.html',
  styleUrl: './jugador-list.component.scss'
})
export class JugadorListComponent implements OnInit, AfterViewInit {
  title = 'Lista de Jugadores';

  // Rango de fechas
  fechaInicio: Date | null = null;
  fechaFin: Date | null = null;

  dibujaColumnas: string[] = ['nombreCompleto', 'email', 'sexo', 'estado', 'lesionado', 'fechaAlta', 'acciones'];
  jugadores = new MatTableDataSource<Jugador>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private jugadorService: JugadorService, private router: Router, private snackBar: MatSnackBar) {}

   /**
   * Aplica un filtro en la tabla de jugadores.
   * @param event Evento de entrada en el campo de búsqueda.
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.jugadores.filter = filterValue;

    if (this.jugadores.paginator) {
      this.jugadores.paginator.firstPage();
    }
  }

  /*applyDateFilter() {
    // Verifica si ambas fechas están definidas
    if (this.fechaInicio && this.fechaFin) {
      this.jugadores.data = this.jugadores.data.filter(jugador => {
        const fechaAlta = new Date(jugador.fechaAlta); // Asegúrate de que "fechaAlta" sea un string en formato fecha
        return fechaAlta >= this.fechaInicio! && fechaAlta <= this.fechaFin!;
      });
    } else {
      // Si no se seleccionan fechas, carga los datos originales
      this.loadJugadores();
    }
  }*/

  /**
   * Recupera la lista de jugadores al inicializar el componente
   * y la asigna al datasource de la tabla.
   */
  ngOnInit(): void {
    this.loadJugadores();
  }

  /**
   * Inicializa los componentes de ordenamiento y paginacion en la tabla
   * una vez que el componente se ha renderizado.
   */
  ngAfterViewInit(): void {
    this.jugadores.paginator = this.paginator;
    this.jugadores.sort = this.sort;
  }

  /**
   * Carga la lista de jugadores desde el servicio.
   */
  loadJugadores(): void {
    this.jugadorService.getJugadores().subscribe({
      /*next: (data: Jugador[]) => {  
        this.jugadores.data = data;
        this.jugadores.paginator = this.paginator;
      },*/
      next: (data: Jugador[]) => this.jugadores.data = data,
      error: error => console.error('Error al recuperar jugadores', error)
    });
  }

  /**
   * Navega al formulario para editar un jugador existente.
   * @param jugador Jugador a editar.
   */
  editarJugador(jugador: Jugador): void {
    this.router.navigate(['/jugadores/edit', jugador.id]);
  }

  /**
   * Navega al detalle del jugador.
   * @param jugador Jugador a visualizar.
   */
  verJugador(jugador: Jugador){
    this.router.navigate(['/jugadores', jugador.id]);
  }

  /**
   * Da de baja a un jugador y actualiza la tabla.
   * @param jugador Jugador a dar de baja.
   */
  bajaJugador(jugador: Jugador): void {
    if (confirm(`¿Estás seguro que quieres dar de baja a ${jugador.nombreCompleto}?`)) {
      this.jugadorService.darDeBajaJugador(jugador).subscribe({
        next: () => {
          this.snackBar.open('Jugador dado de baja correctamente', 'Cerrar', { duration: 3000 })
          this.loadJugadores()
        },
        error: (error) => this.snackBar.open('Error al dar de baja al jugador', 'Cerrar', { duration: 3000 })
      });
    }
  }

  /**
   * Navega al formulario para agregar un nuevo jugador.
   */
  agregarJugador(): void {
    this.router.navigate(['/jugadores/new']);
  }
}
