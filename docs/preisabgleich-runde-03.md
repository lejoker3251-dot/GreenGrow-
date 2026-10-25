# SEED³X – Sorten-/Preisabgleich, Runde 03

**Prüfdatum:** 25.10.2026  
**Repository/Branch:** `lejoker3251-dot/GreenGrow-` / `feature/premium-storefront-v1`  
**Status:** Fortgesetzte Marktprüfung. Dokumentation בלבד; keine Katalogänderungen, Preisimporte oder Veröffentlichung.

## 1. Belastbare Preisbelege aus Händlerübersicht

Die deutsche Händlerübersicht Bloomtech zeigt je Produkt den Züchter, Typ, Packungsgröße, aktuellen Preis, teilweise Lagerbestand und Stückpreis. Die Übersicht ist ein nützlicher Entdeckungsindex; vor finaler Verwendung im Referenzregister soll die jeweilige Produktdetailseite nochmals geprüft werden.

| Katalogfamilie | Katalogtyp, der durch den Treffer gestützt wird | Konkretes Händlerangebot | €/Samen | Status |
|---|---|---:|---:|---|
| Afghanica | Feminisierte Samen | Anesia, 3er-Pack €26,32 (statt €32,90) | €8,77 | **Guter Preisanker**, Aktionspreis; [Bloomtech – Sortiment](https://bloomtech.de/cannabis-samen) |
| Amnesia Haze | Feminisierte Samen | Barney’s Farm, 3er-Pack €27,19 (statt €33,99) | €9,06 | **Preisanker**, Aktionspreis; Lageranzeige 36 Stück im Index; [Bloomtech – Sortiment](https://bloomtech.de/cannabis-samen) |
| Amnesia Haze | Feminisierte Samen | Royal Queen Seeds, 3er-Pack €26,90 | €8,97 | **Vergleichsanker**, Lageranzeige 2 Stück im Index; [Bloomtech – Sortiment](https://bloomtech.de/cannabis-samen) |
| Amnesia | Feminisierte Samen | Criminal Seeds, 3er-Pack €14,99 (statt €19,99) | €5,00 | **Nur für Amnesia**, nicht automatisch Amnesia Haze; [Bloomtech – Sortiment](https://bloomtech.de/cannabis-samen) |
| Amnesia Haze | Feminisierte Samen | Bloom Bulk Seeds, 10er-Pack €24,90 | €2,49 | **Separater Budget-/Bulk-Anker**; Lageranzeige 2 Stück; nicht mit Markenprodukten unkommentiert mitteln; [Bloomtech – Sortiment](https://bloomtech.de/cannabis-samen) |

### Vorläufige Auswertung für Amnesia Haze feminisiert

Für drei Angebote mit gleicher Sortenbezeichnung und gleichem Saatguttyp (Barney’s Farm 3er €27,19; Royal Queen Seeds 3er €26,90; Bloom Bulk Seeds 10er €24,90) ist eine gemeinsame Mittelwertbildung ohne Packgrößen-/Breeder-Gewichtung nicht sachgerecht. Die zwei 3er-Angebote ergeben einen einfachen Mittelwert von **€27,045 bzw. gerundet €27,05 pro 3er-Pack**. Das ist ein Mittelwert der zwei beobachteten 3er-Angebote, kein allgemeiner Marktmittelwert und kein Nachweis für die eigene Züchtervariante.

## 2. Familienabweichung 423 vs. 424 – konkreter Kandidat

Die technische Normalisierung von Groß-/Kleinschreibung und Leerzeichen liefert 424 eindeutige Namensgruppen. Im Katalog stehen sowohl **„Alaskan Thunder Fuck“** als auch **„ATF (Alaskan Thunder Fuck)“**. Das ist ein plausibler Alias-Kandidat und könnte die Differenz erklären; eine automatische Zusammenführung wäre aber erst zulässig, wenn Katalogquelle, Züchter oder Produktunterlagen bestätigen, dass es dieselbe Sortenfamilie ist. Bis dahin bleiben es zwei getrennte Kataloggruppen und die erwartete Zahl 423 ist nicht als verifiziert anzusehen.

Ein zweiter Risikofall ist **„24 K Kosher Kush“**: Ein Treffer für „24K Gold / Kosher Tangie“ ist nicht genug, um den Namen als identisch zu behandeln. Ebenso sind „Amnesia“ und „Amnesia Haze“ getrennte Familien.

## 3. Nächste Prüfregeln

- Zuerst Detailseiten für die zwei Amnesia-Haze-3er-Angebote öffnen und Preis, Packung, Typ, Bestand und Versanddetails bestätigen.
- Danach alphabetisch mit den nächsten Familien fortfahren. Wo ein Händler viele Katalognamen führt, dürfen mehrere konkrete Produktbelege in einem Durchgang erfasst werden, aber nur bei exakter Sorten-/Typübereinstimmung.
- Marktanker nach Breeder/Markenpositionierung und Packgröße gruppieren. Budget-/Bulk-Angebote separat ausweisen, nicht in einen einzigen ungewichteten Mittelwert mischen.
- Die 423/424-Abweichung bis zum Beleg des Alias nicht durch Datenänderung „lösen“.

## Quellenhinweis

Die Bloomtech-Sortimentsübersicht weist zum Abrufzeitpunkt u. a. aus: Afghanica – Anesia feminisiert 3er €26,32; Amnesia Haze – Barney’s Farm feminisiert 3er €27,19; Amnesia Haze – Royal Queen Seeds feminisiert 3er €26,90; Amnesia Haze – Bloom Bulk Seeds feminisiert 10er €24,90; Amnesia – Criminal Seeds feminisiert 3er €14,99. Preise und Bestände können sich ändern. Quelle: [Bloomtech – Cannabis-Samen](https://bloomtech.de/cannabis-samen).

**Sicherheitsgrenze:** `src/data/seed-products.json`, Preisvorschlags-CSV, Checkout, Zahlungen, `main` und Cloudflare wurden nicht verändert.
