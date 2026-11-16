/* Lernsets aus Skripten.
 * Jeder Eintrag = ein Ordner. Pro Karte:
 *   term       – Hauptbegriff (Vorderseite)
 *   def        – nur das Wichtigste: Definition / kurze Erklärung
 *   ex         – optional: kurzes Codebeispiel (erscheint als Codeblock auf der Rückseite)
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
        def: 'Random Access Memory: Speicher, mit dem der Prozessor arbeitet.\n- Programme und Daten werden vom Massenspeicher hineingeladen\n- volatil: Inhalt geht ohne Strom verloren',
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
        def: 'Register mit der Adresse des auszuführenden Befehls.\n- **normal:** $\\text{BZ} \\leftarrow \\text{BZ} + 4$ (Befehlslänge)\n- **Sprung:** $\\text{BZ} \\leftarrow \\text{BZ} + \\text{Offset}$',
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
        calc: 'Speicherbild eines Werts bestimmen:\n- Wert in Hex schreiben und in Bytes zerlegen\n- Bytes in umgekehrter Reihenfolge ablegen – niederwertigstes Byte an die niedrigste Adresse',
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
        def: '- **Kernel Space:** Adressraum des Betriebssystems\n- **Kernel Mode:** Code dort läuft mit privilegierten Rechten und darf auf alle System-Ressourcen zugreifen',
      },
      {
        term: 'User Space / User Mode',
        def: '- **User Space:** getrennte virtuelle Adressräume der Programme\n- **User Mode:** eingeschränkte Rechte – nur zugewiesener Speicher und Rechenzeit',
      },
      {
        term: 'System Call',
        def: 'Aufruf, mit dem ein User-Space-Programm Kernel-Ressourcen (Dateien, Netzwerk, …) nutzt: spezieller Befehl (x86-64: `syscall`, ARM: `svc`) → Wechsel in den Kernel Mode.',
        ex: "write(1, \"Hi\\n\", 3);  // Ausgabe über den Kernel",
      },
      {
        term: 'Dateisystem',
        def: 'Abstraktionsschicht, die Daten in Dateien statt in Blöcken organisiert: Dateinamen statt Blocknummern, Verzeichnisse, Metadaten, Verwaltung freier Blöcke.',
      },
      {
        term: 'Prompt',
        def: 'Eingabeaufforderung, z. B. `ab12cde@linux00:~$`. Zeigt, dass das System bereit für eine Eingabe ist.',
        more: '`ab12cde@linux00:~/Code$ ls -l -D "%F" 01_led`\n- `ab12cde` → Benutzer, `linux00` → Rechner/Host\n- `:` trennt Host und Pfad, `~/Code` → aktuelles Verzeichnis\n- `ls` → Programm/Utility oder Shell-Builtin\n- `-l` → Option, `-D "%F"` → Option mit Options-Argument, `01_led` → Operand\n- Enter schließt die Kommandozeile ab',
        moreLabel: 'Aufbau',
      },
      {
        term: 'Absoluter vs. relativer Pfad',
        def: '- **Absolut:** beginnt mit `/`, ganzer Weg vom Dateisystem-Ursprung\n- **Relativ:** ohne `/`, ausgehend vom aktuellen Verzeichnis',
        ex: "cd /home/ab12cde/Code   # absolut\ncd Code                  # relativ",
      },

      { chapter: '3 Programmieren auf Hochsprachen-Ebene' },
      {
        term: 'Hochsprache',
        def: 'Programmiersprache auf höherer Abstraktionsebene als Maschinencode, z. B. C.\n- Code unabhängig von der Hardware schreibbar\n- automatisch für verschiedene Prozessoren übersetzbar',
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
        def: 'Mit `#` beginnende Anweisung, die zur Compile-Zeit ausgeführt wird:\n- `#include`: Datei einfügen\n- `#define`: Textersetzung/Makro',
        ex: "#include <stdio.h>\n#define N 10",
      },
      {
        term: '#define',
        def: 'Präprozessor-Anweisung zur Festlegung von Textersetzungen bzw. Makros.',
        ex: "#define PI 3.14159\ndouble u = 2 * PI * r;",
      },
      {
        term: 'Compile-Zeit vs. Laufzeit',
        def: '- **Compile-Zeit:** während des Übersetzens (z. B. Präprozessor, sizeof)\n- **Laufzeit:** während das Programm auf dem Prozessor läuft',
      },
      {
        term: 'Linker',
        def: 'Fügt Objektdateien und Bibliotheken zu einer ausführbaren Binärdatei zusammen.',
        more: '- **Statisch:** alle Programmteile und Bibliotheken werden in die Binärdatei integriert → keine weiteren Dateien nötig, aber große Datei; Start direkt über den Kernel\n- **Dynamisch:** nur Verweise auf Bibliotheken → kleinere Datei; beim Start sucht ein dynamischer Loader die Bibliotheken und verknüpft sie',
        moreLabel: 'Methode',
      },
      {
        term: 'Statisches vs. dynamisches Linken',
        def: '- **Statisch:** Bibliotheken werden in die Binärdatei kopiert → groß, eigenständig\n- **Dynamisch:** nur Verweise, Bibliotheken werden beim Start geladen → klein',
      },
      {
        term: 'Bibliothek',
        def: 'Datei mit bereits übersetzten, wiederverwendbaren Funktionen (z. B. libc/glibc), die zum eigenen Programm gelinkt wird.',
      },
      {
        term: 'git',
        def: 'Versionsverwaltungsprogramm:\n- lädt die Praktikumsaufgaben aus dem gitlab-Repository (LRZ) herunter\n- speichert Arbeitsstände als Commits',
        ex: "git add .\ngit commit -m \"Aufgabe 1\"\ngit pull --rebase",
        more: 'Typischer Ablauf im Praktikum:\n- einmalig: `git clone https://gitlab.lrz.de/ctpr/2026-27.git .`\n- Aufgaben bearbeiten\n- `git add .` → Änderungen in die Staging-Area\n- `git commit -m "Aktueller Stand"` → im lokalen Repository speichern\n- `git pull --rebase` → neue Aufgaben vom Server holen',
        moreLabel: 'Ablauf',
      },
      {
        term: 'Repository',
        def: 'Ablage eines Projekts mitsamt seiner Versionsgeschichte.\n- **lokal:** im verborgenen Ordner `.git`\n- **remote:** auf dem gitlab-Server',
        more: '- **Lokales Repository:** versteckter Ordner `.git` im Arbeitsverzeichnis; dort speichert git die verschiedenen Versionen der Dateien\n- **Remote Repository:** auf einem Server wie gitlab oder github; im Praktikum stellt ein gitlab-Server die Aufgaben bereit\n- Arbeitsverzeichnis und lokales Repository können auch an unterschiedlichen Orten liegen',
        moreLabel: 'Lokal vs. Remote',
      },
      {
        term: 'Shell',
        def: 'Befehlsinterpreter und Befehlsschnittstelle zum Kernel: wertet die eingegebene Kommandozeile aus und startet Programme. Läuft in einem Terminal.',
      },
      {
        term: 'Home-Verzeichnis (~)',
        def: 'Persönliches Verzeichnis des aktuellen Benutzers.\n- `~` ist die Abkürzung dafür\n- `cd ~` wechselt dorthin',
        ex: "cd ~",
      },
      {
        term: 'cd',
        def: 'change directory: wechselt das aktuelle Verzeichnis.',
        ex: "cd Code\ncd ..",
        more: '- `cd ~` → ins Home-Verzeichnis\n- `cd Code` → in den Unterordner Code\n- `cd ..` → ins übergeordnete Verzeichnis\n- `cd ../04.05b_return` → eine Ebene hoch und in einen anderen Ordner',
        moreLabel: 'Beispiele',
      },
      {
        term: 'mkdir',
        def: 'make directory: legt ein neues Verzeichnis an, z. B. `mkdir Code`.',
        ex: "mkdir Code\ncd Code",
      },
      {
        term: 'ls',
        def: 'list: zeigt den Inhalt des aktuellen Verzeichnisses an.',
        ex: "ls -l",
      },
      {
        term: 'pwd',
        def: 'print working directory: gibt den Pfad des aktuellen Verzeichnisses aus, z. B. `/home/ab12cde/Code`.',
        ex: "$ pwd\n/home/ab12cde/Code",
      },
      {
        term: '. und ..',
        def: '- `.` – das aktuelle Verzeichnis\n- `..` – das übergeordnete Verzeichnis',
        ex: "cd ..     # eine Ebene hoch\n./p       # p hier ausführen",
      },
      {
        term: 'git clone',
        def: 'Lädt ein Remote-Repository erstmalig herunter.\n- `.` am Ende: in das aktuelle Verzeichnis klonen',
        ex: "git clone https://gitlab.lrz.de/ctpr/2026-27.git .",
      },
      {
        term: 'Staging-Area',
        def: 'Zwischenbereich für Änderungen, die mit dem nächsten Commit gespeichert werden.\n- `git add .` fügt alle geänderten Dateien hinzu',
        ex: "git add p.c   # eine Datei\ngit add .     # alle Änderungen",
      },
      {
        term: 'git commit',
        def: 'Speichert alle Dateien der Staging-Area als neuen Stand im lokalen Repository.\n- `-m "…"` gibt eine kurze Beschreibung mit',
        ex: "git commit -m \"Aufgabe 1 fertig\"",
      },
      {
        term: 'git pull --rebase',
        def: 'Holt neue Commits vom Server ins lokale Repository.\n- `--rebase` setzt die eigenen lokalen Commits hinter die neu heruntergeladenen',
        more: 'Wichtig: Vorher immer den eigenen Stand committen (`git add .` und `git commit -m "…"`), erst dann `git pull --rebase`.',
        moreLabel: 'Methode',
      },
      {
        term: 'clang',
        def: 'C-Compiler. `clang -o p p.c` übersetzt die Quelldatei p.c in die ausführbare Datei p.',
        ex: "clang -o p p.c",
        more: '- `clang -o p p.c` → übersetzen, Ausgabedatei p\n- `./p` → Programm ausführen\n- `clang -E p.c > ausgabe.txt` → nur den Präprozessor ausführen und das Ergebnis in eine Datei umleiten\n- `code p.c` → Datei in Visual Studio Code öffnen',
        moreLabel: 'Befehle',
      },
      {
        term: './p',
        def: 'Führt das Programm p aus dem aktuellen Verzeichnis aus (`./` = „hier im aktuellen Verzeichnis“).',
        ex: "clang -o p p.c && ./p",
      },

      { chapter: '4 Programm-Strukturierung mit Funktionen' },
      {
        term: 'Funktion',
        def: 'Fasst die Anweisungen zur Lösung einer abgrenzbaren Teilaufgabe in einem zusammenhängenden Speicherbereich zusammen; bildet Eingangswerte auf Ausgangswerte ab.',
        ex: "int quadrat(int x) {\n    return x * x;\n}",
        more: 'Vorteile:\n- großes Problem → mehrere kleine Teilprobleme, jeweils in eigener Funktion gelöst\n- Code nur **einmal** schreiben, durch Funktionsaufrufe beliebig oft ausführen\n\nBeispiel LCD-Display: `main` → `lcd_reset` (ruft 3× `wait_ms`), `print_float32` → `print_string` → `print_single_character` → `lcd` (grundlegende Kommunikation mit dem Display).',
        moreLabel: 'Methode',
      },
      {
        term: 'Bezeichner (Identifier)',
        def: 'Name, über den eine Speicheradresse referenziert wird (z. B. `f1`, `main`, `cos`, Variablennamen). Bei Funktionen: Adresse des ersten Befehls.',
        ex: "int summe = 0;   // summe\nint main(void)   // main",
      },
      {
        term: 'Funktionsaufruf',
        def: 'Funktionsname mit den Argumenten in runden Klammern, z. B. `y = cos(x);`\n- ist ein Ausdruck und liefert den Rückgabewert',
        ex: "double y = cos(x);",
        more: 'Ablauf:\n- alle Argumente werden der Reihe nach ausgewertet\n- Sprung an die Stelle der Funktionsdefinition\n- Werte der Argumente werden der Reihe nach in die Parameter **kopiert** (nur die Reihenfolge zählt, nicht der Name)\n- `return` springt zurück; der Aufruf-Ausdruck hat dann den Rückgabewert\n- Typ des Rückgabewerts muss zur Verwendung passen, sonst Typumwandlung',
        moreLabel: 'Ablauf',
      },
      {
        term: 'Parameter vs. Argument',
        def: '- **Parameter:** Eingangsvariablen in der Funktionsdefinition\n- **Argumente:** beim Aufruf übergebene Werte, die in die Parameter kopiert werden',
        ex: "int quadrat(int x);  // x: Parameter\nquadrat(5);          // 5: Argument",
      },
      {
        term: 'Übergabe als Kopie',
        def: 'Die Funktion arbeitet nur mit Kopien der Argumente und kann deshalb die Variablen des Aufrufers nicht ändern.',
        ex: "void inc(int a) { a++; }\n\nint n = 1;\ninc(n);   // n bleibt 1",
      },
      {
        term: 'return',
        def: 'Schlüsselwort: springt aus der Funktion zurück zur Aufrufstelle, optional mit einem Wert, der zum Rückgabewert wird.',
        ex: "return x * x;",
      },
      {
        term: 'Rückgabewert',
        def: 'Wert, den eine Funktion mit `return` an den Aufrufer zurückgibt. Der Ausdruck des Funktionsaufrufs nimmt diesen Wert an.',
        ex: "int r = quadrat(3);  // r = 9",
      },
      {
        term: 'Funktionsdefinition',
        def: 'Funktionskopf + Funktionsrumpf: legt fest, was die Funktion macht.\n- der Rumpf wird in Maschinencode übersetzt → es wird Speicher angelegt',
        ex: "int quadrat(int x) {\n    return x * x;\n}",
      },
      {
        term: 'Funktionsdeklaration',
        def: 'Funktionskopf mit Semikolon, ohne Rumpf.\n- macht die Funktion dem Compiler bekannt\n- reserviert keinen Speicher',
        ex: "int quadrat(int);",
        more: '- Der Compiler braucht die Deklaration, um den Maschinencode für den Aufruf (nach ABI) zu erzeugen.\n- Für die Parameterliste reichen hier die Datentypen, z. B. `double cos(double);`\n- Jede Definition ist gleichzeitig auch eine Deklaration.',
        moreLabel: 'Methode',
      },
      {
        term: 'Funktionskopf',
        def: 'Erste Zeile einer Funktion: Datentyp des Rückgabewerts, Funktionsname und Parameterliste in runden Klammern, z. B. `double cos(double x)`.',
        ex: "int quadrat(int x)",
      },
      {
        term: 'Funktionsrumpf',
        def: 'Anweisungen in geschweiften Klammern. Einziger Ort, an dem in C ausführbarer Code steht.',
        ex: "{\n    return x * x;\n}",
      },
      {
        term: 'Parameterliste',
        def: 'Liste der Parameter in runden Klammern (kann leer sein).\n- **Deklaration:** Typen reichen\n- **Definition:** Typ und Bezeichner je Parameter',
        ex: "int add(int a, int b)",
      },
      {
        term: 'void',
        def: 'Schlüsselwort für „leer“:\n- keine Parameter: `int main(void)`\n- kein Rückgabewert: `void f(…)`',
        ex: "void hallo(void) {\n    printf(\"Hallo\\n\");\n}",
      },
      {
        term: 'Variablendeklaration vs. -definition',
        def: '- **Deklaration:** gibt den Typ an\n- **Definition:** reserviert Speicher\n\n`int i, n = 10;` ist beides.',
        ex: "extern int n;  // Deklaration\nint n = 10;    // Definition",
      },
      {
        term: 'Initialisierung',
        def: 'Zuweisung eines Startwerts direkt bei der Definition (`int n = 10;`). Ohne Initialisierung ist der Wert unbestimmt.',
        ex: "int n = 10;  // initialisiert\nint m;       // Wert unbestimmt",
      },
      {
        term: 'Lokale Variable',
        def: 'Innerhalb einer Funktion definierte Variable:\n- nur dort über ihren Bezeichner ansprechbar\n- Wert geht beim Verlassen der Funktion verloren',
        ex: "void f(void) {\n    int i = 0;  // nur in f\n}",
      },
      {
        term: 'int',
        def: 'Typspezifizierer für vorzeichenbehaftete Ganzzahlen.\n- meist 32 Bit (4 Byte)\n- auf dem 8-Bit-Mikrocontroller nur 2 Byte',
        ex: "int n = -42;",
      },
      {
        term: 'main',
        def: 'Haupt-Funktion und Einsprungspunkt jedes C-Programms.\n- genau eine pro Programm\n- Rückgabetyp ist immer `int`',
        ex: "int main(void) {\n    return 0;\n}",
        more: '- `int main(void)` → ohne Parameter (empfohlen)\n- `int main()` → bis C17 „Parameter nicht spezifiziert“, seit C23 gleichbedeutend mit void\n- `int main(int argc, char *argv[])` → mit Kommandozeilen-Argumenten\n\n„Beginnen“ bezieht sich auf die Ausführung – im Quelltext steht main oft am Ende.',
        moreLabel: 'Varianten',
      },
      {
        term: 'argc / argv',
        def: 'Parameter von main:\n- `argc`: Anzahl der Argumente\n- `argv`: nullterminiertes Array aus Zeigern auf die Argument-Zeichenketten',
        ex: "int main(int argc, char *argv[]) {\n    printf(\"%s\\n\", argv[1]);\n}",
        more: 'Aufruf `./p eins zwei drei`:\n- argv = `["./p", "eins", "zwei", "drei", NULL]`\n- argc = 4 (der Programmname zählt mit)\n\nDie Vorbelegung des Speichers erfolgt durch den Kernel.',
        moreLabel: 'Beispiel',
      },
      {
        term: 'Loader',
        def: 'Teil des Betriebssystems, der ein Programm in den Speicher lädt und dorthin verzweigt.\n- bei statisch gelinkten Dateien übernimmt das der Kernel',
        more: 'Bei dynamisch gelinkten Binärdateien:\n- Kernel liest die Binärdatei und ermittelt den dynamischen Loader (Linux: ld-linux.so, macOS: dyld)\n- Kernel lädt Loader + Binärdatei und übergibt die Kontrolle (ab jetzt User Space)\n- Loader liest Header, erstellt Liste der benötigten Bibliotheken\n- sucht und lädt die Bibliotheken\n- Relocation: Bibliotheksaufrufe durch gültige Adressen ersetzen\n- Initialisierungsfunktionen der Bibliotheken und des Programms aufrufen\n- Sprung in main',
        moreLabel: 'Ablauf',
      },
      {
        term: 'Rückgabetyp',
        def: 'Legt fest, wie viele Bytes eine Funktion zurückgibt und wie sie zu interpretieren sind (Ganzzahl, Gleitkommazahl, …). Muss immer angegeben werden.',
        ex: "double mittel(int a, int b)",
      },
      {
        term: 'Rückgabewert von main',
        def: 'Meldet Erfolg oder Misserfolg (Konstanten aus stdlib.h):\n- $= 0$ → Erfolg (`EXIT_SUCCESS`)\n- $\\neq 0$ → Fehler (`EXIT_FAILURE`)',
        calc: 'Erfolg eines Programms prüfen:\n- Programm in der Shell ausführen\n- direkt danach `echo $?`\n- 0 → Erfolg, sonst Fehlercode',
        ex: "return EXIT_FAILURE;",
        more: '- Idee: Ein Programm kann nur auf eine Art erfolgreich sein, aber auf viele Arten scheitern → alle Zahlen ≠ 0 bleiben für Fehlerarten frei.\n- `return` in main ist seit C99 optional; fehlt es, gibt main automatisch 0 zurück.\n- In der Shell auslesen mit `echo $?`.',
        moreLabel: 'Details',
      },
      {
        term: 'echo $?',
        def: 'Gibt in der Shell den Rückgabewert des zuletzt ausgeführten Programms aus. `$` liest den Shell-Parameter `?` aus.',
        ex: "$ ./p\n$ echo $?\n0",
      },
      {
        term: '&& und || (Shell)',
        def: '- `p1 && p2`: p2 nur, wenn p1 erfolgreich war (Rückgabe 0)\n- `p1 || p2`: p2 nur, wenn p1 fehlschlug\n\nGesamt-Rückgabewert = der des zuletzt ausgeführten Programms.',
        ex: "clang -o p p.c && ./p\n./p || echo \"Fehler\"",
      },
      {
        term: 'printf',
        def: 'Funktion zur formatierten Textausgabe, deklariert in der Header-Datei stdio.h.',
        ex: "printf(\"a = %d\\n\", a);",
        more: 'Deklaration (vereinfacht): `int printf(const char * restrict, ...);`\n\n- erster Parameter: Formatstring\n- `...`: beliebig viele weitere Argumente, deren Werte an den Platzhaltern eingesetzt werden\n- Beispiel: `printf("a: %d\\n", a);`',
        moreLabel: 'Methode',
      },
      {
        term: 'stdio.h',
        def: 'Header-Datei der Standardbibliothek für Ein- und Ausgabe (standard input/output).\n- enthält u. a. die Deklaration von printf',
        ex: "#include <stdio.h>",
      },
      {
        term: 'Header-Datei',
        def: 'Datei (.h) mit Deklarationen, z. B. von Funktionen. Wird mit #include eingebunden, damit der Compiler die Funktionen kennt.',
        ex: "// mathe.h\nint quadrat(int);",
      },
      {
        term: '#include',
        def: 'Präprozessor-Anweisung, die eine Datei in den Quelltext einfügt, z. B. `#include <stdio.h>`.',
        ex: "#include <stdio.h>   // Standard\n#include \"mathe.h\"   // eigene",
      },
      {
        term: 'Präprozessor',
        def: 'Teil des Compilers, der vor dem eigentlichen Übersetzen die Präprozessor-Anweisungen (#include, #define) zur Compile-Zeit ausführt. `clang -E` führt nur ihn aus.',
        ex: "clang -E p.c",
      },
      {
        term: 'Formatstring',
        def: 'Die an printf übergebene Zeichenkette. Enthält Text und Platzhalter (%…), an deren Stelle die Werte der weiteren Argumente ausgegeben werden.',
        ex: "printf(\"x = %d, y = %f\\n\", x, y);",
        more: 'Aufbau eines Platzhalters:\n`%[Flags][Breite][.Genauigkeit][Längenangabe]Umwandlungsspezifizierer`\n\nBeispiel: `%-08.3hhx` – nur der Umwandlungsspezifizierer ist Pflicht.',
        moreLabel: 'Aufbau',
      },
      {
        term: 'Platzhalter',
        def: 'Mit `%` beginnende Stelle im Formatstring, an der ein Wert eingesetzt wird.\n- nötig, damit der Compiler Zeichen (`\'a\'`) und Variable (`a`) unterscheiden kann',
        ex: "printf(\"%d\", 42);  // 42",
      },
      {
        term: 'Umwandlungsspezifizierer',
        def: 'Letzter Teil eines Platzhalters: legt den Typ des Arguments und die Darstellungsart fest (dezimal, hexadezimal, Nachkommastellen, …).',
        ex: "printf(\"%d %x %c\", 65, 65, 65);\n// 65 41 A",
        more: '- `d`/`i` int, dezimal mit Vorzeichen\n- `u` unsigned int, dezimal\n- `o` oktal · `x`/`X` hexadezimal · `b`/`B` binär (C23)\n- `f`/`F` double, Festkomma · `e`/`E` Exponentialdarstellung · `g`/`G` kürzere von f/e · `a`/`A` hex. Gleitkomma\n- `c` einzelnes Zeichen · `s` Zeichenkette (char *)\n- `p` Adresse/Zeiger · `n` keine Ausgabe, speichert Position · `%%` Prozentzeichen',
        moreLabel: 'Tabelle',
      },
      {
        term: 'Datentyp',
        def: 'Legt Wortgröße (wie viele Bytes) und Codierung (Ganzzahl/Festkomma oder Gleitkomma) eines Datenworts fest.',
        ex: "char c = 'A';\ndouble d = 1.5;",
        more: '- Ganzzahlen mit Vorzeichen: `char`, `short`, `int`, `long`, `long long`\n- Vorzeichen explizit: `signed` / `unsigned`\n- einzelne Zeichen: `char`\n- Gleitkomma: `float`, `double`, `long double`',
        moreLabel: 'Typen',
      },
      {
        term: 'Literal',
        def: 'Konstanter Wert, der direkt im Code steht, z. B. `0xffffffff`, `123` oder `\'A\'`.',
        ex: "int n = 123;\nchar c = 'A';",
      },
      {
        term: 'ASCII',
        def: 'Zeichentabelle, die Zeichen Zahlen zuordnet, z. B. \'A\' = 65 = 0x41, \'d\' = 100.',
        calc: '- Zeichen in der ASCII-Tabelle suchen\n- Zeile (oberes Nibble) und Spalte (unteres Nibble) ergeben den Hexwert\n- in C einfach `printf("%d", \'A\');`',
        ex: "printf(\"%d\", 'A');  // 65",
      },
      {
        term: 'Default Argument Promotion',
        def: 'Argumente mit kleiner Wortbreite (z. B. char, short) werden bei printf auf int erweitert (integer promotion), Gleitkommazahlen auf double.',
        calc: 'Ausgabe von printf vorhersagen:\n- ist der Typ kleiner als int → auf int erweitern\n- signed: mit dem MSB auffüllen, unsigned: mit 0 auffüllen\n- erweiterten Wert mit dem Platzhalter (z. B. `%x`) ausgeben',
        ex: "char b = 0xff;\nprintf(\"%x\", b);  // ffffffff",
        more: 'Beispiel `char b = 0xff;` (char ist vorzeichenbehaftet, MSB gesetzt → −1):\n- Erweiterung mit 24 Einsen → `11111111 … 11111111`\n- `%x` gibt `ffffffff` aus, `%u` gibt 4294967295 aus\n\nMit `unsigned char b = 0xff;` (= 255) wird mit 24 Nullen erweitert → `%x` gibt `ff` aus.\n\nAbhilfe: Längenangabe, z. B. `%hhx` → nur die untersten 8 Bit.',
        moreLabel: 'Beispiel',
      },
      {
        term: 'signed vs. unsigned',
        def: '- **signed:** vorzeichenbehaftet, MSB = Vorzeichen (`0xff` als char = −1)\n- **unsigned:** ohne Vorzeichen (`0xff` als unsigned char = 255)',
        calc: 'Wert eines Bytes bestimmen:\n- **unsigned:** Binärwert direkt umrechnen\n- **signed:** MSB = 0 → wie unsigned; MSB = 1 → Wert minus 256 (Zweierkomplement)\n\n`0xff`: unsigned 255, signed −1',
        ex: "signed char a = 0xff;    // -1\nunsigned char b = 0xff;  // 255",
      },
      {
        term: 'Längenangabe',
        def: 'Teil des Platzhalters vor dem Spezifizierer: sagt printf, wie viele Bytes für die Ausgabe verwendet werden sollen.',
        ex: "printf(\"%hhx\", b);  // ff",
        more: '- `hh` char · `h` short\n- `l` long · `ll` long long\n- `L` long double (bei a, e, f, g)\n- `z` size_t · `t` ptrdiff_t\n- `j` intmax_t / uintmax_t\n\nBeispiel: `%hhx` gibt von einem char nur die 8 Bit aus.',
        moreLabel: 'Tabelle',
      },
      {
        term: 'sizeof',
        def: 'Operator (keine Funktion!), der die Größe eines Ausdrucks oder Typs in Byte liefert.\n- wird vom Compiler ausgewertet\n- Ausgabe mit `%zu`',
        calc: '- `sizeof(Typ)` oder `sizeof Ausdruck` schreiben\n- mit `%zu` ausgeben\n- Wert hängt von der Plattform ab (z. B. int meist 4)',
        ex: "printf(\"%zu\", sizeof(int));  // 4",
      },
      {
        term: 'size_t',
        def: 'Vorzeichenloser Ganzzahltyp für die Größe eines Objekts in Byte (z. B. Ergebnis von sizeof).\n- Längenangabe `z`',
        ex: "size_t n = sizeof(double);",
      },
      {
        term: 'Breite (printf)',
        def: 'Mindestanzahl an Stellen der Ausgabe. Ist sie größer als nötig, wird rechtsbündig mit Leerzeichen aufgefüllt, z. B. `[%5d]` → `[   12]`.',
        calc: '- Länge der Ausgabe ohne Breite bestimmen\n- ist sie kleiner als die Breite → links mit Leerzeichen auffüllen\n- sonst unverändert ausgeben',
      },
      {
        term: 'Genauigkeit (printf)',
        def: 'Zahl nach einem Punkt im Platzhalter. Bedeutung hängt vom Typ ab.',
        calc: '- **Gleitkomma:** auf so viele Nachkommastellen runden\n- **Ganzzahl:** vorne mit Nullen auf so viele Ziffern auffüllen\n- **Zeichenkette:** nach so vielen Zeichen abschneiden',
        ex: "printf(\"%.2f\", 1.4142);  // 1.41",
        more: '- Gleitkommazahl: Anzahl Nachkommastellen, `%.2f` → `1.41`\n- Ganzzahl: Mindestanzahl Ziffern, mit 0 aufgefüllt, `%.6d` → `000123`\n- Zeichenkette: maximale Zeichenzahl, `%.2s` → `Ha`',
        moreLabel: 'Methode',
      },
      {
        term: 'Flags (printf)',
        def: 'Zeichen direkt nach dem `%`:\n- `-` linksbündig\n- `+` Vorzeichen immer ausgeben\n- Leerzeichen statt `+`\n- `0` mit Nullen auffüllen\n- `#` `0x` bei hex bzw. `0` bei oktal',
        ex: "printf(\"[%-5d]\", 12);  // [12   ]",
        more: '- `[%-5d]` → `[12   ]`\n- `[%05d]` → `[00012]`\n- `[%+d]` → `[+12]`\n- `[%#x]`, 128 → `[0x80]`\n\nAchtung: `%+08d` zählt das Vorzeichen zur Breite (`+0000012`), `%+.8d` nicht (`+00000012`).',
        moreLabel: 'Beispiele',
      },
      {
        term: 'Zeichenkette (String)',
        def: 'Folge von Zeichen in doppelten Anführungszeichen, z. B. `"Hallo"`.\n- im Speicher nullterminiert',
        ex: "char s[] = \"Hallo\";",
      },
      {
        term: 'Escape-Sequenz',
        def: 'Mit Backslash eingeleitete Zeichenfolge für Sonder- oder Steuerzeichen, z. B. `\\n` (Zeilenumbruch) oder `\\"` (Anführungszeichen).',
        ex: "printf(\"A\\tB\\n\");",
        more: '- `\\\'` `\\"` `\\?` `\\\\` → das jeweilige Zeichen\n- `\\n` newline · `\\t` tab · `\\r` carriage return · `\\a` alert · `\\b` backspace · `\\f` form feed · `\\v` vertical tab\n- `\\0` bis `\\377` → Zeichen mit Oktalwert\n- `\\x` + Hexziffern → Zeichen mit Hexwert (greedy: liest so viele Hexziffern wie möglich; `"\\x61" "bc"` = `"abc"`)\n- `\\u` + 4 bzw. `\\U` + 8 Hexziffern → Universal Character',
        moreLabel: 'Tabelle',
      },
      {
        term: 'Kommentar',
        def: 'Zusatzinformation im Quelltext, die der Compiler ignoriert. Macht Code verständlicher (Erklärungen, Annahmen, Datenformate).',
        ex: "int n = 0;  // Zähler",
      },
      {
        term: 'Blockkommentar',
        def: 'Beginnt mit `/*`, endet mit `*/`.\n- kann mehrere Zeilen umfassen\n- darf nicht verschachtelt werden',
        ex: "/* mehrere\n   Zeilen */",
      },
      {
        term: 'Zeilenkommentar',
        def: 'Beginnt mit `//`; alles bis zum Zeilenende wird ignoriert.\n- kein Verschachtelungsproblem → meist vorzuziehen',
        ex: "x++;  // bis Zeilenende",
      },
    ],
  },
];
