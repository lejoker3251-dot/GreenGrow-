# Katalogbestand, Varianten, GTIN und Preisprüfung

- **Arbeitszweig:** `test/inventory-ean-pricing-2026-10-25`
- **Datum:** 2026-10-25
- **Scope:** isolierte Vorbereitung; keine Änderung an `main`, Checkout oder Produktionsseite.

## 1. Kataloginventur und Anfangsbestand

Der geprüfte Katalog enthält 1.269 Produktdatensätze mit eindeutigen IDs `seed-0001` bis `seed-1269`. Die drei Kategorien enthalten jeweils 423 Datensätze: Autoflowering, Feminisierte Samen und Reguläre Samen.

Auf Anweisung des Eigentümers erhält jedes Produkt einen **Gesamtbestand von 1.000 verkaufsfähigen Packungseinheiten**. Das ergibt rechnerisch 1.269.000 Packungseinheiten über den gesamten Katalog. Die Menge ist je Produkt gemeint, nicht 1.000 je Packungsgröße.

Der Bestand ist in `src/data/product-inventory.json` als **vom Eigentümer deklarierter, noch nicht physisch geprüfter Anfangsbestand** erfasst. Es handelt sich nicht um eine unabhängige Lagerzählung. `stockQuantity` zählt Einzelhandels-Packungen, nicht die Anzahl der Samen innerhalb der Packungen.

## 2. Variantenmodell

Bestehende `productId`-Werte bleiben unverändert. Das bereits vorbereitete Variantenmodell erzeugt für jede Produktkategorie und Packungsgröße eine stabile `variantId` mit den Packungsgrößen 1, 3, 5 und 10. Der Katalog umfasst damit 5.076 Packvarianten.

**Bestandsgrenze:** Der vorgegebene Bestand von 1.000 gilt auf Produktebene insgesamt. Die Daten sagen nicht, wie diese 1.000 Packungen auf die vier Packungsvarianten verteilt sind. Deshalb darf die Menge nicht ungeprüft als je 1.000 pro Variante dargestellt werden. Für einen späteren echten Verkauf müssen Variantenbestand und Lagerzählung festgelegt werden.

## 3. EAN/GTIN-Inventur

Die vollständige Katalogprüfung fand kein GTIN-/EAN-/Barcode-Feld und keine eingetragenen GTIN-Werte. Interne IDs wie `seed-0001` und generierte `variantId`-Werte sind **keine EAN/GTIN** und dürfen nicht als Barcode ausgegeben werden.

Für jede spätere GTIN-Aufnahme sind mindestens die Nummer, der zugehörige Produkt-/Variantenbezug, die Quelle, das Prüfdatum und der Prüfstatus zu dokumentieren. Unbelegte Nummern bleiben leer.

## 4. Umgang mit fehlenden GTINs

- Bei Marken-/Fremdprodukten zuerst den Hersteller oder Lieferanten nach der offiziellen GTIN des exakt passenden Produkts und der Packungsgröße fragen.
- Bei eigenen Handelsmarken-Produkten klären, ob eine eigene GTIN benötigt wird, und die Vergabe ordnungsgemäß über GS1 Germany bzw. die zuständige GS1-Stelle durchführen.
- Keine zufälligen EANs, Prüfziffern-generierten Nummern oder internen IDs als offizielle GTIN verwenden.
- Eine GTIN erst nach belegter Zuordnung eintragen; Quelle, Datum und Prüfung mitführen.

## 5. Preisvalidierung und Freigabegrenze

`src/lib/catalog-pricing.js` enthält bereits eine reine Hilfsfunktion, die Preise aus dem Katalog statt aus dem übermittelten Warenkorbpreis ableitet und Produktfreigabe, Packungsgröße und Menge prüft. Die Funktion ist **kein laufender serverseitiger Checkout-Endpunkt** und allein noch keine Produktionssicherung.

Vor einer Checkout-Aktivierung muss ein echter serverseitiger Endpunkt ausschließlich anhand vertrauenswürdiger Katalogdaten die Produkt-ID und Varianten-ID auflösen, den autoritativen Preis und die Verfügbarkeit ermitteln, Mengen begrenzen und Summen serverseitig berechnen. Client-/LocalStorage-Preise dürfen nie maßgeblich sein. Freigabe- und Verfügbarkeitsstatus müssen geprüft werden.

Checkout und Zahlungen bleiben deaktiviert. Die bestehenden Produkt- und Preisdatensätze werden in diesem Schritt nicht umgeschrieben.

## Prüfergebnis und offene Punkte

- [x] 1.269 Produkt-IDs und Kategorieumfang dokumentiert.
- [x] Produktbezogenen Anfangsbestand von 1.000 Packungseinheiten je Produkt in einer separaten Datei erfasst.
- [x] Variantenmodell und Unterschied zwischen Produkt-ID, Varianten-ID und GTIN dokumentiert.
- [x] GTIN-Status: im Katalog keine Nummern vorhanden; keine Nummern erfunden.
- [x] Sicheren Prozess für offizielle GTIN-Zuordnung und spätere serverseitige Preisprüfung dokumentiert.
- [ ] Physische Lagerzählung bzw. Bestandsbestätigung.
- [ ] 1.000 Einheiten je Produkt auf die Packungsvarianten verteilen oder ein belastbares gemeinsames Bestandsmodell für Varianten implementieren.
- [ ] Hersteller-/Lieferantenbelege für GTINs sammeln und dokumentieren.
- [ ] Serverseitigen Preis-/Bestandsendpunkt separat implementieren und testen, bevor Checkout jemals aktiviert wird.
