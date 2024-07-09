import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Importa los módulos de Angular Material que necesitas
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      ReactiveFormsModule,
      MatButtonModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatToolbarModule,
      MatIconModule,
      BrowserAnimationsModule
    ),
    provideRouter(routes, withComponentInputBinding())]
};
