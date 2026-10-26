# SEED³X — DESIGN.md

**Status:** In Umsetzung – Designsystem und Homepage-Farbwelt aktualisiert; Preview-/Build-Prüfung steht aus  
**Geltungsbereich:** Bestehendes Framer-Konzept und Astro-Homepage im Branch `feature/premium-storefront-v1`  
**Ziel:** Ein botanisch geprägtes Premium-Erlebnis mit klarer Navigation, starker Bilddramaturgie und transparentem Katalogstatus.

## 1. Designprinzip

SEED³X verbindet botanische Ästhetik, verständliche Inhalte und hochwertige Produktpräsentation. Die Seite soll ruhig, modern, zugänglich und konsistent wirken. Die Homepage erzählt die Marke und leitet zu klar getrennten Themenwelten; sie ist kein Ersatz für den vollständigen Shop.

Prioritäten:
1. Markenidentität und Wiedererkennbarkeit
2. Lesbarkeit und mobile Bedienbarkeit
3. Einheitliche Farben, Typografie und Komponenten
4. Verständliche Shop- und Wissensnavigation
5. Bewegung mit Zweck, stets überspringbar und mit Reduced-Motion-Unterstützung

## 2. Referenzen und Übertragung

### Lando Norris — https://landonorris.com/

Die offizielle Website wurde anhand der verfügbaren Seitenstruktur und Textinhalte betrachtet. Erkennbar sind ein groß inszenierter, markenstarker Einstieg, erzählerische Bildfolgen, klar getrennte Bereiche „On Track“ und „Off Track“, eine thematisch sortierte Helm-Galerie, ein eigener Store-Einstieg, Partnerschaften und Social-Verweise. Die Website bietet außerdem eine immersive Scroll-/Motion-Inszenierung. Die zugrunde liegenden Interaktionen und exakten Pixelmaße wurden nicht vollständig technisch vermessen.

**Für SEED³X übernehmen wir das Prinzip, nicht die fremde Marke:**
- Einprägsames, bildstarkes Intro mit sichtbarem SEED³X-Wortzeichen und dezenter botanischer Kontur.
- Eine geführte Erzählung von Markenidee zu Wachstum, Sortiment und Wissen.
- Klar getrennte Wege: **Shop & Samenkategorien** einerseits, **Wissen, Seed Finder und Grow Doctor** andererseits.
- Redaktionelle Galerie-/Kartenlogik für Kategorien und ausgewählte Inhalte statt einer endlosen Produktwand auf der Startseite.
- Eigenständiger Shop-Einstieg und eigenständige Grow-Doctor-/Wissens-Einstiege.
- Bewegung nur als progressive Verbesserung: Intro überspringbar, Navigation bedienbar, Inhalte ohne Animation verfügbar, `prefers-reduced-motion` beachten.

Nicht übernehmen: Lando Norris-/McLaren-Branding, Neon-Lime-Palette, Rennsportmetaphern, fremde Bilder, Logos oder Texte. Keine aufwendige 3D-/WebGL-Abhängigkeit einführen, bevor Leistung, iPad-Bedienung und Nutzen geklärt sind.

Weitere Prinzipien aus dem bestehenden Entwurf:
- Apple: großzügiger Weißraum, klare Hierarchie, hochwertige Bilder.
- Starbucks: botanische Farborganisation und wiederverwendbare Retail-Komponenten.
- Shopify: klare Katalogstruktur, Filter, Produktinformationen und eindeutige Aktionen.
- Framer: dezente Animationen, konsistente Zustände und sorgfältige Übergänge.

## 3. Farben — Zielsystem noch zu verifizieren

**Gestalterisches Ziel**
- Porzellanweiß und Weiß als Hauptflächen.
- Botanisches Grün als primäre Interaktionsfarbe.
- Gold als zurückhaltender Akzent.
- Lilac als sekundäre Akzentfarbe.
- Dunkler, gut lesbarer Text auf hellen Flächen.

**Vorläufige Ausgangswerte im bisherigen Entwurf**
- Porzellan: `#F8F7F2`
- Weiß: `#FFFEFA`
- Botanikgrün: `#285A40`
- Grün, weicher: `#426B50`
- Gold: `#C6A15B`
- Lilac: `#B9A3D5`
- Lilac-Fläche: `#F0EAF7`
- Lilac-Akzent: `#80699B`
- Text: `#203B2A`
- Sekundärtext: `#687269`

Diese Werte sind jetzt die gemeinsame Umsetzungsbasis für die Botanical-Signature-Runde. Kontrastkombinationen sowie die tatsächliche Darstellung auf allen Seitentypen müssen in der Vorschau noch geprüft werden. Dunkle Flächen bleiben gezielte Akzente, nicht die dominante Seitenwelt.

## 4. Typografie

Inter bleibt die bevorzugte Ausgangsbasis aus dem Framer-Projekt. Vorläufige Hierarchie:
- Hero: 48–64 px Desktop, 34–42 px Mobil.
- Abschnittsüberschrift: 32–40 px Desktop, 27–32 px Mobil.
- Kartenüberschrift: 20–24 px.
- Fließtext: 16–18 px.
- Navigation und Buttons: 14–16 px.
- Zusatzinformationen: 12–14 px.

Konkrete Größen sind an vorhandenen Stilen und Breakpoints auszurichten.

## 5. Layout und Navigation

Ein 4-/8-px-Raster, großzügige Abschnittsabstände, klare Inhaltsbreiten und einheitliche Kartenabstände verwenden. Kein horizontaler Überlauf. Navigation:
- Home
- Shop
- Wissen
- Grow Doctor
- Seed Finder
- Über uns
- Kontakt

„Kollektion“ nur dann in „Shop“ ändern, wenn eine entsprechende sichtbare Instanz noch existiert. Merkliste und Warenkorb müssen unterscheidbar sein; mobile Navigation ohne Hover bedienen können.

## 6. Homepage-Dramaturgie

1. **Intro:** SEED³X-Wortzeichen, botanische Konturlinien, kurze und ruhige Bewegung. Altersabfrage ist ein separater Schritt und darf nicht hinter der Animation verborgen werden.
2. **Hero:** markante Bildfläche, klare Aussage und zwei eindeutige nächste Schritte.
3. **Wachstums-Erzählung:** redaktioneller Übergang mit drei klaren visuellen Etappen.
4. **Themenwege:** Shop, Seed Finder und Wissen als getrennte Einstiege.
5. **Kategorien:** drei übersichtliche Samenkategorien mit echten Katalogzahlen, klar als Vorschau gekennzeichnet.
6. **Grow Doctor:** eigenständiger Service-Einstieg, keine Vermischung mit dem Shop.
7. **Über uns und Abschluss:** Entwicklungsstatus transparent halten und erst dann zu aktiven Funktionen auffordern, wenn sie tatsächlich verfügbar sind.

Die Startseite soll nicht sämtliche Produkte zeigen. Vollständige Katalogsuche, Filter und Sortierung gehören auf die Shop-Seite.

## 7. Shop- und Produktkarten

- Einheitliches Bildformat und konsistente Kartenstruktur.
- Produktname, Varianten, Packungsgröße und Preis klar darstellen, sofern verlässliche Daten vorliegen.
- Suche, Filter und Sortierung verständlich gestalten.
- Lade-, Leer- und Fehlerzustände berücksichtigen.
- Produktdaten nicht erfinden; fehlende Daten eindeutig kennzeichnen.
- 1.269 CMS-Einträge sind kein Nachweis der fachlichen Richtigkeit jedes Datensatzes.

## 8. Responsive Design und Barrierefreiheit

Desktop, Tablet und Mobilgerät separat gestalten. Texte dürfen nicht abgeschnitten werden; Buttons und Menüs müssen gut bedienbar sein. Fokuszustände, ausreichender Kontrast, Alternativtexte und reduzierte Bewegung berücksichtigen. Intro überspringbar halten; Inhalte müssen auch ohne Animation verständlich bleiben.

## 9. Aktueller Umsetzungsstand

- `src/styles/design-tokens.css`: zentrale Farbvariablen auf Porzellanweiß, Botanikgrün, Gold und Lilac ausgerichtet.
- `src/styles/botanical-luxury.css`: gemeinsame Komponentenregeln für Navigation, Buttons, Karten, Inhaltsseiten, Produktflächen, Hinweise, Altersabfrage und Footer ergänzt.
- `src/pages/index.astro`: Homepage-Hero auf eine helle, redaktionelle Botanical-Signature-Darstellung ausgerichtet.
- Noch offen: Build-/Typecheck, visuelle Prüfung im echten Preview, gezielte responsive Korrekturen und systematische Sichtkontrolle aller Routen. Die Umsetzung ist daher noch nicht als abgeschlossen oder freigegeben zu betrachten.

## 10. Qualitäts- und Änderungsgrenzen

- Diese Designnotiz dokumentiert Zielrichtung und Referenzanalyse, ist aber noch keine finale Freigabe.
- Keine Änderungen an `main`, kein Merge und keine Produktionsveröffentlichung ohne ausdrückliche Zustimmung.
- Keine neuen Cloudflare-Projekte/Worker und keine kostenpflichtigen Dienste ohne Freigabe.
- Designreferenz: Lando Norris Official Website, https://landonorris.com/ (abgerufen am 26.10.2026; Seitenstruktur und verfügbare Textinhalte betrachtet).
