import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RevealDirective } from '../shared/reveal.directive';
import { Icon } from '../shared/icon';

@Component({
  selector: 'mbk-kontakt',
  imports: [FormsModule, RevealDirective, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="kontakt" class="section section-lg section-tint grain relative overflow-hidden">
      <div class="container-site relative z-10 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div mbkReveal>
          <p class="eyebrow mb-4">Kontakt</p>
          <h2 class="display display-2">Lassen Sie uns über Ihr Fachgeschäft sprechen</h2>
          <p class="lead mt-4">
            Ein kurzes, unverbindliches Erstgespräch – wir schauen gemeinsam auf
            Ihr Einzugsgebiet und sagen Ihnen ehrlich, ob und wie wir helfen
            können.
          </p>

          <ul class="mt-8 space-y-4">
            <li class="flex items-start gap-3">
              <mbk-icon name="edit" [size]="20" class="mt-0.5 text-primary-600" />
              <div>
                <p class="font-semibold text-strong">Formular</p>
                <p class="text-sm text-muted">Antwort werktags innerhalb von 24&nbsp;Stunden.</p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <mbk-icon name="phone" [size]="20" class="mt-0.5 text-primary-600" />
              <div>
                <p class="font-semibold text-strong">Telefon</p>
                <p class="text-sm text-muted">
                  <a class="underline decoration-secondary-400 underline-offset-2 hover:text-strong" href="tel:+490000000000">
                    +49&nbsp;(0)&nbsp;000&nbsp;000&nbsp;000
                  </a>
                  <span class="text-muted"> (Platzhalter)</span>
                </p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <mbk-icon name="mail" [size]="20" class="mt-0.5 text-primary-600" />
              <div>
                <p class="font-semibold text-strong">E-Mail</p>
                <p class="text-sm text-muted">
                  <a class="underline decoration-secondary-400 underline-offset-2 hover:text-strong" href="mailto:hallo@mbk-design.example">
                    hallo&#64;mbk-design.example
                  </a>
                  <span class="text-muted"> (Platzhalter)</span>
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div class="card">
          @if (submitted()) {
            <div role="status" class="py-6 text-center">
              <p class="stat-value text-primary-700">Danke!</p>
              <p class="mt-2 text-default">
                Ihre Anfrage ist im Prototyp angekommen. In der echten Seite
                meldet sich MBK Design innerhalb von 24&nbsp;Stunden.
              </p>
              <button type="button" class="btn btn-secondary mt-6" (click)="reset()">
                Weiteres Formular ausfüllen
              </button>
            </div>
          } @else {
            <form class="grid gap-4 sm:grid-cols-2" (ngSubmit)="onSubmit()" novalidate>
              <div class="sm:col-span-2">
                <label class="label" for="k-name">Name*</label>
                <input
                  #nameField
                  id="k-name" name="name" class="input" type="text" autocomplete="name"
                  [ngModel]="name()" (ngModelChange)="name.set($event)" required
                  [attr.aria-invalid]="showError() && !name().trim() ? 'true' : null"
                  [attr.aria-describedby]="showError() && !name().trim() ? 'k-form-error' : null"
                />
              </div>
              <div>
                <label class="label" for="k-mail">E-Mail*</label>
                <input
                  #emailField
                  id="k-mail" name="email" class="input" type="email" autocomplete="email"
                  [ngModel]="email()" (ngModelChange)="email.set($event)" required
                  [attr.aria-invalid]="showError() && !validEmail() ? 'true' : null"
                  [attr.aria-describedby]="showError() && !validEmail() ? 'k-form-error' : null"
                />
              </div>
              <div>
                <label class="label" for="k-shop">Fachgeschäft / Ort</label>
                <input id="k-shop" name="shop" class="input" type="text" [ngModel]="shop()" (ngModelChange)="shop.set($event)" />
              </div>
              <div class="sm:col-span-2">
                <label class="label" for="k-msg">Worum geht es?</label>
                <textarea id="k-msg" name="message" class="textarea" [ngModel]="message()" (ngModelChange)="message.set($event)"></textarea>
                <p class="field-hint">
                  Prototyp: Es werden keine Daten übertragen oder gespeichert.
                </p>
              </div>

              @if (showError()) {
                <p id="k-form-error" class="sm:col-span-2 text-sm font-medium text-error-600" role="alert">
                  Bitte Name und eine gültige E-Mail-Adresse angeben.
                </p>
              }

              <div class="sm:col-span-2">
                <button type="submit" class="btn btn-accent btn-lg w-full sm:w-auto">
                  Erstgespräch buchen
                </button>
              </div>
            </form>
          }
        </div>
      </div>
    </section>
  `,
})
export class Kontakt {
  protected readonly name = signal('');
  protected readonly email = signal('');
  protected readonly shop = signal('');
  protected readonly message = signal('');
  protected readonly submitted = signal(false);
  protected readonly showError = signal(false);

  /** Refs für Fokus-Steuerung auf das erste ungültige Feld bei Submit. */
  private readonly nameField = viewChild<ElementRef<HTMLInputElement>>('nameField');
  private readonly emailField = viewChild<ElementRef<HTMLInputElement>>('emailField');

  protected validEmail(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email().trim());
  }

  protected onSubmit(): void {
    if (!this.name().trim() || !this.validEmail()) {
      this.showError.set(true);
      // Fokus ins erste ungültige Feld – Refs existieren nur im Browser (SSR-sicher).
      const target = !this.name().trim() ? this.nameField() : this.emailField();
      target?.nativeElement.focus();
      return;
    }
    this.showError.set(false);
    this.submitted.set(true);
  }

  protected reset(): void {
    this.name.set('');
    this.email.set('');
    this.shop.set('');
    this.message.set('');
    this.submitted.set(false);
    this.showError.set(false);
  }
}
