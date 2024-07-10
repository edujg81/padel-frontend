import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Se encarga de iniciar la aplicación

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(), 
    ...appConfig.providers
  ]
})
.catch((err) => console.error(err));
