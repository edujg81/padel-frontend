import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StyleManager } from './services/style-manager.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

// Importa los módulos de Angular Material que necesitas

// Componente principal de la aplicación. Solo debe importar lo necesario para su funcionamiento.
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    RouterModule
    // RouterOutlet
  ],
  providers: [StyleManager],
})
export class AppComponent implements OnInit {
  title = 'Gestión de Campeonatos de Pádel';
  isDark = this.styleManager.isDark;

  constructor(private readonly styleManager: StyleManager
  ) {}

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
