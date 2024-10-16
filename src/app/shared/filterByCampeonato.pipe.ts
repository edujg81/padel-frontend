import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCampeonato',
  standalone: true
})
export class FilterByCampeonatoPipe implements PipeTransform {
  transform(inscripciones: any[], campeonatoId: number): any[] {
    return inscripciones.filter(inscripcion => inscripcion.campeonatoId === campeonatoId);
  }
}