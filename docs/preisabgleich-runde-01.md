# SEED³X – Sorten-/Preisabgleich, Runde 01

**Stichtag der Recherche:** 25.10.2026  
**Repository/Branch:** `lejoker3251-dot/GreenGrow-` / `feature/premium-storefront-v1`  
**Geltungsbereich:** Recherche- und Prüfnotiz. Keine Produktpreise im Shopkatalog geändert; kein Checkout, kein Deployment, keine Änderung an `main` oder Cloudflare.

## Wichtiges Ergebnis vor Beginn

Der erneute Abgleich der Datei `src/data/seed-products.json` ergibt **1.269 Einträge**, aber nach einer einfachen Normalisierung von Groß-/Kleinschreibung und Leerzeichen **424 unterschiedliche Namensgruppen**, nicht 423. Das muss vor dem finalen Mapping geklärt werden: mögliche Schreibvarianten dürfen nicht automatisch zu einer Familie zusammengezogen werden, wenn sie genetisch/kommerziell unterschiedliche Sorten bezeichnen. Die Katalogeinträge haben aktuell keine Züchterfelder; deshalb kann kein Breeder allein aus dem Sortennamen zuverlässig zugewiesen werden.

## Bewertungsregeln

- **Belastbarer Preisanker:** Produktseite nennt passende Sorte, Saatguttyp, Packungsgröße und Preis.
- **Teilbeleg:** Preis oder Typ ist sichtbar, aber Packungsgröße, Bestand oder Versand nach Deutschland ist nicht ausreichend belegt.
- **Kein Match:** ähnlich klingender Name, abweichender Saatguttyp, nicht nachvollziehbarer Breeder oder keine nutzbare Preis-/Packungsangabe.
- Händlerpreise werden als Packpreis und €/Samen getrennt notiert. Angebotspreis und regulärer Preis bleiben getrennt.
- Ein Händlerangebot für feminisierte Samen ist kein Beleg für Regular oder Autoflower. Preise aus USD werden nicht ohne gesonderte Wechselkurs-/Steuerprüfung mit Euroangeboten vermischt.
- Nicht gefundene Angebote bedeuten **nicht**, dass es die Sorte nicht gibt.

## Runde 01 – erste 10 Namensgruppen

| Katalogname | Typ | Rechercheergebnis | Preis-/Packungsbeleg | Bewertung |
|---|---|---|---|---|
| 24 K Kosher Kush | Autoflowering / feminisiert / regular | Suchtreffer für „24K Gold“ bzw. „Kosher Tangie“ von DNA Genetics; die gefundenen Seiten belegen keine eindeutige Identität mit dem Katalognamen „24 K Kosher Kush“. | Kein Preis übernommen. [DNA Genetics – 24K (Kosher Tangie)](https://dnagenetics.com/24k-gold-cannabis-strain/); [Cannapot – 24K Gold aka Kosher Tangie](https://www.cannapot.com/shop/cannabis-seeds/dna-genetics/24k-gold-aka-kosher-tangie_seeds.html) | **Kein Match** bis Identität/Breeder geklärt ist. |
| 3 Kings | Feminized | Blimburn Seeds listet eine feminisierte 3-Kings-Variante, aber der Suchtreffer gibt keinen belastbaren Packpreis/Packgröße an. Andere Treffer sind US-Händler. | [Blimburn Seeds – 3 Kings](https://blimburnseeds.com/3-kings/) | **Teilbeleg**; konkreten Preis und Deutschlandversand prüfen. |
| 707 Headband | Feminized | Pacific Seed Bank führt 707 Headband und nennt Mendocino Farms als Breeder. Packpreis/Packgröße und Deutschlandversand sind aus dem Treffer nicht belegt. | [Pacific Seed Bank – 707 Headband](https://www.pacificseedbank.com/shop-all-marijuana-seeds/feminized-marijuana-seeds/707-headband-feminized-marijuana-seeds/) | **Teilbeleg**, noch kein Referenzpreis. |
| 9 Pound Hammer | Autoflowering | Mr. Hanf listet „#9 Pound Hammer Auto“ ab 19,32 €, jedoch ist die konkrete Packgröße aus dem Treffer nicht ersichtlich. Ein US-Angebot von Blimburn ist feminisiert/photoperiodisch und darf nicht als Auto-Preisanker dienen. | [Mr. Hanf – Autoflower-Angebote](https://mr-hanf.de/en/seed-shop/autoflowering-seeds/feminized-auto-varieties/) | **Teilbeleg**; Preis erst nach Packgrößenprüfung verwenden. |
| Acapulco Gold | Feminized | Barney’s Farm führt feminisierte Samen mit Packstaffel. Sichtbarer Treffer: 1 Samen €6,50; 3 Samen €17,00; 5 Samen €23,41; 10er-Preis im Treffer abgeschnitten. Deutscher Händler House of Seeds zeigt eine Variante mit auswählbaren Größen, Preis €16,03 statt €22,90; konkrete ausgewählte Packgröße muss live geprüft werden. | [Barney’s Farm – Acapulco Gold](https://www.barneysfarm.com/acapulco-gold-26); [House of Seeds – Acapulco Gold](https://house-of-seeds.de/en/products/acapulco-gold-barneys-farm) | **Guter Kandidat**; Packstaffel direkt prüfen und dokumentieren, bevor Referenzpreise übernommen werden. |
| ACDC | Feminized | WeedSeedsExpress listet 3 Samen €34, 5+1 €54 und 10+2 €79. Bonus-Samen sind in der effektiven Stückzahl zu berücksichtigen. Breeder/Versanddetails separat prüfen. | [WeedSeedsExpress – ACDC](https://weedseedsexpress.com/product/acdc-seeds) | **Teilbeleg bis gut**, Packpreis sichtbar; Deutschlandversand und exakte Breederangabe prüfen. |
| Ace of Spades | Feminized | Treffer bei Pacific Seed Bank bestätigt den Typ, aber kein belastbarer Preis/Packgröße im Suchauszug. | [Pacific Seed Bank – Ace of Spades](https://www.pacificseedbank.com/shop-all-marijuana-seeds/feminized-marijuana-seeds/ace-of-spades-feminized-marijuana-seeds/) | **Teilbeleg**, kein Referenzpreis. |
| A-Dub | Feminized / Regular | A-Dub S1 wurde bei einem US-Anbieter gefunden; außerdem taucht A-Dub als Elternteil einer anderen Sorte auf. Das belegt weder dieselbe Linie noch einen nach Deutschland vergleichbaren Preis. | [Seedlys – A-Dub S1](https://www.seedlys.com/a-dub-s1-feminized-seeds/); [Greenpoint Seeds – A-Dub lineage](https://greenpointseeds.com/cannabis-strain-attributes/lineage/a-dub-strain/) | **Kein vergleichbarer Preisanker**; Breeder/Linie und Versand klären. |
| Afghan Kush | Autoflowering | Fast Buds Original Auto Afghan Kush: House of Seeds zeigt €6,96 statt €9,95 und Variantenwahl. Die genaue Packgröße muss je Variante bestätigt werden. | [House of Seeds – Original Auto Afghan Kush](https://house-of-seeds.de/en/products/original-auto-afghan-kush-420-fast-buds); [Fast Buds – Original Afghan Kush Auto](https://2fast4buds.com/seeds/original-afghan-kush-auto) | **Guter Kandidat**; Preisstaffel/Bestand live verifizieren. |
| Afghan Skunk | Feminized | Ein Händler listet Advanced Seeds Afghan Skunk feminisiert „ab €8,00“, ohne dass der Treffer eine eindeutige Packgröße nennt. | [MischSeeds – Sale-Kategorie](https://misch-shop.de/en-eu/collections/cannabis-samen-sale?page=25) | **Teilbeleg**, „ab“-Preis nicht als Packpreis übernehmen. |

## Nächste Arbeitsschritte

1. Namensdifferenz **424 vs. 423 Familien** auflösen, ohne unterschiedliche Sorten zusammenzulegen.
2. Für jeden Teilbeleg die konkrete Produktseite auf Packgrößen, aktuelle Preise, Lagerstatus, Breeder und Versand nach Deutschland prüfen.
3. Danach die nächsten Familien alphabetisch abarbeiten. Pro Typ wird ein Referenzwert nur dann gesetzt, wenn Sortenidentität, Typ und Packgröße belastbar sind; sonst bleibt der Status „offen“ und der bisherige Vorschlagswert wird nicht als bestätigter Marktmittelwert ausgegeben.
4. Ergebnisse in einer strukturierten Prüfliste mit Quellen-URL, Abrufdatum, Packgröße, Packpreis, effektivem €/Samen, Bestand/Versand und Vertrauensstufe fortführen.

**Status nach Runde 01:** 10 Namensgruppen initial recherchiert; noch keine Preise in den Produktkatalog importiert oder freigegeben.


## Live-Prüfung ausgewählter Produktseiten (25.10.2026)

Die drei Seiten unten wurden direkt abgerufen; diese Angaben sind stärker als reine Suchtreffer:

- **Acapulco Gold – Barney’s Farm, feminisiert:** Produktseite nennt 1 Samen €6,50 (regulär €14,00), 3 €17,00 (regulär €37,00), 5 €23,41 (regulär €52,50), 10 €42,00 (regulär €91,00), 25 €126,00. Daraus ergeben sich effektive Angebotspreise von €6,50 / €5,67 / €4,68 / €4,20 / €5,04 pro Samen. Auffällig: Der 25er-Pack ist pro Samen teurer als der 10er-Pack; daher nicht blind einen linearen Rabatt annehmen. Die Seite bestätigt **Feminized**, nicht Auto oder Regular. Quelle: [Barney’s Farm – Acapulco Gold](https://www.barneysfarm.com/acapulco-gold-26).
- **Original Auto Afghan Kush – Fast Buds, Autoflower:** House of Seeds zeigt €6,96 statt €9,95; Produktseite bestätigt „Autoflower“ und „Breeder & Cross: 420 Fast Buds – Afghan Auto“. Die Seite bietet auswählbare Größen (u. a. 1, 2, 3, 5); aus dem extrahierten Text lässt sich kein separater Preis für jede Größe belegen. Daher nur der sichtbare aktuelle Produktpreis €6,96, keine vollständige Preisstaffel. Versandkosten werden beim Checkout berechnet, kostenlos ab €50. Quelle: [House of Seeds – Original Auto Afghan Kush](https://house-of-seeds.de/en/products/original-auto-afghan-kush-420-fast-buds).
- **ACDC – WeedSeedsExpress, feminisiert/photoperiodisch:** 3 Samen €34,00; 5 + 1 gratis €54,00 (6 effektiv = €9,00/Samen); 10 + 2 gratis €79,00 (12 effektiv = €6,58/Samen). Seite nennt Versand aus den Niederlanden und kostenlosen Versand. Die Angebotsstufen zeigen, weshalb Gratis-Samen bei €/Samen einzurechnen sind. Quelle: [WeedSeedsExpress – ACDC](https://weedseedsexpress.com/product/acdc-seeds).

Diese Live-Prüfung bestätigt nur die genannten konkreten Produktvarianten. Sie berechtigt nicht dazu, die Preise auf gleichnamige Auto-/Regular-Varianten oder auf den SEED³X-Katalog ohne Breeder-Zuordnung zu übertragen.
