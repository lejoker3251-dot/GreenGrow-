# SEED³X – Importbericht zur PDF-Produktliste

## Quelle
- Quelldatei: `Seed List Full .pdf`
- Branch: `feature/premium-storefront-v1`
- Verarbeitung: automatischer Textauszug mit PyMuPDF; keine OCR erforderlich.

## Ergebnis
- 32 PDF-Seiten verarbeitet.
- 1.269 Zeilen in `products.csv` übernommen.
- 427 unterschiedliche Produktnamens-Schreibweisen; Schreibweisen aus der Quelle wurden nicht automatisch vereinheitlicht.
- 423 Zeilen je Typ: `Automatic Flowering`, `Feminized` und `Regular`.
- CSV-Prüfung: 1.269 Datensätze, eindeutige interne IDs, Namen und Typen vorhanden.

## Feldzuordnung
- `name`: aus der PDF-Spalte „Naam“ übernommen.
- `details`: Typ aus der PDF-Spalte „Type“, als `Typ laut PDF: ...` gespeichert.
- `id`: interne fortlaufende Import-ID (`seed-0001` bis `seed-1269`), keine Quell-ID.
- `status`: alle Datensätze auf `Entwurf` gesetzt.

## Nicht aus der Quelle ableitbar
`category`, `description`, `price`, `currency`, `stock` und `image` bleiben leer. Diese Werte müssen aus einer verlässlichen zusätzlichen Quelle ergänzt und geprüft werden. Keine Datensätze sind durch diesen Import für die Veröffentlichung freigegeben.

## Grenzen der Prüfung
Die automatische Prüfung bestätigt die technische Extraktion und das CSV-Format. Sie ersetzt keine fachliche Prüfung von Produktnamen, Rechtslage, Lieferbarkeit, Preisen oder Freigabe zur Veröffentlichung.
