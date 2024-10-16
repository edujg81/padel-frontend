import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InscripcionService } from '../../services/inscripcion.service';

@Component({
  selector: 'app-inscripcion-form',
  standalone: true,
  imports: [
    
  ],
  templateUrl: './inscripcion-form.component.html',
  styleUrl: './inscripcion-form.component.scss'
})
export class InscripcionFormComponent implements OnInit {
  campeonatoId!: number;
  inscripcionForm!: FormGroup;
  inscripcionId!: number | null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly inscripcionesService: InscripcionService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.campeonatoId = Number(this.route.snapshot.params['id']);
  }
}
