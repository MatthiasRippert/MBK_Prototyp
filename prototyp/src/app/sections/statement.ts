import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective } from '../shared/reveal.directive';

/**
 * Luftige Statement-Sektion: ein einziger, großgesetzter Positionierungssatz.
 * Bewusster Rhythmuswechsel – steht als Weißraum-Zäsur zwischen der dicht
 * gesetzten Leistungs-Liste (Inhaltsverzeichnis-Anmutung) und dem Ablauf.
 */
@Component({
  selector: 'mbk-statement',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section section-lg">
      <div class="container-site">
        <p class="mx-auto max-w-4xl py-6 text-center display display-2 md:py-12" mbkReveal>
          Wir arbeiten mit genau <span class="text-primary-700">einer Branche</span> –
          der Augenoptik. Kein Streuverlust, keine Lernkurve auf Ihre Kosten:
          nur Marketing, das den Weg vom Sehtest-Termin zum Fassungsverkauf kennt.
        </p>
      </div>
    </section>
  `,
})
export class Statement {}
