import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective } from '../shared/reveal.directive';

interface Service {
  readonly title: string;
  readonly desc: string;
  readonly points: readonly string[];
}

@Component({
  selector: 'mbk-leistungen',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="leistungen" class="section section-lg">
      <div class="container-site">
        <div class="max-w-2xl" mbkReveal>
          <p class="eyebrow mb-4">Leistungen</p>
          <h2 class="display display-2">Alles für die lokale Sichtbarkeit Ihres Fachgeschäfts</h2>
          <p class="lead mt-4">
            Kein Bauchladen: Wir kombinieren die Bausteine, die für Augenoptiker
            nachweislich funktionieren – aufeinander abgestimmt und messbar.
          </p>
        </div>

        <div class="svc-list mt-12 max-w-3xl">
          @for (service of services; track service.title; let i = $index) {
            <details class="svc-item" [attr.open]="i === 0 ? '' : null">
              <summary class="svc-summary">
                <span class="svc-num" aria-hidden="true">{{ i + 1 < 10 ? '0' + (i + 1) : i + 1 }}</span>
                <span>
                  <span class="svc-title">{{ service.title }}</span>
                  <span class="svc-lead">{{ service.desc }}</span>
                </span>
                <svg class="svc-chevron" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M5 7.5 10 12.5 15 7.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </summary>
              <div class="svc-panel">
                <ul>
                  @for (point of service.points; track point) {
                    <li>{{ point }}</li>
                  }
                </ul>
              </div>
            </details>
          }
        </div>

        <div class="mt-12">
          <a href="#kontakt" class="btn btn-ghost btn-lg">Welche Bausteine passen zu Ihnen? Jetzt besprechen →</a>
        </div>
      </div>
    </section>
  `,
})
export class Leistungen {
  protected readonly services: readonly Service[] = [
    {
      title: 'Lokale Kampagnen (Meta & Google)',
      desc: 'Anzeigen, die im Umkreis Ihres Geschäfts Termine für Sehtests, Gleitsicht und Kinderoptik erzeugen.',
      points: ['Zielgruppen nach Radius & Anlass', 'Landingpages mit Terminbuchung', 'Monatliches Reporting in Klartext'],
    },
    {
      title: 'Website & Terminstrecke',
      desc: 'Schnelle, barrierearme Website, die Besucher zu Anrufen und Online-Terminen führt.',
      points: ['Conversion-optimierte Struktur', 'Anbindung an Ihr Buchungssystem', 'Pflegbar ohne Technikstudium'],
    },
    {
      title: 'Google-Unternehmensprofil & lokale SEO',
      desc: 'Damit Sie gefunden werden, wenn jemand „Optiker in der Nähe" sucht.',
      points: ['Profil-Optimierung & Beiträge', 'Bewertungsmanagement', 'Einträge & lokale Verzeichnisse'],
    },
    {
      title: 'Content & Social Media',
      desc: 'Fassungen, Beratung, Team – Inhalte, die Ihr Fachgeschäft nahbar und kompetent zeigen.',
      points: ['Redaktionsplan pro Monat', 'Foto-/Reel-Konzepte für Ihr Personal', 'Vorlagen für Aktionen & Saison'],
    },
    {
      title: 'E-Mail & Kundenbindung',
      desc: 'Erinnerungen an Sehtests und Anlass-Kampagnen holen bestehende Kunden zurück.',
      points: ['Recall-Strecken für Sehtests', 'Newsletter mit System', 'DSGVO-konforme Einwilligung'],
    },
    {
      title: 'Marke & Positionierung',
      desc: 'Ein klarer Auftritt, der Sie von der Kette und vom Nachbaroptiker unterscheidet.',
      points: ['Positionierungs-Workshop', 'Logo, Farben, Bildsprache', 'Anwendung auf Schaufenster & Print'],
    },
  ];
}
