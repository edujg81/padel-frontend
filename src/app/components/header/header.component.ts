import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { StyleManager } from '../../services/style-manager.service';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
  ],
  providers: [StyleManager],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title = 'Gestión de Campeonatos de Pádel';
  isDark = this.styleManager.isDark;

  themes = [
    'azure-theme',
    'blue-theme',
    'chartreuse-theme',
    'cyan-theme',
    'green-theme',
    'lightgreen-theme',
    'magenta-theme',
    'orange-theme',
    'pink-theme',
    'red-theme',
    'violet-theme',
    'yellow-theme'
  ]; // Lista de temas disponibles
  selectedTheme = this.themes[0];

  constructor(private readonly styleManager: StyleManager) {}

  ngOnInit(): void {
    //this.updateTheme(selectedTheme);
  }

  toggleDarkTheme() {
    this.styleManager.toggleDarkTheme();
  }

  // Función para actualizar el tema con los colores seleccionados
  updateTheme(theme: string): void {
    document.body.classList.remove(...this.themes);
    this.styleManager.cambioColorTema(theme);
  }
}
