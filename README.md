# Shake Builder PWA 0.3

## Update auf GitHub Pages
1. In der bisherigen App auf jedem Gerät unter Sicherung eine JSON-Datei exportieren.
2. ZIP entpacken und seinen Inhalt in die Wurzel des bisherigen Repositorys MichaelSchu67/shake-builder übernehmen. Bestehende Pages-Adresse und Browserprofil beibehalten. Kein zusätzlicher Unterordner.
3. Die bisherige GitHub-Pages-Adresse öffnen. Nach dem ersten Laden die App ganz schließen und erneut öffnen, bis in der Kopfzeile PWA 0.3 steht. Bei Bedarf im Browser neu laden. Browserdaten nicht löschen.
4. Vorhandene lokale Rezepte und Produkte bleiben erhalten. Der Speicherschlüssel wird beibehalten. Es erfolgt kein automatischer Produktimport.

## Recovery-Rezepte erstellen
1. Den neuen Reiter Recovery 2.9 öffnen.
2. Master-Produkte und Matrix-Früchte importieren anklicken. In der Sicherungsvorschau Einträge prüfen und Vorschau übernehmen. Bereits identische Einträge werden übersprungen. Änderungen bei gleicher ID bleiben als Kopien erhalten. Vor Import wird eine lokale Sicherung angelegt und ein Download angestoßen.
3. Zurück zu Recovery 2.9. R0 Basic oder R1–R6 wählen. Proteinbasis und passendes Produkt auswählen. P1/P2/P3 werden auf ein wählbares Pulver-Proteinziel von 33–35 g berechnet; P4 verwendet 40 g Clear Whey. Prüfen, ob das gewählte Produkt zur Proteinbasis passt. Fehlende Produkte können unter Produkte ergänzt werden.
4. Frucht, gegebenenfalls Haferpulver und Maltodextrin wählen. Wassermenge innerhalb des angezeigten Matrixbereichs einstellen. Für R3/R4/R5/R6 gelten 50/70/85/25 g Gesamt-Kohlenhydrate.
5. Elektrolyte, Kreatin und Polyphenole sind optional. Voreinstellung ist ohne Zusätze. Die hinterlegten Elektrolytpulvermengen gelten ausschließlich für Bulk (Master P001). Die Kreatinumrechnung gilt ausschließlich für AlpenPower Pur Creatin (P014; 3,4 g Pulver liefern 3 g Kreatin). Andere Produkte nicht unter diesen Identitäten eintragen.
6. Vorschau prüfen und Als neues Rezept speichern. Das Ergebnis steht anschließend unter Rezepte und wird im JSON-Backup mit Wasser und Quellenhinweisen gesichert. Spätere Zutatenänderungen im normalen Rezepteditor ändern nicht rückwirkend die Baukasten-Konfiguration; die Notizen beschreiben den Erstellungsstand. Für eine neu berechnete Variante erneut den Recovery-Baukasten verwenden.

R2 erlaubt 0–15 g zusätzliches Maltodextrin. Bei R3–R6 berechnet die App nur die Differenz zum KH-Ziel anhand des gewählten Maltodextrinprodukts. Frucht, Protein, Hafer und optionale Zusätze werden angerechnet. Übersteigt die Zusammenstellung bereits das Ziel, wird das Speichern gesperrt. Pulver wird intern ungerundet berechnet; die Anzeige zeigt zwei Nachkommastellen.

Fehlt der Kohlenhydratwert einer verwendeten Zutat, wird die Zielberechnung gesperrt und die Zutat benannt. Dies betrifft auch Elektrolytpulver oder Kreatin mit nicht belegten Makrowerten. Fehlende Werte nicht pauschal mit Null füllen: erst Produktbeleg ergänzen oder den optionalen Zusatz weglassen. Nicht benötigte Produkte blockieren keine Berechnung.

PP1 verwendet die bereits ausgewählten 100 g Sauerkirsche oder Wildheidelbeere und fügt keine zweite Fruchtportion hinzu. PP2/PP3 erfordern eine eigene Produktmenge, weil die Originalmatrix keine feste Dosis nennt. Gramm bzw. Milliliter richten sich nach dem gewählten Produkt. Kapseln und Beutel ohne eindeutige Massenangabe werden noch nicht unterstützt. Das Pre-Sleep-System bleibt separat und ist nicht Teil von R6.

## Alphabetische Produktlisten
Alle Produkt-Auswahllisten, die Produktübersicht und der CSV-Export sind alphabetisch nach dem angezeigten Namen sortiert (deutsche Sortierung mit Umlauten). Bestehende IDs und Rezeptverweise werden dadurch nicht verändert.

## Quellen und Datenpakete
- Recovery-Master-Matrix 2.9.docx: Originalquelle für Stufen, Proteinziele, Mengenbereiche und Module. Regeln: data/recovery-matrix-2.9.json (Regeldokument, kein direkt importierbares Schema-1-Paket).
- Master-Produktdatenbank_1.5.xlsx: Originalquelle für 22 importierbare Produkte. Drei Produkte mit Kapsel-/Beuteleinheiten ohne Massenumrechnung bleiben ausgenommen. Die Originaldatei wurde nicht verändert.
- data/recovery-startpaket-0.3.json: direkt importierbares Paket mit diesen 22 Produkten und fünf getrennten Fruchtvarianten aus Abschnitt 8 der Recovery-Matrix. Keine automatische Überschreibung vorhandener Produkte, keine vorgetäuschten festen Recovery-Rezepte.
- data/master-produktdatenbank-1.5-import.json: nur Master-Produkte. Detaillierte Abweichungen stehen in Produktdatenbank-1.5-Importhinweise.md und den Paketnotizen.
- data/master-produktdatenbank-1.5-quellen.json: nichtleere Quellzeilen mit gespeicherten Formelwerten, als Nachschlagearchiv.
- data/original-backup.json: unveränderte ursprüngliche 14 Produkte und sechs Rezepte A–F. Diese bleiben verfügbar. Die Zuordnung zur Formula-Matrix 1.1 ist weiterhin unbelegt.

Priorität haben die ausdrücklich angegebenen 100-g-Werte im Blatt Nährwerte: Hafer P011 59 g KH/100 g (abweichende Portionsnotiz entspricht 60), Maltodextrin P023 95 g KH/100 g (abweichende Portionsnotiz entspricht 94). Die Originalmatrix nennt näherungsweise Maltodextrinmengen, die nicht blind als exakte Mengen übernommen werden. Die App berechnet neu mit den gewählten Produktwerten.

Fruchtvarianten aus der Matrix enthalten nur die dort genannten Kohlenhydrate und teilweise Ballaststoffe. Energie, Protein, Fett und weitere fehlende Angaben bleiben unbekannt. Daher kann das KH-Ziel berechenbar sein, während Gesamtprotein oder Energie unbekannt bleiben. Die separat ausgewiesene Proteinmenge aus dem Pulver ist davon unabhängig. Fehlende Werte erscheinen als Gedankenstrich oder unbekannt. Als Grenzwerte dokumentierte Angaben werden nicht als exakte Messwerte ausgegeben. Die bereitgestellten Quellen wurden nicht unabhängig mit aktuellen Herstelleretiketten abgeglichen.

## Sicherung und Fehler
Importe werden nur zusammengeführt. Vorher wird ein vollständiges lokales Backup separat gespeichert und geprüft. Unter Sicherung kann die letzte Importsicherung erneut heruntergeladen werden; sie wird beim nächsten Import erneuert. Wichtige Sicherungen extern aufbewahren. Rückimport einer Sicherung ergänzt fehlende oder abweichende Einträge als Kopien, kein destruktiver Gesamtersatz.

Speicherfehler rollen die zuletzt versuchte Änderung im Arbeitsspeicher zurück. Bei unlesbaren lokalen Daten wird Schreiben gesperrt und ein Rohdatenexport angeboten. Bei Änderung in einem anderen Fenster bitte neu laden. Daten bleiben je Gerät/Browser lokal, ohne automatische Synchronisation.

## Installation und Offlinebetrieb
GitHub Pages liefert die App über HTTPS. Android/Chrome: Menü → App installieren. iPad/Safari: Teilen → Zum Home-Bildschirm. Nach dem ersten erfolgreichen Online-Aufruf und abgeschlossenem App-Cache ist die App samt Startpaketen offline nutzbar. Neue Versionsdateien müssen vollständig hochgeladen sein, bevor der neue Offlinecache eingerichtet werden kann.

## Durchgeführte Prüfungen
- node tests/import.test.cjs: Erhalt, Konfliktkopien, Referenzen, Wiederholungen, Validierung.
- node tests/app.test.cjs: Vorschau ohne Schreiben, Sicherungs-/Speicherfehler, Übernahme, veraltete Vorschau, beschädigter Speicher.
- node tests/recovery.test.cjs: R0–R6, Proteinberechnung, KH-Ziele, E/CR/PP, fehlende Werte, Mengenbereiche, Sortierung und Recovery-Metadaten.
- node tests/recovery-ui.test.cjs: simulierte Oberflächenabläufe für Auswahl, neues Rezept, erneutes Laden, Sortierung und fehlende Produkte.
- Syntax- und Paketdateiprüfungen.

Die Tests verwenden simulierte Oberflächen und prüfen Berechnungen und Speicherung. Der echte Browser konnte die lokale Vorschau in dieser Sitzung nicht erreichen. Eine visuelle Browserprüfung sowie Installation und Offline-Neustart auf PC/Tablet sind deshalb nach Veröffentlichung noch erforderlich. Es wurde nichts automatisch auf GitHub veröffentlicht.
