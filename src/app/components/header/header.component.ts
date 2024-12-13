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
 
  }

  ngOnInit(): void {
    //this.updateTheme();
  }

  toggleDarkTheme() {
    this.styleManager.toggleDarkTheme();
  }

  // Función para actualizar el tema con los colores seleccionados
  updateTheme() {
    document.documentElement.style.setProperty('--primary-color', this.colorMap[this.primaryColor]);
    document.documentElement.style.setProperty('--tertiary-color', this.colorMap[this.secondaryColor]);
    this.styleManager.cambioColorTema();
  }
}
