import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jornada } from '../models/jornada.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JornadaService {
  private baseUrl = environment.apiUrl; // URL base de la API
    private endPoint = '/public/jornadas'; // Ruta específica del endpoint
    private apiUrl = `${this.baseUrl}${this.endPoint}`;	// Concatena URL base con endpoint

  constructor(private http: HttpClient) {}

  getJornadasByCampeonatoId(campeonatoId: number): Observable<Jornada[]> {
    return this.http.get<Jornada[]>(`${this.apiUrl}/campeonato/${campeonatoId}`);
  }

  createJornada(campeonatoId: number, fechaInicio: string): Observable<Jornada> {
    const params = new HttpParams().set('campeonatoId', campeonatoId).set('fechaInicio', fechaInicio);
    return this.http.post<Jornada>(this.apiUrl, null, { params });
  }

  getJornadaDetalle(jornadaId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${jornadaId}`);
  }
}