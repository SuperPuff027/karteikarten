/* Lernset Analysis 1 (Skript Kapitel 1 Grundlagen, Kapitel 2 Folgen und Reihen).
 * Format wie in decks.js: def (Stichpunkte pro Ding), more, calc (Rechenweg), img.
 */
window.DECKS = window.DECKS || [];
window.DECKS.push({
  id: 'analysis-1',
  name: 'Analysis1',
  color: 'rose',
  description: 'Kapitel 1–2: Mengen, Induktion, Zahlbereiche, Ungleichungen, Supremum, Summen, Binomialformel, Trigonometrie, komplexe Zahlen, Folgen, Grenzwerte, Reihen.',
  cards: [
    { chapter: '1.1 Mengen' },
    {
      term: 'Menge',
      def: 'Zusammenfassung bestimmter, wohlunterschiedener Objekte (Elemente).\n- $b \\in A$: $b$ ist Element von $A$\n- $g \\notin A$: $g$ ist kein Element von $A$',
    },
    {
      term: 'Leere Menge',
      def: '$\\emptyset$: die Menge, die kein Element enthält.',
    },
    {
      term: 'Teilmenge',
      def: '$B \\subset A$, wenn jedes Element von $B$ auch in $A$ liegt: $a \\in B \\Rightarrow a \\in A$.',
    },
    {
      term: 'Gleichheit von Mengen',
      def: '$A = B$, wenn $A \\subset B$ **und** $B \\subset A$.\n- die Reihenfolge der Elemente spielt keine Rolle',
      calc: 'Mengengleichheit beweisen:\n- „$\\subset$“: beliebiges $x \\in A$ nehmen und $x \\in B$ folgern\n- „$\\supset$“: beliebiges $x \\in B$ nehmen und $x \\in A$ folgern\n- beide Inklusionen zusammen ergeben $A = B$',
    },
    {
      term: 'Mengenoperationen',
      def: '- **Durchschnitt** $A \\cap B = \\{x \\mid x \\in A \\text{ und } x \\in B\\}$\n- **Vereinigung** $A \\cup B = \\{x \\mid x \\in A \\text{ oder } x \\in B\\}$\n- **Komplement** $A \\setminus B = \\{x \\mid x \\in A \\text{ und } x \\notin B\\}$',
    },

    {
      term: 'Mengenoperationen',
      img: 'schaltbilder/an-mengenoperationen.svg',
      def: 'Durchschnitt, Vereinigung und Komplement als Mengendiagramm.',
    },

    {
      term: 'Rechenregeln für Mengen',
      def: '- **leere Menge:** $\\emptyset \\subset A$ für jede Menge $A$\n- **assoziativ:** $(A \\cap B) \\cap C = A \\cap (B \\cap C)$, ebenso für $\\cup$\n- **distributiv:** $A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)$\n- **distributiv:** $A \\cup (B \\cap C) = (A \\cup B) \\cap (A \\cup C)$\n- **De Morgan:** $A \\setminus (B \\cup C) = (A \\setminus B) \\cap (A \\setminus C)$',
    },
    {
      term: 'Element vs. Teilmenge (Potenzmenge)',
      def: 'Potenzmenge $\\mathcal{P}(A) = \\{M \\mid M \\subset A\\}$ – die Menge aller Teilmengen.\n- $a \\in A$, aber $\\{a\\} \\subset A$ und $\\{a\\} \\in \\mathcal{P}(A)$\n- $a \\notin \\mathcal{P}(A)$ (ein Element ist keine Teilmenge)\n- $\\emptyset \\in \\mathcal{P}(A)$ und $\\emptyset \\subset \\mathcal{P}(A)$\n- $A \\in \\mathcal{P}(A)$',
    },

    { chapter: '1.2 Natürliche Zahlen und Induktion' },
    {
      term: 'Axiom',
      def: 'Unmittelbar einleuchtendes Prinzip, das nicht bewiesen wird. Alle anderen Aussagen einer Theorie werden darauf zurückgeführt.',
    },
    {
      term: 'Peano-Axiome',
      def: '- es gibt ein erstes Element $1 \\in \\mathbb{N}$\n- jedes $n$ hat genau einen Nachfolger $n + 1$\n- jede Zahl ist Nachfolger höchstens einer Zahl\n- 1 ist kein Nachfolger\n- Induktionsaxiom: $M \\subset \\mathbb{N}$ mit $1 \\in M$ und $n \\in M \\Rightarrow n + 1 \\in M$ ist ganz $\\mathbb{N}$',
    },
    {
      term: 'Rekursive Definition',
      def: 'Man definiert etwas für $n = 1$ und führt den Fall $n + 1$ auf $n$ zurück.\n\nBeispiel Fakultät: $1! = 1$, $\\;(n + 1)! = n! \\cdot (n + 1)$.',
    },
    {
      term: 'Vollständige Induktion',
      def: 'Beweisverfahren für Aussagen über alle natürlichen Zahlen, beruht auf dem Induktionsaxiom.',
      calc: '- **Induktionsanfang:** Aussage für $n = 1$ (bzw. $n = 0$) prüfen\n- **Induktionsannahme:** Aussage gilt für ein $n$\n- **Induktionsschritt:** linke Seite für $n + 1$ hinschreiben, auf den Fall $n$ zurückführen, Annahme einsetzen, umformen bis zur rechten Seite für $n + 1$',
    },
    {
      term: 'Gaußsche Summenformel',
      def: '$$\\sum_{i=1}^{n} i = 1 + 2 + \\dots + n = \\frac{n(n + 1)}{2}$$',
    },
    {
      term: 'Geometrische Summenformel',
      def: 'Für $q \\neq 1$: $$\\sum_{i=0}^{n} q^i = \\frac{1 - q^{n+1}}{1 - q}$$ Für $q = 1$ ist die Summe $n + 1$.',
    },
    {
      term: 'Ordnung auf ℕ',
      def: '- $m < n$, wenn es ein $k \\in \\mathbb{N}$ mit $n = m + k$ gibt\n- $m \\le n$, wenn $m < n$ oder $m = n$\n- Transitivität: $n \\le m$ und $m \\le k \\Rightarrow n \\le k$',
    },
    {
      term: 'ℕ₀',
      def: '$\\mathbb{N}_0 = \\{0\\} \\cup \\mathbb{N} = \\{0, 1, 2, \\ldots\\}$; Induktion beginnt dann bei $n = 0$.',
    },

    {
      term: 'Nützliche Summenformeln',
      def: '- $\\sum_{i=1}^{n} (2i - 1) = n^2$ (Summe der ersten $n$ ungeraden Zahlen)\n- $\\sum_{k=1}^{n} k \\cdot k! = (n + 1)! - 1$\n- $\\sum_{k=0}^{n} \\binom{n}{k} = 2^n$\n- Fibonacci: $\\sum_{i=1}^{n} F_i^2 = F_n F_{n+1}$',
    },
    {
      term: 'Anzahl der Anordnungen',
      def: '$n$ verschiedene Elemente lassen sich auf $n! = 1 \\cdot 2 \\cdots n$ Arten anordnen.',
    },
    {
      term: 'Teilbarkeit per Induktion',
      def: 'Beweis, dass ein Ausdruck $A(n)$ für alle $n$ durch $m$ teilbar ist, z. B. $4^{2n+1} + 3^{n+2}$ durch 13.',
      calc: '- **Anfang:** $A(1)$ ausrechnen und durch $m$ teilen\n- **Schritt:** $A(n + 1)$ so umformen, dass $A(n)$ auftaucht: $A(n + 1) = c \\cdot A(n) + (\\text{Rest})$\n- zeigen, dass der Rest ein Vielfaches von $m$ ist\n- $A(n)$ teilbar (Annahme) + Rest teilbar → $A(n + 1)$ teilbar\n\n$4^{2n+3} + 3^{n+3} = 16 \\cdot (4^{2n+1} + 3^{n+2}) - 13 \\cdot 3^{n+2}$',
    },
    {
      term: 'Induktion bei zweistufiger Rekursion',
      def: 'Für Folgen wie $x_n = -3x_{n-1} - 2x_{n-2}$ hängt jedes Glied von **zwei** Vorgängern ab.',
      calc: '- **Anfang:** Formel für $n = 0$ **und** $n = 1$ prüfen\n- **Annahme:** Formel gilt für $n - 1$ und $n$\n- **Schritt:** $x_{n+1}$ per Rekursion durch $x_n$, $x_{n-1}$ ausdrücken, beide Formeln einsetzen, vereinfachen',
    },
    {
      term: 'Typischer Induktionsfehler',
      def: 'Der Induktionsschritt muss für **jedes** $n$ funktionieren – auch für den kleinsten.\n- Beispiel „alle Tiere sind Elefanten“: von $n = 1$ auf $n = 2$ überlappen „die ersten $n$“ und „die letzten $n$“ Tiere nicht\n- daher bricht die Kette schon bei $1 \\to 2$',
    },

    { chapter: '1.3–1.4 Ganze und rationale Zahlen' },
    {
      term: 'Ganze Zahlen',
      def: '$\\mathbb{Z} = \\mathbb{N}_0 \\cup \\{-n \\mid n \\in \\mathbb{N}\\}$.\n- Motivation: $a + x = b$ soll immer lösbar sein\n- Lösung $x = b - a$',
    },
    {
      term: 'Rationale Zahlen',
      def: '$\\mathbb{Q} = \\{\\frac{m}{n} \\mid m \\in \\mathbb{Z}, n \\in \\mathbb{N}\\}$, wobei $\\frac{m_1}{n_1} = \\frac{m_2}{n_2} \\Leftrightarrow m_1 n_2 = m_2 n_1$.\n- Motivation: $a \\cdot x = b$ für $a \\neq 0$ lösbar\n- Darstellung $\\frac{m}{n}$ ist nicht eindeutig',
    },
    {
      term: 'Dezimaldarstellung rationaler Zahlen',
      def: 'Jede rationale Zahl ist …\n- ein endlicher Dezimalbruch (z. B. $\\frac{9}{8} = 1{,}125$) oder\n- eine periodische Dezimalzahl (z. B. $\\frac{12}{33} = 0{,}\\overline{36}$)',
      calc: 'Periodische Dezimalzahl in Bruch umwandeln:\n- Vorperiode abspalten: $0{,}25\\overline{54} = 0{,}25 + \\frac{1}{100} \\cdot 0{,}\\overline{54}$\n- Periode: $0{,}\\overline{b_1 \\ldots b_k} = \\frac{b_1 \\ldots b_k}{99 \\ldots 9}$ ($k$ Neunen)\n- zusammenfassen und kürzen\n\n$0{,}\\overline{21} = \\frac{21}{99} = \\frac{7}{33}$',
    },
    {
      term: '√2 ist irrational',
      def: 'Es gibt keine teilerfremden $m, n$ mit $\\sqrt{2} = \\frac{m}{n}$ (Widerspruchsbeweis).',
      calc: 'Widerspruchsbeweis:\n- annehmen: $\\sqrt{2} = \\frac{m}{n}$ mit $m, n$ teilerfremd\n- quadrieren: $m^2 = 2n^2$ → $m^2$ gerade → $m$ gerade, $m = 2p$\n- einsetzen: $4p^2 = 2n^2$ → $n^2 = 2p^2$ → $n$ gerade\n- $m$ und $n$ beide gerade → Widerspruch zur Teilerfremdheit',
    },
    {
      term: 'Widerspruchsbeweis',
      def: '- annehmen, das Gegenteil der Aussage gilt\n- daraus eine Aussage folgern, die sicher falsch ist\n- also stimmt die ursprüngliche Aussage',
    },

    {
      term: 'Irrationalität von Wurzeln',
      def: 'Für jede Primzahl $p$ ist $\\sqrt{p} \\notin \\mathbb{Q}$ (z. B. $\\sqrt{7}$).\n- Beweis wie bei $\\sqrt{2}$: aus $m^2 = p\\,n^2$ folgt $p \\mid m$, dann $p \\mid n$ → Widerspruch zur Teilerfremdheit',
    },
    {
      term: 'Summen rationaler und irrationaler Zahlen',
      def: '- rational + rational = **rational**\n- rational + irrational = **irrational** (Widerspruchsbeweis)\n- irrational + irrational = **kann rational sein**: $\\sqrt{2} + (-\\sqrt{2}) = 0$',
    },
    {
      term: 'Irrationalität über Primfaktoren',
      def: 'Gleichungen wie $10^x = 7$ haben keine rationale Lösung.\n- Annahme $x = \\frac{p}{q}$ → $10^p = 7^q$\n- links Primfaktoren 2 und 5, rechts nur 7 → Widerspruch (eindeutige Primfaktorzerlegung)',
    },

    { chapter: '1.5 Reelle Zahlen' },
    {
      term: 'Reelle Zahlen',
      def: 'Alle (auch nicht periodischen) Dezimalzahlen: $\\mathbb{R}$. Zahlengerade ohne Lücken (Vollständigkeitsaxiom).\n- irrationale Zahlen: $\\mathbb{R} \\setminus \\mathbb{Q}$',
    },
    {
      term: 'n-te Wurzel',
      def: 'Für $a \\ge 0$: $\\sqrt[n]{a}$ ist die eindeutige Lösung $x \\ge 0$ von $x^n = a$.\n- für ungerades $n$ und $a < 0$: $\\sqrt[n]{a} = -\\sqrt[n]{-a}$',
    },
    {
      term: 'Betrag',
      def: '$$|a| = \\sqrt{a^2} = \\begin{cases} a, & a \\ge 0 \\\\ -a, & a < 0 \\end{cases}$$\n- $|a - b|$ = Abstand von $a$ und $b$\n- $|ab| = |a|\\,|b|$\n- Dreiecksungleichung: $|a + b| \\le |a| + |b|$',
    },
    {
      term: 'Regeln für Ungleichungen',
      def: '- genau eins: $x < y$, $x = y$ oder $y < x$\n- Transitivität: $x < y$, $y < z \\Rightarrow x < z$\n- $x < y \\Rightarrow x + z < y + z$\n- $x < y$, $z > 0 \\Rightarrow xz < yz$ (bei $z < 0$ dreht sich das Zeichen um!)',
    },
    {
      term: 'Intervalle',
      def: '- **abgeschlossen** $[a, b]$: $a \\le x \\le b$\n- **offen** $(a, b)$: $a < x < b$\n- **halboffen** $[a, b)$, $(a, b]$\n- **unbeschränkt** $[a, +\\infty)$, $(-\\infty, a)$, …',
    },
    {
      term: 'Lineare Ungleichung',
      def: 'Ungleichung wie $3x - 7 \\le x + 2$.',
      calc: '- auf beiden Seiten dasselbe addieren, bis $x$ allein steht\n- durch den Faktor vor $x$ teilen (negativ → Zeichen umdrehen)\n- Lösungsmenge als Intervall angeben\n\n$3x - 7 \\le x + 2 \\Leftrightarrow 2x \\le 9 \\Leftrightarrow x \\le 4{,}5$ → $(-\\infty, 4{,}5]$',
    },
    {
      term: 'Quadratische Ungleichung',
      def: 'Ungleichung wie $x^2 - 4x + 3 > 0$.',
      calc: '- Nullstellen bestimmen, in Linearfaktoren zerlegen: $(x - 1)(x - 3) > 0$\n- Produkt > 0 ⇔ beide Faktoren positiv **oder** beide negativ\n- Fälle auswerten: $x > 3$ oder $x < 1$\n- Lösungsmenge $(-\\infty, 1) \\cup (3, \\infty)$',
    },
    {
      term: 'Bruchungleichung',
      def: 'Ungleichung mit $x$ im Nenner, z. B. $\\frac{1}{x} \\le \\frac{1}{x + 2}$. Nicht einfach mit dem Nenner multiplizieren (Vorzeichen unbekannt)!',
      calc: '- alles auf eine Seite bringen\n- auf den Hauptnenner bringen\n- Vorzeichen von Zähler und Nenner untersuchen (Nenner $\\neq 0$!)\n- wie quadratische Ungleichung lösen\n\nBeispiel: $\\frac{2}{x(x + 2)} \\le 0 \\Leftrightarrow x(x + 2) < 0$ → $(-2, 0)$',
    },
    {
      term: 'Betragsungleichung',
      def: 'Ungleichung mit Beträgen, z. B. $|x - 1| + \\frac{1}{|x - 1|} \\le |x + 1|$.',
      calc: '- Definitionslücken ausschließen\n- mit positiven Beträgen multiplizieren (erlaubt, da $> 0$)\n- Fallunterscheidung: Ausdruck im Betrag $\\ge 0$ bzw. $< 0$\n- jeden Fall lösen, mit seiner Bedingung schneiden\n- Lösungsmengen der Fälle vereinigen',
    },
    {
      term: 'Beschränkte Menge',
      def: '- **nach oben beschränkt:** es gibt $b$ mit $x \\le b$ für alle $x \\in M$ ($b$: obere Schranke)\n- **nach unten beschränkt:** es gibt $a$ mit $x \\ge a$ für alle $x \\in M$ ($a$: untere Schranke)\n- **beschränkt:** beides',
    },
    {
      term: 'Supremum und Maximum',
      def: '- **Supremum** $\\sup M$: kleinste obere Schranke (existiert für jede nach oben beschränkte Menge)\n- **Maximum:** $\\max M = \\sup M$, falls $\\sup M \\in M$',
    },
    {
      term: 'Infimum und Minimum',
      def: '- **Infimum** $\\inf M$: größte untere Schranke\n- **Minimum:** $\\min M = \\inf M$, falls $\\inf M \\in M$',
      calc: 'Sup/Inf bestimmen:\n- Kandidaten raten (Intervallgrenzen, Grenzwerte)\n- prüfen, dass es eine Schranke ist\n- zeigen, dass keine kleinere obere (größere untere) Schranke existiert, z. B. per Widerspruch\n- liegt der Wert in $M$ → auch Max bzw. Min\n\n$M = \\{\\frac{1}{n}\\}$: $\\max = \\sup = 1$, $\\inf = 0$, kein Minimum',
    },

    {
      term: 'Umgekehrte Dreiecksungleichung',
      def: '$$\\big||x| - |y|\\big| \\le |x - y|$$\n- falsch ist dagegen $|x - y| \\le |x| - |y|$\n- und im Allgemeinen $|x - y| \\neq \\big||x| - |y|\\big|$',
    },
    {
      term: 'Quadrat-Trick für Ungleichungen',
      def: 'Viele Ungleichungen folgen aus $(a - b)^2 \\ge 0$:\n- $a^2 + b^2 \\ge 2ab$\n- $(a + b)^2 \\ge 4ab$, also $\\frac{a + b}{2} \\ge \\sqrt{ab}$ für $a, b \\ge 0$\n- Gleichheit genau für $a = b$\n\nBeispiel Widerstände: $R_h = R_1 + R_2 \\ge 4 R_p$.',
    },
    {
      term: 'Gleichung mit mehreren Beträgen',
      def: 'Gleichung wie $|x + 1| + |5x - 2| = 6$.',
      calc: '- Nullstellen aller Betragsinhalte bestimmen ($x = -1$, $x = \\frac25$)\n- Zahlengerade in Bereiche zwischen diesen Stellen teilen\n- in jedem Bereich die Beträge ohne Betrag (mit passendem Vorzeichen) schreiben\n- Gleichung lösen, Lösung nur behalten, wenn sie im Bereich liegt',
    },

    { chapter: '1.6 Summen, Produkte, Binomialformel' },
    {
      term: 'Summen- und Produktzeichen',
      def: '- $\\sum_{k=m}^{n} a_k = a_m + a_{m+1} + \\dots + a_n$\n- $\\prod_{k=m}^{n} a_k = a_m \\cdot a_{m+1} \\cdots a_n$\n\n$k$ heißt laufender Index.',
    },
    {
      term: 'Rechenregeln für Summen',
      def: '- **linear:** $\\sum (c a_k + d b_k) = c \\sum a_k + d \\sum b_k$\n- **Indexumbenennung:** $\\sum_k a_k = \\sum_i a_i$\n- **Indexverschiebung:** $\\sum_{k=m}^{n} a_k = \\sum_{i=0}^{n-m} a_{m+i}$\n- **Produkt:** $\\left(\\sum a_k\\right)\\left(\\sum b_j\\right) = \\sum_k \\sum_j a_k b_j$',
    },
    {
      term: 'Spezielle Summen und Produkte',
      def: '- $\\sum_{k=1}^{n} c = nc$, $\\;\\prod_{k=1}^{n} c = c^n$\n- $\\prod_{k=1}^{n} k = n!$, $\\;0! = 1$\n- $\\prod_{k=0}^{n} q^k = q^{n(n+1)/2}$',
    },
    {
      term: 'Binomialkoeffizient',
      def: '$$\\binom{n}{k} = \\frac{n!}{k!\\,(n - k)!}$$\n- Symmetrie: $\\binom{n}{k} = \\binom{n}{n - k}$\n- Rekursion: $\\binom{n+1}{k} = \\binom{n}{k} + \\binom{n}{k-1}$, $\\;\\binom{n}{0} = \\binom{n}{n} = 1$',
      calc: '- **direkt:** $\\frac{n!}{k!(n-k)!}$ – gemeinsame Faktoren vorher kürzen\n- **Pascalsches Dreieck:** Ränder 1, jede Zahl = Summe der beiden darüber; Zeile $n$, Position $k$\n\n$\\binom{4}{2} = \\frac{4 \\cdot 3}{2 \\cdot 1} = 6$',
    },
    {
      term: 'Binomische Formel',
      def: '$$(a + b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^k b^{n-k}$$ $n + 1$ Summanden, Exponentensumme jeweils $n$.',
      calc: '- Zeile $n$ des Pascalschen Dreiecks als Koeffizienten aufschreiben\n- Exponent von $a$ steigt von 0 bis $n$, von $b$ fällt er von $n$ bis 0\n- Summanden addieren\n\n$(a + b)^4 = a^4 + 4a^3 b + 6a^2 b^2 + 4ab^3 + b^4$',
    },

    { chapter: '1.7 Trigonometrische Funktionen' },
    {
      term: 'Bogenmaß',
      def: 'Winkel als Bogenlänge auf dem Einheitskreis; voller Kreis $= 2\\pi$.',
      calc: 'Grad → Bogenmaß: $x = \\frac{\\pi}{180} \\alpha$\n\nBogenmaß → Grad: $\\alpha = \\frac{180}{\\pi} x$\n\n$90° = \\frac{\\pi}{2}$, $60° = \\frac{\\pi}{3}$',
    },
    {
      term: 'Sinus und Kosinus',
      def: 'Der Punkt auf dem Einheitskreis zur Bogenlänge $x$ hat die Koordinaten $(\\cos x, \\sin x)$.\n- $-1 \\le \\sin x, \\cos x \\le 1$\n- $\\cos$ gerade, $\\sin$ ungerade\n- $\\cos^2 x + \\sin^2 x = 1$\n- $2\\pi$-periodisch',
    },
    {
      term: 'Wichtige Sinus-/Kosinuswerte',
      def: '- $x = 0$: $\\cos = 1$, $\\sin = 0$\n- $x = \\frac{\\pi}{6}$: $\\cos = \\frac{\\sqrt{3}}{2}$, $\\sin = \\frac{1}{2}$\n- $x = \\frac{\\pi}{4}$: $\\cos = \\sin = \\frac{\\sqrt{2}}{2}$\n- $x = \\frac{\\pi}{3}$: $\\cos = \\frac{1}{2}$, $\\sin = \\frac{\\sqrt{3}}{2}$\n- $x = \\frac{\\pi}{2}$: $\\cos = 0$, $\\sin = 1$',
    },
    {
      term: 'Nullstellen von Sinus und Kosinus',
      def: '- $\\sin x = 0 \\Leftrightarrow x = \\pi k$, $k \\in \\mathbb{Z}$\n- $\\cos x = 0 \\Leftrightarrow x = \\frac{\\pi}{2} + \\pi k$, $k \\in \\mathbb{Z}$',
    },
    {
      term: 'Additionstheorem',
      def: '- $\\cos(x + y) = \\cos x \\cos y - \\sin x \\sin y$\n- $\\sin(x + y) = \\sin x \\cos y + \\cos x \\sin y$\n\nFolgt z. B.: $\\sin(x + \\frac{\\pi}{2}) = \\cos x$.',
    },
    {
      term: 'Tangens und Kotangens',
      def: '- $\\tan x = \\frac{\\sin x}{\\cos x}$ für $x \\neq \\frac{\\pi}{2} + \\pi k$\n- $\\cot x = \\frac{\\cos x}{\\sin x}$ für $x \\neq \\pi k$\n\nBeide ungerade und $\\pi$-periodisch.',
    },
    {
      term: 'Arcussinus und Arcuscosinus',
      def: '- $\\arcsin: [-1, 1] \\to [-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$, $\\;y = \\arcsin x \\Leftrightarrow \\sin y = x$\n- $\\arccos: [-1, 1] \\to [0, \\pi]$, $\\;y = \\arccos x \\Leftrightarrow \\cos y = x$',
    },
    {
      term: 'Trigonometrische Gleichung',
      def: 'Gleichung wie $\\sin x = a$ oder $\\cos x = a$ mit $|a| \\le 1$ – unendlich viele Lösungen wegen der Periodizität.',
      calc: '- **$\\sin x = a$:** $x = \\arcsin a + 2\\pi k$ und $x = \\pi - \\arcsin a + 2\\pi k$\n- **$\\cos x = a$:** $x = \\pm\\arccos a + 2\\pi k$\n\n$\\sin x = \\frac12$: $x = \\frac{\\pi}{6} + 2\\pi k$ oder $x = \\frac{5\\pi}{6} + 2\\pi k$',
    },

    {
      term: 'Sinus und Kosinus',
      img: 'schaltbilder/an-einheitskreis.svg',
      def: 'Einheitskreis: der Punkt zur Bogenlänge $x$ hat die Koordinaten $(\\cos x, \\sin x)$.',
    },

    {
      term: 'Doppelwinkel und Potenzreduktion',
      def: '- $\\sin(2x) = 2\\sin x \\cos x$\n- $\\cos(2x) = \\cos^2 x - \\sin^2 x = \\cos^4 x - \\sin^4 x$\n- $\\sin^2 x = \\frac{1 - \\cos(2x)}{2}$\n- $\\cos^2 x = \\frac{1 + \\cos(2x)}{2}$',
    },
    {
      term: 'Produkt in Summe (Sinus/Kosinus)',
      def: '$$\\sin x \\cos y = \\tfrac{1}{2}\\sin(x - y) + \\tfrac{1}{2}\\sin(x + y)$$',
    },
    {
      term: 'Additionstheorem Tangens',
      def: '- $\\tan(x + y) = \\frac{\\tan x + \\tan y}{1 - \\tan x \\tan y}$\n- $\\tan x + \\tan y = \\frac{\\sin(x + y)}{\\cos x \\cos y}$',
    },
    {
      term: 'Halbwinkelformeln mit Tangens',
      def: 'Mit $t = \\tan\\frac{x}{2}$ (für $x \\in (-\\pi, \\pi)$):\n- $\\cos x = \\frac{1 - t^2}{1 + t^2}$\n- $\\sin x = \\frac{2t}{1 + t^2}$',
    },
    {
      term: 'Verkettung mit Arcusfunktionen',
      def: '- $\\cos(\\arcsin x) = \\sqrt{1 - x^2}$ für $x \\in [-1, 1]$\n- $\\sin(\\arctan x) = \\frac{x}{\\sqrt{1 + x^2}}$ für $x \\in \\mathbb{R}$\n\nIdee: $\\sin^2 + \\cos^2 = 1$ und das Vorzeichen über den Wertebereich der Arcusfunktion festlegen.',
    },
    {
      term: 'Trigonometrische Gleichung per Substitution',
      def: 'Gleichung wie $5\\sin x - 2\\cos^2 x = 1$.',
      calc: '- mit $\\cos^2 x = 1 - \\sin^2 x$ alles durch **eine** Funktion ausdrücken\n- substituieren $s = \\sin x$ → quadratische Gleichung $2s^2 + 5s - 3 = 0$\n- nur Lösungen mit $|s| \\le 1$ behalten ($s = \\frac12$)\n- zurück: $x = \\arcsin s + 2\\pi k$ und $x = \\pi - \\arcsin s + 2\\pi k$',
    },
    {
      term: 'Trigonometrische Ungleichung',
      def: 'Ungleichung wie $\\sin(2x) \\le \\sqrt{3}\\sin x$.',
      calc: '- Doppelwinkel einsetzen: $2\\sin x\\cos x - \\sqrt3 \\sin x \\le 0$\n- ausklammern: $\\sin x\\,(2\\cos x - \\sqrt3) \\le 0$\n- Vorzeichen beider Faktoren auf einer Periode $[0, 2\\pi)$ untersuchen\n- Lösungsintervalle mit $+ 2\\pi k$ periodisch fortsetzen',
    },

    { chapter: '1.8 Komplexe Zahlen' },
    {
      term: 'Komplexe Zahlen',
      def: '$\\mathbb{C} = \\{a + bi \\mid a, b \\in \\mathbb{R}\\}$ mit der imaginären Einheit $i$, $i^2 = -1$.\n- Motivation: $x^2 + 1 = 0$ hat keine reelle Lösung\n- $\\mathbb{R} \\subset \\mathbb{C}$\n- keine Ordnung $<$ möglich',
    },
    {
      term: 'Rechnen mit komplexen Zahlen',
      def: '- **Addition:** $(a + bi) + (c + di) = (a + c) + (b + d)i$\n- **Multiplikation:** $(a + bi)(c + di) = (ac - bd) + (ad + bc)i$',
      calc: 'Multiplizieren: ausmultiplizieren wie Klammern, $i^2 = -1$ einsetzen, Real- und Imaginärteil sammeln.\n\n$(1 + 2i)(3 - i) = 3 - i + 6i - 2i^2 = 5 + 5i$',
    },
    {
      term: 'Realteil, Imaginärteil, Konjugation, Betrag',
      def: 'Für $z = a + bi$:\n- $\\text{Re}(z) = a$\n- $\\text{Im}(z) = b$\n- $\\bar z = a - bi$\n- $|z| = \\sqrt{a^2 + b^2}$, $\\;z \\bar z = |z|^2$',
    },
    {
      term: 'Division komplexer Zahlen',
      def: '$$\\frac{z}{w} = \\frac{z \\bar w}{|w|^2} = \\frac{ac + bd}{c^2 + d^2} + \\frac{bc - ad}{c^2 + d^2}\\,i$$',
      calc: '- Zähler und Nenner mit $\\bar w$ (konjugierter Nenner) erweitern\n- Nenner wird reell: $w \\bar w = c^2 + d^2$\n- Zähler ausmultiplizieren\n- in Real- und Imaginärteil aufteilen',
    },
    {
      term: 'Fundamentalsatz der Algebra',
      def: 'Jedes nicht konstante Polynom hat in $\\mathbb{C}$ eine Nullstelle.\n- Polynom $n$-ten Grades zerfällt in $n$ Linearfaktoren: $p(x) = a_n \\prod_{k=1}^{n}(x - x_k)$\n- $l$-fache Nullstelle: kommt $l$-mal vor',
    },
    {
      term: 'Quadratische Gleichung',
      def: '$ax^2 + bx + c = 0$ hat in $\\mathbb{C}$ immer zwei (evtl. gleiche) Lösungen; Diskriminante $D = b^2 - 4ac$.',
      calc: '- $D = b^2 - 4ac$ berechnen\n- $D > 0$: $x_{1,2} = \\frac{-b \\pm \\sqrt{D}}{2a}$ (zwei reelle)\n- $D = 0$: $x = -\\frac{b}{2a}$ (eine reelle)\n- $D < 0$: $x_{1,2} = \\frac{-b \\pm i\\sqrt{-D}}{2a}$ (zwei komplex konjugierte)',
    },
    {
      term: 'Polardarstellung',
      def: '$z = r(\\cos\\varphi + i\\sin\\varphi) = r e^{i\\varphi}$\n- $r = |z|$: Betrag\n- $\\varphi = \\arg z \\in (-\\pi, \\pi]$: Argument (Winkel zur positiven reellen Achse)',
      calc: '- **kartesisch → polar:** $r = \\sqrt{x^2 + y^2}$; $\\varphi = \\arccos\\frac{x}{r}$ für $y \\ge 0$, $\\varphi = -\\arccos\\frac{x}{r}$ für $y < 0$\n- **polar → kartesisch:** $x = r\\cos\\varphi$, $y = r\\sin\\varphi$\n\n$1 + i = \\sqrt{2}\\,e^{i\\pi/4}$',
    },
    {
      term: 'Multiplikation in Polardarstellung',
      def: '- Beträge multiplizieren\n- Argumente addieren\n\n$z w = |z||w|\\,e^{i(\\varphi + \\psi)}$; $\\;\\frac{1}{z} = \\frac{1}{r} e^{-i\\varphi}$',
    },
    {
      term: 'Potenz einer komplexen Zahl',
      def: '$$\\left(r(\\cos\\varphi + i\\sin\\varphi)\\right)^n = r^n(\\cos(n\\varphi) + i\\sin(n\\varphi))$$',
      calc: '- in Polardarstellung umwandeln ($r$, $\\varphi$)\n- $r^n$ berechnen und $n\\varphi$ bilden\n- $\\cos(n\\varphi)$ und $\\sin(n\\varphi)$ auswerten\n\n$(1 + i)^{12} = (\\sqrt{2})^{12}(\\cos 3\\pi + i\\sin 3\\pi) = -64$',
    },

    {
      term: 'Polardarstellung',
      img: 'schaltbilder/an-polardarstellung.svg',
      def: '$z = x + iy$ mit Betrag $r = |z|$ und Argument $\\varphi$.',
    },

    {
      term: 'Einheitswurzeln',
      def: 'Die Lösungen von $z^n = 1$ in $\\mathbb{C}$: $$z_k = e^{2\\pi i k/n}, \\quad k = 0, 1, \\ldots, n - 1$$\n- liegen als regelmäßiges $n$-Eck auf dem Einheitskreis\n- ihre Summe ist 0 (für $n \\ge 2$), z. B. Drehstrom: $1 + e^{2\\pi i/3} + e^{4\\pi i/3} = 0$',
    },
    {
      term: 'Komplexe Gleichung mit Re und Im',
      def: 'Gleichung wie $\\text{Re}(iz) + i\\,\\text{Im}(z) = \\bar z + 2i$.',
      calc: '- $z = x + iy$ einsetzen\n- beide Seiten in der Form $a + bi$ schreiben\n- Realteile gleichsetzen und Imaginärteile gleichsetzen → zwei reelle Gleichungen\n- nach $x$ und $y$ lösen',
    },
    {
      term: 'Komplexe Bruchgleichung',
      def: 'Gleichung mit $z$ im Nenner, z. B. mit Nenner $z^2 - (1 + i)z + i$.',
      calc: '- Nenner faktorisieren: $z^2 - (1 + i)z + i = (z - 1)(z - i)$\n- Definitionslücken notieren ($z \\neq 1$, $z \\neq i$)\n- mit dem Hauptnenner multiplizieren\n- entstehende Gleichung lösen, Lücken ausschließen',
    },
    {
      term: 'Betrag eines Quotienten',
      def: '$$\\left|\\frac{z}{w}\\right| = \\frac{|z|}{|w|}, \\qquad |z w| = |z|\\,|w|$$ Spart bei Ungleichungen wie $\\left|\\frac{a + 3i}{i - 1}\\right| > 1$ das Ausrechnen des Bruchs.',
    },

    { chapter: '2.1 Folgen und Grenzwert' },
    {
      term: 'Zahlenfolge',
      def: 'Abbildung $\\mathbb{N}_0 \\to \\mathbb{R}$, $n \\mapsto a_n$.\n- **explizit:** $a_n = f(n)$, z. B. $a_n = n^2$\n- **rekursiv:** $a_{n+1}$ aus Vorgängern, z. B. $a_0 = 1$, $a_{n+1} = a_n + 4$',
    },
    {
      term: 'Beschränkte Folge',
      def: 'Es gibt $K$ mit $|a_n| \\le K$ für alle $n$.\n- arithmetische Folge $a_{n+1} = a_n + d$: beschränkt nur für $d = 0$\n- geometrische Folge $a_{n+1} = q a_n$: beschränkt für $|q| \\le 1$',
    },
    {
      term: 'ε-Umgebung',
      def: 'Intervall $(a - \\varepsilon, a + \\varepsilon)$ um $a$ mit $\\varepsilon > 0$.',
    },
    {
      term: 'Grenzwert einer Folge',
      def: '$\\lim_{n\\to\\infty} a_n = a$, wenn es zu jedem $\\varepsilon > 0$ ein $N_\\varepsilon$ gibt mit $|a_n - a| < \\varepsilon$ für alle $n > N_\\varepsilon$ – ab einem Index liegen alle Glieder in jeder $\\varepsilon$-Umgebung.',
      calc: 'Grenzwert mit der Definition nachweisen:\n- $\\varepsilon > 0$ beliebig vorgeben\n- $|a_n - a| < \\varepsilon$ nach $n$ auflösen\n- $N_\\varepsilon$ so wählen, dass es für $n > N_\\varepsilon$ gilt\n\n$a_n = \\frac{2}{n}$: $N_\\varepsilon > \\frac{2}{\\varepsilon}$ → $|a_n| < \\varepsilon$',
    },
    {
      term: 'Nullfolge',
      def: 'Folge mit Grenzwert 0.',
    },
    {
      term: 'Divergenz',
      def: '- **Konvergenz gegen $+\\infty$:** zu jedem $K \\in \\mathbb{R}$ gibt es $N_K$ mit $a_n > K$ für alle $n > N_K$ (analog $-\\infty$), z. B. $n^2$, $2^n$\n- **divergent:** die Folge besitzt keinen Grenzwert, z. B. $(-1)^n$\n- $\\pm\\infty$ sind keine Zahlen: solche Folgen sind unbeschränkt; unbeschränkte Folgen müssen aber nicht gegen $\\pm\\infty$ gehen',
    },
    {
      term: 'Eindeutigkeit und Beschränktheit',
      def: '- der Grenzwert einer konvergenten Folge ist eindeutig\n- jede konvergente Folge ist beschränkt\n- aber: nicht jede beschränkte Folge konvergiert ($(-1)^n$)',
    },

    {
      term: 'Grenzwert einer Folge',
      img: 'schaltbilder/an-epsilon-umgebung.svg',
      def: 'Ab dem Index $N_\\varepsilon$ liegen alle Folgenglieder im Streifen $(a - \\varepsilon, a + \\varepsilon)$.',
    },

    // Kriterien für Konvergenz, Divergenz und Grenzwert – Vorderseite: Name, Rückseite: Aussage + Anwendung
    {
      term: 'ε-N-Kriterium (Nachweis per Definition)',
      def: '**Aussage:** $a_n \\to a$, wenn es zu jedem $\\varepsilon > 0$ ein $N_\\varepsilon$ gibt mit $|a_n - a| < \\varepsilon$ für alle $n > N_\\varepsilon$.\n\n**Anwendung:** nur, wenn der Grenzwert $a$ schon vermutet wird.\n- $|a_n - a|$ vereinfachen bzw. nach oben abschätzen\n- $< \\varepsilon$ nach $n$ auflösen → $N_\\varepsilon$ angeben\n\n$a_n = \\frac{n+1}{n}$: $|a_n - 1| = \\frac1n < \\varepsilon$ für $n > \\frac{1}{\\varepsilon}$ → $a_n \\to 1$',
    },
    {
      term: 'Grenzwertsätze (Rechenregeln) anwenden',
      def: '**Aussage:** Konvergieren $a_n \\to a$ und $b_n \\to b$, dann auch $a_n \\pm b_n$, $a_n b_n$, $\\frac{a_n}{b_n}$ ($b \\neq 0$), $|a_n|$, $\\sqrt{a_n}$ ($a_n \\ge 0$) – gegen $a \\pm b$, $ab$, $\\frac ab$, $|a|$, $\\sqrt a$.\n\n**Anwendung:**\n- Folge in bekannte Bausteine zerlegen: $\\frac1n \\to 0$, $q^n \\to 0$ ($|q| < 1$), $\\sqrt[n]{n} \\to 1$\n- bei Brüchen die höchste Potenz im Nenner ausklammern\n- Voraussetzung: **beide** Teilfolgen konvergieren; bei $\\infty - \\infty$, $0 \\cdot \\infty$, $\\frac{\\infty}{\\infty}$ erst umformen\n\n$\\frac{2n^2 + 1}{n^2 - n} = \\frac{2 + 1/n^2}{1 - 1/n} \\to 2$',
    },
    {
      term: 'Sandwich-Kriterium (Einschließungskriterium)',
      def: '**Aussage:** Gilt $a_n \\le c_n \\le b_n$ ab einem Index und $a_n \\to L$, $b_n \\to L$, dann $c_n \\to L$.\n\n**Anwendung:** wenn $c_n$ zu kompliziert für die Grenzwertsätze ist (Wurzeln, $\\sin$, Summen).\n- $c_n$ nach unten und oben durch einfachere Folgen abschätzen\n- beide Schranken müssen **denselben** Grenzwert haben\n\n$c_n = \\sqrt[n]{2^n + 3^n}$: $3 \\le c_n \\le \\sqrt[n]{2 \\cdot 3^n} = 3\\sqrt[n]{2} \\to 3$ → $c_n \\to 3$',
    },
    {
      term: 'Vergleich mit einer Nullfolge',
      def: '**Aussage:** Gilt $|a_n - a| \\le C\\, b_n$ ab einem Index mit Konstante $C > 0$ und $b_n \\to 0$, dann $a_n \\to a$.\n\n**Anwendung:** einseitige Form des Sandwich-Kriteriums – nur der Abstand zum vermuteten Grenzwert muss nach oben abgeschätzt werden.\n\n$\\left|\\frac{n}{n+1} - 1\\right| = \\frac{1}{n+1} \\le \\frac1n \\to 0$ → $\\frac{n}{n+1} \\to 1$',
    },
    {
      term: 'Beschränkt mal Nullfolge (Kriterium)',
      def: '**Aussage:** Ist $(a_n)$ beschränkt mit $|a_n| \\le K$ und $b_n \\to 0$, dann $a_n b_n \\to 0$, denn $|a_n b_n| \\le K |b_n|$.\n\n**Anwendung:** bei Faktoren wie $\\sin(n)$, $\\cos(n)$, $(-1)^n$, die selbst nicht konvergieren.\n\n$\\frac{\\sin n}{n} = \\sin n \\cdot \\frac1n \\to 0$',
    },
    {
      term: 'Bestimmte Divergenz durch Minorante',
      def: '**Aussage:** Gilt $a_n \\ge b_n$ ab einem Index und $b_n \\to +\\infty$, dann $a_n \\to +\\infty$ (analog mit $\\le$ für $-\\infty$).\n\n**Anwendung:** $a_n$ nach unten durch eine einfachere, unbeschränkt wachsende Folge abschätzen (oft mit Bernoulli).\n\n$\\frac{n^2 + 1}{n} \\ge n \\to +\\infty$',
    },
    {
      term: 'Bernoulli-Abschätzung',
      def: '**Aussage:** $(1 + x)^n \\ge 1 + nx$ für $x \\ge -1$, $n \\in \\mathbb{N}$.\n\n**Anwendung:** Potenzen $(1 + x)^n$ nach unten durch einen in $n$ linearen Ausdruck abschätzen – dann Minorante oder Sandwich.\n- $q^n \\to \\infty$ für $q > 1$: $q = 1 + h$, $q^n \\ge 1 + nh \\to \\infty$\n- $\\sqrt[n]{\\alpha} \\to 1$ für $\\alpha > 1$: $\\sqrt[n]{\\alpha} = 1 + h_n$ mit $h_n \\ge 0$, dann $\\alpha \\ge 1 + n h_n$, also $0 \\le h_n \\le \\frac{\\alpha - 1}{n} \\to 0$',
    },
    {
      term: 'Monotoniekriterium anwenden',
      def: '**Aussage:** Monoton steigend und nach oben beschränkt ⇒ konvergent (gegen das Supremum); analog fallend und nach unten beschränkt. Monoton und unbeschränkt ⇒ bestimmt divergent.\n\n**Anwendung:** wenn der Grenzwert unbekannt ist (rekursive Folgen, Summen).\n- Monotonie: $a_{n+1} - a_n$ oder $\\frac{a_{n+1}}{a_n}$ untersuchen\n- Schranke angeben, oft per Induktion\n- liefert nur Konvergenz, nicht den Wert\n\n$a_n = \\sum_{k=1}^{n} \\frac{1}{k^2}$: steigend, $a_n \\le 1 + \\sum_{k=2}^{n} \\frac{1}{k(k-1)} = 2 - \\frac1n < 2$ → konvergent',
    },
    {
      term: 'Fixpunktmethode (rekursive Folgen)',
      def: '**Aussage:** Ist $a_{n+1} = f(a_n)$ mit stetigem $f$ und $a_n \\to a$, dann gilt $a = f(a)$.\n\n**Anwendung:**\n- **zuerst** Konvergenz zeigen (meist Monotoniekriterium)\n- dann $a_n$ und $a_{n+1}$ durch $a$ ersetzen und $a = f(a)$ lösen\n- unpassende Lösungen ausschließen (Vorzeichen, Schranken)\n\n$a_0 = 0$, $a_{n+1} = \\sqrt{2 + a_n}$: steigend, $a_n < 2$ → konvergent; $a = \\sqrt{2 + a}$ → $a^2 - a - 2 = 0$ → $a = 2$ (da $a \\ge 0$)',
    },
    {
      term: 'Quotientenkriterium für Folgen',
      def: '**Aussage:** Für $a_n \\neq 0$ und $q = \\lim \\left|\\frac{a_{n+1}}{a_n}\\right|$:\n- $q < 1$ → $a_n \\to 0$\n- $q > 1$ → $|a_n| \\to \\infty$, also divergent\n- $q = 1$ → keine Aussage ($\\frac1n$, $1$, $n$)\n\n**Anwendung:** bei Fakultäten und Potenzen $q^n$, $n^n$.\n\n$a_n = \\frac{n!}{n^n}$: $\\frac{a_{n+1}}{a_n} = \\frac{1}{(1 + 1/n)^n} \\to \\frac1e < 1$ → $a_n \\to 0$',
    },
    {
      term: 'Cauchy-Kriterium anwenden',
      def: '**Aussage:** $(a_n)$ konvergiert ⇔ zu jedem $\\varepsilon > 0$ gibt es $N_\\varepsilon$ mit $|a_m - a_n| < \\varepsilon$ für alle $m, n > N_\\varepsilon$.\n\n**Anwendung:** Konvergenz ohne Kenntnis des Grenzwerts.\n- **Konvergenz:** z. B. $|a_{n+1} - a_n| \\le C q^n$ mit $0 < q < 1$ → mit geometrischer Summe ist $(a_n)$ Cauchy-Folge\n- **Divergenz:** Indizes $m, n$ beliebig groß finden mit $|a_m - a_n| \\ge c > 0$\n- Achtung: $|a_{n+1} - a_n| \\to 0$ allein reicht **nicht** ($\\sqrt n$)\n\n$s_n = \\sum_{k=1}^{n} \\frac1k$: $s_{2n} - s_n \\ge n \\cdot \\frac{1}{2n} = \\frac12$ → divergent',
    },
    {
      term: 'Teilfolgen-Kriterium',
      def: '**Aussage:** Konvergiert $a_n \\to a$, dann konvergiert jede Teilfolge gegen $a$.\n\n**Anwendung (Divergenz):** zwei Teilfolgen mit verschiedenen Grenzwerten finden, oder eine divergente Teilfolge.\n- typisch: gerade und ungerade Indizes $a_{2n}$, $a_{2n+1}$\n- umgekehrt: $a_{2n} \\to a$ **und** $a_{2n+1} \\to a$ ⇒ $a_n \\to a$\n\n$a_n = (-1)^n \\frac{n}{n+1}$: $a_{2n} \\to 1$, $a_{2n+1} \\to -1$ → divergent',
    },
    {
      term: 'Unbeschränkt ⇒ divergent',
      def: '**Aussage:** Jede konvergente Folge ist beschränkt. Kontraposition: eine unbeschränkte Folge ist divergent (hat keinen endlichen Grenzwert).\n\n**Anwendung:** schneller Divergenztest – zeigen, dass $|a_n|$ jede Schranke überschreitet.\n- Umkehrung gilt **nicht**: $(-1)^n$ ist beschränkt und divergent\n\n$a_n = (-1)^n n$: $|a_n| = n$ unbeschränkt → divergent (auch nicht gegen $\\pm\\infty$)',
    },
    {
      term: 'Konvergenz einer Folge prüfen',
      def: 'Übersicht, welches Kriterium wann passt.',
      calc: '- **Bausteine erkennbar?** → Grenzwertsätze (höchste Potenz ausklammern, $\\infty - \\infty$ mit Gegenklammer)\n- **$\\sin$, $\\cos$, $(-1)^n$ als Faktor?** → beschränkt mal Nullfolge\n- **Wurzeln, Summen, schwer zu rechnen?** → Sandwich-Kriterium\n- **Fakultäten, $q^n$, $n^n$?** → Quotientenkriterium für Folgen\n- **rekursiv oder Grenzwert unbekannt?** → Monotoniekriterium, dann Fixpunkt\n- **Divergenz vermutet?** → unbeschränkt, zwei Teilfolgen, Minorante gegen $\\infty$\n- **Grenzwert vermutet, Beweis verlangt?** → ε-N-Kriterium',
    },

    { chapter: '2.2 Grenzwertbestimmung' },
    {
      term: 'Geometrische Folge',
      def: '$a_n = q^n$:\n- $|q| < 1$: $\\lim = 0$\n- $q = 1$: $\\lim = 1$\n- $q > 1$: $\\lim = +\\infty$\n- $q \\le -1$: divergent',
    },
    {
      term: 'Grenzwertsätze',
      def: 'Für $a_n \\to a$, $b_n \\to b$:\n- $a_n + b_n \\to a + b$\n- $a_n b_n \\to ab$\n- $\\frac{a_n}{b_n} \\to \\frac{a}{b}$ (falls $b \\neq 0$)\n- $\\sqrt{a_n} \\to \\sqrt{a}$ (falls $a_n \\ge 0$)\n- $|a_n| \\to |a|$',
    },
    {
      term: 'Grenzwert gebrochen-rationaler Folgen',
      def: 'Folge wie $b_n = \\frac{3n^2 + 7n + 8}{5n^2 - 8n + 1}$.',
      calc: '- höchste Potenz von $n$ im Nenner suchen\n- Zähler und Nenner durch diese Potenz teilen\n- Terme wie $\\frac{7}{n}$, $\\frac{8}{n^2}$ gehen gegen 0\n- Grenzwertsätze anwenden\n\n$b_n = \\frac{3 + 7/n + 8/n^2}{5 - 8/n + 1/n^2} \\to \\frac{3}{5}$',
    },
    {
      term: 'Wurzeldifferenz-Folge',
      def: 'Folge wie $c_n = \\sqrt{n^2 + 3n + 3} - n$ (Typ „$\\infty - \\infty$“).',
      calc: '- mit der „Gegenklammer“ $\\sqrt{\\ldots} + n$ erweitern (3. binomische Formel)\n- Zähler vereinfacht sich: $3n + 3$\n- durch $n$ kürzen\n- Grenzwert ablesen: $c_n \\to \\frac{3}{2}$',
    },
    {
      term: 'Grenzwert und Ungleichungen',
      def: '- aus $a_n \\le b_n$ folgt $\\lim a_n \\le \\lim b_n$\n- aus $a_n < b_n$ folgt nur $\\le$ für die Grenzwerte (z. B. $\\frac1n > 0$, beide Grenzwerte 0)',
    },
    {
      term: 'Sandwich-Theorem',
      def: 'Gilt $a_n \\le c_n \\le b_n$ ab einem Index und $a_n, b_n \\to b$, dann auch $c_n \\to b$.',
      calc: '- $c_n$ nach unten und oben durch einfachere Folgen abschätzen\n- prüfen, dass beide Schranken denselben Grenzwert haben\n- dann hat $c_n$ diesen Grenzwert\n\n$0 \\le \\frac{n}{2^n} \\le \\frac{1}{n}$ (für $n \\ge 4$) → $\\frac{n}{2^n} \\to 0$',
    },
    {
      term: 'Wichtige Grenzwerte',
      def: '- $\\frac{n^r}{q^n} \\to 0$ für $q > 1$ (Potenz wächst schneller)\n- $\\sqrt[n]{n} \\to 1$\n- $\\left(1 + \\frac{1}{n}\\right)^n \\to e$\n- $\\left(1 + \\frac{x}{n}\\right)^n \\to e^x$',
    },
    {
      term: 'Monotone Folge',
      def: '- **monoton steigend:** $a_{n+1} \\ge a_n$\n- **monoton fallend:** $a_{n+1} \\le a_n$\n- **streng:** mit $>$ bzw. $<$',
      calc: '- Differenz $a_{n+1} - a_n$ bilden: immer $> 0$ → streng steigend, $< 0$ → streng fallend\n- oder bei positiven Gliedern den Quotienten $\\frac{a_{n+1}}{a_n}$: $\\ge 1$ → steigend, $\\le 1$ → fallend',
    },
    {
      term: 'Monotoniekriterium',
      def: 'Jede beschränkte und monotone Folge ist konvergent.',
    },
    {
      term: 'Grenzwert rekursiver Folgen',
      def: 'Für $a_{n+1} = f(a_n)$ mit stetigem $f$ kommen nur Fixpunkte $f(a) = a$ als Grenzwert in Frage. Konvergenz muss extra gezeigt werden!',
      calc: '- Beschränktheit zeigen (oft per Induktion)\n- Monotonie zeigen ($a_{n+1} - a_n$)\n- → konvergent (Monotoniekriterium)\n- in der Rekursion $a_n, a_{n+1}$ durch $a$ ersetzen, Fixpunktgleichung lösen\n- unpassende Lösungen ausschließen (z. B. Vorzeichen)\n\n$a_{n+1} = \\frac12 a_n + \\frac{1}{a_n}$: $a = \\frac{a}{2} + \\frac{1}{a}$ → $a^2 = 2$ → $a = \\sqrt2$ (da $a_n > 0$)',
    },
    {
      term: 'Eulersche Zahl',
      def: '$$e = \\lim_{n\\to\\infty}\\left(1 + \\frac{1}{n}\\right)^n = \\sum_{n=0}^{\\infty}\\frac{1}{n!} \\approx 2{,}71828$$',
    },
    {
      term: 'Exponentialfunktion',
      def: '$$e^x = \\exp(x) = \\lim_{n\\to\\infty}\\left(1 + \\frac{x}{n}\\right)^n = \\sum_{n=0}^{\\infty}\\frac{x^n}{n!}$$ Es gilt $e^{x+y} = e^x e^y$.',
    },
    {
      term: 'Bernoulli-Ungleichung',
      def: '$(1 + a)^n \\ge 1 + na$ für alle $n \\in \\mathbb{N}$ und $a \\ge -1$.',
    },
    {
      term: 'Cauchy-Kriterium (Folgen)',
      def: '$(a_n)$ konvergiert genau dann, wenn es zu jedem $\\varepsilon > 0$ ein $N_\\varepsilon$ gibt mit $|a_m - a_n| < \\varepsilon$ für alle $m, n > N_\\varepsilon$.',
    },
    {
      term: 'Teilfolge',
      def: 'Folge $(a_{n_k})$ mit streng steigenden Indizes $n_1 < n_2 < \\dots$ – entsteht durch Weglassen von Gliedern.',
    },
    {
      term: 'Häufungspunkt',
      def: 'Grenzwert einer konvergenten Teilfolge.\n- $(-1)^n$ hat die Häufungspunkte $1$ und $-1$\n- eine konvergente Folge hat genau einen',
      calc: 'Divergenz über Teilfolgen zeigen:\n- zwei Teilfolgen wählen (z. B. gerade / ungerade Indizes)\n- jeweils den Grenzwert bestimmen\n- verschieden → die Folge divergiert (konvergent ⇔ alle Teilfolgen haben denselben Grenzwert)',
    },
    {
      term: 'Satz von Bolzano-Weierstraß',
      def: 'Jede beschränkte Folge hat mindestens eine konvergente Teilfolge.',
    },

    {
      term: 'Unbestimmter Ausdruck ∞ − ∞',
      def: 'Aus $c_n \\to +\\infty$ und $d_n \\to -\\infty$ folgt **nichts** über $c_n + d_n$:\n- $c_n = 2n$, $d_n = -n$ → $+\\infty$\n- $c_n = n$, $d_n = -2n$ → $-\\infty$\n- $c_n = n + e$, $d_n = -n$ → $e$',
    },
    {
      term: 'Endlich viele Folgenglieder ändern',
      def: 'Ändert man endlich viele Glieder einer konvergenten Folge, bleibt sie konvergent mit **demselben** Grenzwert.',
    },
    {
      term: 'Teleskopprodukt',
      def: 'Produkt wie $\\prod_{k=2}^{n}\\left(1 - \\frac{1}{k^2}\\right)$.',
      calc: '- Faktor zerlegen: $1 - \\frac{1}{k^2} = \\frac{(k - 1)(k + 1)}{k \\cdot k}$\n- Produkt ausschreiben – fast alle Faktoren kürzen sich\n- übrig bleibt $\\frac{n + 1}{2n} \\to \\frac12$',
    },
    {
      term: 'n-te Wurzel einer Konstanten',
      def: '$$\\lim_{n\\to\\infty} \\sqrt[n]{\\alpha} = 1 \\quad \\text{für jedes } \\alpha > 0$$ Beweis mit Bernoulli-Ungleichung und Sandwich-Theorem.',
    },
    {
      term: 'Nullfolge und Kehrwert',
      def: 'Für eine monoton fallende Folge positiver Zahlen gilt: $$x_n \\to 0 \\;\\Leftrightarrow\\; \\left(\\tfrac{1}{x_n}\\right) \\text{ ist unbeschränkt}$$',
    },
    {
      term: 'Beschränkt mal Nullfolge',
      def: '- beschränkt · **Nullfolge** → Nullfolge\n- beschränkt · **konvergent** → im Allgemeinen **nicht** konvergent: $(-1)^n \\cdot 1$',
    },

    { chapter: '2.3 Unendliche Reihen' },
    {
      term: 'Unendliche Reihe',
      def: '$\\sum_{n=1}^{\\infty} a_n = \\lim_{n\\to\\infty} s_n$ mit Partialsummen $s_n = \\sum_{k=1}^{n} a_k$.\n- konvergent, wenn $(s_n)$ gegen eine Zahl konvergiert\n- sonst divergent (auch bei $s_n \\to \\pm\\infty$)',
    },
    {
      term: 'Geometrische Reihe',
      def: '$$\\sum_{n=0}^{\\infty} q^n = \\frac{1}{1 - q} \\quad \\text{für } |q| < 1$$ Für $|q| \\ge 1$ divergent.',
      calc: '- Reihe auf die Form $\\sum c\\,q^n$ bringen, Startindex beachten\n- $|q| < 1$ prüfen\n- Wert: erstes Glied $\\cdot \\frac{1}{1 - q}$\n\n$\\sum_{n=1}^{\\infty} \\left(\\frac12\\right)^n = \\frac12 \\cdot \\frac{1}{1 - \\frac12} = 1$',
    },
    {
      term: 'Harmonische Reihe',
      def: '$\\sum_{n=1}^{\\infty} \\frac{1}{n} = +\\infty$ – divergent, obwohl $\\frac1n$ eine Nullfolge ist.',
    },
    {
      term: 'Reihe 1/n^α',
      def: '$\\sum_{n=1}^{\\infty} \\frac{1}{n^\\alpha}$\n- divergent für $\\alpha \\le 1$\n- konvergent für $\\alpha > 1$\n\nQuotienten- und Wurzelkriterium liefern hier keine Aussage.',
    },
    {
      term: 'Rechenregeln für Reihen',
      def: 'Für konvergente Reihen:\n- $\\sum (a_n \\pm b_n) = \\sum a_n \\pm \\sum b_n$\n- $\\sum c\\,a_n = c \\sum a_n$',
    },
    {
      term: 'Cauchy-Kriterium (Reihen)',
      def: '$\\sum a_n$ konvergiert genau dann, wenn es zu jedem $\\varepsilon > 0$ ein $N_\\varepsilon$ gibt mit $\\left|\\sum_{k=m+1}^{n} a_k\\right| < \\varepsilon$ für alle $n > m > N_\\varepsilon$.',
    },
    {
      term: 'Notwendige Bedingung (Nullfolge)',
      def: 'Konvergiert $\\sum a_n$, dann ist $(a_n)$ eine Nullfolge.\n- nur notwendig, nicht hinreichend (harmonische Reihe)\n- Umkehrung als Test: ist $(a_n)$ **keine** Nullfolge → Reihe divergiert',
    },
    {
      term: 'Absolute Konvergenz',
      def: '$\\sum a_n$ heißt absolut konvergent, wenn $\\sum |a_n|$ konvergiert.\n- absolut konvergent ⇒ konvergent\n- nicht umgekehrt: alternierende harmonische Reihe',
    },
    {
      term: 'Leibniz-Kriterium',
      def: 'Ist $(a_n)$ eine monoton fallende Nullfolge mit $a_n \\ge 0$, dann konvergiert $\\sum (-1)^n a_n$.',
      calc: '- prüfen: Reihe ist alternierend $(-1)^n a_n$\n- $a_n \\ge 0$\n- $a_n \\to 0$\n- $a_n$ monoton fallend\n- alle erfüllt → konvergent',
    },
    {
      term: 'Majorantenkriterium',
      def: 'Gilt $|a_n| \\le b_n$ ab einem Index:\n- $\\sum b_n$ konvergent ⇒ $\\sum a_n$ absolut konvergent (Majorante)\n- $\\sum |a_n|$ divergent ⇒ $\\sum b_n$ divergent (Minorante)',
      calc: '- vermuten: konvergent oder divergent?\n- **Konvergenz:** $|a_n| \\le b_n$ mit bekannter konvergenter Reihe, z. B. $\\frac{1}{n^2}$ oder geometrisch\n- **Divergenz:** $a_n \\ge b_n \\ge 0$ mit divergenter Reihe, z. B. $\\frac{c}{n}$\n- dabei Zähler nach oben, Nenner nach unten abschätzen (bzw. umgekehrt)\n\n$\\left|\\frac{\\sin(3n + 2)}{3n^2 + 2n + 8}\\right| \\le \\frac{1}{3n^2}$ → konvergent',
    },
    {
      term: 'Quotientenkriterium',
      def: 'Mit $\\rho = \\lim \\left|\\frac{a_{n+1}}{a_n}\\right|$:\n- $\\rho < 1$ → absolut konvergent\n- $\\rho > 1$ → divergent\n- $\\rho = 1$ → keine Aussage',
      calc: '- $\\frac{a_{n+1}}{a_n}$ aufstellen\n- Doppelbrüche auflösen, kürzen (Fakultäten, Potenzen!)\n- Grenzwert $\\rho$ bestimmen und mit 1 vergleichen\n\n$\\sum \\frac{n^2}{3^n}$: $\\frac{1}{3}(1 + \\frac1n)^2 \\to \\frac13 < 1$ → konvergent',
    },
    {
      term: 'Wurzelkriterium',
      def: 'Mit $\\mu = \\lim \\sqrt[n]{|a_n|}$:\n- $\\mu < 1$ → absolut konvergent\n- $\\mu > 1$ → divergent\n- $\\mu = 1$ → keine Aussage',
      calc: '- $\\sqrt[n]{|a_n|}$ bilden – lohnt sich, wenn $a_n$ eine $n$-te Potenz enthält\n- Grenzwert $\\mu$ bestimmen und mit 1 vergleichen\n\n$\\sum \\left(1 - \\frac2n\\right)^{n^2}$: $\\left(1 - \\frac2n\\right)^n \\to e^{-2} < 1$ → konvergent',
    },
    {
      term: 'Konvergenz einer Reihe prüfen',
      def: 'Übersicht, welches Kriterium wann passt.',
      calc: '- **Nullfolge?** $a_n \\not\\to 0$ → divergent\n- **bekannte Reihe?** geometrisch, $\\frac{1}{n^\\alpha}$\n- **alternierend?** → Leibniz\n- **Fakultäten / $q^n$?** → Quotientenkriterium\n- **$n$-te Potenzen?** → Wurzelkriterium\n- **sonst** → Majoranten-/Minorantenkriterium mit Abschätzung',
    },
  ],
});
