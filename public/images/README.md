# images/

Statische Bilder der Website.

## Hero-Hintergrundbild (Startseite oben)

Lege dein Hintergrundbild genau hier ab:

```
public/images/hero-bg.jpg
```

Es wird automatisch im oberen Bereich der Startseite als Hintergrund
verwendet — abgedunkelt, damit Logo, Boxen und Buttons hervorstechen — und
bewegt sich beim Mauszeiger leicht mit (Parallax-/3D-Effekt).

Fehlt die Datei, bleibt einfach der dunkle Standard-Hintergrund (kein
kaputtes Bild).

**Empfehlung:** Querformat, mindestens 1600 px breit, `.jpg`. Möchtest du ein
`.png` oder einen anderen Namen verwenden, passe den Pfad in
`components/home/hero-background.tsx` (Konstante im `backgroundImage`) an.
