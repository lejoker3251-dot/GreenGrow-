# GreenGrow Seeds

Erste responsive GreenGrow-Markenhomepage auf Astro-Basis. Das Layout ist für die Saatgut-Marke eigenständig angepasst und orientiert sich an typischen Shop-Mustern; die Creative-Tim-Komponenten wurden in dieser ersten Stufe **noch nicht direkt übernommen**.

## Status

- Astro 5, statischer Build
- Responsive Landingpage mit Produktkategorien und Filter
- Beispielprodukte und lokal gespeicherte Merkliste
- Produktseiten- und Cloudflare-Worker-Grundgerüst
- Noch kein echter Shop: keine Preise, Lagerbestände, Zahlungsabwicklung oder Bestellungen

## Lokal starten

```sh
npm install
npm run dev
```

## Build prüfen

```sh
npm run build
npm run preview
```

## Cloudflare-Vorbereitung

`wrangler.jsonc` definiert `dist` als Verzeichnis statischer Assets. Erst nach erfolgreichem lokalem Build und ausdrücklicher Freigabe sollte eine Bereitstellung erfolgen. Die Cloudflare-Produktion wurde nicht verändert.

## Lizenz

Die Vorlage [Creative Tim Astro Ecommerce](https://github.com/creativetimofficial/astro-ecommerce) ist im Original unter MIT lizenziert. Diese erste GreenGrow-Stufe verwendet keine direkt übernommenen Creative-Tim-Komponenten; die Gestaltung und SVG-Illustrationen wurden für GreenGrow neu erstellt. `LICENSE.MD` enthält den Original-Lizenztext als Referenz für eine mögliche spätere Übernahme von Vorlagen-Code. Externe Bilder werden nicht eingebunden.

Vor einem öffentlichen Verkaufsstart müssen echte Produktdaten, Impressum, Datenschutzhinweise, Kontaktangaben, Versand- und Zahlungsinformationen sowie rechtliche Shop-Anforderungen ergänzt und geprüft werden.
