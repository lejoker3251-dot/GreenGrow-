# Phase 2 – Shop und Kategorien

Stand: 2026-10-24  
Arbeitsbranch: `feature/premium-storefront-v1`

## Umsetzung

- Drei Kategorie-Einstiege ergänzen die Shop-Seite: **Autoflowering**, **Feminisierte Samen** und **Reguläre Samen**.
- Die Anzahl je Kategorie wird aus dem vorhandenen Katalog berechnet, nicht als Produktbestand oder Verkaufsverfügbarkeit ausgegeben.
- Der Einstieg filtert die vorhandene Produktliste nach der jeweiligen Kategorie und scrollt zum Katalog.
- Ein zusätzlicher Einstieg führt zum gesamten Katalog.
- Die Kategorien in der Filterleiste entsprechen nun genau den drei vorhandenen Katalogkategorien plus „Alle Saatentypen“. Der zuvor sichtbare Filter „Nicht zugeordnet“ wurde entfernt, da es dafür keine Einträge gibt.
- Die Kataloganzahl wird aus der tatsächlichen Datensatzanzahl abgeleitet.
- Bestehende Suche, Sortierung, Produktdetailrouten und lokale Merkliste bleiben erhalten.
- Kategorie-Karten passen auf kleinen Bildschirmen auf eine Spalte um; Farben und visuelle Grundrichtung bleiben unverändert.

## Kataloggrundlage geprüft

`src/data/seed-products.json` enthält 1.269 Einträge:
- Autoflowering: 423
- Feminisierte Samen: 423
- Reguläre Samen: 423

Alle Einträge sind weiterhin Entwürfe. Diese Zahlen beschreiben Katalogeinträge, keine geprüften Produkte, Lagerbestände oder Verkaufsfreigaben.

## Bewusst nicht geändert

- Keine Seriennamen oder Serien-Kategorien ergänzt, da im vorhandenen Datenschema keine belastbare Serienzuordnung hinterlegt ist.
- Keine Preise, Produktfreigaben, Bilder oder Bestellfunktionen geändert.
- Keine neuen Routen angelegt.
- `main`, Cloudflare-Konfiguration, Worker und Produktionsbereitstellung unangetastet gelassen.

## Verifikation

Die geänderte Shop-Datei wurde nach dem Speichern erneut aus GitHub gelesen und auf Kategorie-Einstiege, bestehende Suche, Sortierung, Merkliste und mobile CSS-Regeln geprüft. Ein vollständiger Astro-Build und die Browser-/iPad-Prüfung sind noch offen; der verfügbare GitHub-Status liefert für den Commit derzeit keine Statuschecks. Deshalb ist kein erfolgreicher Build oder Preview-Deploy behauptet.
