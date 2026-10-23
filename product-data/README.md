# SEED³X – Produktdaten

Dieser Ordner ist die zentrale Ablage für Produktlisten, die später in den SEED³X-Shop übernommen werden sollen.

## So verwendest du den Ordner

1. Öffne die Datei [products.csv](./products.csv).
2. Lade deine Produktliste als CSV hoch oder ersetze die Vorlage durch deine Datei. Alternativ kannst du eine Excel-Datei (.xlsx) hier ablegen.
3. Bewahre möglichst die Spaltenüberschriften bei. Wenn deine Liste andere Spalten verwendet, kann ich sie zuordnen.
4. Gib mir danach Bescheid, dass die Liste in `product-data/` liegt. Ich prüfe die Daten, melde fehlende oder widersprüchliche Angaben und bereite die Produktliste für den Shop vor.

## Empfohlene Spalten

- `id`: eindeutige Produktkennung (falls vorhanden)
- `name`: Produktname
- `category`: Kategorie, z. B. Gemüse, Kräuter, Blumen
- `description`: kurze Beschreibung
- `price`: Preis und Währung, falls bereits festgelegt
- `stock`: Lagerbestand, falls bekannt
- `image`: Dateiname oder Pfad eines Produktbilds, falls vorhanden
- `details`: weitere Angaben wie Aussaatzeit, Standort oder Pflege
- `status`: z. B. Entwurf oder freigegeben

**Wichtig:** Ein Eintrag in dieser Ablage veröffentlicht ein Produkt nicht automatisch. Ich prüfe die Liste zuerst und übernehme nur bestätigte Daten in die Shop-Implementierung. Unbekannte Preise, Bestände oder Eigenschaften werden nicht erfunden. Änderungen bleiben auf dem Entwicklungsbranch und werden nicht automatisch in die Produktion veröffentlicht.

## Dateiformat

CSV mit Kopfzeile; UTF-8 empfohlen. Wenn du Excel verwendest, kannst du auch eine `.xlsx`-Datei ablegen. Bitte keine Passwörter, Zugangstoken oder anderen Geheimnisse in diesen Ordner hochladen.
