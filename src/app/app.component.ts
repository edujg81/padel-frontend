import { Component } from '@angular/core';
import { CampeonatoListComponent } from './components/campeonato-list/campeonato-list.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CampeonatoListComponent,
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    RouterOutlet,
    RouterLink,
    FlexLayoutModule
  ]
})
export class AppComponent {
  title = 'Gestión de Campeonatos de Pádel';
}
