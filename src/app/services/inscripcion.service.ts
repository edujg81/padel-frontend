import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Inscripcion } from '../models/inscripcion.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  private baseUrl = environment.apiUrl; // URL base de la API
  private endPoint = '/public/inscripciones'; // Ruta específica del endpoint
  private apiUrl = `${this.baseUrl}${this.endPoint}`;	// Concatena URL base con endpoint

  constructor(private readonly http: HttpClient) { }

  getAllInscripciones(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(this.apiUrl);
  }

  getInscripcion(id: number): Observable<Inscripcion> {
    return this.http.get<Inscripcion>(`${this.apiUrl}/${id}`);
  }

  getInscripcionesByJugadorId(jugadorId: number): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(`${this.apiUrl}/jugador/${jugadorId}`);
  }

  getInscripcionesByCampeonatoId(campeonatoId: number): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(`${this.apiUrl}/campeonato/${campeonatoId}`);
  }

  getInscripcionByCampeonatoIdAndJugadorId(campeonatoId: number, jugadorId: number): Observable<Inscripcion> {
    return this.http.get<Inscripcion>(`${this.apiUrl}/campeonato/${campeonatoId}/jugador/${jugadorId}`);
  }

  inscribirJugador(campeonatoId: number, jugadorId: number): Observable<Inscripcion> {
    const params = new HttpParams().set('campeonatoId', campeonatoId).set('jugadorId', jugadorId);
    return this.http.post<Inscripcion>(this.apiUrl, null, { params });
  }

  desinscribirJugador(campeonatoId: number, jugadorId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${campeonatoId}/${jugadorId}`);
  }
}