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

## 4. Erste externe Preisanker

Die folgenden Beispiele sind ein **erster, nicht vollständig normalisierter Marktsnapshot**. Sie stammen aus öffentlich auffindbaren Händlerseiten. Angebots-/Listenpreis, konkrete Variante und Packungsgröße müssen vor einer finalen Kalkulation erneut auf der jeweiligen Produktseite geprüft werden.

| Händler / Produkt | Typ | Packung laut Quelle | Preis-Snapshot | Verwendung / Einschränkung |
|---|---|---:|---:|---|
| Sensi Seeds – Northern Lights #5 x Haze, feminisiert | Feminisierte Samen | 3+1 Samen | 48,38 €; im Suchauszug ca. 16,13 €/Samen | Nicht 1:1 mit einer 3er-Packung vergleichen; Aktions-/Referenzpreis auf Produktseite erneut prüfen |
| Dutch Passion – Skunk #1 | Reguläre Samen | 10 Samen | 29,95 €; rechnerisch 3,00 €/Samen gerundet | Nur Referenz für reguläre Samen und 10er-Packung |
| Dutch Passion – Hollands Hope | Feminisierte Samen | 1 Samen | 12,95 € | Einzel-Samen-Referenz; nicht direkt mit 3er-/5er-/10er-Packs vergleichbar |

### Quellen

- Sensi Seeds, Northern Lights #5 x Haze (deutsche Produktseite): https://sensiseeds.com/de/feminisierte-samen/sensi-seeds/northern-lights-5-x-haze-weiblich
- Dutch Passion, Skunk #1 (reguläre Samen): https://dutch-passion.com/de/hanfsamen/skunk-1
- Dutch Passion, Hollands Hope (feminisiertes Saatgut): https://dutch-passion.com/de/hanfsamen/hollands-hope
- Royal Queen Seeds, feminisierte Samen – Kategorie zur weiteren Erhebung passender Produkt-/Packungsdaten: https://www.royalqueenseeds.de/33-feminisierte-hanfsamen
- Royal Queen Seeds, Autoflowering-Samen – Kategorie zur weiteren Erhebung passender Produkt-/Packungsdaten: https://www.royalqueenseeds.de/34-autoflowering-hanfsamen

Die Preisangaben sind Momentaufnahmen aus Suchauszügen und können sich durch Rabatte, gewählte Varianten oder Änderungen der Händlerseiten unterscheiden. Sie sind keine bestätigten, dauerhaften Listenpreise. Bei der nächsten Erhebungsrunde sind Produktseite, ausgewählte Packungsgröße, Listenpreis, Angebotspreis und Prüfdatum direkt zu dokumentieren.

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
