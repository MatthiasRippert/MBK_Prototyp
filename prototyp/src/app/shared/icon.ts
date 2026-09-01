import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName = 'edit' | 'phone' | 'mail' | 'sun' | 'moon';

/**
 * Kleines Inline-SVG-Set im Stil des bestehenden `svc-chevron`:
 * 24er-Viewbox, `stroke-width: 1.75`, runde Enden, `fill: none`.
 * Ersetzt die früheren Unicode-Glyphen (✎ ✆ @ ☾ ☀).
 */
@Component({
  selector: 'mbk-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      @switch (name()) {
        @case ('edit') {
          <path d="M4 20h4L18.5 9.5a2.12 2.12 0 0 0-3-3L5 17v3Z" />
          <path d="m13.5 8 2.5 2.5" />
        }
        @case ('phone') {
          <path
            d="M6.5 4h3l1.4 3.6-2 1.4a11 11 0 0 0 4.7 4.7l1.4-2 3.6 1.4v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z"
          />
        }
        @case ('mail') {
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3.5 7 8.5 6 8.5-6" />
        }
        @case ('sun') {
          <circle cx="12" cy="12" r="4.5" />
          <path
            d="M12 2v2.5M12 19.5V22M4.2 4.2 6 6M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8 6 18M18 6l1.8-1.8"
          />
        }
        @case ('moon') {
          <path d="M20 14.3A8 8 0 0 1 9.7 4 7 7 0 1 0 20 14.3Z" />
        }
      }
    </svg>
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input(24);
}
