import { Component, effect, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SiteHeader } from './layout/site-header';
import { SiteFooter } from './layout/site-footer';
import { Hero } from './sections/hero';
import { Partner } from './sections/partner';
import { Leistungen } from './sections/leistungen';
import { Statement } from './sections/statement';
import { Prozess } from './sections/prozess';
import { Team } from './sections/team';
import { Kennzahlen } from './sections/kennzahlen';
import { Kontakt } from './sections/kontakt';

type Theme = 'light' | 'dark';

@Component({
  selector: 'app-root',
  imports: [
    SiteHeader,
    SiteFooter,
    Hero,
    Partner,
    Leistungen,
    Statement,
    Prozess,
    Team,
    Kennzahlen,
    Kontakt,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  protected readonly theme = signal<Theme>('light');

  constructor() {
    if (this.isBrowser) {
      const stored = localStorage.getItem('mbk-theme') as Theme | null;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.theme.set(stored ?? (prefersDark ? 'dark' : 'light'));
    }
    effect(() => {
      const t = this.theme();
      if (this.isBrowser) {
        document.documentElement.setAttribute('data-theme', t);
        localStorage.setItem('mbk-theme', t);
      }
    });
  }

  protected toggleTheme(): void {
    this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
  }
}
