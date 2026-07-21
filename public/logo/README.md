# Logo

Hier liegt das Marken-Logo von CLOUDZ™.

## Dein echtes Logo einbinden

Speichere deine Logo-Datei genau unter diesem Namen in diesem Ordner:

```
public/logo/cloudz-logo.png
```

Die `Logo`-Komponente (`components/common/logo.tsx`) verwendet diese Datei
**automatisch**, sobald sie existiert. Solange sie fehlt, wird nahtlos das
mitgelieferte SVG-Logo angezeigt — es entsteht also nie ein kaputtes Bild.

### Empfehlungen

- **Format:** PNG mit **transparentem Hintergrund** (auf dem dunklen Theme
  wirkt ein weißer Hintergrund sonst als weißer Kasten).
- **Größe:** quadratisch, mindestens 256 × 256 px (z. B. 512 × 512).
- **Dateiname exakt:** `cloudz-logo.png`.

Möchtest du einen anderen Dateinamen oder ein SVG verwenden, passe die
Konstante `LOGO_SRC` in `components/common/logo.tsx` an.

Ein Vektor-Platzhalter (`cloudz-logo.svg`) liegt hier ebenfalls als Referenz.
