import {
  Directive,
  ElementRef,
  inject,
  input,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Scroll-Reveal ohne Animations-Library.
 * Fügt `.reveal` hinzu und setzt `.is-visible`, sobald das Element sichtbar wird.
 * SSR-sicher: rendert serverseitig direkt sichtbar. `prefers-reduced-motion`
 * wird per CSS in styles.css respektiert.
 */
@Directive({
  selector: '[mbkReveal]',
})
export class RevealDirective implements OnInit {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /** Verzögerung in ms, um Elemente gestaffelt einzublenden. */
  readonly revealDelay = input<number | string>(0, { alias: 'mbkReveal' });

  ngOnInit(): void {
    const el = this.host.nativeElement;

    if (!this.isBrowser || !('IntersectionObserver' in window)) {
      this.renderer.addClass(el, 'reveal');
      this.renderer.addClass(el, 'is-visible');
      return;
    }

    this.renderer.addClass(el, 'reveal');
    const delay = Number(this.revealDelay) || 0;
    if (delay > 0) {
      this.renderer.setStyle(el, 'transition-delay', `${delay}ms`);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.renderer.addClass(el, 'is-visible');
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(el);
  }
}
