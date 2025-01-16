import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clasificacion } from '../models/clasificacion.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClasificacionService {
  private baseUrl = `${environment.apiUrl}/public/clasificaciones`;

  constructor(private readonly http: HttpClient) {}

  getClasificacionByCampeonatoId(campeonatoId: number): Observable<Clasificacion[]> {
    return this.http.get<Clasificacion[]>(`${this.baseUrl}/campeonato/${campeonatoId}`);
  }
}