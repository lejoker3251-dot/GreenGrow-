# Shop-Produktdatenmodell

## Zweck und Sicherheitsregeln

Der Katalog ist weiterhin ein Entwurfskatalog. Ein Feld mit `null` bedeutet: kein freigegebener Preis vorhanden. Ein leeres `packVariants`-Array bedeutet: für dieses Produkt sind noch keine Packungsvarianten zur Anzeige oder Bestellung freigegeben.

- Währung: EUR
- Preisformat: Preis pro Packung
- Geplante Packungsgrößen: 1, 3, 5 und 10 Samen; keine Verfügbarkeitszusage
- `releaseStatus`: `Entwurf`, `Prüfung`, `Freigegeben` oder `Gesperrt`
- Checkout und Zahlungen bleiben deaktiviert
- Keine Preise, Lagerbestände oder Freigaben aus Annahmen ableiten

## Felder pro Produkt

- `priceEUR`: Zahl oder `null`; nur für einen freigegebenen Einzelpreis verwenden.
- `packVariants`: Array freigegebener bzw. separat geprüfter Varianten. Derzeit bleibt es für alle Produkte leer, bis produktbezogene Varianten bestätigt wurden.
- `releaseStatus`: expliziter redaktioneller Freigabestatus. `Freigegeben` allein schaltet keine Zahlung frei.

## Form einer später geprüften Variante

```json
{
  "quantity": 3,
  "priceEUR": null,
  "availability": "nicht-bestaetigt",
  "releaseStatus": "Entwurf"
}
```

Erst nach tatsächlicher Produktprüfung darf eine Variante mit Preis und Verfügbarkeit befüllt werden. Die Konfiguration in `src/data/shop-pricing-config.json` bleibt die maßgebliche globale Sperre für Checkout und Zahlungen.
## Interne Preisvergleichsmatrix

Die externe Wettbewerbsrecherche und die Regeln zur Sortierung nach feminisierten, autoflowering und regulären Samen sind in [`docs/shop-preisvergleich-matrix.md`](./shop-preisvergleich-matrix.md) dokumentiert. Dort aufgeführte Händlerpreise sind ausschließlich interne Vergleichswerte und dürfen nicht als SEED³X-Preise übernommen werden. Produktpreise, Packungsvarianten, Premium-Status, Checkout und Zahlungen bleiben bis zur separaten Prüfung und Freigabe unverändert.
