# Phase 1 – Navigation und Seitenstruktur

Stand: 2026-10-24  
Arbeitsbranch: `feature/premium-storefront-v1`

## Umgesetzte Navigation

- **Startseite** → `/`
- **Shop** (aufklappbares Untermenü)
  - **Gesamtes Sortiment** → `/shop/`
  - **Merkliste** → `/shopping-cart/`
- **Wissen & Ratgeber** → `/wissen/`
- **Unsere Idee** → `/#wachstumsreise`
- **Über uns** → `/#ueber-greengrow`
- **Kontakt** → derzeit `mailto:hallo@greengrow.example` (Platzhalter, kein bestätigter Kontakt)

Produktkarten führen weiterhin auf vorhandene Produktdetailrouten `/product/<id>/`. Die Fußzeile behält die bestehenden Links zu Shop, Wissen, Unternehmensabschnitten, Merkliste, Impressum und Datenschutz.

## Routen- und Klarheitsbefunde

- Der bisherige Navigationspunkt **„Sortiment“** wurde zu **„Shop“** vereinheitlicht.
- **„Wissenswertes“** wurde zu **„Wissen & Ratgeber“** präzisiert.
- „Unsere Idee“ und „Über uns“ verweisen ausdrücklich auf die Startseite, damit die Sprungziele auch von Unterseiten aus erreichbar sind.
- Es gibt derzeit keine separaten, bestätigten URLs für einzelne Saatentypen oder Serien. Die Kategorien sind Filter auf der Shop-Seite. Deshalb wurden keine Kategorie-URLs erfunden; die klaren Kategorie-Einstiege gehören in Phase 2.
- Das Shop-Untermenü ist per Schaltfläche bedienbar, verwendet `aria-expanded` und `aria-controls`, lässt sich per Escape schließen und erhält eine mobile Darstellung.
- Das vorhandene Farbschema und die Grundgestaltung wurden nicht neu gestaltet.

## Bewusst nicht geändert

- Keine Produktdaten, Filterlogik, Preise oder Bestellfunktionen.
- Keine neuen Routen oder Produktkategorien.
- Keine Änderungen an `main`, Cloudflare-Konfiguration, Worker oder Produktionsbereitstellung.
- Der Kontakt-Platzhalter und rechtliche Entwürfe bleiben als offene Punkte bestehen.

## Noch erforderliche Prüfung

Build, automatische Routen-/Asset-Prüfungen und tatsächliche iPad-Browserkontrolle müssen nach den Änderungen bestätigt werden. Eine erfolgreiche GitHub-Dateiänderung allein ist kein Nachweis für einen erfolgreichen Build oder ein fertiges Preview-Deployment.
