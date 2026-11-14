/* Lernsets aus Skripten.
 * Jeder Eintrag = ein Ordner. Pro Karte:
 *   term       – Hauptbegriff (Vorderseite)
 *   def        – nur das Wichtigste: Definition / kurze Erklärung
 *   more       – optional: Vertiefung -> erzeugt eine zweite Karte „Begriff: Methode“
 *   moreLabel  – optional: Bezeichnung der Vertiefung (Standard: „Methode“)
 * Farben: sage, rose, sky, sand, lilac, mint, peach, stone
 * Formatierung in Texten: Leerzeile = neuer Absatz, "- " = Liste, **fett**, `code`,
 *   Formeln im LaTeX-Stil: $…$ im Text, $$…$$ abgesetzt (Backslashes im JS-String doppelt: \\frac)
 */
window.DECKS = [
  {
    id: 'programmierpraktikum',
    name: 'Programmierpraktikum',
    color: 'sky',
    description: 'Skripte S. 13–111: das Wichtigste fürs Programmieren – Computer-Modell, Toolchain, git & Shell, Funktionen, printf.',
    cards: [
      { chapter: '2 Computer-Modelle und Programmausführung' },
      {
        term: 'Befehl',
        def: 'Enthält die Information, welche Daten (Quelloperanden) wie verarbeitet werden (Operation) und wohin das Ergebnis geschrieben wird (Zieloperand).',
      },
      {
        term: 'Programm',
        def: 'Folge von Befehlen, die einer nach dem anderen ausgeführt werden.',
      },
      {
        term: 'CPU',
        def: 'Central Processing Unit (Mikroprozessor): lädt Befehle und Daten aus dem Speicher und führt die Befehle aus.',
      },
      {
        term: 'Arbeitsspeicher (RAM)',
        def: 'Random Access Memory: Speicher, mit dem der Prozessor arbeitet. Programme und Daten werden vom Massenspeicher hineingeladen; volatil.',
      },
      {
        term: 'Adresse',
        def: 'Nummer einer adressierbaren Einheit im Speicher. Im RAM bilden je $8\\,\\text{Bit} = 1\\,\\text{Byte}$ eine Einheit; durchnummeriert ab 0.',
      },
      {
        term: 'Register',
        def: 'Sehr schnelle Speicher direkt in der CPU, die jeweils ein Datenwort (z. B. 64 Bit) enthalten; meist als SRAM ausgeführt.',
        more: 'Warum Register schneller sind als DRAM:\n- nur wenige Register → aufwendigere, schnellere Technik (SRAM) möglich\n- wenige Register → einfache Adressierung, kurze Zugriffszeit\n- direkt im Prozessor → kurze Datenpfade, geringe parasitäre Kapazitäten/Induktivitäten\n\nVorteil der Zweiteilung DRAM/Register: Ein Datenwort wird einmal (langsam) geladen und kann dann für viele Operationen (schnell) aus dem Register verwendet werden.',
        moreLabel: 'Methode',
      },
      {
        term: 'Befehlszähler',
        def: 'Register mit der Adresse des auszuführenden Befehls. Normal: $\\text{BZ} \\leftarrow \\text{BZ} + 4$ (Befehlslänge), bei Sprüngen: $\\text{BZ} \\leftarrow \\text{BZ} + \\text{Offset}$.',
      },
      {
        term: 'Maschinencode',
        def: 'Binär codierte Befehle (z. B. `0xA9BF7BFD`), die der Prozessor direkt ausführen kann.',
      },
      {
        term: 'Assembler-Code',
        def: 'Für Menschen lesbare Textform des Maschinencodes, z. B. `stp fp, lr, [sp,#-0x10]!`. Nicht direkt ausführbar.',
      },
      {
        term: 'Little Endian',
        def: 'Byte-Reihenfolge, bei der das niederwertigste Byte an der niedrigsten Adresse steht: `0xFD7BBFA9` liegt als `A9 BF 7B FD` im Speicher.',
      },
      {
        term: 'Binärdatei',
        def: 'Datei mit Maschinencode, die mit einem Loader in den Speicher geladen oder mit einem Programmieradapter übertragen werden kann.',
      },
      {
        term: 'Bare Metal',
        def: 'Programm läuft direkt auf der „nackten“ Hardware, ohne Betriebssystem – z. B. auf dem Mikrocontroller.',
        more: '- nach Reset: Start bei Adresse 0 (Reset-Interrupt) → Sprung in main\n- direkter Zugriff auf die Spezialregister des Prozessors: Betriebsmodus, Timer, PWM-Signale, Interrupts, ISRs\n- Funktion der Speicherstellen ergibt sich aus dem Datenblatt\n- auf einem PC ist dieser Zugriff nur dem Betriebssystem erlaubt',
        moreLabel: 'Methode',
      },
      {
        term: 'Interrupt',
        def: 'Asynchrone Unterbrechung des Programms durch ein Ereignis (z. B. Tastendruck, Timer-Ablauf), die einen Sprung in eine Interrupt-Service-Routine auslöst.',
      },
      {
        term: 'Interrupt-Service-Routine (ISR)',
        def: 'Programmteil, in den bei einem Interrupt verzweigt wird und der das Ereignis behandelt.',
      },
      {
        term: 'Kernel',
        def: 'Kern des Betriebssystems: verwaltet Speicher, Hardware und Dateisystem, startet und beendet Prozesse und führt sie quasi-parallel aus.',
      },
      {
        term: 'Prozess',
        def: 'Laufende Instanz eines Programms zusammen mit ihrem Prozess-Kontext.',
      },
      {
        term: 'Preemptives Multitasking',
        def: 'Prozesse werden per Timer-Interrupt nach jeder Zeitscheibe unterbrochen und abwechselnd stückweise ausgeführt – scheinbar parallel.',
        more: '- Kernel lädt Kontext von P1 und springt in P1\n- Zeitscheibe läuft ab → Timer-Interrupt → ISR des Betriebssystems\n- Kernel sichert Kontext von P1, lädt Kontext von P2, setzt P2 an seiner letzten Stelle fort\n- usw. für P3, P1, P2, …\n\nGegensatz **kooperatives Multitasking:** Programme werden nicht unterbrochen, sondern müssen freiwillig an den Kernel zurückgeben.',
        moreLabel: 'Ablauf',
      },
      {
        term: 'Kernel Space / Kernel Mode',
        def: 'Adressraum des Betriebssystems; Code dort läuft im Kernel Mode mit privilegierten Rechten und kann auf alle System-Ressourcen zugreifen.',
      },
      {
        term: 'User Space / User Mode',
        def: 'Getrennte virtuelle Adressräume der Programme; sie laufen im User Mode mit eingeschränkten Rechten (nur zugewiesener Speicher und Rechenzeit).',
      },
      {
        term: 'System Call',
        def: 'Aufruf, mit dem ein User-Space-Programm Kernel-Ressourcen (Dateien, Netzwerk, …) nutzt: spezieller Befehl (x86-64: `syscall`, ARM: `svc`) → Wechsel in den Kernel Mode.',
      },
      {
        term: 'Dateisystem',
        def: 'Abstraktionsschicht, die Daten in Dateien statt in Blöcken organisiert: Dateinamen statt Blocknummern, Verzeichnisse, Metadaten, Verwaltung freier Blöcke.',
      },
      {
        term: 'Verzeichnis (Ordner)',
        def: 'Spezialdatei, die keine Daten, sondern Verweise auf andere Dateien enthält; ermöglicht die hierarchische Organisation.',
      },
      {
        term: 'Terminal',
        def: 'Programm bzw. Fenster, in dem die Shell läuft, z. B. Konsole (Linux), Terminal/iTerm2 (macOS), Windows Terminal.',
      },
      {
        term: 'Prompt',
        def: 'Eingabeaufforderung, z. B. `ab12cde@linux00:~$`. Zeigt, dass das System bereit für eine Eingabe ist.',
        more: '`ab12cde@linux00:~/Code$ ls -l -D "%F" 01_led`\n- `ab12cde` → Benutzer, `linux00` → Rechner/Host\n- `:` trennt Host und Pfad, `~/Code` → aktuelles Verzeichnis\n- `ls` → Programm/Utility oder Shell-Builtin\n- `-l` → Option, `-D "%F"` → Option mit Options-Argument, `01_led` → Operand\n- Enter schließt die Kommandozeile ab',
        moreLabel: 'Aufbau',
      },
      {
        term: 'Absoluter vs. relativer Pfad',
        def: 'Absolut: beginnt mit `/` und beschreibt den ganzen Weg vom Dateisystem-Ursprung. Relativ: ohne `/`, ausgehend vom aktuellen Verzeichnis.',
      },

      { chapter: '3 Programmieren auf Hochsprachen-Ebene' },
      {
        term: 'Hochsprache',
        def: 'Programmiersprache auf höherer Abstraktionsebene als Maschinencode (z. B. C); Code kann unabhängig von der Hardware geschrieben werden.',
        more: '- hardwareunabhängig: kein Wissen über Register und Verarbeitungseinheiten nötig → niedrigere Einstiegsschwelle\n- Portabilität: automatische Übersetzung für verschiedene Prozessor-Architekturen\n- abstraktere Datentypen, Datenstrukturen (Listen, Bäume) und Operationen\n- implizit: Datentransport Speicher ↔ Register, Typkonvertierung, Stack',
        moreLabel: 'Vorteile',
      },
      {
        term: 'Portabilität',
        def: 'Ein Programm lässt sich automatisiert für verschiedene Prozessor-Architekturen übersetzen.',
      },
      {
        term: 'Toolchain',
        def: 'Werkzeugkette vom Quelltext zum laufenden Programm: Code-Editor → Compiler → Linker → Loader.',
        more: '- **Code-Editor** (VS Code, vim, …): Quellcode `.c` schreiben\n- **Compiler** (clang/gcc): Quelldateien → Objektdateien `.o` mit Maschinencode (braucht ISA/ABI)\n- **Linker** (ld/lld): Objektdateien + Bibliotheken → ausführbare Binärdatei (ELF/Mach-O)\n- **Loader** (ld-linux.so, dyld): dynamische Bibliotheken einbinden, Programm starten\n- dazu: git für Versionsverwaltung',
        moreLabel: 'Ablauf',
      },
      {
        term: 'Quellcode-Datei',
        def: 'Reine Textdatei ohne Formatierungen oder Metadaten, die den Programmcode enthält; bei C mit der Endung `.c`.',
      },
      {
        term: 'Arbeitsverzeichnis',
        def: 'Working directory: Ordner, in dem die Quellcode-Dateien liegen und in dem git den versteckten Ordner `.git` anlegt.',
      },
      {
        term: 'Compiler',
        def: 'Übersetzt Quellcode in Objektdateien mit Maschinencode, z. B. gcc oder clang (oft über den Befehl `cc`).',
        more: '- Quell-Zeichensatz, Zeilenenden → LF\n- Zeilenspleißung\n- Lexer: Präprozessor-Token, Kommentare → Leerzeichen\n- Präprozessor (#include, #define)\n- Zeichenliteral-Konvertierung, Stringliteral-Verkettung\n- Tokenisierung verfeinern\n- Parser → AST\n- semantische Analyse, Typannotation\n- Zwischensprache → Optimierung → Maschinencode (.o)',
        moreLabel: 'Phasen',
      },
      {
        term: 'Objektdatei',
        def: 'Vom Compiler erzeugte Datei (`.o`) mit Maschinencode einer einzelnen Quelldatei; wird vom Linker weiterverarbeitet.',
      },
      {
        term: 'Präprozessor-Anweisung',
        def: 'Mit `#` beginnende Anweisung, die zur Compile-Zeit ausgeführt wird, z. B. `#include` (Datei einfügen) oder `#define` (Textersetzung/Makro).',
      },
      {
        term: '#define',
        def: 'Präprozessor-Anweisung zur Festlegung von Textersetzungen bzw. Makros.',
      },
      {
        term: 'Compile-Zeit vs. Laufzeit',
        def: 'Compile-Zeit: während des Übersetzens (z. B. Präprozessor, sizeof). Laufzeit: während das Programm auf dem Prozessor ausgeführt wird.',
      },
      {
        term: 'Stringliteral-Verkettung',
        def: 'Direkt hintereinander stehende Zeichenketten werden zusammengefügt: `"Hallo " "Welt!"` → `"Hallo Welt!"`.',
      },
      {
        term: 'Linker',
        def: 'Fügt Objektdateien und Bibliotheken zu einer ausführbaren Binärdatei zusammen.',
        more: '- **Statisch:** alle Programmteile und Bibliotheken werden in die Binärdatei integriert → keine weiteren Dateien nötig, aber große Datei; Start direkt über den Kernel\n- **Dynamisch:** nur Verweise auf Bibliotheken → kleinere Datei; beim Start sucht ein dynamischer Loader die Bibliotheken und verknüpft sie',
        moreLabel: 'Methode',
      },
      {
        term: 'Statisches vs. dynamisches Linken',
        def: 'Statisch: Bibliotheken werden in die Binärdatei kopiert (groß, eigenständig). Dynamisch: nur Verweise, Bibliotheken werden beim Start geladen (klein).',
      },
      {
        term: 'Bibliothek',
        def: 'Datei mit bereits übersetzten, wiederverwendbaren Funktionen (z. B. libc/glibc), die zum eigenen Programm gelinkt wird.',
      },
      {
        term: 'git',
        def: 'Versionsverwaltungsprogramm. Lädt die Praktikumsaufgaben aus dem gitlab-Repository (LRZ) herunter und speichert Arbeitsstände als Commits.',
        more: 'Typischer Ablauf im Praktikum:\n- einmalig: `git clone https://gitlab.lrz.de/ctpr/2026-27.git .`\n- Aufgaben bearbeiten\n- `git add .` → Änderungen in die Staging-Area\n- `git commit -m "Aktueller Stand"` → im lokalen Repository speichern\n- `git pull --rebase` → neue Aufgaben vom Server holen',
        moreLabel: 'Ablauf',
      },
      {
        term: 'Repository',
        def: 'Ablage eines Projekts mitsamt seiner Versionsgeschichte. Lokal im verborgenen Ordner `.git`, remote auf dem gitlab-Server.',
        more: '- **Lokales Repository:** versteckter Ordner `.git` im Arbeitsverzeichnis; dort speichert git die verschiedenen Versionen der Dateien\n- **Remote Repository:** auf einem Server wie gitlab oder github; im Praktikum stellt ein gitlab-Server die Aufgaben bereit\n- Arbeitsverzeichnis und lokales Repository können auch an unterschiedlichen Orten liegen',
        moreLabel: 'Lokal vs. Remote',
      },
      {
        term: 'Shell',
        def: 'Befehlsinterpreter und Befehlsschnittstelle zum Kernel: wertet die eingegebene Kommandozeile aus und startet Programme. Läuft in einem Terminal.',
      },
      {
        term: 'Home-Verzeichnis (~)',
        def: 'Persönliches Verzeichnis des aktuellen Benutzers. Die Tilde `~` steht als Abkürzung dafür; `cd ~` wechselt dorthin.',
      },
      {
        term: 'cd',
        def: 'change directory: wechselt das aktuelle Verzeichnis.',
        more: '- `cd ~` → ins Home-Verzeichnis\n- `cd Code` → in den Unterordner Code\n- `cd ..` → ins übergeordnete Verzeichnis\n- `cd ../04.05b_return` → eine Ebene hoch und in einen anderen Ordner',
        moreLabel: 'Beispiele',
      },
      {
        term: 'mkdir',
        def: 'make directory: legt ein neues Verzeichnis an, z. B. `mkdir Code`.',
      },
      {
        term: 'ls',
        def: 'list: zeigt den Inhalt des aktuellen Verzeichnisses an.',
      },
      {
        term: 'pwd',
        def: 'print working directory: gibt den Pfad des aktuellen Verzeichnisses aus, z. B. `/home/ab12cde/Code`.',
      },
      {
        term: '. und ..',
        def: '`.` steht für das aktuelle Verzeichnis, `..` für das übergeordnete Verzeichnis.',
      },
      {
        term: 'git clone',
        def: 'Lädt ein Remote-Repository erstmalig herunter. Mit `.` am Ende wird in das aktuelle Verzeichnis geklont.',
      },
      {
        term: 'Staging-Area',
        def: 'Zwischenbereich für Änderungen, die mit dem nächsten Commit gespeichert werden. `git add .` fügt alle geänderten Dateien hinzu.',
      },
      {
        term: 'git commit',
        def: 'Speichert alle Dateien der Staging-Area als neuen Stand im lokalen Repository; `-m "…"` gibt eine kurze Beschreibung mit.',
      },
      {
        term: 'git pull --rebase',
        def: 'Holt neue Commits vom Server ins lokale Repository. `--rebase` setzt die eigenen lokalen Commits hinter die neu heruntergeladenen.',
        more: 'Wichtig: Vorher immer den eigenen Stand committen (`git add .` und `git commit -m "…"`), erst dann `git pull --rebase`.',
        moreLabel: 'Methode',
      },
      {
        term: 'clang',
        def: 'C-Compiler. `clang -o p p.c` übersetzt die Quelldatei p.c in die ausführbare Datei p.',
        more: '- `clang -o p p.c` → übersetzen, Ausgabedatei p\n- `./p` → Programm ausführen\n- `clang -E p.c > ausgabe.txt` → nur den Präprozessor ausführen und das Ergebnis in eine Datei umleiten\n- `code p.c` → Datei in Visual Studio Code öffnen',
        moreLabel: 'Befehle',
      },
      {
        term: './p',
        def: 'Führt das Programm p aus dem aktuellen Verzeichnis aus (`./` = „hier im aktuellen Verzeichnis“).',
      },

      { chapter: '4 Programm-Strukturierung mit Funktionen' },
      {
        term: 'Funktion',
        def: 'Fasst die Anweisungen zur Lösung einer abgrenzbaren Teilaufgabe in einem zusammenhängenden Speicherbereich zusammen; bildet Eingangswerte auf Ausgangswerte ab.',
        more: 'Vorteile:\n- großes Problem → mehrere kleine Teilprobleme, jeweils in eigener Funktion gelöst\n- Code nur **einmal** schreiben, durch Funktionsaufrufe beliebig oft ausführen\n\nBeispiel LCD-Display: `main` → `lcd_reset` (ruft 3× `wait_ms`), `print_float32` → `print_string` → `print_single_character` → `lcd` (grundlegende Kommunikation mit dem Display).',
        moreLabel: 'Methode',
      },
      {
        term: 'Bezeichner (Identifier)',
        def: 'Name, über den eine Speicheradresse referenziert wird (z. B. `f1`, `main`, `cos`, Variablennamen). Bei Funktionen: Adresse des ersten Befehls.',
      },
      {
        term: 'Black-Box',
        def: 'Sicht auf eine Funktion: Wichtig ist nur, WAS sie berechnet, nicht WIE. Die Realisierung darf unbekannt sein.',
      },
      {
        term: 'Funktionsaufruf',
        def: 'Funktionsname, gefolgt von runden Klammern mit den Argumenten, z. B. `y = cos(x);`. Der Aufruf ist ein Ausdruck und liefert den Rückgabewert.',
        more: 'Ablauf:\n- alle Argumente werden der Reihe nach ausgewertet\n- Sprung an die Stelle der Funktionsdefinition\n- Werte der Argumente werden der Reihe nach in die Parameter **kopiert** (nur die Reihenfolge zählt, nicht der Name)\n- `return` springt zurück; der Aufruf-Ausdruck hat dann den Rückgabewert\n- Typ des Rückgabewerts muss zur Verwendung passen, sonst Typumwandlung',
        moreLabel: 'Ablauf',
      },
      {
        term: 'Parameter vs. Argument',
        def: 'Parameter: Eingangsvariablen in der Funktionsdefinition. Argumente: die beim Funktionsaufruf übergebenen Werte, die in die Parameter kopiert werden.',
      },
      {
        term: 'Übergabe als Kopie',
        def: 'Die Funktion arbeitet nur mit Kopien der Argumente und kann deshalb die Variablen des Aufrufers nicht ändern.',
      },
      {
        term: 'return',
        def: 'Schlüsselwort: springt aus der Funktion zurück zur Aufrufstelle, optional mit einem Wert, der zum Rückgabewert wird.',
      },
      {
        term: 'Rückgabewert',
        def: 'Wert, den eine Funktion mit `return` an den Aufrufer zurückgibt. Der Ausdruck des Funktionsaufrufs nimmt diesen Wert an.',
      },
      {
        term: 'Funktionsdefinition',
        def: 'Funktionskopf + Funktionsrumpf. Legt fest, was die Funktion macht; der Rumpf wird in Maschinencode übersetzt, es wird also Speicher angelegt.',
      },
      {
        term: 'Funktionsdeklaration',
        def: 'Funktionskopf mit Semikolon, ohne Rumpf. Macht die Funktion dem Compiler bekannt, reserviert aber keinen Speicher.',
        more: '- Der Compiler braucht die Deklaration, um den Maschinencode für den Aufruf (nach ABI) zu erzeugen.\n- Für die Parameterliste reichen hier die Datentypen, z. B. `double cos(double);`\n- Jede Definition ist gleichzeitig auch eine Deklaration.',
        moreLabel: 'Methode',
      },
      {
        term: 'Funktionskopf',
        def: 'Erste Zeile einer Funktion: Datentyp des Rückgabewerts, Funktionsname und Parameterliste in runden Klammern, z. B. `double cos(double x)`.',
      },
      {
        term: 'Funktionsrumpf',
        def: 'Anweisungen in geschweiften Klammern. Einziger Ort, an dem in C ausführbarer Code steht.',
      },
      {
        term: 'Überladen von Funktionen',
        def: 'Mehrere Funktionen gleichen Namens mit unterschiedlichen Parametern/Rückgabetypen. In C nicht möglich (in C++ schon).',
      },
      {
        term: 'Parameterliste',
        def: 'Liste der Parameter in runden Klammern (kann leer sein). Deklaration: Typen reichen. Definition: Typ und Bezeichner je Parameter.',
      },
      {
        term: 'void',
        def: 'Schlüsselwort für „leer“: keine Parameter (`int main(void)`) bzw. kein Rückgabewert (`void f(…)`).',
      },
      {
        term: 'Variablendeklaration vs. -definition',
        def: 'Deklaration gibt den Typ an, Definition reserviert Speicher. `int i, n = 10;` ist beides.',
      },
      {
        term: 'Initialisierung',
        def: 'Zuweisung eines Startwerts direkt bei der Definition (`int n = 10;`). Ohne Initialisierung ist der Wert unbestimmt.',
      },
      {
        term: 'Lokale Variable',
        def: 'Innerhalb einer Funktion definierte Variable: nur dort über ihren Bezeichner ansprechbar; ihr Wert geht beim Verlassen der Funktion verloren.',
      },
      {
        term: 'int',
        def: 'Typspezifizierer für vorzeichenbehaftete Ganzzahlen; meist 32 Bit (4 Byte), auf dem 8-Bit-Mikrocontroller nur 2 Byte.',
      },
      {
        term: 'main',
        def: 'Haupt-Funktion und Einsprungspunkt jedes C-Programms. Genau eine pro Programm; Rückgabetyp ist immer `int`.',
        more: '- `int main(void)` → ohne Parameter (empfohlen)\n- `int main()` → bis C17 „Parameter nicht spezifiziert“, seit C23 gleichbedeutend mit void\n- `int main(int argc, char *argv[])` → mit Kommandozeilen-Argumenten\n\n„Beginnen“ bezieht sich auf die Ausführung – im Quelltext steht main oft am Ende.',
        moreLabel: 'Varianten',
      },
      {
        term: 'argc / argv',
        def: 'Parameter von main: `argc` = Anzahl der Argumente, `argv` = nullterminiertes Array aus Zeigern auf die Argument-Zeichenketten.',
        more: 'Aufruf `./p eins zwei drei`:\n- argv = `["./p", "eins", "zwei", "drei", NULL]`\n- argc = 4 (der Programmname zählt mit)\n\nDie Vorbelegung des Speichers erfolgt durch den Kernel.',
        moreLabel: 'Beispiel',
      },
      {
        term: 'Programmstart über die Shell',
        def: 'Shell zerlegt die Kommandozeile in ein Argument-Array, klont sich mit fork(), das Kind lädt mit execve() das Programm, der Loader springt in main.',
        more: '- Shell wertet Quoting, Variablen, Wildcards aus → Array aus Strings\n- `fork()` klont den Shell-Prozess in einen Kindprozess\n- Shell-Prozess wartet mit `waitpid()`\n- Kindprozess ruft `execve()` auf: neuer leerer Adressraum, Programm laden, argv/envp auf den Stack kopieren\n- Wechsel Kernel → User-Mode: Befehlszähler = Startadresse des Loaders, Stackpointer = Adresse von argc\n- Loader lädt Bibliotheken, löst Symbole auf, Relokation, Initialisierungen → Sprung in main',
        moreLabel: 'Ablauf',
      },
      {
        term: 'Loader',
        def: 'Teil des Betriebssystems, der ein Programm in den Speicher lädt und dorthin verzweigt. Bei statisch gelinkten Dateien übernimmt das der Kernel.',
        more: 'Bei dynamisch gelinkten Binärdateien:\n- Kernel liest die Binärdatei und ermittelt den dynamischen Loader (Linux: ld-linux.so, macOS: dyld)\n- Kernel lädt Loader + Binärdatei und übergibt die Kontrolle (ab jetzt User Space)\n- Loader liest Header, erstellt Liste der benötigten Bibliotheken\n- sucht und lädt die Bibliotheken\n- Relocation: Bibliotheksaufrufe durch gültige Adressen ersetzen\n- Initialisierungsfunktionen der Bibliotheken und des Programms aufrufen\n- Sprung in main',
        moreLabel: 'Ablauf',
      },
      {
        term: 'Rückgabetyp',
        def: 'Legt fest, wie viele Bytes eine Funktion zurückgibt und wie sie zu interpretieren sind (Ganzzahl, Gleitkommazahl, …). Muss immer angegeben werden.',
      },
      {
        term: 'Rückgabewert von main',
        def: 'Meldet Erfolg oder Misserfolg: $= 0$ → Erfolg (`EXIT_SUCCESS`), $\\neq 0$ → Fehler (`EXIT_FAILURE`, beide in stdlib.h).',
        more: '- Idee: Ein Programm kann nur auf eine Art erfolgreich sein, aber auf viele Arten scheitern → alle Zahlen ≠ 0 bleiben für Fehlerarten frei.\n- `return` in main ist seit C99 optional; fehlt es, gibt main automatisch 0 zurück.\n- In der Shell auslesen mit `echo $?`.',
        moreLabel: 'Details',
      },
      {
        term: 'echo $?',
        def: 'Gibt in der Shell den Rückgabewert des zuletzt ausgeführten Programms aus. `$` liest den Shell-Parameter `?` aus.',
      },
      {
        term: '&& und || (Shell)',
        def: '`p1 && p2`: p2 nur, wenn p1 erfolgreich war (Rückgabe 0). `p1 || p2`: p2 nur, wenn p1 fehlschlug. Gesamt-Rückgabewert = der des zuletzt ausgeführten Programms.',
      },
      {
        term: 'printf',
        def: 'Funktion zur formatierten Textausgabe, deklariert in der Header-Datei stdio.h.',
        more: 'Deklaration (vereinfacht): `int printf(const char * restrict, ...);`\n\n- erster Parameter: Formatstring\n- `...`: beliebig viele weitere Argumente, deren Werte an den Platzhaltern eingesetzt werden\n- Beispiel: `printf("a: %d\\n", a);`',
        moreLabel: 'Methode',
      },
      {
        term: 'stdio.h',
        def: 'Header-Datei der Standardbibliothek für Ein- und Ausgabe (std = standard, io = input/output); enthält u. a. die Deklaration von printf.',
      },
      {
        term: 'Header-Datei',
        def: 'Datei (.h) mit Deklarationen, z. B. von Funktionen. Wird mit #include eingebunden, damit der Compiler die Funktionen kennt.',
      },
      {
        term: '#include',
        def: 'Präprozessor-Anweisung, die eine Datei in den Quelltext einfügt, z. B. `#include <stdio.h>`.',
      },
      {
        term: 'Präprozessor',
        def: 'Teil des Compilers, der vor dem eigentlichen Übersetzen die Präprozessor-Anweisungen (#include, #define) zur Compile-Zeit ausführt. `clang -E` führt nur ihn aus.',
      },
      {
        term: '... (variable Parameterliste)',
        def: 'Steht in einer Deklaration für „beliebig viele weitere Parameter beliebigen Typs“, z. B. bei printf.',
      },
      {
        term: 'Formatstring',
        def: 'Die an printf übergebene Zeichenkette. Enthält Text und Platzhalter (%…), an deren Stelle die Werte der weiteren Argumente ausgegeben werden.',
        more: 'Aufbau eines Platzhalters:\n`%[Flags][Breite][.Genauigkeit][Längenangabe]Umwandlungsspezifizierer`\n\nBeispiel: `%-08.3hhx` – nur der Umwandlungsspezifizierer ist Pflicht.',
        moreLabel: 'Aufbau',
      },
      {
        term: 'Platzhalter',
        def: 'Mit % beginnende Stelle im Formatstring, an der ein Wert eingesetzt wird. Nötig, damit der Compiler Zeichen (\'a\') und Variable (a) unterscheiden kann.',
      },
      {
        term: 'Umwandlungsspezifizierer',
        def: 'Letzter Teil eines Platzhalters: legt den Typ des Arguments und die Darstellungsart fest (dezimal, hexadezimal, Nachkommastellen, …).',
        more: '- `d`/`i` int, dezimal mit Vorzeichen\n- `u` unsigned int, dezimal\n- `o` oktal · `x`/`X` hexadezimal · `b`/`B` binär (C23)\n- `f`/`F` double, Festkomma · `e`/`E` Exponentialdarstellung · `g`/`G` kürzere von f/e · `a`/`A` hex. Gleitkomma\n- `c` einzelnes Zeichen · `s` Zeichenkette (char *)\n- `p` Adresse/Zeiger · `n` keine Ausgabe, speichert Position · `%%` Prozentzeichen',
        moreLabel: 'Tabelle',
      },
      {
        term: 'Datentyp',
        def: 'Legt Wortgröße (wie viele Bytes) und Codierung (Ganzzahl/Festkomma oder Gleitkomma) eines Datenworts fest.',
        more: '- Ganzzahlen mit Vorzeichen: `char`, `short`, `int`, `long`, `long long`\n- Vorzeichen explizit: `signed` / `unsigned`\n- einzelne Zeichen: `char`\n- Gleitkomma: `float`, `double`, `long double`',
        moreLabel: 'Typen',
      },
      {
        term: 'Literal',
        def: 'Konstanter Wert, der direkt im Code steht, z. B. `0xffffffff`, `123` oder `\'A\'`.',
      },
      {
        term: 'ASCII',
        def: 'Zeichentabelle, die Zeichen Zahlen zuordnet, z. B. \'A\' = 65 = 0x41, \'d\' = 100.',
      },
      {
        term: 'Default Argument Promotion',
        def: 'Argumente mit kleiner Wortbreite (z. B. char, short) werden bei printf auf int erweitert (integer promotion), Gleitkommazahlen auf double.',
        more: 'Beispiel `char b = 0xff;` (char ist vorzeichenbehaftet, MSB gesetzt → −1):\n- Erweiterung mit 24 Einsen → `11111111 … 11111111`\n- `%x` gibt `ffffffff` aus, `%u` gibt 4294967295 aus\n\nMit `unsigned char b = 0xff;` (= 255) wird mit 24 Nullen erweitert → `%x` gibt `ff` aus.\n\nAbhilfe: Längenangabe, z. B. `%hhx` → nur die untersten 8 Bit.',
        moreLabel: 'Beispiel',
      },
      {
        term: 'signed vs. unsigned',
        def: 'signed: vorzeichenbehaftet, das MSB zeigt das Vorzeichen (0xff als char = −1). unsigned: ohne Vorzeichen (0xff als unsigned char = 255).',
      },
      {
        term: 'Längenangabe',
        def: 'Teil des Platzhalters vor dem Spezifizierer: sagt printf, wie viele Bytes für die Ausgabe verwendet werden sollen.',
        more: '- `hh` char · `h` short\n- `l` long · `ll` long long\n- `L` long double (bei a, e, f, g)\n- `z` size_t · `t` ptrdiff_t\n- `j` intmax_t / uintmax_t\n\nBeispiel: `%hhx` gibt von einem char nur die 8 Bit aus.',
        moreLabel: 'Tabelle',
      },
      {
        term: 'sizeof',
        def: 'Operator (keine Funktion!), der vom Compiler ausgewertet wird und die Größe eines Ausdrucks oder Typs in Byte liefert. Ausgabe mit `%zu`.',
      },
      {
        term: 'size_t',
        def: 'Ganzzahliger Typ ohne Vorzeichen für die Größe eines Objekts in Byte (z. B. Ergebnis von sizeof); Längenangabe `z`.',
      },
      {
        term: 'Breite (printf)',
        def: 'Mindestanzahl an Stellen der Ausgabe. Ist sie größer als nötig, wird rechtsbündig mit Leerzeichen aufgefüllt, z. B. `[%5d]` → `[   12]`.',
      },
      {
        term: 'Genauigkeit (printf)',
        def: 'Zahl nach einem Punkt im Platzhalter. Bedeutung hängt vom Typ ab.',
        more: '- Gleitkommazahl: Anzahl Nachkommastellen, `%.2f` → `1.41`\n- Ganzzahl: Mindestanzahl Ziffern, mit 0 aufgefüllt, `%.6d` → `000123`\n- Zeichenkette: maximale Zeichenzahl, `%.2s` → `Ha`',
        moreLabel: 'Methode',
      },
      {
        term: 'Flags (printf)',
        def: 'Zeichen direkt nach dem %: `-` linksbündig, `+` Vorzeichen immer, Leerzeichen statt +, `0` mit Nullen auffüllen, `#` 0x bei hex / 0 bei oktal.',
        more: '- `[%-5d]` → `[12   ]`\n- `[%05d]` → `[00012]`\n- `[%+d]` → `[+12]`\n- `[%#x]`, 128 → `[0x80]`\n\nAchtung: `%+08d` zählt das Vorzeichen zur Breite (`+0000012`), `%+.8d` nicht (`+00000012`).',
        moreLabel: 'Beispiele',
      },
      {
        term: 'Zeichenkette (String)',
        def: 'Folge von Zeichen in doppelten Anführungszeichen, z. B. `"Hallo"`; im Speicher nullterminiert.',
      },
      {
        term: 'Escaping',
        def: 'Ein vorangestellter Backslash `\\` hebt die Sonderbedeutung eines Zeichens auf, z. B. `\\"` für ein Anführungszeichen innerhalb einer Zeichenkette.',
      },
      {
        term: 'Escape-Sequenz',
        def: 'Mit Backslash eingeleitete Zeichenfolge für Sonder- oder Steuerzeichen, z. B. `\\n` (Zeilenumbruch) oder `\\"`.',
        more: '- `\\\'` `\\"` `\\?` `\\\\` → das jeweilige Zeichen\n- `\\n` newline · `\\t` tab · `\\r` carriage return · `\\a` alert · `\\b` backspace · `\\f` form feed · `\\v` vertical tab\n- `\\0` bis `\\377` → Zeichen mit Oktalwert\n- `\\x` + Hexziffern → Zeichen mit Hexwert (greedy: liest so viele Hexziffern wie möglich; `"\\x61" "bc"` = `"abc"`)\n- `\\u` + 4 bzw. `\\U` + 8 Hexziffern → Universal Character',
        moreLabel: 'Tabelle',
      },
      {
        term: 'Kommentar',
        def: 'Zusatzinformation im Quelltext, die der Compiler ignoriert. Macht Code verständlicher (Erklärungen, Annahmen, Datenformate).',
      },
      {
        term: 'Blockkommentar',
        def: 'Beginnt mit `/*` und endet mit `*/`, kann mehrere Zeilen umfassen. Darf nicht verschachtelt werden.',
      },
      {
        term: 'Zeilenkommentar',
        def: 'Beginnt mit `//`; alles bis zum Zeilenende wird ignoriert. Kein Verschachtelungsproblem, daher meist vorzuziehen.',
      },
    ],
  },
];
