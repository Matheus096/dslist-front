import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private colorTheme!: string;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  initTheme() {
    this.getColorTheme();
    this.renderer.setAttribute(document.documentElement, 'data-theme', this.colorTheme);
  }

  updateTheme(theme: 'dark' | 'light') {
    this.setColorTheme(theme);
    this.renderer.setAttribute(document.documentElement, 'data-theme', theme);
  }

  isDarkMode() {
    return this.colorTheme === 'dark';
  }

  private setColorTheme(theme: string) {
    this.colorTheme = theme;
    localStorage.setItem('user-theme', theme);
  }

  private getColorTheme() {
    if (localStorage.getItem('user-theme')) {
      this.colorTheme = localStorage.getItem('user-theme')!;
    } else {
      this.colorTheme = 'light';
    }
  }
}