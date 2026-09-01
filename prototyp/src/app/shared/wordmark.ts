import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Wortmarke „MBK Design" (Platzhalter-Lockup, kein echtes Logo).
 *
 * Festes, wiederverwendbares Verhältnis:
 * - „MBK" als Versalien, kräftig (Fraunces 640) mit dezentem Versal-Tracking.
 * - „Design" leichter (Fraunces 460), minimal kleiner und in gedämpfter
 *   Deckkraft – schafft optische Hierarchie ohne Farbwechsel.
 * - Farbe erbt via `currentColor` vom Kontext (Header/Footer: `text-strong`).
 * - Fraunces `opsz`-Achse über `font-optical-sizing: auto`; optisches Kerning
 *   über `font-kerning: normal`.
 *
 * Liest für Screenreader als ein Element: „MBK Design".
 */
@Component({
  selector: 'mbk-wordmark',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="wm" [style.font-size.px]="size()">
      <span class="sr-only">MBK Design</span>
      <span class="wm-a" aria-hidden="true">MBK</span><span
        class="wm-b"
        aria-hidden="true"
        >Design</span
      >
    </span>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        line-height: 1;
      }
      .wm {
        display: inline-flex;
        align-items: baseline;
        gap: 0.28em;
        font-family: var(--font-display);
        font-optical-sizing: auto;
        font-kerning: normal;
        color: currentColor;
        white-space: nowrap;
      }
      .wm-a {
        font-weight: 640;
        text-transform: uppercase;
        letter-spacing: 0.03em;
      }
      .wm-b {
        font-weight: 460;
        font-size: 0.94em;
        letter-spacing: 0.005em;
        opacity: 0.72;
      }
    `,
  ],
})
export class Wordmark {
  /** Schriftgröße der Wortmarke in px (Header/Footer: 16). */
  readonly size = input(16);
}
