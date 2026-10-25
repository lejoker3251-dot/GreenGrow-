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

### 4.3 Quellen der Preis-Snapshots

- CannaVergleich, Marktvergleich mit getrennter Packungsgröße und Preis je Samen: https://cannavergleich.com/
- Royal Queen Seeds, feminisierte Kategorie (The 2019, Super Boof u. a.): https://www.royalqueenseeds.de/33-feminisierte-hanfsamen
- Royal Queen Seeds, Autoflower-Kategorie (Sticky Queen Auto, Mexican Rush Auto u. a.): https://www.royalqueenseeds.de/34-autoflowering-hanfsamen
- Royal Queen Seeds, Bestseller-Kategorie (White Widow, 3 Samen ausgewählt): https://www.royalqueenseeds.de/besten-hanfsamen
- Dutch Passion, Passion #1 mit getrennten Packungsvarianten einschließlich 10 regulärer Samen: https://dutch-passion.com/de/hanfsamen/passion-1
- Dutch Passion, Shaman mit getrennten Packungsvarianten einschließlich 10 regulärer Samen: https://dutch-passion.com/de/hanfsamen/shaman
- Dutch Passion, reguläre Samen Kategorie: https://dutch-passion.com/de/regulare-cannabissamen
- Bloomtech, Royal Queen Seeds Produktübersicht (u. a. Blue Cheese feminisiert 3er-Pack, Green Gelato Auto 3er-Pack): https://bloomtech.de/Royal-Queen-Seeds

**Grenze der Erhebung:** Für reguläre Samen ist in dieser Runde noch kein verlässlich belegter, exakt passender 3er-Packpreis dokumentiert. Die 10er-Packungen sind ausdrücklich als abweichende Vergleichsgröße markiert und dürfen nicht als gleichwertiger 3er-Packvergleich behandelt werden. Auch die gleichen Sortennamen beweisen nicht automatisch identische Breeder-Genetik; das SEED³X-Katalogmodell enthält derzeit kein Breeder-Feld.

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
| Einkaufskosten SEED³X | Nur aus bestätigtem Lieferanten-/Einkaufsbeleg |
| Zielmarge / Zielpreis | Erst nach Bestätigung der Kosten und Freigabe der Kalkulationsregeln |
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
5. Einkaufskosten und Kosten je Packung aus echten Belegen ergänzen.
6. Kalkulation intern prüfen; erst danach einzelne SEED³X-Preise zur Freigabe vorlegen.

## 8. Technische Schutzregeln

Die bestehende Konfiguration in `src/data/shop-pricing-config.json` bleibt maßgeblich. Dieses Dokument ändert weder Produktpreise noch Freigabestatus, Varianten, Lagerbestand, Checkout oder Zahlungsfunktionen. Die Datenprüfung `npm run test:shop-data` muss nach Änderungen weiterhin erfolgreich sein; Build und Laufzeitdarstellung sind separat zu prüfen. Es wird durch dieses Dokument kein Deploy ausgelöst.
