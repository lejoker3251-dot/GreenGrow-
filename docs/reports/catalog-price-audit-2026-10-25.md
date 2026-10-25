# Katalog- und Preis-Audit – 25.10.2026

## Ergebnis

**Status: bestanden für die automatisierten Struktur- und Staffelpreisprüfungen.**  
Geprüfter Katalogstand: 1.269 Produkte auf `feature/premium-storefront-v1`.

| Prüfung | Ergebnis |
|---|---:|
| Produkte / eindeutige, lückenlose IDs `seed-0001` bis `seed-1269` | 1.269 / bestanden |
| Kategorien | 3 × 423 Einträge |
| Erwartete Packungsgrößen je Produkt | 1, 3, 5 und 10 Samen |
| Fehlende oder `null`-Preisfelder (Basispreis und Varianten) | 0 |
| Preisfelder mit 0 oder negativem Wert | 0 |
| Packungspreise, die nicht streng mit der Packungsgröße steigen | 0 |
| Fälle, in denen der rechnerische Stückpreis bei einer größeren Packung steigt (Toleranz 0,005 EUR) | 0 |
| Checkout / Zahlungen | deaktiviert |

## Konkrete Prüfliste auffälliger Produkt-IDs

**Keine IDs aus den automatisierten Preisregeln gemeldet.** Die Trefferlisten für fehlende/null Preise, Null-/Negativpreise, nicht streng steigende Packungspreise und steigende Stückpreise sind jeweils leer (`[]`). Daher gibt es aus diesem Prüflauf keine Produkt-ID, die wegen dieser Regeln manuell nachbearbeitet werden muss.

## Nachweis

- Prüfskript: `scripts/check-shop-data.mjs`
- CI-Workflow ergänzt, damit das Prüfskript tatsächlich ausgeführt wird: [Commit 7b86132](https://github.com/lejoker3251-dot/GreenGrow-/commit/7b8613206b1430e687b8b58651dd3d1a002dea6e)
- CI-Lauf „Branch Build and Tests“: [Run 40210045210](https://github.com/lejoker3251-dot/GreenGrow-/actions/runs/40210045210) – erfolgreich
- Preview-Deployment desselben Commits: [Run 40210045209](https://github.com/lejoker3251-dot/GreenGrow-/actions/runs/40210045209) – erfolgreich

## Grenzen der Aussage

Dieser Audit prüft Datenintegrität und mathematische Staffelpreis-Konsistenz. Er bestätigt **nicht**, dass die Preise marktüblich, vom Anbieter bestätigt oder rechtlich freigegeben sind. Ebenso sind Sortenmerkmale, Herstellerquellen und tatsächlicher Lagerbestand nicht durch diesen Preis-Audit verifiziert. Produktdaten und Freigabestatus werden durch den Audit nicht geändert. Checkout und Zahlungen bleiben deaktiviert.
