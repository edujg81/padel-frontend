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
    RouterModule
  ],
  providers: [StyleManager],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'Gestión de Campeonatos de Pádel';
  isDark = this.styleManager.isDark;
  // Variable para almacenar la paleta primaria seleccionada
  primaryPalette: any;
  secondaryPalette: any;

  // Opciones de colores
  colorOptions: string[] = [
    'verde',
    'verde claro',
    'verde amarillento',
    'rojo',
    'naranja',
    'amarillo',
    'azul',
    'celeste',
    'rosa',
    'violeta',
    'magenta',
    'cyan',
  ];

  // Variables para almacenar los colores seleccionados
  primaryColor: string = 'verde';
  secondaryColor: string = 'naranja';

  // Mapeo de los colores a las variables de SCSS
  colorMap: { [key: string]: string } = {
    'verde': 'green',        // Valor correcto como cadena hexadecimal
    'verde claro': 'lightgreen',
    'verde amarillento': 'chartreuse',
    'rojo': 'red',
    'naranja': 'orange',
    'amarillo': 'yellow',
    'azul': 'blue',
    'celeste': 'azure',
    'rosa': 'pink',
    'violeta': 'violet',
    'magenta': 'magenta',
    'cyan': 'cyan',
  };

  constructor(private readonly styleManager: StyleManager) {
    // Inicializar con una paleta predeterminada, por ejemplo, verde
    this.primaryPalette = 'mat.$green-palette'; 
    this.secondaryPalette = 'mat.$orange-palette';
  }

  ngOnInit(): void {
    this.updateTheme();
  }

  toggleDarkTheme() {
    this.styleManager.toggleDarkTheme();
  }

  // Método para cambiar la paleta primaria según la selección
  setColor(color: string, option: number): void {
    switch (color) {
      case 'verde':
        color = '#349934';
        break;
      case 'azul':
        color = '#343499';
        break;
      case 'rojo':
        color = '#993434';
        break;
      // Agrega más casos según los colores que quieras manejar
      default:
        color = '#008000'; // Valor por defecto
        break;
    }

    if (option === 1) {
      this.primaryPalette = color;
    } else {
      this.secondaryPalette = color;
    }

    this.updateTheme();
  }

  // Función para actualizar el tema con los colores seleccionados
  updateTheme() {
    document.documentElement.style.setProperty(
      '--primary-color', this.primaryPalette
    );

    document.documentElement.style.setProperty(
      '--tertiary-color', this.secondaryPalette
    );

    console.log(this.primaryPalette, this.secondaryPalette);
  }
}
