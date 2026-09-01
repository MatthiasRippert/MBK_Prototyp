import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective } from '../shared/reveal.directive';

interface Testimonial {
  readonly quote: string;
  readonly author: string;
  readonly business: string;
}

@Component({
  selector: 'mbk-kennzahlen',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section section-lg section-invert grain relative overflow-hidden">
      <div aria-hidden="true" class="blob blob-accent -right-24 -top-24 h-96 w-96"></div>
      <div class="container-site relative z-10">
        <div class="max-w-2xl" mbkReveal>
          <p class="eyebrow mb-4">Wirkung</p>
          <h2 class="display display-2">Woran wir uns messen lassen</h2>
          <p class="lead mt-4">
            Die folgenden Werte sind illustrative Beispiele für die Kennzahlen,
            die wir in Projekten steuern – keine echten Kundenzahlen.
          </p>
        </div>

        <dl class="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          @for (metric of metrics; track metric.label) {
            <div class="border-l-2 border-accent-400/40 pl-4">
              <dd class="stat-value">{{ metric.value }}</dd>
              <dt class="stat-label mt-1">{{ metric.label }}</dt>
            </div>
          }
        </dl>

        <div class="mt-16 grid gap-6 lg:grid-cols-3">
          @for (item of testimonials; track item.author) {
            <figure class="card flex flex-col">
              <blockquote class="text-default">„{{ item.quote }}"</blockquote>
              <figcaption class="mt-4 text-sm">
                <span class="font-semibold text-strong">{{ item.author }}</span>
                <span class="block text-muted">{{ item.business }}</span>
              </figcaption>
            </figure>
          }
        </div>
        <p class="field-hint mt-4">
          * Alle Kennzahlen und Zitate sind Platzhalter zur Veranschaulichung.
        </p>
      </div>
    </section>
  `,
})
export class Kennzahlen {
  protected readonly metrics = [
    { value: '+38 %*', label: 'mehr Online-Terminanfragen' },
    { value: '−24 %*', label: 'Kosten pro qualifizierter Anfrage' },
    { value: '4,8 / 5*', label: 'durchschnittliche Google-Bewertung' },
    { value: '< 24 h', label: 'Reaktionszeit auf Ihre Anfrage' },
  ] as const;

  protected readonly testimonials: readonly Testimonial[] = [
    {
      quote: 'Endlich eine Agentur, die nicht über Reichweite, sondern über Termine spricht. Die Berichte verstehe sogar ich.',
      author: 'Inhaber:in (Platzhalter)',
      business: 'Fachgeschäft, 1 Standort',
    },
    {
      quote: 'Die neue Terminstrecke auf der Website hat die Anrufe spürbar entlastet. Sauber umgesetzt, schnell live.',
      author: 'Filialleitung (Platzhalter)',
      business: 'Optiker-Verbund, 3 Standorte',
    },
    {
      quote: 'Der Positionierungs-Workshop war Gold wert – wir wissen jetzt, wofür wir stehen und wofür nicht.',
      author: 'Geschäftsführung (Platzhalter)',
      business: 'Inhabergeführte Augenoptik',
    },
  ];
}
