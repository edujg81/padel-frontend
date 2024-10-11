import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campeonato } from '../models/campeonato.model';

@Injectable({
  providedIn: 'root'
})
export class CampeonatoService {

  private apiUrl = 'http://localhost:8080/campeonatos'; // Cambia la URL según sea necesario

  constructor(private http: HttpClient) {}

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

  cambiarEstadoCampeonato(id: number, nuevoEstado: string): Observable<Campeonato> {
    return this.http.put<Campeonato>(`${this.apiUrl}/${id}/estado`, nuevoEstado);
  } 
}
