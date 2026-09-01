import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  input,
  output,
  signal,
} from '@angular/core';
import { BrandMark } from '../shared/brand-mark';
import { Icon } from '../shared/icon';
import { Wordmark } from '../shared/wordmark';

interface NavLink {
  readonly href: string;
  readonly label: string;
}

@Component({
  selector: 'mbk-site-header',
  imports: [BrandMark, Icon, Wordmark],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      href="#leistungen"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
    >
      Zum Inhalt springen
    </a>

    <header class="site-header-bar sticky top-0 z-50" [attr.data-scrolled]="scrolled()">
      <div class="container-site flex items-center justify-between gap-4 py-3.5">
        <a href="#top" class="flex items-center gap-2.5" aria-label="MBK Design – Startseite">
          <mbk-brand-mark class="text-primary-600" />
          <mbk-wordmark class="text-strong" />
        </a>

        <nav class="hidden items-center gap-1 md:flex" aria-label="Hauptnavigation">
          @for (link of navLinks; track link.href) {
            <a
              [href]="link.href"
              class="rounded-md px-3 py-2 text-sm font-medium text-default transition-colors hover:bg-secondary-50 hover:text-strong dark:hover:bg-white/10"
            >
              {{ link.label }}
            </a>
          }
        </nav>

        <div class="flex items-center gap-2">
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            [attr.aria-pressed]="dark()"
            (click)="toggle.emit()"
          >
            <span class="theme-swap" [class.is-dark]="dark()" aria-hidden="true">
              <mbk-icon name="sun" [size]="18" class="theme-swap-sun" />
              <mbk-icon name="moon" [size]="18" class="theme-swap-moon" />
            </span>
            <span class="sr-only">Farbschema wechseln</span>
          </button>
          <a href="#kontakt" class="btn btn-accent btn-sm whitespace-nowrap">
            Erstgespräch buchen
          </a>
        </div>
      </div>
    </header>
  `,
})
export class SiteHeader {
  readonly dark = input(false);
  readonly toggle = output<void>();

  protected readonly scrolled = signal(false);

  @HostListener('window:scroll')
  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 8);
  }

  protected readonly navLinks: readonly NavLink[] = [
    { href: '#leistungen', label: 'Leistungen' },
    { href: '#prozess', label: 'Ablauf' },
    { href: '#team', label: 'Agentur' },
    { href: '#referenzen', label: 'Referenzen' },
    { href: '#kontakt', label: 'Kontakt' },
  ];
}
