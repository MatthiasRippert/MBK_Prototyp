import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective } from '../shared/reveal.directive';
import { ReachRadar } from '../shared/reach-radar';

@Component({
  selector: 'mbk-hero',
  imports: [RevealDirective, ReachRadar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="top" class="section-tint grain section section-lg relative">
      <!-- dezente Lens-Flares (Optik-Motiv) – eigener Clip-Layer, damit der
           schwebende Chip weiter unten NICHT abgeschnitten wird -->
      <div aria-hidden="true" class="absolute inset-0 overflow-hidden">
        <div class="blob blob-secondary -right-40 -top-40 h-[34rem] w-[34rem]"></div>
        <div class="blob blob-accent -left-32 top-1/2 h-80 w-80"></div>
      </div>

      <div class="container-site relative z-10 grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div [mbkReveal]="0">
          <p class="eyebrow mb-5">Marketing-Agentur für Augenoptik</p>
          <h1 class="display display-1">
            Aus unscharfer Reichweite wird
            <span class="text-gradient">scharfe Nachfrage</span>.
          </h1>
          <p class="lead mt-6 max-w-prose">
            MBK Design bringt Optiker-Fachgeschäfte vor die richtigen Menschen in
            ihrer Region – mit Kampagnen, Website und Content, die messbar Termine
            und Fassungsverkäufe erzeugen. Spezialisiert, unabhängig, ehrlich.
          </p>

          <div class="mt-9 flex flex-wrap gap-3">
            <a href="#kontakt" class="btn btn-accent btn-lg">Erstgespräch buchen</a>
            <a href="#referenzen" class="btn btn-secondary btn-lg">Referenzen ansehen</a>
          </div>

          <div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
            <span class="badge badge-accent">Nur Augenoptik</span>
            <span>Antwort in 24&nbsp;h&nbsp;·&nbsp;kein Knebelvertrag&nbsp;·&nbsp;DSGVO-konform</span>
          </div>
        </div>

        <div class="relative">
          <!-- bewusste Illustration statt Bild-Platzhalter: „Einzugsgebiet-Radar".
               Der Blur→Scharf-Effekt hier ist der EINE thematische Scroll-Effekt. -->
          <figure class="radar-panel reveal-focus grain" mbkReveal>
            <mbk-reach-radar [size]="16" />
            <figcaption class="radar-panel-cap">
              Schematisch: jeder Punkt ein möglicher Termin aus dem Umkreis –
              keine echten Standortdaten.
            </figcaption>
          </figure>

          <!-- schwebender Chip: Legende zum Radar + visuelle Tiefe -->
          <div class="chip-float absolute -bottom-5 -left-5 hidden sm:flex">
            <span aria-hidden="true" class="inline-block size-2.5 rounded-full bg-primary-500"></span>
            Signal: lokale Terminanfragen
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Hero {}
