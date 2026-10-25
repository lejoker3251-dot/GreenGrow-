# SEED³X / GreenGrow Seeds – Entwicklungsroadmap

Stand: 25.10.2026 – nach vollständigem PDF-Namens-/Typabgleich und Katalog-/Preis-Audit  
Arbeitsbranch: `feature/premium-storefront-v1`  
Sicherheitsgrenze: Änderungen und Vorschauen ausschließlich auf dem Entwicklungsbranch. `main`, produktive Cloudflare Pages und der bestehende Worker `greengrow` bleiben unverändert, bis eine ausdrückliche Freigabe vorliegt.

## Zielbild

Premium-Storefront im Stil „Botanical Luxury“, responsiv und auf iPad Safari prüfbar. Zunächst nur eine Vorschau; keine echten Bestellungen oder Zahlungsabwicklung. Navigationsrubriken: Sortiment, Neuheiten, Bestseller, Produktsuche/Filter, Ratgeber und Über GreenGrow.

## Abgleich mit dem aktuellen Stand

| Bereich | Status | Evidenz / offene Arbeit |
|---|---|---|
| Premium-Startseite und botanische Hero-Szene | Technische CI-/Build-/Browserprüfung grün | Branch-Build und Astro-Verifikation für Commit `7b8613206b1430e687b8b58651dd3d1a002dea6e` erfolgreich; iPad-Safari-Abnahme und visuelle Detailprüfung stehen noch aus. |
| Produktimport | Umgesetzt als Entwurf | 1.269 Einträge aus der bereitgestellten PDF-Liste, je 423 pro Typ. Schreibvarianten wurden nicht automatisch zusammengeführt. |
| Gemeinsames Mamba-Platzhalterbild | Umgesetzt | Für alle Karten gleich; kein Beleg für ein echtes Produktfoto. |
| Produktsuche und Kategorienfilter | Umgesetzt | Browserseitige Suche nach Namen/Kategorie und Kategorie-Buttons. |
| Sortierung | Implementiert, manuell bestanden | Nutzer hat die Sortiersteuerung im Preview mit A–Z, Z–A und Kategorie als bestanden bestätigt. |
| Merkliste | Manuell bestanden | Nutzer hat Speichern/Verhalten der Merkliste im Preview als bestanden bestätigt; sie bleibt browserlokal und ist kein serverseitiger Warenkorb. |
| Produktdetailseiten | Manuell bestanden (gültige Produktseite) | Nutzer hat eine Produktdetailseite im Preview als bestanden bestätigt. Unbekannte IDs/404 und Tastaturbedienung sind noch nicht separat getestet. |
| Neuheiten und Bestseller | Offen | Benötigen belegte Sortiments-/Verkaufsdaten; nichts als Bestseller markieren, solange keine Daten vorliegen. |
| Produktdaten und Preise | Teilweise geprüft; Freigabe offen | Für alle 1.269 Einträge sind Preisstufen für 1/3/5/10 Samen hinterlegt. Struktur-/Preis-Audit: 0 fehlende/null/negative Preise, 0 nicht streng steigende Packungspreise, 0 Stückpreis-Anomalien. Markt-/Lieferantenbestätigung, Sortenmerkmale und tatsächlicher Lagerbestand bleiben ungeprüft; alle Produkte bleiben Entwürfe. Bericht: `docs/reports/catalog-price-audit-2026-10-25.md`. |
| Namensvarianten- und Original-PDF-Abgleich | Namen/Typen abgeglichen; finale Datenfreigabe offen | Alle 1.269 Katalogeinträge wurden in Reihenfolge mit `Seed List Full .pdf` aus der ChatGPT-Bibliothek verglichen: 1.269/1.269 Übereinstimmungen nach Normalisierung, 0 Abweichungen. Die vier Schreibvarianten-Gruppen sind bereits in der PDF vorhanden. Keine Namen geändert oder Datensätze zusammengeführt. PDF belegt keine Beschreibungen, Preise, Bilder oder Bestände. Bericht: `docs/reports/catalog-content-audit-2026-10-25.md`. |
| Ratgeber-Navigation | Teilweise umgesetzt | Wissensübersicht vorhanden; tatsächliche Vollständigkeit und fachliche/rechtliche Prüfung der Artikel bleibt offen. |
| Impressum, Datenschutz, Kontakt und Shop-Recht | Offen | Platzhalter und Angaben vor einer öffentlichen Verkaufsfreigabe überprüfen. |
| Backend, Bestellungen und Zahlung | Nicht umgesetzt | Absichtlich nicht Teil der Vorschau. Erfordert Architektur- und Sicherheitsentscheidungen. |
| iPad Safari / Bedienbarkeit / visuelle Abnahme | Teilweise bestätigt | Suche, Kategorienfilter, Sortierung, Merkliste und gültige Produktdetailseite wurden früher im Preview manuell bestätigt. Der aktuelle CI-Lauf prüft Build, Hero-Fallback und responsives Layout erfolgreich; echte iPad-Safari-Prüfung, Tastatur-/Screenreader-Bedienung, Kontrast, Performance und Bildsemantik bleiben offen. |
| Produktionsfreigabe | Gesperrt | Nicht deployen oder mergen ohne ausdrückliche Freigabe. |

## Redesign Schritt 1 – Botanical Luxury Designsystem (24.10.2026)

**Status:** Designsystem und globale Stilregeln auf `feature/premium-storefront-v1` integriert; Build-/Browser-QA noch ausstehend.

- [x] Zentrale Design-Tokens für Porzellanweiß, tiefes Botanischgrün, Champagnergold und Lavendel definiert.
- [x] Neue globale Stylesheet-Schicht erstellt und im gemeinsamen Layout geladen, damit Homepage, Shop, Produktdetailseiten, Wissensbereich, Merkliste und rechtliche Seiten eine gemeinsame visuelle Basis erhalten.
- [x] Navigation, Shop-Untermenü, Buttons, Filter, Produktkarten, Content-Karten, Hinweiszustände, Footer und Altersbestätigung visuell vereinheitlicht.
- [x] Bestehende botanische Hero-Szene und Scroll-Animation weiterverwendet; keine neue Animationsbibliothek und keine kostenpflichtigen Dienste hinzugefügt.
- [x] Reduced-motion-Regeln und responsive Regeln beibehalten bzw. ergänzt.
- [x] Keine Änderungen an `main`, produktiven Cloudflare-Seiten, Worker oder zusätzlichen Projekten vorgenommen.
- [x] Statische Quellenprüfung: Stylesheet-Import vorhanden, vier Markenfarben in Tokens vorhanden, CSS-Klammern ausgeglichen.
- [x] Bei der Quelltextprüfung wurde der Konflikt zwischen `.main-nav { display: flex; }` und dem nativen `hidden`-Attribut erkannt und mit `.site-header .main-nav[hidden] { display: none !important; }` behoben.
- [x] `astro check`, statischen Build und Browser-/Responsive-Regressionstests im GitHub-Actions-Lauf erfolgreich bestätigt (Commit `7b8613206b1430e687b8b58651dd3d1a002dea6e`).
- [ ] Visuelle Abnahme auf iPad Safari; tatsächliche Scroll-/3D-Performance, Navigation und Kontrast prüfen.
- [x] Isoliertes Preview-Deployment für Commit `7b8613206b1430e687b8b58651dd3d1a002dea6e` erfolgreich bestätigt. Keine Produktionsfreigabe.

## Projektphase 3 – Startseite und Informationsbereiche (24.10.2026)

**Status:** Umsetzung begonnen auf `feature/premium-storefront-v1`.

- [x] Startseite um drei datenbasierte Saatentyp-Einstiege ergänzen (Autoflowering, Feminisierte Samen, Reguläre Samen).
- [x] Kategorieanzahlen aus `src/data/seed-products.json` berechnen; klar als Katalogeinträge und nicht als Bestand kennzeichnen.
- [x] Kategorien-Links mit dem Shop verbinden; der Shop übernimmt den gewählten Typ aus dem URL-Parameter `typ`.
- [x] Den Startseiten-Katalogzähler aus der Datenquelle statt aus einer fest codierten Zahl ableiten.
- [x] Bestehende Ratgeber-, Marken- und Über-uns-Inhalte weiterverwenden; keine unbelegten Serien, Bestseller oder neuen Produktangaben erfinden.
- [x] Build-, Routen-/Asset- und Browser-/Responsive-Checks in GitHub Actions erfolgreich.
- [x] Isoliertes Preview-Deployment für den Stand vom Commit `7b8613206b1430e687b8b58651dd3d1a002dea6e` bestätigt.
- [ ] iPad-Safari-Abnahme vor einer visuellen oder redaktionellen Freigabe nachholen.

## Startseite und Shop-Trennung (23.10.2026)
- [x] Vollständigen Produktkatalog von der Startseite auf die eigenständige Route `/shop/` verschieben.
- [x] Shop-Link in die Hauptnavigation und den Footer aufnehmen; Startseite zeigt stattdessen einen kuratierten Sortiments-Teaser.
- [x] Katalogsuche, Kategorienfilter, Sortierung, Merkliste und Produktlinks auf der Shop-Seite belassen.
- [x] Aktiven Menüpunkt semantisch mit `aria-current` kennzeichnen und Tastatur-Sprunglink zum Hauptinhalt ergänzen.
- [x] CI-Build um Prüfung der generierten Shop-Route erweitern.
- [x] Preview-Deployment für Commit `7b8613206b1430e687b8b58651dd3d1a002dea6e` erfolgreich; manuelle Funktionschecks wurden zuvor für Suche, Filter, Sortierung, Merkliste und gültige Produktdetailseite bestätigt.
- [ ] Echte Einzelproduktbilder, lieferantengeprüfte Produktdetails und fachlich bestätigte Preise erst nach Quellenprüfung/Freigabe ergänzen. Die derzeitigen Preisstaffeln sind strukturell konsistent, aber noch nicht kommerziell freigegeben.

## Nächste Entwicklungsstufen

### Stufe 1 – Stabilität und Katalogbedienung
- [x] 1.269 Einträge strukturiert importieren und Entwurfsstatus beibehalten.
- [x] Suche, Kategoriefilter und lokale Merkliste bereitstellen.
- [x] Merkliste bei erneutem Laden synchronisieren und Speicherfehler behandeln.
- [x] Sortiersteuerung für Originalreihenfolge, Name A–Z, Name Z–A und Kategorie implementieren.
- [x] Sortierung im Preview praktisch prüfen (Nutzer bestätigt: bestanden).
- [ ] Platzhalterbild ist sichtbar; Tastatur-/Screenreader-Verhalten und Bildsemantik auf iPad Safari noch prüfen.
- [x] Sichtbare Tastatur-Fokusrahmen für Links, Buttons, Eingaben und Auswahlfelder ergänzt (automatische Prüfung / reale iPad-Abnahme noch offen).

### Stufe 2 – Echte Produktdetailseiten ohne Verkauf
- [x] Dynamische, anhand stabiler Produkt-ID adressierbare Detailseiten implementieren.
- [x] Name, Quelltyp, Entwurfsstatus und Platzhalterbild anzeigen.
- [x] Keine erfundenen Produktangaben, Preise, Bestände oder Kaufbuttons.
- [x] Gültige Produktdetailseite praktisch geprüft (Nutzer bestätigt: bestanden).
- [ ] Unbekannte IDs/404 und Rücknavigation separat prüfen.

### Stufe 3 – Datenqualität und redaktionelle Freigabe
- [ ] Produktbeschreibungen und Sortenmerkmale aus unabhängigen Hersteller-/Züchterquellen prüfen, Quellen und Prüfstatus erfassen; der PDF-Abgleich bestätigt nur Namen/Saatentypen, der Preis-Audit nur Struktur/Konsistenz.
- [x] Namensvarianten-Audit für alle 1.269 Einträge erstellt; 4 Kandidatengruppen dokumentiert, ohne automatische Zusammenführung.
- [x] Alle 1.269 Namen und Saatentypen gegen `Seed List Full .pdf` abgeglichen: 1.269 Übereinstimmungen, 0 Abweichungen nach Normalisierung; vier Schreibvarianten sind in der Original-PDF ebenfalls vorhanden.
- [ ] Ob die Original-PDF die aktuelle Lieferantenbezeichnung wiedergibt, unabhängig bestätigen; keine automatische Namensvereinheitlichung.
- [ ] Schreibvarianten vergleichen, aber nicht ohne menschliche Freigabe zusammenführen.
- [x] Automatische Prüfung auf 1.269 Einträge, lückenlose IDs, Kategorien, Preisfelder und Preisstaffeln ergänzt; GitHub-Actions-Lauf `40210045210` erfolgreich. 0 Preisauffälligkeiten; Bericht in `docs/reports/catalog-price-audit-2026-10-25.md`.
- [ ] Neuheiten/Bestseller erst anzeigen, wenn entsprechende Fakten vorhanden sind.

### Stufe 4 – Recht, Betrieb und Barrierefreiheit
- Rechtliche Angaben, Kontakt, Datenschutz, Versand- und Rückgabeinformationen prüfen.
- Mobile/iPad- und Desktop-Abnahme, Tastaturbedienung, Kontraste, reduzierte Bewegung.
- Performance bei 1.269 Karten und Bildladeverhalten messen.

### Stufe 5 – Shop-Backend (separates Projekt-Gate)
- Datenbank, Inventar, Authentisierung, Bestellung, Zahlungsanbieter, E-Mail und Datenschutz entwerfen.
- Sicherheits- und Integrationstests in einer getrennten Testumgebung.
- Erst nach expliziter Freigabe echte Bestellfunktionen aktivieren.

## Definition of Done für jede Stufe

1. Änderungen nur auf `feature/premium-storefront-v1`.
2. `astro check`, `npm run build` und Route-/Asset-Prüfungen erfolgreich.
3. Preview-Deployment für genau den geprüften Commit erfolgreich.
4. Verhalten und bekannte Grenzen dokumentiert; keine nicht belegten Produktangaben.
5. Keine Produktionsänderung ohne ausdrückliche Freigabe.
