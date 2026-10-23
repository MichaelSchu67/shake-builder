# Shake Builder PWA 0.4

Neu: Pre-Workout- und Bike-to-Work-Vorlagen aus den beiden Originalmatrizen 1.4. Nach dem App-Update im neuen Reiter Pre & Bike den Knopf Pre- & Bike-Rezepte und Produkte importieren wählen. Die Vorschau ergänzt zwölf Startrezepte; alle vierzehn Vorlagen stehen im neuen Reiter bereit. Vorhandene Rezepte bleiben erhalten.

## Update auf GitHub Pages
1. In der bisherigen App auf jedem Gerät unter Sicherung eine JSON-Datei exportieren.
2. ZIP entpacken und seinen Inhalt in die Wurzel des bisherigen Repositorys MichaelSchu67/shake-builder übernehmen. Bestehende Pages-Adresse und Browserprofil beibehalten. Kein zusätzlicher Unterordner.
3. Die bisherige GitHub-Pages-Adresse öffnen. Nach dem ersten Laden die App ganz schließen und erneut öffnen, bis in der Kopfzeile PWA 0.4 steht. Bei Bedarf im Browser neu laden. Browserdaten nicht löschen.
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

## Änderungen in 0.3.1

Recovery-Auswahllisten zeigen passende Produktkategorien: Proteinprodukte, Früchte, Hafer, Kohlenhydratquellen sowie optionale Module. Kohlenhydratquelle ersetzt die bisherige Beschriftung Maltodextrin für das KH-Ziel; auch Cluster Dextrin ist auswählbar. Die Berechnung verwendet den tatsächlichen KH-Gehalt des gewählten Produkts. Die Matrix nennt ursprünglich Maltodextrin; die alternative Produktwahl erfolgt durch den Nutzer.

Bekannte Produkte aus Backup, Master 1.5 und Matrix-Früchten werden anhand ihrer bestehenden IDs zugeordnet. Unbekannte eigene Produkte bleiben unter Sonstiges. Unter Produkte → Kategorie für den Recovery-Baukasten kann die Zuordnung gespeichert oder korrigiert werden. Dafür ist kein Neuimport erforderlich. Kategorien bleiben im JSON-Backup erhalten. Die normale Produktübersicht und der freie Rezepteditor zeigen weiterhin alle Produkte alphabetisch. Im Recovery-Baukasten werden für Protein, Frucht, Hafer und KH-Quelle Produkte mit Einheit g unterstützt. Für Säfte im PP-Modul ist auch ml möglich.

## Pre-Workout und Bike-to-Work in 0.4

Quellen: Pre-Workout-Master-Matrix.docx (Dokumenttitel Pre-Workout-Master-Matrix 1.4) und Bike-to-Work-Matrix 1.4.docx. Die Dokumente wurden gelesen und nicht verändert. Aussagen zu gesundheitlichen oder sportwissenschaftlichen Wirkungen werden als Quelleninhalt behandelt und nicht neu bewertet.

Enthalten sind PRE-SWIM LOCKER, SENSITIVE, STANDARD und HARD, PRE-STRENGTH STANDARD und VOLUME sowie ARGININ PRE-WORKOUT. Dazu kommen Classic Banana, Blueberry Beet, Cherry Beet, Strawberry Light, Pineapple Fresh, Mango Beet und Watermelon Fresh.

Im Reiter Pre & Bike eine Vorlage wählen. Originalmengen und Mengenbereiche sind vorgegeben. Bei Bereichen ist die untere Quellgrenze voreingestellt; dies ist eine sichtbar ausgewiesene Startvariante. Wasser wird separat in ml gespeichert. Optionale Zutaten sind zunächst ausgeschaltet. Für jeden Drink lässt sich ein neues Rezept speichern; es steht anschließend unter Rezepte mit Wasser und Quellenhinweisen. Die Matrixnotizen beschreiben den Erstellungsstand, spätere Änderungen der Zutaten im freien Editor prüfen.

Die feste Bike-Basis ist 250 ml Alnatura Rote-Bete-Saft, 100 g ja! Magerquark, 15 g Achterhof Bio Protein Mix Rote Beeren und 0,5 g Salz. Die jeweils genannte Frucht und das separate Wasser kommen dazu. Heidelbeeren sind als eigene Produktvariante erfasst und werden nicht stillschweigend mit Wildheidelbeeren gleichgesetzt. Ananas, Wassermelone, ja! Magerquark und Salz erhalten ausdrücklich unvollständige Produktdatensätze. Der vorhandene generische Quark wird nicht als belegter ja!-Quark ausgegeben. Das Performance-Modul erlaubt optional 10–20 g Maltodextrin; die tatsächlichen Kohlenhydrate werden aus dem Produktdatensatz berechnet. Die Quelle vereinfacht diese Mengen zu 10–20 g KH; diese Vereinfachung wird nicht ungeprüft in die Produktwerte übernommen.

Bei Pre-Workout wird das belegte AlpenPower Cluster Dextrin (HBCD) verwendet. Die MINAID-Mengen sind 0,45 g bei Sensitive bzw. 0,9 g bei Standard/Hard. Die in der Matrix angegebenen Pulvergramm sind Rezeptmengen und werden nicht als exakte Gramm Kohlenhydrate ausgegeben.

Bulk Plus ist ein anderes Produkt als Bulk Elektrolytpulver P001. Die Quelle nennt für die Kraft-Drinks eine halbe Herstellerportion, aber kein Grammgewicht. Deshalb werden PRE-STRENGTH STANDARD und VOLUME als offene Vorlagen geliefert und erst nach Eingabe einer belegten Grammmenge speicherbar. Die App erfindet kein Portionsgewicht und substituiert nicht automatisch P001. Citrullin/Arginin stehen entsprechend der Endfassung als optionale Zutaten bereit, bei der Arginin-Phase ist Arginin dagegen Bestandteil des gewählten Rezepts. Produktidentität/Zusammensetzung dieser Zusätze sind noch zu belegen; Citrullin und Citrullin-Malat werden nicht gleichgesetzt.

Nitrat bleibt das im Original separat vorgesehene Modul mit eigenem Timing. Ohne deklarierten Nitratgehalt wird weder eine Produktdosis berechnet noch ein Rote-Bete-Shot in den Pre-Drink gemischt. Aus dem Nitratgehalt des Bike-Safts wird ebenfalls nichts abgeleitet.

Das Startpaket data/pre-bike-startpaket-0.4.json enthält zwölf fertige Startvarianten plus Produktabhängigkeiten. Die Regelsammlung data/pre-bike-vorlagen-1.4.json dokumentiert alle vierzehn Vorlagen, ist aber kein direkt importierbares Schema-1-Backup. Einzelne Produkte haben leere Nährwerte. In diesem Fall ist das Rezept mit bekannten Mengen speicherbar, betroffene Nährwertsummen bleiben jedoch unbekannt. Geschätzte Gesamtbilanzen der Dokumente werden nicht zurückgerechnet. Die bestehenden vorläufigen Backup- und Master-Werte sind keine neue Herstellerprüfung.

Zusätzliche Tests: node tests/workout.test.cjs und node tests/workout-ui.test.cjs prüfen Mengen, optionale Zusätze, offene Portionen, unvollständige Summen, Quellen/Wasser beim erneuten Laden sowie Import ohne Bestandsverlust und ohne Dubletten bei Wiederholung. Die Browseransicht, Installation und Offline-Nutzung auf Zielgeräten sind weiterhin nach Veröffentlichung zu prüfen.
