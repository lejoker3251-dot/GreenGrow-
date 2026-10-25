# SEED³X – Variantenmodell und GTIN-Metadaten

- Branch: `feature/premium-storefront-v1`
- Status: Entwurf für isolierte Vorbereitung
- Geltungsbereich: Katalogidentität, Variantenidentität, Herkunft/Prüfung von GTINs und Vertrauensgrenzen der Preisvalidierung.

## Grundregeln

1. Bestehende `productId`-Werte (`seed-0001` bis `seed-1269`) bleiben stabil und werden nicht ersetzt.
2. Jede kaufbare Packvariante erhält eine deterministische `variantId`, die Produkt-ID, Typcode und Packungsgröße enthält.
3. GTINs sind optionale, nachweisgebundene Metadaten. Fehlende GTIN bedeutet `null`; niemals eine EAN erfinden oder aus der internen ID ableiten.
4. Preise werden für Berechnungen in ganzzahligen Euro-Cent repräsentiert.
5. Ein Warenkorb ist nicht vertrauenswürdig. Clientseitig übermittelte Namen, Bilder und Preise sind keine Preisquelle.
6. Checkout und Zahlungen bleiben deaktiviert. Dieses Modell ist keine Freigabe zum Verkauf.

## Variantenschlüssel

| Katalogkategorie | Typcode |
|---|---|
| Autoflowering | `AF` |
| Feminisierte Samen | `FEM` |
| Reguläre Samen | `REG` |

Format: `<productId>--<typeCode>--P<packSize>`, z. B. `seed-0001--AF--P3`. Dieses Beispiel veranschaulicht das Format; es wird noch nicht in Produktdatensätze geschrieben.

## Logisches Variantenschema

```js
{
  variantId: "seed-0001--AF--P3",
  productId: "seed-0001",
  productType: "Autoflowering",
  packSize: 3,
  currency: "EUR",
  priceCents: 1990,
  gtin: null,
  gtinStatus: "not-provided",
  gtinSource: null,
  gtinCheckedAt: null
}
```

`priceCents` und Beispielpreis dienen nur der Schemaillustration. Bei einer späteren Katalogmigration müssen sie aus dem tatsächlich gespeicherten Variantenpreis abgeleitet werden. Keine Beispielwerte als neue Produktpreise übernehmen.

## GTIN-Prüfstatus

- `not-provided`: kein Code im Katalog vorhanden.
- `unverified`: Code wurde gemeldet, aber noch nicht gegen eine belastbare Quelle geprüft.
- `verified-supplier`: anhand dokumentierter Lieferanten-/Herstellerquelle geprüft.
- `verified-gs1`: Herkunft/Zuordnung über eine geeignete GS1-Quelle geprüft.

Zu dokumentierende Quellenmetadaten: `gtinSource` (URL oder Belegreferenz), `gtinCheckedAt` (ISO-Datum), optional Prüfer/Notiz. Ein Status `verified` darf nicht ohne Nachweis gesetzt werden. Keine GTIN kaufen oder zuteilen ohne gesonderte Zustimmung.

## Serverseitige Preisvalidierung

- Nur Produkt-ID + Typ + Packungsgröße aus einem vertrauenswürdigen Katalogserver-Lookup verwenden.
- Menge als Integer von 1 bis 99 validieren.
- Preis immer aus `packVariants` im Katalog lesen; vom Client übermittelte `unitPrice`, Name und Zwischensumme niemals übernehmen.
- Geldwerte in Cent berechnen; keine Float-Preise für Summen verwenden.
- Unbekannte IDs, nicht verfügbare/unfreigegebene Varianten, ungültige Mengen und nicht auflösbare Preise fail-closed ablehnen.
- Die isolierte Funktion in `src/lib/catalog-pricing.js` ist ein Test-/Vorbereitungsschritt, noch kein aktiver Bestell-Endpunkt.
