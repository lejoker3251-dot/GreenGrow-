# Seed3X

GreenGrow Seeds ist ein Astro-basiertes Frontend für eine Saatgut-Marke. Die bestehende Hauptseite bleibt unter `/` erreichbar; die zusätzliche Komponenten-Vorschau liegt unter `/template-preview/`.

## Online-Vorschau

Cloudflare Pages ist mit diesem GitHub-Repository verbunden. Die Homepage wird unter https://greengrow-seeds.pages.dev veröffentlicht, sobald der erste Build erfolgreich abgeschlossen ist. Commits auf `main` lösen automatische Veröffentlichungen aus.

## Entwicklungsstand

- Astro 5 mit React-Integration
- Responsive GreenGrow-Hauptseite mit Beispielprodukten und lokal gespeicherter Merkliste
- Zusätzliche `/template-preview/`-Route mit angepassten Creative-Tim-Komponenten: Navbar, Promo-Abschnitt, Produktkarten und Footer
- Bootstrap 5 als Basis für das Komponentenlayout; zusätzliche GreenGrow-Stile unter `src/styles/template-preview.css`
- GitHub Actions Workflow prüft `astro check`, den statischen Build und die erwarteten Ausgabedateien
- Cloudflare Pages als separate Veröffentlichung; der vorhandene Worker `greengrow` bleibt unverändert

## Lokal starten

```sh
npm install
npm run dev
```

## Prüfungen

```sh
npm run check
npm run build
npm run preview
```

Der Build erzeugt die statische Website in `dist/`. Der Workflow `.github/workflows/verify-astro.yml` führt dieselben wesentlichen Prüfungen in GitHub Actions aus.

## Wichtige Grenzen

Die Produktnamen und Illustrationen sind Beispiele. Es gibt keine produktive Produktdatenbank, Preis-/Lagerverwaltung, Nutzerkonten, serverseitige Warenkorb-Persistenz, Bestellabwicklung oder Zahlungsintegration. Die Merkliste der Hauptseite ist lokal im Browser gespeichert. Es werden keine echten Bestellungen ausgelöst.

Die Creative-Tim-Komponenten wurden in einer separaten Vorschau-Route integriert. Das vollständige Creative-Tim-SCSS-Themesystem wurde noch nicht übernommen; die Vorschau verwendet Bootstrap und eine GreenGrow-spezifische CSS-Anpassung. Damit bleibt die bestehende Hauptseite optisch getrennt und unberührt.

## Lizenz

Die Komponentenbasis stammt aus [Creative Tim Astro Ecommerce](https://github.com/creativetimofficial/astro-ecommerce), veröffentlicht unter der MIT-Lizenz. Der MIT-Lizenzhinweis ist in `LICENSE.MD` enthalten. Die GreenGrow-spezifischen CSS-Anpassungen und SVG-Illustrationen wurden für dieses Projekt erstellt.

Vor einem öffentlichen Verkaufsstart müssen echte Produktdaten, Impressum, Datenschutzhinweise, Kontaktangaben, Versand- und Zahlungsinformationen sowie rechtliche Shop-Anforderungen ergänzt und geprüft werden.
