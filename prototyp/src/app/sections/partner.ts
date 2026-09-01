import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'mbk-partner',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="referenzen" class="section-tight">
      <div class="container-site">
        <p class="text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted" mbkReveal>
          Vertrauen von Fachgeschäften und Partnern aus der Augenoptik
        </p>

        <ul class="logo-grid mt-8" aria-label="Partner-Felder (Platzhalter)">
          @for (name of partners; track name) {
            <li class="logo-plate">
              <span aria-hidden="true" class="inline-block size-2 rounded-full bg-neutral-400"></span>
              {{ name }}
            </li>
          }
        </ul>

        <p class="mt-6 text-center text-xs text-muted">
          Alle Logos, Namen und Kennzahlen auf dieser Seite sind Platzhalter zu
          Demonstrationszwecken.
        </p>
      </div>
    </section>
  `,
})
export class Partner {
  protected readonly partners: readonly string[] = [
    'Optik Nordlicht',
    'BrillenBühne',
    'SehWerk 21',
    'Panorama Optik',
    'KontaktLinsen Rhein',
    'Augenblick Optik',
  ];
}
