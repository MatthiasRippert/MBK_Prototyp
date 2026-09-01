# Design-Review & Umsetzungsplan – MBK Prototyp

> **Kontext:** Die Seite ist **bewusst ohne echte Bilder, Fotos und Partner-Logos**.
> Alle Bild-, Kennzahlen- und Logo-Flächen sind absichtliche Platzhalter.
> Dieser Plan enthält **keine** Empfehlungen der Art „echte Fotos einsetzen" –
> alle Punkte funktionieren mit SVG/CSS, Typografie, Layout und Farb-Tokens.
> Ziel: Die Platzhalter sollen **gewollt und gestaltet** wirken, nicht wie ein
> unfertiger Ladezustand.

Stand: 2026-09-01 · Basis: `src/styles.css`, `src/app/sections/*`, `src/app/layout/*`, `src/app/shared/*`

---

## Gesamtbild

**Gut:** Token-Architektur (oklch-Skalen, semantische Surface-Tokens, `section-invert`
mit lokalem Token-Override), Accessibility-Grundlage (Skip-Link, `:focus-visible`,
konsequentes `prefers-reduced-motion`, semantisches HTML), Copy/Tonalität
(spezifisch, branchenkundig), das editoriale Nummern-Akkordeon bei „Leistungen",
progressive Enhancement bei Scroll-Animationen (`animation-timeline: view()` + Fallback).

**Schwach:** Das Layout ist das Standard-SaaS-Template-Skelett (Blur-Header,
zentriertes Hero mit Gradient-Span + Verlaufsbox, Logo-Marquee, Akkordeon,
4-Schritte-Prozess, dunkle Kennzahlen, 3-Spalten-Testimonials, CTA-Band, fetter
Footer). Default-Schrift (Inter / Inter Tight). Die Marke (Bordeaux `#521013`)
ist visuell fast unsichtbar. Für eine Agentur, die selbst Positionierung verkauft,
ist das ein Glaubwürdigkeitsproblem.

**Leitidee für alle Änderungen:** „Scharfstellen" als durchgängiges Prinzip –
unscharf → scharf, als Bild-, Typo- und Interaktionsmotiv. Zeigt die Kernbotschaft,
statt sie nur zu behaupten.

---

## P0 – Schnelle Handwerks-Fixes (klein, hoher Nutzen)

- [x] **Sticky-Header verdeckt Sektionsüberschriften.**
  `src/styles.css`, `@layer base`: `section[id] { scroll-margin-top: 5rem; }`
  (Header ist ~64 px + Luft). Test: jeden Nav-Anker klicken.

- [x] **`overflow-hidden` clippt den Floating-Chip im Hero.**
  `src/app/sections/hero.ts:14` – `overflow-hidden` liegt auf der `<section>`,
  `chip-float` (`hero.ts:66`) sitzt `-bottom-5 -left-5` und wird samt Schatten
  abgeschnitten.
  Fix: Deko-Blobs in einen eigenen `<div class="absolute inset-0 overflow-hidden" aria-hidden="true">`
  legen, `overflow-hidden` von der Section nehmen.
  Gleiche Prüfung für `prozess.ts`, `kennzahlen.ts`, `kontakt.ts`.

- [x] **Icon-Inkonsistenz: Unicode-Glyphen statt SVG.**
  `src/app/sections/kontakt.ts` (`✎ ✆ @`, Zeilen ~23/30/42) und
  `src/app/layout/site-header.ts` (`☾ / ☀`, ~Zeile 55).
  Rendern in wechselnden Gewichten, wirken wie Mojibake, springen beim Umschalten
  in der Breite. Rest der Seite nutzt saubere Inline-SVGs (`svc-chevron`).
  Fix: kleines Inline-SVG-Set, 20/24 px, `stroke-width: 1.75` (wie der Chevron),
  als `shared`-Komponente oder statische Templates. Theme-Toggle mit
  Crossfade/Rotate statt Glyphtausch.

- [x] **`scroll-margin` auch für den Skip-Link-Ziel-Container** prüfen, falls
  vorhanden. (Skip-Link zeigt auf `#leistungen`, ein `<section id>` – von der
  `section[id]`-Regel oben mit abgedeckt.)

- [x] **DESIGN_SYSTEM.md ist veraltet.** `src/DESIGN_SYSTEM.md:29` beschreibt
  `primary=Blau / secondary=Teal / accent=Amber`; tatsächlich ist es
  Bordeaux / Sand-Taupe / Apricot (`styles.css:23-66`). Doku angleichen, damit
  niemand nach falschen Rollenfarben arbeitet.

---

## P1 – Eigenständigkeit & Marke (der eigentliche Hebel)

### 1. Typografie: weg vom Default

- [x] Display-Schrift mit Haltung wählen (`--font-display`, `styles.css:106`).
  → **Fraunces** (Kontrast-Serif, OFL). Redaktionelle Haltung, hohe x-Höhe,
  offene Aperturen, optische Größenachse (`opsz`); Motiv Schärfe/Kontrast/„Sehen",
  passt zur warmen Markenwelt (Bordeaux/Sand/Apricot).
  Richtungen:
  - **Geometrisch-eigen:** Space Grotesk, Instrument Sans, ABC Diatype (wenn Lizenz)
  - **Redaktioneller Kontrast:** Kontrast-Serif für Headlines – Fraunces,
    Newsreader, Signifier – auf neutraler Textschrift
  - Für die Optik-Branche inhaltlich anschlussfähig: hohe x-Höhe, offene
    Aperturen („Lesbarkeit / Sehen")
- [x] Textschrift darf **Inter bleiben** (`--font-sans`). Nur die Headline muss tragen.
  (Inter unverändert; nur der Google-Fonts-Request in `src/index.html` von
  Inter+Inter Tight auf Inter+Fraunces umgestellt.)
- [ ] Font über `@font-face` selbst hosten (`public/` + `styles.css`), nicht per
  CDN – wegen DSGVO-Versprechen der Seite. _(bewusst übersprungen – Prototyp;
  Fraunces + Inter werden weiterhin per Google Fonts CDN geladen.)_
- [x] `--text-*`-Skala nach Schriftwechsel neu prüfen (line-height, letter-spacing
  bei den großen Stufen `4xl`–`6xl`).
  (`styles.css`: `4xl`–`6xl` line-height enger, Tracking von −0.02/−0.025/−0.03em
  auf −0.01/−0.015/−0.02em; ebenso `h1–h6`, `.display*`, `.stat-value`;
  `font-optical-sizing: auto` auf Headings.)

### 2. Farbe: Bordeaux als Grundhaltung, nicht als Button-Farbe

- [x] **Grundpapier** von `neutral-50` (greige-weiß) auf warmes Creme
  (`secondary-50`) umstellen – `--surface-page` in allen drei `:root`-Blöcken.
  (`styles.css` heller `:root`-Block: `--surface-page` = `var(--color-secondary-50)`.
  Dark-Blöcke bleiben `neutral-950`. In `DESIGN_SYSTEM.md` nachgezogen.)
- [x] **Mindestens eine vollflächige Bordeaux-Sektion** als Signatur zusätzlich zu
  Kennzahlen (`section-invert`). Kandidat: eine Statement-/Zitat-Sektion oder das
  CTA-Band.
  (Footer-CTA in `site-footer.ts` von der gerundeten `.cta-band`-Box auf eine
  randlose, vollflächige `.section-invert`-Sektion umgebaut – gleiche Optik/Token-
  Logik wie Kennzahlen, weiße Typo über Tokens, `btn-secondary` erbt lokale Tokens,
  `lens-rings` als dezente Deko. `.cta-band` aus `styles.css` entfernt, da ungenutzt.)
- [x] **`section-tint`** (`styles.css:~626`) entweder deutlich sichtbarer machen
  oder ganz entfernen – der aktuelle Halbeffekt liest sich als verschmutztes Weiß.
  (`.section-tint` neu: solide `secondary-100`-Fläche + sehr dezenter Top-Verlauf
  aus `secondary-200`, setzt sich jetzt klar vom `secondary-50`-Grundpapier ab.
  Dark-Variante: warm getönte `oklch(0.205 0.018 55)`-Fläche statt Radial-Halbeffekt.
  **Rhythmus-Entscheidung:** `.section-tint` bleibt nur auf **Hero + Kontakt**
  (rahmen die Seite ein). Bei **Prozess** wurde `section-tint` **entfernt** –
  Prozess liegt direkt vor der neuen Team-Sandfläche, und zwei aufeinanderfolgende
  Sandtöne (tint → sand) würden verschwimmen. Prozess steht jetzt auf Grundpapier
  und bildet die ruhige Zäsur zwischen der Leistungs-Liste und der tieferen
  Team-Fläche. Abstufung: Grundpapier `secondary-50` < `.section-tint` `secondary-100`
  < `.section-sand` `secondary-200` < `.section-invert` Bordeaux.)
- [x] **Sand/Taupe (`secondary`)** als echte zweite Flächenfarbe für ganze
  Sektionen einsetzen, nicht nur für Underline-Deko.
  (Neue Klasse `.section-sand` in `@layer components` – vollflächige `secondary-200`-
  Fläche mit lokalen Token-Overrides analog `.section-invert` (hell/warm): `--text-*`,
  `--surface-*`, `--border-*`, `.eyebrow`, `.stat-value`, `.avatar` gehen mit, AA-Kontrast
  geprüft (primary-950/secondary-900 auf secondary-200). Dark-Variante warm-dunkel.
  Angewendet auf die Team-Sektion (`team.ts`); dort `text-primary-700` an den
  `.stat-value` entfernt, damit die Sektions-Tokens greifen.)
- [x] Regel dokumentieren: Apricot (`accent`) ausschließlich für **die eine**
  Handlung.
  (`DESIGN_SYSTEM.md`, Abschnitt „Ebene 1 – Roh-Skalen" → neuer Unterabschnitt
  „Rollen-Regel: Apricot (`accent`)". CTA-Vereinheitlichung selbst ist P1.3.)

### 3. CTA-Hierarchie vereinheitlichen

- [x] „Erstgespräch buchen" überall dieselbe Button-Variante.
  (Alle primären „Erstgespräch buchen"-CTAs auf `btn-accent` + einheitlichen Text
  „Erstgespräch buchen" vereinheitlicht: `hero.ts:36` (`btn-primary`→`btn-accent`,
  Text „Kostenloses Erstgespräch"→„Erstgespräch buchen"), `site-footer.ts:19`
  (Text „Termin anfragen"→„Erstgespräch buchen"), `prozess.ts:40`
  (`btn-primary`→`btn-accent`, Text „Schritt 1 starten – Erstgespräch"→
  „Erstgespräch buchen"), `kontakt.ts:106` Submit bleibt `btn-accent`, Text
  „Erstgespräch anfragen"→„Erstgespräch buchen". `site-header.ts:62` war schon
  korrekt. Sekundär-Links (Referenzen/Leistungen ansehen) bleiben `btn-secondary`.)
- [x] Wenn Apricot der CTA sein soll: Füllung auf `accent-600/700`, Hover mit
  deutlichem Wechsel.
  (`styles.css` `.btn-accent`: Füllung `--color-accent-400`→`--color-accent-600`,
  Hover `--color-accent-500`→`--color-accent-700` plus `transform: translateY(-1px)`
  und `:active` `translateY(1px)` konsistent mit `.btn`. Kontrast dunkler Text
  `--text-on-accent` (`neutral-950`) auf `accent-600` (L 0.723) und `accent-700`
  (L 0.607) erfüllt AA. `.section-invert` hat keinen `.btn-accent`-Override –
  Footer-CTA nutzt die verstärkte Basis und liest sich sauber auf Bordeaux.)
- [x] `btn-primary` konsequent als Sekundäraktion.
  (Kein `btn-primary` mehr als primärer CTA im Projekt; `btn-accent` ist die eine
  Handlung, `btn-primary`/`btn-secondary` sind Sekundäraktionen.)

### 4. Wordmark & Signet

- [x] **Wordmark „MBK Design"** (`site-header.ts:~32`, `site-footer.ts:~35`) ist
  reines Inter Tight 16 px semibold. Echtes Lockup bauen: Signet + Wortmarke mit
  definiertem Abstand, „MBK" kräftiger als „Design", optisches Kerning, ggf.
  Versalien mit Tracking. Als `shared`-Komponente mit fixem Verhältnis.
  (Neue `shared`-Komponente `src/app/shared/wordmark.ts` (`mbk-wordmark`,
  Standalone, `OnPush`, Styles inline, `size`-Input Default 16). „MBK" = Fraunces
  640, Versalien, `letter-spacing: 0.03em`; „Design" = Fraunces 460, `0.94em`,
  `opacity: 0.72` – Hierarchie über optisches Gewicht + Deckkraft statt zweitem
  Farb-Token, Wortmarke bleibt monochrom und erbt via `currentColor`. Festes
  Verhältnis: alle Maße in `em`, `gap: 0.28em`. `font-optical-sizing: auto`
  (Fraunces `opsz`), `font-kerning: normal`, `white-space: nowrap` statt `&nbsp;`.
  Screenreader liest ein Element „MBK Design" (`sr-only`-Span, sichtbare Teile
  `aria-hidden`). Eingebunden in `site-header.ts` und `site-footer.ts` statt des
  alten `<span>`. Signet (`brand-mark.ts`) bleibt unverändert – eigener Punkt.
  `npm run build` läuft durch.)
- [ ] **Signet** (`src/app/shared/brand-mark.ts:11-23`) liest sich als
  generisches Ziel-/Kamera-Icon; die vier Ticks wirken bei 30 px wie ein
  Lade-Spinner. Distinktiveres Konzept:
  - Monogramm „M" aus zwei Linsen-/Bogenformen konstruiert
  - Buchstabe/Form, die von unscharf → scharf „auflöst" (passt zur Copy)
  - Phoropter-/Diopter-Anmutung
  Muss bei 24 px noch funktionieren.

### 5. Hero-Visual: gestalteter Platzhalter statt Gradient-Blob

- [x] `.media-frame` (`hero.ts:44-63`, `styles.css:~693`) ist ein violetter
  Farbverlauf mit `lens-rings` – liest sich wie ein nicht geladenes Bild.
  (Aus dem Hero entfernt; `.media-frame` / `.media-frame::before` / `.lens-rings`
  bleiben in `styles.css`, da noch von `team.ts` und `site-footer.ts` genutzt –
  deren Ablösung ist P1.5 nachgelagert.)
- [x] Ersetzen durch ein **echtes Marken-SVG-Artefakt**, z. B.
  **„Einzugsgebiet-Radar":** konzentrische Radius-Ringe (5/10/20 km) über einer
  abstrahierten Ortssilhouette, Punkte für „Terminanfragen". Ist gleichzeitig
  Linsen-Motiv, „lokale Sichtbarkeit" und Quelle fürs Signet.
  Reines SVG, dezent animierbar (Ringe pulsen), `prefers-reduced-motion` → statisch.
  (Neue `shared`-Standalone-Komponente `src/app/shared/reach-radar.ts`
  (`mbk-reach-radar`, `OnPush`, Styles inline). Reines SVG mit `viewBox 0 0 264 264`,
  konzentrische Ringe `.ring-5/.ring-10/.ring-20` mit Diagonal-Beschriftung
  „5 / 10 / 20 km", abstrahierte Ortssilhouette (`.radar-town`), Kern als
  Linsen-Doppelkreis (`.radar-core`/`.radar-core-halo`), acht Signalpunkte
  (`.radar-dots`), ehrliches SVG-Label `.radar-caption` „Illustration ·
  Einzugsgebiet". Skaliert über `viewBox` + Host-`font-size` (`--mbk-radar-size`),
  monochrom über `currentColor`; Deko-Tokens `--mbk-radar-line/-signal/-core`
  zentral überschreibbar. `variant="full" | "mark"` (mark = nur Ringe+Kern für
  spätere Nutzung), `animated`-Input. Animation: langsamer Radar-Sweep,
  Ring-„Atmen", einmalig gestaffelt erscheinende Punkte – alles hinter
  `@media (prefers-reduced-motion: no-preference)`, sonst statisch. Dark Mode
  über `@media (prefers-color-scheme: dark)` + `:host-context([data-theme])`,
  Signalpunkte auf `primary-400/300`. Im Hero eingebunden in neuem Panel
  `.radar-panel` / `.radar-panel-cap` (`styles.css`) statt `.media-frame`;
  Blur→Scharf-Intro über neue Klasse `.reveal-focus` auf der bestehenden
  `.reveal`/`.is-visible`-Mechanik der `RevealDirective`. `npm run build` läuft
  durch.)
- [ ] Wiederverwenden: groß im Hero, klein bei Prozess-Schritt 1, als
  Wasserzeichen im Footer.
  (Komponente dafür vorbereitet – `variant="mark"`, `size`-Input, monochrom über
  `currentColor`. Einbindung in Prozess-Schritt 1 und Footer-Wasserzeichen folgt.)
- [x] Der Platzhalter-Charakter darf sichtbar bleiben (die Seite ist bewusst
  asset-frei) – aber als **bewusste Illustration**, nicht als Verlaufsfläche.
  (SVG liest als Diagramm; `.radar-caption` und die `figcaption` benennen den
  schematischen Charakter ehrlich, ohne Fake-Präzision.)

### 6. Doppelte Kennzahlen entschärfen

- [ ] `+38 % / −24 %` stehen identisch im Hero (`hero.ts:77-80`) **und** in der
  Kennzahlen-Sektion (`kennzahlen.ts:~56`). Wirkt wie Copy-Paste – gerade weil
  beide als „Beispielwerte" gekennzeichnet sind.
- [ ] Hero auf **eine** einprägsame Aussage reduzieren (gern qualitativ statt
  numerisch). Zahlen exklusiv in der Kennzahlen-Sektion.
  (Teilerledigt über P1.5: der Hero-„Ergebnis-Snapshot" inkl. `stats`-Array,
  `Stat`-Interface, `@for` und Fußnote „Illustrative Beispielwerte" ist ersatzlos
  entfernt – der Hero ist jetzt zahlenfrei. Restliche Kennzahlen-Formulierung
  bleibt offen.)
- [ ] Platzhalter-Zahlen ehrlich als „So messen wir" rahmen statt Fantasiewerte –
  sonst untergräbt es das „ehrlich"-Versprechen aus dem Hero-Text.

---

## P2 – Layout-Rhythmus & Politur

- [x] **Dichte-Kontrast einführen.** `.section-lg` hat überall ~10 rem
  oben/unten (`styles.css:~619`). Mindestens eine bewusst enge, redaktionelle
  Sektion (dichte Leistungsliste, fast wie ein Inhaltsverzeichnis) gegen eine
  sehr luftige, großgesetzte Statement-Zeile setzen. Spannung durch
  Rhythmuswechsel statt durch Effekte.
  (`styles.css`: `.svc-summary` padding `1.5rem`→`0.875rem`, `.svc-panel`
  padding-bottom `1.75rem`→`1.25rem` – die Leistungs-Liste liest jetzt als
  Inhaltsverzeichnis. Neue Sektion `src/app/sections/statement.ts`
  (`mbk-statement`, Standalone/OnPush): ein einzelner großgesetzter
  Positionierungssatz in `.display .display-2`, zentriert, `max-w-4xl`, viel
  vertikaler Weißraum (`py-6 md:py-12` zusätzlich zu `section-lg`), ein Wort in
  `text-primary-700`. Eingebunden in `app.ts`/`app.html` direkt nach Leistungen,
  vor Prozess.)

- [x] **Scroll-Reveals radikal ausdünnen.** Aktuell hat praktisch jedes Element
  `mbkReveal` mit `fade-up` (`reveal.directive.ts`, überall). Reveal auch auf
  großen Wrappern (`leistungen.ts:~26` auf der ganzen `svc-list`) → spätes
  Rendern.
  Nur noch Sektions-Header + 1–2 Signature-Momente animieren.
  Stattdessen **ein** thematischer Effekt: Hero-Headline oder Hero-Visual
  `blur(8px) → blur(0)` beim Laden („scharf stellen").
  `prefers-reduced-motion` → sofort scharf (Mechanik ist schon sauber).
  (`mbkReveal` entfernt von: `leistungen.ts` `.svc-list`-Wrapper + Schluss-CTA;
  `prozess.ts` `.prozess-rail` + alle vier `.process-step` + Schluss-CTA;
  `kennzahlen.ts` alle Kennzahl-Items + alle Testimonial-Karten (inkl. jetzt
  ungenutzter `$index`-Aliasse); `team.ts` `.media-frame` + alle Member-Karten;
  `kontakt.ts` Formular-Karte; `hero.ts` mittlerer Visual-Wrapper.
  **Behalten:** je Sektion nur der Header, der Hero-Textblock, die Partner-Zeile,
  der Footer-CTA-Header und – als der eine thematische Effekt – `.reveal-focus`
  (Blur→Scharf) am Hero-Radar. Ungenutzte CSS-Regel
  `.process-step.reveal .process-step-num` (Zähl-Overshoot) aus `styles.css`
  entfernt.)

- [x] **Prozess-Schritt-Titel** (`prozess.ts:~33`, aktuell `text-lg`) auf
  `text-xl`/`text-2xl` + Display-Font. Große Ordnungszahl als visueller Anker
  (`card-num`-Idee aus `styles.css:~357` konsequent nutzen).
  (`prozess.ts`: `<h3 class="text-lg">` → `text-xl sm:text-2xl` (Display-Font
  erbt aus dem `@layer base` h3-Reset). `styles.css` `.process-step-num`: vom
  2,25-rem-Vollkreis (primary-600-Fläche, weiße Ziffer) auf eine große
  Outline-Ordnungszahl (Fraunces 700, `3rem`, `color: primary-600`,
  `tabular-nums`) umgebaut – gleiche Anmutung wie `.svc-num`/`.card-num`.
  `.process-step` padding-left `3.25rem`→`4.25rem`, Grid-Zeilenabstand
  `gap-y-10`→`gap-y-12`.)

- [x] **Eyebrow-Kontrast.** `.eyebrow` nutzt `secondary-600` (`styles.css:~422`),
  oklch L≈0.55 auf hellem Grund – bei `text-xs`-Versalien an/unter der AA-Grenze.
  Auf `secondary-700` oder `primary-700` gehen, oder Größe auf `text-sm`.
  In `section-invert` ist es `accent-300` auf Bordeaux – dort separat prüfen.
  (`.eyebrow` Basisfarbe `secondary-600` → `secondary-700` (L≈0.468 auf
  `secondary-50`-Grundpapier → deutlich über AA für Versalien-Text). Die
  `section-invert`-/`section-sand`-Overrides (`accent-300` bzw. `primary-700`)
  bleiben – `accent-300` (L≈0.888) auf `primary-950` (L≈0.208) ist weit über AA,
  `primary-700` auf `secondary-200` ebenfalls. Größe bleibt bei `text-xs`.)

- [x] **Partner-Marquee** (`partner.ts`, `styles.css:~535`) wirkt ohne echte
  Logos wie ein Skeleton-Loading-State.
  (Entscheidung: statisches, gleichmäßiges Graustufen-Grid statt Endlos-Scroll.
  `partner.ts` neu: `<ul class="logo-grid">` mit 6 gleichförmigen `.logo-plate`-
  Feldern (2/3/6 Spalten responsiv), `loop`-Verdopplung + `marquee`/`marquee-mask`
  aus dem Template raus. `styles.css`: `.marquee`, `.marquee-mask` und
  `@keyframes marquee` ersatzlos entfernt, neue `.logo-grid`-Klasse. `.logo-plate`
  jetzt `surface-sunken` + `filter: grayscale(1)` + `text-xs`, **kein Hover** –
  liest klar als bewusstes Platzhalter-Feld. Die ehrliche Platzhalter-Notiz
  darunter bleibt.)

- [x] **Gradient-Text-Span** (`hero.ts:23`, `.text-gradient` `styles.css:~882`)
  ist 2020er-Standard.
  (Bewusst behalten – Entscheidung des Auftraggebers. `.text-gradient` im Hero
  bleibt unverändert, kein Code-Change.)

- [x] **`card-interactive`-Hover** (`styles.css:~346`): `translateY(-4px)` +
  `shadow-xl` + `border-primary-300` ist der generischste Karten-Hover.
  Ruhiger: nur Border-Farbe + minimaler Shadow-Shift, oder ein akzentuierter
  linker Rand, der beim Hover einfährt.
  (`.card-interactive`: kein `translateY` mehr, `shadow-xl`→`shadow-md`,
  `border-primary-300`→`border-strong`. Neu: `::before` als 2px breiter
  `primary-500`-Rand am linken Kartenrand, der per `scaleY(0)→scaleY(1)`
  (transform-origin top) beim Hover einfährt; `transition: none` unter
  `prefers-reduced-motion`. `.card` hat keinen `overflow:hidden`, der Rand sitzt
  bei `left: -1px` sauber auf der Border.)

- [x] **Grain + Blobs** (`styles.css:~667`) sind selbst Trend-Deko (2023).
  Grain nur behalten, wenn sehr subtil – `opacity` runter, `mix-blend` im Dark
  Mode prüfen.
  (Minimal-invasiv statt Umbau auf Punktraster: `.grain::after` `opacity`
  `0.4`→`0.12`, `mix-blend-mode` `overlay`→`multiply` (Hell); im Dark Mode
  separat `opacity: 0.08` + `mix-blend-mode: soft-light` (sonst schluckt die
  dunkle Fläche das Korn / kippt ins Milchige) – als `:root[data-theme="dark"]`
  **und** `@media (prefers-color-scheme: dark)` Regel. `.blob` `opacity`
  `0.5`→`0.32`, Blur `64px`→`72px` (weicher, weniger als Farbfleck lesbar),
  Dark `0.22`→`0.14`, Dark-Selektor zusätzlich um die `:where([data-theme])`-
  Variante ergänzt.)

- [x] **Dark Mode: Tiefenstaffelung am Seitenende.** `neutral-950` (Seite) →
  `primary-950` (Kennzahlen) → dunkles CTA-Band → `surface-sunken` (Footer)
  stoßen fast ohne Kontrast aneinander. Hellere Trennflächen oder klare Borders
  setzen.
  (`styles.css`: im Dark Mode bekommen `.section-invert`, `.section-sand` und
  `.section-tint` ein `border-block: 1px solid oklch(0.62 0.02 40 / 0.32)` –
  eine leicht aufgehellte, warm-neutrale Trennkante zwischen allen getönten
  Vollflächen. Als `:root[data-theme="dark"]`- **und** `@media
  (prefers-color-scheme: dark)`-Regel. Der Footer hat seine `border-t
  border-subtle` schon; zusammen ist die Abfolge Seite → Kennzahlen → CTA →
  Footer jetzt klar abgesetzt. Im Light Mode unverändert.)

- [x] **`text-wrap: balance` global** auf allen h1–h6 (`styles.css:~237`).
  Bei kurzen Headlines entstehen unschöne 2-Wort-Zeilen. Ggf. nur auf
  `h1`/`.display-1`.
  (`@layer base`: `text-wrap: balance` aus dem `h1,h2,h3,h4,h5,h6`-Block
  entfernt, neue Regel `h1, .display-1 { text-wrap: balance; }`. Die
  Marketing-Klasse `.display` behält ihr eigenes `text-wrap: balance` – sie
  sitzt nur auf Hero-`h1` und den langen Sektions-`h2` (`.display-2`), wo
  Balancing erwünscht ist; kurze `h3`/`h4` (Prozess-Schritte, Karten) sind
  davon nicht betroffen und wrappen wieder normal.)

- [x] **Formular-Barrierefreiheit** (`kontakt.ts:~98`). `role="alert"` ist da,
  aber: Fehler nicht per `aria-describedby` mit dem Feld verknüpft, Fokus springt
  bei Submit nicht ins erste ungültige Feld.
  (`kontakt.ts`: Fehler-`<p>` bekommt `id="k-form-error"`; Name- und E-Mail-Feld
  erhalten `[attr.aria-describedby]` auf `'k-form-error'`, solange sie ungültig
  sind (parallel zum schon vorhandenen `aria-invalid`). `role="alert"` bleibt.
  Zwei `viewChild`-Refs (`nameField`/`emailField`, `ElementRef`); `onSubmit()`
  setzt bei ungültigem Formular den Fokus ins erste ungültige Feld
  (`target?.nativeElement.focus()` – optionaler Zugriff ist SSR-sicher, der
  Submit-Handler läuft ohnehin nur im Browser).)

---

## Signature-Konzepte (wenn Zeit für Eigenständigkeit ist)

1. **„Scharfstellen" durchgängig.** Hero-Visual/Headline starten `filter: blur()`
   und werden beim Laden scharf. Deko-Elemente als Bordeaux/Sand-Duplex.
   Umsetzung: eine CSS-Klasse + bestehender `RevealDirective` (Blur statt Translate).

2. **Einzugsgebiet-Radar** als wiederkehrendes SVG (siehe P1.5).

3. **Redaktionelles Nummernsystem** als roter Faden. Ansätze sind da (`svc-num`,
   `card-num`). Jede Sektion bekommt `01 — Leistungen`, große Outline-Ziffern als
   Layout-Element, tabellarische Ziffern (`font-variant-numeric` ist gesetzt).
   Macht aus dem Template-Skelett eine Publikation.

4. **Optotypen-Typografie.** Headline-Schrift mit hoher x-Höhe; eine Sektion mit
   einer echten Sehzeichen-Rampe (Buchstaben groß → klein) als Gestaltungselement
   mit Aussage („Was Ihre Kunden von Ihnen sehen, bevor sie reinkommen").

---

## Reihenfolge-Empfehlung

1. **P0** komplett (1 Sitzung, reines Handwerk).
2. **P1.1 Typografie** + **P1.2 Farbe** – größter Sprung bei Eigenständigkeit,
   nur Token-Änderungen.
3. **P1.3 CTA** + **P1.4 Wordmark/Signet** + **P1.6 Kennzahlen**.
4. **P1.5 Hero-Radar-SVG** (zieht Signature-Konzept 1–2 nach sich).
5. **P2** iterativ als Politur.
