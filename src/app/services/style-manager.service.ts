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
  }

  constructor() { }

}