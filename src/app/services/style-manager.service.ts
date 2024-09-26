import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleManager {

  private dark = false;

  get isDark(): boolean {
    return this.dark;
  }

  toggleDarkTheme() {
    this.dark = !this.dark;
    this.applyTheme(this.dark ? 'dark-theme' : 'light-theme');
    document.body.classList.toggle('dark-theme', this.dark);
    document.body.classList.toggle('light-theme', !this.dark);
  }

  private applyTheme(themeName: string) {
    let linkElement = document.getElementById('theme-link') as HTMLLinkElement;

    if (!linkElement) {
      linkElement = document.createElement('link');
      linkElement.id = 'theme-link';
      linkElement.rel = 'stylesheet';
      document.head.appendChild(linkElement);
    }
    linkElement.href = `${themeName}.css`;
  }

  constructor() { }

}