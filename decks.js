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
    description: 'Skripte S. 13–36, 51–68, 69–111: Computer-Modell, Betriebssystem, Toolchain, git & Shell, Funktionen, printf.',
    cards: [
      // ========== Skript S. 13–36: Computer-Modelle und Programmausführung ==========
      // ---------- 2.1 / 2.2 Computersystem-Modell ----------
      {
        term: 'Programm-Ausführungs-Zyklus',
        def: 'Quelloperanden werden aus dem Datenspeicher gelesen, in der ALU verarbeitet und das Ergebnis am Zieloperanden gespeichert – gesteuert durch Befehle aus dem Befehlsspeicher.',
        more: '- Quelloperanden aus dem Datenspeicher auslesen\n- an die Verarbeitungseinheiten (ALU) weiterleiten\n- Operation auswählen und Operanden verarbeiten\n- Ergebnis an der als Zieloperand vorgegebenen Speicherstelle ablegen\n\nWelche Daten, wie verarbeitet, wohin gespeichert: Das steht jeweils im Befehl.',
        moreLabel: 'Ablauf',
      },
      {
        term: 'Befehl',
        def: 'Enthält die Information, welche Daten (Quelloperanden) wie verarbeitet werden (Operation) und wohin das Ergebnis geschrieben wird (Zieloperand).',
      },
      {
        term: 'Programm',
        def: 'Folge von Befehlen, die einer nach dem anderen ausgeführt werden.',
      },
      {
        term: 'Quell- und Zieloperand',
        def: 'Quelloperanden: die Daten, die verarbeitet werden. Zieloperand: die Stelle, an die das Ergebnis geschrieben wird.',
      },
      {
        term: 'ALU',
        def: 'Arithmetic Logic Unit: Verarbeitungseinheit der CPU, z. B. Addierer und Multiplizierer für Fest- und Gleitkommazahlen.',
      },
      {
        term: 'CPU',
        def: 'Central Processing Unit (Mikroprozessor): lädt Befehle und Daten aus dem Speicher und führt die Befehle aus.',
      },
      {
        term: 'SSD',
        def: 'Solid State Drive: nicht-volatiler Massenspeicher, in dem Programme und Daten dauerhaft gespeichert sind.',
      },
      {
        term: 'volatil vs. nicht-volatil',
        def: 'Volatiler Speicher (z. B. DRAM) verliert seinen Inhalt ohne Versorgungsspannung; nicht-volatiler bzw. persistenter Speicher (z. B. SSD) behält ihn.',
      },
      {
        term: 'Arbeitsspeicher (RAM)',
        def: 'Random Access Memory: Speicher, mit dem der Prozessor arbeitet. Programme und Daten werden vom Massenspeicher hineingeladen; volatil.',
      },
      {
        term: 'DRAM',
        def: 'Dynamic RAM: speichert Bits als Ladung in Kondensatoren, muss regelmäßig aufgefrischt werden (Refresh); volatil.',
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
        term: 'SRAM',
        def: 'Static RAM: speichert Bits in rückgekoppelten Transistorschaltungen – schnell, aber platzaufwendig. Wird für Register verwendet.',
      },
      {
        term: 'Allzweckregister',
        def: 'Durchnummerierte Register, in die Daten zur Verarbeitung geladen werden. Zur Adressierung reichen wenige Bits, z. B. $2^5 = 32$ Register → 5 Bit.',
      },
      {
        term: 'RISC',
        def: 'Reduced Instruction Set Computer: Prozessoren, bei denen Daten zur Verarbeitung erst vom Speicher in Register geladen werden.',
      },
      {
        term: 'Befehlszähler',
        def: 'Register mit der Adresse des auszuführenden Befehls. Normal: $\\text{BZ} \\leftarrow \\text{BZ} + 4$ (Befehlslänge), bei Sprüngen: $\\text{BZ} \\leftarrow \\text{BZ} + \\text{Offset}$.',
      },
      {
        term: 'Befehlsregister',
        def: 'Enthält den aus dem Speicher geladenen aktuellen Befehl. Seine Bits wählen die Operation, adressieren Quell-/Zielregister und liefern Konstanten.',
      },

      // ---------- 2.3 Maschinen- und Assembler-Code ----------
      {
        term: 'Maschinencode',
        def: 'Binär codierte Befehle (z. B. `0xA9BF7BFD`), die der Prozessor direkt ausführen kann.',
      },
      {
        term: 'Assembler-Code',
        def: 'Für Menschen lesbare Textform des Maschinencodes, z. B. `stp fp, lr, [sp,#-0x10]!`. Nicht direkt ausführbar.',
      },
      {
        term: 'Assembler (Programm)',
        def: 'Assemblierungsprogramm, das Assembler-Code automatisiert in Maschinencode umwandelt und als Binärdatei speichert.',
      },
      {
        term: 'Mnemonic',
        def: 'Menschenlesbare Bezeichnung eines Befehls, z. B. `stp` für „store pair“ oder `add` für addieren.',
      },
      {
        term: 'Opcode',
        def: 'Teil des Befehlsworts, der festlegt, welche Operation ausgeführt wird.',
      },
      {
        term: 'Direktoperand',
        def: 'Wert, der direkt im Befehlswort steht; im Assembler mit `#` gekennzeichnet, z. B. `#-0x10`.',
      },
      {
        term: 'Speicheradressierung mit [ ]',
        def: 'Eckige Klammern bedeuten: Der Wert darin wird als Speicheradresse verwendet, z. B. `[sp]` = Adresse aus dem Stackpointer.',
        more: '- `[sp,#-16]` → Adresse $= sp - 16$, sp bleibt unverändert\n- `[sp,#-16]!` → **Pre-Indexed:** erst $sp \\leftarrow sp - 16$, dann mit neuem sp adressieren\n- `[sp], #-16` → **Post-Indexed:** erst mit sp adressieren, danach $sp \\leftarrow sp - 16$',
        moreLabel: 'Methode',
      },
      {
        term: 'Pre- vs. Post-Indexed Addressing',
        def: 'Pre-Indexed (`[sp,#-16]!`): Register wird vor der Adressierung geändert. Post-Indexed (`[sp], #-16`): Register wird erst danach geändert.',
      },
      {
        term: 'sp, fp, lr',
        def: 'Spezielle Register: sp = Stackpointer, fp = Frame-Pointer, lr = Link-Register (speichert die Rücksprungadresse).',
      },
      {
        term: 'Little Endian',
        def: 'Byte-Reihenfolge, bei der das niederwertigste Byte an der niedrigsten Adresse steht: `0xFD7BBFA9` liegt als `A9 BF 7B FD` im Speicher.',
      },
      {
        term: 'Big Endian',
        def: 'Byte-Reihenfolge, bei der das höchstwertige Byte an der niedrigsten Adresse steht.',
      },
      {
        term: 'Binärdatei',
        def: 'Datei mit Maschinencode, die mit einem Loader in den Speicher geladen oder mit einem Programmieradapter übertragen werden kann.',
      },

      // ---------- 2.4 Bare Metal ----------
      {
        term: 'Bare Metal',
        def: 'Programm läuft direkt auf der „nackten“ Hardware, ohne Betriebssystem – z. B. auf dem Mikrocontroller.',
        more: '- nach Reset: Start bei Adresse 0 (Reset-Interrupt) → Sprung in main\n- direkter Zugriff auf die Spezialregister des Prozessors: Betriebsmodus, Timer, PWM-Signale, Interrupts, ISRs\n- Funktion der Speicherstellen ergibt sich aus dem Datenblatt\n- auf einem PC ist dieser Zugriff nur dem Betriebssystem erlaubt',
        moreLabel: 'Methode',
      },
      {
        term: 'Host-System und Target',
        def: 'Host: Rechner, auf dem der Code geschrieben und übersetzt wird (z. B. Eikon-PC). Target: Zielsystem, auf dem er läuft (z. B. Mikrocontroller).',
      },
      {
        term: 'Programmieradapter',
        def: 'Gerät, mit dem die Binärdatei vom Host in den Speicher des Mikrocontrollers übertragen wird.',
      },
      {
        term: 'Spezialregister',
        def: 'Register zur Steuerung der Prozessor-Hardware (z. B. Timer, Interrupts). Bare Metal direkt zugänglich, mit Betriebssystem nur für dieses.',
      },
      {
        term: 'Interrupt',
        def: 'Asynchrone Unterbrechung des Programms durch ein Ereignis (z. B. Tastendruck, Timer-Ablauf), die einen Sprung in eine Interrupt-Service-Routine auslöst.',
      },
      {
        term: 'Interrupt-Service-Routine (ISR)',
        def: 'Programmteil, in den bei einem Interrupt verzweigt wird und der das Ereignis behandelt.',
      },

      // ---------- 2.5 Programmausführung mit Betriebssystem ----------
      {
        term: 'Bootvorgang',
        def: 'Reset-Interrupt → Firmware (BIOS/UEFI) prüft und initialisiert die Hardware → lädt den Bootloader → dieser lädt den Kernel und übergibt ihm die Kontrolle.',
        more: '- Reset löst Reset-Interrupt aus → ISR verzweigt zur Firmware\n- Firmware (Bare-Metal-Programm) macht POST und initialisiert Controller, Busse usw., bis Massenspeicher lesbar sind\n- Firmware lädt von einem bootfähigen Medium den Bootloader\n- Bootloader lädt den Kernel des Betriebssystems\n- Kernel verwaltet Speicher und führt Programme quasi-parallel aus',
        moreLabel: 'Ablauf',
      },
      {
        term: 'Firmware (BIOS/UEFI)',
        def: 'Bare-Metal-Programm, das beim Start läuft: prüft die Hardware (POST), initialisiert sie und lädt den Bootloader.',
      },
      {
        term: 'POST',
        def: 'Power-on-Self-Test: Überprüfung der vorhandenen Hardware-Komponenten durch die Firmware beim Einschalten.',
      },
      {
        term: 'Bootloader',
        def: 'Wird von der Firmware geladen; lädt den Kernel des Betriebssystems und übergibt ihm die Kontrolle.',
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
        term: 'Prozess-Kontext',
        def: 'Alle Daten, die den Zustand eines laufenden Programms festlegen: Registerwerte, Adressraum-Infos (Seitentabellen), Speicherbereiche (Code, Daten, Heap, Stack), Verwaltungsinfos.',
      },
      {
        term: 'Virtueller Speicherbereich',
        def: 'Eigener Adressraum, den der Kernel jedem Programm zuweist, um die Programme im Speicher voneinander zu trennen.',
      },
      {
        term: 'Zeitscheibe',
        def: 'Fester Zeitabschnitt, nach dem ein vom Kernel programmierter Timer einen Interrupt auslöst und das Betriebssystem wieder die Kontrolle bekommt.',
      },
      {
        term: 'Preemptives Multitasking',
        def: 'Prozesse werden per Timer-Interrupt nach jeder Zeitscheibe unterbrochen und abwechselnd stückweise ausgeführt – scheinbar parallel.',
        more: '- Kernel lädt Kontext von P1 und springt in P1\n- Zeitscheibe läuft ab → Timer-Interrupt → ISR des Betriebssystems\n- Kernel sichert Kontext von P1, lädt Kontext von P2, setzt P2 an seiner letzten Stelle fort\n- usw. für P3, P1, P2, …\n\nGegensatz **kooperatives Multitasking:** Programme werden nicht unterbrochen, sondern müssen freiwillig an den Kernel zurückgeben.',
        moreLabel: 'Ablauf',
      },
      {
        term: 'Kooperatives Multitasking',
        def: 'Programme werden nicht per Timer unterbrochen, sondern geben die Kontrolle freiwillig an den Kernel zurück.',
      },
      {
        term: 'Scheduling',
        def: 'Festlegung, welcher Prozess als Nächstes ausgeführt wird; kann verschiedene Optimierungsziele haben.',
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
        term: 'Exception (Ausnahme)',
        def: 'Wird z. B. ausgelöst, wenn ein Programm im User Mode einen privilegierten Befehl ausführt; der Kernel fängt sie in einer Ausnahme-Routine ab.',
      },

      // ---------- 2.6 Speicher und Dateisystem ----------
      {
        term: 'Massenspeicher',
        def: 'Persistenter Speicher wie SSD, HDD oder USB-Stick, der Daten auch ohne Spannung behält.',
      },
      {
        term: 'Blockgerät',
        def: 'Massenspeicher, der Daten in gleich großen, durchnummerierten Blöcken speichert; gelesen und geschrieben wird immer blockweise.',
      },
      {
        term: 'Sektor',
        def: 'Block bei Festplatten (HDD), typisch 512 Byte oder 4 kByte plus Verwaltungsinformationen.',
      },
      {
        term: 'Seite (Page)',
        def: 'Block bei Flash-Speichern wie SSDs, typisch 4 kByte.',
      },
      {
        term: 'Physische vs. logische Blockgröße',
        def: 'Physisch: tatsächlich auf dem Medium verwendete Blockgröße. Logisch: nach außen angebotene Blockgröße. Beide müssen nicht übereinstimmen.',
      },
      {
        term: 'LBA',
        def: 'Logische Block-Adresse: Nummer eines logischen Blocks auf dem Massenspeicher.',
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
        term: 'Metadaten',
        def: 'Zusatzinfos zu einer Datei im Dateisystem: Größe, Besitzer, Zugriffsrechte, Zeitstempel usw.',
      },
      {
        term: 'VFS',
        def: 'Virtual File System (Linux): Abstraktionsschicht für einheitlichen Zugriff (open, read, write, close) auf verschiedene Dateisysteme wie ext4 oder zfs.',
      },

      // ---------- 2.7 Shell ----------
      {
        term: 'Kernel und Shell',
        def: 'Bild einer Nuss: Der Kern (Kernel) führt alle systemkritischen Operationen aus, die Schale (Shell) ist die Befehlsschnittstelle dazu.',
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
        term: 'Shell-Builtin',
        def: 'Befehl, der direkt in die Shell eingebaut ist (z. B. `cd`), im Gegensatz zu externen Programmen wie `/bin/ls`.',
      },
      {
        term: 'Optionen und Operanden',
        def: 'Argumente eines Befehls: Optionen (z. B. `-l`), Optionen mit Options-Argument (z. B. `-D "%F"`) und als letztes Operanden (z. B. ein Dateiname).',
      },
      {
        term: 'Absoluter vs. relativer Pfad',
        def: 'Absolut: beginnt mit `/` und beschreibt den ganzen Weg vom Dateisystem-Ursprung. Relativ: ohne `/`, ausgehend vom aktuellen Verzeichnis.',
      },

      // ========== Skript S. 51–68: Programmieren auf Hochsprachen-Ebene ==========
      // ---------- 3.1 Höhere Abstraktionsebene ----------
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

      // ---------- 3.2 Toolchain ----------
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
        term: 'Hex-Editor',
        def: 'Zeigt die Bytes einer Datei hexadezimal an (oft zusätzlich als ASCII-Text), statt sie als Text zu interpretieren.',
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
        term: 'Zeichensatz vs. Codierung',
        def: 'Zeichensatz: Menge von Zeichen. Codierung: wie die Zeichen als Bitmuster dargestellt werden. Unicode trennt beides sauber.',
      },
      {
        term: 'Unicode',
        def: 'Zeichensatz, der jedem Zeichen einen Codepoint zuordnet (z. B. U+0041 für A) – getrennt von der Codierung (UTF-8, UTF-16, UTF-32).',
      },
      {
        term: 'Quell-Zeichensatz',
        def: 'Zeichensatz, in den der Compiler die Bytes der Quelltext-Datei zuerst überführt; besteht aus dem Basis-Quell-Zeichensatz und erweiterten Zeichen.',
      },
      {
        term: 'Basis-Quell-Zeichensatz',
        def: 'Im C-Standard festgelegte Zeichen, die jeder Compiler unterstützen muss: Groß-/Kleinbuchstaben, Ziffern, 32 Sonderzeichen, Leerzeichen, \\t, \\v, \\f.',
      },
      {
        term: 'Ausführungs-Zeichensatz',
        def: 'Zeichensatz der Ausführungsumgebung (implementierungsabhängig, aus ABI/Zielplattform), in den Zeichen- und Stringliterale umgewandelt werden.',
      },
      {
        term: 'Zeilenende (CR/LF)',
        def: 'Windows: CR + LF (`\\r\\n`), Linux/macOS: LF (`\\n`), Classic Mac: CR. Der Compiler vereinheitlicht alles auf LF.',
      },
      {
        term: 'Zeilenspleißung',
        def: 'Line splicing: Endet eine Zeile mit einem Backslash `\\`, fügt der Compiler sie mit der Folgezeile zu einer Zeile zusammen.',
      },
      {
        term: 'Lexer (lexikalische Analyse)',
        def: 'Zerlegt den Quelltext auf Wortebene (ohne Struktur) in Token. Kommentare werden dabei durch ein Leerzeichen ersetzt.',
        more: 'Warum Leerzeichen statt Löschen?\n`int/* Kommentar */a;` → Token `int` und `a`.\nBeim bloßen Löschen entstünde das Token `inta` → Fehler.\n\nToken von `int a = 7-6/3;`:\n`int`, identifier `a`, `=`, `7`, `-`, `6`, `/`, `3`, `;`, eof',
        moreLabel: 'Beispiel',
      },
      {
        term: 'Token',
        def: 'Kleinste bedeutungstragende Einheit nach der lexikalischen Analyse, z. B. Schlüsselwort, Identifier, Zahl, Operator, Semikolon.',
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
        term: 'Zeichenliteral-Konvertierung',
        def: 'Umwandlung der Zeichen aus dem Quell- in den Ausführungs-Zeichensatz, z. B. `\\n` (zwei Zeichen im Quelltext) → Byte 0x0A.',
      },
      {
        term: 'Stringliteral-Verkettung',
        def: 'Direkt hintereinander stehende Zeichenketten werden zusammengefügt: `"Hallo " "Welt!"` → `"Hallo Welt!"`.',
      },
      {
        term: 'Parser (syntaktische Analyse)',
        def: 'Prüft die Token anhand der Syntaxregeln des C-Standards und erzeugt daraus einen abstrakten Syntax-Baum (AST).',
      },
      {
        term: 'Abstrakter Syntax-Baum (AST)',
        def: 'Baumdarstellung der Programmstruktur, z. B. `int a = 7-6/3;` → VarDecl mit BinaryOperator `-` (7, BinaryOperator `/` (6, 3)).',
      },
      {
        term: 'Baum (Datenstruktur)',
        def: 'Knoten (nodes) im Speicher, die die Adressen ihrer Nachbarknoten enthalten. Von der Wurzel (root) gelangt man bis zu den Blättern (leaves).',
      },
      {
        term: 'Produktionsregeln',
        def: 'Form, in der der C-Standard Syntaxregeln definiert, z. B. multiplicative-expression: cast-expression oder multiplicative-expression * cast-expression.',
      },
      {
        term: 'Semantische Analyse',
        def: 'Prüft, ob die Elemente des AST nach den Sprachregeln Sinn ergeben (z. B. Zahl + Zeichenkette → Fehler) und versieht Knoten mit Datentypen (Typannotation).',
      },
      {
        term: 'Zwischensprache (LLVM IR)',
        def: 'Zwischencode zwischen AST und Maschinencode, auf dem allgemeine Optimierungen laufen, die nicht für jede Maschinencode-Variante neu implementiert werden müssen.',
      },
      {
        term: 'ISA (Befehlssatzarchitektur)',
        def: 'Instruction Set Architecture: alle Eigenschaften eines Prozessors, die man zum Erzeugen von Maschinencode kennen muss – die Hardware/Software-Schnittstelle.',
        more: 'Umfasst u. a.:\n- Befehlssatz: Befehle, ihre Semantik und Codierung in Bits\n- verfügbare Register und ihre Verwendung\n- Adressierungsarten (z. B. Register-, indirekte Adressierung)\n- Datentypen und Ablage im Speicher (Big/Little Endian)\n- Interrupts: welche, Sprungadressen, Priorität\n\nDie ISA ist eine Obermenge des Befehlssatzes und lässt meist mehrere Lösungswege offen.',
        moreLabel: 'Inhalt',
      },
      {
        term: 'Befehlssatz',
        def: 'Menge der Befehle, die ein Prozessor implementiert (z. B. ADD, MUL), inkl. Semantik und Codierung. Teil der ISA.',
      },
      {
        term: 'Adressierungsarten',
        def: 'Art, wie Operanden angegeben werden, z. B. Register-Adressierung (Register im Befehlswort codiert) oder indirekte Adressierung (Register enthält die Speicheradresse).',
      },
      {
        term: 'Aufrufkonvention',
        def: 'Calling convention (Teil des ABI): wer welche Register sichert, wo die Rücksprungadresse liegt und wie Parameter und Rückgabewert übergeben werden.',
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
        term: 'Magic Bytes',
        def: 'Erste Bytes einer Datei, die ihr Format anzeigen, z. B. `0x7f E L F` für ELF oder `0xfeedfacf` für Mach-O 64 Bit.',
        more: '- `0xfeedface` → Mach-O, 32 Bit\n- `0xfeedfacf` → Mach-O, 64 Bit (Little Endian im Hex-Editor: `cf fa ed fe`)\n- `0xcafebabe` / `0xcafebabf` → Universal Binary (macOS), mehrere Architekturen\n- `0x7f 0x45 0x4c 0x46` = `\\x7fELF` → ELF (Linux)\n- `0x23 0x21` = `#!` → Shebang (Skript)',
        moreLabel: 'Tabelle',
      },
      {
        term: 'ELF und Mach-O',
        def: 'Formate ausführbarer Binärdateien: ELF unter Linux, Mach-O unter macOS/iOS.',
      },
      {
        term: 'Shebang (#!)',
        def: 'Zeichenfolge `#!` am Dateianfang eines Skripts, gefolgt vom Interpreter, z. B. `#!/bin/bash` oder `#!/usr/bin/python3`.',
      },
      {
        term: 'Disassembler',
        def: 'Programm, das den Aufbau von Binärdateien kennt und den Maschinencode als lesbaren Assembler-Code darstellt.',
      },
      {
        term: 'Dynamischer Linker/Loader',
        def: 'Lädt beim Start eines dynamisch gelinkten Programms die benötigten Bibliotheken (Linux: ld-linux.so, macOS: dyld); läuft im User Space.',
      },
      {
        term: 'Relocation',
        def: 'Ersetzen der Bibliotheksaufrufe in der Binärdatei durch die jetzt gültigen Adressen der geladenen Module.',
      },

      // ========== Skript S. 69–111 ==========
      // ---------- 3.3 Aufgaben mit git herunterladen ----------
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

      // ---------- 4 Programm-Strukturierung mit Funktionen ----------
      {
        term: 'Trennung von Programmcode und Daten',
        def: 'Code und Daten liegen auf der SSD und im DRAM in getrennten Speicherbereichen – aus Gründen der Sicherheit und der Organisation.',
        more: '- **Sicherheit:** unterschiedliche Zugriffsrechte möglich. Code: „ausführbar, nicht änderbar“; Daten: „änderbar, nicht ausführbar“ (W^X).\n- **Organisation:** Befehle müssen direkt hintereinander liegen (Befehlszähler + Offset, z. B. 4); Daten können dynamisch wachsen und brauchen freien Platz.',
        moreLabel: 'Gründe',
      },
      {
        term: 'W^X (write xor execute)',
        def: 'Speicher ist entweder beschreibbar oder ausführbar, nie beides. Verhindert, dass eingegebene Daten versehentlich als Programm ausgeführt werden.',
      },
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
        term: 'Einsprungspunkt',
        def: 'Adresse des ersten Befehls einer Funktion. Beim Aufruf wird sie in den Befehlszähler geschrieben.',
      },
      {
        term: 'Sequentielle Befehlsverarbeitung',
        def: 'Befehle werden nacheinander abgearbeitet: Der Befehlszähler wird jeweils um die Befehlswortbreite in Byte erhöht, z. B. $\\text{BZ} \\leftarrow \\text{BZ} + 4$.',
      },
      {
        term: 'Sprungbefehl',
        def: 'Unterbricht die sequentielle Abarbeitung, indem statt der Befehlswortbreite ein anderer Wert auf den Befehlszähler addiert wird.',
      },
      {
        term: 'Rücksprung (ret)',
        def: 'Springt zum Befehl direkt nach dem Funktionsaufruf zurück. Die Rücksprungadresse liegt in einem speziellen Register (ARM: Link-Register).',
        more: 'Die Rücksprungadresse wird schon beim Aufruf berechnet:\n$$\\text{Rücksprungadresse} = \\text{BZ}_{\\text{Sprung}} + \\text{Befehlswortbreite}$$\nz. B. $\\texttt{0x10418436c} + 4 = \\texttt{0x104184370}$\n\nSie wird im Link-Register abgelegt und beim `ret` als Sprungziel verwendet.',
        moreLabel: 'Methode',
      },
      {
        term: 'Positionsunabhängiger Code',
        def: 'Code, der an jeder beliebigen Speicheradresse lauffähig ist, weil Sprungziele relativ zum aktuellen Befehlszähler angegeben werden (z. B. „−20 Befehle“).',
      },
      {
        term: 'Parametrierbarkeit',
        def: 'Eine Funktion verhält sich je nach übergebenen Parametern unterschiedlich – so deckt eine Funktion viele Fälle ab (z. B. `lcd` für alle Display-Befehle).',
      },
      {
        term: 'Input/Output-System',
        def: 'Sicht auf eine Funktion: Man übergibt eine Eingabe und erhält eine entsprechende Ausgabe, z. B. $\\cos(5{,}34) \\approx 0{,}59$.',
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
        term: 'ABI',
        def: 'Application Binary Interface (Binärschnittstelle): legt fest, wie bestimmte Softwareprobleme für eine ISA auf einem System konkret umgesetzt werden – reduziert die Freiheitsgrade der ISA auf genau eine Lösung.',
        more: 'Regelt u. a.:\n- Aufrufkonvention: Registersicherung, Rücksprungadresse, Parameter- und Rückgabewert-Übergabe\n- Stack- und Datenlayout (Endianness, Alignment)\n- Codierung von Namen für die Symboltabelle\n- Format der Binärdatei (ELF, Mach-O)\n- Größe der Datentypen\n\nNötig, damit Binärdateien zueinander kompatibel sind (z. B. eigener Code + Bibliothek).\nBeispiele: System V ABI (x86-64), AAPCS64 (ARM).',
        moreLabel: 'Inhalt',
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
        term: 'Funktionsname',
        def: 'Zeichenkette, die die Funktion eindeutig identifiziert. Es darf keine zweite Funktion mit gleichem Namen geben.',
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

      // ---------- 4.5 main ----------
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
        term: 'fork()',
        def: 'Klont den aktuellen Prozess (z. B. die Shell) in einen Kindprozess mit Kopie von Code, Bibliotheken, Heap und Stack.',
      },
      {
        term: 'execve()',
        def: 'Ersetzt den Prozessinhalt durch ein neues Programm: legt einen neuen Adressraum an, lädt das Programm und kopiert Argumente und Umgebungsvariablen auf den Stack.',
        more: 'Name: exec = execute, v = vector (Argumente als Array argv), e = environment (Umgebungsvariablen als envp).\n\n`int execve(const char *path, char *const argv[], char *const envp[]);`\n\nEs wird kein physischer Speicher gelöscht – nur die Datenstrukturen für die Übersetzung virtueller in physische Adressen werden neu angelegt.',
        moreLabel: 'Details',
      },
      {
        term: 'waitpid()',
        def: 'Damit wartet die Shell auf das Ende des Kindprozesses.',
      },
      {
        term: 'Umgebungsvariablen (envp)',
        def: 'Liste von Zeichenketten wie `HOME=/Users/…`, die einem Programm beim Start mitgegeben wird.',
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

      // ---------- 4.6 printf ----------
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
        term: '%n',
        def: 'Spezifizierer ohne Ausgabe: speichert die Anzahl der bis dahin ausgegebenen Zeichen in der übergebenen Variable (Zeiger, z. B. `&a`).',
      },

      // ---------- 4.7 Escaping ----------
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
        term: 'Steuerzeichen',
        def: 'Nicht druckbare Zeichen, die die Ausgabe steuern, z. B. Zeilenumbruch `\\n` oder Tabulator `\\t`.',
      },

      // ---------- 4.8 Kommentare ----------
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
      {
        term: 'Auskommentieren per Tastatur',
        def: 'Zeilen markieren, dann Strg + Shift + 7 (macOS: Cmd + Shift + 7). Nochmal drücken hebt es wieder auf (toggle comment).',
      },
    ],
  },
];
