// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/lussos/base-theme/blob/main/LICENSE.md

import { Injectable, Renderer2, RendererFactory2, computed, inject, signal } from '@angular/core';

/**
 * A service that manages the application's light/dark mode state.
 *
 * @example
 * theme = inject(ThemeService);
 * toggleDarkMode() { this.theme.toggleTheme(); }
 * isDark = this.theme.isDarkMode;
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private readonly _currentTheme = signal<'light' | 'dark'>('light');

  /** Signal: whether dark mode is currently active. */
  readonly isDarkMode = computed(() => this._currentTheme() === 'dark');

  constructor() {
    const rendererFactory = inject(RendererFactory2);

    this.renderer = rendererFactory.createRenderer(null, null);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme('light');
    }
  }

  toggleTheme() {
    this.setTheme(this._currentTheme() === 'light' ? 'dark' : 'light');
  }

  setTheme(theme: 'light' | 'dark') {
    this._currentTheme.set(theme);
    localStorage.setItem('theme', theme);
    const html = document.documentElement;
    if (theme === 'dark') {
      this.renderer.addClass(html, 'dark');
    } else {
      this.renderer.removeClass(html, 'dark');
    }
  }
}
