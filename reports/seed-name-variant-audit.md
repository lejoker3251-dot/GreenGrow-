# SEED³X – Katalog-Namensprüfung

Stand: 23.10.2026  
Quelle: `src/data/seed-products.json` auf `feature/premium-storefront-v1`  
Zweck: redaktionelle Prüfhinweise, keine automatische Produktzusammenführung.

## Ergebnis

- Datensätze geprüft: **1.269**
- Eindeutige IDs: **1.269**
- Unterschiedliche normalisierte Namensgruppen: **423**
- Gruppen mit genau einem Eintrag je Kategorie (Autoflowering, Feminisierte Samen, Reguläre Samen): **423 von 423**
- Gruppen mit Schreibweisen, die sich nach Normalisierung unterscheiden: **4**
- Automatisch geänderte Produktnamen oder zusammengeführte Einträge: **keine**

Die drei Einträge eines normalisierten Namens sind derzeit jeweils drei unterschiedliche Quelltypen/Kategorien. Sie gelten deshalb nicht automatisch als Duplikate und bleiben als separate Datensätze bestehen.

## Manuell zu prüfende Schreibvarianten

| Normalisierter Name | Produkt-ID | Originalname | Kategorie | Quelltyp laut importierter Liste |
|---|---|---|---|---|
| 24 k kosher kush | seed-0001 | 24 K Kosher Kush | Autoflowering | Automatic Flowering |
| 24 k kosher kush | seed-0002 | 24 K Kosher kush | Feminisierte Samen | Feminized |
| 24 k kosher kush | seed-0003 | 24 K Kosher Kush | Reguläre Samen | Regular |
| kush berry | seed-0598 | Kush Berry | Autoflowering | Automatic Flowering |
| kush berry | seed-0599 | Kush berry | Feminisierte Samen | Feminized |
| kush berry | seed-0600 | Kush Berry | Reguläre Samen | Regular |
| power plant | seed-0886 | Power plant | Autoflowering | Automatic Flowering |
| power plant | seed-0887 | Power Plant | Feminisierte Samen | Feminized |
| power plant | seed-0888 | Power Plant | Reguläre Samen | Regular |
| top 44 | seed-1198 | Top 44 | Feminisierte Samen | Feminized |
| top 44 | seed-1199 | Top-44 | Autoflowering | Automatic Flowering |
| top 44 | seed-1200 | Top-44 | Reguläre Samen | Regular |

## Empfohlene nächste Schritte

1. Die vier Namensgruppen anhand der Original-PDF bzw. einer verlässlichen Lieferantenquelle prüfen.
2. Erst nach menschlicher Freigabe eine einheitliche Anzeigeschreibweise festlegen. Quellname und ursprüngliche Produkt-ID müssen nachvollziehbar bleiben.
3. Keine Preis-, Lager-, Verfügbarkeits- oder Sortenmerkmale ergänzen, solange sie nicht belegt sind.
4. Die drei Kategorien je Namensgruppe nicht zusammenführen: Quelltypen können unterschiedliche Produkteigenschaften bezeichnen.

## Grenzen der Prüfung

Die Normalisierung ignoriert Groß-/Kleinschreibung, Leerzeichen und Satzzeichen, um Kandidaten zu finden. Sie beweist nicht, dass zwei Datensätze dasselbe Produkt sind. Die Prüfung wertet keine Produktidentität, Lieferanten-SKUs oder externen Quellen aus.
