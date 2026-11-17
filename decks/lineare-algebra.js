/* Lernset Lineare Algebra 1 (Skript „Lineare Algebra EI“, WS 26/27).
 * Format wie in decks.js. Mehrere Dinge auf einer Rückseite → je ein Stichpunkt.
 */
window.DECKS = window.DECKS || [];
window.DECKS.push({
  id: 'lineare-algebra-1',
  name: 'Lineare Algebra 1',
  color: 'lilac',
  description: 'Skript Lineare Algebra EI: Vektoren, LGS, Gauß, Matrizen, Inverse, Unterräume, Rang, lineare Abbildungen, Basiswechsel, Markov-Ketten.',
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
      def: '$$|\\langle v, w \\rangle| \\le \\|v\\|_2 \\cdot \\|w\\|_2$$',
    },
    {
      term: 'Dreiecksungleichung',
      def: '$$\\|v + w\\|_2 \\le \\|v\\|_2 + \\|w\\|_2$$',
    },
    {
      term: 'Orthogonalität',
      def: '$v$ und $w$ heißen orthogonal, wenn $\\langle v, w \\rangle = 0$.',
      calc: '- Skalarprodukt $\\langle v, w \\rangle$ berechnen\n- ist es 0 → orthogonal, sonst nicht',
    },
    {
      term: 'Satz von Pythagoras',
      def: 'Äquivalent sind:\n- $v$ und $w$ sind orthogonal\n- $\\|v + w\\|_2^2 = \\|v\\|_2^2 + \\|w\\|_2^2$',
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
      def: 'LGS in Dreiecksform mit $a_{1,1}, \\ldots, a_{n,n} \\neq 0$ hat genau eine Lösung:\n- $x_n = \\frac{b_n}{a_{n,n}}$\n- $x_i = \\frac{1}{a_{i,i}}\\left(b_i - a_{i,i+1}x_{i+1} - \\dots - a_{i,n}x_n\\right)$ für $i = n-1, \\ldots, 1$',
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
      def: 'Ist das LGS mit Koeffizientenmatrix $A$ in $n$ Variablen lösbar, gilt: $$\\text{rang}(A) = \\#\\text{abhängige Variablen} = n - \\#\\text{freie Variablen}$$',
    },
    {
      term: 'Lösbarkeit eines LGS',
      def: 'Äquivalent sind:\n- das LGS ist lösbar\n- die erweiterte Koeffizientenmatrix in ZSF hat keine Zeile $(0 \\ldots 0 \\mid \\beta)$ mit $\\beta \\neq 0$\n- $\\text{rang}(A) = \\text{rang}(A \\mid b)$',
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
      def: 'Alle rechten Seiten sind Null: $Ax = O$.\n- hat immer die Lösung $x = O$\n- mehr Variablen als Gleichungen → unendlich viele Lösungen',
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
      def: 'Vektoren sind genau dann linear abhängig, wenn …\n- einer von ihnen eine Linearkombination der anderen ist\n- (Spalten von $A$) $(A \\mid O)$ unendlich viele Lösungen hat\n- (Zeilen von $A$, $m$ Zeilen) $\\text{rang}(A) < m$ gilt\n\nMehr als $n$ Vektoren im $\\mathbb{R}^n$ sind immer linear abhängig.',
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
      def: 'Sind $v$ und $w$ Lösungen von $Ax = b$, dann ist auch jedes $\\lambda v + (1 - \\lambda) w$ eine Lösung.',
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
      def: 'Ist $A$ invertierbar, hat $Ax = b$ genau eine Lösung: $x = A^{-1} b$.',
    },
    {
      term: 'Inverse einer 2×2-Matrix',
      def: 'Für $ad - bc \\neq 0$: $$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}^{-1} = \\frac{1}{ad - bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$$',
    },
    {
      term: 'Rechenregeln Inverse',
      def: '- $(A^{-1})^{-1} = A$\n- $(\\lambda A)^{-1} = \\frac{1}{\\lambda} A^{-1}$\n- $(AB)^{-1} = B^{-1} A^{-1}$ (umgekehrte Reihenfolge)\n- $(A^{\\mathrm{T}})^{-1} = (A^{-1})^{\\mathrm{T}}$\n- $(A^n)^{-1} = (A^{-1})^n$',
    },
    {
      term: 'Einseitige Inverse genügt',
      def: 'Für quadratische $A, B$: Gilt $AB = I$ **oder** $BA = I$, dann ist $A$ invertierbar und $A^{-1} = B$.',
    },
    {
      term: 'Hauptsatz invertierbarer Matrizen',
      def: 'Für $A \\in \\mathbb{R}^{n \\times n}$ mit Abbildung $f(x) = Ax$ sind äquivalent:\n- $A$ ist invertierbar\n- $Ax = b$ hat für jedes $b$ genau eine Lösung\n- $Ax = O$ hat nur die triviale Lösung\n- strenge ZSF von $A$ ist $I$\n- $A$ ist Produkt elementarer Matrizen\n- $\\text{kern}(A) = \\{O\\}$\n- $\\text{rang}(A) = n$\n- $f$ ist bijektiv / injektiv / surjektiv',
    },

    { chapter: '12 Unterräume und Basen' },
    {
      term: 'Lineares Erzeugnis (Span)',
      def: '$\\text{span}(\\{v^1, \\ldots, v^k\\})$: Menge aller Linearkombinationen von $v^1, \\ldots, v^k$. Ist immer ein Unterraum.',
    },
    {
      term: 'Lösbarkeit über den Span',
      def: 'Äquivalent sind:\n- $(A \\mid b)$ hat eine Lösung\n- $b$ ist eine Linearkombination der Spalten von $A$\n- $b$ liegt im Span der Spalten von $A$',
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
      def: 'Ist $x\'$ eine Lösung von $Ax = b$, dann gilt:\n- $x\' + x^0$ ist für jedes $x^0 \\in \\text{kern}(A)$ ebenfalls eine Lösung\n- jede Lösung hat diese Form\n\nKurz: Lösungsmenge = spezielle Lösung + Kern.',
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
      def: 'Für jede $(m \\times n)$-Matrix $A$: $$\\text{rang}(A) + \\dim(\\text{kern}(A)) = n$$',
    },
    {
      term: 'Zeilenrang = Spaltenrang',
      def: '$\\text{rang}(A) = \\dim(\\text{row}(A)) = \\dim(\\text{col}(A))$, also ist der Rang …\n- die größte Anzahl linear unabhängiger Zeilen\n- die größte Anzahl linear unabhängiger Spalten\n\nAußerdem $\\text{rang}(A) = \\text{rang}(A^{\\mathrm{T}})$.',
    },

    { chapter: '14 Lineare Abbildungen' },
    {
      term: 'Lineare Abbildung',
      def: '$f : \\mathbb{R}^n \\to \\mathbb{R}^m$ mit:\n- $f(v + w) = f(v) + f(w)$\n- $f(\\lambda v) = \\lambda f(v)$\n\nFolgt immer: $f(O) = O$.',
    },
    {
      term: 'Matrizen und lineare Abbildungen',
      def: '- jede Matrix $A$ liefert eine lineare Abbildung $f(x) = Ax$\n- jede lineare Abbildung $f$ hat eine Matrix $A$ mit $f(x) = Ax$',
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
      def: '- **surjektiv** $\\Leftrightarrow \\text{im}(f) = \\mathbb{R}^m$\n- **injektiv** $\\Leftrightarrow \\text{kern}(f) = \\{O\\}$\n- **bijektiv** $\\Leftrightarrow m = n$ und $[f]$ invertierbar\n\nFür $f : \\mathbb{R}^n \\to \\mathbb{R}^n$ sind injektiv, surjektiv und bijektiv äquivalent.',
      calc: '- Abbildungsmatrix $[f] \\in \\mathbb{R}^{m \\times n}$ aufstellen\n- $\\text{rang}([f])$ bestimmen\n- **injektiv:** $\\text{rang} = n$\n- **surjektiv:** $\\text{rang} = m$\n- **bijektiv:** beides, also $m = n = \\text{rang}$',
    },
    {
      term: 'Festlegung durch eine Basis',
      def: 'Stimmen zwei lineare Abbildungen $f, g$ auf einer Basis $b^1, \\ldots, b^n$ überein, dann gilt $f(v) = g(v)$ für alle $v$.',
    },

    {
      term: 'Bild',
      calc: '- Abbildungsmatrix $[f]$ aufstellen (Spalten $f(e_1), \\ldots, f(e_n)$)\n- $[f]$ in Zeilenstufenform bringen\n- Spalten mit führendem Eintrag merken\n- die zugehörigen Spalten der **ursprünglichen** Matrix sind eine Basis von $\\text{im}(f)$\n\n$\\dim(\\text{im}(f)) = \\text{rang}([f])$.',
    },

    { chapter: '15 Basiswechsel' },
    {
      term: 'Eindeutige Darstellung',
      def: 'Ist $b^1, \\ldots, b^k$ eine Basis von $U$, lässt sich jedes $v \\in U$ auf genau eine Weise als Linearkombination der $b^i$ schreiben.',
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
  ],
});
