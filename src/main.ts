import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment'; // Asegúrate de tener esta importación

if (environment.production) {
  enableProdMode();
}

// Se encarga de iniciar la aplicación
bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(), 
    ...appConfig.providers
  ],
})
.catch((err) => console.error(err));