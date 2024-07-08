import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

// Importa los módulos de Angular Material que necesitas
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      HttpClientModule,
      ReactiveFormsModule,
      MatButtonModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatToolbarModule,
      RouterModule
    ),
    provideRouter(routes, withComponentInputBinding())]
};
