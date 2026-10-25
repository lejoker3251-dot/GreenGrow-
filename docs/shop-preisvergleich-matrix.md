# SEED³X – interne Preisvergleichs- und Sortiermatrix

> **Status:** Arbeitsdokument · interne Recherche · keine Preisfreigabe  
> **Stand der Recherche:** 25.10.2026  
> **Geltungsbereich:** `feature/premium-storefront-v1`  
> **Währung:** EUR

## 1. Ziel und verbindliche Grenzen

Diese Matrix unterstützt die spätere Positionierung von SEED³X im **wettbewerbsfähigen mittleren Marktsegment**. Händlerpreise sind ausschließlich Vergleichswerte. Sie sind **keine** SEED³X-Verkaufspreise und dürfen nicht in den Produktkatalog übernommen werden.

- Die vorgesehenen Packungsgrößen bleiben **1, 3, 5 und 10 Samen**.
- Alle 1.269 Katalogeinträge bleiben im Entwurfsstatus, solange sie nicht einzeln geprüft und freigegeben wurden.
- `priceEUR` bleibt `null`; `packVariants` bleibt leer, bis konkrete Preise und Packungsvarianten freigegeben sind.
- Bestand, Lieferfähigkeit, Einkaufskosten und Zahlungsfähigkeit werden nicht aus Händlerseiten oder Annahmen abgeleitet.
- Checkout und Zahlungen bleiben deaktiviert.
- Keine Sorte wird allein aufgrund ihres Namens als „Premium“ eingestuft.

## 2. Bestandsaufnahme des Katalogs

Die Prüfung des aktuellen `src/data/seed-products.json` ergab:

| Merkmal | Ergebnis |
|---|---:|
| Produktdatensätze | 1.269 |
| Normalisierte Sortenfamilien | 423 |
| Autoflowering | 423 |
| Feminisierte Samen | 423 |
| Reguläre Samen | 423 |
| Einträge mit freigegebenem Preis | 0 |
| Einträge mit Packungsvarianten | 0 |
| Einträge mit explizitem Premium-Merkmal | 0 |
| Einträge mit Breeder-Feld | 0 |

Die Sortenfamilie wird durch normalisierte Namen gebildet. Schreibweisen und Groß-/Kleinschreibung können variieren; vor einer späteren automatischen Verknüpfung muss die Normalisierung auf Kollisionen geprüft werden. Die drei Typen bleiben getrennte Produkte und dürfen nicht zusammengeführt werden.

## 3. Sortier- und Freigabematrix

| Katalogtyp | Arbeitskategorie | Premium-Status | Was vor Preisfreigabe belegt sein muss |
|---|---|---|---|
| Feminisierte Samen | Standard – feminisiert | Nicht festgelegt | Exakter Produkt-/Sortenbezug, Vergleichsprodukte gleicher Art und Packungsgröße, Einkaufskosten |
| Autoflowering | Standard – autoflowering | Nicht festgelegt | Exakter Produkt-/Sortenbezug, Vergleichsprodukte gleicher Art und Packungsgröße, Einkaufskosten |
| Reguläre Samen | Regulär – eigene Kategorie | Nicht festgelegt | Vergleich nur mit regulären Samen; nicht mit feminisierten oder Autoflowering-Produkten vermischen |
| Produkt mit belegter Premium-Linie | Premium-Kandidat innerhalb des tatsächlichen Typs | Erst nach Prüfung | Nachweisbare Breeder-/Produktlinieninformation oder dokumentierte, bewusste Merchandising-Entscheidung |
| Unklare oder widersprüchliche Angaben | Klärungsbedarf | Nicht festgelegt | Quelle und Produktidentität klären; keine automatische Einordnung |

**Wichtig:** Im aktuellen Datensatz gibt es kein Breeder-Feld und kein Premium-Kennzeichen. Deshalb lässt sich aktuell kein Produkt belastbar als Premium bestätigen. Bis eine geeignete Quelle oder eine bewusste redaktionelle Entscheidung vorliegt, bleibt der Status „Nicht festgelegt“.

## 4. Systematische Preisanker – erste Erhebungsrunde

**Prüfdatum der Recherche: 25.10.2026.** Preise sind öffentliche Web-Snapshots, keine garantierten oder dauerhaften Händlerpreise. Die Angaben aus Suchauszügen sind mit dem Hinweis „Snapshot“ markiert; vor einer endgültigen Kalkulation müssen Variante, Endpreis, Versand, Steuern und Verfügbarkeit auf der Produktseite direkt bestätigt werden.

### 4.1 Gleiche Packungsgröße: 3 Samen

| SEED³X-Katalogfamilie / Typ | Vergleichsprodukt | Händler | Packung | Preis-Snapshot | Preis je Samen | Vergleichsqualität |
|---|---|---|---:|---:|---:|---|
| Blue Cheese – feminisiert | Blue Cheese, feminisiert | Bloomtech, RQS-Produkt | 3 | 21,50 € | 7,17 € | Gleicher Sortenname und Packung; Händlerseite kennzeichnet feminisiert |
| Blue Cheese – autoflowering | Blue Cheese Auto | Royal Queen Seeds (offiziell) | 3 | 21,50 € Listenpreis; 18,27 € Angebots-Snapshot | 7,17 € Listenpreis; 6,09 € Angebot | Gleicher Auto-Sortenname und Packung; Angebotsrabatt separat halten |
| Green Gelato – autoflowering | Green Gelato Auto | Royal Queen Seeds (offiziell) | 3 | 27,00 € | 9,00 € | Gleicher Auto-Sortenname und Packung |
| Green Gelato – autoflowering | Green Gelato Auto, 3er-Pack | Bloomtech | 3 | 26,90 € | 8,97 € | Gleicher Sortenname und Packung; Händler nennt das Produkt „feminisiert“ und „Auto“ im Namen |
| White Widow – feminisiert | White Widow | Royal Queen Seeds (offiziell) | 3 | 20,00 € | 6,67 € | Gleicher Sortenname und Packung; Seite zeigt Typauswahl, vor finaler Zuordnung feminisierte Variante direkt bestätigen |
| White Widow – regulär | White Widow / reguläre Variante | Dutch Passion (offizielle Produkt-/Angebotsseite) | 10 reguläre Samen | 29,95 € (Preis-Snapshot) | 3,00 € | Typ stimmt; Packung weicht ab. Nur Größenkontext, kein 3er-zu-3er-Vergleich |

### 4.2 Zusätzliche Vergleichsanker – nur bei passender Packung verwenden

| Produkttyp | Produkt / Händler | Packung | Preis-Snapshot | Quelle / Hinweis |
|---|---|---:|---:|---|
| Feminisiert | The 2019 – Royal Queen Seeds | 3 Samen ausgewählt | 29,00 € | Offizielle RQS-Kategorieseite; Auswahlzustand und Preis direkt auf Produktseite bestätigen |
| Feminisiert | Super Boof – Royal Queen Seeds | 3 Samen ausgewählt | 32,50 € | Offizielle RQS-Kategorieseite; Preis-Snapshot |
| Autoflowering | Sticky Queen Auto – Royal Queen Seeds | 3 Samen ausgewählt | 30,50 € | Offizielle RQS-Kategorieseite; Preis-Snapshot |
| Autoflowering | Mexican Rush Auto – Royal Queen Seeds | 3 Samen ausgewählt | 27,00 € | Offizielle RQS-Kategorieseite; Preis-Snapshot |
| Regulär | Passion #1 – Dutch Passion | 10 reguläre Samen | 44,95 € | Offizielle Produktseite; reguläre Variante eindeutig ausgewiesen, Packung nicht gleich 3 |
| Regulär | Shaman – Dutch Passion | 10 reguläre Samen | 29,95 € | Offizielle Produktseite; reguläre Variante eindeutig ausgewiesen, Packung nicht gleich 3 |

### 4.3 Weitere exakte Sortenfunde aus dem Katalog – 25.10.2026

Die folgenden Treffer wurden mit Sortennamen aus `src/data/seed-products.json` abgeglichen. Preise stammen aus öffentlich sichtbaren Händlerseiten bzw. Suchtreffern am Recherchetag. Ein Treffer belegt nur den jeweiligen Händlerpreis; er belegt weder identische Genetik noch Verfügbarkeit bei SEED³X.

| SEED³X-Katalogfamilie / Typ | Vergleichsprodukt und Händler | Packung | Preis-Snapshot | Preis je Samen | Abgleich / Qualität |
|---|---|---:|---:|---:|---|
| Blue Cheese – feminisiert | Blue Cheese, Royal Queen Seeds bei Weed Nursery | 3 | 21,50 € | 7,17 € | Exakter Sortenname und Typ auf Händlerseite bestätigt |
| Blue Cheese – feminisiert | Blue Cheese, Royal Queen Seeds bei Bloomtech | 3 | 21,50 € | 7,17 € | Exakter Sortenname und Typ in Händlerkategorie bestätigt |
| Blue Cheese – feminisiert | Blue Cheese, Barney’s Farm bei Bloomtech | 3 | 26,32 € Angebot; 32,90 € vorheriger Preis | 8,77 € Angebot; 10,97 € vorheriger Preis | Exakter Sortenname, aber anderer Breeder; nicht als gleiche Genetik behandeln |
| Blue Cheese – feminisiert | Blue Cheese, Expert Seeds bei Zamnesia | 3 | 29,00 € | 9,67 € | Exakter Sortenname, feminisiert und ausgewählte 3er-Variante auf Produktseite |
| Blue Dream – feminisiert | Blue Dream, Barney’s Farm bei Bloomtech | 3 | 26,32 € Angebot; 32,90 € vorheriger Preis | 8,77 € Angebot; 10,97 € vorheriger Preis | Exakter Sortenname und Typ in Händlerkategorie bestätigt; anderer Breeder |
| Amnesia – feminisiert | Amnesia feminisiert bei Weed Discount | 3 | 9,95 € Angebot; 15,95 € UVP | 3,32 € Angebot; 5,32 € UVP | Exakter Katalogname und 3er-Pack im Händlerlisting |
| Critical – feminisiert | Critical feminisiert bei Royal Queen Seeds | 3 | 23,00 € (Preis-Snapshot aus RQS-PDF) | 7,67 € | Exakter Name und 3er-Preis im Preisblatt; Quelle älter, daher nur historischer Vergleichsanker, nicht als aktueller Livepreis werten |
| Blue Cheese – autoflowering | Blue Cheese Auto, Royal Queen Seeds | 3 | 21,50 € Listenpreis; 18,27 € Angebots-Snapshot | 7,17 € Listenpreis; 6,09 € Angebot | Exakter Auto-Sortenname aus früherem Snapshot; vor Aktualisierung live gegenprüfen |
| Reguläre Samen – Sortenfamilie | Kein neuer, sicher bestätigter 3er-Treffer in dieser Runde | — | — | — | Nicht durch feminisierte Preise ersetzen; 10er-Regular-Angebote bleiben separate Größenreferenz |

**Quellen für diese Runde:**
- Weed Nursery, Blue Cheese RQS 3er-Pack: https://www.weed-nursery.de/royal-queen-seeds/blue-cheese-royal-queen-seeds
- Bloomtech, Produktübersicht mit Blue Cheese (RQS und Barney’s Farm) und Blue Dream (Barney’s Farm): https://bloomtech.de/cannabis-samen
- Weed Discount, feminisierte Kategorie mit Amnesia 3 Stück: https://www.weeddiscount.de/produktkategorie/cannabis-samen-hanfsamen/cannabis-samen-feminisiert/
- Zamnesia, Blue Cheese (Expert Seeds), 3er-Variante: https://www.zamnesia.de/3006-expert-seeds-blue-cheese-feminisiert.html
- Royal Queen Seeds, Preisblatt (PDF; nicht als aktueller Livepreis behandeln): https://www.royalqueenseeds.de/upload/Zig_Zag_2024_digital.pdf

### 4.3 Ergänzende Web-Preisfunde – geprüft am 25.10.2026

Diese ergänzenden Treffer erweitern die Händler-Stichprobe. Es handelt sich um öffentlich angezeigte Preise; vor einer späteren Verwendung als belastbarer Vergleich sind Produktvariante, Packungsgröße und Preis direkt beim Händler erneut zu kontrollieren.

| Katalogfamilie / Typ | Vergleichsprodukt | Händler | Packung | Preis-Snapshot | Preis je Samen | Vergleichsqualität |
|---|---|---|---:|---:|---:|---|
| Blue Cheese – feminisiert | Blue Cheese, feminisiert | Weed Nursery | 3 | 21,50 € | 7,17 € | Produktseite nennt RQS, feminisiert und 3 Stück; Versand zusätzlich |
| Blue Cheese – feminisiert | Blue Cheese feminisiert | Weed Discount | 3 | 9,95 € Aktions-/Angebotspreis; UVP 15,95 € | 3,32 € Angebot; 5,32 € UVP | Kategorieeintrag nennt feminisiert und 3 Stück; direkter Produktseiten-Check vor endgültigem Vergleich empfohlen |
| Blue Cheese – autoflowering | Blue Cheese Automatic | Seeds2Go | Packungsvariante im Suchauszug nicht eindeutig ausgewählt | 29,25 € Angebot / 32,50 € Vergleichspreis | Nicht berechnet | Suchauszug zeigt Artikelnummer mit 5er-Hinweis; nicht als 3er-Packvergleich verwenden |
| Diverse feminisierte Sorten | z. B. Alaskan Thunderfuck, Alien OG, Amnesia, Big Bud | Weed Discount | 3 | meist 9,95 € Angebot; UVP 15,95 € | 3,32 € Angebot; 5,32 € UVP | Händlerkategorie mit vielen Sorten; nicht auf andere Sorten übertragen, wenn sie nicht ausdrücklich gelistet sind |
| Diverse Typen | Mango Smile Auto, Purple Amnesia Auto, Strawberry Guava feminisiert u. a. | Kannoba / Holy Hemp | 3 | 19,90 € | 6,63 € | Händlerkategorie nennt 3 Stück; nur für exakt passende Sorten als Vergleich verwenden |
| Diverse Typen | Royal Queen Seeds Einzelprodukte mit mehreren Packungsgrößen | Bushplanet | ab-Preise je Produkt/Variante | z. B. Special Queen #1 ab 7,88 €, White Widow feminisiert ab 15,00 €, Blue Cheese Auto ab 16,12 € | Nicht berechnet, da „ab“-Preis und Packungsgröße nicht festgelegt | Nicht als exakter 3er-Preis übernehmen; Variantenwahl erforderlich |

### 4.3 Quellen der Preis-Snapshots

- CannaVergleich, Marktvergleich mit getrennter Packungsgröße und Preis je Samen: https://cannavergleich.com/
- Royal Queen Seeds, feminisierte Kategorie (The 2019, Super Boof u. a.): https://www.royalqueenseeds.de/33-feminisierte-hanfsamen
- Royal Queen Seeds, Autoflower-Kategorie (Sticky Queen Auto, Mexican Rush Auto u. a.): https://www.royalqueenseeds.de/34-autoflowering-hanfsamen
- Royal Queen Seeds, Bestseller-Kategorie (White Widow, 3 Samen ausgewählt): https://www.royalqueenseeds.de/besten-hanfsamen
- Dutch Passion, Passion #1 mit getrennten Packungsvarianten einschließlich 10 regulärer Samen: https://dutch-passion.com/de/hanfsamen/passion-1
- Dutch Passion, Shaman mit getrennten Packungsvarianten einschließlich 10 regulärer Samen: https://dutch-passion.com/de/hanfsamen/shaman
- Dutch Passion, reguläre Samen Kategorie: https://dutch-passion.com/de/regulare-cannabissamen
- Bloomtech, Royal Queen Seeds Produktübersicht (u. a. Blue Cheese feminisiert 3er-Pack, Green Gelato Auto 3er-Pack): https://bloomtech.de/Royal-Queen-Seeds

**Grenze der Erhebung:** Für reguläre Samen ist weiterhin kein verlässlich belegter, exakt passender 3er-Packpreis dokumentiert. Die systematische Abgleichrunde hat zusätzliche exakte Sortennamen für feminisierte Produkte bestätigt; für Auto- und reguläre Varianten bleibt eine separate, direkte Prüfung nötig. Die neuen Händlerfunde ergänzen vor allem feminisierte 3er-Packungen; Kategorie- und „ab“-Preise bleiben ausdrücklich vorläufig. Die 10er-Packungen sind ausdrücklich als abweichende Vergleichsgröße markiert und dürfen nicht als gleichwertiger 3er-Packvergleich behandelt werden. Auch die gleichen Sortennamen beweisen nicht automatisch identische Breeder-Genetik; das SEED³X-Katalogmodell enthält derzeit kein Breeder-Feld.

## 5. Verbindliches Datenschema für die vollständige Vergleichsmatrix

Für jede konkrete Vergleichsposition sind folgende Spalten zu erfassen:

| Feld | Regel |
|---|---|
| Sortenfamilie SEED³X | Normalisierter Sortenname; Originalschreibweise zusätzlich erhalten |
| SEED³X-Produkttyp | Autoflowering / feminisiert / regulär, exakt aus Katalogquelle |
| Vergleichsprodukt | Exakter Händler-Produktname |
| Vergleichsprodukttyp | Muss mit dem SEED³X-Typ übereinstimmen |
| Händler und URL | Direkte Produktseite, keine reine Kategorie- oder Suchseite als Preisbeleg |
| Packungsgröße | Exakte, ausgewählte Samenanzahl |
| Listenpreis EUR | Nur wenn direkt auf der Seite ausgewiesen |
| Angebotspreis EUR | Separat erfassen; nicht als Listenpreis ausgeben |
| Preis je Samen EUR | Rechnerisch Packungspreis geteilt durch Samenanzahl |
| Premium-Beleg | Quelle oder dokumentierte Entscheidung; andernfalls „nicht festgelegt“ |
| Einkaufskosten SEED³X | Für die aktuelle Marktpreis-Recherche nicht erforderlich; später nur aus bestätigtem Lieferanten-/Einkaufsbeleg |
| Zielmarge / Zielpreis | Nicht Teil dieses Recherche-Schritts; erst nach gesonderter Freigabe |
| Prüfdatum | Datum der tatsächlichen Sichtprüfung |
| Prüfergebnis | Bestätigt / unklar / nicht vergleichbar |

## 6. Kalkulationsregel – noch keine Verkaufspreise

Ein Verkaufspreis wird erst berechnet, wenn die tatsächlichen Stück-/Packungskosten, Verpackung, Versand-/Fulfillment-Anteile, Zahlungsgebühren, Steuern und sonstige zurechenbare Kosten geklärt sind. Eine Zielmarge darf nicht mit einem pauschalen Aufschlag verwechselt werden.

Bei einer als Deckungsbeitragsmarge definierten Zielmarge gilt grundsätzlich:

`Nettoverkaufspreis = zurechenbare variable Kosten / (1 - Zielmarge)`

Steuern und gesetzliche Preisangaben sind anschließend entsprechend der bestätigten Vertriebs- und Steuerkonstellation zu berücksichtigen. Ohne belastbare Kostenbasis wird kein SEED³X-Preis vorgeschlagen oder veröffentlicht.

## 7. Nächste Prüfschritte

1. Exakte Vergleichsprodukte je Sorte und Typ auswählen; zuerst gleiche Packungsgröße, danach dokumentierte Alternativen.
2. Für alle Vergleichsseiten am selben Prüftag Listen- und Angebotspreis, Packungsgröße und URL erfassen.
3. Sortenidentität und Produkttyp gegen die Katalogquelle prüfen; bloß ähnliche Namen gelten nicht als identische Genetik.
4. Breeder-/Premium-Angaben belegen oder als „nicht festgelegt“ belassen.
5. Für diese Recherchephase werden ausschließlich öffentliche Händlerpreise erfasst; Einkaufskosten und SEED³X-Margen bleiben bewusst außen vor.
6. Erst nach separater Freigabe können die recherchierten Marktpreise für eine spätere interne Kalkulation herangezogen werden.

## 8. Technische Schutzregeln

Die bestehende Konfiguration in `src/data/shop-pricing-config.json` bleibt maßgeblich. Dieses Dokument ändert weder Produktpreise noch Freigabestatus, Varianten, Lagerbestand, Checkout oder Zahlungsfunktionen. Die Datenprüfung `npm run test:shop-data` muss nach Änderungen weiterhin erfolgreich sein; Build und Laufzeitdarstellung sind separat zu prüfen. Es wird durch dieses Dokument kein Deploy ausgelöst.


### 4.4 Weitere Live-Preisfunde – 25.10.2026

Diese Ergänzung erfasst nur öffentlich sichtbare Händlerpreise. Vergleichsprodukte anderer Züchter sind Preisanker für dieselbe Sortenfamilie, aber kein Beleg identischer Genetik. Preise und Verfügbarkeit können sich ändern; Versandkosten sind nicht eingerechnet, sofern nicht ausdrücklich genannt.

| Katalogfamilie / Vergleichsprodukt | Typ | Händler / Züchter | Packung | Sichtbarer Preis | Preis je Samen | Einordnung / Quelle |
|---|---|---|---:|---:|---:|---|
| Blue Cheese Auto | Autoflower | Royal Queen Seeds / RQS | 3 | 18,27 € Angebot; 21,50 € vorher | 6,09 € Angebot; 7,17 € vorher | Direkte Produktseite; Seite zeigt Hinweis „benachrichtigen, wenn wieder auf Lager“, daher Preis nicht mit verfügbarer Ware gleichsetzen. https://www.royalqueenseeds.de/autoflowering-hanfsamen/312-blue-cheese-automatic.html |
| Blue Dream Auto | Autoflower | Sanaleo / Chillhouse | 3 | 19,95 € | 6,65 € | Direkte Produktseite, 3 Stück; Autoflower/feminisiert angegeben. Andere Züchterversion als Katalogeintrag. https://www.chillhouse.de/grow/cannabis-samen/sanaleo-blue-dream-auto |
| Blue Dream Auto | Autoflower | 00 Seeds / Genetiken.de | 3 oder 5 | 14,50–19,50 € Preisspanne | Nicht belastbar aus der Spanne ableitbar | Direkte Produktseite zeigt Auswahl mehrerer Packungen, aber Preis je ausgewählter Packungsgröße im Suchsnapshot nicht eindeutig zugeordnet; daher kein Packpreis in die Rangfolge übernehmen. https://genetiken.de/produkt/blue-dream-auto-autoflower-00-seeds/ |
| White Widow Automatic | Autoflower | White Label / Sensi Seeds | 3+1 Gratis | 23,50 € | 5,88 € je enthaltenem Samen (4 Samen) | Packung enthält 4 Samen einschließlich Gratis-Samen; nicht als reiner 3er-Pack vergleichbar. Seite markiert „Nicht auf Lager“. https://sensiseeds.com/de/feminisierte-samen/whitelabel/white-widow-automatic |
| White Widow Automatic | Autoflower | Blow-Up-Your-Mind-UG / Samenshop24 | 3 | 22,50 € | 7,50 € | Produktseite nennt 3 Korn und sofort verfügbar; Züchter/Genetik separat vom Katalogeintrag bestätigen. https://www.samenshop24.de/white-widow-cannabis |
| Blue Dream | feminisiert, photoperiodisch | Cali Genetics / Weed Discount | 3 | 9,95 € Angebot; 15,95 € UVP | 3,32 € Angebot; 5,32 € UVP | Aktuelle Händlerübersicht; nicht Auto und nicht regulär. Direkte Produktdetailseite vor einer endgültigen Freigabe zusätzlich prüfen. https://www.weeddiscount.de/produktkategorie/cannabis-samen-hanfsamen/cannabis-samen-feminisiert/ |
| Blue Cheese | feminisiert, photoperiodisch | Royal Queen Seeds / greenease | 3 | 15,99 € | 5,33 € | Produktseite mit 3er-Auswahl und Preisangabe; anderer Händlerpreis als bestehende RQS-Angebote. https://greenease.de/seeds/feminized-blue-cheese |
| Blue Cheese | feminisiert, photoperiodisch | Royal Queen Seeds / Gea Seeds | 3 | 21,33 € | 7,11 € | Produktseite zeigt Staffelpreise für 1/3/5/10; Preis für 3 Einheiten ausgewiesen. https://geaseeds.com/de/royal-queen-seeds/98-blue-cheese.html |

#### Offene Punkte aus dieser Runde

- Für die Katalogvarianten **Blue Cheese Regular, Blue Dream Regular, Amnesia Regular und Critical Regular** wurde in dieser Runde kein belastbarer, direkt zuordenbarer 3er-Packpreis bestätigt. Reguläre Angebote aus 5er-/10er-/größeren Packungen dürfen separat erfasst werden, aber nicht als 3er-Preis ausgegeben werden.
- Bei **Blue Dream Auto** ist der Packpreis bei 00 Seeds in der abgerufenen Darstellung nicht eindeutig einer Variante zugeordnet; bis zur Sichtprüfung mit ausgewählter Packungsgröße bleibt der Eintrag ein Recherchehinweis, kein bestätigter Preisanker.
- Ein Angebotspreis ist kein Listenpreis. Preis je Samen wurde nur berechnet, wenn Packungsgröße und Packpreis eindeutig waren.
- Für Händlervergleiche gleicher Sortenfamilien bleibt der Züchter ein eigenes Merkmal: gleiche Sortenbezeichnung bedeutet nicht automatisch identische Genetik.


### 4.5 Prüfung der neu ergänzten Quellen und regulärer Packungsgrößen – 25.10.2026

Die beiden vom Nutzer bereitgestellten Quellen wurden als zusätzliche Recherchequellen aufgenommen. Bei regulären Sorten werden 5er- und 10er-Packungen getrennt erfasst; ein „ab“-Preis ohne eindeutig ausgewiesene Samenanzahl ist **kein** bestätigter Packpreis und wird nicht auf einen Stückpreis umgerechnet.

| Quelle / Produktbeispiel | Typ | Öffentlich sichtbarer Preis | Packungsgröße | Preis je Samen | Prüfergebnis |
|---|---|---:|---|---:|---|
| Zamnesia – „Top 10 der besten regulären Cannabissamen“ | Redaktioneller Ratgeber | Im geöffneten Seiteninhalt kein eindeutig zuordenbarer aktueller Packpreis je gelisteter Sorte | Nicht ausgewiesen | Nicht berechenbar | Als Sortenfinder und Quelle für Kandidaten verwenden, nicht als Preisbeleg. https://www.zamnesia.de/blog-top-10-besten-regulaeren-cannabissamen-n2409 |
| Zamnesia – reguläre Samen, Kategorie | Regulär | Black Widow (Mr. Nice) 68,00 €; Ruderalis Skunk (Sensi Seeds) 48,00 €; Motavation (Serious Seeds) 70,00 €; Critical Skunk (Mr. Nice) 60,00 €; Dreamtime (Mr. Nice) 35,00 €; G13 Haze (Mr. Nice) 80,00 € | Auf der Kategorieansicht nicht für alle Beispiele eindeutig zugeordnet | Nicht berechenbar | Öffentliche Kategoriepreise; vor Aufnahme in Packungsvergleiche muss die konkrete Produktseite mit ausgewählter 5er-/10er-Variante geprüft werden. https://www.zamnesia.de/35-cannabissamen/296-regulare-hanfsamen |
| Secret of Eden – Black Widow (Mr Nice Seedbank) | Regulär laut Kategorie | Ab 68,00 € | Nicht eindeutig aus der Kategorieansicht | Nicht berechenbar | „Ab“-Preis; kein bestätigter 5er-/10er-Packpreis. https://secretofeden.de/Samen/Regular/ |
| Secret of Eden – Critical Mass (Mr Nice Seedbank) | Regulär laut Kategorie | Ab 68,00 € | Nicht eindeutig aus der Kategorieansicht | Nicht berechenbar | Andere Sortenbezeichnung als „Critical“; nicht als identische Katalogsorte zählen. https://secretofeden.de/Samen/Regular/ |
| Secret of Eden – Jack Herer® Regular (Sensi Seeds) | Regulär | Ab 163,00 € | Nicht eindeutig aus der Kategorieansicht | Nicht berechenbar | Packgröße und Verfügbarkeit auf Produktdetailseite verifizieren. https://secretofeden.de/Samen/Regular/ |
| Secret of Eden – White Widow® Regular (De Sjamaan) | Regulär | Ab 30,00 € | Nicht eindeutig aus der Kategorieansicht | Nicht berechenbar | Produkt auf der Seite als derzeit ausverkauft / bald wieder verfügbar markiert; daher kein verfügbarer Preisanker. https://secretofeden.de/Samen/Regular/ |
| Secret of Eden – Peace Maker Regular (De Sjamaan) | Regulär | Ab 30,00 € | Nicht eindeutig aus der Kategorieansicht | Nicht berechenbar | Produkt auf der Seite als derzeit ausverkauft / bald wieder verfügbar markiert. https://secretofeden.de/Samen/Regular/ |

#### Ergebnis dieser Quellenprüfung

- Die neuen Quellen erweitern die Kandidatenliste für reguläre Genetiken, liefern in der abgerufenen Ansicht aber überwiegend **keine verlässlich zuordenbaren 5er-/10er-Packpreise**.
- „Ab“-Preise bleiben als Preisindikator mit unbekannter Packgröße dokumentiert. Es wird daraus weder ein Stückpreis noch ein vermeintlicher 5er-/10er-Preis errechnet.
- Critical Mass, Critical Haze und Critical Skunk sind nicht automatisch mit der Katalogfamilie Critical gleichzusetzen. Gleiches gilt für White Widow-Produkte verschiedener Züchter: Sortenname und Züchter werden getrennt dokumentiert.
- Die nächste Prüfrunde muss auf konkrete Produktdetailseiten mit ausgewählter Packungsgröße zielen. Nur wenn Packungsgröße, Regular-Typ, Preis und Verfügbarkeit klar ersichtlich sind, wird der Preis als bestätigt geführt.


### 4.6 Bestätigte reguläre Packungsangebote – 25.10.2026

Diese Runde erfasst nur öffentliche Händlerpreise für reguläre Varianten in klar ausgewiesenen 10er-Packungen. Der Züchter ist Teil der Vergleichsangabe; gleichnamige Sorten verschiedener Züchter gelten nicht als genetisch identisch. Preis je Samen ist ausschließlich Packpreis geteilt durch die eindeutig ausgewiesene Anzahl. Versandkosten sind nicht eingerechnet.

| Katalogfamilie / Händlerprodukt | Typ | Züchter / Händler | Packung | Öffentlicher Packpreis | Preis je Samen | Verfügbarkeit / Einschränkung | Quelle |
|---|---|---|---:|---:|---:|---|---|
| Amnesia Regular | Regulär | Seedsman / Hanf Vital Shop | 10 | 19,99 € | 2,00 € (gerundet) | Produktseite nennt „Regulär“, SKU HVS001025-R10 und „Verfügbar“. Die Seite zeigt €19,99 pro Packung und €2,00/Samen; der gerundete Stückpreis ergibt rechnerisch nicht exakt den Packpreis. | https://hanfvitalshop.de/amnesia-regulaere |
| Blue Dream Regular | Regulär | Nirvana / Genetiken.de | 10 | 30,00 € | 3,00 € | Händlerkategorie nennt explizit „Blue Dream Regular Seeds – 10“ für 30,00 €. Verfügbarkeit und Detailseite vor späterer Verwendung erneut prüfen. | https://genetiken.de/produktkategorie/breeder/nirvana-seeds/?filter_bluetezeit=8-to-10-weeks |
| White Widow Regular | Regulär | Sensi Seeds White Label / Eden Seeds | 10 | 41,00 € | 4,10 € | Produktseite bestätigt 10 Stück und regulär, markiert das Produkt jedoch als „Bald wieder verfügbar“; daher historischer/derzeit nicht verfügbarer Preisindikator, kein verfügbarer Angebotsanker. | https://www.eden-seeds.de/regulare-samen/sensi-seeds-white-label-white-widow-regular |

#### Weitere geprüfte Treffer, nicht als bestätigter 5er-/10er-Packpreis übernommen

| Produkt / Händler | Öffentliche Angabe | Grund für Ausschluss aus bestätigter Packpreis-Tabelle | Quelle |
|---|---|---|---|
| White Widow Regular / Seeds2go | 36,90 € (vorher 41,00 €), regulär; Lieferzeit 7–10 Werktage | Die geöffnete Darstellung nennt in den sichtbaren Produktdaten keine eindeutige Samenanzahl; kein Stückpreis ableiten. | https://shop.seeds2go.eu/onlineshop-hanfsamen/alle-samenbanken/white-label/regulaer/1644/white-widow-regular |
| Critical Regular / Blimburn Seeds | Produktseite bestätigt „Regulär“ | Im geprüften sichtbaren Ausschnitt war keine belastbare Packungsgröße samt Preis zugeordnet. Nicht mit Critical Mass, Critical Haze oder Critical Skunk gleichsetzen. | https://blimburnseeds.de/critical-regular/ |
| Critical / Bulk Genetics | Ab 2,52 € je Samen, ausdrücklich im 25er-Pack | Packungsgröße liegt außerhalb der angefragten 5er-/10er-Größen; daher separat als 25er-Pack-Indikator, nicht in die 5er-/10er-Vergleichsgruppe aufnehmen. | https://bulkgenetics.com/de/c/regulaere-samen/ |

#### Ergebnis und Grenzen

- In dieser Runde wurden **zwei derzeit nicht eindeutig als verfügbar bestätigte, reguläre 10er-Angebote** mit Packpreis gefunden (Amnesia Regular und Blue Dream Regular); White Widow Regular ist mit einem klaren 10er-Preis dokumentiert, aber laut Händler aktuell nicht verfügbar.
- Für **Blue Cheese Regular** und **Critical Regular** wurde kein belastbarer 5er-/10er-Packpreis bestätigt. Es werden keine Preise aus feminisierten oder Autoflower-Angeboten übertragen.
- Die Blue Dream-Angabe stammt von Nirvana, die Amnesia-Angabe von Seedsman und die White-Widow-Angabe von Sensi Seeds White Label. Diese Händlerangebote sind externe Vergleichspunkte und kein Beleg für identische Genetik zum SEED³X-Katalog.
- Keine Änderungen an Produktkatalog, Lagerbestand, Freigabestatus, Checkout oder Verkaufspreisen; keine Veröffentlichung oder Deployment.


### 4.7 Nachprüfung der offenen regulären Varianten – 25.10.2026

| Katalogfamilie / Händlerprodukt | Typ | Händler / Züchter | Packung | Preis | Verfügbarkeit / Bewertung | Quelle |
|---|---|---|---:|---:|---|---|
| Blue Dream Regular – Nirvana Seeds | Regulär | Hanfjack / Nirvana Seeds | 10 | 31,03 € | Direkte Produktseite bestätigt 10 Stück und regulären Typ, meldet jedoch „Nicht vorrätig“. Das ist ein nicht verfügbarer Preisindikator. | https://hanfjack.de/produkt/nirvana-seeds-blue-dream-regulaer/ |
| Blue Dream Regular Seeds – 10 | Regulär | Genetiken.de / Nirvana Seeds | 10 | 30,00 € | Händlerübersicht bestätigt 10er-Pack und Regular-Kategorie; konkrete Produktdetailseite und aktueller Lagerstatus bleiben noch zu verifizieren. Preis daher als vorläufiger Kategoriepreis führen. | https://genetiken.de/produktkategorie/breeder/nirvana-seeds/?filter_packungsgroesse=10-seeds |
| Blue Dream Regular – Nirvana | Regulär | Seeds2go / Nirvana Seeds | Packgröße nicht eindeutig in der Kategorieansicht | 27,00 € Angebot / 30,00 € vorher | Kategorie nennt beide Preise, aber in der geöffneten Übersicht ist die Samenanzahl für genau diesen Eintrag nicht belastbar zugeordnet. Kein Preis je Samen berechnen. | https://shop.seeds2go.eu/onlineshop-hanfsamen/alle-samenbanken/nirvana/regulaer/ |
| Critical Regular – Blimburn Seeds | Regulär | Blimburn Seeds | Varianten 1, 3, 6, 9; weitere Pakete vorhanden | Für die sichtbaren Varianten: 1 Samen 11,99 €; 3 Samen 30,99 € Angebot; 6 Samen 57,49 € Angebot; 9 Samen 73,99 € Angebot | Direkte Produktseite bestätigt regulären Typ und Packoptionen, aber die sichtbaren Größen passen nicht zur Zielgruppe 5er/10er. Deshalb nicht als 5er-/10er-Preis übernehmen. Züchter beschreibt die Linie als Critical Mass × AK47; nicht ohne weiteres mit jedem „Critical“-Katalogeintrag gleichsetzen. | https://blimburnseeds.de/critical-regular/ |
| Blue Cheese Regular | Regulär | — | 5 oder 10 | Kein bestätigter Preis gefunden | Die Suchtreffer zu Blue Cheese führten überwiegend zu feminisierten oder Autoflower-Produkten. Diese Preise wurden nicht auf Regular übertragen. | Recherche ohne belastbaren Direktbeleg |

#### Einordnung

- Für Blue Dream Regular gibt es jetzt einen direkten 10er-Produktbeleg, allerdings bei Hanfjack ausverkauft; die Preisangaben von 30,00 € und 31,03 € stammen aus unterschiedlichen Händleransichten und werden nicht zu einem künstlichen Einheitspreis zusammengeführt.
- Für Critical Regular ist die Existenz einer regulären Produktlinie bestätigt, aber die klar sichtbaren Packgrößen liegen nicht bei 5 oder 10 Samen. Das Produkt bleibt daher außerhalb der bestätigten Ziel-Packgrößen.
- Für Blue Cheese Regular liegt weiterhin kein verlässlicher 5er-/10er-Direktbeleg vor.
- Es wurden ausschließlich öffentliche Händlerpreise recherchiert. Keine Einkaufskosten, Margen oder SEED³X-Verkaufspreise berechnet; Produktdaten, Bestand, Freigaben, Checkout und Veröffentlichung bleiben unverändert.



### 4.8 Weitere Direktprüfung regulärer Sorten – 25.10.2026

Die Produktseiten wurden nach dem ersten Suchtreffer erneut geöffnet. Wo Preis und Packungsvariante in der geöffneten Ansicht nicht eindeutig zusammenpassen oder Verfügbarkeitsangaben widersprüchlich sind, wird der Treffer nur als vorläufiger Preisindikator dokumentiert.

| Katalogfamilie / Händlerprodukt | Typ | Händler / Züchter | Packung | Sichtbarer Preis | Preis je Samen | Verfügbarkeit / Einschränkung | Quelle |
|---|---|---|---:|---:|---:|---|---|
| Critical Regular | Regulär | Royal Queen Seeds (RQS) | 10 | 60,00 € | 6,00 € | Offizielle Produktseite nennt eine 10er-Variante für 60,00 € und regulären Typ. Die Seite enthält zugleich sowohl einen Hinweis „Benachrichtige mich, wenn wieder auf Lager“ als auch „Achtung: letzte verfügbare Teile“. Verfügbarkeit daher widersprüchlich und vorläufig; nicht als sicher lieferbar einstufen. Genetischer Hintergrund laut Seite: Afghan × Skunk. | https://www.royalqueenseeds.de/regulaere-cannabissamen/545-critical-regular.html |
| Critical regulär | Regulär | Cannoptikum / Royal Queen Seeds | 10 oder 25 auswählbar | Ab 56,81 € auf der aktuell geöffneten Seite | Nicht berechnet | Produktseite bestätigt regulären Typ und Optionen 10/25 Samen, aber der sichtbare „ab“-Preis ist in der geöffneten Darstellung nicht eindeutig einer der Packungsgrößen zugeordnet. Ein zuvor im Suchauszug angezeigter Angebotswert von 45,45 € ließ sich in der geöffneten Seite nicht als aktuell ausgewählter 10er-Preis bestätigen; deshalb nicht als bestätigter Packpreis übernehmen. | https://cannoptikum.com/hanfsamen-kaufen/critical-regulaer |

#### Ergebnis dieser Runde

- Für **Critical Regular** ist eine 10er-Variante bei RQS mit 60,00 € sichtbar; die Verfügbarkeit ist aufgrund widersprüchlicher Hinweise nicht sicher bestätigt. Bei Cannoptikum ist die Sorte regulär und in 10er-/25er-Optionen gelistet, aber der sichtbare „ab“-Preis ist nicht eindeutig der 10er-Packung zugeordnet.
- Für **Blue Cheese Regular** konnte weiterhin kein belastbarer direkter 5er-/10er-Preis bestätigt werden. Treffer mit Variantenpreisen waren nicht eindeutig als regulär ausgewiesen; diese Preise wurden deshalb nicht übernommen.
- Für **Blue Dream Regular** bleiben die zuvor dokumentierten 10er-Anker bestehen: Hanfjack 31,03 € (nicht vorrätig) und Genetiken.de 30,00 € (Detailseite/Bestand noch offen). Sie werden nicht gemittelt.
- Marktpreise sind externe Vergleichswerte und keine SEED³X-Preise. Keine Einkaufskosten, Margen oder Verkaufspreise berechnet; Produktkatalog, Bestand, Freigabestatus, Checkout, `main` und Deployment bleiben unverändert.


### 4.9 Direktprüfung der regulären Varianten – weitere Quellen, 25.10.2026

Die folgenden Treffer wurden anhand der geöffneten Händleransichten geprüft. Ein Kategorietreffer ist weiterhin schwächer als eine vollständig ausgewählte Produktdetailseite; unklare Verfügbarkeit wird nicht als „lieferbar“ interpretiert.

| Katalogfamilie / Händlerprodukt | Typ | Händler / Züchter | Packung | Sichtbarer Preis | Preis je Samen | Prüfergebnis / Verfügbarkeit | Quelle |
|---|---|---|---:|---:|---:|---|---|
| Critical Regular | Regulär | Royal Queen Seeds (RQS) | 10 | 60,00 € | 6,00 € | Offizielle Produktseite zeigt die 10er-Variante für 60,00 €. Gleichzeitig erscheint „Benachrichtige mich, wenn das Produkt wieder auf Lager ist“ und an anderer Stelle „letzte verfügbare Teile“. Wegen dieser widersprüchlichen Statushinweise nicht als sicher verfügbar einstufen. Die 25er-Variante kostet 120,00 € und ist kein 10er-Vergleich. | https://www.royalqueenseeds.de/regulaere-cannabissamen/545-critical-regular.html |
| Blue Dream Regular – Nirvana Seeds | Regulär | Genetiken.de / Nirvana Seeds | 10 | 30,00 € | 3,00 € | Die aktuelle Kategorieansicht führt „Blue Dream Regular Seeds – 10“ für 30,00 € unter den Filtern „Regular“ und „10 Seeds“. Der Artikel zeigt „Weiterlesen“ statt einer direkten Warenkorb-Aktion; der aktuelle Lagerstatus ist damit nicht sicher belegt. Als bestätigter Kategorie-Preis, nicht als sicher lieferbar, führen. | https://genetiken.de/produktkategorie/breeder/nirvana-seeds/?filter_packungsgroesse=10-seeds |
| Blue Dream Regular – Nirvana Seeds | Regulär | Hanfjack / Nirvana Seeds | 10 | 31,03 € | 3,10 € | Produktdetailseite nennt 10 Stück und regulären Typ, aber ausdrücklich „Nicht vorrätig“. Daher nur nicht verfügbarer Preisindikator. | https://hanfjack.de/produkt/nirvana-seeds-blue-dream-regulaer/ |
| Blue Cheese Regular | Regulär | — | 5 oder 10 | Kein bestätigter Preis | — | Die gezielte Suche ergab keinen belastbaren Direktbeleg für eine Blue-Cheese-Variante mit ausgewiesenem Regular-Typ und 5er-/10er-Pack. Die gefundenen Blue-Cheese-Seiten waren feminisiert oder Auto; sie wurden nicht übernommen. | Recherche ohne bestätigten Direktbeleg |

#### Konsequenz für die Matrix

- Für **Critical Regular** gibt es nun einen konkret ausgewiesenen 10er-Preis von 60,00 € bei RQS, aber die Verfügbarkeit bleibt widersprüchlich. Die Seite wird deshalb als Preisreferenz mit Verfügbarkeitsvorbehalt geführt.
- Für **Blue Dream Regular** bestätigt die aktuelle Genetiken.de-Kategorie den 10er-Pack für 30,00 €. Der Lagerstatus bleibt offen; Hanfjack bestätigt denselben Packumfang bei 31,03 €, markiert das Produkt jedoch als nicht vorrätig. Die Preise werden nicht gemittelt.
- Für **Blue Cheese Regular** bleibt die Lücke offen. Preise aus feminisierten oder selbstblühenden Varianten sind keine zulässigen Ersatzwerte.
- Es wurden nur öffentliche Händlerpreise ergänzt. Keine Einkaufskosten, Margen oder SEED³X-Verkaufspreise berechnet; keine Produktdaten, Lagerbestände, Freigaben, Checkout-Funktionen, `main` oder Deployments verändert.


### 4.10 Weitere bestätigte Preisanker regulärer Sorten – 25.10.2026

| Katalogfamilie / Händlerprodukt | Typ | Händler / Züchter | Packung | Sichtbarer Preis | Preis je Samen | Verfügbarkeit / Einschränkung | Quelle |
|---|---|---|---:|---:|---:|---|---|
| Amnesia Regular – Nirvana Seeds | Regulär | Sunshine State / Nirvana | 10 | 24,00 € Angebot (zuvor 30,00 €) | 2,40 € | Direkte Produktseite nennt 10 Stück, regulären Typ und „Verfügbar bei Nachbestellung“; kein Beleg für sofortigen Lagerbestand. | https://seedstate.de/produkt/amnesia-regular-10-st-nirvana/ |
| Amnesia Regular – Nirvana Seeds | Regulär | The Maria Shop / Nirvana | 10 | 20,00 € | 2,00 € | Direkte Seite nennt 10 Samen und „In stock“. Versand nach Deutschland und Endpreis inkl. Versand nicht bestätigt; daher Vergleichsanker mit Versandvorbehalt. | https://themariashop.com/en/amnesia-regular/ |
| Amnesia Regular – Seedsman | Regulär | Hanf Vital Shop / Seedsman | 10 | 19,99 € | ca. 2,00 € | Direkte Seite weist Regulär, Artikelnummer HVS001025-R10 und „Verfügbar“ aus. | https://hanfvitalshop.de/amnesia-regulaere |
| Amnesia Regular – Seedsman | Regulär | Hanfjack / Seedsman | 10 | 20,33 € | 2,03 € | Direkte Seite bestätigt 10 Stück und regulären Typ, meldet jedoch „Nicht vorrätig“. Nur nicht verfügbarer Preisindikator. | https://hanfjack.de/produkt/seedsman-amnesia-regulaer/ |
| Amnesia Haze Regular – Nirvana Seeds | Regulär | Genetiken.de / Nirvana | 10 | 30,00 € | 3,00 € | Kategorieansicht bestätigt 10er-Pack und Regular, aber es handelt sich um Amnesia Haze, nicht exakt Amnesia. Nur verwandte Sorte, kein identischer Treffer. | https://genetiken.de/produktkategorie/breeder/nirvana-seeds/?filter_packungsgroesse=10-seeds |
| Blue Cheese Regular | Regulär | — | 5 oder 10 | Kein bestätigter Preis | — | Kein direkter Beleg mit eindeutigem Regular-Typ und Ziel-Packgröße gefunden. Feminisiert- und Auto-Angebote bleiben ausgeschlossen. | Recherche ohne bestätigten Direktbeleg |

#### Ergebnis und Qualitätsgrenzen

- **Amnesia Regular** hat mehrere getrennte Vergleichsanker: 19,99 € für Seedsman im Hanf Vital Shop (als verfügbar gelistet), 20,33 € bei Hanfjack (nicht vorrätig), sowie Nirvana-Angebote für 20,00 € beim The Maria Shop und 24,00 € bei Sunshine State. Nicht mitteln: Züchter, Händler, Status und Versandbedingungen unterscheiden sich.
- **Blue Dream Regular** bleibt bei 30,00 € für 10 Samen bei Genetiken.de als Kategoriepreis ohne bestätigten Lagerstatus und 31,03 € bei Hanfjack als ausdrücklich nicht vorrätiger Direktpreis dokumentiert.
- **Blue Cheese Regular** bleibt offen: feminisierte oder Auto-Angebote sind kein zulässiger Ersatz.
- Nur öffentliche Händlerpreise; keine Einkaufskosten, Margen oder SEED³X-Preisempfehlungen. Produktkatalog, Preise im Katalog, Bestand, Freigabestatus, Checkout, `main` und Deployment bleiben unverändert.


### 4.11 Nachprüfung der Blue-Cheese- und Blue-Dream-Lücken – 25.10.2026

| Katalogfamilie / Händlerprodukt | Typ | Packung / Preis | Prüfergebnis | Quelle |
|---|---|---|---|---|
| Blue Cheese – Tanie Sianie Seeds | Nicht eindeutig ausgewiesen | 1/3/5/10/25/50/100; z. B. 5 Stück 16,45 €, 10 Stück 31,16 € (Angebotsansicht) | Die Seite führt zusätzlich eine separate „Blue Cheese Auto“-Variante, weist beim hier genannten Eintrag aber keinen eindeutig belegten regulären Samentyp aus. Daher nicht als Regular-Preisanker übernehmen. | https://www.taniesianie.de/sorten/cheese |
| Blue Cheese – Barney’s Farm / Königlich Bayrische Samenbank | Feminisiert | 1–25; variable Preisspanne 13,00–182,52 € | Produktseite kennzeichnet die Sorte ausdrücklich als feminisiert. Ausgeschlossen aus dem Regular-Vergleich. | https://kb-samenbank.bayern/samen/barneys-farm-blue-cheese-1-25-samen-fem/ |
| Blue Cheese – Expert Seeds / Zamnesia | Feminisiert | 3 Stück 29,00 €; 5 Stück 45,00 € | Produktseite kennzeichnet den Typ ausdrücklich als feminisiert und nennt beide Packgrößen. Nicht auf Regular übertragbar. | https://www.zamnesia.de/3006-expert-seeds-blue-cheese-feminisiert.html |
| Blue Cheese – Blimburn Seeds | Feminisiert | 1/3/6/9 sowie 25; variable Preise | Direkte Seite weist den Typ als feminisiert aus. Trotz aktueller Preis- und Aktionsdarstellung kein Regular-Beleg. | https://blimburnseeds.de/blue-cheese/ |
| Blue Dream Regular – Nirvana Seeds / Genetiken.de | Regulär | 10 Samen; 30,00 € | Erneute Kategorieprüfung: Filter zeigen Regular und 10 Seeds; Produktkarte zeigt „Weiterlesen“, nicht „In den Warenkorb“. Aktuelle Lieferbarkeit bleibt unbestätigt. | https://genetiken.de/produktkategorie/breeder/nirvana-seeds/?filter_packungsgroesse=10-seeds |
| Blue Dream Regular – Nirvana Seeds / Hanfjack | Regulär | 10 Samen; 31,03 € | Direkte Produktseite bestätigt regulären Typ und 10 Stück, kennzeichnet das Angebot aber als „Nicht vorrätig“. | https://hanfjack.de/produkt/nirvana-seeds-blue-dream-regulaer/ |

#### Ergebnis dieser Prüfrunde

- **Blue Cheese Regular:** Noch kein belastbarer 5er-/10er-Direktbeleg. Es gibt Seiten mit passender Sorte und Packgrößen, doch die geprüften Seiten kennzeichnen die Angebote als feminisiert oder weisen den Regular-Typ nicht eindeutig aus. Diese Preise werden deshalb nicht in den Regular-Vergleich eingerechnet.
- **Blue Dream Regular:** Der 10er-Preis von 30,00 € bei Genetiken.de bleibt ein Kategoriepreis mit ungeklärtem Lagerstatus. Der direkte Hanfjack-Preis von 31,03 € ist explizit nicht verfügbar. Es gibt damit weiterhin keinen bestätigten, sicher lieferbaren Direktpreis in dieser Runde.
- Recherche dient nur dem öffentlichen Wettbewerbsvergleich. Keine Produktpreise oder Packvarianten im SEED³X-Katalog verändert; keine Bestände, Freigaben, Checkout-Funktionen, `main` oder Deployments geändert.


### 4.12 Erweiterung auf weitere reguläre Katalogsorten – 25.10.2026

Diese Runde prüft weitere Sortenfamilien aus dem SEED³X-Katalog. Aufgenommen werden nur Treffer, bei denen regulärer Typ, konkrete Packungsgröße und Preis explizit ausgewiesen sind. Verfügbarkeit wird separat bewertet. Gleichnamige Sorten verschiedener Züchter sind externe Preisreferenzen, kein Beleg identischer Genetik.

| Katalogfamilie / Händlerprodukt | Typ | Züchter / Händler | Packung | Sichtbarer Packpreis | Preis je Samen | Verfügbarkeit / Prüfergebnis | Quelle |
|---|---|---|---:|---:|---:|---|---|
| Blueberry Regular Seeds – 10 | Regulär | Nirvana Seeds / Genetiken.de | 10 | 25,00 € | 2,50 € | Direkte Produktseite bestätigt Regular, 10 Seeds und den Packpreis. Die zugehörige Kategorieansicht zeigt „In den Warenkorb“ für den Artikel. Als verfügbarer Händlerindikator dokumentiert; Lagerbestand und Versandbedingungen können sich ändern. | https://genetiken.de/produkt/blueberry-regular-seeds-10-2/ |
| Blueberry regulär | Regulär | Nirvana Seeds / Hanfjack | 10 | 25,68 € | 2,57 € | Direkte Produktseite bestätigt 10 Stück und regulären Typ, weist aber „Lieferzeit: 5–10 Tage (Vorbestellung)“ aus. Daher nicht als sofort lieferbarer Lagerartikel behandeln. | https://hanfjack.de/produkt/nirvana-seeds-blueberry-regulaer/ |

#### Weitere geprüfte Kandidaten – nicht in die bestätigte Preiszeile übernommen

| Katalogfamilie / Kandidat | Suchergebnis | Grund für Nichtaufnahme als bestätigten Preisanker |
|---|---|---|
| Northern Lights Kush – regulär | Treffer für „Northern Light Regular Seeds – 10“ bei Nirvana Seeds / Genetiken.de: 25,00 €; die Kategorie zeigt eine Warenkorb-Aktion. | Der Händlername lautet „Northern Light“, der SEED³X-Katalogeintrag „Northern Lights Kush“. Ohne belastbaren Sortenidentitätsnachweis wird der Preis nicht auf die abweichend benannte Katalogfamilie übertragen. Quelle: https://genetiken.de/produktkategorie/breeder/nirvana-seeds/?filter_packungsgroesse=10-seeds |
| Bruce Banner – regulär | Ein regulärer Bruce-Banner-Eintrag erscheint in einer Kategorieübersicht für reguläre Samen. | Im geprüften Treffer waren Packungsgröße, konkreter zugeordneter Packpreis und Verfügbarkeit nicht gemeinsam eindeutig bestätigt. Kein Preisanker übernommen. Quelle: https://blimburnseeds.de/regular-seeds/ |
| Super Lemon Haze – regulär | Der gefundene direkte Treffer war Super Lemon Haze von Bloom Bulk Seeds, feminisiert, 10er-Pack. | Falscher Samentyp; ausgeschlossen. Quelle: https://bloomtech.de/super-lemon-haze-bloom-bulk-seeds-fem-10er-pack |

#### Ergebnis dieser Runde

- **Blueberry Regular** erhält zwei getrennte 10er-Preisanker: 25,00 € bei Genetiken.de (Warenkorb-Aktion in der Kategorie) und 25,68 € bei Hanfjack (Vorbestellung, 5–10 Tage).
- **Northern Lights Kush** bleibt offen, weil der gefundene Preis zur anders benannten Sorte „Northern Light“ gehört und die Sortenidentität nicht belegt ist.
- **Bruce Banner Regular** bleibt offen, da Packungsgröße, Packpreis und Verfügbarkeit im geprüften Treffer nicht zusammen eindeutig nachgewiesen wurden.
- **Super Lemon Haze** bleibt für den Regular-Vergleich offen; der gefundene 10er-Treffer ist feminisiert und darf nicht übertragen werden.
- Diese Ergänzung dokumentiert nur öffentliche Händlerpreise. Es wurden keine SEED³X-Preise, Einkaufskosten oder Margen berechnet und keine Katalogdaten, Bestände, Freigabestatus, Checkout-Funktionen, `main` oder Deployments verändert.


### 4.13 Weitere direkte Regular-Angebote – White Widow und Bruce Banner – 25.10.2026

Diese Runde erweitert die Prüfung um weitere reguläre Katalogsorten. Packpreis und Stückpreis werden nur aus klar ausgewiesener Packungsgröße berechnet. „Lagernd“, Vorbestellung und Nichtverfügbarkeit werden nicht gleichgesetzt. Vergleichsprodukte verschiedener Züchter bleiben getrennte Referenzen.

| Katalogfamilie / Händlerprodukt | Typ | Züchter / Händler | Packung | Sichtbarer Packpreis | Preis je Samen | Verfügbarkeit / Prüfergebnis | Quelle |
|---|---|---|---:|---:|---:|---|---|
| Bruce Banner Regular | Regulär | Philosopher Seeds / Philosopher Seeds DE | 5 | 23,10 € Angebot (vorher 33,00 €) | 4,62 € Angebot (6,60 € vorher) | Direkte Produktseite kennzeichnet die 5er-Variante als „LAGERND“ und zeigt eine Warenkorb-Aktion. Versandkosten werden ab 9,50 € angegeben; der Seitenhinweis nennt Versand für Reino Unido, daher Versand nach Deutschland vor späterer Nutzung separat klären. | https://philosopherseeds.de/bruce-banner-p-470.html |
| Bruce Banner Regular | Regulär | Philosopher Seeds / Philosopher Seeds DE | 10 | 42,00 € Angebot (vorher 60,00 €) | 4,20 € Angebot (6,00 € vorher) | Direkte Produktseite kennzeichnet die 10er-Variante als „LAGERND“. Versand nach Deutschland ist in der geöffneten Ansicht nicht eindeutig bestätigt. | https://philosopherseeds.de/bruce-banner-p-470.html |
| White Widow Regular | Regulär | Barney’s Farm | 5 | 32,00 € | 6,40 € | Offizielle Züchterseite nennt Typ „Regular“ und die 5er-Variante. Im ausgelesenen Ausschnitt war kein eindeutiger Lagerstatus sichtbar; Preisanker mit Verfügbarkeitsvorbehalt. | https://www.barneysfarm.de/white-widow-_-regular-849 |
| White Widow Regular | Regulär | Barney’s Farm | 10 | 59,00 € | 5,90 € | Offizielle Züchterseite nennt Typ „Regular“ und die 10er-Variante. Im ausgelesenen Ausschnitt war kein eindeutiger Lagerstatus sichtbar; Preisanker mit Verfügbarkeitsvorbehalt. | https://www.barneysfarm.de/white-widow-_-regular-849 |
| White Widow Regular | Regulär | Nirvana Seeds / Hanfjack | 10 | 25,68 € | 2,57 € | Direkte Produktseite nennt 10 Stück, regulären Typ und den Preis; Lieferzeit ist mit 5–10 Tagen als Vorbestellung angegeben, also kein bestätigter Sofortbestand. | https://hanfjack.de/produkt/nirvana-seeds-white-widow-regulaer/ |
| White Widow Regular | Regulär | Royal Queen Seeds | 10 | 60,00 € | 6,00 € | Offizielle Produktseite zeigt 10er-Variante und Preis, meldet aber zugleich „Benachrichtige mich, wenn das Produkt wieder auf Lager ist“. Daher als nicht verfügbarer Preisindikator führen. | https://www.royalqueenseeds.de/regulaere-cannabissamen/541-white-widow-regular.html |
| White Widow Regular | Regulär | White Label / Sensi Seeds | 10 | 42,50 € | 4,25 € | Offizielle Produktseite nennt 10 Samen und den Stückpreis, kennzeichnet das Produkt aber ausdrücklich als „Nicht auf Lager“. Nicht als verfügbares Angebot behandeln. | https://sensiseeds.com/de/hanfsamen/whitelabel/white-widow |

#### Ergebnis dieser Runde

- **Bruce Banner Regular** hat auf einer direkten Produktseite klar ausgewiesene 5er- und 10er-Preise. Die Seite meldet beide Varianten als lagernd, allerdings muss die Lieferbarkeit nach Deutschland wegen des Versandhinweises vor einer späteren Nutzung geprüft werden.
- **White Widow Regular** hat weitere konkrete Preisanker von Barney’s Farm (5er und 10er, Lagerstatus in der sichtbaren Ansicht offen) sowie Nirvana/Hanfjack (10er, Vorbestellung). Die Angebote von RQS und Sensi Seeds sind ausdrücklich als nicht auf Lager markiert.
- Der zuvor dokumentierte White-Widow-Preis von Eden Seeds (41,00 € für 10 Samen, „Bald wieder verfügbar“) bleibt ein separater historischer/verfügbarkeitsbeschränkter Preisindikator; er wird nicht mit den neuen Angeboten vermischt.
- Für **Super Lemon Haze Regular** wurde in dieser Runde kein belastbarer Regular-Treffer mit konkretem Packpreis und Verfügbarkeit bestätigt. Der gefundene 10er-Treffer von Bloom Bulk Seeds ist feminisiert und daher ausgeschlossen.
- Diese Ergänzung dokumentiert öffentliche Händlerpreise, keine SEED³X-Verkaufspreise. Keine Einkaufskosten oder Margen berechnet; Katalogpreise, Packvarianten, Bestände, Freigaben, Checkout, `main` und Deployments bleiben unverändert.
