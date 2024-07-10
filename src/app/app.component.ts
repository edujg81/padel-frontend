import { Component } from '@angular/core';
import { CampeonatoListComponent } from './components/campeonato-list/campeonato-list.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// Componente principal de la aplicación. Solo debe importar lo necesario para su funcionamiento.

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule, 
    MatButtonModule, 
    RouterOutlet,
    RouterLink
  ]
})
export class AppComponent {
  title = 'Gestión de Campeonatos de Pádel';
}
