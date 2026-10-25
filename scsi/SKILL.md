---
name: two-camera-media-editor
description: "Bearbeitet zwei Rohkamera-Videos zu einer stimmigen finalen Fassung: analysiert beide Blickwinkel, gleicht Bild und Ton ab, plant Kameraschnitte, retuschiert bei Bedarf Standbilder und liefert einen final gerenderten CapCut-Schnitt. Verwende diese Fähigkeit bei Interview-, Podcast-, Event-, Tutorial-, Creator- oder Social-Media-Aufnahmen mit zwei Kameraquellen sowie bei gewünschten Bildkorrekturen aus dem Material. Nicht für reine Ein-Kamera-Schnitte ohne Bildbearbeitung oder für vollständig neu generierte Videos ohne Rohmaterial."
---

# Zwei-Kamera-Medienbearbeitung

## Ziel

Aus zwei Rohkameraquellen entsteht ein ruhiger, nachvollziehbarer Schnitt mit konsistenter Bildwirkung. Die Fähigkeit kann zusätzlich ausgewählte Einzelbilder retuschieren oder als Cover aufbereiten.

## Eingaben und Ergebnis

- Erwartet zwei Kameraquellen; optional: Schnittziel, Zielformat, Markenstil, Musik, Sprechertext, Referenzbilder oder gewünschte Retuschen.
- Liefert: finalen Video-Export; optional ein bearbeitetes Cover-/Standbild und Untertitel, wenn Sprache oder ein Cover gewünscht sind.
- Wenn nur eine Quelle vorhanden ist, benenne die Einschränkung und frage, ob ein Ein-Kamera-Schnitt gewünscht ist.

## Workflow

1. **Material prüfen**
   - Identifiziere Kamera A und B, Länge, Ausrichtung, Bildrate, Audioquellen, sichtbare Personen und relevante Momente.
   - Analysiere beide Videos gemeinsam auf Synchronität, Blickachsen, Bildunterschiede, Verwacklung, Tonqualität und inhaltliche Wiederholungen.
   - Bei gesprochenem Inhalt: erstelle eine Transkription mit Wort-Zeitstempeln. Schneide nie ausschließlich an Untertitelblockgrenzen.

2. **Editplan anlegen**
   - Bestimme die führende Kamera pro Abschnitt anhand von Bildqualität, Sprecherfokus, Emotion, Aktion und Lesbarkeit.
   - Synchronisiere über Ton, Klappe oder eindeutige Bildereignisse. Bei fehlender gemeinsamer Synchronisationsreferenz frage nach dem gewünschten Startpunkt.
   - Schneide bevorzugt auf natürlichen Satz-, Atem- oder Handlungsgrenzen. Wechsle die Kamera nur mit erkennbarem Mehrwert; vermeide hektisches Hin-und-her.
   - Halte Blickrichtung und räumliche Kontinuität stabil. Verwende beide Kameras sichtbar, aber behandle die stärkere Quelle als Master.
   - Plane Farbangleichung: Belichtung, Weißabgleich, Kontrast, Hauttöne und Schärfeeindruck sollen zusammenpassen, ohne den Look künstlich zu überdrehen.

3. **Bestätigung**
   - Lege den Schnittplan vor, wenn die Auswahl von Hauptkamera, Stil, Seitenverhältnis, Kürzungsgrad oder Story-Aussage nicht eindeutig ist.
   - Hole vor einem finalen Render eine Freigabe ein, wenn ein größerer Neuaufbau, Musik, stilprägende Filter oder starke Retuschen vorgesehen sind.

4. **Video- und Bildbearbeitung**
   - Führe Bildangleichung und notwendige Reparaturen behutsam aus. Bewahre Gesichter, Hauttöne und reale Produktdetails, sofern keine Änderung verlangt wurde.
   - Bearbeite Standbilder nur für klar benannte Ziele wie Cover, Thumbnail, Porträtkorrektur oder störende Elemente. Nutze das tatsächliche Kamerabild als Referenz und erfinde keine neuen Personen, Marken oder Inhalte.
   - Erstelle Untertitel aus der Transkription, falls gewünscht. Sie müssen zur finalen Audiofassung passen und wichtige Bildelemente nicht verdecken.

5. **Schnitt, Render und Prüfung**
   - Lies vor der Komposition die aktuelle Fähigkeit `capcut-render` und folge ihrem Rezept-/Draft-Vertrag.
   - Baue jede zeitliche Bearbeitung – Synchronisierung, Quellbereiche, Kameraschnitte, Bildanpassung, Übergänge, Tonmischung, Untertitel, Overlays und Seitenverhältnis – als CapCut-Komposition. Nutze keine alternative Finalmontage.
   - Verwende für eine bewusst ausgewählte Cutsame-Ordner-Vorlage ausschließlich die dafür vorgesehene Template-Route; bereite Slots dort vor und rendere die gefüllte Vorlage.
   - Prüfe den Export auf Existenz, sinnvolle Dauer, nicht-leere Datei, Synchronität, Lesbarkeit von Untertiteln und konsistente Bildwirkung.
   - Liefere nur die finale Version sowie ausdrücklich gewünschte Untertitel oder das bearbeitete Cover.

## Referenzen

Lies vor der Arbeit die projektrelevanten Referenzen:

- `references/creative_brief.md` – Auftrag und noch zu klärende Projektparameter
- `references/style_guide.md` – Bild-, Schnitt- und Tonstandards
- `references/test_cases.md` – Abnahmetests für die Fähigkeit

## Kreative Regeln

- Priorisiere Verständlichkeit und natürliche Performance vor maximaler Schnittfrequenz.
- Vermeide Schnitte mitten in Worten, Blinzeln, schnellen Bewegungen oder sichtbaren Gestenwechseln, sofern kein bewusster Rhythmus verlangt ist.
- Entferne Pausen nur, wenn sie den Inhalt nicht beschädigen. Bei Interviews und Gesprächen zählt natürliche Atemluft als Stilmittel.
- Bei Hochformat darf das Bild neu gerahmt werden, aber Gesichter, Hände und entscheidende Aktionen müssen sicher im Bild bleiben.
- Nutze Musik, Filter oder grafische Elemente nur auf Wunsch oder wenn sie für das klar genannte Format nötig sind.

## Fehlerfälle

- Bei stark abweichenden Frameraten, fehlendem Ton, defekter Datei oder unsicherer Synchronisation: erkläre den konkreten Befund und fordere eine Entscheidung oder Ersatzdatei an.
- Wenn eine Kamera deutlich schlechter ist, nutze sie nur als kurze Schnittreserve und erkläre die Einschränkung im Editplan.
- Wenn eine angeforderte Retusche die Identität oder Realität einer Person wesentlich verändert, frage vor der Umsetzung nach einer klaren Freigabe.
- Wenn der Renderweg nicht verfügbar ist, vereinfache den CapCut-Draft oder melde den Blocker. Keine FFmpeg-Ersatzmontage.
