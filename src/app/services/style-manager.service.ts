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
  }

  private applyTheme(themeName: string) {
    const linkElement = document.getElementById('theme-link') as HTMLLinkElement;

    if (!linkElement) {
      const newLinkElement = document.createElement('link');
      newLinkElement.id = 'theme-link';
      newLinkElement.rel = 'stylesheet';
      newLinkElement.href = `${themeName}.css`;
      document.head.appendChild(newLinkElement);
    } else {
      linkElement.href = `${themeName}.css`;
    }
  }

  constructor() { }

}