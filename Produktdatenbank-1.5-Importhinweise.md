# Produktdatenbank 1.5 für Shake Builder 0.2

Importiert werden 22 Produkte mit g/ml als Einheit. Bestehende Einträge werden nicht ersetzt. IDs beginnen mit master15-, damit die Master-Produkte von vorläufigen Startprodukten unterscheidbar bleiben. Es sind noch keine Recovery-Rezepte enthalten.

## Import

1. In der App Sicherung → JSON exportieren.
2. Unter JSON-Sicherung importieren die Datei master-produktdatenbank-1.5-import.json auswählen.
3. Vorschau prüfen und übernehmen.

## Quellen und Einschränkungen

- P002: Makrowerte nicht als exakte Werte importiert; Grenzwertkennzeichnung in Quelle nicht durchgängig einzelnen Feldern zuordenbar.
- P003: Makrowerte nicht als exakte Werte importiert; Grenzwertkennzeichnung in Quelle nicht durchgängig einzelnen Feldern zuordenbar.
- P021: Makrowerte nicht als exakte Werte importiert; Grenzwertkennzeichnung in Quelle nicht durchgängig einzelnen Feldern zuordenbar.
- P011: 59 g KH/100 g aus Nährwerte!G5 verwendet; Kohlenhydratprofil nennt 18 g/30 g (=60 g/100 g).
- P023: 95 g KH/100 g aus Nährwerte!G15 verwendet; 47 g/50 g aus Produktnotiz/Kohlenhydratprofil ergeben 94 g/100 g.
- P012: Fett <0,1 g/100 g ist eine Obergrenze; im Schema-1-Import als unbekannt statt exakte 0,1 g erfasst.
- Keine unabhängige Herstellerprüfung. Quellenstatus aus bereitgestellter Arbeitsmappe übernommen.
- Schema 1 bildet Natrium, Kreatin, Aminosäuren und Grenzwerte nicht vollständig ab. Originalangaben im Quellenarchiv erhalten.

Nicht in Schema 1 importiert:

- P007 natural elements Glucosamin & Chondroitin: Portionseinheit Kapseln ohne eindeutige Massenumrechnung.
- P008 natural elements MSM: Portionseinheit Kapseln ohne eindeutige Massenumrechnung.
- P017 4Endurance Cherry Power+: Portionseinheit Beutel ohne eindeutige Massenumrechnung.

Das Quellenarchiv erhält die nichtleeren Tabellenzeilen einschließlich vorhandener gespeicherter Formelwerte, ersetzt aber nicht die unveränderte Originaldatei. Die Arbeitsmappe wurde nicht verändert. Fehlende Angaben bleiben null.
