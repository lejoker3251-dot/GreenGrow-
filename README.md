# GreenGrow Seeds

Erste responsive Homepage für GreenGrow Seeds auf Basis von Astro, mit Layout-Mustern für eine spätere Shop-Erweiterung.

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

`wrangler.jsonc` definiert das Verzeichnis `dist` als statische Assets. Erst nach erfolgreichem lokalem Build und expliziter Freigabe sollte eine Bereitstellung erfolgen. Die Cloudflare-Produktion wurde bei dieser Integration nicht verändert.

## Lizenz

Die Astro-Ecommerce-Vorlage von Creative Tim ist unter MIT lizenziert. Der Quellcode dieser Anpassung übernimmt die MIT-Lizenzbedingungen der Vorlage; den ursprünglichen Lizenzhinweis findest du in `LICENSE.MD`. Die in diesem Projekt ergänzten Illustrationen wurden eigens als SVG erstellt. Externe Produktdaten und Verkaufsangaben sind noch nicht vorhanden.

Vor einem öffentlichen Verkaufsstart müssen echte Produktdaten, Impressum, Datenschutzhinweise, Kontaktangaben, Versand- und Zahlungsinformationen sowie rechtliche Shop-Anforderungen ergänzt und geprüft werden.
