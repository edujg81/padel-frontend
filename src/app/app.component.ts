import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { StyleManager } from './services/style-manager.service';

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
    RouterLink,
  ],
  providers: [StyleManager]
})
export class AppComponent implements OnInit {

  title = 'Gestión de Campeonatos de Pádel';
  isDark = this.styleManager.isDark;

  constructor(private styleManager: StyleManager) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  toggleDarkTheme() {
    this.styleManager.toggleDarkTheme();
    this.isDark = !this.isDark;
  }
}
