import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Marken-Signet (Platzhalter): eine stilisierte Linse / ein Fokus-Ring –
 * dezentes Optik-Motiv, kein Brillen-Klischee.
 */
@Component({
  selector: 'mbk-brand-mark',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label="MBK Design Signet"
    >
      <rect x="1" y="1" width="30" height="30" rx="9" fill="currentColor" />
      <circle cx="16" cy="16" r="9" stroke="white" stroke-width="2.4" opacity="0.9" />
      <circle cx="16" cy="16" r="3.4" fill="white" />
      <path d="M16 3.5v3M16 25.5v3M3.5 16h3M25.5 16h3" stroke="white" stroke-width="2.4" stroke-linecap="round" opacity="0.9" />
    </svg>
  `,
})
export class BrandMark {
  readonly size = input(32);
}
