# Karteikarten

Minimalistische Karteikarten-App für den Browser – ohne Installation, ohne Anmeldung.

**App öffnen:** https://superpuff027.github.io/karteikarten/

## Funktionen

- **Lernsets als Ordner** – im Menü einen Ordner wählen und nur dieses Fach lernen
- **Karte antippen zum Umdrehen** – Begriff → Erklärung oder umgekehrt (Erklärung → Begriff)
- **Vertiefungskarten** – Begriffe mit mehr Inhalt bekommen eine zweite Karte („Begriff: Methode“)
- **Drei Bewertungen** – *Nicht gewusst*, *Unsicher*, *Gewusst*; gewusste Karten werden beim Wiederholen seltener abgefragt, schwache zuerst
- **Lernstand** pro Ordner mit Fortschrittsbalken
- **Eigene Ordner und Karten** direkt in der App anlegen
- **Hell- und Dunkelmodus**
- Menü im **Hochformat**, Lernen im **Querformat**

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

- **Programmierpraktikum** (TUM Elektrotechnik, 1. Semester) – Computer-Modell, Betriebssystem, Toolchain, git & Shell, Funktionen, `main`, `printf`, Escaping, Kommentare

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
      more: 'Optional: ausführliche Erklärung (erzeugt eine zweite Karte).',
      moreLabel: 'Methode', // optional, Standard: „Methode“
    },
  ],
}
```

Formatierung in Texten: Leerzeile = neuer Absatz, `- ` = Liste, `**fett**`, `` `code` ``.

## Lokal starten

Einfach `index.html` im Browser öffnen – keine Abhängigkeiten, kein Build-Schritt.
