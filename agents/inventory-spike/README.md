# GreenGrow Inventory Spike

**Isolierter technischer Prototyp – nicht mit der Website verbunden.**

Dieses Verzeichnis untersucht Durable Object + SQLite als mögliche transaktionale Bestandsverwaltung. Es stellt weder eine produktive API noch einen Checkout bereit.

## Grenzen

- Keine Website-Integration und keine Verbindung zum bestehenden `greengrow` Worker.
- Keine Bereitstellung und kein Deploy-Script in diesem Paket.
- Ausschließlich synthetische Testbestände; keine echten Bestellungen/Kundendaten.
- Der bestehende Master-Agent wird nicht verwendet oder geändert.
- Dieser Spike ist nicht produktionsreif: Authentifizierung, Rate Limits, Monitoring, Preisfreigabe, Katalogfreigabe und Betriebs-/Recovery-Konzept fehlen.

## Geplante lokale Prüfung

1. Mit Cloudflare Workers Vitest-Pool die Durable Object-Klasse in der lokalen Workers-Runtime ausführen.
2. Persistenz über erneute Stub-Aufrufe/Storage-Reopen prüfen.
3. Parallelität, Rollback bei Mehrprodukt-Engpass und idempotente Wiederholungen prüfen.
4. Erst nach grünen Tests ein Review der Transaktionsgrenzen durchführen.

Die lokale Workers-Runtime kann Cloudflare-APIs realitätsnäher testen als ein selbstgebauter In-Memory-Mock. Ein Test in dieser Runtime ersetzt dennoch keinen separaten, ausdrücklich freigegebenen Cloud-Test.
