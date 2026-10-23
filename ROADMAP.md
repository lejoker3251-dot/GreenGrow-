# SEED³X / GreenGrow Seeds – Entwicklungsroadmap

Stand: 23.10.2026  
Arbeitsbranch: `feature/premium-storefront-v1`  
Sicherheitsgrenze: Änderungen und Vorschauen ausschließlich auf dem Entwicklungsbranch. `main`, produktive Cloudflare Pages und der bestehende Worker `greengrow` bleiben unverändert, bis eine ausdrückliche Freigabe vorliegt.

## Zielbild

Premium-Storefront im Stil „Botanical Luxury“, responsiv und auf iPad Safari prüfbar. Zunächst nur eine Vorschau; keine echten Bestellungen oder Zahlungsabwicklung. Navigationsrubriken: Sortiment, Neuheiten, Bestseller, Produktsuche/Filter, Ratgeber und Über GreenGrow.

## Abgleich mit dem aktuellen Stand

| Bereich | Status | Evidenz / offene Arbeit |
|---|---|---|
| Premium-Startseite und botanische Hero-Szene | Umgesetzt, technische Prüfung grün | Astro-Check und statischer Build laufen in GitHub Actions; tatsächliche iPad-Safari-Abnahme steht noch aus. |
| Produktimport | Umgesetzt als Entwurf | 1.269 Einträge aus der bereitgestellten PDF-Liste, je 423 pro Typ. Schreibvarianten wurden nicht automatisch zusammengeführt. |
| Gemeinsames Mamba-Platzhalterbild | Umgesetzt | Für alle Karten gleich; kein Beleg für ein echtes Produktfoto. |
| Produktsuche und Kategorienfilter | Umgesetzt | Browserseitige Suche nach Namen/Kategorie und Kategorie-Buttons. |
| Sortierung | Implementiert, Funktionsprüfung offen | Originalreihenfolge, Name A–Z, Name Z–A, Kategorie; Code ist vorhanden, Interaktion muss noch im Preview geprüft werden. |
| Merkliste | Umgesetzt, CI grün | Browserlokal gespeichert; kein serverseitiger Warenkorb. Entfernen und erneutes Laden sollten manuell auf iPad geprüft werden. |
| Produktdetailseiten | Implementiert, Abnahme offen | Dynamische Route `/product/[id]/` generiert Seiten je Produkt-ID und zeigt Name, Kategorie, Quelltyp, Entwurfsstatus und Platzhalterbild; gültige und unbekannte IDs noch praktisch prüfen. |
| Neuheiten und Bestseller | Offen | Benötigen belegte Sortiments-/Verkaufsdaten; nichts als Bestseller markieren, solange keine Daten vorliegen. |
| Vollständige Produktdaten | Offen | Preise, Bestand, Beschreibungen und Merkmale fehlen bzw. sind nicht verifiziert. Alle Einträge bleiben Entwürfe. |
| Ratgeber-Navigation | Teilweise umgesetzt | Wissensübersicht vorhanden; tatsächliche Vollständigkeit und fachliche/rechtliche Prüfung der Artikel bleibt offen. |
| Impressum, Datenschutz, Kontakt und Shop-Recht | Offen | Platzhalter und Angaben vor einer öffentlichen Verkaufsfreigabe überprüfen. |
| Backend, Bestellungen und Zahlung | Nicht umgesetzt | Absichtlich nicht Teil der Vorschau. Erfordert Architektur- und Sicherheitsentscheidungen. |
| iPad Safari / Bedienbarkeit / visuelle Abnahme | Teilweise bestätigt | Nutzer bestätigt, dass die gesamte Vorschauseite inklusive Produkt-Testbild sichtbar ist. Suche, Sortierung, Merkliste, Tastaturbedienung und einzelne Produktdetails müssen noch praktisch geprüft werden. |
| Produktionsfreigabe | Gesperrt | Nicht deployen oder mergen ohne ausdrückliche Freigabe. |

## Nächste Entwicklungsstufen

### Stufe 1 – Stabilität und Katalogbedienung
- [x] 1.269 Einträge strukturiert importieren und Entwurfsstatus beibehalten.
- [x] Suche, Kategoriefilter und lokale Merkliste bereitstellen.
- [x] Merkliste bei erneutem Laden synchronisieren und Speicherfehler behandeln.
- [x] Sortiersteuerung für Originalreihenfolge, Name A–Z, Name Z–A und Kategorie implementieren.
- [ ] Sortierung im Preview praktisch prüfen; technische CI-Prüfung läuft mit dem neuen Validator an.
- [ ] Produktbild- und Tastatur-/Screenreader-Verhalten auf iPad Safari prüfen.

### Stufe 2 – Echte Produktdetailseiten ohne Verkauf
- [x] Dynamische, anhand stabiler Produkt-ID adressierbare Detailseiten implementieren.
- [x] Name, Quelltyp, Entwurfsstatus und Platzhalterbild anzeigen.
- [x] Keine erfundenen Produktangaben, Preise, Bestände oder Kaufbuttons.
- [ ] Gültige IDs, unbekannte IDs und Rücknavigation praktisch prüfen.

### Stufe 3 – Datenqualität und redaktionelle Freigabe
- [ ] Produktdaten aus verlässlichen Quellen ergänzen, Quellen und Prüfstatus erfassen.
- [ ] Schreibvarianten vergleichen, aber nicht ohne menschliche Freigabe zusammenführen.
- [x] Automatische Prüfung auf 1.269 Einträge, Pflichtfelder, eindeutige IDs, erlaubte Kategorien und Entwurfsstatus ergänzt; erster CI-Lauf steht noch aus.
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
