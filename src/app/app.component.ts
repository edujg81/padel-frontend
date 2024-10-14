import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { StyleManager } from './services/style-manager.service';

// Importa los módulos de Angular Material que necesitas

// Componente principal de la aplicación. Solo debe importar lo necesario para su funcionamiento.
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    MatToolbar, 
    MatButtonModule, 
    MatIcon,
    RouterOutlet,
    RouterLink
  ],
  providers: [StyleManager]
})
export class AppComponent implements OnInit {

  title = 'Gestión de Campeonatos de Pádel';
  isDark = this.styleManager.isDark;

  constructor(private readonly styleManager: StyleManager) {}

  ngOnInit(): void {
    // Implementación del método
  }

  /**
 * Alterna el tema de la aplicación entre claro y oscuro.
 * Actualiza la propiedad {@link isDark} en consecuencia.
 */
  toggleDarkTheme() {
    this.styleManager.toggleDarkTheme();
    this.isDark = !this.isDark;
  }
}