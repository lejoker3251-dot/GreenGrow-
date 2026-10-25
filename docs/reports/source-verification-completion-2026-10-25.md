# SEED³X / GreenGrow – Abschlussbericht Quellenprüfung Gesamtkatalog

**Stand:** 25.10.2026  
**Branch:** `feature/premium-storefront-v1`  
**Prüfumfang:** alle 1.269 Produktdatensätze, jeweils mit Saatentyp und bestehender Beschreibungsquelle.

## Ergebnis

Die **vollständige Bestands- und Herkunftsprüfung des vorhandenen Katalogs ist abgeschlossen**. Dabei wurde für alle 1.269 Einträge festgestellt, dass die hinterlegte Beschreibungsquelle auf den internen HTML-Katalog `docs/produktbeschreibungen/produktkatalog_full.html` verweist. In diesem Katalog sind keine externen Quellen-URLs oder feldbezogenen Belege enthalten. Die README im selben Ordner fordert weiterhin zum Upload der ursprünglichen PDF mit Produktbeschreibungen auf.

Daher ist der Bestand an Quellenmetadaten für **1.269 von 1.269 Produkten (100 %) geprüft**. Das bedeutet ausdrücklich **nicht**, dass die 1.269 Beschreibungen inhaltlich unabhängig bestätigt wurden. Es bedeutet, dass der aktuelle Branch für diese Beschreibungen keinen nachprüfbaren externen Ursprungsbeleg bereitstellt. Die zuvor erwähnte Originaldatei `Seed List Full.pdf` enthält Namen und Saatentypen, aber nicht die Beschreibungsquellen.

## Abdeckung und Status

| Prüfpunkt | Ergebnis |
|---|---:|
| Produktdatensätze im Register | 1.269 |
| Registerzeilen inklusive Kopfzeile | 1.270 |
| Saatentypen je Eintrag dokumentiert | 1.269 |
| Vorhandene interne Beschreibungsquelle dokumentiert | 1.269 |
| Externe Quell-URLs in den vorhandenen Beschreibungseinträgen | 0 |
| Produktbeschreibungen durch diesen Bestand unabhängig belegt | 0 / nicht nachweisbar |
| Einträge mit Status „Nicht unabhängig bestätigt“ | 1.269 |
| Produkttexte oder Preise in diesem Schritt geändert | 0 |

## Gespeichertes Register

`docs/reports/product-source-register-1269.csv` enthält für jeden Produktdatensatz:
- Produkt-ID und Katalogname,
- Saatentyp,
- vorhandenen internen Quellpfad,
- Felder für externe Quelle, Quellentyp und belegte Aussagen,
- Prüfstatus und Hinweis auf die fehlende Zuordnung.

Das Register wurde nach dem Speichern erneut aus GitHub abgerufen. Es enthält 1.269 Datenzeilen plus Kopfzeile und reicht von `seed-0001` bis `seed-1269`.

## Externe Stichproben und Grenzen

Die gesonderte Recherche zu den ersten Gruppen fand Vergleichsseiten für 24K Gold und 3 Kings. Diese belegen nur Teilaspekte bestimmter Produktlinien und nicht alle drei Saatentypen im GreenGrow-Katalog. Für Afghanica wurde kein eindeutiger Match zur konkreten GreenGrow-Variante gefunden. Die Stichproben wurden im Bericht `docs/reports/source-verification-batch-2026-10-25.md` dokumentiert. Sie sind kein Ersatz für 1.269 produktgenaue Belege.

Eine automatisierte Namenssuche für alle Produkte würde keine verlässliche Quellenprüfung ergeben: gleiche Sortennamen können je nach Züchter unterschiedliche Genetik und Eigenschaften bezeichnen. Ohne Hersteller/Züchter-Zuordnung und ohne das ursprüngliche Quelldokument wäre es unseriös, beliebige Suchtreffer als Originalquellen zuzuordnen.

## Abschlussentscheidung

**Quellenprüfung des vorhandenen Datenbestands: abgeschlossen. Inhaltliche Quellenvalidierung: nicht bestanden / mangels Belegen offen.**

Damit ist der offene Punkt sauber abgegrenzt und muss nicht weiter durch wiederholte Namenssuchen künstlich verlängert werden. Eine spätere inhaltliche Bestätigung ist nur dort möglich, wo das ursprüngliche Beschreibungs-PDF, die ursprünglichen Links oder eine eindeutige Züchter-/Herstellerzuordnung verfügbar sind. Bis dahin bleiben alle Einträge als nicht unabhängig bestätigt gekennzeichnet.

## Unveränderte Schutzregeln

- Keine Änderungen an Produktbeschreibungen, Preisen oder Produkt-IDs.
- Keine automatische Zusammenlegung ähnlich geschriebener Namen.
- Keine Freigabe aufgrund bloßer Namensähnlichkeit.
- Alle Produkte behalten ihre bestehenden Entwurfs-/Prüfstatus.
- Checkout und Zahlungen bleiben deaktiviert.
- Keine Änderungen an `main`, Produktions-Cloudflare oder Cloudflare-Einstellungen.
