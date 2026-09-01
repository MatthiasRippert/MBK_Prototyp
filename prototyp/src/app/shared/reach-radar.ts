import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Einzugsgebiet-Radar (bewusste Illustration, kein Bild-Platzhalter).
 *
 * Konzentrische Radius-Ringe (5 / 10 / 20 km) über einer abstrahierten
 * Ortssilhouette, dazu Punkte als „Terminanfragen". Doppeldeutig als
 * Linsen-/Fokus-Motiv und als „lokale Sichtbarkeit". Reines SVG.
 *
 * - skaliert über `viewBox` + `font-size` (Host `--mbk-radar-size`)
 * - monochrom über `currentColor`, Akzente über CSS-Tokens
 * - `variant="mark"`: nur Ringe + Kern (für spätere Nutzung in
 *   Prozess-Schritt 1 / Footer-Wasserzeichen)
 * - `animated=false` oder `prefers-reduced-motion` -> statisch
 */
@Component({
  selector: 'mbk-reach-radar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.is-mark]': 'variant() === "mark"',
    '[class.is-static]': '!animated()',
    '[style.--mbk-radar-size.px]': 'size()',
    '[attr.role]': 'variant() === "mark" ? "presentation" : "img"',
    '[attr.aria-hidden]': 'variant() === "mark" ? "true" : null',
    '[attr.aria-label]':
      'variant() === "mark" ? null : "Illustration: Einzugsgebiet mit Radius-Ringen 5, 10 und 20 Kilometer und Punkten für Terminanfragen"',
  },
  template: `
    <svg viewBox="0 0 264 264" fill="none" focusable="false" aria-hidden="true">
      <defs>
        <clipPath id="mbk-radar-clip">
          <circle cx="132" cy="128" r="118" />
        </clipPath>
      </defs>

      <!-- Fadenkreuz-Deko, auf das äußere Feld beschnitten -->
      <g class="radar-grid" clip-path="url(#mbk-radar-clip)">
        <line x1="132" y1="6" x2="132" y2="250" />
        <line x1="10" y1="128" x2="254" y2="128" />
      </g>

      <!-- rotierender Radar-Sweep (nur wenn animiert) -->
      <g class="radar-sweep" clip-path="url(#mbk-radar-clip)">
        <path d="M132 128 L132 10 A118 118 0 0 1 235 79 Z" />
      </g>

      <!-- Radius-Ringe: 20 / 10 / 5 km -->
      <circle class="radar-ring ring-20" cx="132" cy="128" r="118" />
      <circle class="radar-ring ring-10" cx="132" cy="128" r="80" />
      <circle class="radar-ring ring-5" cx="132" cy="128" r="42" />

      <!-- abstrahierte Ortssilhouette -->
      <g class="radar-town">
        <line x1="104" y1="152" x2="160" y2="152" />
        <rect x="110" y="139" width="12" height="13" rx="1.5" />
        <rect x="124" y="130" width="13" height="22" rx="1.5" />
        <rect x="139" y="143" width="11" height="9" rx="1.5" />
        <rect x="100" y="146" width="9" height="6" rx="1.5" />
      </g>

      <!-- Kern = Standort / Linse -->
      <circle class="radar-core-halo" cx="132" cy="128" r="10" />
      <circle class="radar-core" cx="132" cy="128" r="4.5" />

      <!-- „Terminanfragen" -->
      <g class="radar-dots">
        <circle cx="104" cy="108" r="3.4" style="--i:0" />
        <circle cx="172" cy="150" r="3.4" style="--i:1" />
        <circle cx="98" cy="176" r="3.4" style="--i:2" />
        <circle cx="188" cy="96" r="3.4" style="--i:3" />
        <circle cx="150" cy="214" r="3.4" style="--i:4" />
        <circle cx="62" cy="142" r="3.4" style="--i:5" />
        <circle cx="218" cy="172" r="3.4" style="--i:6" />
        <circle cx="130" cy="48" r="3.4" style="--i:7" />
      </g>

      <!-- km-Beschriftung entlang einer Diagonale -->
      <g class="radar-labels">
        <line x1="132" y1="128" x2="215" y2="49" />
        <circle cx="162" cy="102" r="1.6" />
        <text x="167" y="106">5 km</text>
        <circle cx="189" cy="75" r="1.6" />
        <text x="194" y="79">10 km</text>
        <circle cx="215" cy="49" r="1.6" />
        <text x="220" y="53">20 km</text>
      </g>

      <text class="radar-caption" x="132" y="255">Illustration · Einzugsgebiet</text>
    </svg>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        color: var(--text-strong);
        font-size: var(--mbk-radar-size, 15px);
        /* Deko-/Akzent-Tokens – zentral überschreibbar */
        --mbk-radar-line: var(--border-strong);
        --mbk-radar-signal: var(--color-primary-500);
        --mbk-radar-core: var(--color-primary-600);
      }
      :host(.is-mark) {
        color: currentColor;
        --mbk-radar-line: currentColor;
        --mbk-radar-signal: currentColor;
        --mbk-radar-core: currentColor;
      }

      svg {
        display: block;
        width: 100%;
        height: auto;
        overflow: visible;
      }

      .radar-grid line {
        stroke: var(--mbk-radar-line);
        stroke-width: 1;
        stroke-dasharray: 2 6;
        opacity: 0.32;
      }

      .radar-ring {
        stroke: var(--mbk-radar-line);
        fill: none;
        transform-box: view-box;
        transform-origin: 132px 128px;
      }
      .ring-20 { stroke-width: 1.25; opacity: 0.42; }
      .ring-10 { stroke-width: 1.4; opacity: 0.6; }
      .ring-5 { stroke-width: 1.6; opacity: 0.85; }

      .radar-town line {
        stroke: var(--mbk-radar-line);
        stroke-width: 1.4;
        stroke-linecap: round;
        opacity: 0.7;
      }
      .radar-town rect {
        fill: none;
        stroke: currentColor;
        stroke-width: 1.4;
        opacity: 0.75;
      }

      .radar-core-halo {
        fill: none;
        stroke: var(--mbk-radar-core);
        stroke-width: 1.6;
        opacity: 0.55;
      }
      .radar-core { fill: var(--mbk-radar-core); }

      .radar-dots circle {
        fill: var(--mbk-radar-signal);
        transform-box: fill-box;
        transform-origin: center;
      }

      .radar-labels line {
        stroke: var(--mbk-radar-line);
        stroke-width: 1;
        opacity: 0.5;
      }
      .radar-labels circle { fill: currentColor; opacity: 0.75; }
      .radar-labels text {
        fill: currentColor;
        font-family: var(--font-sans);
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.01em;
      }

      .radar-caption {
        fill: var(--text-muted);
        font-family: var(--font-sans);
        font-size: 10.5px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        text-anchor: middle;
      }

      /* mark-Variante: nur Grundgerüst zeigen */
      :host(.is-mark) .radar-grid,
      :host(.is-mark) .radar-town,
      :host(.is-mark) .radar-labels,
      :host(.is-mark) .radar-caption,
      :host(.is-mark) .radar-sweep {
        display: none;
      }
      :host(.is-mark) .radar-core-halo,
      :host(.is-mark) .radar-dots circle { opacity: 0.9; }

      /* --- Animation (default) ------------------------------------ */
      .radar-sweep { display: none; }
      .radar-sweep path {
        fill: var(--mbk-radar-signal);
        opacity: 0.14;
        transform-box: view-box;
        transform-origin: 132px 128px;
      }

      @media (prefers-reduced-motion: no-preference) {
        :host(:not(.is-static):not(.is-mark)) .radar-sweep { display: block; }
        :host(:not(.is-static):not(.is-mark)) .radar-sweep path {
          animation: mbk-radar-sweep 9s linear infinite;
        }
        :host(:not(.is-static)) .radar-ring {
          animation: mbk-radar-breathe 6s var(--ease-out-soft, ease-in-out) infinite;
        }
        :host(:not(.is-static)) .ring-10 { animation-delay: 0.6s; }
        :host(:not(.is-static)) .ring-5 { animation-delay: 1.2s; }
        :host(:not(.is-static)) .radar-dots circle {
          opacity: 0;
          transform: scale(0.2);
          animation: mbk-radar-dot 0.5s var(--ease-out-soft, ease-out) forwards;
          animation-delay: calc(0.9s + var(--i) * 0.35s);
        }
      }

      @keyframes mbk-radar-sweep {
        to { transform: rotate(360deg); }
      }
      @keyframes mbk-radar-breathe {
        0%, 100% { opacity: var(--o, 0.6); transform: scale(1); }
        50% { opacity: calc(var(--o, 0.6) * 1.35); transform: scale(1.012); }
      }
      .ring-20 { --o: 0.42; }
      .ring-10 { --o: 0.6; }
      .ring-5 { --o: 0.85; }
      @keyframes mbk-radar-dot {
        to { opacity: 0.95; transform: scale(1); }
      }

      /* Dark Mode: Signalpunkte etwas heller für Kontrast auf dunkler Fläche */
      @media (prefers-color-scheme: dark) {
        :host {
          --mbk-radar-signal: var(--color-primary-400);
          --mbk-radar-core: var(--color-primary-300);
        }
      }
      :host-context([data-theme='dark']) {
        --mbk-radar-signal: var(--color-primary-400);
        --mbk-radar-core: var(--color-primary-300);
      }
      :host-context([data-theme='light']) {
        --mbk-radar-signal: var(--color-primary-500);
        --mbk-radar-core: var(--color-primary-600);
      }
    `,
  ],
})
export class ReachRadar {
  /** Referenz-Kantenlänge in px (skaliert Labels + SVG-Feld). */
  readonly size = input(15);
  /** `full` = komplette Illustration, `mark` = reduziertes Signet. */
  readonly variant = input<'full' | 'mark'>('full');
  /** Animation aktiv (zusätzlich immer via prefers-reduced-motion gedämpft). */
  readonly animated = input(true);
}
