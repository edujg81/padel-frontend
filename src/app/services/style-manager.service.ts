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
    const body = document.body;

    if (this.dark) {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
    } else {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
    }

    this.dark = !this.dark;
    // this.applyTheme(this.dark ? 'dark-theme' : 'light-theme');
    // document.body.classList.toggle('dark-theme', this.dark);
    // document.body.classList.toggle('light-theme', !this.dark);
  }

  // private applyTheme(themeName: string) {
  //   let linkElement = document.getElementById('theme-link') as HTMLLinkElement;

  //   if (!linkElement) {
  //     linkElement = document.createElement('link');
  //     linkElement.id = 'theme-link';
  //     linkElement.rel = 'stylesheet';
  //     document.head.appendChild(linkElement);
  //   }
  //   linkElement.href = `${themeName}.css`;
  // }

  constructor() { }

}