# SEED³X – Sorten-/Preisabgleich, Runde 02

**Prüfdatum:** 25.10.2026  
**Branch:** `feature/premium-storefront-v1`  
**Status:** Rechercheunterlage; keine Preise in den Produktkatalog übernommen.

## 1. Ergebnis der Katalogprüfung

Der aktuelle Katalog `src/data/seed-products.json` enthält 1.269 Einträge. Die ersten Einträge zeigen, dass dieselbe Sortenbezeichnung teils mit unterschiedlichen Groß-/Kleinschreibungen vorkommt (z. B. „24 K Kosher Kush“ / „24 K Kosher kush“). Die Katalogkategorie und das Feld `details` beschreiben den Saatguttyp, aber die Produkte enthalten kein Breeder-Feld. Die Sortenfamilien-Zuordnung muss daher Schreibweisen normalisieren, die Typen aber separat halten. Eine Namensähnlichkeit reicht nicht für eine automatische Züchterzuordnung.

## 2. Direkt recherchierte Preisanker

| Katalogfamilie / möglicher Abgleich | Typ des gefundenen Angebots | Preis und Packung | Evidenz und Entscheidung |
|---|---|---|---|
| Acapulco Gold | Feminisiert – Barney’s Farm | 1 Samen €6,50; 3 €17,00; 5 €23,41; 10 €42,00; 25 €126,00 | Produktseite nennt Typ und jede Packungsgröße. Belastbarer Referenzdatensatz für genau diese Breeder-Variante. [Barney’s Farm](https://www.barneysfarm.com/acapulco-gold-26) |
| Acapulco Gold | Feminisiert – Blimburn Seeds | Angezeigte Varianten: 1+1 gratis €13,49; 3+3 €30,99; 6+6 €53,49; 9+9 €59,49; 25 Samen €159,49. Die Angebotsdarstellung ist mit einer bedingten „Kaufe 1, erhalte 1 gratis“-Aktion verknüpft. | Typ und Mengen sind sichtbar; die Gratisaktion gilt laut Seite nur unter einer Bestellbedingung. Nicht ohne Bedingungskennzeichnung mit regulären Packpreisen mitteln. [Blimburn Seeds](https://blimburnseeds.de/acapulco-gold/) |
| Acapulco Gold | Feminisiert – Twins Garden Seeds | Varianten 3/5/10 Samen, Gesamtpreisspanne €34,90–€84,90; Einzelpreis je Variante im Treffer nicht sichtbar. | Teilbeleg; erst mit genauer Variantenpreisliste vergleichbar. [Twins Garden Seeds](https://twinsgardenseeds.com/product/acapulco-gold-feminisiert/) |
| Acapulco Gold | Feminisiert – Genetiken.de | 1/3/5/10 Samen, angezeigte Preisspanne €19,90–€60,90 | Typ und Packgrößen sichtbar, aber der Treffer ordnet nicht jeden Einzelpreis einer Größe zu. Als Spannweitenbeleg dokumentiert, nicht als einzelne Packpreise. [Genetiken.de](https://genetiken.de/shop/?opts=list_view) |
| Acapulco Gold Auto | Autoflower – Azarius | Produktkartenpreis €8,49; auswählbare Größen 1/3/5/10 | Der Suchtreffer zeigt die Größe nicht eindeutig dem Preis zugeordnet. Nur Teilbeleg, keine komplette Staffel. [Azarius Autoflower](https://www.azariusshop.de/cannabis-samen/autoflowering) |
| ACDC | Feminisiert – WeedSeedsExpress | 3 Samen €34; 5+1 gratis €54 (6 effektiv, €9/Samen); 10+2 gratis €79 (12 effektiv, €6,58/Samen) | Konkrete feminisierte photoperiodische Variante; Seite nennt Versand aus den Niederlanden und kostenlosen Versand. Nicht mit Auto-ACDC gleichsetzen. [WeedSeedsExpress](https://weedseedsexpress.com/product/acdc-seeds) |
| Auto ACDC | Autoflower – WeedSeedsExpress, über Ganja Seed Index verglichen | 3 Samen €34; 6 Samen €54; 12 Samen €79; effektive Preise €11,33 / €9,00 / €6,58 pro Samen | Index führt explizit Auto ACDC und weist drei Packgrößen aus. Primärseite für das konkrete Auto-Angebot sollte vor einer endgültigen Übernahme nochmals direkt geprüft werden. [Ganja Seed Index – Auto ACDC](https://ganjaseedindex.com/strains/auto-acdc/) |
| Afghan Kush | Regular – World of Seeds bei Cannoptikum | €18,94; Packungsgröße im Suchtreffer nicht genannt | Typ/Sortenname und Preis sichtbar, aber ohne Packgröße nicht als €/Samen oder Packstaffel verwendbar. [Cannoptikum – reguläre Samen](https://cannoptikum.com/hanfsamen-kaufen/regulaere/) |
| Afghan Kush / Original Auto Afghan Kush | Autoflower – Fast Buds bei House of Seeds | €6,96 statt €9,95; auswählbare Größen sichtbar, Einzelpreise der Varianten nicht extrahiert | Produktseite nennt „Autoflower“ und Breeder/Cross „420 Fast Buds – Afghan Auto“. Guter Teilbeleg; Preise jeder Packgröße bleiben offen. [House of Seeds](https://house-of-seeds.de/en/products/original-auto-afghan-kush-420-fast-buds) |

## 3. Rechen- und Vergleichsregeln

- Packpreise werden erst dann zu einem Preis-pro-Samen-Wert umgerechnet, wenn die effektive Samenanzahl eindeutig ist.
- Gratis-Samen zählen zur effektiven Stückzahl; bedingte Aktionen werden separat markiert.
- „Ab“-Preise, Spannweiten über mehrere Varianten und Preise ohne Packungsgröße sind keine vollständigen Packpreisbelege.
- Regular, feminisiert/photoperiodisch und Autoflower werden nicht miteinander vermischt. „Auto“ und „feminisiert“ können zugleich zutreffen, sind aber unterschiedliche Produkteigenschaften und müssen im Katalog eindeutig modelliert werden.
- Händlerangebote sind keine Bestätigung, dass SEED³X genau diese Züchtervariante vorrätig hat. Da im Katalog kein Züchterfeld vorhanden ist, bleiben solche Referenzen externe Marktanker, bis die eigene Verpackung/Bestandsliste eine Zuordnung bestätigt.

## 4. Nächste offene Aufgaben

1. Für alle Treffer mit Preisspanne oder unklarer Variantenwahl die konkrete Produktvariante und den Packpreis direkt prüfen.
2. Die 424 normalisierten Namensgruppen gegen die erwarteten 423 Familien abgleichen; Groß-/Kleinschreibung vereinheitlichen, aber genetisch verschiedene Linien nicht zusammenführen.
3. Die alphabetischen Gruppen mit vollständigen Belegen in ein strukturiertes Register überführen (Katalog-ID, Familienname, Typ, Breeder, Händler, Packgröße, Packpreis, €/Samen, Bestand, Versand, URL, Prüfdatum, Vertrauensstufe).
4. Preise erst nach ausreichender Zahl belastbarer, wirklich vergleichbarer Angebote als Referenzmittelwert berechnen. Wo nur ein einzelner belastbarer Anbieter existiert, als Einzelreferenz kennzeichnen, nicht als Marktmittelwert.

**Sicherheitsgrenze:** Diese Runde aktualisiert nur Dokumentation. Der Produktkatalog, Checkout, Zahlungen, `main` und Cloudflare bleiben unverändert.
