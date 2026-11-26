/* Lernset Lineare Algebra 1 (Skript „Lineare Algebra EI“, WS 26/27).
 * Format wie in decks.js. Mehrere Dinge auf einer Rückseite → je ein Stichpunkt.
 */
window.DECKS = window.DECKS || [];
window.DECKS.push({
  id: 'lineare-algebra-1',
  name: 'Lineare Algebra 1',
  color: 'lilac',
  description: 'Skript Lineare Algebra EI: Vektoren, LGS, Gauß, Matrizen, Inverse, Unterräume, Rang, lineare Abbildungen, Basiswechsel, Markov-Ketten, Eigenwerte, Determinanten.',
  cards: [
    { chapter: '1 Grundlagen' },
    {
      term: 'Menge',
      def: 'Zusammenfassung von einzelnen Elementen.\n- $a \\in M$: $a$ ist in $M$ enthalten\n- $a \\notin M$: $a$ ist nicht in $M$ enthalten',
    },
    {
      term: 'Zahlenmengen',
      def: '- $\\mathbb{N} = \\{1, 2, 3, \\ldots\\}$: natürliche Zahlen\n- $\\mathbb{Z} = \\{\\ldots, -1, 0, 1, \\ldots\\}$: ganze Zahlen\n- $\\mathbb{Q} = \\{\\frac{p}{q} : p \\in \\mathbb{Z}, q \\in \\mathbb{N}\\}$: rationale Zahlen\n- $\\mathbb{R}$: reelle Zahlen',
    },
    {
      term: 'Teilmenge',
      def: '$A \\subseteq B$, wenn jedes Element von $A$ auch in $B$ enthalten ist.',
    },
    {
      term: 'Mengenoperationen',
      def: '- **Durchschnitt** $A \\cap B$: in $A$ und in $B$\n- **Vereinigung** $A \\cup B$: in $A$ oder in $B$\n- **Differenz** $A \\setminus B$: in $A$, aber nicht in $B$\n- **symmetrische Differenz** $A \\triangle B = (A \\setminus B) \\cup (B \\setminus A)$',
    },
    {
      term: 'Abbildung (Funktion)',
      def: 'Vorschrift $f : A \\to B$, die jedem Element aus $A$ **genau ein** Element aus $B$ zuordnet; geschrieben $f(a) = b$.',
    },
    {
      term: 'Injektiv, surjektiv, bijektiv',
      def: '- **injektiv:** aus $a_1 \\neq a_2$ folgt $f(a_1) \\neq f(a_2)$\n- **surjektiv:** zu jedem $b \\in B$ gibt es ein $a \\in A$ mit $f(a) = b$\n- **bijektiv:** injektiv und surjektiv',
    },

    { chapter: '2 Vektoren' },
    {
      term: 'Vektor',
      def: 'Geordnete Liste von endlich vielen Zahlen. $\\mathbb{R}^n$ = Menge aller Vektoren mit $n$ reellen Einträgen.\n\nVektoren in $\\mathbb{R}^2$ lassen sich als Punkte oder Pfeile in der Ebene darstellen.',
    },
    {
      term: 'Nullvektor und Standard-Einheitsvektoren',
      def: '- **Nullvektor** $O = (0, \\ldots, 0)$\n- **Standard-Einheitsvektor** $e_j$: Eintrag 1 an Stelle $j$, sonst 0',
    },
    {
      term: 'Vektoraddition',
      def: 'Komponentenweise: $v + w = (v_1 + w_1, \\ldots, v_n + w_n)$.',
    },
    {
      term: 'Skalarmultiplikation',
      def: 'Jeder Eintrag wird mit $\\lambda$ multipliziert: $\\lambda v = (\\lambda v_1, \\ldots, \\lambda v_n)$.\n\n$-v := (-1) \\cdot v$, $\\;v - w := v + (-w)$.',
    },
    {
      term: 'Rechenregeln für Vektoren',
      def: '- $v + w = w + v$\n- $(u + v) + w = u + (v + w)$\n- $v + O = v$, $\\;v - v = O$\n- $\\lambda(v + w) = \\lambda v + \\lambda w$\n- $(\\lambda + \\mu)v = \\lambda v + \\mu v$\n- $\\lambda(\\mu v) = (\\lambda\\mu)v$',
    },
    {
      term: 'Skalarprodukt',
      def: 'Standard-Skalarprodukt zweier Vektoren – eine Zahl: $$\\langle v, w \\rangle = v_1 w_1 + \\dots + v_n w_n$$',
      calc: '- Einträge an gleicher Stelle multiplizieren\n- alle Produkte addieren\n\n$\\langle (1,2,3), (4,5,6) \\rangle = 4 + 10 + 18 = 32$',
      more: '- symmetrisch: $\\langle v, w \\rangle = \\langle w, v \\rangle$\n- linear in jedem Argument: $\\langle u + v, w \\rangle = \\langle u, w \\rangle + \\langle v, w \\rangle$, $\\;\\langle \\lambda v, w \\rangle = \\lambda \\langle v, w \\rangle$\n- $\\langle v, v \\rangle \\ge 0$\n- $\\langle v, v \\rangle = 0 \\Leftrightarrow v = O$',
      moreLabel: 'Eigenschaften',
    },
    {
      term: 'Euklidische Norm',
      def: 'Länge eines Vektors: $\\|v\\|_2 = \\sqrt{\\langle v, v \\rangle}$.\n- $\\|v\\|_2 = 0 \\Leftrightarrow v = O$\n- $\\|\\lambda v\\|_2 = |\\lambda|\\,\\|v\\|_2$\n- $\\|e_j\\|_2 = 1$',
      calc: '- alle Einträge quadrieren\n- Quadrate addieren\n- Wurzel ziehen\n\n$\\|(3, 4)\\|_2 = \\sqrt{9 + 16} = 5$',
    },
    {
      term: 'Cauchy-Schwarz-Ungleichung',
      def: '**In Worten:** Der Betrag des Skalarprodukts zweier Vektoren ist höchstens das Produkt ihrer Längen.\n\n**Formal:** $$|\\langle v, w \\rangle| \\le \\|v\\|_2 \\cdot \\|w\\|_2 \\quad \\text{für alle } v, w \\in \\mathbb{R}^n$$',
    },
    {
      term: 'Dreiecksungleichung',
      def: '**In Worten:** Die Länge der Summe zweier Vektoren ist höchstens die Summe ihrer Längen.\n\n**Formal:** $$\\|v + w\\|_2 \\le \\|v\\|_2 + \\|w\\|_2$$ für alle $v, w \\in \\mathbb{R}^n$',
    },
    {
      term: 'Orthogonalität',
      def: '$v$ und $w$ heißen orthogonal, wenn $\\langle v, w \\rangle = 0$.',
      calc: '- Skalarprodukt $\\langle v, w \\rangle$ berechnen\n- ist es 0 → orthogonal, sonst nicht',
    },
    {
      term: 'Satz von Pythagoras',
      def: '**In Worten:** Zwei Vektoren sind genau dann orthogonal, wenn das Längenquadrat ihrer Summe gleich der Summe ihrer Längenquadrate ist.\n\n**Formal:** $$\\langle v, w \\rangle = 0 \\;\\Leftrightarrow\\; \\|v + w\\|_2^2 = \\|v\\|_2^2 + \\|w\\|_2^2$$',
    },
    {
      term: 'Gerade durch den Ursprung',
      def: 'Menge $\\{\\lambda v : \\lambda \\in \\mathbb{R}\\}$ mit Richtung $v \\neq O$.',
    },
    {
      term: 'Projektion',
      def: 'Projektion von $v$ entlang $w \\neq O$: $$\\text{proj}_w(v) = \\frac{\\langle v, w \\rangle}{\\langle w, w \\rangle}\\, w$$',
      calc: '- $\\langle v, w \\rangle$ berechnen\n- $\\langle w, w \\rangle$ berechnen\n- Quotient $\\frac{\\langle v, w \\rangle}{\\langle w, w \\rangle}$ bilden\n- $w$ mit diesem Faktor multiplizieren',
      more: '- $\\text{proj}_w(v)$ ist der Punkt der Geraden durch den Ursprung mit Richtung $w$, der $v$ am nächsten liegt\n- $w$ und $v - \\text{proj}_w(v)$ sind orthogonal',
      moreLabel: 'Eigenschaften',
    },
    {
      term: 'Linearkombination',
      def: '$v = \\lambda_1 v^1 + \\dots + \\lambda_k v^k$ mit Koeffizienten $\\lambda_1, \\ldots, \\lambda_k \\in \\mathbb{R}$.\n\nJeder Vektor in $\\mathbb{R}^n$ ist eine Linearkombination der Standard-Einheitsvektoren.',
      calc: 'Koeffizienten finden, um $v$ aus $v^1, \\ldots, v^k$ darzustellen:\n- $v^1, \\ldots, v^k$ als Spalten, $v$ als rechte Seite: $(v^1 \\cdots v^k \\mid v)$\n- mit Gauß lösen\n- Lösung = Koeffizienten; unlösbar → keine Linearkombination',
    },

    {
      term: 'Vektoraddition',
      img: 'schaltbilder/la-vektoraddition.svg',
      def: 'Parallelogramm: $v + w$ ist die Diagonale.',
    },
    {
      term: 'Projektion',
      img: 'schaltbilder/la-projektion.svg',
      def: '$\\text{proj}_w(v)$ liegt auf der Geraden in Richtung $w$; $v - \\text{proj}_w(v)$ steht senkrecht darauf.',
    },

    { chapter: '3 Lineare Gleichungssysteme' },
    {
      term: 'Lineare Gleichung',
      def: 'Gleichung $a_1 x_1 + \\dots + a_n x_n = b$ in den Variablen $x_1, \\ldots, x_n$ mit festen Zahlen $a_i$, $b$.',
    },
    {
      term: 'Lineares Gleichungssystem (LGS)',
      def: 'Menge von endlich vielen linearen Gleichungen in $n$ Variablen.',
    },
    {
      term: 'Lösungsmenge eines LGS',
      def: 'Menge aller Vektoren mit $n$ Einträgen (für $x_1, \\ldots, x_n$), die **alle** Gleichungen erfüllen.',
      calc: '- erweiterte Koeffizientenmatrix aufstellen\n- in (strenge) Zeilenstufenform bringen\n- Zeile $(0 \\ldots 0 \\mid \\beta \\neq 0)$ → keine Lösung\n- Spalten ohne führende 1 → freie Variablen, als Parameter $t_1, t_2, \\ldots$ setzen\n- übrige Variablen durch die Parameter ausdrücken',
    },
    {
      term: 'LGS als Vektorproblem',
      def: '- **Zeilensicht:** finde $x$ mit $\\langle a^1, x \\rangle = b_1, \\ldots, \\langle a^m, x \\rangle = b_m$\n- **Spaltensicht:** finde Koeffizienten $x_1, \\ldots, x_n$, um $b$ als Linearkombination von $a^1, \\ldots, a^n$ darzustellen',
    },
    {
      term: 'Rückwärtseinsetzen',
      def: '**In Worten:** Ein LGS in Dreiecksform, dessen Diagonaleinträge alle ungleich 0 sind, hat genau eine Lösung. Man berechnet sie von unten nach oben.\n\n**Formal:** $a_{1,1}, \\ldots, a_{n,n} \\neq 0$ $\\Rightarrow$ genau eine Lösung:\n- $x_n = \\frac{b_n}{a_{n,n}}$\n- $x_i = \\frac{1}{a_{i,i}}\\left(b_i - a_{i,i+1}x_{i+1} - \\dots - a_{i,n}x_n\\right)$ für $i = n-1, \\ldots, 1$',
    },

    { chapter: '4 Gauß-Elimination' },
    {
      term: 'Erweiterte Koeffizientenmatrix',
      def: 'Schreibweise eines LGS als Matrix: Koeffizienten $a_{i,j}$ links, rechte Seiten $b_i$ rechts vom Strich. $$\\left(\\begin{array}{cc|c} 1 & 2 & 5 \\\\ 3 & 4 & 6 \\end{array}\\right)$$',
    },
    {
      term: 'Zeilenstufenform (ZSF)',
      def: '- beginnt eine Zeile mit Nullen, stehen darunter lauter weitere Nullen\n- unter dem ersten Eintrag $\\neq 0$ jeder Zeile stehen lauter Nullen',
    },
    {
      term: 'Elementare Zeilenumformungen',
      def: '- zwei Zeilen vertauschen\n- eine Zeile mit $\\lambda \\neq 0$ multiplizieren\n- das $\\lambda$-fache einer Zeile zu einer anderen addieren\n\nSie ändern die Lösungsmenge nicht.',
    },
    {
      term: 'Gauß-Elimination',
      def: '- erweiterte Koeffizientenmatrix aufstellen\n- mit elementaren Zeilenumformungen in Zeilenstufenform bringen\n- durch Rückwärtseinsetzen lösen oder feststellen, dass das LGS nicht lösbar ist',
      more: '- am weitesten linke Spalte suchen, die nicht nur Nullen enthält\n- eine Zeile mit Eintrag $\\neq 0$ in dieser Spalte nach oben tauschen\n- diese Zeile so multiplizieren, dass der Eintrag 1 wird\n- Vielfache davon von den Zeilen darunter abziehen → darunter nur Nullen\n- erste Zeile abdecken und mit der Restmatrix weitermachen',
      moreLabel: 'Vorgehen',
    },
    {
      term: 'Rang einer Matrix',
      def: 'Anzahl der Zeilen in der Zeilenstufenform, die nicht nur Nullen enthalten: $\\text{rang}(A)$.',
      calc: '- Matrix in Zeilenstufenform bringen\n- Zeilen zählen, die nicht nur Nullen enthalten',
    },
    {
      term: 'Rang und freie Variablen',
      def: '**In Worten:** Bei einem lösbaren LGS ist der Rang der Koeffizientenmatrix gleich der Anzahl der abhängigen Variablen, also Anzahl aller Variablen minus Anzahl der freien Variablen.\n\n**Formal:** Für $A \\in \\mathbb{R}^{m \\times n}$ und lösbares $Ax = b$: $$\\begin{aligned} \\text{rang}(A) &= \\#\\text{abhängige Variablen} \\\\ &= n - \\#\\text{freie Variablen} \\end{aligned}$$',
    },
    {
      term: 'Lösbarkeit eines LGS',
      def: '**In Worten:** Ein LGS ist genau dann lösbar, wenn beim Gauß-Verfahren keine widersprüchliche Zeile „$0 = \\beta$“ mit $\\beta \\neq 0$ entsteht – also wenn die rechte Seite den Rang nicht erhöht.\n\n**Formal:** $$Ax = b \\text{ lösbar} \\;\\Leftrightarrow\\; \\text{rang}(A) = \\text{rang}(A \\mid b)$$ $\\Leftrightarrow$ die ZSF von $(A \\mid b)$ hat keine Zeile $(0 \\ldots 0 \\mid \\beta)$ mit $\\beta \\neq 0$.',
      calc: '- $(A \\mid b)$ in Zeilenstufenform bringen\n- Zeile $(0 \\ldots 0 \\mid \\beta)$ mit $\\beta \\neq 0$ → nicht lösbar\n- sonst lösbar; eindeutig, wenn $\\text{rang}(A) = n$ (keine freien Variablen)',
    },

    {
      term: 'Zeilenstufenform (ZSF)',
      img: 'schaltbilder/la-zeilenstufenform.svg',
      def: 'Unter jedem ersten Eintrag $\\neq 0$ stehen nur Nullen; die Stufen gehen nach rechts.',
    },

    { chapter: '5 Gauß-Jordan-Elimination' },
    {
      term: 'Strenge Zeilenstufenform',
      def: '- die Matrix ist in Zeilenstufenform\n- der erste Eintrag $\\neq 0$ jeder Zeile ist eine 1 (führende 1)\n- oberhalb jeder führenden 1 stehen lauter Nullen',
    },
    {
      term: 'Homogenes LGS',
      def: 'Alle rechten Seiten sind Null: $Ax = O$.\n\n**In Worten:** Ein homogenes LGS hat immer die Lösung $x = O$. Hat es mehr Variablen als Gleichungen, hat es unendlich viele Lösungen.\n\n**Formal:**\n- $A\\,O = O$ für jedes $A$\n- $A \\in \\mathbb{R}^{m \\times n}$ mit $n > m$ $\\Rightarrow$ $Ax = O$ hat unendlich viele Lösungen',
    },
    {
      term: 'Gauß-Jordan-Elimination',
      def: '- erweiterte Koeffizientenmatrix aufschreiben\n- in strenge Zeilenstufenform bringen\n- Variablen zu führenden Einsen mithilfe der freien Variablen ausdrücken → Lösungsmenge',
    },

    { chapter: '6 Anwendung: GPS' },
    {
      term: 'GPS als LGS',
      def: 'Ziel: Position $(x, y, z)$ und Empfangszeit $t$ aus den Signalen von 4 Satelliten bestimmen (eigene Uhr ist zu ungenau).\n- Abstand über die Laufzeit: $d_i = v\\,(t - t_i)$\n- Abstand über die Koordinaten: $d_i = \\sqrt{(x - a_i)^2 + (y - b_i)^2 + (z - c_i)^2}$',
    },
    {
      term: 'GPS: Vorgehen',
      def: '- beide Ausdrücke für $d_i$ gleichsetzen und quadrieren → nicht linear, aber gleiche quadratische Terme\n- erste Gleichung von den anderen abziehen → 3 lineare Gleichungen in $x, y, z, t$\n- $x, y, z$ in Abhängigkeit von $t$ ausdrücken, in die erste Gleichung einsetzen → quadratische Gleichung in $t$\n- von den zwei Lösungen liegt nur eine auf der Erde (Norm 1)',
    },

    { chapter: '8 Lineare Unabhängigkeit' },
    {
      term: 'Linear abhängig / unabhängig',
      def: '- **linear abhängig:** es gibt $\\lambda_1, \\ldots, \\lambda_k$, nicht alle 0, mit $\\lambda_1 v^1 + \\dots + \\lambda_k v^k = O$\n- **linear unabhängig:** sonst – nur $\\lambda_1 = \\dots = \\lambda_k = 0$ liefert $O$',
      calc: '- Vektoren als Spalten in eine Matrix $A$ schreiben\n- $A$ in Zeilenstufenform bringen\n- $\\text{rang}(A)$ = Anzahl der Vektoren → linear unabhängig\n- sonst (freie Variable in $Ax = O$) → linear abhängig',
    },
    {
      term: 'Lineare Abhängigkeit erkennen',
      def: '**In Worten:** Vektoren sind genau dann linear abhängig, wenn sich einer von ihnen als Linearkombination der anderen schreiben lässt. Mehr als $n$ Vektoren im $\\mathbb{R}^n$ sind immer linear abhängig.\n\n**Formal:** $v^1, \\ldots, v^k$ linear abhängig\n- $\\Leftrightarrow$ $\\exists i: v^i \\in \\text{span}(\\{v^j : j \\neq i\\})$\n- $\\Leftrightarrow$ (als Spalten von $A$) $Ax = O$ hat unendlich viele Lösungen\n- $\\Leftrightarrow$ (als Zeilen von $A$, $m = k$ Zeilen) $\\text{rang}(A) < m$\n- $k > n$ $\\Rightarrow$ linear abhängig',
    },

    { chapter: '9 Matrizen' },
    {
      term: 'Matrix',
      def: 'Rechteckige Anordnung reeller Zahlen $a_{i,j}$.\n- $(m \\times n)$-Matrix: $m$ Zeilen, $n$ Spalten\n- $\\mathbb{R}^{m \\times n}$: Menge aller solchen Matrizen\n- quadratisch: $m = n$',
    },
    {
      term: 'Zeilen- und Spaltenvektor',
      def: '- **Zeilenvektor:** $(1 \\times n)$-Matrix\n- **Spaltenvektor:** $(n \\times 1)$-Matrix\n\nVereinbarung: Vektoren sind standardmäßig Spaltenvektoren ($\\mathbb{R}^n = \\mathbb{R}^{n \\times 1}$).',
    },
    {
      term: 'Nullmatrix',
      def: 'Matrix, deren Einträge alle 0 sind; ebenfalls mit $O$ bezeichnet.',
    },
    {
      term: 'Diagonal- und Einheitsmatrix',
      def: '- **Diagonalmatrix:** quadratisch, $a_{i,j} = 0$ für alle $i \\neq j$\n- **Einheitsmatrix** $I$: Diagonalmatrix mit lauter Einsen auf der Diagonale',
    },
    {
      term: 'Dreiecksmatrix',
      def: '- **obere Dreiecksmatrix:** $a_{i,j} = 0$ für $i > j$ (unterhalb der Diagonale nur Nullen)\n- **untere Dreiecksmatrix:** $a_{i,j} = 0$ für $i < j$\n- **Dreiecksmatrix:** obere oder untere',
    },
    {
      term: 'Matrixaddition und Skalarmultiplikation',
      def: '- **Summe** $A + B$: eintragsweise addieren (gleiche Größe nötig)\n- **Skalarmultiplikation** $\\lambda A$: jeden Eintrag mit $\\lambda$ multiplizieren\n\n$-A := (-1) A$, $\\;A - B := A + (-B)$.',
    },
    {
      term: 'Matrizenmultiplikation',
      def: '$A \\in \\mathbb{R}^{m \\times p}$, $B \\in \\mathbb{R}^{p \\times n}$: $$c_{i,j} = \\sum_{k=1}^{p} a_{i,k}\\, b_{k,j}$$\n- nur definiert, wenn #Spalten von $A$ = #Zeilen von $B$\n- im Allgemeinen $AB \\neq BA$',
      calc: '- prüfen: #Spalten von $A$ = #Zeilen von $B$\n- Ergebnis hat #Zeilen von $A$ und #Spalten von $B$\n- Eintrag $(i, j)$ = Zeile $i$ von $A$ mal Spalte $j$ von $B$ (Skalarprodukt)',
      more: 'Eintrag $c_{i,j}$ = Skalarprodukt von Zeile $i$ von $A$ mit Spalte $j$ von $B$. $$\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}\\begin{pmatrix} 5 \\\\ 6 \\end{pmatrix} = \\begin{pmatrix} 1 \\cdot 5 + 2 \\cdot 6 \\\\ 3 \\cdot 5 + 4 \\cdot 6 \\end{pmatrix} = \\begin{pmatrix} 17 \\\\ 39 \\end{pmatrix}$$',
      moreLabel: 'Beispiel',
    },
    {
      term: 'LGS in Matrixschreibweise',
      def: 'Jedes LGS mit $m$ Gleichungen in $n$ Variablen lässt sich als $Ax = b$ schreiben: $A \\in \\mathbb{R}^{m \\times n}$, $b \\in \\mathbb{R}^m$, $x$ Spaltenvektor der Variablen.',
    },
    {
      term: 'Elementare Matrizen',
      def: 'Einheitsmatrix mit einer kleinen Änderung ($\\lambda \\neq 0$). Multiplikation von links mit $A$ bewirkt eine Zeilenumformung:\n- Zeilen $i$ und $j$ getauscht → vertauscht Zeilen $i$ und $j$ von $A$\n- $\\lambda$ an Stelle $(i,i)$ → multipliziert Zeile $i$ mit $\\lambda$\n- $\\lambda$ an Stelle $(i,j)$ → addiert das $\\lambda$-fache von Zeile $j$ zu Zeile $i$',
    },

    { chapter: '10 Matrix-Algebra' },
    {
      term: 'Rechenregeln Addition / Skalar',
      def: '- $A + B = B + A$\n- $(A + B) + C = A + (B + C)$\n- $A + O = A$, $\\;A - A = O$\n- $\\lambda(A + B) = \\lambda A + \\lambda B$, $\\;(\\lambda + \\mu)A = \\lambda A + \\mu A$\n- $\\lambda(\\mu A) = (\\lambda\\mu)A$, $\\;1 \\cdot A = A$',
    },
    {
      term: 'Rechenregeln Matrixprodukt',
      def: '- $A(BC) = (AB)C$\n- $A(B + C) = AB + AC$\n- $(A + B)C = AC + BC$\n- $\\lambda(AB) = (\\lambda A)B = A(\\lambda B)$\n- $IA = A = AI$',
    },
    {
      term: 'Lösungen auf einer Geraden',
      def: '**In Worten:** Mit zwei Lösungen eines LGS ist auch jeder Punkt auf der Geraden durch diese beiden Lösungen eine Lösung.\n\n**Formal:** $$\\begin{aligned} &Av = b,\\ Aw = b \\\\ \\Rightarrow\\ &A\\big(\\lambda v + (1 - \\lambda) w\\big) = b \\end{aligned}$$ für alle $\\lambda \\in \\mathbb{R}$',
    },
    {
      term: 'Transponierte',
      def: '$A^{\\mathrm{T}}$: Zeilen und Spalten vertauscht; aus $(m \\times n)$ wird $(n \\times m)$.',
      calc: '- Zeile 1 wird Spalte 1, Zeile 2 wird Spalte 2, …\n- also Eintrag $a_{i,j}$ an Position $(j, i)$ schreiben',
      more: '- $(A^{\\mathrm{T}})^{\\mathrm{T}} = A$\n- $(A + B)^{\\mathrm{T}} = A^{\\mathrm{T}} + B^{\\mathrm{T}}$\n- $(\\lambda A)^{\\mathrm{T}} = \\lambda A^{\\mathrm{T}}$\n- $(AB)^{\\mathrm{T}} = B^{\\mathrm{T}} A^{\\mathrm{T}}$ (Reihenfolge dreht sich um!)',
      moreLabel: 'Rechenregeln',
    },
    {
      term: 'Symmetrische Matrix',
      def: 'Quadratische Matrix mit $A = A^{\\mathrm{T}}$. Immer symmetrisch:\n- $AA^{\\mathrm{T}}$\n- $A^{\\mathrm{T}}A$\n- $A + A^{\\mathrm{T}}$ (für quadratisches $A$)',
    },
    {
      term: 'Matrixpotenzen',
      def: '$A^k = A \\cdot A \\cdots A$ ($k$-mal), $A^0 = I$.\n- $A^p A^q = A^{p+q}$\n- $(A^p)^q = A^{pq}$\n- $(A^p)^{\\mathrm{T}} = (A^{\\mathrm{T}})^p$',
    },

    { chapter: '11 Inverse Matrizen' },
    {
      term: 'Inverse Matrix',
      def: 'Gibt es zu $A \\in \\mathbb{R}^{n \\times n}$ ein $A^{-1}$ mit $AA^{-1} = A^{-1}A = I$, heißt $A$ invertierbar.\n- die Inverse ist eindeutig\n- elementare Matrizen sind invertierbar (Inverse wieder elementar)',
      calc: '- $(A \\mid I)$ aufschreiben\n- Zeilenumformungen, bis links $I$ steht\n- rechts steht $A^{-1}$: $(I \\mid A^{-1})$\n- entsteht links eine Nullzeile → $A$ nicht invertierbar\n\nKontrolle: $AA^{-1} = I$.',
    },
    {
      term: 'LGS mit invertierbarer Matrix',
      def: '**In Worten:** Ist die Koeffizientenmatrix invertierbar, hat das LGS genau eine Lösung, nämlich $A^{-1} b$.\n\n**Formal:** $$\\begin{aligned} &A \\text{ invertierbar} \\\\ \\Rightarrow\\ &Ax = b \\text{ hat genau die Lösung } x = A^{-1} b \\end{aligned}$$',
    },
    {
      term: 'Inverse einer 2×2-Matrix',
      def: 'Für $ad - bc \\neq 0$: $$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}^{-1} = \\frac{1}{ad - bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$$',
    },
    {
      term: 'Rechenregeln Inverse',
      def: '**In Worten:** Die Inversen von Inversen, Vielfachen, Produkten (umgekehrte Reihenfolge!), Transponierten und Potenzen invertierbarer Matrizen erhält man aus den einzelnen Inversen.\n\n**Formal:** Für invertierbare $A, B \\in \\mathbb{R}^{n \\times n}$:\n- $(A^{-1})^{-1} = A$\n- $(\\lambda A)^{-1} = \\frac{1}{\\lambda} A^{-1}$ für $\\lambda \\neq 0$\n- $(AB)^{-1} = B^{-1} A^{-1}$ (umgekehrte Reihenfolge)\n- $(A^{\\mathrm{T}})^{-1} = (A^{-1})^{\\mathrm{T}}$\n- $(A^n)^{-1} = (A^{-1})^n$',
    },
    {
      term: 'Einseitige Inverse genügt',
      def: '**In Worten:** Bei quadratischen Matrizen reicht es, eine Seite zu prüfen: Ist $AB = I$ oder $BA = I$, dann ist $B$ schon die Inverse von $A$.\n\n**Formal:** Für $A, B \\in \\mathbb{R}^{n \\times n}$: $$\\begin{aligned} &AB = I \\ \\text{ oder } \\ BA = I \\\\ \\Rightarrow\\ &A \\text{ invertierbar},\\ A^{-1} = B \\end{aligned}$$',
    },
    {
      term: 'Hauptsatz invertierbarer Matrizen',
      def: '**In Worten:** Für eine quadratische Matrix sind alle folgenden Aussagen gleichwertig – gilt eine, gelten alle.\n\n**Formal:** Für $A \\in \\mathbb{R}^{n \\times n}$ mit Abbildung $f(x) = Ax$ sind äquivalent:\n- $A$ ist invertierbar\n- $Ax = b$ hat für jedes $b$ genau eine Lösung\n- $Ax = O$ hat nur die triviale Lösung\n- strenge ZSF von $A$ ist $I$\n- $A$ ist Produkt elementarer Matrizen\n- $\\text{kern}(A) = \\{O\\}$\n- $\\text{rang}(A) = n$\n- $f$ ist bijektiv / injektiv / surjektiv',
    },

    { chapter: '12 Unterräume und Basen' },
    {
      term: 'Lineares Erzeugnis (Span)',
      def: '$\\text{span}(\\{v^1, \\ldots, v^k\\})$: Menge aller Linearkombinationen von $v^1, \\ldots, v^k$. Ist immer ein Unterraum.',
    },
    {
      term: 'Lösbarkeit über den Span',
      def: '**In Worten:** Ein LGS ist genau dann lösbar, wenn die rechte Seite eine Linearkombination der Spalten der Koeffizientenmatrix ist.\n\n**Formal:** Mit den Spalten $a_1, \\ldots, a_n$ von $A$: $$\\begin{aligned} &Ax = b \\text{ lösbar} \\\\ \\Leftrightarrow\\ &b = x_1 a_1 + \\dots + x_n a_n \\text{ für passende } x_i \\\\ \\Leftrightarrow\\ &b \\in \\text{span}(\\{a_1, \\ldots, a_n\\}) \\end{aligned}$$',
    },
    {
      term: 'Unterraum',
      def: '$U \\subseteq \\mathbb{R}^n$ mit:\n- $O \\in U$\n- $v, w \\in U \\Rightarrow v + w \\in U$\n- $v \\in U$, $\\lambda \\in \\mathbb{R} \\Rightarrow \\lambda v \\in U$',
    },
    {
      term: 'Kern',
      def: '$\\text{kern}(A) = \\{x \\in \\mathbb{R}^n : Ax = O\\}$ – die Lösungsmenge des homogenen LGS. Ist ein Unterraum von $\\mathbb{R}^n$.',
      calc: '- $(A \\mid O)$ in strenge Zeilenstufenform bringen\n- freie Variablen als Parameter $t_1, t_2, \\ldots$ setzen\n- führende Variablen durch die Parameter ausdrücken\n- $x$ als $t_1 v^1 + t_2 v^2 + \\dots$ schreiben → $v^1, v^2, \\ldots$ sind eine Basis des Kerns\n\n$\\dim(\\text{kern}(A))$ = Anzahl freier Variablen.',
    },
    {
      term: 'Struktur der Lösungsmenge',
      def: '**In Worten:** Kennt man eine Lösung, erhält man alle Lösungen, indem man die Lösungen des homogenen Systems dazu addiert: Lösungsmenge = spezielle Lösung + Kern.\n\n**Formal:** $$\\begin{aligned} &Ax\' = b \\\\ \\Rightarrow\\ &\\{x : Ax = b\\} = \\{x\' + x^0 : x^0 \\in \\text{kern}(A)\\} \\end{aligned}$$',
      calc: '- eine spezielle Lösung $x\'$ von $Ax = b$ bestimmen\n- Kern von $A$ bestimmen (homogenes LGS)\n- Lösungsmenge $= \\{x\' + x^0 : x^0 \\in \\text{kern}(A)\\}$',
    },
    {
      term: 'Spaltenraum und Zeilenraum',
      def: '- **Spaltenraum** $\\text{col}(A) \\subseteq \\mathbb{R}^m$: Span der Spalten, $= \\{Ax : x \\in \\mathbb{R}^n\\}$ = alle $b$, für die $Ax = b$ lösbar ist\n- **Zeilenraum** $\\text{row}(A) \\subseteq \\mathbb{R}^n$: Span der Zeilen; ändert sich durch Zeilenumformungen nicht',
      calc: '- **Spaltenraum:** $A$ in Zeilenstufenform bringen, Spalten mit führendem Eintrag merken → diese Spalten der **ursprünglichen** Matrix sind eine Basis\n- **Zeilenraum:** $A$ in Zeilenstufenform bringen → die Nicht-Nullzeilen sind eine Basis',
    },
    {
      term: 'Basis',
      def: 'Liste $v^1, \\ldots, v^k$ in einem Unterraum $U$ mit:\n- $v^1, \\ldots, v^k$ linear unabhängig\n- $\\text{span}(\\{v^1, \\ldots, v^k\\}) = U$\n\nJeder Unterraum hat eine Basis; alle Basen sind gleich lang.',
      calc: 'Basis von $\\text{span}(\\{v^1, \\ldots, v^k\\})$:\n- Vektoren als Spalten in eine Matrix schreiben\n- in Zeilenstufenform bringen\n- Spalten mit führendem Eintrag merken\n- die zugehörigen ursprünglichen Vektoren bilden eine Basis',
    },

    { chapter: '13 Rangsatz' },
    {
      term: 'Dimension',
      def: '$\\dim(U)$: Anzahl der Vektoren in einer Basis von $U$.\n\n$\\dim(\\text{kern}(A))$ = Anzahl der freien Variablen.',
      calc: '- Basis des Unterraums bestimmen\n- Basisvektoren zählen\n\nFür Matrizen: $\\dim(\\text{col}(A)) = \\text{rang}(A)$, $\\;\\dim(\\text{kern}(A)) = n - \\text{rang}(A)$.',
    },
    {
      term: 'Rangsatz',
      def: '**In Worten:** Rang und Dimension des Kerns einer Matrix ergeben zusammen die Anzahl ihrer Spalten.\n\n**Formal:** Für jedes $A \\in \\mathbb{R}^{m \\times n}$: $$\\text{rang}(A) + \\dim(\\text{kern}(A)) = n$$',
    },
    {
      term: 'Zeilenrang = Spaltenrang',
      def: '**In Worten:** Die größte Anzahl linear unabhängiger Zeilen ist gleich der größten Anzahl linear unabhängiger Spalten – beides ist der Rang.\n\n**Formal:** $$\\begin{aligned} \\text{rang}(A) &= \\dim(\\text{row}(A)) = \\dim(\\text{col}(A)) \\\\ &= \\text{rang}(A^{\\mathrm{T}}) \\end{aligned}$$',
    },

    { chapter: '14 Lineare Abbildungen' },
    {
      term: 'Lineare Abbildung',
      def: '$f : \\mathbb{R}^n \\to \\mathbb{R}^m$ mit:\n- $f(v + w) = f(v) + f(w)$\n- $f(\\lambda v) = \\lambda f(v)$\n\nFolgt immer: $f(O) = O$.',
    },
    {
      term: 'Matrizen und lineare Abbildungen',
      def: '**In Worten:** Jede Matrix liefert eine lineare Abbildung, und jede lineare Abbildung ist die Multiplikation mit einer Matrix.\n\n**Formal:** $$\\begin{aligned} &f : \\mathbb{R}^n \\to \\mathbb{R}^m \\text{ linear} \\\\ \\Leftrightarrow\\ &\\exists A \\in \\mathbb{R}^{m \\times n}\\ \\forall x: f(x) = Ax \\end{aligned}$$',
    },
    {
      term: 'Abbildungsmatrix',
      def: '$[f] \\in \\mathbb{R}^{m \\times n}$: die Matrix mit $f(x) = [f]\\,x$. Ihre Spalten sind die Bilder der Einheitsvektoren: $f(e_1), \\ldots, f(e_n)$.',
      calc: '- $f(e_1), \\ldots, f(e_n)$ berechnen\n- diese Vektoren als Spalten nebeneinanderschreiben → $[f]$',
    },
    {
      term: 'Kern und Bild einer linearen Abbildung',
      def: '- **Kern** $\\text{kern}(f) = \\text{kern}([f])$\n- **Bild** $\\text{im}(f) = \\text{col}([f])$',
    },
    {
      term: 'Injektiv / surjektiv / bijektiv bei linearen Abbildungen',
      def: '**In Worten:** Eine lineare Abbildung ist surjektiv, wenn ihr Bild der ganze Zielraum ist, und injektiv, wenn ihr Kern nur den Nullvektor enthält. Bei gleich großem Start- und Zielraum fallen die drei Eigenschaften zusammen.\n\n**Formal:** Für $f : \\mathbb{R}^n \\to \\mathbb{R}^m$ linear:\n- **surjektiv** $\\Leftrightarrow \\text{im}(f) = \\mathbb{R}^m$\n- **injektiv** $\\Leftrightarrow \\text{kern}(f) = \\{O\\}$\n- **bijektiv** $\\Leftrightarrow m = n$ und $[f]$ invertierbar\n- $m = n$: injektiv $\\Leftrightarrow$ surjektiv $\\Leftrightarrow$ bijektiv',
      calc: '- Abbildungsmatrix $[f] \\in \\mathbb{R}^{m \\times n}$ aufstellen\n- $\\text{rang}([f])$ bestimmen\n- **injektiv:** $\\text{rang} = n$\n- **surjektiv:** $\\text{rang} = m$\n- **bijektiv:** beides, also $m = n = \\text{rang}$',
    },
    {
      term: 'Festlegung durch eine Basis',
      def: '**In Worten:** Eine lineare Abbildung ist durch ihre Werte auf einer Basis vollständig festgelegt.\n\n**Formal:** Ist $b^1, \\ldots, b^n$ eine Basis: $$\\begin{aligned} &f, g \\text{ linear},\\ f(b^i) = g(b^i) \\ (i = 1, \\ldots, n) \\\\ \\Rightarrow\\ &f(v) = g(v) \\text{ für alle } v \\end{aligned}$$',
    },

    {
      term: 'Bild',
      calc: '- Abbildungsmatrix $[f]$ aufstellen (Spalten $f(e_1), \\ldots, f(e_n)$)\n- $[f]$ in Zeilenstufenform bringen\n- Spalten mit führendem Eintrag merken\n- die zugehörigen Spalten der **ursprünglichen** Matrix sind eine Basis von $\\text{im}(f)$\n\n$\\dim(\\text{im}(f)) = \\text{rang}([f])$.',
    },

    { chapter: '15 Basiswechsel' },
    {
      term: 'Eindeutige Darstellung',
      def: '**In Worten:** Bezüglich einer Basis lässt sich jeder Vektor des Unterraums auf genau eine Weise als Linearkombination der Basisvektoren schreiben.\n\n**Formal:** $b^1, \\ldots, b^k$ Basis von $U$ $\\Rightarrow$ $$\\begin{aligned} &\\forall v \\in U\\ \\exists!\\, \\mu_1, \\ldots, \\mu_k \\in \\mathbb{R}: \\\\ &v = \\mu_1 b^1 + \\dots + \\mu_k b^k \\end{aligned}$$',
    },
    {
      term: 'Koordinaten bezüglich einer Basis',
      def: 'Aus $v = \\mu_1 b^1 + \\dots + \\mu_k b^k$: $[v]_B = (\\mu_1, \\ldots, \\mu_k)^{\\mathrm{T}}$.\n\nBilden die Spalten von $B$ eine Basis von $\\mathbb{R}^n$: $[v]_B = B^{-1} v$.',
      calc: '- Basisvektoren als Spalten in $B$ schreiben\n- LGS $B\\,y = v$ lösen (oder $y = B^{-1} v$)\n- Lösung $y$ = $[v]_B$',
    },
    {
      term: 'Abbildungsmatrix bezüglich einer Basis',
      def: '$[f]_B$ hat die Spalten $[f(b^1)]_B, \\ldots, [f(b^n)]_B$. Berechnung: $$[f]_B = B^{-1}\\,[f]\\,B$$\n- es gilt $[f]_B\\,[x]_B = [f(x)]_B$',
      calc: '- $[f]$ aufstellen\n- $B$ aus den Basisvektoren als Spalten bilden\n- $B^{-1}$ berechnen\n- $[f]_B = B^{-1}\\,[f]\\,B$ ausmultiplizieren',
    },
    {
      term: 'Ziel des Basiswechsels',
      def: 'Zu einer linearen Abbildung $f : \\mathbb{R}^n \\to \\mathbb{R}^n$ eine Basis $B$ finden, in der $[f]_B$ möglichst einfach aussieht.\n- $v$ löst $[f]x = b$ $\\Leftrightarrow$ $[v]_B$ löst $[f]_B\\,y = [b]_B$',
    },

    { chapter: '16 Markov-Ketten' },
    {
      term: 'Markov-Kette (Autovermietung)',
      def: 'Verteilung $x$ der Autos auf die Standorte A, B, C; die Übergangsmatrix $A$ enthält, welcher Anteil von wo nach wo fährt.\n- nach einem Tag: $Ax$\n- nach $k$ Tagen: $A^k x$',
      calc: '- Übergangsmatrix aufstellen: Spalte $j$ = Anteile, die von Standort $j$ zu den Standorten gehen\n- Startverteilung $x$ als Spaltenvektor\n- nach $k$ Tagen: $A^k x$ ausrechnen',
    },
    {
      term: 'Potenzen per Basiswechsel',
      def: 'Für invertierbares $B$: $$A^k = B\\,([A]_B)^k\\,B^{-1}$$ Ist $[A]_B$ einfach (z. B. Diagonalmatrix), lässt sich $A^k$ für große $k$ leicht berechnen.',
      calc: '- Basis $B$ finden, in der $[A]_B = B^{-1} A B$ einfach ist (z. B. Diagonalmatrix)\n- $([A]_B)^k$ berechnen (bei Diagonalmatrix: Diagonaleinträge hoch $k$)\n- zurückrechnen: $A^k = B\\,([A]_B)^k\\,B^{-1}$',
    },
    {
      term: 'Grenzverteilung',
      def: 'Für große $k$ konvergiert $A^k x$ gegen eine feste Verteilung – im Beispiel $(\\tfrac{1}{5}, \\tfrac{2}{5}, \\tfrac{2}{5})^{\\mathrm{T}}$.\n- alle Spalten von $\\lim A^k$ sind gleich\n- daher landet jede Startverteilung (z. B. $(\\tfrac13, \\tfrac13, \\tfrac13)^{\\mathrm{T}}$) bei derselben Verteilung',
    },
    {
      term: 'Markov-Kette (Autovermietung)',
      img: 'schaltbilder/la-markov.svg',
      def: 'Übergangsanteile zwischen den Standorten A, B, C pro Tag.',
    },
    { chapter: '17 Eigenwerte und Eigenvektoren' },
    {
      term: 'Diagonalisierbarkeit',
      def: 'Eine lineare Abbildung $f : \\mathbb{R}^n \\to \\mathbb{R}^n$ mit Abbildungsmatrix $A$ heißt diagonalisierbar, falls es ein invertierbares $B \\in \\mathbb{R}^{n \\times n}$ gibt, sodass $$[f]_B = B^{-1}[f]B = B^{-1}AB$$ eine Diagonalmatrix ist.',
    },
    {
      term: 'Diagonalisierbar ⇔ Basis aus Eigenvektoren',
      def: '**In Worten:** Eine lineare Abbildung ist genau dann diagonalisierbar, wenn es eine Basis aus Eigenvektoren gibt. Die Diagonaleinträge sind dann die Eigenwerte.\n\n**Formal:**\n- für invertierbares $B$ mit Spalten $b_1, \\dots, b_n$ gilt: $B^{-1}[f]B$ ist Diagonalmatrix $\\Leftrightarrow$ $f(b_i) = \\lambda_i b_i$ für geeignete $\\lambda_1, \\dots, \\lambda_n \\in \\mathbb{R}$\n- $f$ ist diagonalisierbar $\\Leftrightarrow$ es gibt eine Basis $b_1, \\dots, b_n$ mit $f(b_i) = \\lambda_i b_i$\n- für Matrizen: $A$ diagonalisierbar $\\Leftrightarrow$ es gibt eine Basis mit $Ab_i = \\lambda_i b_i$\n- die Diagonaleinträge von $B^{-1}AB$ sind dann $\\lambda_1, \\dots, \\lambda_n$',
      calc: '- Eigenwerte $\\lambda_i$ von $A$ bestimmen\n- zu jedem $\\lambda_i$ Eigenvektoren bestimmen\n- gibt es $n$ linear unabhängige Eigenvektoren $b_1, \\dots, b_n$: als Spalten in $B$ schreiben\n- dann ist $B^{-1}AB = \\mathrm{diag}(\\lambda_1, \\dots, \\lambda_n)$',
    },
    {
      term: 'Eigenwert, Eigenvektor',
      def: '- $\\lambda \\in \\mathbb{R}$ ist Eigenwert von $A \\in \\mathbb{R}^{n \\times n}$, falls es $v \\in \\mathbb{R}^n \\setminus \\{O\\}$ gibt mit $$Av = \\lambda v$$\n- $v$ heißt dann Eigenvektor von $A$ zum Eigenwert $\\lambda$\n- der Nullvektor ist nie Eigenvektor',
      calc: '- prüfen, ob $v$ Eigenvektor ist: $Av$ ausrechnen\n- ist $Av$ ein Vielfaches $\\lambda v$ von $v$ (und $v \\neq O$), ist $v$ Eigenvektor zum Eigenwert $\\lambda$\n- Beispiel: $\\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}\\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 3 \\\\ 3 \\end{pmatrix} = 3\\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}$ → Eigenwert $3$',
    },
    {
      term: 'Eigenwert über LGS',
      def: '**In Worten:** $\\lambda$ ist genau dann ein Eigenwert, wenn das homogene LGS mit der Matrix $\\lambda I - A$ eine Lösung $\\neq O$ hat. Diese Lösungen sind genau die Eigenvektoren.\n\n**Formal:** $$\\begin{aligned} &\\lambda \\text{ Eigenwert von } A \\\\ \\Leftrightarrow\\ &\\exists x \\neq O: (\\lambda I - A)x = O \\end{aligned}$$\n- die Lösungen $x \\neq O$ sind genau die Eigenvektoren zu $\\lambda$',
      calc: '- $\\lambda I - A$ aufstellen\n- LGS $(\\lambda I - A)x = O$ mit Gauß lösen\n- freie Variablen als Parameter → alle Lösungen $\\neq O$ sind Eigenvektoren',
    },
    {
      term: 'Kriterien für Eigenwerte',
      def: '**In Worten:** $\\lambda$ ist genau dann Eigenwert von $A$, wenn $\\lambda I - A$ einen nicht-trivialen Kern hat, also nicht invertierbar ist.\n\n**Formal:** Für $A \\in \\mathbb{R}^{n \\times n}$ und $\\lambda \\in \\mathbb{R}$ sind äquivalent:\n- $\\lambda$ ist Eigenwert von $A$\n- $\\ker(\\lambda I - A) \\neq \\{O\\}$\n- $\\lambda I - A$ ist nicht invertierbar\n\nFolgerung: $A$ ist genau dann invertierbar, wenn $0$ kein Eigenwert ist.',
    },
    {
      term: 'Eigenraum',
      def: 'Für einen Eigenwert $\\lambda$ von $A$ heißt $$E_\\lambda(A) := \\ker(\\lambda I - A)$$ der Eigenraum von $\\lambda$ bezüglich $A$.\n- enthält alle Eigenvektoren zu $\\lambda$ und zusätzlich $O$\n- ist ein Unterraum',
      calc: '- $\\lambda I - A$ aufstellen\n- Kern bestimmen: $(\\lambda I - A)x = O$ lösen\n- Lösungsmenge als Spann von Basisvektoren schreiben → $E_\\lambda(A)$',
    },
    {
      term: 'Invertierbarkeit (2×2-Matrix)',
      def: '**In Worten:** Eine $2 \\times 2$-Matrix ist genau dann invertierbar, wenn „Hauptdiagonale mal minus Nebendiagonale mal“ nicht 0 ist.\n\n**Formal:** $$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\text{ invertierbar} \\;\\Leftrightarrow\\; ad - bc \\neq 0$$\n- damit: $\\lambda$ ist Eigenwert $\\Leftrightarrow$ $\\lambda I - A$ nicht invertierbar $\\Leftrightarrow$ $\\det(\\lambda I - A) = 0$',
      calc: '- $\\lambda I - A = \\begin{pmatrix} \\lambda - a & -b \\\\ -c & \\lambda - d \\end{pmatrix}$\n- Bedingung: $(\\lambda - a)(\\lambda - d) - bc = 0$\n- quadratische Gleichung in $\\lambda$ lösen → Eigenwerte\n- Beispiel $\\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$: $(\\lambda - 2)^2 - 1 = 0$ → $\\lambda = 1$ oder $\\lambda = 3$',
    },

    { chapter: '18 Determinanten' },
    {
      term: 'Permutation',
      def: '- Permutation von $\\{1, \\dots, n\\}$: bijektive Abbildung $\\sigma : \\{1, \\dots, n\\} \\to \\{1, \\dots, n\\}$\n- $S_n$: Menge aller Permutationen von $\\{1, \\dots, n\\}$\n- Verkettungen von Permutationen sind wieder Permutationen\n- die Umkehrabbildung einer Permutation ist ebenfalls eine Permutation',
    },
    {
      term: 'Transposition',
      def: 'Eine Permutation, die genau zwei Zahlen vertauscht und alle anderen festlässt.\n- Signatur jeder Transposition: $\\operatorname{sgn}(\\tau) = -1$',
    },
    {
      term: 'Fehlstand, Signatur',
      def: '- Fehlstand von $\\sigma \\in S_n$: Paar $(i, j)$ mit $i < j$ und $\\sigma(i) > \\sigma(j)$\n- $k$ = Anzahl der Fehlstände: $$\\operatorname{sgn}(\\sigma) = (-1)^k$$\n- Identität: keine Fehlstände, also $\\operatorname{sgn} = 1$',
      calc: '- alle Paare $(i, j)$ mit $i < j$ durchgehen\n- zählen, wie oft $\\sigma(i) > \\sigma(j)$ gilt → $k$\n- $\\operatorname{sgn}(\\sigma) = (-1)^k$\n- Beispiel $\\sigma = (3, 1, 2)$ (d. h. $\\sigma(1)=3$, $\\sigma(2)=1$, $\\sigma(3)=2$): Fehlstände $(1,2)$, $(1,3)$ → $k = 2$, $\\operatorname{sgn} = 1$',
    },
    {
      term: 'Produktformel der Signatur',
      def: '**In Worten:** Die Signatur einer Permutation ist das Produkt der Quotienten $\\frac{\\sigma(j) - \\sigma(i)}{j - i}$ über alle Paare $i < j$.\n\n**Formal:** Für $\\sigma \\in S_n$: $$\\operatorname{sgn}(\\sigma) = \\prod_{1 \\le i < j \\le n} \\frac{\\sigma(j) - \\sigma(i)}{j - i}$$',
    },
    {
      term: 'Rechenregeln der Signatur',
      def: '**In Worten:** Jede Transposition hat Signatur $-1$. Die Signatur einer Verkettung ist das Produkt der Signaturen, und die Umkehrpermutation hat dieselbe Signatur.\n\n**Formal:** Für $\\sigma, \\pi \\in S_n$ und eine Transposition $\\tau$:\n- $\\operatorname{sgn}(\\tau) = -1$\n- $\\operatorname{sgn}(\\sigma \\circ \\pi) = \\operatorname{sgn}(\\sigma)\\operatorname{sgn}(\\pi)$\n- $\\operatorname{sgn}(\\sigma^{-1}) = \\operatorname{sgn}(\\sigma)$',
    },
    {
      term: 'Determinante (Definition)',
      def: 'Für $A = (a_{i,j}) \\in \\mathbb{R}^{n \\times n}$: $$\\det(A) = \\sum_{\\sigma \\in S_n} \\operatorname{sgn}(\\sigma)\\, a_{1,\\sigma(1)}\\, a_{2,\\sigma(2)} \\cdots a_{n,\\sigma(n)}$$\n- pro Permutation ein Produkt mit genau einem Eintrag aus jeder Zeile und jeder Spalte',
    },
    {
      term: 'Determinante (2×2)',
      def: '$$\\det\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc$$',
      calc: '- Hauptdiagonale multiplizieren: $ad$\n- Nebendiagonale multiplizieren: $bc$\n- abziehen: $ad - bc$\n- Beispiel: $\\det\\begin{pmatrix} 3 & 2 \\\\ 1 & 4 \\end{pmatrix} = 12 - 2 = 10$',
    },
    {
      term: 'Determinante (3×3)',
      def: 'Für $A = \\begin{pmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{pmatrix}$: $$\\begin{aligned} \\det(A) = {} & aei + bfg + cdh \\\\ & - ceg - afh - bdi \\end{aligned}$$',
      calc: '- drei „Abwärts-Diagonalen“ (zyklisch) addieren: $aei + bfg + cdh$\n- drei „Aufwärts-Diagonalen“ abziehen: $ceg + afh + bdi$\n- Beispiel: $\\det\\begin{pmatrix} 1 & 2 & 0 \\\\ 0 & 1 & 3 \\\\ 1 & 0 & 1 \\end{pmatrix} = 1 + 6 + 0 - 0 - 0 - 0 = 7$',
    },
    {
      term: 'Determinante einer Dreiecksmatrix',
      def: '**In Worten:** Die Determinante einer (oberen oder unteren) Dreiecksmatrix ist das Produkt ihrer Diagonaleinträge.\n\n**Formal:** $$\\begin{aligned} &A \\text{ Dreiecksmatrix} \\\\ \\Rightarrow\\ &\\det(A) = a_{1,1} \\cdot a_{2,2} \\cdots a_{n,n} \\end{aligned}$$\n- insbesondere $\\det(I) = 1$',
      calc: '- Diagonaleinträge multiplizieren\n- Beispiel: $\\det\\begin{pmatrix} 2 & 5 & 1 \\\\ 0 & 3 & 7 \\\\ 0 & 0 & 4 \\end{pmatrix} = 2 \\cdot 3 \\cdot 4 = 24$',
    },
    {
      term: 'Nullzeile und Transponierte',
      def: '**In Worten:** Eine Matrix mit einer Nullzeile hat Determinante 0. Transponieren ändert die Determinante nicht – deshalb gelten alle Zeilenregeln auch für Spalten.\n\n**Formal:**\n- $A$ hat eine Nullzeile $\\Rightarrow$ $\\det(A) = 0$\n- $\\det(A) = \\det(A^{\\mathrm{T}})$ für alle $A \\in \\mathbb{R}^{n \\times n}$',
    },
    {
      term: 'Multilinearität',
      def: '**In Worten:** Die Determinante ist in jeder einzelnen Zeile linear: Eine Summe in einer Zeile teilt die Determinante in eine Summe auf, ein Faktor einer Zeile lässt sich herausziehen.\n\n**Formal:** $A_z$: Matrix $A$, deren $k$-te Zeile durch $z$ ersetzt ist.\n- $\\det(A_{x+y}) = \\det(A_x) + \\det(A_y)$\n- $\\det(A_{\\lambda x}) = \\lambda \\det(A_x)$\n- Folgerung: $\\det(\\lambda A) = \\lambda^n \\det(A)$',
      calc: '- $\\det(\\lambda A)$: Faktor $\\lambda$ aus jeder der $n$ Zeilen herausziehen\n- Beispiel: $A \\in \\mathbb{R}^{3 \\times 3}$, $\\det(A) = 2$ → $\\det(2A) = 2^3 \\cdot 2 = 16$',
    },
    {
      term: 'Zeilen vertauschen',
      def: '**In Worten:** Vertauscht man die Zeilen einer Matrix, ändert sich die Determinante um das Vorzeichen (die Signatur) der Vertauschung. Eine einzelne Vertauschung kehrt das Vorzeichen um.\n\n**Formal:**\n- entsteht $B$ aus $A$, indem Zeile $i$ von $B$ die Zeile $\\sigma(i)$ von $A$ ist: $\\det(B) = \\operatorname{sgn}(\\sigma)\\det(A)$\n- Vertauschen zweier Zeilen ändert das Vorzeichen der Determinante\n- zwei identische Zeilen: $\\det(A) = 0$\n- Vielfaches einer Zeile zu einer anderen addieren: Determinante bleibt gleich',
    },
    {
      term: 'Determinante mit Zeilenumformungen',
      def: '**In Worten:** Zeilenumformungen ändern die Determinante auf vorhersagbare Weise – so lässt sie sich über die Zeilenstufenform berechnen.\n\n**Formal:** Entsteht $B$ aus $A$ durch\n- Multiplikation einer Zeile mit $\\lambda$: $\\det(B) = \\lambda \\det(A)$\n- Vertauschen zweier Zeilen: $\\det(B) = -\\det(A)$\n- Addition eines Vielfachen einer Zeile zu einer anderen: $\\det(B) = \\det(A)$\n\nGilt genauso für Spaltenoperationen.',
      calc: '- mit Zeilenumformungen auf Dreiecksform bringen\n- dabei mitzählen: jede Vertauschung → Faktor $-1$, jede Skalierung mit $\\lambda$ → durch $\\lambda$ teilen\n- Determinante der Dreiecksmatrix = Produkt der Diagonale, dann korrigieren\n- Beispiel: $\\begin{pmatrix} 0 & 2 \\\\ 3 & 1 \\end{pmatrix}$ → vertauschen → $\\begin{pmatrix} 3 & 1 \\\\ 0 & 2 \\end{pmatrix}$, $\\det = -(3 \\cdot 2) = -6$',
    },
    {
      term: 'Multiplikationssatz',
      def: '**In Worten:** Die Determinante eines Produkts ist das Produkt der Determinanten.\n\n**Formal:** $$\\det(AB) = \\det(A)\\det(B)$$ für alle $A, B \\in \\mathbb{R}^{n \\times n}$',
      calc: '- Determinanten einzeln berechnen und multiplizieren\n- Beispiel: $\\det(A) = 2$, $\\det(B) = -3$ → $\\det(AB) = -6$, $\\det(A^2) = 4$',
    },
    {
      term: 'Determinante und Inverse',
      def: '**In Worten:** Eine Matrix ist genau dann invertierbar, wenn ihre Determinante nicht 0 ist. Die Determinante der Inversen ist dann der Kehrwert.\n\n**Formal:**\n- $A$ invertierbar $\\Leftrightarrow$ $\\det(A) \\neq 0$\n- dann $\\det(A^{-1}) = \\dfrac{1}{\\det(A)}$\n- Eigenwerte: $\\lambda$ ist Eigenwert $\\Leftrightarrow$ $\\det(\\lambda I - A) = 0$',
      calc: '- $\\det(A)$ berechnen\n- $\\det(A) = 0$ → nicht invertierbar, sonst invertierbar\n- Beispiel: $\\det(A) = 4$ → $\\det(A^{-1}) = \\tfrac14$',
    },
    {
      term: 'Hauptsatz invertierbarer Matrizen',
      def: '**In Worten:** Für eine quadratische Matrix sind alle folgenden Aussagen gleichwertig – gilt eine, gelten alle.\n\n**Formal:** Für $A \\in \\mathbb{R}^{n \\times n}$ mit linearer Abbildung $f$ sind äquivalent:\n- $A$ ist invertierbar\n- $Ax = b$ hat für jedes $b$ eine eindeutige Lösung\n- $Ax = O$ hat nur die triviale Lösung\n- strenge Zeilenstufenform von $A$ ist $I$\n- $A$ ist Produkt von Elementarmatrizen\n- $\\ker(A) = \\{O\\}$, $\\operatorname{rang}(A) = n$\n- $f$ ist bijektiv, injektiv bzw. surjektiv\n- $\\det(A) \\neq 0$\n- $0$ ist kein Eigenwert von $A$',
    },
  ],
});
