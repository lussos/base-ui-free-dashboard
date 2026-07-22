import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './components/theme/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class App {
  /** Eagerly initialize theme (light/dark class on <html>). */
  private readonly theme = inject(ThemeService);
}
