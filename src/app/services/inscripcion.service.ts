import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inscripcion } from '../models/inscripcion.model';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  private readonly apiUrl = 'http://localhost:8080/inscripciones';

  constructor(private readonly http: HttpClient) { }

  getAllInscripciones(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(this.apiUrl);
  }

  getInscripcion(id: number): Observable<Inscripcion> {
    return this.http.get<Inscripcion>(`${this.apiUrl}/${id}`);
  }

  getInscripcionesByCampeonatoId(campeonatoId: number): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(`${this.apiUrl}/campeonato/${campeonatoId}`);
  }

  inscribirJugador(campeonatoId: number, jugadorId: number): Observable<Inscripcion> {
    const params = new HttpParams().set('campeonatoId', campeonatoId).set('jugadorId', jugadorId);
    return this.http.post<Inscripcion>(this.apiUrl, null, { params });
  }

  desinscribirJugador(campeonatoId: number, jugadorId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${campeonatoId}/${jugadorId}`);
  }
}