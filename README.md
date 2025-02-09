# AMEX zu SevDesk Konverter

Eine einfache, browserbasierte Anwendung zur Konvertierung von American Express CSV-Dateien in das SevDesk-Format.

## 🚀 Features

- Drag & Drop Upload von CSV-Dateien
- Automatische Konvertierung von AMEX zu SevDesk Format
- Datumformatanpassung (DD/MM/YYYY → DD.MM.YYYY)
- Betragsumwandlung (negativ für SevDesk)
- Sofortiger Download der konvertierten Datei
- Offline-fähig
- Keine Serverabhängigkeit
- Datenschutzfreundlich (alle Daten bleiben im Browser)

## 🔧 Technische Details

Die Anwendung ist als statische Single-Page-Application (SPA) implementiert und verwendet:

- VanillaJS für die Funktionalität
- CSS für das responsive Design
- HTML5 File API für die Dateiverarbeitung
- Keine externen Abhängigkeiten

## 📦 Projektstruktur

```
├── index.html          # Hauptseite
├── assets/
│   ├── main.js        # JavaScript-Logik
│   └── style.css      # Styling
└── README.md          # Diese Datei
```

## 🚀 Verwendung

1. Öffnen Sie die `index.html` in einem modernen Browser
2. Laden Sie Ihre AMEX CSV-Datei entweder per:
   - Drag & Drop in die markierte Zone
   - Klick auf die Box zum Öffnen des Dateiauswahldialogs
3. Die konvertierte Datei wird automatisch heruntergeladen

## 💡 CSV-Format

### Eingabeformat (AMEX)
```csv
"Datum","Beschreibung","Betrag"
"01/02/2024","Beispiel Transaktion","123,45"
```

### Ausgabeformat (SevDesk)
```csv
"Datum","Beschreibung","Betrag"
"01.02.2024","Beispiel Transaktion","-123,45"
```

## 🔒 Datenschutz

- Alle Datenverarbeitung findet lokal im Browser statt
- Keine Daten werden an Server übertragen
- Keine Cookies oder lokale Speicherung
- Keine Tracking-Mechanismen

## 🌐 Browser-Kompatibilität

- Chrome/Edge (neueste Version)
- Firefox (neueste Version)
- Safari (neueste Version)
- Andere moderne Browser mit File API Unterstützung

## 📄 Lizenz

GNU General Public License v3.0 (GPL-3.0) - Siehe [LICENSE](/LICENSE) für Details.

Diese Software ist freie Software: Sie können sie weitergeben und/oder modifizieren unter den Bedingungen der GNU General Public License, wie von der Free Software Foundation veröffentlicht, entweder Version 3 der Lizenz oder (nach Ihrer Wahl) jeder späteren Version.

Diese Software wird in der Hoffnung bereitgestellt, dass sie nützlich sein wird, aber OHNE JEDE GEWÄHRLEISTUNG; auch ohne die implizite Gewährleistung der MARKTFÄHIGKEIT oder EIGNUNG FÜR EINEN BESTIMMTEN ZWECK. Siehe die GNU General Public License für weitere Details.

## 🔗 Affiliet-Links

Links im Footer sind Affiliet-Links. Wenn du diese verwendest, bekommt ich eine kleine Provision.

- [American Express](https://americanexpress.com/de-de/referral/gold?ref=rALFWqGWz&XLINK=MYCP)
- [SevDesk](https://sevdesk.cello.so/mHaPvx3yG1x) 