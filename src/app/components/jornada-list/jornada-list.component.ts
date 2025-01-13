import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JornadaService } from '../../services/jornada.service';
import { Jornada } from '../../models/jornada.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-jornada-list',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './jornada-list.component.html',
    styleUrls: ['./jornada-list.component.scss']
})
export class JornadaListComponent implements OnInit {
    jornadaService = Inject(JornadaService);
    route = Inject(ActivatedRoute);
    router = Inject(Router);
  
    campeonatoId: number | null = null;
    jornadas: Jornada[] = [];
  
    ngOnInit(): void {
      // Obtener el ID del campeonato de los parámetros de la ruta
      this.route.params.subscribe({
        next: (params: { [x: string]: any; }) => {
          console.log('Parámetros:', params);
          this.campeonatoId = Number(params['id']); // Convertir a número
          if (isNaN(this.campeonatoId)) {
            console.error('ID de campeonato no válido');
          } else {
            console.log('ID del campeonato:', this.campeonatoId);
            this.obtenerJornadas(); // Llamar al método para obtener jornadas
          }
        },
        error: (err: any) => console.error('Error al obtener el ID del campeonato:', err)
      });
    }
  
    obtenerJornadas(): void {
      this.jornadaService.getJornadasByCampeonatoId(this.campeonatoId!).subscribe({
        next: (data: Jornada[]) => {
          this.jornadas = data;
        },
        error: (err: any) => console.error('Error al obtener jornadas:', err)
      });
    }
  
    generarNuevaJornada(): void {
      this.jornadaService.generarJornada(this.campeonatoId!).subscribe({
        next: (jornada: Jornada) => {
          console.log('Nueva jornada generada:', jornada);
          this.obtenerJornadas(); // Actualizar la lista
        },
        error: (err: any) => console.error('Error al generar jornada:', err)
      });
    }
  
    verDetalleJornada(jornadaId: number): void {
      this.router.navigate(['/jornadas', jornadaId]);
    }
  }