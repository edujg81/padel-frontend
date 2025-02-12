import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoFriendly'
})
export class EstadoFriendlyPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    // Convierte "SIN_INICIAR" a "Sin iniciar", etc.
    return value.replace('_', ' ').toLowerCase().replace(/^(.)/, (match) => match.toUpperCase());
  }

}
