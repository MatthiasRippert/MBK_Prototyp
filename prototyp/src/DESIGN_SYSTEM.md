# MBK Design System

Tailwind CSS v4 (CSS-first). Es gibt **keine `tailwind.config.js`** – die gesamte
Konfiguration lebt in `src/styles.css`.

## Setup / Pipeline

| Datei | Zweck |
|---|---|
| `.postcssrc.json` | Aktiviert `@tailwindcss/postcss` (der v4-Weg für den Angular-Builder `@angular/build:application`). |
| `src/styles.css` | `@import "tailwindcss";` + `@theme` (Tokens) + `@layer base` (Reset/Semantik) + `@layer components` (Bausteine) + `@utility` (Zusatz-Utilities). In `angular.json` als globaler Style registriert. |
| `src/app/app.*` | Demo-Seite, die alle Tokens & Komponenten zeigt. Theme-Toggle über `document.documentElement[data-theme]` + `localStorage`. |

Build: `npm run build` · Dev: `npm start`

## Aufbau von `styles.css`

1. **`@theme`** – statische Design Tokens. Alles hier erzeugt automatisch
   Utility-Klassen (`--color-primary-600` → `bg-primary-600`, `text-primary-600`,
   `border-primary-600` …).
2. **`@layer base`** – globaler Reset, Typo-Defaults, Fokus-States,
   `prefers-reduced-motion`, und die **semantischen Oberflächen-Tokens**.
3. **`@layer components`** – wiederverwendbare Klassen (`.btn`, `.card`, `.input` …).
4. **`@utility`** – einzelne Zusatz-Utilities (`text-gradient`, `surface-*` …).

## Token-Ebenen

### Ebene 1 – Roh-Skalen (`@theme`)
`primary` (Bordeaux `#521013` – Marken-Anker/Vertrauen),
`secondary` (Sand-Taupe `#D3B998` – Ruhe/Wärme),
`accent` (Apricot `#FFBC7D` – Handlungsimpuls/CTA),
`neutral` (warmes Greige), `success` / `warning` / `error` / `info`.
Alle Farb-Skalen als `oklch` definiert (siehe `styles.css:23-66`).
Stufen `50`–`950`. Direkt als Tailwind-Klassen nutzbar.

#### Rollen-Regel: Apricot (`accent`)

Apricot ist **ausschließlich** die Farbe der **einen primären Handlung** –
dem CTA „Erstgespräch buchen" / „Termin anfragen". Kein Apricot für Deko,
Hover-Flächen, Icons, Badges oder sekundäre Buttons. Wenn Apricot auf einer
Sektion auftaucht, ist das der Punkt, an dem der Nutzer klicken soll.
Sekundäraktionen laufen über `btn-secondary` / `btn-primary` (Bordeaux).

### Ebene 2 – Semantische Oberflächen-Tokens (CSS-Variablen, dark-mode-fähig)
Für **App-Chrome immer diese verwenden**, nicht die Roh-Skala:

| Variable | Bedeutung |
|---|---|
| `--surface-page` / `--surface-raised` / `--surface-sunken` / `--surface-inverse` | Hintergrund-Ebenen. Hell: `--surface-page` = `secondary-50` (dezent warmes Creme-Grundpapier), nicht reinweiß. |
| `--text-strong` / `--text-default` / `--text-muted` | Textfarben |
| `--text-on-primary` / `--text-on-accent` | Text auf farbigen Flächen |
| `--border-subtle` / `--border-strong` | Rahmen |
| `--ring-focus` | Fokus-Ring |

Zugriff: CSS-Variable (`background-color: var(--surface-raised)`) oder die
Helfer-Utilities `surface-page`, `surface-raised`, `surface-sunken`,
`text-strong`, `text-default`, `text-muted`, `border-subtle`.

## Dark Mode

Zwei Wege, beide unterstützt:
- **Explizit:** `<html data-theme="dark">` (Toggle in `app.ts`, in `localStorage` gemerkt) – gewinnt immer.
- **Automatisch:** `@media (prefers-color-scheme: dark)`, solange nicht `data-theme="light"` gesetzt ist.

Die `dark:`-Variante ist auf `[data-theme="dark"]` gemappt
(`@custom-variant dark …`). Wer konsequent die semantischen Tokens nutzt,
braucht `dark:` fast nie – die Variablen schalten selbst um.

## Weitere Tokens

- **Typo:** `--font-sans`, `--font-display`, `--font-mono`; Größen `text-2xs` … `text-6xl` (modulare Skala ~1.2, mit line-height/letter-spacing).
- **Radius:** `rounded-xs … rounded-2xl`, `rounded-full`.
- **Shadow:** `shadow-xs … shadow-xl`, plus `--shadow-focus`.
- **Spacing:** 4/8-Raster von Tailwind + Ergänzungen `spacing-18/22/30`.
- **Container:** `--container-site` (1200px) via `.container-site`; `--container-prose` via `max-w-prose`.
- **Motion:** `--ease-out-soft`, `--animate-fade-up`.

## Komponenten-Klassen

| Klasse | Varianten / Modifier |
|---|---|
| `.btn` | `.btn-primary` `.btn-accent` `.btn-secondary` `.btn-ghost` · Größen `.btn-sm` `.btn-lg` |
| `.card` | `.card-interactive` (Hover-Lift) |
| `.input` `.textarea` `.select` `.label` `.field-hint` | – |
| `.badge` | `.badge-accent` `.badge-success` |
| `.container-site` `.section` | Layout-Rhythmus |
| `.eyebrow` | Section-Label |
| `.stat-value` `.stat-label` | Vertrauens-Kennzahlen |
| `.section-tint` | warme Sandfläche (secondary-100) für ganze Sektionen – rahmt Hero + Kontakt |
| `.section-sand` | tiefere Sand/Taupe-Signaturfläche (secondary-200) mit lokalen Token-Overrides – Team-Sektion |
| `.section-invert` | vollflächige Bordeaux-Sektion (primary-950) mit lokalen Token-Overrides – Kennzahlen + Footer-CTA |

## So erweiterst du das System

### Neuen Token hinzufügen
1. In `@theme` in `styles.css` unter der passenden Gruppe ergänzen, Namenskonvention einhalten:
   `--color-<rolle>-<stufe>`, `--text-<name>`, `--radius-<name>`, `--shadow-<name>`.
2. Build neu starten – die Utility-Klasse existiert automatisch.
3. Bei neuer Oberflächen-Rolle zusätzlich in **allen drei** `:root`-Blöcken
   (`:root`, `@media prefers-color-scheme: dark`, `:root[data-theme="dark"]`) einen Wert setzen.

### Neue Komponente hinzufügen
1. In `styles.css` in `@layer components` eine Klasse anlegen.
2. Nur Tokens verwenden (`var(--…)` oder `@apply` mit Token-Utilities) – **keine Hex-Werte**.
3. Varianten als Zusatzklassen (`.mycomp-lg`), nicht als neue Basisklasse.
4. In der Demo-Seite (`app.html`) ein Beispiel ergänzen.

### Namenskonventionen
- Rollen statt Farbnamen: `primary`, nicht `blue`.
- Komponenten: `.<block>` + `.<block>-<variante>` (BEM-nah, ohne `__element`).
- Semantische Tokens für Flächen/Text/Rahmen; Roh-Skala nur für Akzente/Illustration.

### Dynamische Klassen (Angular Bindings)
Tailwind scannt Quelltext nach vollständigen Klassennamen. Zusammengesetzte
Namen wie `'bg-' + farbe` werden **nicht** erkannt. Entweder statisch ausschreiben
oder – wie in der Demo – in `styles.css` per `@source inline("…")` safelisten.
