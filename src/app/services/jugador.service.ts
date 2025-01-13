import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jugador } from '../models/jugador.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {
  private baseUrl = environment.apiUrl; // URL base de la API
  private endPoint = '/public/jugadores'; // Ruta específica del endpoint
  private apiUrl = `${this.baseUrl}${this.endPoint}`;	// Concatena URL base con endpoint

  constructor(private readonly http: HttpClient) {}

  getJugadores(): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(this.apiUrl);
  }

  getJugadorById(id: number): Observable<Jugador> {
    return this.http.get<Jugador>(`${this.apiUrl}/${id}`);
  }

  createJugador(jugador: Jugador): Observable<Jugador> {
    return this.http.post<Jugador>(this.apiUrl, jugador);
  }

  updateJugador(jugador: Jugador): Observable<Jugador> {
    return this.http.put<Jugador>(`${this.apiUrl}/${jugador.id}`, jugador);
  }

  deleteJugador(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  darDeBajaJugador(jugador: Jugador): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/baja/${jugador.id}`, jugador);
  }

  getJugadoresDisponiblesParaCampeonato(campeonatoId: number): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(`${this.apiUrl}/disponibles/${campeonatoId}`);
  }
}