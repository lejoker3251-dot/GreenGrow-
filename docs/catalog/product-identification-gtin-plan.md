# SEED³X – Produktidentifikation und GTIN/EAN-Plan

Status: Konzept / Vorbereitung  
Geltungsbereich: Produktkatalog, Packungsvarianten, spätere Marktplätze  
Wichtig: Dieser Plan vergibt keine offiziellen GTINs und aktiviert keinen Checkout.

## 1. Ziel

Jeder Katalogeintrag und jede bestellbare Packungsvariante muss eindeutig identifizierbar sein. Das interne SEED³X-System bleibt unabhängig von offiziellen GTINs. Offizielle GTINs (umgangssprachlich häufig EAN genannt) werden nur eingetragen, wenn ihre Zuteilung belegt ist.

Der aktuelle Katalog umfasst 1.269 Produkteinträge. Die Einträge und Preise sind noch nicht automatisch als fachlich verifiziert zu verstehen.

## 2. Drei getrennte Kennzeichnungen

- `productId`: stabile interne ID des Produkteintrags, z. B. `seed-0001`. Bestehende IDs werden nicht allein wegen einer neuen EAN-Struktur geändert.
- `variantId`: stabile interne ID für eine konkret bestellbare Variante, einschließlich Typ und Packungsgröße, z. B. `seed-0001-auto-10`. Das Beispiel ist ein Schema, keine Bestätigung, dass diese ID bereits im Katalog existiert.
- `gtin`: offizieller GTIN-Wert als Zeichenfolge oder `null`, bis eine belegte Nummer zugeordnet wurde. Als Zeichenfolge speichern, damit führende Nullen nicht verloren gehen.

Die Packungsgröße und der Produkttyp müssen zusätzlich als strukturierte Felder vorliegen. Die ID ist kein Ersatz für diese Daten.

## 3. Empfohlenes Variantenmodell

Jede tatsächlich eigenständige Handelsvariante erhält einen eigenen Varianten-Datensatz. Für jede Variante werden mindestens vorgesehen:

- `variantId`
- `productId`
- `productType` (z. B. automatic, feminized, regular; nur nach Datenprüfung)
- `packSize` (z. B. 1, 3, 5 oder 10)
- `priceEUR` bzw. Preis in ganzzahligen Cent im serverseitigen Checkout
- `gtin` (offizielle GTIN oder `null`)
- `gtinStatus` (`not-assessed`, `supplier-provided`, `verification-needed`, `verified`, `not-required`)
- `gtinSource` (Lieferant, Markeninhaber oder GS1-Nachweis; keine erfundenen Quellen)
- `gtinVerifiedAt` (Datum der Prüfung oder `null`)
- `catalogStatus` und `priceVerificationStatus`

Vorhandene Preisfelder sollen nicht blind umgebaut werden. Zuerst muss der vorhandene Katalog strukturell geprüft werden; danach erfolgt eine kontrollierte Migration mit Validierung und Vergleich der Eintragszahlen.

## 4. Regeln für GTIN/EAN

1. Keine GTINs zufällig, fortlaufend oder algorithmisch selbst erzeugen und als offiziell markieren.
2. Wird ein unverändertes Markenprodukt weiterverkauft, zuerst die vom Markeninhaber/Lieferanten zugewiesene GTIN ermitteln und deren Verwendbarkeit prüfen.
3. Wird ein eigenes Produkt oder eine eigene Handelsvariante unter eigener Marke in Verkehr gebracht, die passende GTIN-Zuteilung und Verantwortlichkeit mit GS1 Germany klären.
4. Eine abweichende Packungsgröße oder eine sonstige eigenständige Handelsvariante darf nicht einfach die GTIN einer anderen Variante übernehmen; die geltenden GS1-Zuteilungsregeln sind zu prüfen.
5. GTINs nach Möglichkeit gegen Lieferantendokumente und/oder GS1 Verified by GS1 verifizieren. Unklare Fälle bleiben ungeprüft und werden nicht für Marktplatz-Listings freigegeben.
6. GTIN als Text speichern, Format und Prüfziffer validieren, aber beachten: Eine rechnerisch gültige Prüfziffer allein beweist keine offizielle Vergabe.
7. GTINs nicht wiederverwenden, nur weil ein Artikel aus dem Sortiment genommen wurde.

## 5. Preis- und Checkout-Sicherheit

Die Browserdaten und `localStorage` sind nicht vertrauenswürdig. Der Checkout muss Produkt-ID und Varianten-ID serverseitig nachschlagen, die erlaubte Packungsgröße bestätigen und den Preis aus der kontrollierten Quelle neu berechnen. Ein vom Browser übermittelter Preis wird ignoriert. Ungültige, unbekannte oder nicht freigegebene Varianten werden abgewiesen.

Checkout und Zahlungen bleiben deaktiviert, bis Katalog-, Preis-, Verfügbarkeits- und Manipulationstests separat bestanden und freigegeben wurden.

## 6. Arbeitsreihenfolge

1. Bestehende Produkt-IDs, Typen, Packungsgrößen und Preisfelder inventarisieren.
2. Datenqualität prüfen: fehlende Felder, doppelte IDs, Typabweichungen, uneindeutige Produkte und unbestätigte Preise markieren.
3. Variantenmodell festlegen, ohne bestehende Produkt-IDs zu verändern.
4. GTIN-Felder zunächst leer/null anlegen; keine Nummern erfinden.
5. Lieferanten-/Hersteller-GTINs für unveränderte Handelsprodukte recherchieren und belegen.
6. Für eigene Handelsprodukte den Bedarf und die Vergabe über GS1 Germany klären.
7. GTIN- und Variantenprüfungen automatisiert testen.
8. Erst danach serverseitige Preisvalidierung und eine spätere Checkout-Integration planen.

## 7. Offizielle Referenzen

- GS1 Germany – EAN/GTIN erklärt: https://www.gs1-germany.de/ean-nummern/
- GS1 Germany – GTIN im Handel: https://www.gs1-germany.de/standards/identifikation/artikel-gtin-sgtin/
- GS1 Germany – GTIN für Marktplätze und Vergabe: https://www.gs1-germany.de/themen/verkaufen-auf-marketplaces/
- GS1 Germany – GTIN kaufen / Vergabepakete: https://www.gs1-germany.de/ean-gtin-barcode/ean-kaufen/

Diese Quellen dienen der Orientierung. Vor einer tatsächlichen Nummernvergabe sind die dann aktuellen GS1-Regeln und Anforderungen der jeweiligen Marktplätze zu prüfen.
