import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JugadorService } from '../../services/jugador.service';
import { Jugador } from '../../models/jugador.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-jugador-list',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginator,
    MatButtonModule,
    MatSortModule,
    MatSort,
    FlexLayoutModule,
    RouterLink
  ],
  templateUrl: './jugador-list.component.html',
  styleUrl: './jugador-list.component.scss'
})
export class JugadorListComponent implements OnInit, AfterViewInit {

  title = 'Lista de Jugadores';

  dibujaColumnas: string[] = ['nombreCompleto', 'email', 'sexo', 'estado', 'lesionado', 'fechaAlta', 'acciones'];
  jugadores: MatTableDataSource<Jugador> = new MatTableDataSource<Jugador>();

  selJugadorId: number = -1;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private jugadorService: JugadorService, private router: Router) {}

  /**
   * Inicializa los componentes de ordenamiento y paginacion en la tabla
   * una vez que el componente se ha renderizado.
   */
  ngAfterViewInit(): void {
    this.jugadores.sort = this.sort;
    this.jugadores.paginator = this.paginator;
  }

  /**
   * Recupera la lista de jugadores al inicializar el componente
   * y la asigna al datasource de la tabla.
   */
  ngOnInit(): void {
    this.jugadorService.getJugadores().subscribe({
      next: (data: Jugador[]) => {
        this.jugadores.data = data;
        this.jugadores.paginator = this.paginator;
      },
      error: error => console.error('Error al recuperar jugadores', error)
    });
  }

  /**
   * Filtra la tabla de jugadores por el valor ingresado en el input de
   * filtrado. El valor se convierte a min sculas y se aplica como filtro a
   * la tabla. Despu s, se vuelve a la primera p gina de la tabla
   * (si existe paginaci n). Se llama cada vez que el usuario escribe algo
   * en el input de filtrado.
   * @param event El evento de change del input de filtrado.
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.jugadores.filter = filterValue.trim().toLowerCase();

    if (this.jugadores.paginator) {
      this.jugadores.paginator.firstPage();
    }
  }

  /**
   * Navega a la ruta para editar un jugador existente
   * @param jugador El jugador a editar
   */
  editarJugador(jugador: Jugador): void {
    this.router.navigate(['/jugadores/edit', jugador.id]);
  }

  /**
   * Navega a la ruta para ver los detalles de un jugador
   * @param jugador El jugador a ver
   */
  verJugador(jugador: Jugador){
    this.router.navigate(['jugadores/', jugador.id]);
  }


  /**
   * Da de baja un jugador
   * @param jugador El jugador a dar de baja
   */
  bajaJugador(jugador: Jugador){
      this.jugadorService.darDeBajaJugador(jugador).subscribe(() => {
      
        console.log('Jugador dado de baja correctamente');
      }, error => {
        console.error('Error al dar de baja al jugador', error);
      });
  }

  /**
   * Navega a la ruta para agregar un nuevo jugador
   */
  agregarJugador(): void {
    this.router.navigate(['/jugadores/new']);
  }
}
