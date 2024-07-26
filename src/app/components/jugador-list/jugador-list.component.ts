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
    MatSortModule,
    MatSort,
    FlexLayoutModule
  ],
  templateUrl: './jugador-list.component.html',
  styleUrl: './jugador-list.component.scss'
})
export class JugadorListComponent implements OnInit, AfterViewInit {
 
  title = 'Lista de Jugadores';

  dibujaColumnas: string[] = ['nombreCompleto', 'email', 'sexo', 'estado', 'lesionado', 'fechaAlta', 'acciones'];
  jugadores: MatTableDataSource<Jugador> = new MatTableDataSource<Jugador>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private jugadorService: JugadorService) {}

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

  editarJugador(jugador: Jugador) {
    this.jugadorService.updateJugador(jugador).subscribe(updatedJugador => {
      // Actualiza la tabla después de editar
      const index = this.jugadores.data.findIndex(
        j => j.id === updatedJugador.id
      );
      
      if (index !== -1) {
        this.jugadores.data[index] = updatedJugador;
        this.jugadores.data = [...this.jugadores.data];
      }
    });
  }

  verJugador(jugador: Jugador){
    // no implementado
  }

  borrarJugador(jugador: Jugador){
    // no implementado
  }
}
