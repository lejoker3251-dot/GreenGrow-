# Isolierter Test der gemeinsamen Bestandslogik

- **Branch:** `test/inventory-ean-pricing-2026-10-25`
- **Scope:** ausschließlich Test-/Referenzlogik; keine Shop- oder Checkout-Integration.
- **Bestandseinheit:** einzelne, lose Samen je Produkt.

## Regeln

1. Packungsoptionen sind keine getrennten Lagerbestände.
2. Bedarf = `Packungsgröße × Anzahl der bestellten Packungen`.
3. Mehrere Warenkorbzeilen derselben Sorte werden vor der Bestandsprüfung addiert.
4. Eine Bestellung wird vollständig abgelehnt, wenn eine Position nicht ausreichend Bestand hat; es erfolgt keine Teilbuchung.
5. Gleichzeitige Reservierungen müssen serverseitig atomar ausgeführt werden, damit die Summe bestätigter Bestellungen den verfügbaren Bestand nicht überschreitet.

## Was der isolierte Test belegt

Die Node-Tests prüfen die Mengenberechnung, das Zusammenfassen gleicher Produkt-IDs, ungültige Eingaben, die Ablehnung einer Überbestellung ohne Teilabzug und konkurrierende Aufrufe auf einem seriell arbeitenden In-Memory-Referenzmodell.

**Wichtige Grenze:** Der In-Memory-Test beweist keine Datenbank- oder Produktions-Atomizität. Vor einer Preview-Integration muss feststehen, welcher dauerhafte serverseitige Speicher verwendet wird und wie eine atomare Reservierung dort umgesetzt und unter Parallelität getestet wird. Eine einfache JavaScript-Sperre im Prozess reicht bei mehreren Worker-Instanzen nicht aus.

## Ausführung

```sh
npm run test:inventory
```

Dieser Schritt schaltet weder Checkout noch Zahlungen frei und ändert keine veröffentlichten Seiten.
