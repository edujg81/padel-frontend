import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";

// Importa los módulos de Angular Material que necesitas

// Componente principal de la aplicación. Solo debe importar lo necesario para su funcionamiento.
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterModule,
    RouterOutlet,
    HeaderComponent
],
  providers: [],
})
export class AppComponent implements OnInit {
  
  constructor(
  ) {}

  ngOnInit(): void {
    // Implementación del método
  }

}
