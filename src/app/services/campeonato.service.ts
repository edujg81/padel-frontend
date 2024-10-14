import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campeonato } from '../models/campeonato.model';

@Injectable({
  providedIn: 'root'
})
export class CampeonatoService {

  private readonly apiUrl = 'http://localhost:8080/campeonatos'; // Cambia la URL según sea necesario

  constructor(private readonly http: HttpClient) {}

  getCampeonatos(): Observable<Campeonato[]> {
    return this.http.get<Campeonato[]>(this.apiUrl);
  }

  getCampeonato(id: number): Observable<Campeonato> {
    return this.http.get<Campeonato>(`${this.apiUrl}/${id}`);
  }

  createCampeonato(campeonato: Campeonato): Observable<Campeonato> {
    return this.http.post<Campeonato>(this.apiUrl, campeonato);
  }

  updateCampeonato(id: number, campeonato: Campeonato): Observable<Campeonato> {
    return this.http.put<Campeonato>(`${this.apiUrl}/${id}`, campeonato);
  }

  deleteCampeonato(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  cambiarEstadoCampeonato(id: number, nuevoEstado: string): Observable<void> {
    const params = new HttpParams().set('nuevoEstado', nuevoEstado);
    return this.http.put<void>(`${this.apiUrl}/${id}/estado`, null, { params });
  } 
}
