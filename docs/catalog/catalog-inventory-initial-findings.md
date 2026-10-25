# SEED³X – Technische Bestandsaufnahme des Produktkatalogs

Stand: 2026-10-25  
Repository: `lejoker3251-dot/GreenGrow-`  
Arbeitsbranch: `feature/premium-storefront-v1`  
Status: erste Code-/Schema-Prüfung; vollständige 1.269-Datensatz-Auswertung steht noch aus.

## 1. Geprüfte Dateien

- `src/pages/shop.astro`
- `src/pages/product/[id].astro`
- `src/pages/warenkorb.astro`
- `src/data/shop-pricing-config.json`
- `src/data/seed-products.json` wurde als Katalogquelle identifiziert, aber die GitHub-Dateiabruf-Schnittstelle lieferte für die große JSON-Datei keinen Inhalt. Daher wurde keine vollständige zeilenweise/Datensatz-für-Datensatz-Auswertung behauptet.

## 2. Festgestellte Katalogstruktur

Aus den Shop- und Produktseiten ergibt sich, dass der bestehende Katalog mindestens folgende Felder verwendet:

| Feld | Verwendung / Befund |
|---|---|
| `id` | bestehende Produkt-ID; wird für Produkt-Routen und Katalog-ID verwendet |
| `name` | Produktname |
| `category` | Kategorien-/Typangabe, u. a. für Shopfilter |
| `details` | Quelltyp wird derzeit aus einem Textfeld abgeleitet; kann mit `Typ laut PDF:` beginnen |
| `priceEUR` | laut Konfigurationsnotiz Preis für die Einzelpackung mit 1 Samen |
| `packVariants` | Array mit Packungsvarianten |
| `packVariants[].quantity` | Packungsgröße; die Konfiguration sieht 1, 3, 5 und 10 vor |
| `packVariants[].priceEUR` | hinterlegter Preis für die jeweilige Packungsgröße |
| `description` | optionale Beschreibung; Shopseite setzt einen Ersatztext, wenn sie fehlt |
| `image` | optionales Bild; Produktseite/Shop verwenden ein Universalbild als Fallback |

Die Konfigurationsdatei `src/data/shop-pricing-config.json` setzt EUR, Packungsgrößen 1/3/5/10, Verfügbarkeit standardmäßig auf nicht bestätigt und Checkout/Zahlungen auf deaktiviert. Sie enthält die Aussage, dass 1.269 Katalogprodukte vier Preisstufen haben. Das ist eine Konfigurationsnotiz und wurde bei dieser Prüfung nicht unabhängig über alle Datensätze nachgezählt.

## 3. Vorläufige Befunde und Risiken

1. Die Produktseite verwendet `product.id` als Routen-ID. Bestehende IDs sollten beibehalten und nicht aus Namen oder GTINs neu berechnet werden.
2. Der Produkttyp scheint teilweise als Text in `category` und/oder `details` geführt zu werden. Diese Felder müssen datensatzweise verglichen werden, bevor wir eine normalisierte Typenumwandlung durchführen.
3. Packungsgrößen und Preise sind als `packVariants` vorgesehen. Es muss für alle Datensätze geprüft werden, ob jede erwartete Größe genau einmal vorkommt und ob Preiswerte numerisch, positiv und in sich konsistent sind.
4. Im geprüften Warenkorbcode wird die Packungsgröße auf 1/3/5/10 begrenzt und der Preis auf eine positive endliche Zahl geprüft. Das beweist jedoch nicht, dass der Preis zum Katalogpreis dieser Produkt-ID und Packungsgröße gehört. Browserdaten bleiben manipulierbar.
5. Die Warenkorbstruktur speichert derzeit `id`, `name`, `image`, `packSize`, `quantity` und `unitPrice` im Browser. Ein künftiger Server darf Name, Bild und Preis aus diesem Payload nicht als maßgebliche Katalogwerte übernehmen.
6. In den bislang geprüften Dateien ist keine explizite GTIN-/EAN-Feldverwendung erkennbar. Da die große Produktdatei nicht vollständig eingelesen werden konnte, ist das **kein Beweis**, dass keine GTIN-Werte irgendwo im Katalog vorhanden sind.

## 4. Noch offene Vollprüfung für alle 1.269 Einträge

Die vollständige automatisierte Bestandsaufnahme muss mindestens folgende Kontrollen durchführen:

- Gesamtzahl der Datensätze und eindeutige, nichtleere `id`-Werte
- doppelte IDs und doppelte/mehrdeutige Produktzuordnungen
- Pflichtfelder und Datentypen für `name`, `category`, `details`
- Abgleich von Kategorie und Quelltyp; unklare Fälle markieren, nicht automatisch erraten
- `packVariants` ist vorhanden und enthält exakt eine Variante je erlaubter Packungsgröße 1, 3, 5, 10
- Preiswerte sind numerisch, endlich, nicht negativ/ungültig; Rundung auf Cent und Schreibweisen prüfen
- Abweichung zwischen `priceEUR` und dem 1-Samen-Eintrag in `packVariants`
- fehlende, doppelte oder zusätzliche Varianten sowie Preis-Ausreißer zur manuellen Prüfung markieren
- GTIN-/EAN-Felder und sonstige mögliche Barcode-/SKU-Felder inventarisieren, ohne bestehende Werte umzudeuten
- alle vorhandenen GTINs als Zeichenfolge behandeln, Prüfziffer/Format validieren und Herkunft/Beleg separat bewerten
- Ergebnisbericht mit Zählungen und konkreten IDs problematischer Datensätze erzeugen

## 5. Vorgeschlagene künftige Zielstruktur (noch nicht migriert)

- `productId`: bestehende interne Produkt-ID; unverändert beibehalten
- `variantId`: neue interne ID für eine konkret bestellbare Variante, z. B. aus Produkt-ID + normalisiertem Typ + Packungsgröße
- `productType`: normalisierter Typ, erst nach Prüfung der Quelle
- `packSize`: zulässige Packungsgröße
- `priceEUR` oder serverseitig `priceCents`: maßgeblicher Katalogpreis
- `gtin`: offizielle GTIN als Zeichenfolge oder `null`
- `gtinStatus`: z. B. `not-assessed`, `supplier-provided`, `verification-needed`, `verified`, `not-required`
- `gtinSource` und `gtinVerifiedAt`: Herkunft und Prüfdatum
- `priceVerificationStatus`: z. B. `unverified`, `verified`, `needs-review`

Diese Struktur ist ein Vorschlag. Noch keine Produktdaten wurden migriert, keine Varianten-IDs massenhaft erzeugt und keine GTINs vergeben.

## 6. Sicherheitsziel für Preisprüfung

Der spätere Server nimmt aus der Warenkorb-Anfrage nur die Produkt-/Varianten-ID und die gewünschte Menge als Eingabe entgegen. Er sucht Variante und Preis in einer kontrollierten serverseitigen Quelle nach, prüft Menge und Freigabestatus und berechnet Summen in ganzzahligen Cent. Vom Browser gesendete Preise werden ignoriert. Unbekannte oder ungeprüfte Varianten werden abgelehnt.

## 7. Änderungs- und Deploymentstatus

Dieses Dokument beschreibt den aktuellen Prüfstand. Die Produktdatei und Shoplogik wurden bei dieser Bestandsaufnahme nicht geändert. `main`, Produktion und Checkout bleiben unangetastet. Die vollständige Prüfung über 1.269 Datensätze ist noch nicht abgeschlossen.
