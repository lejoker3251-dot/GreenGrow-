# Phase 3 – Startseite und Informationsbereiche

Stand: 2026-10-24  
Arbeitsbranch: `feature/premium-storefront-v1`

## Ziel

Die Startseite soll Besucher direkt in die tatsächlich vorhandenen Shop-Kategorien und die bestehende Wissenswelt führen. Die vorhandene botanisch-editoriale Gestaltung, Markenbereiche und redaktionellen Texte werden beibehalten; keine unbelegten Produktdaten, Serien, Neuheiten oder Bestseller werden erfunden.

## Umgesetzt

- Drei Kategorie-Karten auf der Startseite: **Autoflowering**, **Feminisierte Samen** und **Reguläre Samen**.
- Kategorieanzahlen und Gesamtzahl werden aus `src/data/seed-products.json` berechnet.
- Die Zählung wird ausdrücklich als Katalogeinträge bezeichnet, nicht als Bestand oder Verkaufsfreigabe.
- Jede Karte führt zu `/shop/?typ=<Kategorie>#sortiment`.
- Die Shop-Seite liest den `typ`-Parameter, setzt den passenden Filter und aktualisiert die `aria-pressed`-Zustände.
- Die Shop-Filter bleiben auch ohne gültigen URL-Parameter bei „Alle“.
- Der bestehende Ratgeber-, Marken- und Über-uns-Bereich wird weiterverwendet; keine neuen Routen wurden erfunden.
- Der Startseiten-CTA wurde von „Kollektion entdecken“ auf „Shop entdecken“ vereinheitlicht.

## Verifikation und Grenzen

- Die geänderten Dateien wurden nach dem Commit erneut aus GitHub gelesen.
- Die Datenbindung, Kategoriebezeichnungen, URL-Parameter und Filterinitialisierung wurden anhand des Quellcodes geprüft.
- Ein vollständiger Astro-Check/Build, automatische Routen-/Asset-Checks, echter Browserlauf und iPad-Safari-Abnahme sind für den integrierten Stand noch nicht bestätigt.
- Preview-Deployment und Auslieferung des aktuellen Commits sind nicht bestätigt.
- `main`, produktive Cloudflare Pages und der Worker wurden nicht geändert.

## Abnahmekriterien

1. Die drei Karten zeigen die aktuellen Zahlen aus dem Katalog.
2. Jede Karte öffnet den Shop mit dem richtigen Filter vorausgewählt.
3. Suche, Sortierung und Merkliste funktionieren weiterhin.
4. Die Karten bleiben auf schmalen Bildschirmen einspaltig und ohne horizontales Scrollen bedienbar.
5. Build, Route-/Asset-Prüfungen und echte Vorschauprüfung bestehen, bevor Phase 3 als vollständig abgenommen gilt.
