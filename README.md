# Shake Builder PWA 0.2

## GitHub Pages aktualisieren
1. In der bisherigen App auf jedem Gerät eine JSON-Sicherung exportieren.
2. ZIP entpacken. index.html, app.js, import-core.js, sw.js, manifest.webmanifest sowie icons und data in die Wurzel von MichaelSchu67/shake-builder übernehmen. Keine zusätzliche ZIP-Unterordnerebene hochladen.
3. GitHub Settings → Pages → Deploy from a branch → bisheriger Branch, / (root). Bestehende Pages-Einstellungen beibehalten.
4. https://michaelschu67.github.io/shake-builder/ öffnen. App nach dem ersten Laden vollständig schließen und erneut öffnen, bis PWA 0.2 angezeigt wird. Der bisherige lokale Speicherschlüssel bleibt erhalten. Browserdaten nicht löschen.
5. Android/Chrome: Menü → App installieren. iPad/Safari: Teilen → Zum Home-Bildschirm. Nach erfolgreichem ersten HTTPS-Aufruf sind App und Datenpakete offline verfügbar.

## Sicher importieren
Unter Sicherung eine JSON-Datei wählen oder Produktdatenbank + Backup-Rezepte prüfen anklicken. Die Vorschau zeigt jeden Eintrag und seine geplante Behandlung. Erst Vorschau übernehmen speichert.

Bestehende Einträge bleiben erhalten. Identische IDs und Inhalte werden übersprungen. Abweichender Inhalt bei gleicher ID erhält eine Kopie mit -import-N; Rezeptverweise werden passend angepasst. Ein erneuter Import derselben Datei erzeugt keine weiteren Kopien. Gleiche Namen mit verschiedenen IDs bleiben getrennt. Änderungen seit der Vorschau erfordern eine neue Vorschau.

Vor Übernahme wird eine vollständige Sicherung unter einem separaten lokalen Schlüssel gespeichert und geprüft. Scheitert dies oder das Speichern des Ergebnisses, wird der Import abgebrochen. Nach Erfolg wird ein zusätzlicher Download angestoßen. Falls blockiert: Letzte Sicherung vor Import herunterladen. Diese lokale Sicherung wird beim nächsten Import erneuert; wichtige Versionen extern aufbewahren.

Wiederherstellen: Sicherungsdatei erneut mit Vorschau zusammenführen. Fehlende Einträge werden ergänzt, abweichende als Kopien erhalten. Es gibt keinen destruktiven Gesamtersatz und keinen Zurücksetzen-Knopf. Bei unlesbaren lokalen Daten sperrt die App das Schreiben. Bei Änderungen in einem zweiten Fenster neu laden. Daten bleiben pro Gerät und Browser gespeichert; keine automatische Synchronisation.

## Quellen und fehlende Originale
Die unveränderte Originalanlage steht in data/original-backup.json (Schema 1, 14 Produkte, 6 Rezepte). Der genannte /mnt/data-Pfad ist in dieser Windows-Sitzung nicht vorhanden; die gleichnamige Anlage wurde aus dem referenzierten Chat gelesen. Der Repository-Startbestand stimmt inhaltlich überein.

- produktdatenbank.json: 14 Produkte, keine Rezepte.
- backup-rezepte.json: 14 Produkte und 6 Backup-Rezepte mit Abhängigkeiten.
- formula-matrix-1.1.json: leeres Statuspaket, Originalrezepturen fehlen.
- recovery-matrix-2.9.json: leeres Statuspaket, Originalrezepturen fehlen.

Die zugänglichen Chats enthalten weder Originalmatrizen noch Herstellerbelege. Die sechs Backup-Rezepte werden daher keiner Matrix zugeschrieben. Sämtliche Produktnährwerte sind vorläufig und nicht unabhängig belegt. Unbekannte Werte bleiben null; fehlt ein benötigter Wert, zeigt die Rezeptsumme einen Gedankenstrich. Für vollständige Matrizen werden die Originaldateien benötigt.

Import: Schema 1, maximal 5 MB, 5000 Produkte/Rezepte, 500 Zutaten je Rezept. Eindeutige IDs, gültige Produktverweise, positive endliche Mengen und nichtnegative numerische Nährwerte oder null erforderlich. Daten werden als Text dargestellt.

## Prüfung
node tests/import.test.cjs prüft Erhalt bestehender Daten, Konfliktkopien, Referenzen, wiederholte Importe und ungültige Eingaben. node --check app.js und node --check sw.js prüfen Syntax. Installation, Offline-Neustart und Downloads nach Veröffentlichung auf den Zielgeräten prüfen; diese Browserprüfungen sind hier nicht durchgeführt.

Das ZIP veröffentlicht nichts automatisch und verändert keine Daten auf bestehenden Geräten.

Zusätzlich geprüft: node tests/app.test.cjs testet Vorschau ohne Schreibzugriff, Abbruch bei Sicherungs- und Speicherfehlern, erfolgreiche Übernahme, veraltete Vorschau sowie Erhalt beschädigter lokaler Rohdaten. Dies sind simulierte App-Abläufe, keine Geräte- oder Browserinstallationstests.
