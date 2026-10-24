# SEED³X – Datenqualitätsprüfung des Katalogs

Stand: 24.10.2026  
Branch: `feature/premium-storefront-v1`  
Umfang: Struktur- und Quellenabgleich zwischen `product-data/products.csv` und `src/data/seed-products.json`. Keine Produktfreigabe und keine Veröffentlichung.

## Festgestellte Befunde

1. **Katalogumfang:** Beide Quellen sind auf 1.269 Datensätze ausgelegt.
2. **Interne IDs:** Die IDs `seed-0001` bis `seed-1269` sind Import-IDs und keine IDs aus dem Quelldokument.
3. **Kernfelder:** Namen, Quelldetails und Status sind in CSV und JSON vorhanden. Der Abgleich muss sie künftig pro ID identisch halten.
4. **Kategorien nicht synchronisiert:** Die CSV-Kategorie-Spalte ist leer, während JSON für alle Datensätze Kategorien enthält. Der Importbericht sagt zugleich, dass die Kategorie nicht direkt aus der PDF-Quelle übernommen wurde. Die Kategorien in JSON brauchen daher eine dokumentierte, überprüfbare Zuordnungsregel; sie dürfen nicht als wörtliche Quellangabe dargestellt werden.
5. **Bildreferenzen nicht synchronisiert:** Die CSV-Bildspalte ist leer, während JSON bei allen Datensätzen dieselbe Bildreferenz verwendet. Das ist ein gemeinsames Platzhalter-/Testbild, keine individuelle Bildzuordnung pro Datensatz. Vor einer späteren Freigabe sollte die Zuordnung explizit und nachvollziehbar gepflegt werden.
6. **Schreibvarianten:** Der vorhandene Namensvariantenbericht dokumentiert vier Gruppen mit Schreibweisen, die manuell geprüft werden sollten. Es werden keine Namen automatisch vereinheitlicht oder Datensätze zusammengeführt.
7. **Freigabestatus:** Die Datensätze bleiben `Entwurf`. Preise, Bestände und Verfügbarkeiten werden durch diese Prüfung weder ergänzt noch freigegeben.

## Technische Änderung

Das neue Skript `scripts/validate-catalog-consistency.mjs` prüft CSV-Format und Spaltenstruktur, doppelte/fehlende IDs, fehlende Datensätze in einer der beiden Quellen sowie Abweichungen bei Name, Quelldetails und Status. Bereits ausgefüllte Kategorie- und Bildfelder werden auf Widersprüche geprüft. Leere CSV-Kategorie-/Bildfelder bei gefülltem JSON werden als Warnung gemeldet, ebenso eine identische Bildreferenz für den gesamten Katalog.

Der bestehende Katalogvalidator bleibt erhalten. Der neue Abgleich wurde in den CI-Workflow aufgenommen, damit er bei zukünftigen Pushes und Pull Requests auf dem Branch ausgeführt wird.

## Grenzen / nächste Prüfungen

- Der GitHub-Connector konnte den aktuellen Lauf des Skripts nicht in einer lokalen Node-Umgebung ausführen; der frühere lokale Klonversuch scheiterte an fehlender Netzwerk-DNS-Auflösung. Der neue CI-Lauf ist deshalb der nächste unabhängige Ausführungsnachweis.
- Die Bilddatei unter `images/Mamba Test.png.WEBP` ist im Repository vorhanden, aber ihr tatsächlicher Inhalt, ihr Bildformat und ihre Eignung als allgemeine Referenz wurden hier nicht visuell verifiziert.
- Die vier Namensvarianten bleiben manuelle Prüfpunkte.
- Keine Änderungen an Produkttexten, Preisen, Bestand, Verfügbarkeit oder Freigabestatus; kein Merge, Deploy oder Live-Update.


## Ergänzende Prüfung: Kategorien und Bildpfade

Die 1.269 JSON-Einträge wurden gegen eine explizite Zuordnung der im Quelldetail dokumentierten Typen geprüft:

- `Typ laut PDF: Automatic Flowering` → `Autoflowering`
- `Typ laut PDF: Feminized` → `Feminisierte Samen`
- `Typ laut PDF: Regular` → `Reguläre Samen`

Ergebnis des Daten-Snapshots: **423 Einträge je Zuordnung, keine Abweichungen**. Damit ist die Kategorie technisch konsistent mit dem importierten Typtext; die Kategorie ist dennoch eine normalisierte Zuordnung und kein wörtliches Originalfeld der PDF.

Zusätzlich wurde `scripts/validate-catalog-categories-and-images.mjs` ergänzt und in CI eingebunden. Es prüft die Zuordnung pro Eintrag, kontrolliert Repository-interne Raw-GitHub-Bildpfade auf eine entsprechende Datei im Branch und warnt bei einer einzigen gemeinsam verwendeten Bildreferenz. Der aktuelle Katalog hat eine eindeutige Bildreferenz für alle 1.269 Einträge. Das bestätigt keine individuelle Bildzuordnung und ersetzt keine visuelle Inhalts-/Formatprüfung.


## Ergänzende Prüfung: Binärsignaturen der Bilddateien

Der neue CI-Schritt `scripts/validate-image-assets.mjs` hat die Signaturen der vorhandenen Bilddateien anhand ihrer Dateiinhalte geprüft. Die erkannten Formate stimmen mit der jeweils letzten Dateiendung überein; die ungewöhnlichen zusammengesetzten Dateinamen lösen jedoch bewusst Warnungen aus:

| Datei | Erkanntes Format | Größe |
|---|---:|---:|
| `Mamba Test.png.WEBP` | WebP | 749.426 Byte |
| `White 1.png.JPG` | JPEG | 63.622 Byte |
| `seedx-background.png.JPG` | JPEG | 118.530 Byte |
| `seedx-banner.png.PNG` | PNG | 574.704 Byte |
| `seedx-logo.png.PNG` | PNG | 1.920.233 Byte |

Die vom Katalog referenzierte Datei `Mamba Test.png.WEBP` ist vorhanden und nicht leer. Der Signaturcheck bestätigt das Dateiformat, aber nicht die visuelle Eignung oder die korrekte Zuordnung zu einem bestimmten Datensatz. Eine automatische Umbenennung wurde vermieden, damit keine Referenzen unbeabsichtigt brechen.

## Aktueller CI-Nachweis

Der Lauf [40070347449](https://github.com/lejoker3251-dot/GreenGrow-/actions/runs/40070347449) auf `feature/premium-storefront-v1` ist erfolgreich. Der Job führte Katalogvalidator, CSV/JSON-Abgleich, Kategorien-/Bildpfadprüfung, Bildsignaturprüfung, Astro-Prüfung, statischen Build und Browser-Regressionstests aus. Die Prüfungen protokollieren weiterhin manuelle Hinweise zur leeren CSV-Kategorie-/Bildspalte und zur gemeinsamen Bildreferenz.

Es wurden keine Preise, Bestände oder Verfügbarkeiten ergänzt. Alle Einträge bleiben Entwürfe. Kein Merge, Deploy oder Live-Update.
