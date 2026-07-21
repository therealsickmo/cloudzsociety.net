# CLOUDZ™ — CloudzSociety.net

Die offizielle Website der **CLOUDZ™** Minecraft Community. Eine moderne,
animierte Plattform im Stil einer hochwertigen Startup-/Gaming-Seite —
gebaut mit Next.js 15, TypeScript, TailwindCSS, shadcn/ui und Framer Motion.

## ✨ Features

- **Home** — animierter Hero, „Über Cloudz", „Server beitreten"-Modal mit
  Copy-to-Clipboard, Feature-Karten und Live-Serverstatistik (Mockdaten)
- **Shop** — Frontend-Shop mit Kategorien (Ränge, Keys, Coins, Bundles,
  Cosmetics), Produktdetailseiten und Währungs-Erklärung
- **Team** — Rollenbasierte Karten mit Minecraft-Skin-Heads und
  Verfügbarkeits-Status
- **Blog** — Markdown-basiert, mit Suche und Kategorie-Filter
- **Changelog** — Timeline-Design mit Suche und Filter
- **Bewerben** — Rollen-Buttons (offen/geschlossen) mit Bewerbungsformular
  an eine Dummy-API
- **Spenden** — „Coming Soon" mit Fortschrittsbalken und Zahlungsanbieter-
  Platzhaltern
- Dark Theme, Glassmorphism, Mouse-Glow, Scroll-Reveal, Smooth Scrolling,
  responsive & barrierearm

## 🛠 Tech-Stack

| Bereich       | Technologie                     |
| ------------- | ------------------------------- |
| Framework     | Next.js 15 (App Router)         |
| Sprache       | TypeScript (strict)             |
| Styling       | TailwindCSS + shadcn/ui         |
| Animationen   | Framer Motion                   |
| Icons         | Lucide React                    |
| Markdown      | gray-matter + marked            |
| Code-Qualität | ESLint + Prettier               |

## 🚀 Lokal starten (macOS)

Voraussetzung: **Node.js 18.18+** (empfohlen: Node 20 oder 22).

```bash
# 1. Abhängigkeiten installieren
npm install

# 2. (optional) Umgebungsvariablen anlegen
cp .env.example .env.local

# 3. Dev-Server starten
npm run dev
```

Die Seite läuft anschließend unter **http://localhost:3000**.

## 📜 Skripte

| Befehl              | Beschreibung                          |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Startet den Entwicklungsserver        |
| `npm run build`     | Erstellt den Produktions-Build        |
| `npm run start`     | Startet den Produktions-Server        |
| `npm run lint`      | Führt ESLint aus                      |
| `npm run typecheck` | Prüft die Typen (tsc --noEmit)        |
| `npm run format`    | Formatiert den Code mit Prettier      |

## 📁 Projektstruktur

```
cloudzsociety/
├── app/            # App Router: Seiten, Layout, API-Routes
├── components/     # UI-, Layout- und Feature-Komponenten
│   ├── ui/         # shadcn/ui Primitives
│   ├── common/     # Wiederverwendbare Bausteine
│   ├── layout/     # Navbar & Footer
│   └── …           # home, shop, team, blog, changelog, apply, donate
├── content/        # Mock-Daten & Markdown-Blog
├── hooks/          # React Hooks
├── lib/            # Utilities, Konstanten, Animationen
├── services/       # Vorbereitete Integrations-Schnittstellen (Stubs)
├── types/          # Zentrale TypeScript-Typen
├── public/         # Statische Assets (images, icons, logo)
└── styles/         # Globale Styles
```

## 🛠 Admin-Dashboard (`/admin`)

Ein integriertes Panel, um **alle Inhalte ohne Code** zu bearbeiten. Änderungen
werden als JSON in `data/` (bzw. Markdown in `content/blog/`) gespeichert und
erscheinen sofort auf der Seite.

**Öffnen:** starte die Seite (`npm run dev`) und gehe auf
**http://localhost:3000/admin**

**Login:** Passwort aus der Umgebungsvariable `ADMIN_PASSWORD`
(Standard lokal: `cloudz-admin`). Zum Ändern in `.env.local` setzen:

```bash
ADMIN_PASSWORD=dein-sicheres-passwort
```

**Bearbeitbar:**

| Bereich                | Was du änderst                                          |
| ---------------------- | ------------------------------------------------------- |
| Inhalte & Texte        | Alle Texte, Button-Beschriftungen, Navigation (ein-/ausblenden, umbenennen), Footer, Startseiten-Blöcke (Über/Features/Statistik/CTA inkl. Icons) und Seiten-Überschriften |
| Einstellungen & Design | Markenname, Slogan, Server-IP, Discord/Wiki/GitHub, Serverstatistik **und die Farben/Theme** (Hauptfarbe, Hintergrund, Karten …) |
| Shop-Produkte          | Anlegen, bearbeiten, löschen (Preis, Bestand, Vorteile …) |
| Team                   | Mitglieder, Rollen, Verfügbarkeit                        |
| Blog                   | Artikel schreiben/bearbeiten/löschen (Markdown)          |
| Changelog              | Versionen, Features, Verbesserungen, Bugfixes            |
| Bewerber-Rollen        | Offene/geschlossene Rollen                               |

> Die Hauptfarbe recoloriert automatisch die gesamte Akzent-Palette (Buttons,
> Links, Glow-Effekte) — eine Farbe ändern reicht.

> Sicherheit: Das Panel ist für den **lokalen Betrieb** gedacht (einfacher
> Passwortschutz). Für einen öffentlichen Livegang sollte ein echtes
> Login-/Rechtesystem ergänzt werden (siehe `services/auth.ts`).

## 🔌 Vorbereitete Integrationen

Der Ordner `services/` enthält saubere, noch nicht implementierte
Schnittstellen für spätere Erweiterungen:

- `minecraft.ts` — Server-Status-API
- `shop.ts` — Tebex oder eigenes Shop-System
- `discord.ts` — Discord-API
- `wiki.ts` — externer GitBook-Link
- `auth.ts` — Login-System (reserviert)
- `database.ts` — Datenbank (reserviert)
- `application.ts` — Bewerbungen (Dummy-API)

Konfiguration erfolgt über Umgebungsvariablen (siehe `.env.example`).

## 🎨 Logo

Die `Logo`-Komponente (`components/common/logo.tsx`) nutzt automatisch dein
echtes Logo, sobald die Datei unter `public/logo/cloudz-logo.png` liegt.
Fehlt sie, wird nahtlos ein integriertes SVG-Logo angezeigt (kein kaputtes
Bild). Details siehe `public/logo/README.md` — empfohlen ist ein PNG mit
transparentem Hintergrund.

## 📝 Hinweis

CLOUDZ™ ist ein unabhängiges Community-Projekt und steht in keiner Verbindung
zu Mojang Studios oder Microsoft. Impressum und Datenschutz enthalten
Platzhalter und müssen vor einem Livegang angepasst werden.
