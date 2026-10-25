# Technischer Spike: atomare Samenbestandsreservierung

- **Ziel-Branch:** `test/inventory-ean-pricing-2026-10-25`
- **Status:** Entwurfsentscheidung vor Implementierung
- **Stand:** 2026-10-25
- **Produktiv-/Preview-Änderungen:** keine
- **Cloudflare-Ressourcen:** keine neu angelegt

## 1. Ziel und Nicht-Ziele

Der Spike soll die technische Grundlage für eine spätere serverseitige Bestandsreservierung nachweisen. Er ist kein Checkout und keine Freigabe zum Einsatz echter Bestellungen.

**In Scope**
- Ein autoritativer Bestand je Produkt, gemessen in einzelnen Samen.
- Packgrößen 1, 3, 5 und 10 werden nur in Samenbedarf umgerechnet; sie haben keinen separaten Bestand.
- Mehrere Warenkorbzeilen derselben Produkt-ID werden vor der Reservierung zusammengeführt.
- Alle Positionen einer Reservierung werden entweder vollständig reserviert oder gar nicht.
- Dauerhafte Idempotenz, Reservierungsstatus, Ablauf und Freigabe.
- Konkurrenztests gegen den tatsächlichen persistenten Speicher, nicht nur gegen einen In-Memory-Mock.

**Nicht in Scope**
- Website-/Preview-Integration, Checkout-Aktivierung, Zahlungen, Bestellungen an Kunden oder produktive Bestandsänderungen.
- Erfinden oder Zuweisen von EAN/GTINs.
- Nutzung oder Umfunktionierung des Master-Agent-Prototyps ohne separate Freigabe.
- Anlegen einer Cloudflare-Datenbank, eines Namespaces oder anderer Ressourcen vor Kosten- und Umgebungsfreigabe.

## 2. Feststehende Bestandsregeln

- Der bisherige Ausgangswert beträgt laut Betreiberangabe 1.000 lose Samen pro Produkt; er ist noch nicht physisch nachgezählt.
- 1.269 Produkte ergeben rechnerisch 1.269.000 deklarierte Samen, nicht verifizierten Lagerbestand.
- Der Bestand wird nach Produkt-ID geführt. Varianten/Packgrößen haben keinen eigenen Bestand.
- Bedarf je Warenkorbposition = Anzahl Packungen × Samen pro Packung.
- Vor einer Reservierung müssen Menge, Produktfreigabe und serverseitiger Preis geprüft werden.
- Browserdaten sind nicht autoritativ.

Beispiel: 2 × 1er + 4 × 3er + 1 × 5er + 2 × 10er desselben Produkts benötigen 39 Samen.

## 3. Speicheroptionen

### Option A — SQLite-basiertes Durable Object

**Stärken**
- Ein Objekt kann als autoritative Instanz für den gesamten Bestand fungieren und Mehrproduktreservierungen innerhalb einer SQLite-Transaktion verarbeiten.
- Durable-Object-Speicher ist transaktional und stark konsistent; die SQLite-API unterstützt Transaktionen.
- Im Repository existiert bereits ein isoliertes Muster mit SQLite-basiertem Durable Object. Es ist nur ein Architekturbeispiel und darf nicht stillschweigend wiederverwendet oder verändert werden.

**Zu beweisen**
- Eine einzelne Bestandsinstanz für 1.269 Produkte ist für die erwartete Last ausreichend; ein Objekt je Produkt würde eine atomare Mehrproduktbestellung über mehrere Objekte erschweren.
- Transaktion umfasst Idempotenzprüfung, Prüfung aller Positionen, Bestandsänderung und Reservierungsdatensätze.
- Doppelte Wiederholungen, Abstürze und Freigabe abgelaufener Reservierungen verändern den Bestand nicht doppelt.

### Option B — Cloudflare D1

**Stärken**
- Relationales Schema für Produkte, Bestände, Reservierungen und Reservierungspositionen.
- Die D1-`batch()`-API führt vorbereitete Statements sequenziell als Transaktion aus und bricht die gesamte Sequenz bei Fehlern ab.

**Zu beweisen**
- Ein konkretes Mehrproduktmuster muss alle Positionen atomar behandeln, auch wenn ein einzelnes Produkt nicht ausreichend Bestand hat.
- Bedingte Updates müssen den aktuellen Bestand absichern; die Anwendung muss jede Position eindeutig als erfolgreich aktualisiert erkennen und bei einem Fehlschlag die ganze Batch-Transaktion abbrechen.
- Idempotenzschlüssel und Statuswechsel müssen innerhalb derselben Transaktionsgrenze konsistent sein.

### Vorläufige Empfehlung

Zuerst einen lokalen, reproduzierbaren Vergleichs-Spike bauen; keine Cloud-Ressourcen erstellen. Für den ersten Prototyp ist SQLite-basiertes Durable Object der bevorzugte Kandidat, weil die Mehrproduktreservierung zentral und in einer Transaktion modelliert werden kann. D1 bleibt eine echte Vergleichsoption und darf nicht ohne gemessenen Nachweis ausgeschlossen werden.

Diese Empfehlung ist eine Designhypothese, keine Freigabe und kein Beleg für Produktionsreife. Cloudflare dokumentiert transaktionalen SQLite-DO-Speicher und transaktionale D1-Batches; die projektspezifischen Invarianten müssen trotzdem getestet werden.

## 4. Vorgeschlagenes logisches Schema

Das Schema ist unabhängig von der konkreten API formuliert; endgültige DDL erst nach Auswahl des Kandidaten.

### `inventory`
- `product_id` — Primärschlüssel, bestehende Katalog-ID
- `on_hand_seeds` — ganzzahliger deklarierter Gesamtbestand
- `reserved_seeds` — ganzzahlig, aktuell reservierte Samen
- `physical_count_verified` — boolesch, initial `false`
- `updated_at` — Zeitstempel

Verfügbare Menge = `on_hand_seeds - reserved_seeds`. Negative Werte sind verboten.

### `reservations`
- `reservation_id` — serverseitig erzeugte, nicht erratbare ID
- `idempotency_key` — eindeutig für denselben Reservierungsversuch
- `status` — `reserved`, `committed`, `released`, `expired` oder `rejected`
- `created_at`, `expires_at`, `updated_at`
- optional `request_fingerprint` — erkennt die Wiederverwendung desselben Idempotenzschlüssels mit verändertem Inhalt

### `reservation_lines`
- `reservation_id`, `product_id`
- `pack_count`, `seeds_per_pack`, `seeds_required`
- eindeutige Kombination aus Reservierung und Produkt-ID nach dem Zusammenführen doppelter Warenkorbzeilen.

Historische Reservierungspositionen bleiben für Nachvollziehbarkeit erhalten. Reservierungsablauf darf nicht allein durch einen unzuverlässigen Client-Zeitstempel ausgelöst werden.

## 5. Atomarer Reservierungsablauf

1. JSON-Schema, Größenlimits und Mengenbereiche prüfen; ungültige/negative/unsichere Ganzzahlen ablehnen.
2. Produkt-IDs gegen den serverseitig freigegebenen Katalog prüfen; Preis und Verkaufsstatus nie aus dem Browser übernehmen.
3. Doppelte Produktzeilen zusammenführen und Samenbedarf ganzzahlig berechnen.
4. In einer einzigen Transaktion den Idempotenzschlüssel nachschlagen. Bei identischem wiederholtem Request dieselbe Antwort zurückgeben; bei verändertem Inhalt mit demselben Schlüssel ablehnen.
5. Alle betroffenen Bestände prüfen. Kein Bestand wird verändert, solange nicht jede Position verfügbar ist.
6. Reservierung, alle Reservierungspositionen und alle Bestandsänderungen gemeinsam committen.
7. Bei irgendeinem Fehler vollständig zurückrollen; keine Teilreservierung.
8. Freigabe/Bestätigung ist ein idempotenter Statuswechsel. Eine Reservierung darf nur einmal von `reserved` nach `committed` oder `released/expired` wechseln.
9. Wiederholte oder konkurrierende Freigaben dürfen den Bestand nie zweimal freigeben.
10. Keine externe Zahlung oder Netzwerkoperation innerhalb der Datenbanktransaktion ausführen.

Für einen DO-Prototyp muss der gesamte kritische Abschnitt synchron/atomar in der Transaktions-API implementiert werden; keine `await`-Grenze darf eine ungeschützte Lücke zwischen Prüfung und Abzug öffnen. Für D1 muss die Batch-Fehlerbehandlung nachweislich die komplette Transaktion abbrechen, sobald irgendein bedingtes Update nicht genau eine erwartete Zeile verändert hat.

## 6. Testmatrix und Abnahmekriterien

| Test | Erwartung |
|---|---|
| Gemischte Packgrößen | 2×1 + 4×3 + 1×5 + 2×10 = 39 Samen |
| Mehrere Zeilen derselben Produkt-ID | Vor Bestandsprüfung zu einer Produktposition zusammengeführt |
| Bestand exakt ausreichend | Reservierung erfolgreich; Restbestand exakt null verfügbar |
| Ein Samen zu wenig | Gesamte Reservierung abgelehnt; keine Bestandsänderung an irgendeinem Produkt |
| Zwei parallele Requests, zusammen zu groß | Höchstens einer erfolgreich; Bestand niemals negativ |
| Viele parallele Requests auf dasselbe Produkt | Erfolgreiche Reservierungen summieren sich nie über den Anfangsbestand |
| Mehrproduktbestellung mit einem Engpass | Kein Teilabzug auf anderen Produkten |
| Identischer Idempotenz-Retry | Gleiche Reservierungs-ID/Antwort; keine zweite Abbuchung |
| Gleicher Idempotenzschlüssel, anderer Inhalt | Abgelehnt, ursprüngliche Reservierung unverändert |
| Doppelte Freigabe/Bestätigung | Effekt nur einmal |
| Ablauf und Wiederholung | Reservierung wird höchstens einmal freigegeben |
| Fehler zwischen einzelnen Schreibschritten | Transaktion vollständig zurückgerollt |
| Neustart/eviction | Dauerhafte Bestände und Reservierungsstatus bleiben erhalten |
| Physischer Bestand nicht verifiziert | Sichtbarer Status bleibt unverifiziert; keine stillschweigende Bestätigung |

**Pass-Kriterium:** alle obigen Tests laufen gegen die echte gewählte Speicherimplementierung in einer isolierten lokalen Umgebung. Ein In-Memory-Modell allein ist kein Nachweis für Transaktionen, Persistenz oder Parallelität. Ein späterer Test in Cloudflare-Preview erfordert eine separate Freigabe.

## 7. Messplan

Für beide Kandidaten mit demselben Datensatz und derselben Testlast erfassen:
- erfolgreiche und abgelehnte Reservierungen;
- Verstöße gegen Bestandsinvarianten (muss null sein);
- doppelte Abbuchungen und Teilabzüge (muss null sein);
- Latenz p50/p95 bei seriellen und parallelen Anfragen;
- Fehler- und Rollback-Verhalten;
- Aufwand für Ablauf, Wiederholung, Audit und Wiederherstellung;
- voraussichtliche Kosten anhand aktueller Nutzungspreise vor jeder Ressourcenerstellung.

Es werden keine Performance- oder Kostenzahlen vorweggenommen.

## 8. Sicherheits- und Freigabeschranken

- Keine Änderungen an `main`, der Produktionsseite oder der Preview-Konfiguration.
- Kein Push auf `feature/premium-storefront-v1`, da dort ein Preview-Deploy-Workflow auslösen kann.
- Keine neue Datenbank, kein neuer Durable-Object-Namespace und kein Deploy ohne ausdrückliche Freigabe.
- Checkout bleibt deaktiviert.
- Keine echten Bestellungen oder Kundendaten in Testläufen.
- Erst nach lokalem Test, Code-Review, Kostenprüfung und ausdrücklicher Freigabe darf ein isolierter Cloud-Test geplant werden.

## 9. Quellen zur Plattformsemantik

- Cloudflare, SQLite-backed Durable Object Storage: https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/
- Cloudflare, Access Durable Objects Storage: https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/
- Cloudflare, D1 Database / `batch()`: https://developers.cloudflare.com/d1/worker-api/d1-database/
- Cloudflare, D1 FAQ und Durchsatzgrenzen: https://developers.cloudflare.com/d1/reference/faq/

Die Plattformdokumentation beschreibt die Speichermechanismen. Sie ersetzt nicht die geforderten projektspezifischen Konkurrenz-, Idempotenz- und Wiederherstellungstests.
