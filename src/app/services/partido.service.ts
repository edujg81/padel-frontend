import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partido } from '../models/partido.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PartidoService {
  private baseUrl = `${environment.apiUrl}/public/partidos`;

  constructor(private readonly http: HttpClient) {}

  // Obtener un partido por su ID
  getPartidoById(partidoId: number): Observable<Partido> {
    return this.http.get<Partido>(`${this.baseUrl}/${partidoId}`);
  }

  getPartidosByJornadaId(jornadaId: number): Observable<Partido[]> {
    return this.http.get<Partido[]>(`${this.baseUrl}/jornada/${jornadaId}`);
  }

  // Actualizar el resultado de un partido
  updatePartido(partidoId: number, partidoDetails: Partial<Partido>): Observable<Partido> {
    return this.http.put<Partido>(`${this.baseUrl}/${partidoId}`, partidoDetails);
  }
}