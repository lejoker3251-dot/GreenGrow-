# Preisquelle und Produktfreigabe – Entscheidungsentwurf

- Projekt: SEED³X
- Status: **Entwurf zur fachlichen Freigabe – keine Verkaufsfreigabe**
- Stand: 2026-10-25
- Geltungsbereich: Katalogpreise, Verfügbarkeit, Produktstatus und spätere serverseitige Bestellvalidierung
- Schutzgrenze: Diese Festlegung ändert keine Produktpreise, aktiviert keinen Checkout und verändert weder `main` noch die produktive Website.

## 1. Zweck und verbindliche Trennung

Es sind drei unterschiedliche Prüfungen erforderlich. Eine bestandene technische Preisprüfung ist kein Beleg dafür, dass der Preis wirtschaftlich richtig ist oder das Produkt verkauft werden darf.

1. **Technische Preisvalidität:** Der Wert ist eine positive, centgenaue EUR-Zahl und lässt sich eindeutig einer Packungsvariante zuordnen.
2. **Preisbeleg und fachliche Prüfung:** Der Preis wurde anhand einer dokumentierten, zulässigen Quelle geprüft und durch eine verantwortliche Person freigegeben.
3. **Verkaufsfreigabe:** Produktdaten, rechtliche Voraussetzungen, Lieferfähigkeit und Preis sind geprüft; der Produktstatus wurde ausdrücklich freigegeben.

Ein Produkt darf nicht allein deshalb verkaufsfähig werden, weil es einen numerisch gültigen Preis besitzt.

## 2. Preisquelle: vorgeschlagene Regel

### 2.1 Autoritative Quelle bei einer Bestellung

Die einzige Quelle für den bei einer späteren Bestellung berechneten Preis ist der serverseitig geladene und freigegebene Produkt-/Variantenkatalog. Browserdaten, `localStorage`, URL-Parameter, Warenkorbpreise oder vom Client übermittelte Zwischensummen sind nicht autoritativ.

Die serverseitige Bestellprüfung muss Produkt-ID, Varianten-ID, Produkttyp und Packungsgröße eindeutig im Katalog auflösen und den freigegebenen Preis dort neu lesen. Alle Summen werden in ganzzahligen Euro-Cent berechnet. Ein unbekannter, doppelter, nicht freigegebener oder nicht eindeutig auflösbarer Eintrag wird abgewiesen.

### 2.2 Beleg für die Festlegung eines Katalogpreises

Ein vorhandener Preis im JSON ist zunächst ein **eingetragener Preis**, nicht automatisch ein recherchierter oder freigegebener Preis. Für jede Packungsvariante soll vor Freigabe ein Preisnachweis vorliegen mit mindestens:

- interne Produkt-ID und Varianten-ID;
- exakter Produktname, Produkttyp und Packungsgröße;
- Preis in EUR sowie Angabe, ob Versandkosten enthalten sind;
- Händler-/Herstellername und direkte URL zur konkreten Produktseite;
- beobachteter Preis und Datum/Uhrzeit der Prüfung;
- Vergleichbarkeit des Produkts (gleiche Genetik/Marke, Typ und Packungsgröße);
- Ergebnis der Prüfung, Prüfer und Freigabestatus;
- Notiz bei Rabatt, nicht verfügbarer Variante, abweichender Packungsgröße oder sonstiger Einschränkung.

Suchtreffer, Snippets, allgemeine Kategorieseiten und ungeprüfte Aggregatwerte allein reichen nicht als endgültiger Beleg für eine konkrete Variante. Wenn ein Angebot nicht exakt vergleichbar ist, muss es als eingeschränkt vergleichbar markiert und darf nicht stillschweigend als identischer Preis behandelt werden.

### 2.3 Preisstatus

Empfohlene Statuswerte für die weitere Datenmodellierung:

- `unverified`: Preis steht im Katalog, aber es liegt kein belastbarer Variantenbeleg vor.
- `evidence-collected`: Quellenbeleg ist gespeichert, die fachliche Prüfung ist noch offen.
- `verified`: Beleg und Vergleichbarkeit wurden geprüft; Preis wurde fachlich bestätigt.
- `approved`: verantwortliche Freigabe für die Nutzung im Shop wurde dokumentiert.
- `recheck-required`: Beleg ist veraltet, Quelle nicht mehr verfügbar oder Preis hat sich geändert.

Ein technischer Test darf keinen dieser fachlichen Statuswerte automatisch auf `verified` oder `approved` setzen. Preisänderungen benötigen Quelle, Zeitstempel und nachvollziehbare Änderungshistorie.

## 3. Produktfreigabe und Verfügbarkeit

Für eine spätere Bestell-API sind folgende Bedingungen gemeinsam erforderlich:

1. Produkt existiert genau einmal und hat eine stabile interne ID.
2. Produkttyp und Packungsvariante sind gültig und eindeutig.
3. Produktstatus **und** Variantenstatus sind ausdrücklich `Freigegeben`; `Entwurf`, `Prüfung`, fehlende Werte und unbekannte Status werden abgewiesen.
4. Variantenpreis ist vorhanden, fachlich freigegeben, positiv und centgenau.
5. Verfügbarkeit ist aktuell und serverseitig bestätigt. `not-confirmed`, unbekannter Lagerstatus oder fehlender Bestandsnachweis bedeutet: keine Bestellung.
6. Menge ist eine ganze Zahl im erlaubten Bereich; alle Artikel und Summen werden serverseitig neu berechnet.
7. Die erforderlichen rechtlichen, lieferantenbezogenen und produktbezogenen Prüfungen für den tatsächlichen Vertrieb wurden separat abgeschlossen.
8. Der Checkout ist nur aktiv, wenn eine gesonderte Freigabe erfolgt ist. Bis dahin bleiben Checkout und Zahlungen ausgeschaltet.

**Fail-closed-Regel:** Fehlt ein Nachweis oder widersprechen sich Produkt-, Varianten-, Preis- oder Verfügbarkeitsdaten, wird die Position abgewiesen und nicht automatisch freigegeben.

## 4. Umgang mit dem aktuellen Katalog

Die letzte automatisierte Vollprüfung hat folgende technische Werte bestätigt:

- 1.269 Produkteinträge mit eindeutigen Produkt-IDs;
- je 423 Einträge in den drei Katalogkategorien;
- 5.076 Varianten mit Packungsgrößen 1, 3, 5 und 10;
- alle Produktdatensätze stehen auf `Entwurf`;
- Varianten stehen auf `Prüfung`;
- Preise sind numerisch und centgenau;
- im geprüften Katalog sind keine GTIN-Felder vorhanden.

Das belegt Struktur und Rechenbarkeit, **nicht** die sachliche Richtigkeit jedes Preises, Lieferfähigkeit, GTIN-Zuordnung oder rechtliche Verkaufsfreigabe. Die vorhandenen Preise werden durch dieses Dokument weder bestätigt noch verändert.

## 5. Spätere serverseitige Bestellprüfung

Vor einer Integration müssen mindestens diese Fälle mit Tests abgedeckt sein:

- gültige freigegebene Variante: Preis wird aus dem Serverkatalog geladen;
- vom Client geänderter Preis oder geänderte Zwischensumme: Clientwert wird nicht verwendet;
- unbekannte oder doppelte Produkt-/Varianten-ID: Ablehnung;
- Entwurf, Prüfstatus oder fehlender Freigabestatus: Ablehnung;
- fehlender, ungültiger oder nicht freigegebener Preisbeleg: Ablehnung;
- unbekannter/veralteter Bestand oder nicht bestätigte Verfügbarkeit: Ablehnung;
- ungültige Packungsgröße oder Menge: Ablehnung;
- mehrere gültige Positionen: Cent-genaue serverseitige Neuberechnung;
- Preis- oder Bestandsänderung zwischen Warenkorb und Bestellung: erneute Prüfung unmittelbar bei der Bestellung;
- alle Ablehnungen erzeugen eine verständliche Fehlermeldung, ohne sensible interne Details offenzulegen.

Die bestehende Funktion `src/lib/catalog-pricing.js` ist derzeit nur eine isolierte Hilfsfunktion für Tests. Sie ist kein Server-Endpunkt und schützt den bestehenden Browser-Warenkorb noch nicht.

## 6. Offene fachliche Entscheidungen

Diese Punkte benötigen eine bewusste Entscheidung der verantwortlichen Person; sie werden nicht durch die technische Prüfung vorweggenommen:

- Welcher Preis soll angezeigt werden: eigener festgelegter Verkaufspreis, aus vergleichbaren Angeboten abgeleiteter Referenzwert oder ein anderer ausdrücklich definierter Ansatz?
- Welche Quelle und welches Mindestmaß an Vergleichbarkeit genügen für die Preisfreigabe?
- Wie lange gilt ein Preisbeleg, bevor eine erneute Prüfung erforderlich ist?
- Wer darf Preise prüfen, ändern und endgültig freigeben?
- Welcher konkrete Nachweis bestätigt Bestand und Lieferfähigkeit?
- Welche zusätzlichen rechtlichen und lieferantenbezogenen Freigaben sind vor dem tatsächlichen Verkauf erforderlich?

Bis diese Fragen beantwortet und dokumentiert sind, bleibt der Status dieses Dokuments **Entwurf**. Es ist keine implizite Preis-, Produkt- oder Checkout-Freigabe.

## 7. Nächste sichere Arbeitsschritte

1. Vorhandene Preisrecherche und Belege pro Produkt/Packungsgröße inventarisieren.
2. Fehlende oder nicht exakt vergleichbare Belege markieren, ohne Preise zu überschreiben.
3. Die offenen fachlichen Entscheidungen dokumentieren und bestätigen lassen.
4. Ein Schema für Quellenbeleg, Prüfstatus und Änderungshistorie festlegen.
5. Erst nach der fachlichen Freigabe die Datenvalidierung und Server-API separat implementieren und testen.
6. Checkout und Zahlungen bleiben bis zu einer ausdrücklich erteilten separaten Freigabe deaktiviert.
