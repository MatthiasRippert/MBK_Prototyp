import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective } from '../shared/reveal.directive';

interface Step {
  readonly title: string;
  readonly desc: string;
}

@Component({
  selector: 'mbk-prozess',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="prozess" class="section section-lg grain relative overflow-hidden">
      <div class="container-site relative z-10">
        <div class="max-w-2xl" mbkReveal>
          <p class="eyebrow mb-4">Ablauf</p>
          <h2 class="display display-2">In vier Schritten von der Idee zur messbaren Nachfrage</h2>
          <p class="lead mt-4">
            Transparent und ohne Risiko: Sie wissen vorab, was passiert, was es
            kostet und woran wir Erfolg messen.
          </p>
        </div>

        <div class="prozess-rail" aria-hidden="true">
          <span class="prozess-rail-fill"></span>
        </div>

        <ol class="mt-14 grid gap-y-12 gap-x-12 sm:grid-cols-2">
          @for (step of steps; track step.title; let i = $index) {
            <li class="process-step">
              <span class="process-step-num" aria-hidden="true">{{ i + 1 }}</span>
              <h3 class="text-xl sm:text-2xl">{{ step.title }}</h3>
              <p class="mt-2 text-sm text-default">{{ step.desc }}</p>
            </li>
          }
        </ol>

        <div class="mt-14 flex flex-wrap items-center gap-4">
          <a href="#kontakt" class="btn btn-accent">Erstgespräch buchen</a>
          <span class="text-sm text-muted">Unverbindlich, ca. 30&nbsp;Minuten, per Video oder Telefon.</span>
        </div>
      </div>
    </section>
  `,
})
export class Prozess {
  protected readonly steps: readonly Step[] = [
    {
      title: 'Erstgespräch & Standortanalyse',
      desc: 'Wir hören zu: Wunschkunden, Einzugsgebiet, Wettbewerb, bisherige Maßnahmen. Sie erhalten eine ehrliche Einschätzung Ihres Potenzials.',
    },
    {
      title: 'Fokus-Plan',
      desc: 'Sie bekommen einen priorisierten Fahrplan mit Maßnahmen, Zeitrahmen, Budgetrahmen und klaren Zielkennzahlen – schriftlich.',
    },
    {
      title: 'Umsetzung',
      desc: 'Wir bauen Kampagnen, Landingpages und Content auf. Sie geben frei, wir liefern. Enge Abstimmung ohne Meeting-Marathon.',
    },
    {
      title: 'Auswerten & schärfen',
      desc: 'Monatlicher Report in verständlicher Sprache, gemeinsame Ableitung der nächsten Schritte. Was wirkt, wird ausgebaut.',
    },
  ];
}
