import { Routes } from '@angular/router';

import { CampeonatoListComponent } from './components/campeonato-list/campeonato-list.component';
import { CampeonatoDetailComponent } from './components/campeonato-detail/campeonato-detail.component';
import { CampeonatoFormComponent } from './components/campeonato-form/campeonato-form.component';
import { JugadorListComponent } from './components/jugador-list/jugador-list.component';
import { JugadorFormComponent } from './components/jugador-form/jugador-form.component';
import { JugadorDetailComponent } from './components/jugador-detail/jugador-detail.component';
import { JornadaListComponent } from './components/jornada-list/jornada-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { InscripcionListComponent } from './components/inscripcion-list/inscripcion-list.component';
import { InscripcionFormComponent } from './components/inscripcion-form/inscripcion-form.component';
import { JornadaDetailComponent } from './components/jornada-detail/jornada-detail.component';
import { PartidoFormComponent } from './components/partido-form/partido-form.component';

// Definimos las rutas de la aplicación
export const routes: Routes = [
  { path: 'home', component: CampeonatoListComponent },
  { path: 'owner', loadChildren: () => import('./app.component').then(m => m.AppComponent) },
  { path: '', redirectTo: '/home', pathMatch: 'full', title: 'Inicio' },
  { path: 'campeonatos', component: CampeonatoListComponent },
  { path: 'campeonatos/new', component: CampeonatoFormComponent },
  { path: 'campeonatos/edit/:id', component: CampeonatoFormComponent },
  { path: 'campeonatos/:id', component: CampeonatoDetailComponent },
  { path: 'jugadores', component: JugadorListComponent },
  { path: 'jugadores/new', component: JugadorFormComponent }, // Ruta para agregar jugador
  { path: 'jugadores/edit/:id', component: JugadorFormComponent },  // Ruta para editar jugador
  { path: 'jugadores/:id', component: JugadorDetailComponent },
  { path: 'jornadas/campeonato/:id', component: JornadaListComponent },
  { path: 'jornadas/:id', component: JornadaDetailComponent },
  { path: 'inscripciones', component: InscripcionListComponent },
  { path: 'inscripciones/campeonato/:id', component: InscripcionFormComponent },
  { path: 'partidos/:id', component: PartidoFormComponent},
  { path: '**', component: NotFoundComponent }
];