# SEED³X / GreenGrow – Produktkatalog-Audit

Stand: 25.10.2026  
Geprüfter Stand: `feature/premium-storefront-v1`  
Datenquelle: `src/data/seed-products.json`, `src/data/pack-price-drafts.json`, `src/data/shop-pricing-config.json`  
Umfang: vollständige maschinelle Auswertung aller 1.269 Katalogeinträge; keine Produktdaten geändert.

## Kurzfazit

**Struktur: bestanden. Redaktionelle und kommerzielle Freigabe: noch nicht bestanden / offen.**

Der Katalog ist technisch vollständig und konsistent aufgebaut. Daraus folgt aber noch keine Bestätigung, dass Sortenbeschreibungen, Preise oder Anbieterangaben wahr, aktuell oder für SEED³X freigegeben sind. Alle Produkte bleiben Entwürfe; Checkout und Zahlungen sind weiterhin deaktiviert.

## 1. Vollständigkeit und IDs

| Prüfung | Ergebnis |
|---|---:|
| Produkteinträge | 1.269 |
| Eindeutige IDs | 1.269 / bestanden |
| IDs lückenlos von `seed-0001` bis `seed-1269` | bestanden |
| Kategorien | 3 |
| Autoflowering | 423 |
| Feminisierte Samen | 423 |
| Reguläre Samen | 423 |
| Fehlende Produktnamen | 0 |
| Fehlende Kategorien | 0 |
| Datensätze mit vier Packungsvarianten | 1.269 / bestanden |
| GTIN/EAN/Barcode-Felder im Produktdatensatz | 0 |
| Automatisch erzeugte GTINs/EANs | keine |
| Lager-/Bestandsfelder im Produktdatensatz | 0 |

Die stabilen IDs und Kategorien sind konsistent. GTIN/EAN und tatsächliche Lagerbestände sind nicht hinterlegt; das ist kein Fehler, solange sie nicht erfunden werden. Eine Lieferanten-SKU ist ebenfalls nicht als eigenes Feld dokumentiert.

## 2. Packungsgrößen und Preise

Alle 1.269 Produkte besitzen genau die Packungsgrößen 1, 3, 5 und 10. Damit wurden 5.076 Varianten-/Preiswerte geprüft.

| Regel | Ergebnis |
|---|---:|
| Fehlende oder null Preisfelder | 0 |
| Nicht numerische oder nicht positive Variantenpreise | 0 |
| Preise nicht auf Cent genau darstellbar | 0 |
| Packungspreise steigen nicht strikt mit der Packungsgröße | 0 |
| Stückpreis steigt bei größerer Packung (Toleranz 0,005 €) | 0 |
| Varianten mit Währung EUR und Typ `retail-price` | 5.076 |

Es existieren nur **vier unterschiedliche Preisstaffel-Muster** im gesamten Katalog:

| Preisstaffel (1 / 3 / 5 / 10 Samen) | Anzahl Produkte |
|---|---:|
| 8,49 € / 19,90 € / 29,90 € / 49,90 € | 841 |
| 6,49 € / 16,90 € / 25,90 € / 44,90 € | 423 |
| 10,90 € / 29,90 € / 44,90 € / 79,90 € | 4 |
| 5,90 € / 16,90 € / 26,90 € / 49,90 € | 1 |

Das ist mathematisch konsistent, aber ein deutlicher Hinweis, dass die Preise überwiegend über wenige pauschale Preisgruppen gesetzt wurden. Die Strukturprüfung kann **nicht** belegen, dass die Preise vom Lieferanten stammen, marktgerecht sind, zum jeweiligen Packungsangebot passen oder eine tragfähige Marge ergeben. Vor Freigabe ist eine nachvollziehbare Preisprüfung je Produkt/Anbieter erforderlich.

### Vorhandene Preisentwürfe mit Zusatzmetadaten

Fünf Produkte enthalten zusätzlich ein `priceDraft`-Objekt:

- `seed-0033` – Afghanica
- `seed-0062` – Amnesia
- `seed-0065` – Amnesia Haze
- `seed-0119` – Black Domina
- `seed-0143` – Blue Dream

Diese Zusatzobjekte sind nicht einheitlich ausgefüllt. Für `seed-0119` und `seed-0143` steht ausdrücklich, dass in dieser Runde kein konkreter Vergleichsbeleg vorliegt. Bei `seed-0065` ist im gespeicherten Entwurf eine Vergleichsseite als widersprüchlich gekennzeichnet; dieser Vergleich sollte nicht ungeprüft als Referenzwert verwendet werden. Einkaufskosten und Zielmargen sind bei diesen Entwürfen nicht hinterlegt. Die Entwürfe sind keine Freigabe.

## 3. Namen, Gruppen und Schreibweisen

- 1.269 Einträge ergeben 423 normalisierte Namensgruppen.
- Jede Gruppe enthält derzeit genau einen Datensatz aus jeder der drei Kategorien.
- Vier Gruppen wurden als Schreibvarianten-Kandidaten erkannt; zwölf Einträge sind betroffen.
- Keine Namen wurden automatisch geändert und keine Einträge zusammengeführt.

| Gruppe | Betroffene IDs | Festgestellte Variante |
|---|---|---|
| 24 K Kosher Kush | `seed-0001` bis `seed-0003` | `Kush` / `kush` |
| Kush Berry | `seed-0598` bis `seed-0600` | `Berry` / `berry` |
| Power Plant | `seed-0886` bis `seed-0888` | `Power plant` / `Power Plant` |
| Top 44 | `seed-1198` bis `seed-1200` | `Top 44` / `Top-44` |

Die Einträge wurden nicht als Duplikate entfernt, weil die drei Quelltypen unterschiedliche Produkteigenschaften bezeichnen können. Die Schreibweise darf erst nach Abgleich mit der Originalquelle oder einem verlässlichen Lieferanten vereinheitlicht werden.

## 4. Beschreibungen, Belege und Bilder

| Prüfung | Ergebnis |
|---|---|
| Einträge mit Beschreibung | 1.269 |
| Einträge mit `descriptionSource` | 1.269 |
| Hinterlegte Beschreibungsquelle | für alle: `docs/produktbeschreibungen/produktkatalog_full.html` |
| Unterschiedliche exakte Beschreibungstexte | 1.269 |
| Unterschiedliche Produktbilder | 1 |
| Produktdatensätze mit Bild-URL | 1.269 |

### Kritischer redaktioneller Befund

Alle 1.269 Einträge verwenden dasselbe Bild (`images/White 1.png.JPG`). Es ist daher ein gemeinsames Platzhalterbild, kein Nachweis eines individuellen Produktfotos.

Die Beschreibungen sind zwar pro Datensatz unterschiedlich, folgen aber wiederkehrenden Textmustern. Sie enthalten Aussagen zu Aroma/Terpenen, Wirkung/Entspannung und Wachstums- bzw. Blüteeigenschaften. Solche Aussagen sind durch die bloße Existenz des internen HTML-Katalogs nicht unabhängig belegt. Die HTML-Datei enthält ähnliche Beschreibungen und ist damit ein interner Textbeleg, aber kein unabhängiger Lieferanten- oder Züchternachweis. Vor Veröffentlichung müssen diese Aussagen gegen belastbare Hersteller-/Züchterquellen geprüft oder entfernt bzw. neutralisiert werden.

Der erwartete Original-PDF-Pfad `data/katalog/Seed List Full .pdf` war auf dem geprüften Branch unter genau diesem Pfad nicht abrufbar. Deshalb konnte dieser Lauf die Produktnamen und Beschreibungen **nicht direkt gegen die Original-PDF** abgleichen. Die Schreibvariantenprüfung bleibt ein Kandidaten-Audit, keine Bestätigung der Produktidentität.

## 5. Freigabestatus und Verkaufsschutz

- Alle 1.269 Produkte: `status = Entwurf` und `releaseStatus = Entwurf`.
- Alle 5.076 Varianten: `releaseStatus = Prüfung`.
- Shop-Konfiguration: `defaultAvailability = not-confirmed`.
- `checkoutEnabled = false`; `paymentsEnabled = false`.
- Keine Bestellung, Zahlung oder Bestandsbuchung wurde aktiviert.
- Kein Produkt wurde durch dieses Audit freigegeben.

Diese Sperren müssen bestehen bleiben, bis die Produktdaten einzeln fachlich geprüft und ausdrücklich freigegeben sind. Die Freigaberegel `status` **und** `releaseStatus` müssen beide `Freigegeben` sein; der vorliegende Katalog erfüllt diese Bedingung nicht.

## 6. Ergebnis und priorisierte nächste Schritte

1. **Originalquelle wieder verfügbar machen:** Original-PDF bzw. Lieferantenliste auf dem Branch auffindbar ablegen und die 1.269 Namen/Typen direkt dagegen prüfen.
2. **Produktbeschreibungen verifizieren:** Aussagen zu Aroma, Wirkung, Genetik und Wachstum pro Produkt mit Hersteller-/Züchterquellen belegen; nicht belegte Aussagen nicht veröffentlichen.
3. **Vier Schreibvarianten prüfen:** `seed-0001–0003`, `seed-0598–0600`, `seed-0886–0888`, `seed-1198–1200`; keine automatische Zusammenführung.
4. **Preise je Produkt verifizieren:** Die vier pauschalen Staffel-Muster gegen tatsächliche Lieferantenangebote, Packungsgrößen und Einkaufskosten prüfen. Die fünf `priceDraft`-Sonderfälle gesondert nacharbeiten.
5. **Bilder und Verfügbarkeit:** Individuelle Produktbilder nur mit korrekter Zuordnung ergänzen; Bestand erst nach tatsächlicher Bestandsaufnahme als bestätigt führen.
6. **Freigabe- und Rechtsprüfung:** Erst nach Produktprüfung die redaktionelle, rechtliche und kommerzielle Freigabe vornehmen.

## Grenzen dieses Audits

Dieses Audit prüft den aktuellen Branch-Datenbestand, Datenstruktur, IDs, Kategorien, Varianten, Preis-Arithmetik, Metadaten und offensichtliche Dokumentationslücken. Es verifiziert weder Lieferantenpreise noch Produktwahrheit, Bestand, rechtliche Zulässigkeit oder Verkaufsfreigabe. Es wurden keine Produktdaten, IDs, Preise, Statuswerte, GitHub-Branches, Produktionsdienste oder Cloudflare-Einstellungen verändert.
