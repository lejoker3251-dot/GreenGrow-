# Vollständiger Katalog-Prüfbericht – SEED³X

- **Branch:** `feature/premium-storefront-v1`
- **Geprüfte Datei:** `src/data/seed-products.json`
- **Prüfdatum:** 2026-10-25
- **Status:** Strukturprüfung abgeschlossen; fachliche Preis-/Lieferantenprüfung bleibt offen.
- **Arbeitsweise:** Nicht verändernde Auswertung der vollständigen Rohdatei über eine gezielte JSON-Abfrage. Die Datei wurde nicht umgeschrieben.

## 1. Umfang und Struktur

| Prüfkriterium | Ergebnis |
|---|---:|
| Produktdatensätze | 1.269 |
| Unterschiedliche, nichtleere Produkt-IDs | 1.269 |
| Doppelte IDs | 0 |
| IDs außerhalb des Musters `seed-NNNN` | 0 |
| Fehlende ID-Suffixe im Bereich 0001–1269 | 0 |
| Fehlender Produktname | 0 |
| Kategorien außerhalb der drei erwarteten Werte | 0 |
| Produkte mit ungültigem/nichtnumerischem oder fehlendem `priceEUR` | 0 |
| Produkte, deren `priceEUR` vom Preis der 1er-Packung abweicht | 0 |
| Produkte mit fehlenden/ungültigen Packpreisen | 0 |
| Produkte mit Packungsgrößen abweichend von genau 1, 3, 5, 10 | 0 |
| Produkte mit doppelter Packungsgröße | 0 |
| Preise kleiner/gleich 0 | 0 |
| Preisstaffeln, die mit größerer Packung nicht ansteigen | 0 |
| GTIN/EAN-/Barcode-Feld in den Datensätzen vorhanden | Nein |
| Vorhandene GTINs im Katalog | 0 |

Die ID-Prüfung bestätigt ausdrücklich, dass `seed-0033` vorhanden ist (Produktname: **Afghanica**).

## 2. Kategorien und Varianten

| Kategorie | Datensätze |
|---|---:|
| Autoflowering | 423 |
| Feminisierte Samen | 423 |
| Reguläre Samen | 423 |
| **Gesamt** | **1.269** |

Jeder Datensatz enthält vier Packvarianten (1, 3, 5 und 10 Samen), insgesamt also **5.076 Packvarianten**. Die erfassten Datensatz- und Packpreisfelder sind strukturell konsistent.

## 3. Sortenfamilien und Namensprüfung

Der Katalog bildet **423 Sorten-/Namensfamilien über drei Kategorie-Typen** ab. Gleiche oder sehr ähnliche Sortennamen in unterschiedlichen Kategorien sind daher nicht automatisch doppelte Produkte: Typ und Packungsgröße müssen Teil der späteren internen Variantenidentität sein.

**Gezielt zu prüfen:** `seed-0001`, `seed-0002` und `seed-0003` stehen für die Sortenfamilie „24 K Kosher Kush“ in den drei Typen. Bei `seed-0002` wird die Schreibweise „24 K Kosher kush“ mit kleinem „k“ verwendet, während die beiden anderen Schreibweisen „24 K Kosher Kush“ lauten. Das ist eine bestätigte Schreibweisenabweichung, aber ohne Abgleich mit der ursprünglichen Quelle keine automatische Korrektur.

Die vorangegangene automatische Namensabfrage lieferte widersprüchliche Kennzahlen für exakte und nicht case-sensitive Namensduplikate. Diese Kennzahlen werden deshalb **nicht** als Fehlerzahlen übernommen. Die robuste Feststellung für die Modellierung ist: 423 Namensfamilien sind jeweils über drei Kategorien angelegt; die Schreibweise einzelner Namen sollte gegen die Ursprungsquelle geprüft werden, bevor Normalisierung erfolgt.

## 4. Statusfelder und Freigabe

- Root-Feld `status`: 1.269 Datensätze auf **Entwurf**.
- Root-Feld `releaseStatus`: 1.269 Datensätze auf **Entwurf**.
- Packvarianten: 5.076 Varianten mit Status **Prüfung**.
- Lieferbarkeit/Verfügbarkeit ist damit nicht als bestätigt zu behandeln.
- Vorhandene Preiswerte sind Katalogwerte und keine unabhängige Bestätigung von Lieferantenpreis, Marktpreis oder rechtlicher Verkaufsfreigabe.

## 5. Was dieser Bericht nicht bestätigt

1. Dass Preise durch aktuelle Lieferantenbelege oder ausreichend vergleichbare Marktangebote belegt sind.
2. Dass alle Produktnamen, Typen, Packungsgrößen und Produktbilder mit den ursprünglichen Quellen übereinstimmen.
3. Dass ein Produkt lieferbar oder für den Verkauf freigegeben ist.
4. Dass vorhandene GTINs bei Herstellern/Lieferanten existieren. Im Katalog ist derzeit kein GTIN-Feld vorhanden; **es wurden keine GTINs erfunden, vergeben oder gekauft**.
5. Dass der Warenkorbpreis manipulationssicher ist. Die bekannte Client-seitige Preisvertrauenslücke bleibt offen und muss vor einer späteren Checkout-Aktivierung serverseitig behoben werden.

## 6. Empfohlene nächste Schritte

1. Die einzelne Schreibweisenabweichung bei `seed-0002` anhand der Ursprungsquelle prüfen.
2. Ein Variantenmodell mit stabiler `productId` und eigenständiger `variantId` für Typ und Packungsgröße entwerfen; bestehende IDs bleiben erhalten.
3. Ein optionales `gtin`-Feld mit leerem Wert/null und Herkunfts-/Prüfstatus vorsehen; nur nachweislich belegte Hersteller-/Lieferanten-GTINs eintragen.
4. Preisvalidierung serverseitig vorbereiten, aber Checkout weiterhin deaktiviert lassen.
5. Preisbelege, Verfügbarkeit, Freigabestatus und GTIN-Prüfung als getrennte Arbeitsstränge dokumentieren.

## Schutzgrenzen

Dieser Commit enthält nur diesen Prüfbericht. Es wurden keine Katalogdaten, Produktseiten, Warenkorb- oder Checkout-Dateien geändert. `main`, die produktive Website und die Checkout-Freigabe bleiben unverändert.