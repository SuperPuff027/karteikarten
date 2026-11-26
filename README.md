# Karteikarten

Minimalistische Karteikarten-App für den Browser – ohne Installation, ohne Anmeldung.

**App öffnen:** https://superpuff027.github.io/karteikarten/

## Als App installieren

Die App lässt sich auf den Home-Bildschirm legen, startet dann im Vollbild und funktioniert auch offline. In der App gibt es dafür unten im Menü den Knopf **„Auf Home-Bildschirm installieren“**.

- **iPhone/iPad:** Link in Safari öffnen → Teilen-Symbol → „Zum Home-Bildschirm“ → „Hinzufügen“
- **Android:** Link in Chrome öffnen → „Installieren“ antippen (oder Menü ⋮ → „App installieren“)
- **PC/Mac:** In Chrome oder Edge auf das Installieren-Symbol in der Adressleiste klicken

## Funktionen

- **Lernsets als Ordner** – im Menü einen Ordner wählen und nur dieses Fach lernen
- **Karte antippen zum Umdrehen** – Begriff → Erklärung oder umgekehrt (Erklärung → Begriff)
- **Vertiefungskarten** – Begriffe mit mehr Inhalt bekommen eine zweite Karte („Begriff: Methode“)
- **Berechnungs-Karten** – zu allem, was man berechnen kann, eine Karte mit dem Rechenweg in Schritten („Begriff: Berechnung“)
- **Drei Bewertungen** – *Nicht gewusst*, *Unsicher*, *Gewusst*; gewusste Karten werden beim Wiederholen seltener abgefragt, schwache zuerst
- **Lernstand** pro Ordner mit Fortschrittsbalken
- **Eigene Ordner und Karten** direkt in der App anlegen
- **Karten ansehen und bearbeiten** – in der Kartenliste eines Ordners eine Karte antippen: sie öffnet sich groß (antippen zum Umdrehen, ‹ › zum Blättern); über den Stift oben rechts lässt sie sich bearbeiten. Änderungen an Karten aus Skripten werden nur im eigenen Browser gespeichert und lassen sich mit „Original wiederherstellen“ zurücknehmen
- **Hell- und Dunkelmodus**
- Für das **Hochformat** am Handy gemacht (funktioniert auch quer und am PC)
- **Formeln im LaTeX-Stil** (KaTeX)
- **Kurze Codebeispiele** auf den Karten zu Begriffen, die man in Code schreiben kann

Lernstand und eigene Karten werden nur im eigenen Browser gespeichert (localStorage) – jedes Gerät hat seinen eigenen Stand.

## Tastatur

| Taste | Aktion |
|---|---|
| Leertaste / Enter | Karte umdrehen |
| 1 / ← | Nicht gewusst |
| 2 / ↓ | Unsicher |
| 3 / → | Gewusst |
| Esc | Lernen beenden |

## Enthaltene Lernsets

- **Programmierpraktikum** (TUM Elektrotechnik, 1. Semester) – das Wichtigste fürs Programmieren mit kurzen Codebeispielen, in 3 Kapitel-Unterordnern plus Unterordner C-Syntax (Operatoren, Verzweigungen, Schleifen, Arrays, Zeiger, struct)
- **Schaltungstheorie** (TUM Elektrotechnik, 1. Semester) – in 11 Kapitel-Unterordnern, einzeln oder alle zusammen lernbar; mit 42 selbst gezeichneten Schaltbild-Karten (erzeugt mit `tools/schaltbilder.py`)
- **Computertechnik** (TUM Elektrotechnik, 1. Semester) – Zahlendarstellung, arithmetische Schaltungen, Universalrechner, Befehlssätze, MMIX, Pipelining, Cache; in 8 Kapitel-Unterordnern, mit kurzen MMIX-Codebeispielen und 25 selbst gezeichneten Schaltbild-Karten (erzeugt mit `tools/ct_schaltbilder.py`)
- **Lineare Algebra 1** (TUM Elektrotechnik, 1. Semester) – Vektoren, LGS, Gauß, Matrizen, Inverse, Unterräume, Rangsatz, lineare Abbildungen, Basiswechsel, Markov-Ketten, Eigenwerte, Determinanten; in Kapitel-Unterordnern, mit 4 selbst gezeichneten Skizzen (`tools/la_schaltbilder.py`)
- **Analysis1** (TUM Elektrotechnik, 1. Semester) – Kapitel 1–2: Mengen, Induktion, Zahlbereiche, Ungleichungen, Supremum, Binomialformel, Trigonometrie, komplexe Zahlen, Folgen, Grenzwerte, Reihen; in Abschnitts-Unterordnern, mit Berechnungs-Karten und 4 Skizzen (`tools/an_schaltbilder.py`)

## Eigene Lernsets hinzufügen

Lernsets stehen in [`decks.js`](decks.js). Jeder Eintrag ist ein Ordner:

```js
{
  id: 'mein-fach',
  name: 'Mein Fach',
  color: 'sage',            // sage, rose, sky, sand, lilac, mint, peach, stone
  cards: [
    {
      term: 'Begriff',
      def: 'Kurze Definition – nur das Wichtigste.',
      ex: 'int x = 5;',         // optional: kurzes Codebeispiel auf der Rückseite
      more: 'Optional: ausführliche Erklärung (erzeugt eine zweite Karte).',
      moreLabel: 'Methode', // optional, Standard: „Methode“
      calc: 'Rechenweg …',   // optional: Berechnungs-Karte „Begriff: Berechnung“
    },
  ],
}
```

Weitere Möglichkeiten (siehe [`decks/schaltungstheorie.js`](decks/schaltungstheorie.js)):

- `{ chapter: '1 Grundlagen' }` zwischen den Karten teilt das Lernset in Kapitel-Unterordner
- Karten mit `img: 'schaltbilder/datei.png'` sind Schaltbild-Karten (eine Seite Begriff, andere Seite Bild + `def` als Bildunterschrift)
- weitere Lernset-Dateien in `index.html` und `sw.js` eintragen

Formatierung in Texten: Leerzeile = neuer Absatz, `- ` = Liste, `**fett**`, `` `code` ``,
Formeln im LaTeX-Stil mit `$…$` (im Text) oder `$$…$$` (abgesetzt). In JavaScript-Strings Backslashes verdoppeln, z. B. `'$\\frac{a}{b}$'`.

## Lokal starten

Einfach `index.html` im Browser öffnen – keine Abhängigkeiten, kein Build-Schritt.
