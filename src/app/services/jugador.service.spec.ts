/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JugadorService } from './jugador.service';

describe('Service: Jugador', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JugadorService]
    });
  });

  it('should ...', inject([JugadorService], (service: JugadorService) => {
    expect(service).toBeTruthy();
  }));
});
