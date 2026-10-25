# Architekturprüfung: dauerhafte und atomare Bestandsverwaltung

- **Geprüfter Branch:** `test/inventory-ean-pricing-2026-10-25`
- **Prüfdatum:** 2026-10-25
- **Umfang:** lesende Prüfung der vorhandenen Projektdateien; keine Preview-Integration.
- **Produktionsänderungen:** keine.

## Kurzbefund

Die Website ist derzeit ein statisches Astro-Frontend. `src/worker.js` leitet Anfragen ausschließlich an `env.ASSETS.fetch(request)` weiter. In der Website-Konfiguration `wrangler.jsonc` und in `wrangler.preview.jsonc` ist keine Datenbank, kein KV-Namespace und keine Bestands-API gebunden.

Die Repository-Dokumentation bestätigt außerdem, dass es keine produktive Produktdatenbank oder serverseitige Bestandsverwaltung gibt. Der lokale Browser-Merker auf `src/pages/shopping-cart.astro` ist ausdrücklich kein Checkout und keine Bestellabwicklung.

## Vorhandene Cloudflare-Komponente

Unter `agents/master-agent/wrangler.jsonc` existiert eine separate, isolierte Master-Agent-Prototyp-Konfiguration mit einem Durable-Object-Binding `MASTER_AGENT` und einer SQLite-basierten Migration für die Klasse `MasterAgent`.

Die zugehörige README bezeichnet das Projekt als read-only prototype. Der Worker bietet nur `GET /health` und `POST /plan`; er ist nicht mit der Website-Bestandsverwaltung verbunden und enthält keine Bestandsreservierung. Die Konfiguration verwendet den eigenen Namen `greengrow-master-agent-preview`, nicht den Website-Worker `greengrow`.

**Schlussfolgerung:** Eine persistente Cloudflare-Technologie ist im Repository bereits als separates Prototyp-Muster vorhanden. Sie ist aber kein bereits implementierter oder einsatzbereiter Bestandsspeicher. Diese Prüfung hat weder ihre Live-Bereitstellung noch ihre produktive Verfügbarkeit geprüft.

## Anforderungen an die spätere Bestandslösung

Die Bestandskomponente muss mindestens:

1. den autoritativen Bestand je Produkt in einzelnen Samen dauerhaft speichern;
2. den Bedarf aller Warenkorbpositionen derselben Produkt-ID summieren;
3. Bestandsprüfung und Abzug atomar ausführen;
4. eine Überbestellung ablehnen, ohne andere Positionen teilweise abzuziehen;
5. konkurrierende Anfragen über mehrere Worker-Instanzen korrekt serialisieren;
6. Idempotenz bzw. eine eindeutige Bestell-/Reservierungs-ID vorsehen, damit Wiederholungsversuche nicht doppelt abbuchen;
7. Bestand bei abgebrochenen oder abgelaufenen Reservierungen nachvollziehbar freigeben;
8. Server-seitige Preise und Produktfreigaben unabhängig von Browserdaten validieren;
9. Tests gegen den tatsächlichen Speicher und die tatsächlichen Transaktionsgrenzen bereitstellen.

## Zu bewertende Optionen – noch keine Auswahl

- **Cloudflare Durable Object mit SQLite:** bietet einen natürlichen Ort zur Serialisierung und transaktionalen Verwaltung. Vor Auswahl müssen Umfang der Zuständigkeit, Mehrproduktbestellungen, Durchsatz, Wiederholungen und Reservierungsablauf entworfen und getestet werden. Die vorhandene Master-Agent-Klasse darf nicht stillschweigend als Bestandsdienst umfunktioniert werden.
- **Cloudflare D1:** kann eine relationale Bestandsverwaltung ermöglichen. Vor Auswahl muss ein konkretes Transaktionsmuster bewiesen werden, das bei unzureichendem Bestand die gesamte Mehrproduktbestellung ohne Teilabzug zurückweist und konkurrierende Aktualisierungen korrekt behandelt.
- **Andere externe Datenbank:** nur nach ausdrücklicher Freigabe, inklusive Kosten-, Datenschutz- und Betriebsprüfung.

Keine dieser Optionen wird in dieser Prüfung eingerichtet oder veröffentlicht.

## Empfohlener nächster Schritt

Zunächst einen separaten technischen Spike auf diesem isolierten Branch entwerfen: Schema für Bestand und Reservierung, atomarer Ablauf für Mehrproduktbestellungen, Idempotenzschlüssel und Rückabwicklung. Danach ein reproduzierbarer Konkurrenztest gegen die tatsächlich ausgewählte Speichertechnologie. Erst nach erfolgreichem Test und bewusster Freigabe wäre eine Integration in die Preview zu erwägen.

## Sicherheitsgrenze

Bis dahin bleibt Checkout deaktiviert. Es erfolgt keine Integration in die Website, keine Änderung an `main`, keine Produktionsänderung und kein Preview-Deployment.
