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

  ngAfterViewInit(): void {
    this.jugadores.sort = this.sort;
    this.jugadores.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.jugadorService.getJugadores().subscribe({
      next: (data: Jugador[]) => {
        this.jugadores.data = data;
        this.jugadores.paginator = this.paginator;
      },
      error: error => console.error('Error al recuperar jugadores', error)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.jugadores.filter = filterValue.trim().toLowerCase();

    if (this.jugadores.paginator) {
      this.jugadores.paginator.firstPage();
    }
  }

  editarJugador(jugador: Jugador): void {
    this.router.navigate(['/jugadores/edit', jugador.id]);
  }

  verJugador(jugador: Jugador){
    this.router.navigate(['jugadores/', jugador.id]);
  }

  borrarJugador(jugador: Jugador){
    if (confirm(`¿Estás seguro de que deseas borrar a ${jugador.nombreCompleto}?`)) {
      this.jugadorService.deleteJugador(jugador.id).subscribe(() => {
        this.jugadores.data = this.jugadores.data.filter(j => j.id !== jugador.id);
      }, error => {
        console.error('Error al borrar jugador', error);
      });
    }
  }

  /**
   * Navega a la ruta para agregar un nuevo jugador
   */
  agregarJugador(): void {
    this.router.navigate(['/jugadores/new']);
  }
}
