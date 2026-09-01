import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrandMark } from '../shared/brand-mark';
import { Wordmark } from '../shared/wordmark';

@Component({
  selector: 'mbk-site-footer',
  imports: [BrandMark, Wordmark],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section section-lg section-invert grain relative overflow-hidden text-center">
      <div class="lens-rings" aria-hidden="true"></div>
      <div class="container-site relative z-10">
        <div class="mx-auto max-w-2xl" mbkReveal>
          <h2 class="display display-2">Bereit, den Fokus zu schärfen?</h2>
          <p class="lead mx-auto mt-4 max-w-prose">
            Unverbindliches Erstgespräch – wir prüfen Ihr Potenzial in der Region
            und sagen ehrlich, ob wir zueinander passen.
          </p>
          <div class="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#kontakt" class="btn btn-accent btn-lg">Erstgespräch buchen</a>
            <a href="#leistungen" class="btn btn-secondary btn-lg">Leistungen ansehen</a>
          </div>
        </div>
      </div>
    </section>

    <footer class="border-t border-subtle surface-sunken py-14">
      <div class="container-site grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div class="flex items-center gap-2.5">
            <mbk-brand-mark class="text-primary-600" [size]="30" />
            <mbk-wordmark class="text-strong" />
          </div>
          <p class="mt-4 max-w-xs text-sm text-muted">
            Die Marketing-Agentur für Augenoptik. Mehr Termine, mehr
            Fassungsverkäufe, mehr Sichtbarkeit – messbar und ehrlich.
          </p>
          <p class="mt-4 text-sm text-muted">Mönchengladbach · Rheinland</p>
        </div>

        <nav class="text-sm" aria-label="Seiten">
          <p class="font-display font-semibold text-strong">Seite</p>
          <ul class="mt-3 space-y-2 text-muted">
            <li><a class="hover:text-strong" href="#leistungen">Leistungen</a></li>
            <li><a class="hover:text-strong" href="#prozess">Ablauf</a></li>
            <li><a class="hover:text-strong" href="#team">Agentur</a></li>
            <li><a class="hover:text-strong" href="#referenzen">Referenzen</a></li>
            <li><a class="hover:text-strong" href="#kontakt">Kontakt</a></li>
          </ul>
        </nav>

        <nav class="text-sm" aria-label="Rechtliches">
          <p class="font-display font-semibold text-strong">Rechtliches</p>
          <ul class="mt-3 space-y-2 text-muted">
            <li><a class="hover:text-strong" href="#">Impressum (Platzhalter)</a></li>
            <li><a class="hover:text-strong" href="#">Datenschutz (Platzhalter)</a></li>
          </ul>
        </nav>
      </div>
      <p class="container-site mt-10 border-t border-subtle pt-6 text-xs text-muted">
        Prototyp / Design-Durchstich. Alle Namen, Logos, Zitate und Kennzahlen
        sind Platzhalter und keine echten Referenzen.
      </p>
    </footer>
  `,
})
export class SiteFooter {}
