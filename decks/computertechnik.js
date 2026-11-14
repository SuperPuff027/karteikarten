/* Lernset Computertechnik (Skript „Computertechnik“, M. Zwick, Stand Okt. 2026).
 * Format wie in decks.js. `ex` = kurzes Codebeispiel (MMIX- bzw. Universalrechner-Assembler).
 * Hinweis: In def-Texten Register immer in Backticks schreiben (`$1`), sonst wird $…$ als Formel gelesen.
 */
window.DECKS = window.DECKS || [];
window.DECKS.push({
  id: 'computertechnik',
  name: 'Computertechnik',
  color: 'peach',
  description: 'Skript Computertechnik: Zahlendarstellung, arithmetische Schaltungen, Universalrechner, Befehlssätze, MMIX, Pipelining, Cache.',
  cards: [
    { chapter: '1 Einleitung – Computer, Prozessor, Programm' },
    {
      term: 'Computersystem',
      def: 'System, das Berechnungen bzw. allgemein Datenverarbeitung durchführt: Ein Programm läuft auf einem Prozessor und bildet Eingangsdaten auf Ausgangsdaten ab.',
    },
    {
      term: 'Problemspezifische Schaltung',
      def: 'Hardware-Schaltung aus Teilschaltungen (Addierer, Multiplizierer, …), die genau ein Problem löst, z. B. die quadratische Gleichung. Für ein anderes Problem braucht man eine neue Schaltung.',
    },
    {
      term: 'ASIC',
      def: 'Application Specific Integrated Circuit: anwendungsspezifische integrierte Schaltung – eine problemspezifische Schaltung als eigener Chip.',
    },
    {
      term: 'Seriell vs. parallel',
      def: 'Parallel: Berechnungen laufen gleichzeitig (z. B. $2a$ und $4a$). Seriell: nacheinander, weil ein Ergebnis Eingang der nächsten Berechnung ist.',
    },
    {
      term: 'Universelle Schaltung',
      def: 'Problemunabhängige Schaltung: Das zu lösende Problem wird als Programm vorgegeben. Die Berechnung wird rein seriell ausgeführt, Zwischenergebnisse liegen im Speicher.',
    },
    {
      term: 'ALU',
      def: 'Arithmetic Logic Unit: fasst die Ausführungseinheiten (Addierer, Multiplizierer, …) zusammen; die Operation wird über eine Steuerleitung ausgewählt.',
    },
    {
      term: 'Ausführungs-Zyklus',
      def: 'Quelloperanden auswählen und aus dem Datenspeicher an die ALU leiten → Operation ausführen → Ergebnis an der Zieloperanden-Adresse speichern → nächsten Befehl auswählen.',
      more: '1. Auswahl der Quelloperanden (welche Daten?)\n2. Auslesen und Weiterleiten an die ALU\n3. Auswahl der Operation (wie verarbeiten?)\n4. Verarbeitung in der ALU\n5. Auswahl des Zieloperanden (wohin?)\n6. Abspeichern des Ergebnisses\n7. (1), (3) und (5) zusammen bilden einen **Befehl**\n8. Auswahl des nächsten Befehls (normalerweise nächste Speicherstelle)',
      moreLabel: 'Ablauf',
    },
    {
      term: 'Befehl',
      def: 'Legt für einen Ausführungs-Zyklus die auszuführende Operation sowie die Quell- und Zieloperanden fest.',
      ex: 'ADD R0,R1,R2   // R0 ← R1 + R2',
    },
    {
      term: 'Prozessor',
      def: 'Die am Abarbeiten der Ausführungs-Zyklen beteiligten Schaltungskomponenten, als eigenständige Schaltung hergestellt.',
    },
    {
      term: 'Harvard-Architektur',
      def: 'Befehle und Daten liegen in getrennten Speichern (Befehlsspeicher und Datenspeicher).',
    },
    {
      term: 'Von-Neumann-Architektur',
      def: 'Befehle und Daten liegen in einem gemeinsamen Speicher.',
    },
    {
      term: 'Sprungbefehl',
      def: 'Befehl, der statt der nächsten Speicherstelle direkt die Position des als Nächstes auszuführenden Befehls festlegt.',
      ex: 'JMP Start',
    },
    {
      term: 'Programm (Computertechnik)',
      def: 'In sich geschlossene Menge an Befehlen, die festlegt, welche Befehle in welcher Reihenfolge ausgeführt werden.',
    },

    { chapter: '2 Darstellung von Zahlen und Zeichen' },
    {
      term: 'Logikpegel (High/Low)',
      def: 'Ein Wert wird nicht als exakte Spannung dargestellt, sondern als Spannungsbereich: High = 1, Low = 0. Dadurch ist die Schaltung robust gegen Störungen und Spannungsabfälle.',
      more: 'Probleme bei direkter Darstellung von Zahlen als Spannung:\n- große Zahlen → sehr hohe Spannungen (gefährlich, Überschläge)\n- jeder Spannungsabfall auf Leitungen würde den Wert ändern → ungenau\n\nTypisch: Low ≈ −0,3 … +1,3 V, High ≈ +2,3 … +5,3 V. Bei RS-232 ist es umgekehrt (+3 … +15 V = Low).',
      moreLabel: 'Methode',
    },
    {
      term: 'Bit',
      def: 'Binary Digit: Binärziffer mit den Werten 0 und 1. Mit $n$ Bits lassen sich $2^n$ verschiedene Werte darstellen.',
    },
    {
      term: 'MSB / LSB',
      def: 'Most Significant Bit: Bit mit der höchsten Wertigkeit (ganz links). Least Significant Bit: niedrigste Wertigkeit (ganz rechts, Bit 0).',
    },
    {
      term: 'Nibble',
      def: 'Vier zusammengehörige Bits – entspricht genau einer Hexadezimalziffer.',
    },
    {
      term: 'Byte',
      def: 'Acht zusammengehörige Bits; elementare Datengröße. Datenworte bestehen meist aus 2, 4 oder 8 Byte (16, 32, 64 Bit).',
    },
    {
      term: 'Hexadezimale Darstellung',
      def: 'Je 4 Bit (ein Nibble) werden zu einer Ziffer 0–9, A–F zusammengefasst. Präfix `0x`.',
      ex: '0010 1100 1010 0011  =  0x2CA3',
    },
    {
      term: 'Oktale Darstellung',
      def: 'Je 3 Bit werden zu einer Ziffer 0–7 zusammengefasst. Präfix `0` (führende Null).',
      ex: '001 110 000  =  0160',
    },
    {
      term: 'ASCII',
      def: 'American Standard Code for Information Interchange: codiert 128 Zeichen mit 7 Bit. Druckbare Zeichen ab `0x20`, darunter (`0x00`–`0x1F`) Steuerzeichen.',
      ex: "'A' = 0x41 = 65\n'a' = 0x61 = 97\n' ' = 0x20",
    },
    {
      term: 'Steuerzeichen',
      def: 'Die ASCII-Codes `0x00`–`0x1F`, früher zur Steuerung von Fernschreibern. Heute wichtig: `0x00` (NUL, Ende einer Zeichenkette), `0x0A` (LF, Zeilenumbruch), `0x09` (HT, Tabulator).',
    },
    {
      term: 'Unicode',
      def: 'Zeichensatz, der jedem weltweit verwendeten Schriftzeichen eine eindeutige Zahl zuordnet.',
    },
    {
      term: 'UTF-8',
      def: 'Codierung von Unicode mit variabler Wortbreite (1–4 Byte): häufige Zeichen kurz, seltene lang. `0x00`–`0x7F` entspricht ASCII.',
      ex: '0xxxxxxx                     (ASCII)\n110xxxxx 10xxxxxx\n1110xxxx 10xxxxxx 10xxxxxx\n11110xxx 10xxxxxx 10xxxxxx 10xxxxxx',
    },
    {
      term: 'UTF-32',
      def: 'Jedes Unicode-Zeichen wird mit 32 Bit codiert. Vorteil: einfach. Nachteil: hoher Speicherbedarf.',
    },
    {
      term: 'Basis eines Zahlensystems',
      def: 'Anzahl $b$ der verfügbaren Ziffernsymbole. Mit $n$ Ziffern lassen sich $b^n$ Werte darstellen; die Stelle $i$ hat die Wertigkeit $b^i$.',
      ex: '1024 = 1·10³ + 0·10² + 2·10¹ + 4·10⁰',
    },
    {
      term: 'Festkommazahl',
      def: 'Zahl, bei der das Komma an einer vorher vereinbarten, festen Stelle steht. Benachbarte Zahlen haben immer den gleichen Abstand (Äquidistanz).',
    },
    {
      term: 'Wert einer vorzeichenlosen Festkommazahl',
      def: '$$v = \\left(\\sum_{i=0}^{n-1} a_i \\cdot b^i\\right) \\cdot b^r$$ $n$: Stellenzahl, $b$: Basis, $a_i$: Ziffern, $r$: Position des Kommas.',
      more: '- $r = 0$: Normalfall, ganze Zahlen $0 \\ldots b^n - 1$\n- $r > 0$: Ziffern um $r$ Stellen nach links geschoben, rechts Nullen → größere Zahlen, geringere Genauigkeit (z. B. `xxxxxxxx000`)\n- $r < 0$: Komma um $|r|$ Stellen nach links → höhere Genauigkeit, kleinerer Wertebereich (z. B. `xxxxx,xxx`)',
      moreLabel: 'Radix-Punkt r',
    },
    {
      term: 'Wertebereich vorzeichenlos',
      def: '$0 \\ldots (2^n - 1) \\cdot 2^r$, also $2^n$ verschiedene Werte. Beispiel $n = 8$, $r = 2$: größte Zahl $2^{10} - 4 = 1020$.',
    },
    {
      term: 'Überlauf (vorzeichenlos)',
      def: 'Liegt vor, wenn das Carry-Out-Bit (Stelle MSB + 1) gesetzt ist.',
    },
    {
      term: 'Vorzeichen und Betrag',
      def: 'MSB = Vorzeichen (0 positiv, 1 negativ), restliche Bits = Betrag. Probleme: doppelte Null ($+0$, $-0$) und Addition wie im Dezimalsystem funktioniert nicht.',
      ex: '+5 = 0000 0101\n−5 = 1000 0101',
    },
    {
      term: 'Einer-Komplement',
      def: 'Negation durch Invertieren aller Bits. Addition funktioniert wie im Dezimalsystem, aber es gibt noch die doppelte Null. Wertebereich $-(2^{n-1}-1) \\ldots 2^{n-1}-1$.',
      ex: '+5 = 0000 0101\n−5 = 1111 1010',
    },
    {
      term: 'Zweier-Komplement',
      def: 'Einer-Komplement bilden und 1 addieren. Keine doppelte Null, Wertebereich $-2^{n-1} \\ldots 2^{n-1}-1$ (asymmetrisch). Standard für vorzeichenbehaftete Festkommazahlen.',
      ex: '+53 = 0011 0101\n1er = 1100 1010\n−53 = 1100 1011',
    },
    {
      term: 'Überlauf im Zweier-Komplement',
      def: 'Tritt auf, wenn zwei positive Zahlen addiert ein negatives Ergebnis liefern oder zwei negative Zahlen ein positives.',
    },
    {
      term: 'Subtraktion im Zweier-Komplement',
      def: '$x - y = x + (-y)$: den Subtrahenden ins Zweier-Komplement wandeln und addieren.',
      ex: '  37 = 0010 0101\n−53 = 1100 1011\n  ───────────────\n−16 = 1111 0000',
    },
    {
      term: 'Gleitkommazahl',
      def: 'Die Position des Kommas wird über einen Exponenten festgelegt. Abstände zwischen Zahlen sind um 0 sehr klein und für große Zahlen sehr groß – so lassen sich sehr große und sehr kleine Zahlen darstellen.',
    },
    {
      term: 'IEEE 754 Format',
      def: 'Vorzeichen $s$, Exponent $e$, Bruchteil $f$. 32 Bit: 1 + 8 + 23 Bit, $K = 127$. 64 Bit: 1 + 11 + 52 Bit, $K = 1023$.',
      more: '- **normalisiert** ($0 < e < e_{max}$): $v = (-1)^s \\cdot 1{,}f \\cdot 2^{e-K}$\n- **denormalisiert** ($e = 0$, $f > 0$): $v = (-1)^s \\cdot 0{,}f \\cdot 2^{1-K}$\n- **Null:** $e = 0$, $f = 0$\n- **$\\pm\\infty$:** $e$ alle Bits 1, $f = 0$\n- **NaN:** $e$ alle Bits 1, $f > 0$',
      moreLabel: 'Werte',
    },
    {
      term: 'Konstante K (Bias)',
      def: 'Wird vom gespeicherten Exponenten abgezogen: $2^{e-K}$. Einfache Genauigkeit $K = 127$, doppelte Genauigkeit $K = 1023$.',
    },
    {
      term: 'Normalisierte Gleitkommazahl',
      def: 'Exponent weder alle Bits 0 noch alle Bits 1. Vor dem Bruchteil steht implizit eine „1,“: $v = (-1)^s \\cdot 1{,}f \\cdot 2^{e-K}$.',
      ex: '13,5 = 1101,1 = 1,1011 · 2³\ne = 127 + 3 = 130\n0 10000010 10110000…0',
    },
    {
      term: 'Denormalisierte Gleitkommazahl',
      def: 'Exponent $e = 0$ und $f > 0$; vor dem Bruchteil steht „0,“. Damit lassen sich um 0 herum betragsmäßig viel kleinere Zahlen darstellen.',
    },
    {
      term: 'NaN',
      def: 'Not a Number: Exponent alle Bits 1, $f > 0$. Entsteht z. B. bei der Wurzel einer negativen Zahl oder bei $0/0$.',
    },
    {
      term: 'Unendlich (IEEE 754)',
      def: 'Exponent alle Bits 1, $f = 0$; Vorzeichen $s$ unterscheidet $+\\infty$ und $-\\infty$. 32 Bit: `0x7F800000` = $+\\infty$.',
    },

    { chapter: '3 Arithmetische Schaltungen' },
    {
      term: 'Logikgatter',
      def: 'Grundbausteine digitaler Schaltungen: Treiber, Inverter, UND, NAND, ODER, NOR, XOR, XNOR. Alle haben die Gatterlaufzeit $\\tau$.',
      more: '- **Treiber:** gibt den Eingangspegel aus\n- **Inverter:** gibt den Eingang invertiert aus\n- **UND:** 1, wenn alle Eingänge 1\n- **NAND:** 0, wenn alle Eingänge 1\n- **ODER:** 1, wenn mindestens ein Eingang 1\n- **NOR:** 1, wenn kein Eingang 1\n- **XOR (Antivalenz):** 1, wenn die Eingänge verschieden sind\n- **XNOR (Äquivalenz):** 1, wenn die Eingänge gleich sind',
      moreLabel: 'Tabelle',
    },
    {
      term: 'Gatterlaufzeit τ',
      def: 'Zeit, die ein Signal braucht, um durch ein Gatter zu laufen. Die Laufzeit einer Schaltung zählt man in Vielfachen von $\\tau$ entlang des längsten (kritischen) Pfads.',
    },
    {
      term: 'Kritischer Pfad',
      def: 'Längster Signalpfad durch eine Schaltung; bestimmt, wann am Ausgang sicher das korrekte Ergebnis anliegt.',
    },
    {
      term: 'Multiplexer',
      def: 'Wählt über den Steuereingang $s$ einen von mehreren Eingängen aus und leitet dessen Pegel an den Ausgang weiter.',
      ex: 's = 0 → y = a\ns = 1 → y = b',
    },
    {
      term: 'Demultiplexer',
      def: 'Hat einen Eingang und leitet dessen Pegel – abhängig vom Steuereingang $s$ – an einen von mehreren Ausgängen weiter; die anderen Ausgänge sind 0.',
    },
    {
      term: 'Decoder',
      def: 'Demultiplexer, dessen Eingang fest auf 1 liegt: Genau ein Ausgang (vom Steuereingang ausgewählt) ist 1. Dient zur Auswahl von Alternativen.',
      ex: 's = 00 → a = 1\ns = 01 → b = 1\ns = 10 → c = 1\ns = 11 → d = 1',
    },
    {
      term: 'Asynchrones RS-Flipflop',
      def: 'Zwei rückgekoppelte NOR-Gatter speichern ein Bit. Set $S = 1$ setzt, Reset $R = 1$ löscht. Asynchron: Änderungen wirken sofort. $S = R = 1$ ist verboten (Zustand ungültig).',
    },
    {
      term: 'Taktzustandsgesteuertes RS-Flipflop',
      def: 'RS-Flipflop mit Takteingang $C$: Bei $C = 0$ werden $S$ und $R$ blockiert, bei $C = 1$ werden Änderungen übernommen.',
    },
    {
      term: 'D-Flipflop',
      def: 'Nur ein Dateneingang $D$ legt fest, ob 0 oder 1 gespeichert wird – so gibt es keine undefinierten Zustände. Übernahme, solange $C = 1$.',
    },
    {
      term: 'Taktflankengesteuertes D-Flipflop',
      def: 'Übernimmt den Wert von $D$ nur im Moment, in dem $C$ von 0 auf 1 wechselt (steigende Flanke).',
    },
    {
      term: 'Register (Schaltung)',
      def: 'Speicherelement für mehrere Bits: $n$ parallel geschaltete taktflankengesteuerte D-Flipflops mit gemeinsamem Takt.',
    },
    {
      term: 'Halbaddierer',
      def: 'Addiert zwei Bits zu Summe und Übertrag: $s_i = x_i \\oplus y_i$, $c_i = x_i \\wedge y_i$. Berücksichtigt keinen Übertrag aus der vorherigen Stelle.',
    },
    {
      term: 'Volladdierer',
      def: 'Addiert drei Bits $x_i$, $y_i$, $c_{i-1}$: $$s_i = x_i \\oplus y_i \\oplus c_{i-1}$$ $$c_i = (x_i \\wedge y_i) \\vee \\big(c_{i-1} \\wedge (x_i \\oplus y_i)\\big)$$',
      more: 'Laufzeiten (aus zwei Halbaddierern + ODER):\n- $c_{i-1} \\to c_i$: $2\\tau$\n- $x_i/y_i \\to c_i$: $3\\tau$\n- $c_{i-1} \\to s_i$: $1\\tau$\n- $x_i/y_i \\to s_i$: $2\\tau$',
      moreLabel: 'Laufzeiten',
    },
    {
      term: 'Ripple-Carry-Addierer',
      def: '$n$ Volladdierer in Reihe: Der Übertrag läuft („rippelt“) von der niedrigsten zur höchsten Stelle. Funktioniert vorzeichenlos und im Zweier-Komplement.',
      more: '**Subtrahieren:** $x - y = x + (-y)$ → $y$ über Inverter + Multiplexer invertieren und Carry-In auf 1 setzen (Zweier-Komplement).\n\n**Laufzeit Subtraktion:** Inverter + Multiplexer $3\\tau$, erster VA $3\\tau$, $n-2$ VA je $2\\tau$, letzter VA $\\tau$ → für $n = 64$: $131\\tau$.',
      moreLabel: 'Methode',
    },
    {
      term: 'Carry-Look-Ahead',
      def: 'Die Überträge werden mit Zusatzlogik im Voraus aus Generate- und Propagate-Signalen berechnet, statt durchzurippeln → schneller. $$c_i = g_i \\vee (p_i \\wedge g_{i-1}) \\vee (p_i \\wedge p_{i-1} \\wedge g_{i-2}) \\vee \\ldots$$',
    },
    {
      term: 'Generate / Propagate',
      def: 'Generate $g_i = x_i \\wedge y_i$: Der Volladdierer erzeugt selbst einen Übertrag. Propagate $p_i = x_i \\oplus y_i$: Er leitet einen ankommenden Übertrag weiter.',
    },
    {
      term: 'Fan-In / Fan-Out',
      def: 'Fan-In: maximale Anzahl Eingänge eines Gatters. Fan-Out: maximale Anzahl Gattereingänge an einem Ausgang. Grenzen werden durch Baumstrukturen umgangen (kostet zusätzliche Laufzeit).',
    },
    {
      term: 'Kaskadierte Carry-Look-Ahead-Schaltung',
      def: 'Große CLA-Schaltungen aus mehreren kleinen (z. B. 4 Bit) zusammengesetzt; eine CLA-Einheit verknüpft deren Gruppen-Generate/-Propagate. Begrenzt die Gatteranzahl.',
      more: 'CLA-Einheit (zweistufig):\n- $C_0 = CC_0$\n- $C_1 = G_0 \\vee (P_0 \\wedge CC_0)$\n- $PP_0 = P_3 \\wedge P_2 \\wedge P_1 \\wedge P_0$\n- $GG_0 = G_3 \\vee (P_3 \\wedge G_2) \\vee (P_3 \\wedge P_2 \\wedge G_1) \\vee (P_3 \\wedge P_2 \\wedge P_1 \\wedge G_0)$\n\n$G$ und $P$ dürfen nicht vom Carry-In abhängen, sonst entsteht wieder der Ripple-Effekt.',
      moreLabel: 'Formeln',
    },
    {
      term: 'Gleitkomma-Addition',
      def: 'Größeren Exponenten übernehmen, Mantisse der kleineren Zahl (mit „1,“) um die Exponentendifferenz nach rechts schieben, Mantissen addieren, ggf. renormalisieren.',
      ex: '  1,1101 · 2¹   (3,625)\n→ 0,011101 · 2³\n+ 1,1011 · 2³   (13,5)\n= 10,001001 · 2³\n= 1,0001001 · 2⁴ (17,125)',
    },
    {
      term: 'Kombinatorischer Multiplizierer',
      def: 'Berechnet das $2n$ Bit breite Produkt als Summe von $n$ Teilprodukten: $x_i \\cdot y_j$ per UND-Gatter, Addition mit Halb- und Volladdierern. Aufwand wächst mit ca. $n^2$.',
    },
    {
      term: 'Sequentieller Multiplizierer',
      def: 'Multipliziert in $n$ Runden mit einem Addierer: Multiplikand im Register MR, Multiplikator in den unteren Bits des Produktregisters PR. Wenig Hardware, dafür mehrere Takte.',
      more: '- Start: MR = Multiplikand, PR unten = Multiplikator, Rest 0\n- $n$-mal:\n- wenn $PR_0 = 1$: MR zu den oberen Bits von PR addieren (Überlauf ins oberste Bit)\n- PR um eine Stelle nach rechts schieben, links 0 nachschieben\n- nach $n$ Runden steht das Produkt in PR',
      moreLabel: 'Ablauf',
    },
    {
      term: 'Zustandsautomat (Steuerung)',
      def: 'Steuert sequentielle Schaltungen: Ein Zustandsregister speichert Zustand und Rundenzähler; Folgezustand und Ausgangssignale kommen aus Multiplexer-Logik oder aus einem ROM.',
    },
    {
      term: 'Speicherorganisation',
      def: 'Beschreibt den Aufbau eines Speichers: wie breit die Datenworte sind und wie viele es gibt. Beispiel: 6 Adressbits, 9 Datenbits → $2^6 = 64$ Worte zu je 9 Bit.',
    },
    {
      term: 'Vorzeichenbehaftete Multiplikation',
      def: 'Negative Zahlen zuerst negieren, vorzeichenlos multiplizieren, Vorzeichen separat per XOR bestimmen und Ergebnis ggf. negieren. Alternative: Baugh-Wooley-Multiplizierer.',
    },
    {
      term: 'Gleitkomma-Multiplikation',
      def: 'Mantissen (mit „1,“) als Festkommazahlen multiplizieren, Exponenten addieren und einmal $K$ abziehen (sonst doppelt gezählt), dann renormalisieren.',
    },
    {
      term: 'Minuend − Subtrahend = Differenz',
      def: 'Bezeichnungen bei der Subtraktion. Ist eine Minuenden-Stelle zu klein, wird von der nächsthöheren Stelle geborgt.',
    },
    {
      term: 'Halbsubtrahierer',
      def: 'Subtrahiert $y_i$ von $x_i$: $d_i = x_i \\oplus y_i$, Borge-Bit $b_i = \\overline{x_i} \\wedge y_i$. Berücksichtigt kein Borgen der vorherigen Stelle.',
    },
    {
      term: 'Vollsubtrahierer',
      def: 'Berücksichtigt zusätzlich das Borge-Bit $b_{i-1}$: $$d_i = x_i \\oplus y_i \\oplus b_{i-1}$$ $$b_i = (\\overline{x_i} \\wedge y_i) \\vee \\big(\\overline{x_i \\oplus y_i} \\wedge b_{i-1}\\big)$$',
    },
    {
      term: 'Ripple-Borrow-Subtrahierer',
      def: '$n$ Vollsubtrahierer in Reihe berechnen $d = x - y$. Bei vorzeichenlosen Zahlen zeigt Borrow-Out einen Unterlauf an.',
    },
    {
      term: 'Division (Begriffe)',
      def: 'Dividend / Divisor = Quotient + Rest. Binär passt der Divisor in jeden Teildividenden entweder 0- oder 1-mal.',
      ex: '1101 : 0100 = 0011 Rest 1\n(13 : 4 = 3 Rest 1)',
    },
    {
      term: 'Sequentieller Dividierer',
      def: 'Dividend in der rechten Hälfte des $2n$ Bit Restregisters R, Divisor in D. $n$ Runden: R nach links schieben, $R_{oben} - D$ prüfen; wenn positiv: $R_0 = 1$ und Differenz übernehmen.',
      more: 'Am Ende:\n- **Quotient** in der rechten Hälfte $R_{n-1 \\ldots 0}$\n- **Rest** in der linken Hälfte $R_{2n-1 \\ldots n}$',
      moreLabel: 'Ergebnis',
    },

    { chapter: '4 Universalrechner' },
    {
      term: 'Universalrechner',
      def: 'Problemunabhängige Rechenschaltung: Die Lösung wird serialisiert, jede Rechenkomponente ist nur einmal vorhanden, Zwischenergebnisse liegen in Registern; die Verknüpfung entsteht durch die Befehle.',
    },
    {
      term: 'Multiplexer M3 / M4',
      def: 'Wählen die beiden Quell-Register aus, deren Inhalte an die Eingänge aller arithmetischen Schaltungen gelegt werden.',
    },
    {
      term: 'Multiplexer M2',
      def: 'Alle arithmetischen Schaltungen rechnen gleichzeitig; M2 wählt aus, welches Ergebnis weitergeleitet wird (also welche Operation ausgeführt wird).',
    },
    {
      term: 'Multiplexer M1',
      def: 'Wählt aus, ob ein Eingang (a, b, c) oder das berechnete Ergebnis in ein Register geschrieben wird.',
    },
    {
      term: 'Demultiplexer D',
      def: 'Leitet das Taktsignal nur an das Zielregister weiter – nur dieses übernimmt das Ergebnis, alle anderen behalten ihren Wert.',
    },
    {
      term: 'Taktinverter (Universalrechner)',
      def: 'Ergebnisse werden bei der fallenden clk-Flanke in die Register geschrieben – zeitlich maximal weit weg vom Befehlswechsel. So werden Setup- und Hold-Zeiten eingehalten.',
    },
    {
      term: 'Setup- und Hold-Zeit',
      def: 'Zeit unmittelbar vor (Setup) bzw. nach (Hold) der Taktflanke, in der sich die Daten am Register-Eingang nicht ändern dürfen.',
    },
    {
      term: 'Befehlswort',
      def: 'Im Befehlsspeicher (ROM) abgelegtes Datenwort, das alle Steuersignale (M1–M4, D, Konstante K) für einen Befehl enthält.',
      ex: 'K(10) D(3) M4(3) M3(3) M2(3) M1(2)\nxxxxxxxxxx 000 001 000 001 11\n= ADD R0,R0,R1',
    },
    {
      term: 'Befehlszähler (BZ)',
      def: 'Register mit der Adresse des gerade ausgeführten Befehls. Mit jeder steigenden Flanke erhöht der Addierer A1 ihn um 1; bei reset = 1 setzt Multiplexer M0 ihn auf 0.',
    },
    {
      term: 'Vorzeichenerweiterung',
      def: 'Das MSB einer kurzen Zahl wird auf die oberen Bits kopiert. So bleibt der Wert einer Zahl im Zweier-Komplement beim Erweitern der Wortbreite gleich.',
      ex: '8 Bit:  1100 0000         (−64)\n64 Bit: 0xFFFFFFFFFFFFFFC0 (−64)',
    },
    {
      term: 'Maximale Taktfrequenz',
      def: 'Kritisch ist die Zeit zwischen steigender und fallender Flanke: langsamste Operation + Setup-Zeit. Beispiel: $90\\,\\text{ns} + 10\\,\\text{ns} = 100\\,\\text{ns}$ → Periode $200\\,\\text{ns}$ → $5\\,\\text{MHz}$.',
    },
    {
      term: 'Assembler',
      def: 'Hardwarenahe, für Menschen lesbare Sprache – und zugleich das Programm, das sie über feste Abbildungsregeln in Befehlsworte übersetzt.',
    },
    {
      term: 'Assembler-Syntax (Universalrechner)',
      def: 'Erstes Wort: Befehl. Zweites Wort: Operanden, durch Komma getrennt – der erste ist immer der Zieloperand. Alles Weitere ist Kommentar.',
      ex: 'INPUT R1,0     // R1 ← a\nSET   R5,4     // R5 ← 4\nMUL   R5,R5,R1 // R5 ← 4·a',
    },
    {
      term: 'Befehle des Universalrechners',
      def: '`INPUT` (Eingang lesen), `SET` (10 Bit Konstante), `ADD`, `SUB`, `MUL`, `DIV`, `SQRT`.',
      ex: 'INPUT R0,0\nMUL   R0,R0,R0\nINPUT R1,1\nMUL   R1,R1,R1\nADD   R0,R0,R1\nSQRT  R0,R0   // Hypotenuse',
    },

    { chapter: '5 Befehlssätze und deren Klassifikation' },
    {
      term: 'Befehlssatz',
      def: 'Die Menge aller Befehle, die ein Prozessor versteht (engl. instruction set).',
    },
    {
      term: 'CISC',
      def: 'Complex Instruction Set: sehr mächtige Befehle mit variabler Befehlswortlänge (z. B. 1–16 Byte). Stammt aus Zeiten kleiner Speicher und fehlender Compiler.',
    },
    {
      term: 'RISC',
      def: 'Reduced Instruction Set: einfache Befehle, komplexe Operationen aus mehreren Befehlen. Einheitliche Befehlswortlänge → einfachere, schnellere Hardware.',
      ex: 'LDO $1,A\nLDO $2,B\nMUL $3,$1,$2\nSTO $3,C',
    },
    {
      term: 'Register-Speicher-Architektur',
      def: 'Operanden der Befehle können sowohl in Registern als auch im Speicher stehen.',
    },
    {
      term: 'Load-Store-Architektur',
      def: 'Register-Register-Architektur: Quell- und Zieloperanden müssen in Registern stehen. Speicherzugriffe nur über Lade- und Speicherbefehle.',
    },
    {
      term: 'Drei-Adress-Maschine',
      def: 'Zwei Quell- und ein Zieloperand werden explizit angegeben.',
      ex: 'ADD R0,R1,R2   // R0 ← R1 + R2',
    },
    {
      term: 'Zwei-Adress-Maschine',
      def: 'Ein Quelloperand ist gleichzeitig Zieloperand.',
      ex: 'ADD R0,R1      // R0 ← R0 + R1',
    },
    {
      term: 'Ein-Adress-Maschine',
      def: 'Akkumulator-Maschine: Nur ein Quelloperand wird angegeben; zweiter Quell- und Zieloperand ist immer der Akkumulator.',
      ex: 'ADD R1         // Akku ← Akku + R1',
    },
    {
      term: 'Null-Adress-Maschine',
      def: 'Stack-Maschine: Operanden werden implizit oben vom Stack genommen, das Ergebnis wieder auf den Stack gelegt.',
      ex: 'PUSH 3\nPUSH 4\nADD            // Stack: 7',
    },

    { chapter: '6 MMIX-Prozessor' },
    {
      term: 'MMIX',
      def: 'Lehr-Prozessormodell von Donald Knuth: RISC, Load-Store-Architektur, 256 Allzweck- und 32 Spezialregister, 64 Bit Wortbreite, $2^{64}$ Byte Adressraum, 32 Bit Befehlswort, Big Endian.',
    },
    {
      term: 'Allzweckregister',
      def: 'Register ohne festgelegten Zweck, für alle Befehle als Operand nutzbar. MMIX: `$0` … `$255`, je 64 Bit. `$1` meint den Inhalt von Register 1, `1` die Zahl 1.',
      ex: 'ADD $1,$2,$3   // $1 ← $2 + $3\nADD $1,$2,3    // $1 ← $2 + 3',
    },
    {
      term: 'Lokale, globale und marginale Register',
      def: 'Lokale Register von unten (`$0`, `$1`, …), globale von oben (`$255`, `$254`, …), dazwischen marginale. rL = Nummer des ersten freien lokalen, rG = des ersten globalen Registers.',
    },
    {
      term: 'Spezialregister',
      def: 'Register mit fester Aufgabe als Schnittstelle Hardware ↔ Software (z. B. Rundungsmodus, Interrupts). MMIX: 32 Stück (rA … rZ, rBB, rTT, …), Zugriff nur über GET und PUT.',
      ex: 'GET $0,rA      // rA → $0\nPUT rA,$0      // $0 → rA',
    },
    {
      term: 'rA (Arithmetisches Statusregister)',
      def: 'Enthält Interrupt-Enable- und Interrupt-Event-Bits (z. B. Division durch 0, Überlauf) sowie in Bit 17, 16 den Gleitkomma-Rundungsmodus.',
      more: 'Rundungsmodus (Bits 17, 16):\n- 00: nächster Wert (Standard)\n- 01: Richtung 0\n- 10: Richtung $+\\infty$\n- 11: Richtung $-\\infty$',
      moreLabel: 'Rundung',
      ex: 'GET    $0,rA\nANDNML $0,3    // Bits 17,16 löschen\nORML   $0,2    // auf 10 setzen\nPUT    rA,$0',
    },
    {
      term: 'rH, rD, rR',
      def: 'rH: obere 64 Bit eines 128 Bit Produkts (MULU). rD: obere 64 Bit des 128 Bit Dividenden (DIVU). rR: Rest einer Festkomma-Division.',
      ex: 'DIV quotient,dividend,divisor\nGET rest,rR',
    },
    {
      term: 'Byte, Wyde, Tetra, Octa',
      def: 'MMIX-Wortbreiten für Speicherzugriffe: Byte = 8 Bit, Wyde = 16 Bit, Tetra = 32 Bit, Octa = 64 Bit.',
    },
    {
      term: 'Alignment',
      def: 'Datenworte liegen nur an Adressen, die ein Vielfaches ihrer Größe in Byte sind: Wyde durch 2, Tetra durch 4, Octa durch 8 teilbar. So genügt ein einziger Speicherzugriff.',
      more: 'MMIX erzwingt das Alignment, indem die niederwertigsten Adressbits gelöscht werden:\n- $M_2[x]$ → Adresse `x & (-2)`\n- $M_4[x]$ → Adresse `x & (-4)`\n- $M_8[x]$ → Adresse `x & (-8)`\n\nOhne Alignment (z. B. Octa an durch 4 teilbarer Adresse) wären zwei Speicherzugriffe nötig.',
      moreLabel: 'Methode',
    },
    {
      term: 'Big Endian / Little Endian',
      def: 'Big Endian: Die Wortadresse zeigt auf das höchstwertige Byte (MMIX, MIPS, SPARC). Little Endian: auf das niederwertigste Byte (Intel x86).',
      ex: '0x01234567 an Adresse 0:\nBig:    01 23 45 67\nLittle: 67 45 23 01',
    },
    {
      term: 'MMIX-Speichersegmente',
      def: 'Text-Segment ab `0x0`, Daten-Segment ab `0x2000…`, Pool-Segment ab `0x4000…`, Stack-Segment ab `0x6000…`, Betriebssystem ab `0x8000…`.',
    },
    {
      term: 'Text-Segment',
      def: 'Enthält den ausführbaren Befehlscode (Befehle an durch 4 teilbaren Adressen). `0x00`–`0xFF`: Interrupt-Vektor-Tabelle, Programme ab `0x100`.',
    },
    {
      term: 'Interrupt-Vektor',
      def: 'Beschreibt für ein Interrupt-Ereignis, wohin der Prozessor verzweigt. Beim MMIX enthält er ausführbare Befehle, die in die jeweilige ISR springen.',
    },
    {
      term: 'TRAP',
      def: 'Befehl, um vom Benutzerprogramm zum Betriebssystem zu wechseln. `TRAP 0,Halt,0` beendet ein MMIX-Programm.',
      ex: 'TRAP 0,Halt,0',
    },
    {
      term: 'Daten-Segment',
      def: 'Ab `0x2000000000000000`: globale/statische Daten und Heap (wachsen nach oben). Der Stack beginnt am Ende (`0x3FFF…F8`) und wächst nach unten.',
    },
    {
      term: 'Pool-Segment',
      def: 'Datenaustausch zwischen Programm und Betriebssystem, z. B. Aufrufparameter: `$0` = argc, `$1` = Adresse einer nullterminierten Zeigerliste auf die Parameter.',
    },
    {
      term: 'Betriebssystem-Segment',
      def: 'Ab `0x8000…`: Am höchsten Adressbit erkennt man direkt, ob Code zum Kernel oder zum User Space gehört → Basis für ein zweistufiges Privilegien-System.',
    },
    {
      term: 'Virtueller Speicher',
      def: 'Programme verwenden virtuelle Adressen, die die Hardware (vom Betriebssystem gesteuert) in reale Adressen übersetzt. Vorteile: Adressraum unabhängig vom eingebauten RAM, Programme sind voneinander geschützt.',
    },
    {
      term: 'Aufbau eines MMIX-Programms',
      def: 'Vier durch Leerzeichen/Tabulatoren getrennte Spalten: Marke, Befehl, Operanden, Kommentar. Zeilen ohne Marke beginnen mit Leerzeichen.',
      ex: '        LOC  Data_Segment\n        GREG @\nA       OCTA 123456\na       IS   $1\n        LOC  #100\nMain    LDO  a,A\n        TRAP 0,Halt,0',
    },
    {
      term: 'Marke',
      def: 'Name für eine Speicherstelle (Befehl oder Daten) in der ersten Spalte. Bis auf `Main` (Programmstart) optional.',
    },
    {
      term: 'IS',
      def: 'Assembler-Anweisung: gibt einem Register einen Namen (reine Textersetzung vor dem Übersetzen, wie #define in C).',
      ex: 'a           IS $1\nSeitenlaenge IS $3',
    },
    {
      term: 'GREG',
      def: 'Loader-Befehl: reserviert das nächste freie globale Register (rG wird um 1 verringert) und initialisiert es optional – meist mit einer Basisadresse.',
      ex: 'SP GREG #4000000000000000\n   GREG @',
    },
    {
      term: 'LOC',
      def: 'Loader-Befehl („locate“): legt fest, ab welcher Adresse die folgenden Befehle bzw. Daten in den Speicher geschrieben werden.',
      ex: 'LOC Data_Segment\nLOC #100',
    },
    {
      term: '@ (MMIX)',
      def: '„The place where we are at“: die aktuelle Adresse des Loaders; bei Befehlen der Befehlszähler.',
    },
    {
      term: 'BYTE, WYDE, TETRA, OCTA',
      def: 'Loader-Befehle, die 8, 16, 32 bzw. 64 Bit im Speicher anlegen und optional initialisieren. Leer-Bytes werden fürs Alignment eingefügt, Codierung Big Endian.',
      ex: '       LOC  Data_Segment\n       GREG @\nVektor BYTE 1,2,3\nN      OCTA 4',
    },
    {
      term: 'Hexadezimalzahlen im MMIX-Assembler',
      def: 'Werden mit führender Raute `#` statt `0x` geschrieben.',
      ex: 'SETL $1,#BBBB\nLOC  #100',
    },
    {
      term: 'MMIX-Übersetzungsprozess',
      def: 'Quelldatei (`.mms`) → Assembler `mmixal` → Objektdatei (`.mmo`) → Simulator. Der Assembler löst Namen/Marken auf, übersetzt Befehle binär und erstellt die Symboltabelle.',
    },
    {
      term: 'Symboltabelle',
      def: 'Liste von (Name → Adresse)-Paaren in der Objektdatei; darüber findet z. B. der Loader die Startadresse `Main`.',
    },
    {
      term: 'MMIX-Befehlswort',
      def: '32 Bit, vier Bytes: Opcode (Bits 31–24), X (23–16, meist Ziel), Y (15–8) und Z (7–0, Quellen).',
      ex: 'OP | X  | Y  | Z\nSUB $5,$6,7  →  0x25 05 06 07',
    },
    {
      term: 'Opcode',
      def: '8 Bit Zahl, die festlegt, welcher Befehl ausgeführt wird. Wird aus der Opcode-Tabelle abgelesen.',
    },
    {
      term: 'Direktoperand',
      def: 'Operand, der direkt im Befehlswort steht (immediate): Z (8 Bit), Y (8 Bit), YZ (16 Bit) oder XYZ (24 Bit). Immediate-Variante hat den Opcode + 1.',
      ex: 'ADD $1,$2,$3   // Opcode 0x20\nADD $1,$2,3    // Opcode 0x21',
    },
    {
      term: 'Ausführungszeit (ν, μ)',
      def: '$\\nu$ = 1 Takt, $\\mu$ = Takte für einen Speicherzugriff. Die meisten MMIX-Befehle brauchen $1\\nu$; am langsamsten ist DIV ($60\\nu$).',
    },
    {
      term: 'ADD / ADDU',
      def: 'Festkomma-Addition. ADD: vorzeichenbehaftet mit Überlauferkennung. ADDU: vorzeichenlos, ohne Überlauf. Direktoperand $0 \\ldots 255$.',
      ex: 'ADD  $1,$2,$3\nADDU $1,$2,8',
    },
    {
      term: 'SUB / NEG',
      def: 'SUB: `$X ← $Y − $Z`. NEG: `$X ← Y − $Z` mit Y als Direktoperand – damit z. B. $5 - 3$ in einer Zeile.',
      ex: 'SUB $1,$2,$3\nNEG $0,5,3     // $0 ← 5 − 3\nNEG $1,0,$1    // $1 ← −$1',
    },
    {
      term: 'MUL / MULU',
      def: 'MUL: 64 Bit · 64 Bit → 64 Bit, vorzeichenbehaftet. MULU: vorzeichenlos mit 128 Bit Ergebnis, obere 64 Bit in rH.',
      ex: 'MUL  $1,$2,$3\nMULU $1,$2,$3  // obere Hälfte: rH',
    },
    {
      term: 'DIV / DIVU',
      def: 'DIV: vorzeichenbehaftet, Quotient in `$X`, Rest in rR. DIVU: vorzeichenlos, 128 Bit Dividend aus rD und `$Y`.',
      ex: 'DIV $2,$0,$1\nGET $3,rR      // Rest',
    },
    {
      term: 'SET- und INC-Befehle',
      def: 'Schreiben 16 Bit Direktoperanden in einen der vier Abschnitte eines Registers: H (63–48), MH, ML, L (15–0). SET löscht den Rest, INC addiert.',
      ex: 'SETL  $1,#BBBB\nINCML $1,#AAAA\nINCMH $1,#5678\nINCH  $1,#1234\n// $1 = #12345678AAAABBBB',
    },
    {
      term: 'FLOT / FIX',
      def: 'Typumwandlung: FLOT wandelt eine Festkommazahl in eine Gleitkommazahl, FIX eine Gleitkommazahl in eine Festkommazahl (Rundung nach rA).',
      ex: 'FLOT $0,15     // $0 = 15,0\nFIX  $1,$1',
    },
    {
      term: 'Gleitkomma-Befehle',
      def: 'FADD, FSUB, FMUL, FDIV, FSQRT rechnen auf 64 Bit IEEE-754-Zahlen. Operanden ggf. vorher mit FLOT umwandeln.',
      ex: 'SETL a,31415\nFLOT a,a\nSET  buf,10000\nFLOT buf,buf\nFDIV a,a,buf   // a = 3,1415',
    },
    {
      term: 'Schiebebefehle',
      def: 'SL/SLU: nach links schieben, rechts mit 0 auffüllen (SL mit Überlauf). SR: nach rechts, mit dem Vorzeichenbit auffüllen. SRU: nach rechts, mit 0 auffüllen.',
      ex: 'SRU s,fpn,63   // Vorzeichen\nSLU e,fpn,1\nSRU e,e,53     // Exponent',
    },
    {
      term: 'Bitweise logische Befehle',
      def: 'AND, OR, XOR, ANDN ($Y \\wedge \\neg Z$), ORN, NAND, NOR, NXOR, sowie Wyde-Varianten wie ORML, ANDNML für 16 Bit Direktoperanden.',
    },
    {
      term: 'Bits löschen und setzen',
      def: 'Löschen mit UND-artigen Befehlen (AND, ANDN), setzen mit ODER-Befehlen (OR, ORML …), invertieren mit XOR.',
      ex: 'ANDNML a,#20   // Bit 21 löschen\nORML   a,#10   // Bit 20 setzen\nNEG    b,0,1\nXOR    a,a,b   // alle Bits invertieren',
    },
    {
      term: 'Ladebefehle (LDB, LDW, LDT, LDO)',
      def: 'Laden 8, 16, 32 bzw. 64 Bit vom Speicher in `$X`. Adresse = Basisadresse `$Y` + Offset `$Z` oder Z.',
      ex: 'LDO $1,$254,8\nLDB $0,A',
    },
    {
      term: 'Vorzeichenbehaftet vs. vorzeichenlos laden',
      def: 'LDB/LDW/LDT füllen die oberen Registerbits mit dem MSB auf (Vorzeichenerweiterung), LDBU/LDWU/LDTU mit 0. Opcode vorzeichenlos = vorzeichenbehaftet + 2.',
      ex: '−64 als Byte = 0xC0\nLDB  → 0xFFFFFFFFFFFFFFC0\nLDBU → 0x00000000000000C0 (192)',
    },
    {
      term: 'Basisadresse + Offset',
      def: 'Das Befehlswort hat keinen Platz für 64 Bit Adressen: Y adressiert ein Register mit der Basisadresse (meist per GREG angelegt), Z bzw. `$Z` liefert den Offset.',
      ex: '     GREG @         // $254 = Basis\nA    OCTA 5\n     LDO  $1,A      // = LDO $1,$254,0',
    },
    {
      term: 'Speicherbefehle (STB, STW, STT, STO)',
      def: 'Schreiben Bits 7–0, 15–0, 31–0 bzw. 63–0 von `$X` an Adresse `$Y + $Z`. Hier ist X die Quelle! Vorzeichenbehaftete Varianten melden einen Überlauf.',
      ex: 'STO $1,:SP,0\nSTB $1,Data\nSTT $1,$254,#A',
    },
    {
      term: 'STCO',
      def: 'Store Constant Octa: schreibt einen 8 Bit Direktoperanden aus dem Befehlswort als Octa in den Speicher.',
      ex: 'STCO 0,$254,0',
    },
    {
      term: 'LDA',
      def: 'Lädt eine Adresse (nicht den Inhalt) in ein Register. Der Assembler übersetzt LDA in ADDU Basisregister + Offset.',
      ex: 'LDA $0,A   // → ADDU $0,$254,0',
    },
    {
      term: 'GETA',
      def: 'Lädt eine Adresse relativ zum Befehlszähler: `$X ← @ + 4·s(YZ)`.',
      ex: 'GETA $0,Main',
    },
    {
      term: 'JMP',
      def: 'Unbedingte Verzweigung, relativ: $@ \\leftarrow @ + 4 \\cdot s(XYZ)$. XYZ = Anzahl Befehle vor/zurück (24 Bit, Zweier-Komplement).',
      ex: 'JMP Start   // 3 zurück → 0xF1FFFFFD',
    },
    {
      term: 'Bedingte Verzweigung',
      def: 'Springt nach $@ + 4 \\cdot s(YZ)$, wenn die Bedingung für `$X` erfüllt ist, sonst weiter bei $@ + 4$: BZ (= 0), BNZ, BN (< 0), BNN, BP (> 0), BNP, BEV (gerade), BOD (ungerade).',
      ex: '// if (a == 0) a = 1;\n      BNZ a,End\n      SET a,1\nEnd   …',
    },
    {
      term: 'Probable Branch (PBZ, PBNZ, …)',
      def: 'Gleiche Funktion wie BZ usw., aber andere Ausführungszeit: P-Variante 1 Takt bei Sprung, 3 ohne. Normale Variante 1 Takt ohne Sprung, 3 mit. P-Variante für wahrscheinliche Sprünge (z. B. Schleifen).',
      ex: '      SET  $1,100\nLoop  SUB  $1,$1,1\n      PBNZ $1,Loop',
    },
    {
      term: 'GO',
      def: 'Absoluter Sprung an `$Y + $Z`, speichert dabei die Rücksprungadresse $@ + 4$ in `$X`. Wird für Funktionsaufrufe verwendet.',
      ex: 'GO $0,:Fkt    // Aufruf\nGO $0,$0,0    // Rücksprung',
    },
    {
      term: 'Rücksprungadresse',
      def: 'Adresse des Befehls nach dem Funktionsaufruf ($@ + 4$). GO legt sie in `$X` ab.',
    },
    {
      term: 'Befehlsregister',
      def: 'Register, in dem das gerade auszuführende Befehlswort steht, nachdem es über den Befehlszähler aus dem Befehlsspeicher geladen wurde.',
    },
    {
      term: 'Registerblock',
      def: 'Fasst die 256 Allzweckregister zusammen; gibt die durch X, Y, Z adressierten Register aus und übernimmt `$X` bei steigender Taktflanke. Y und Z nur lesend.',
    },
    {
      term: 'Funktion (MMIX)',
      def: 'Zusammengehörige Befehle, die über Funktionsaufrufe von beliebigen Stellen genutzt werden. Programme werden übersichtlicher und kürzer.',
    },
    {
      term: 'PREFIX',
      def: 'Assembler-Befehl für Namensräume: stellt allen folgenden Namen eine Zeichenkette voran. `PREFIX :` beendet den Namensraum, `:Name` greift auf globale Namen zu.',
      ex: 'PREFIX Fkt:\n:Fkt  SUB :SP,:SP,8\n      …\nPREFIX :',
    },
    {
      term: 'Call by Value / Call by Reference',
      def: 'Wert-Übergabe: Kopie des Werts – Änderungen wirken nicht auf das Original. Referenz-Übergabe: Kopie der Adresse – die Funktion kann den Wert beim Aufrufer ändern.',
    },
    {
      term: 'Aufrufkonvention',
      def: 'Legt fest, wie Parameter übergeben werden (Register/Stack, Reihenfolge), wer den Stack bereinigt und wie der Rückgabewert zurückkommt. Architekturabhängig.',
    },
    {
      term: 'Stack',
      def: 'Speicherbereich für Parameter, Rücksprungadressen, gesicherte Register und lokale Variablen. Beim MMIX am Ende des Daten-Segments, wächst Richtung kleinerer Adressen.',
    },
    {
      term: 'Stackpointer (SP)',
      def: 'Register mit der Adresse des obersten Stack-Elements. MMIX: globales Register, mit `#4000000000000000` (Beginn des Pool-Segments) initialisiert.',
      ex: 'SP GREG #4000000000000000',
    },
    {
      term: 'Parameter auf den Stack legen',
      def: 'Stackpointer um $n \\cdot 8$ verringern, Parameter mit STO über den Stackpointer ablegen, dann per GO in die Funktion springen.',
      ex: 'SUB :SP,:SP,2*8\nSTO $3,:SP,0\nSTO $4,:SP,1*8\nGO  $0,:Str',
    },
    {
      term: 'Register sichern (Funktion)',
      def: 'Die aufgerufene Funktion sichert alle selbst verwendeten Register auf den Stack, liest dann die Parameter und stellt die Register vor dem Rücksprung wieder her.',
      ex: 'SUB :SP,:SP,3*8\nSTO $0,:SP,0\nSTO $1,:SP,1*8\nSTO $2,:SP,2*8\nLDO $1,:SP,3*8   // Parameter',
    },
    {
      term: 'Rückgabewert und Rücksprung',
      def: 'Ergebnis an die Stelle des Parameters mit der höchsten Adresse schreiben, Register wiederherstellen, SP so anpassen, dass er auf das Ergebnis zeigt, mit GO zurückspringen.',
      ex: 'STO $1,:SP,4*8\nLDO $0,:SP,0\nLDO $1,:SP,1*8\nLDO $2,:SP,2*8\nADD :SP,:SP,4*8\nGO  $0,$0,0',
    },
    {
      term: 'Rückgabewert abholen',
      def: 'Der Aufrufer liest das Ergebnis über den Stackpointer und setzt ihn wieder auf den Stand vor dem Aufruf.',
      ex: 'LDO $1,:SP,0\nADD :SP,:SP,8',
    },
    {
      term: 'Rücksprungadresse auf dem Stack',
      def: 'Ruft eine Funktion selbst eine Funktion auf, würde GO das Register mit der Rücksprungadresse überschreiben – deshalb wird sie vorher auf den Stack gesichert.',
    },

    { chapter: '7 Pipelining' },
    {
      term: 'Pipelining',
      def: 'Der Datenpfad wird durch Pipelining-Register in Stufen getrennt, sodass mehrere Befehle gleichzeitig in verschiedenen Stufen bearbeitet werden. Erhöht den Durchsatz, nicht die Ausführungszeit eines Befehls.',
    },
    {
      term: 'Pipeline-Stufen (MMIX)',
      def: 'BH: Befehl holen · BD: Befehl decodieren, Operanden bereitstellen · AF: Ausführen (ALU) · SP: Speicherzugriff · ES: Ergebnis schreiben.',
    },
    {
      term: 'Durchsatz einer Pipeline',
      def: 'Bei $n$ Stufen bis zu $n$-mal so viele Befehle pro Zeit. Voraussetzung: Alle Stufen dauern möglichst gleich lang (die langsamste bestimmt den Takt).',
    },
    {
      term: 'Pipeline-Füll-Diagramm',
      def: 'Zeigt für jeden Takt, welcher Befehl in welcher Stufe ist. Bei 5 Stufen ist die Pipeline ab Takt 5 gefüllt; danach wird pro Takt ein Befehl fertig.',
    },
    {
      term: 'Datenkonflikt',
      def: 'Ein Befehl braucht ein Ergebnis, das ein vorheriger Befehl noch nicht in den Registerblock geschrieben hat.',
      ex: 'ADD $1,$2,$3\nMUL $3,$2,$1   // $1 noch alt!',
    },
    {
      term: 'NOP / SWYM',
      def: 'Befehl, der nichts tut („no operation“); beim MMIX SWYM. Kann zwischen abhängige Befehle eingefügt werden, senkt aber den Durchsatz.',
      ex: 'ADD  $1,$2,$3\nSWYM\nSWYM\nSWYM\nMUL  $3,$2,$1',
    },
    {
      term: 'Befehlsumstellung',
      def: 'Unabhängige Befehle, die ohnehin ausgeführt werden müssen, zwischen abhängige Befehle schieben – statt NOPs.',
      ex: 'ADD $1,$2,$3\nSUB $4,$5,1\nSRU $5,$5,2\nSL  $6,$6,2\nMUL $3,$2,$1',
    },
    {
      term: 'Stall',
      def: 'Der Prozessor erkennt den Konflikt selbst und hält Pipeline-Stufen an; die angehaltenen Stufen schreiben nichts. Senkt den Durchsatz.',
    },
    {
      term: 'Forwarding',
      def: 'Zusätzliche Leitungen, die noch nicht in den Registerblock geschriebene Ergebnisse (aus ALU oder Datenspeicher) direkt an andere Stufen weiterleiten.',
      ex: 'ADD $1,$2,$3\nSUB $3,$2,$1   // $1 per Forwarding',
    },
    {
      term: 'Load-Use-Konflikt',
      def: 'Nach einem Ladebefehl ist der Wert erst nach der SP-Phase verfügbar – auch mit Forwarding muss der folgende Befehl einen Takt warten (Stall), außer man stellt Befehle um.',
      ex: 'LDO $1,$254,0\nSUB $3,$2,$1   // Stall nötig',
    },
    {
      term: 'Strukturkonflikt',
      def: 'Zwei Befehle brauchen gleichzeitig dieselbe Hardware-Ressource, z. B. den Adresseingang X des Registerblocks (ES-Phase schreibt, Speicherbefehl in BD liest). Lösung: Forwarding oder Stall.',
    },
    {
      term: 'Steuerungskonflikt',
      def: 'Bei bedingten Sprüngen steht erst in der AF-Phase fest, ob gesprungen wird. Falsch geladene Befehle müssen verworfen werden (Pipeline-Flush).',
    },
    {
      term: 'Pipeline-Flush',
      def: 'Leeren der Pipeline: Fälschlicherweise geladene Befehle werden verworfen und die richtigen nachgeladen.',
    },
    {
      term: 'Sprungvorhersage über P-Varianten',
      def: 'Normale Sprungbefehle: Es wird angenommen, dass nicht gesprungen wird. P-Varianten: Es wird angenommen, dass gesprungen wird – die Befehle am Sprungziel kommen in die Pipeline.',
      ex: '// do { … } while (a >= 0);\nStart …\n      SUB  a,a,1\n      PBNN a,Start',
    },

    { chapter: '8 Cache' },
    {
      term: 'Warum ist der Arbeitsspeicher langsam?',
      def: 'Er liegt außerhalb des Prozessors (lange Leitungen, parasitäre Kapazitäten), wird über ein Busprotokoll angesprochen, besteht aus langsamem DRAM und ist sehr groß (aufwendige Adressierung).',
    },
    {
      term: 'Örtliche Lokalität',
      def: 'Nach einem Zugriff auf eine Speicherstelle wird sehr wahrscheinlich auch auf benachbarte Stellen zugegriffen (sequentielle Befehle, Arrays, Stack).',
    },
    {
      term: 'Zeitliche Lokalität',
      def: 'Auf eine Speicherstelle wird sehr wahrscheinlich in kurzer Zeit erneut zugegriffen (Variablen, Schleifenzähler, Befehle in Schleifen).',
    },
    {
      term: 'Cache',
      def: 'Kleiner, schneller Pufferspeicher auf dem Prozessor-Die, der Daten aus dem großen, langsamen Speicher blockweise zwischenspeichert.',
    },
    {
      term: 'Prefetching',
      def: 'Befehle/Daten werden „auf Verdacht“ schon vorab in den Cache geladen, bevor ein Lade- oder Speicherbefehl sie anfordert – nutzt die örtliche Lokalität.',
    },
    {
      term: 'Speicherhierarchie',
      def: 'Register → L1-, L2-, L3-Cache → Arbeitsspeicher → Massenspeicher. Je weiter oben, desto schneller und kleiner.',
    },
    {
      term: 'Cache-Rahmen (Cache-Zeile)',
      def: 'Block fester Größe, in dem der Cache Daten ablegt (engl. frame, cache line). Es werden immer komplette Blöcke gepuffert.',
    },
    {
      term: 'Cache-Hit',
      def: 'Das adressierte Datenwort ist bereits im Cache. Hit-Time: Zugriffszeit in diesem Fall. Hit-Rate: mittlere Wahrscheinlichkeit eines Treffers.',
    },
    {
      term: 'Cache-Miss',
      def: 'Das Datenwort ist nicht im Cache und muss erst aus dem langsameren Speicher geladen werden. Miss-Time: Zeit bis es verfügbar ist. Miss-Rate $= 1 - $ Hit-Rate.',
    },
    {
      term: 'Mittlere Speicherzugriffszeit',
      def: '$$t = h \\cdot t_{\\text{hit}} + (1 - h) \\cdot t_{\\text{miss}}$$ Beispiel: $h = 0{,}9$, $1\\,\\text{ns}$ / $50\\,\\text{ns}$ → $5{,}9\\,\\text{ns}$.',
    },
    {
      term: 'Verdrängung',
      def: 'Ist der Cache voll, muss ein Rahmen (ggf. nach dem Zurückschreiben) Platz machen, bevor neue Daten geladen werden. Welcher, entscheidet die Verdrängungsstrategie.',
    },
    {
      term: 'LRU',
      def: 'Least Recently Used: Der am längsten nicht verwendete Rahmen wird verdrängt. Aufwendig zu implementieren.',
    },
    {
      term: 'LFU',
      def: 'Least Frequently Used: Der am seltensten benutzte Rahmen wird verdrängt.',
    },
    {
      term: 'FIFO (Cache)',
      def: 'First In First Out: Rahmen werden in der Reihenfolge verdrängt, in der sie in den Cache geschrieben wurden.',
    },
    {
      term: 'Random (Verdrängung)',
      def: 'Zufällige Auswahl. Kann Vorteile haben, z. B. bei zyklischem Zugriff auf mehr Daten als in den Cache passen (LRU hätte dort Hit-Rate 0).',
    },
    {
      term: 'Optimale Verdrängung',
      def: 'Verdrängt die Daten, die am spätesten wieder gebraucht werden. In der Praxis nicht umsetzbar (Zukunft unbekannt), dient als Referenz.',
    },
    {
      term: 'Write-Through',
      def: 'Bei einem Schreibzugriff wird das Datenwort im Cache und gleichzeitig in den tieferen Ebenen aktualisiert (gepuffert, im Hintergrund). Andere Kerne sehen Änderungen.',
    },
    {
      term: 'Write-Back',
      def: 'Das Datenwort wird nur im Cache aktualisiert; zurückgeschrieben wird erst beim Verdrängen des Blocks (erkennbar am Dirty-Bit).',
    },
    {
      term: 'Write-Allocate',
      def: 'Schreibzugriff auf ein Datenwort, das nicht im Cache liegt: Der Block wird in den Cache geladen und dort beschrieben.',
    },
    {
      term: 'Write-No-Allocate (Write-Around)',
      def: 'Schreibzugriff auf ein nicht gecachtes Datenwort: Es wird nicht in den Cache geladen – sinnvoll, wenn es nicht mehr gebraucht wird.',
    },
    {
      term: 'Direkt-abgebildeter Cache',
      def: 'Jede Speicheradresse hat genau einen festen Cache-Rahmen. Adresse = Schlüssel $k$ | Rahmen-Nr. $f$ | Byte-Auswahl $b$. Sehr schnell, aber gleiche Rahmen-Nummern verdrängen sich ständig.',
      ex: 'Adresse: [ k Bit | f Bit | b Bit ]\nRahmengröße = 2^b Byte\nAnzahl Rahmen = 2^f',
    },
    {
      term: 'Tag-RAM',
      def: 'Speichert pro Cache-Rahmen den Schlüssel-Teil der Adresse der dort liegenden Daten. Beim Zugriff wird das Tag mit dem Schlüssel verglichen ($k$ 1-Bit-Vergleicher).',
    },
    {
      term: 'Valid-Bit',
      def: 'Zeigt an, ob im Cache-Rahmen gültige Daten stehen. Zu Beginn 0, beim Laden eines Rahmens 1.',
    },
    {
      term: 'Dirty-Bit',
      def: 'Bei Write-Back: zeigt an, ob die Daten im Rahmen geändert wurden und beim Verdrängen zurückgeschrieben werden müssen.',
    },
    {
      term: 'Voll-assoziativer Cache',
      def: 'Ein Speicherblock darf in jedem Cache-Rahmen liegen; Adresse = Schlüssel | Byte-Auswahl. Wenig Verdrängung, aber der Schlüssel muss mit allen Tags verglichen werden (langsam, viele Vergleicher).',
      ex: '32 kB, 256 Byte Rahmen:\n128 Rahmen · 56 Bit = 7168 Vergleicher',
    },
    {
      term: 'Set-assoziativer Cache',
      def: 'Kompromiss: Adresse = Schlüssel $k$ | Set-Nr. $s$ | Byte-Auswahl $b$. Jedes Set hat $a$ Rahmen (Assoziativität); es werden nur $a$ Tags verglichen ($a \\cdot k$ Vergleicher).',
      ex: '8-fach, 1 MB, 32 Byte Rahmen:\nb = 5, Sets = 2^12 → s = 12\nk = 64 − 12 − 5 = 47',
    },
  ],
});
