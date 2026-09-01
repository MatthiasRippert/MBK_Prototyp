import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective } from '../shared/reveal.directive';

interface Member {
  readonly initials: string;
  readonly name: string;
  readonly role: string;
}

@Component({
  selector: 'mbk-team',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="team" class="section section-lg section-sand grain relative overflow-hidden">
      <div class="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div mbkReveal>
          <p class="eyebrow mb-4">Die Agentur</p>
          <h2 class="display display-2">Marketing-Leute, die die Augenoptik verstehen</h2>
          <p class="lead mt-4">
            MBK Design ist eine unabhängige Full-Service-Agentur aus
            Mönchengladbach mit einem klaren Fokus: die Augenoptik. Wir kennen den
            Unterschied zwischen Sehtest-Termin und Fassungsverkauf, zwischen
            Kette und inhabergeführtem Fachgeschäft – und wir bauen Marketing, das
            zu Ihrem Alltag am Tresen passt.
          </p>
          <p class="mt-3 text-default">
            Gutes Marketing beginnt mit Zuhören. Deshalb steht am Anfang jeder
            Zusammenarbeit ein Gespräch, kein Angebot von der Stange.
          </p>
          <dl class="mt-8 grid grid-cols-2 gap-6">
            <div>
              <dt class="stat-label">Gegründet</dt>
              <dd class="stat-value">2025</dd>
            </div>
            <div>
              <dt class="stat-label">Fokus-Branche</dt>
              <dd class="stat-value">100 % Optik</dd>
            </div>
          </dl>
        </div>

        <div>
          <div class="media-frame grain mb-4 flex aspect-[16/9] items-end p-6">
            <div class="lens-rings" aria-hidden="true"></div>
            <p class="text-sm font-medium text-white/80">
              Bild-Platzhalter: Team &amp; Ladenlokal in Mönchengladbach
            </p>
          </div>
          <ul class="grid gap-4 sm:grid-cols-2">
            @for (member of members; track member.name) {
              <li class="card flex items-center gap-4">
                <span class="avatar shrink-0" aria-hidden="true">{{ member.initials }}</span>
                <div>
                  <p class="font-display font-semibold text-strong">{{ member.name }}</p>
                  <p class="text-sm text-muted">{{ member.role }}</p>
                </div>
              </li>
            }
          </ul>
          <p class="field-hint mt-4">
            Team-Namen und -Fotos sind Platzhalter (Initialen-Avatare) – im
            Prototyp bewusst ohne echte Personen.
          </p>
        </div>
      </div>
    </section>
  `,
})
export class Team {
  protected readonly members: readonly Member[] = [
    { initials: 'AM', name: 'A. Musterfrau (Platzhalter)', role: 'Strategie & Kundenkontakt' },
    { initials: 'BB', name: 'B. Beispiel (Platzhalter)', role: 'Kampagnen & Performance' },
    { initials: 'CD', name: 'C. Demo (Platzhalter)', role: 'Content & Social Media' },
    { initials: 'EF', name: 'E. Fiktiv (Platzhalter)', role: 'Web & Gestaltung' },
  ];
}
