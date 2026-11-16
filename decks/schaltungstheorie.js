/* Lernset Schaltungstheorie (Vorlesungsskriptum WS 26/27, TUM).
 * Format wie in decks.js. Zusätzlich: Karten mit `img` sind Schaltbild-Karten
 * (eine Seite Begriff, andere Seite das Schaltbild aus schaltbilder/).
 */
window.DECKS = window.DECKS || [];
window.DECKS.push({
  id: 'schaltungstheorie',
  name: 'Schaltungstheorie',
  color: 'mint',
  description: 'Vorlesungsskriptum WS 26/27: Kirchhoff, resistive Ein-/Zwei-/Mehrtore, OPV, Analyseverfahren, Netzwerkeigenschaften, Reaktanzen, Wechselstromrechnung.',
  cards: [
    { chapter: '1 Grundlagen' },
    {
      term: 'Signal',
      def: 'Zeitverlauf einer elektrischen Größe (meist Spannung oder Strom), dem man eine bestimmte Bedeutung beimisst. Eine Quelle, die es erzeugt, heißt Signalquelle.',
    },
    {
      term: 'Gleichanteil und Wechselanteil',
      def: 'Zerlegung eines Signals $u(t) = U_{\\text{AP}} + \\Delta u(t)$:\n- **Gleichanteil** $U_{\\text{AP}}$: konstant, stellt die Betriebsbedingungen ein\n- **Wechselanteil** $\\Delta u(t)$: trägt die Information',
    },
    {
      term: 'Netzwerkelement',
      def: 'Idealisiertes Modell eines Bauelements mit präziser mathematischer Beschreibung des Zusammenhangs seiner elektrischen Größen (nur Klemmenverhalten).',
    },
    {
      term: 'Netzwerk',
      def: 'Modell einer realen Schaltung aus verbundenen Netzwerkelementen; Verbindungsleitungen werden meist als perfekt leitend angenommen.',
    },
    {
      term: 'Konzentriertheitshypothese',
      def: 'Die räumliche Ausdehnung $d$ der Schaltung ist so klein gegenüber der Wellenlänge, dass Ströme und Spannungen nicht vom Ort abhängen: $d \\ll \\lambda$.',
      more: 'Wellenlänge aus Frequenz $f$ bzw. Signaldauer $T$:\n$$\\lambda = \\frac{c}{f} = c\\,T$$\nmit $c \\approx 3 \\cdot 10^8\\,\\text{m/s}$ (Lichtgeschwindigkeit im Vakuum).\n\nIst $d \\ll \\lambda$ nicht erfüllt, braucht man statt Schaltungstheorie die Elektrodynamik (Maxwell). Analogie: Newton’sche Mechanik vs. Relativitätstheorie.',
      moreLabel: 'Methode',
    },

    { chapter: '2 Kirchhoff-Gesetze' },
    {
      term: 'Zählpfeile (Bezugsrichtungen)',
      def: 'Legen die Referenzrichtung von Spannungen und Strömen fest (wie die Orientierung eines Messgeräts). Positives Vorzeichen: tatsächliche Richtung = Pfeilrichtung.',
    },
    {
      term: 'Tor (Klemmenpaar)',
      def: 'Zwei Klemmen bilden ein Tor, wenn die über sie fließenden Ströme entgegengesetzt gleich sind.',
    },
    {
      term: 'Assoziierte Zählpfeilrichtungen',
      def: 'Strom- und Spannungszählpfeil an einem Klemmenpaar zeigen in dieselbe Richtung (Verbraucherzählpfeilsystem).',
    },
    {
      term: 'n-Tor',
      def: '$2n$-Pol, dessen $2n$ Klemmenströme paarweise entgegengesetzt gleich sind.\n- ein Zweipol ist stets ein Eintor\n- ein Dreipol kann durch Beschaltung zum Zweitor werden',
    },
    {
      term: 'Mehrtore und Mehrpole',
      img: 'schaltbilder/mehrtore-mehrpole.svg',
      def: 'Links: $n$-Tor (Ströme paarweise entgegengesetzt gleich). Rechts: Dreipol als Zweitor betrieben.',
    },
    {
      term: 'Kirchhoff’sches Stromgesetz (KCL)',
      def: 'Knotenregel: Zu jedem Zeitpunkt verschwindet die Summe aller aus einem Knoten herausfließenden Ströme: $\\sum_j i_j(t) = 0$.',
      calc: 'Knotengleichung aufstellen:\n- Knoten (oder Hülle) wählen\n- alle Ströme, die herausfließen, mit $+$, hineinfließende mit $-$ addieren\n- Summe $= 0$ setzen',
      more: '- Formulierung der **Ladungserhaltung** für konzentrierte Netzwerke\n- gilt für jede geschlossene Hülle, die kein Element durchtrennt\n- herausfließende Ströme positiv, hineinfließende negativ zählen\n- gilt auch für **Superknoten** (Hülle um mehrere Knoten)',
      moreLabel: 'Methode',
    },
    {
      term: 'Superknoten',
      def: 'Hülle, die mehr als einen Knoten (z. B. zwei Knoten und einen Zweipol) umschließt. Das KCL gilt dafür sinngemäß.',
    },
    {
      term: 'Knotenpotential',
      def: 'Skalare Größe je Knoten, eindeutig bis auf eine gemeinsame Konstante. Ein Bezugsknoten wird auf Potential 0 gesetzt.',
    },
    {
      term: 'Knotenspannung',
      def: 'Spannung zwischen einem Knoten und dem Bezugsknoten. Spannung zwischen zwei Knoten: $u_{\\alpha\\beta} = u_\\alpha - u_\\beta$.',
    },
    {
      term: 'Kirchhoff’sches Spannungsgesetz (KVL)',
      def: 'Maschenregel: Zu jedem Zeitpunkt verschwindet die algebraische Summe aller Spannungen eines geschlossenen Umlaufs: $\\sum_k u_k(t) = 0$.',
      calc: 'Maschengleichung aufstellen:\n- Umlauf mit Richtung wählen\n- Spannungen in Umlaufrichtung mit $+$, entgegen mit $-$ addieren\n- Summe $= 0$ setzen',
      more: '- Formulierung des **Induktionsgesetzes** für konzentrierte Netzwerke (kein zeitlich veränderlicher Fluss außerhalb der Elemente)\n- Spannungen in Umlaufrichtung positiv, entgegen negativ zählen\n- Beispiel: $u_1 + u_2 + u_3 - u_4 = 0$\n- folgt daraus, dass Spannungen Differenzen von Knotenpotentialen sind',
      moreLabel: 'Methode',
    },
    {
      term: 'Umlauf und Schleife',
      def: '- **Umlauf:** geschlossene Knotenfolge, z. B. $\\alpha\\beta\\eta\\lambda\\alpha$\n- **Schleife:** Umlauf, der stets entlang von Netzwerkelementen verläuft',
    },

    { chapter: '3 Resistive Eintore' },
    {
      term: 'Resistives Eintor',
      def: 'Eintor (Widerstand), dessen Klemmengrößen $u(t)$ und $i(t)$ zu jedem Zeitpunkt in einer Relation stehen, die nicht von der Vorgeschichte abhängt (gedächtnislos).',
    },
    {
      term: 'Betriebspunkt',
      def: 'Paar $(u, i)$, das am Eintor gleichzeitig auftreten kann – ein zulässiger Punkt der $u$-$i$-Ebene (Betriebsebene).',
    },
    {
      term: 'Kennlinie (Charakteristik)',
      def: 'Menge aller Betriebspunkte eines Eintors: $\\mathcal{F} = \\{(u, i) \\mid (u,i) \\text{ ist Betriebspunkt}\\}$.',
    },
    {
      term: 'Zeitinvariant vs. zeitvariant',
      def: '- **Zeitinvariant:** Kennlinie ist zu allen Zeitpunkten dieselbe\n- **Zeitvariant:** Kennlinie ändert sich mit $t$ (z. B. Schalter)',
    },
    {
      term: 'Implizite Darstellung',
      def: 'Kennlinie als Nullstellenmenge einer konstituierenden Funktion: $\\mathcal{F} = \\{(u,i) \\mid f_\\mathcal{F}(u,i) = 0\\}$. Nicht eindeutig.',
    },
    {
      term: 'Parameterdarstellung',
      def: 'Beide Betriebsgrößen als Funktion eines Parameters $\\lambda$: $\\mathcal{F} = \\{(u_\\mathcal{F}(\\lambda), i_\\mathcal{F}(\\lambda)) \\mid \\lambda \\in \\mathbb{R}\\}$. Nicht eindeutig.',
    },
    {
      term: 'Explizite Darstellung',
      def: 'Eine Betriebsgröße als Funktion der anderen (steuernden) Größe. Eindeutig, sobald die steuernde Größe gewählt ist; meist am praktischsten.',
    },
    {
      term: 'Spannungsgesteuert (Leitwertsdarstellung)',
      def: 'Der Strom ist eine Funktion der Spannung: $i = g_\\mathcal{F}(u)$.',
    },
    {
      term: 'Stromgesteuert (Widerstandsdarstellung)',
      def: 'Die Spannung ist eine Funktion des Stroms: $u = r_\\mathcal{F}(i)$.',
    },
    {
      term: 'Ungepolt (bilateral)',
      def: 'Kennlinie ist punktsymmetrisch zum Ursprung: $(u,i) \\in \\mathcal{F} \\Rightarrow (-u,-i) \\in \\mathcal{F}$. Die Klemmen sind vertauschbar; symmetrisches Symbol.',
    },
    {
      term: 'Leistung eines Eintors',
      def: 'Aufgenommene Leistung $p(t) = u(t)\\,i(t)$ (assoziierte Zählpfeile):\n- $p > 0$: Leistung wird verbraucht\n- $p < 0$: Leistung wird abgegeben',
    },
    {
      term: 'Aktiv vs. passiv',
      def: '- **Aktiv:** Es gibt einen Betriebspunkt mit $ui < 0$ (gibt Leistung ab)\n- **Passiv:** $ui \\ge 0$ für alle Betriebspunkte – Kennlinie nur im I. und III. Quadranten',
    },
    {
      term: 'Verlustlos vs. verlustbehaftet',
      def: '- **Verlustlos:** $ui = 0$ in allen Betriebspunkten – Kennlinie liegt ganz auf den Achsen\n- **Verlustbehaftet:** Es gibt einen Punkt mit $ui \\neq 0$',
    },
    {
      term: 'Quellenfrei',
      def: 'Die Kennlinie enthält den Ursprung: $(0, 0) \\in \\mathcal{F}$.',
    },
    {
      term: 'Dualität (Eintore)',
      def: 'Zwei Eintore sind dual bzgl. der Dualitätskonstante $R_d$, wenn man die Kennlinie des einen durch Ersetzen $u \\to R_d\\, i$ und $i \\to u / R_d$ aus der des anderen erhält.',
      more: '- grafisch: Spiegelung der Kennlinie an der Winkelhalbierenden (bei passender Skalierung)\n- spannungsgesteuert ↔ stromgesteuert\n- erhalten bleiben: gepolt/ungepolt, aktiv/passiv, verlustlos/verlustbehaftet, zeitvariant/zeitinvariant\n- Arbeitsersparnis: von zwei dualen Schaltungen muss man nur eine untersuchen',
      moreLabel: 'Eigenschaften',
    },
    {
      term: 'Streng linear',
      def: 'Kennlinie ist ein Untervektorraum:\n- mit $(u,i)$ ist auch $(ku, ki)$ enthalten\n- mit zwei Punkten auch ihre Summe\n\nDaraus folgt: quellenfrei und ungepolt.',
    },
    {
      term: 'Nullator',
      def: 'Streng lineares Element, dessen Kennlinie nur der Ursprung ist: $u = 0$ und $i = 0$. Verlustlos und zu sich selbst dual.',
      more: 'Kennlinie: Untervektorraum der Dimension 0, also $\\mathcal{F}_0 = \\{(0,0)\\}$.\n\nVerwendung: Bestandteil idealisierter Bauelementmodelle, z. B. Eingangstor eines Operationsverstärkers im linearen Bereich (Nullor).',
      moreLabel: 'Methode',
    },
    {
      term: 'Nullator',
      img: 'schaltbilder/nullator.svg',
      def: 'Kennlinie: nur der Ursprung ($u = 0$, $i = 0$).',
    },
    {
      term: 'Ohm’sches Gesetz',
      def: 'Kennlinie eines streng linearen Widerstands ist eine Ursprungsgerade: $i = G\\,u$ bzw. $u = R\\,i$ mit $R = \\frac{1}{G}$.',
    },
    {
      term: 'Leitwert $G$',
      def: 'Steigung der Widerstandsgeraden im $u$-$i$-Diagramm: $G = \\frac{i}{u}$. Einheit Siemens: $1\\,\\text{S} = \\frac{1\\,\\text{A}}{1\\,\\text{V}}$.',
    },
    {
      term: 'Widerstand $R$',
      def: 'Kehrwert des Leitwerts: $R = \\frac{1}{G} = \\frac{u}{i}$. Einheit Ohm: $1\\,\\Omega = \\frac{1\\,\\text{V}}{1\\,\\text{A}}$.',
    },
    {
      term: 'Streng linearer Widerstand',
      img: 'schaltbilder/widerstand.svg',
      def: 'Elementsymbol, beschriftet mit Leitwert $G$ oder Widerstand $R$.',
    },
    {
      term: 'Dualer Widerstand',
      def: '- zu einem Leitwert $G$ dualer Widerstand: $R^d = R_d^2\\, G$\n- zu einem Widerstand $R$ dualer Leitwert: $G^d = \\frac{R}{R_d^2}$',
      calc: '- Dualitätskonstante $R_d$ festlegen\n- zu $R$: dualer Leitwert $G^d = R / R_d^2$\n- zu $G$: dualer Widerstand $R^d = R_d^2\\, G$',
    },
    {
      term: 'Leerlauf',
      def: 'Triviale Widerstandsgerade mit $i = 0$:\n- Leitwert $0\\,\\text{S}$, Widerstand $\\infty\\,\\Omega$\n- verlustlos, nicht stromgesteuert',
    },
    {
      term: 'Kurzschluss',
      def: 'Triviale Widerstandsgerade mit $u = 0$:\n- Widerstand $0\\,\\Omega$, Leitwert $\\infty\\,\\text{S}$\n- verlustlos, nicht spannungsgesteuert\n- dual zum Leerlauf',
    },
    {
      term: 'Leerlauf und Kurzschluss',
      img: 'schaltbilder/leerlauf-kurzschluss.svg',
      def: '(a) Leerlauf: $i = 0$. (b) Kurzschluss: $u = 0$.',
    },
    {
      term: 'Ohm’scher Widerstand',
      def: 'Passive Widerstandsgerade: $0 \\le G \\le \\infty$ bzw. $0 \\le R \\le \\infty$. Modell typischer Verbraucher.',
    },
    {
      term: 'Negativer Widerstand',
      def: 'Streng linearer Widerstand mit $G < 0$ bzw. $R < 0$.\n- aktiv (gibt Leistung ab)\n- als Gerade nicht realisierbar',
    },
    {
      term: 'Zeitvarianter Widerstand',
      def: 'Widerstand mit zeitabhängigem Wert $R(t)$ bzw. $G(t)$, z. B. temperaturabhängiger Widerstand – oft für Messzwecke (Sensoren) eingesetzt.',
    },
    {
      term: 'Schalter',
      def: 'Zeitvarianter Widerstand, der zu jedem Zeitpunkt entweder Kurzschluss (geschlossen) oder Leerlauf (offen) ist. Linear, verlustfrei, ungepolt.',
      more: 'Beschreibung durch die Schaltfunktion\n$$S(t) = \\begin{cases} 1 & \\text{geschlossen} \\\\ 0 & \\text{offen} \\end{cases}$$\n- dualer Schalter: immer im entgegengesetzten Zustand, $\\bar S(t) = 1 - S(t)$\n- periodischer Schalter: abwechselnd $t_0$ geschlossen und $t_1$ offen, Periode $T = t_0 + t_1$',
      moreLabel: 'Methode',
    },
    {
      term: 'Idealer Schalter',
      img: 'schaltbilder/schalter.svg',
      def: 'Zustand über die Schaltfunktion $S(t)$: 1 = geschlossen, 0 = offen.',
    },
    {
      term: 'Norator',
      def: 'Streng lineares Element, dessen Kennlinie die gesamte $u$-$i$-Ebene ist – alle Betriebspunkte zulässig, keine Gleichung. Aktiv und zu sich selbst dual.',
      more: 'Kennlinie: Untervektorraum der Dimension 2.\n\nVerwendung: zusammen mit dem Nullator in idealisierten Modellen, insbesondere als **Ausgangstor** eines linear betriebenen Operationsverstärkers (Nullor).',
      moreLabel: 'Methode',
    },
    {
      term: 'Norator',
      img: 'schaltbilder/norator.svg',
      def: 'Kennlinie: die ganze $u$-$i$-Ebene.',
    },
    {
      term: 'pn-Diode',
      def: 'Halbleiterdiode:\n- bei positiver Spannung durchlässig\n- bei negativer Spannung sperrt sie (nur winziger Sperrstrom)',
      more: '$$i = I_s\\left(e^{u/U_T} - 1\\right) \\qquad u = U_T \\ln\\!\\left(\\frac{i}{I_s} + 1\\right)$$\n- $I_s$: Sperrstrom (typisch im pA-Bereich)\n- $U_T = \\frac{k_B T}{q_e}$: Temperaturspannung, bei Raumtemperatur $U_T \\approx 25\\,\\text{mV}$\n- $k_B = 1{,}38 \\cdot 10^{-23}\\,\\text{VAs/K}$, $q_e = 1{,}602 \\cdot 10^{-19}\\,\\text{As}$',
      moreLabel: 'Kennlinie',
    },
    {
      term: 'Temperaturspannung $U_T$',
      def: '$U_T = \\frac{k_B\\, T}{q_e} \\approx 25\\,\\text{mV}$ bei Raumtemperatur; bestimmt die Steilheit der Diodenkennlinie.',
    },
    {
      term: 'Photodiode',
      def: 'pn-Diode, deren Kennlinie um den beleuchtungsabhängigen Photostrom $i_L$ nach unten verschoben ist: $i = I_s(e^{u/U_T} - 1) - i_L(t)$.',
      more: '- Photodiode im engeren Sinn: in Sperrrichtung betrieben, für Mess- und Übertragungszwecke\n- Solarzelle: im aktiven Bereich (IV. Quadrant) betrieben, liefert Leistung\n- Darstellung als **Kennlinienfeld** mit der Lichtstärke (Lux) als Parameter',
      moreLabel: 'Anwendung',
    },
    {
      term: 'pn-Diode und Photodiode',
      img: 'schaltbilder/pn-diode-photodiode.svg',
      def: '(a) pn-Diode, (b) Photodiode mit Kennlinienfeld.',
    },
    {
      term: 'Zener-Diode',
      def: 'Diode, die unterhalb der präzise festgelegten Zener-Spannung $U_Z$ einen sehr großen Strom führt (Zener-Durchbruch); wird dort betrieben, z. B. als Spannungsnormal.',
    },
    {
      term: 'Tunneldiode',
      def: 'Diode, deren Kennlinie einen Abschnitt mit negativer Steigung hat; daher nicht stromgesteuert.',
    },
    {
      term: 'Zener- und Tunneldiode',
      img: 'schaltbilder/zener-tunneldiode.svg',
      def: '(a) Zener-Diode mit Durchbruch bei $U_Z$, (b) Tunneldiode mit fallendem Kennlinienstück.',
    },
    {
      term: 'Umpolung',
      def: 'Beschreibung eines Eintors mit entgegengesetzten Zählpfeilen: $(u, i) \\in \\mathcal{F} \\Leftrightarrow (-u, -i) \\in \\bar{\\mathcal{F}}$ – grafisch Drehung um $180°$. Ungepolt = geht bei Umpolung in sich über.',
    },
    {
      term: 'Parallelschaltung von Eintoren',
      def: '- gleiche Spannung, Ströme addieren sich\n- spannungsgesteuert: $g_\\mathcal{G}(u) = g_1(u) + g_2(u)$ – Addition bei konstantem $u$',
    },
    {
      term: 'Serienschaltung von Eintoren',
      def: '- gleicher Strom, Spannungen addieren sich\n- stromgesteuert: $r_\\mathcal{G}(i) = r_1(i) + r_2(i)$ – Addition bei konstantem $i$\n- dual zur Parallelschaltung',
    },
    {
      term: 'Parallel- und Serienschaltung',
      img: 'schaltbilder/parallel-serie-eintore.svg',
      def: '(a) Parallelschaltung: gleiche Spannung. (b) Serienschaltung: gleicher Strom.',
    },
    {
      term: 'Parallele Summe',
      def: '$a \\parallel b = \\frac{ab}{a+b}$, definiert über $\\frac{1}{a \\parallel b} = \\frac{1}{a} + \\frac{1}{b}$.\n- kommutativ und assoziativ\n- bindet stärker als $+$, schwächer als $\\cdot$',
    },
    {
      term: 'Parallelschaltung von Widerständen',
      def: 'Leitwerte addieren sich: $G = G_1 + G_2$, also $R = R_1 \\parallel R_2 = \\frac{R_1 R_2}{R_1 + R_2}$.',
      calc: '- Leitwerte addieren: $G = G_1 + G_2$\n- $R = 1/G$, bei zwei Widerständen $R = \\frac{R_1 R_2}{R_1 + R_2}$',
    },
    {
      term: 'Serienschaltung von Widerständen',
      def: 'Widerstände addieren sich: $R = R_1 + R_2$, also $G = G_1 \\parallel G_2$.',
      calc: '- Widerstände addieren: $R = R_1 + R_2 + \\dots$',
    },
    {
      term: 'Stromteilerregel',
      def: 'Bei parallelen Widerständen verhalten sich die Ströme wie die Leitwerte: $\\frac{i_1}{i_2} = \\frac{G_1}{G_2}$, $\\;\\frac{i_1}{i} = \\frac{G_1}{G_1 + G_2}$.',
      calc: '- prüfen: die Widerstände liegen parallel (gleiche Spannung)\n- Leitwerte $G_k = 1/R_k$ bilden\n- $i_1 = i \\cdot \\frac{G_1}{G_1 + G_2} = i \\cdot \\frac{R_2}{R_1 + R_2}$',
    },
    {
      term: 'Spannungsteilerregel',
      def: 'Bei Widerständen in Serie verhalten sich die Spannungen wie die Widerstände: $\\frac{u_1}{u_2} = \\frac{R_1}{R_2}$, $\\;\\frac{u_1}{u} = \\frac{R_1}{R_1 + R_2}$.',
      calc: '- prüfen: die Widerstände liegen in Serie (gleicher Strom)\n- Gesamtwiderstand $R = R_1 + R_2$ bilden\n- $u_1 = u \\cdot \\frac{R_1}{R_1 + R_2}$',
    },
    {
      term: 'Linear vs. streng linear',
      def: '- **Linear:** Kennlinie geht durch Verschiebung in eine streng lineare über (affine Gerade)\n- **Streng linear:** linear und quellenfrei\n- alles andere heißt **nichtlinear**',
    },
    {
      term: 'Lineare Quelle',
      def: 'Resistiver Zweipol, dessen Kennlinie eine nicht durch den Ursprung verlaufende Gerade ist; aktiv. Allgemein: $m\\,u + n\\,i = e$.',
      more: 'Kennwerte (Achsenabschnitte der Kennlinie):\n- **Leerlaufspannung** $u_0$ (bei $i = 0$)\n- **Kurzschlussstrom** $i_0$ (bei $u = 0$)\n- **Innenwiderstand** $R = \\frac{u_0}{i_0}$, Innenleitwert $G = \\frac{1}{R}$\n\nBeschreibbar durch $(u_0, i_0)$, $(u_0, R)$ oder $(i_0, G)$.',
      moreLabel: 'Kennwerte',
    },
    {
      term: 'Leerlaufspannung $u_0$',
      def: 'Spannung an den Klemmen einer Quelle im Leerlauf ($i = 0$); Achsenabschnitt der Kennlinie auf der $u$-Achse.',
      calc: '- Klemmen offen lassen ($i = 0$)\n- Spannung an den Klemmen ausrechnen (z. B. Spannungsteiler)',
    },
    {
      term: 'Kurzschlussstrom $i_0$',
      def: 'Strom durch eine Kurzschlussbrücke an der Quelle ($u = 0$); Achsenabschnitt auf der $i$-Achse (mit umgekehrtem Vorzeichen).',
      calc: '- Klemmen kurzschließen ($u = 0$)\n- Strom durch die Kurzschlussbrücke ausrechnen',
    },
    {
      term: 'Innenwiderstand',
      def: 'Kennwert einer linearen Quelle: $R = \\frac{u_0}{i_0}$, Innenleitwert $G = \\frac{1}{R}$.',
    },
    {
      term: 'Unabhängige Quelle',
      def: 'Lineare Quelle mit achsenparalleler Kennlinie: prägt der Schaltung unabhängig von allem anderen einen Strom oder eine Spannung auf.',
    },
    {
      term: 'Stromquelle',
      def: 'Liefert unabhängig von der Spannung den Strom $i = i_Q(t)$.\n- spannungsgesteuert, aktiv, gepolt, linear\n- Innenleitwert 0, Innenwiderstand $\\infty$\n- Nullstromquelle = Leerlauf',
    },
    {
      term: 'Spannungsquelle',
      def: 'Liefert unabhängig vom Strom die Spannung $u = u_Q(t)$.\n- stromgesteuert, dual zur Stromquelle\n- Innenwiderstand 0, Innenleitwert $\\infty$\n- Nullspannungsquelle = Kurzschluss',
    },
    {
      term: 'Strom- und Spannungsquelle',
      img: 'schaltbilder/strom-spannungsquelle.svg',
      def: '(a) Stromquelle: waagrechte Kennlinie $i\' = i_Q$. (b) Spannungsquelle: senkrechte Kennlinie $u\' = u_Q$.',
    },
    {
      term: 'Quellenumwandlung',
      def: 'Spannungsquelle $u_0$ mit Serienwiderstand $R$ ⇔ Stromquelle $i_0$ mit Parallelleitwert $G$. Beide Ersatzschaltungen sind äquivalent.',
      calc: '- **Spannungsquelle → Stromquelle:** $i_0 = u_0 / R$, $R$ parallel\n- **Stromquelle → Spannungsquelle:** $u_0 = R\\,i_0$, $R$ in Serie',
      more: 'Spannungsquelle → Stromquelle:\n$$i_0 = \\frac{u_0}{R}, \\qquad G = \\frac{1}{R}$$\nStromquelle → Spannungsquelle:\n$$u_0 = \\frac{i_0}{G}, \\qquad R = \\frac{1}{G}$$\nMan wählt jeweils die Form, die die Analyse vereinfacht.',
      moreLabel: 'Methode',
    },
    {
      term: 'Quellenumwandlung',
      img: 'schaltbilder/quellenumwandlung.svg',
      def: 'Spannungsquelle mit Innenwiderstand $R$ ⇔ Stromquelle mit Innenleitwert $G$: $i_0 = u_0 / R$.',
    },
    {
      term: 'Stückweise lineare Kennlinie',
      def: 'Annäherung einer Kennlinie durch eine stetige Kette von Geradenstücken (Äste); jeder Ast ist eine lineare Quellenkennlinie mit Bedingungsungleichung.',
    },
    {
      term: 'Ideale Diode',
      def: 'Idealisiertes Durchlass-/Sperrverhalten:\n- **Ast I:** $i = 0$ für $u \\le 0$ (sperrt)\n- **Ast II:** $u = 0$ für $i \\ge 0$ (leitet)\n\nVerlustlos; dual zur umgepolten idealen Diode.',
    },
    {
      term: 'Ideale Diode',
      img: 'schaltbilder/ideale-diode.svg',
      def: 'Kennlinie aus negativer $u$-Achse (Ast I) und positiver $i$-Achse (Ast II).',
    },
    {
      term: 'Konkaver Widerstand',
      def: 'Parameter $(G, U)$: Kennlinie ist die $u$-Achse bis $U$, danach Halbgerade mit Steigung $G$. Gutes Diodenmodell, z. B. $(\\infty, 0{,}7\\,\\text{V})$.',
    },
    {
      term: 'Konvexer Widerstand',
      def: 'Parameter $(R, I)$: Kennlinie ist die $i$-Achse bis $I$, danach Halbgerade mit Steigung $1/R$. Dual zum konkaven Widerstand.',
    },
    {
      term: 'Arbeitspunkt',
      def: 'Gleichanteil aller Betriebsgrößen einer Schaltung $(u_{\\text{AP}}, i_{\\text{AP}})$ – Schnittpunkt von externer Quellenkennlinie (Lastgerade) und Lastkennlinie.',
      calc: '- Lastgerade der Quelle aufstellen (z. B. $u = u_0 - R\\,i$)\n- Kennlinie der Last aufstellen\n- Schnittpunkt bestimmen – grafisch oder durch Gleichsetzen',
      more: '- Quelle $\\mathcal{Q}$ und Last $\\mathcal{L}$ zeitinvariant\n- **externe Kennlinie** der Quelle: Spiegelung an der $u$-Achse, $f_{\\mathcal{Q}_x}(u,i) = f_\\mathcal{Q}(u,-i)$\n- Arbeitspunktmenge $= \\mathcal{Q}_x \\cap \\mathcal{L}$, grafisch als Schnitt in der $u$-$i$-Ebene\n- kann leer sein (z. B. überidealisierte Spannungsquelle + ideale Diode)',
      moreLabel: 'Methode',
    },
    {
      term: 'Lastgerade (Lastlinie)',
      def: 'Externe Kennlinie der Quelle, gesehen von der Last aus: schränkt ein, welche Betriebspunkte die Last annehmen kann.',
    },
    {
      term: 'Großsignal-Analyse',
      def: 'Analyse aller Ströme und Spannungen in ihrer Gesamtheit (z. B. $u(t)$) unter voller Berücksichtigung der Nichtlinearitäten.',
    },
    {
      term: 'Erregung und Antwort',
      def: 'Einteilung der Betriebsgrößen:\n- **Erregung** $a$: vorgegebene Eingangsgröße (Ursache)\n- **Antwort** $b = \\beta(a)$: abhängige Ausgangsgröße (Wirkung)',
    },
    {
      term: 'Übertragungskennlinie',
      def: 'Zusammenhang $b = \\beta(a)$ zwischen Erregung und Antwort einer Schaltung, bestimmt durch ihre Eintore und deren Verschaltung.',
    },
    {
      term: 'Einweggleichrichter',
      def: 'Quelle mit Innenwiderstand, parallel dazu ideale Diode und Lastwiderstand: Sinus am Eingang → am Ausgang Sinus halber Amplitude mit abgeschnittenen negativen Halbwellen.',
      more: '- Diode ∥ Last $R$ wirkt wie ein konvexer Widerstand\n- Lösung je $u_0$: Schnitt der Lastkennlinie mit der Schar $\\mathcal{Q}_x(u_0)$\n- Fallunterscheidung (stückweise linear):\n$$u_L = \\begin{cases} \\tfrac{1}{2}u_0 & u_0 \\ge 0 \\\\ 0 & u_0 < 0 \\end{cases}$$\n- zeigt: nichtlineare Übertragung verändert die Kurvenform',
      moreLabel: 'Methode',
    },
    {
      term: 'Einweggleichrichter',
      img: 'schaltbilder/einweggleichrichter.svg',
      def: 'Quelle $u_0(t)$ mit Innenwiderstand $R$, ideale Diode parallel zur Last $R$.',
    },
    {
      term: 'Linearisierung',
      def: 'Ersetzen einer stetig differenzierbaren Kennlinie durch ihre Tangente im Arbeitspunkt $(A, B)$: $\\beta_{\\text{lin}}(a) = \\beta(A) + k\\,(a - A)$ mit $k = \\beta\'(A)$.',
      calc: '- Arbeitspunkt $(A, B)$ bestimmen\n- Ableitung $k = \\beta\'(A)$ berechnen\n- Tangente: $\\beta_{\\text{lin}}(a) = B + k\\,(a - A)$',
      more: 'Ansatz: $\\beta(a) = \\beta(A) + k(a - A) + r(a, A)(a - A)$\n\nDer Fehlerterm muss schneller als linear verschwinden, also $r(a, A) \\to 0$ für $a \\to A$. Daraus folgt\n$$k = \\left.\\frac{\\mathrm{d}\\beta(a)}{\\mathrm{d}a}\\right|_{a = A}$$\n$k$ heißt Übertragungsfaktor bzw. Verstärkung.',
      moreLabel: 'Herleitung',
    },
    {
      term: 'Linearisierung eines Eintors',
      def: '- **stromgesteuert:** $u_{\\text{lin}} = r_\\mathcal{F}(I) - R_\\mathcal{F} I + R_\\mathcal{F}\\, i$ → Spannungsquelle in Serie mit $R_\\mathcal{F}$\n- **spannungsgesteuert:** Stromquelle parallel zu $G_\\mathcal{F}$',
      more: '- Kleinsignalwiderstand $R_\\mathcal{F} = \\left.\\frac{\\mathrm{d}r_\\mathcal{F}}{\\mathrm{d}i}\\right|_{I}$\n- Kleinsignalleitwert $G_\\mathcal{F} = \\left.\\frac{\\mathrm{d}g_\\mathcal{F}}{\\mathrm{d}u}\\right|_{U}$\n- da $g_\\mathcal{F}$ und $r_\\mathcal{F}$ Umkehrfunktionen sind: $G_\\mathcal{F} = \\frac{1}{R_\\mathcal{F}}$\n- beide Ersatzschaltbilder gehen durch Quellenumwandlung ineinander über',
      moreLabel: 'Methode',
    },
    {
      term: 'Kleinsignal-Analyse',
      def: 'Signale werden in Arbeitspunkt und kleinen Wechselanteil zerlegt: $a = A + \\Delta a$. Für die Kleinsignale gilt die lineare Beziehung $\\Delta b = k\\,\\Delta a$.',
      more: '- Arbeitspunktanteil: nichtlinear, $B = \\beta(A)$\n- Kleinsignalanteil: linear, $\\Delta b(t) = k\\,\\Delta a(t)$ → Kurvenform bleibt erhalten\n- Voraussetzung: Wechselanteil klein genug für die lineare Näherung',
      moreLabel: 'Methode',
    },
    {
      term: 'Kleinsignal-Ersatzschaltbild',
      def: 'Ergibt eine rein lineare Schaltung:\n- nichtlineare Elemente → Kleinsignalwiderstände bzw. -leitwerte\n- Konstantspannungsquellen → Kurzschluss\n- Konstantstromquellen → Leerlauf',
      calc: '- Arbeitspunkt bestimmen (Großsignal-Analyse)\n- je nichtlinearem Element den Kleinsignalwiderstand = Steigung im AP bestimmen\n- Konstantspannungsquellen → Kurzschluss, Konstantstromquellen → Leerlauf\n- lineares Netzwerk mit den Kleinsignalgrößen analysieren',
    },
    {
      term: 'Kleinsignalleitwert einer Diode',
      def: '$G_D = \\left.\\frac{\\mathrm{d}i}{\\mathrm{d}u}\\right|_U = \\frac{I_s}{U_T}\\, e^{U/U_T} \\approx \\frac{I}{U_T}$ (für $I \\gg I_s$).',
    },
    {
      term: 'Kleinsignal-Ersatzschaltung (Diode)',
      img: 'schaltbilder/kleinsignal-diode.svg',
      def: 'Diode durch $G_D$ ersetzt, Konstantquellen durch Nullquellen; $\\Delta u$ folgt aus dem Spannungsteiler.',
    },

    { chapter: '4 Resistive Zweitore' },
    {
      term: 'Zweitor',
      def: 'Netzwerkelement mit zwei Toren (Klemmenpaare $1,1\'$ und $2,2\'$), beschrieben durch $u_1, u_2, i_1, i_2$. Ohne erfüllte Torbedingung ist es nur ein Vierpol.',
      more: '- Torbedingung: an jedem Tor sind die Klemmenströme entgegengesetzt gleich\n- muss durch äußere Beschaltung oder Wissen über die Innenstruktur gesichert sein\n- keine Aussage über Spannungen zwischen Klemmen verschiedener Tore\n- ein Dreipol kann stets als Zweitor beschrieben werden\n- Kennlinie: zweidimensionale „Kennfläche“ im 4D-Signalraum',
      moreLabel: 'Details',
    },
    {
      term: 'Zweitor',
      img: 'schaltbilder/zweitor.svg',
      def: 'Zweitor mit äußerer Beschaltung an Tor 1 ($1, 1\'$) und Tor 2 ($2, 2\'$).',
    },
    {
      term: 'Kennfläche',
      def: 'Menge aller Betriebspunkte $(u_1, u_2, i_1, i_2)$ eines Zweitors – eine zweidimensionale Fläche im vierdimensionalen Signalraum.',
    },
    {
      term: 'Explizite Zweitor-Beschreibungen',
      def: 'Auflösen nach zwei der vier Größen – sechs Möglichkeiten: spannungsgesteuert, stromgesteuert, hybrid, invers hybrid, Ketten- und inverse Kettenbeschreibung.',
    },
    {
      term: 'Streng lineares Zweitor',
      def: 'Jede Linearkombination zweier Betriebspunkte ist wieder ein Betriebspunkt; die Betriebspunkte bilden eine Ursprungsebene (2D-Unterraum) im 4D-Signalraum.',
    },
    {
      term: 'Kernbeschreibung',
      def: 'Implizite Beschreibung eines streng linearen Zweitors: $M\\boldsymbol{u} + N\\boldsymbol{i} = \\boldsymbol{0}$ mit $\\operatorname{Rang}[M, N] = 2$ – der Betriebsraum ist der Kern von $[M, N]$.',
    },
    {
      term: 'Bildbeschreibung (Betriebsmatrix)',
      def: 'Parametrische Beschreibung: $\\begin{bmatrix}\\boldsymbol{u}\\\\ \\boldsymbol{i}\\end{bmatrix} = \\begin{bmatrix} U \\\\ I \\end{bmatrix} \\boldsymbol{c}$. Die Spalten der Betriebsmatrix sind eine Basis des Betriebsraums.',
    },
    {
      term: 'Nicht-Eindeutigkeit von Kern und Bild',
      def: 'Der Betriebsraum ist eindeutig, $[M, N]$ und die Betriebsmatrix nicht:\n- Links-Multiplikation von $[M, N]$ mit regulärem $T$ ändert nichts\n- Rechts-Multiplikation der Betriebsmatrix mit regulärem $W$ ändert nichts',
    },
    {
      term: 'Zweitormatrizen',
      def: 'Sechs explizite Beschreibungen streng linearer Zweitore: $G$, $R$, $H$, $H\'$, $A$, $A\'$.\n- existiert eine, ist sie eindeutig\n- mindestens eine existiert immer',
      more: '- Leitwertsmatrix: $\\boldsymbol{i} = G\\,\\boldsymbol{u}$\n- Widerstandsmatrix: $\\boldsymbol{u} = R\\,\\boldsymbol{i}$\n- Hybridmatrix: $\\begin{bmatrix}u_1\\\\ i_2\\end{bmatrix} = H \\begin{bmatrix}i_1\\\\ u_2\\end{bmatrix}$\n- inverse Hybridmatrix: $\\begin{bmatrix}i_1\\\\ u_2\\end{bmatrix} = H\' \\begin{bmatrix}u_1\\\\ i_2\\end{bmatrix}$\n- Kettenmatrix: $\\begin{bmatrix}u_1\\\\ i_1\\end{bmatrix} = A \\begin{bmatrix}u_2\\\\ -i_2\\end{bmatrix}$\n- inverse Kettenmatrix: $\\begin{bmatrix}u_2\\\\ i_2\\end{bmatrix} = A\' \\begin{bmatrix}u_1\\\\ -i_1\\end{bmatrix}$',
      moreLabel: 'Übersicht',
    },
    {
      term: 'Leitwertsmatrix $G$',
      def: 'Spannungsgesteuerte Beschreibung $\\boldsymbol{i} = G\\boldsymbol{u}$. Existiert, wenn $U$ invertierbar ist: $G = I\\,U^{-1}$.',
      calc: 'Elemente einzeln bestimmen:\n- $g_{11}, g_{21}$: Ausgang kurzschließen ($u_2 = 0$), $g_{11} = i_1/u_1$, $g_{21} = i_2/u_1$\n- $g_{12}, g_{22}$: Eingang kurzschließen ($u_1 = 0$), $g_{12} = i_1/u_2$, $g_{22} = i_2/u_2$',
    },
    {
      term: 'Widerstandsmatrix $R$',
      def: 'Stromgesteuerte Beschreibung $\\boldsymbol{u} = R\\boldsymbol{i}$.\n- existiert, wenn $M$ invertierbar ist\n- falls beide existieren: $R = G^{-1}$',
      calc: 'Elemente einzeln bestimmen:\n- $r_{11}, r_{21}$: Ausgang leerlaufen lassen ($i_2 = 0$), $r_{11} = u_1/i_1$, $r_{21} = u_2/i_1$\n- $r_{12}, r_{22}$: Eingang leerlaufen lassen ($i_1 = 0$), $r_{12} = u_1/i_2$, $r_{22} = u_2/i_2$\n- oder $R = G^{-1}$',
    },
    {
      term: 'Kettenmatrix $A$',
      def: '$\\begin{bmatrix}u_1\\\\ i_1\\end{bmatrix} = A \\begin{bmatrix}u_2\\\\ -i_2\\end{bmatrix}$ – Achtung: Minuszeichen bei $i_2$, damit Kettenschaltungen einfach multipliziert werden können.',
    },
    {
      term: 'Hybridmatrix $H$',
      def: '$\\begin{bmatrix}u_1\\\\ i_2\\end{bmatrix} = H \\begin{bmatrix}i_1\\\\ u_2\\end{bmatrix}$ – gemischte Beschreibung (Strom an Tor 1, Spannung an Tor 2 steuern).',
    },
    {
      term: 'Bedeutung von $g_{11}$, $g_{22}$',
      def: '- $g_{11} = \\left.\\frac{i_1}{u_1}\\right|_{u_2 = 0}$: Eingangsleitwert bei kurzgeschlossenem Ausgang\n- $g_{22} = \\left.\\frac{i_2}{u_2}\\right|_{u_1 = 0}$: Ausgangsleitwert bei kurzgeschlossenem Eingang',
    },
    {
      term: 'Bedeutung von $r_{11}$, $r_{22}$',
      def: '- $r_{11} = \\left.\\frac{u_1}{i_1}\\right|_{i_2 = 0}$: Eingangswiderstand bei leerlaufendem Ausgang\n- $r_{22} = \\left.\\frac{u_2}{i_2}\\right|_{i_1 = 0}$: Ausgangswiderstand bei leerlaufendem Eingang',
    },
    {
      term: 'Nicht quellenfreies lineares Zweitor',
      def: 'Betriebsraum ist eine affine Ebene, z. B. $\\boldsymbol{i} = G\\boldsymbol{u} + \\boldsymbol{i}_0$. Ersatzschaltung: streng lineares Zweitor plus zwei unabhängige Quellen.',
    },
    {
      term: 'Linearisierung von Zweitoren',
      def: 'Im Arbeitspunkt $(\\boldsymbol{U}, \\boldsymbol{I})$: $\\boldsymbol{i}_{\\text{lin}} = \\boldsymbol{g}(\\boldsymbol{U}) + J\\,(\\boldsymbol{u} - \\boldsymbol{U})$ mit der Jacobimatrix $J = \\frac{\\partial \\boldsymbol{g}}{\\partial \\boldsymbol{u}^{\\mathrm{T}}}$.',
    },
    {
      term: 'Jacobimatrix',
      def: 'Matrix der partiellen Ableitungen, z. B. $J = \\begin{bmatrix} \\frac{\\partial g_1}{\\partial u_1} & \\frac{\\partial g_1}{\\partial u_2} \\\\ \\frac{\\partial g_2}{\\partial u_1} & \\frac{\\partial g_2}{\\partial u_2} \\end{bmatrix}$ – bei Zweitoren die Kleinsignal-Leitwertsmatrix.',
    },
    {
      term: 'Verlustloses Zweitor',
      def: 'Die aufgenommene Gesamtleistung verschwindet immer: $p_1 + p_2 = u_1 i_1 + u_2 i_2 = \\boldsymbol{u}^{\\mathrm{T}}\\boldsymbol{i} = 0$.',
      more: 'Für streng lineare Zweitore mit Betriebsmatrix $\\begin{bmatrix}U\\\\ I\\end{bmatrix}$:\n$$U^{\\mathrm{T}} I + I^{\\mathrm{T}} U = \\boldsymbol{0}$$\nBegründung: Der schiefsymmetrische Anteil von $U^{\\mathrm{T}}I$ liefert in der quadratischen Form immer 0 ($h = \\boldsymbol{c}^{\\mathrm{T}}A\\boldsymbol{c} = -h$), also muss der symmetrische Anteil verschwinden.\n\nBeispiel: Umpolung.',
      moreLabel: 'Bedingung',
    },
    {
      term: 'Passives Zweitor',
      def: 'Die insgesamt aufgenommene Leistung ist immer $\\ge 0$: $u_1 i_1 + u_2 i_2 \\ge 0$. Nicht nötig, dass jedes Tor einzeln Leistung aufnimmt (z. B. Spannungsteiler).',
      more: 'Streng linear: passiv, wenn der symmetrische Anteil\n$$U^{\\mathrm{T}} I + I^{\\mathrm{T}} U$$\npositiv (semi)definit ist.\n\n**Aktiv** = nicht passiv, z. B. Verstärker (negativer Widerstand).',
      moreLabel: 'Bedingung',
    },
    {
      term: 'Zeitvariantes Zweitor',
      def: '- **Zeitvariant:** die Zeit $t$ geht in die charakterisierende Beziehung ein (z. B. Lichtschranke)\n- **Zeitinvariant:** Beziehung ist für alle $t$ gleich',
    },
    {
      term: 'Duales Zweitor',
      def: 'Rollen von Strom und Spannung über $R_d$ vertauscht: $\\boldsymbol{u}^d = R_d\\,\\boldsymbol{i}$, $\\boldsymbol{i}^d = \\boldsymbol{u}/R_d$. Streng linear: $G^d = \\frac{R}{R_d^2}$, $R^d = R_d^2\\, G$.',
    },
    {
      term: 'Umkehrbares (symmetrisches) Zweitor',
      def: 'Vertauschen der Tore ändert den Betriebsraum nicht. Mit $P = \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$: $G = PGP$, $R = PRP$, also $g_{11} = g_{22}$, $g_{12} = g_{21}$.',
      more: '- $P$: selbstinverse Permutationsmatrix (Torvertauschung)\n- Kettenmatrix: $a_{11} = a_{22}$ und $\\det A = 1$\n- Beispiel: T-Glied\n- **antimetrisch**: geht bei Umkehrung in sein duales Zweitor über (z. B. Gyrator)',
      moreLabel: 'Details',
    },
    {
      term: 'Antimetrisch',
      def: 'Ein Zweitor, das bei Umkehrung (Tortausch) in sein duales Zweitor übergeht, z. B. der Gyrator.',
    },
    {
      term: 'Reziprozität (Übertragungssymmetrie)',
      def: 'Vertauscht man Ursache (Quelle) und Wirkung (Nullquelle gleichen Typs) zwischen den Toren, bleibt ihr Verhältnis gleich. Allgemein: $U^{\\mathrm{T}} I = I^{\\mathrm{T}} U$.',
      more: 'Bedingungen (je nach existierender Matrix):\n- $r_{12} = r_{21}$, also $R = R^{\\mathrm{T}}$\n- $g_{12} = g_{21}$, also $G = G^{\\mathrm{T}}$\n- $h_{12} = -h_{21}$, $\\;h\'_{12} = -h\'_{21}$\n- $\\det A = 1$, $\\;\\det A\' = 1$\n\nReziprok sind alle Zweitore nur aus Widerständen, Übertragern (sowie C und L).',
      moreLabel: 'Bedingungen',
    },
    {
      term: 'Antireziprok',
      def: 'Gegenteil der Reziprozität mit Vorzeichenwechsel: $G = -G^{\\mathrm{T}}$, $R = -R^{\\mathrm{T}}$, $\\det A = -1$. Beispiele: Gyrator, NIK.',
    },
    {
      term: 'Klassifikation spezieller Zweitore',
      def: 'Nach der Kettenmatrix $A$:\n- alle 4 Elemente null → Nullor\n- 3 Elemente null → gesteuerte Quelle\n- Hauptdiagonale null → Inverter (Gyrator)\n- Nebendiagonale null → Konverter (Übertrager, NIK)',
    },
    {
      term: 'Gesteuerte Quelle',
      def: 'Zweitor aus zwei Zweigen:\n- **Steuerungszweig:** Leerlauf oder Kurzschluss\n- **gesteuerter Zweig:** abhängige Strom- oder Spannungsquelle\n\nVier Varianten: VCCS, CCCS, VCVS, CCVS.',
      more: '- **VCCS**: $i_2 = g\\,u_1$, $i_1 = 0$ → $G = \\begin{bmatrix}0&0\\\\g&0\\end{bmatrix}$\n- **CCCS**: $i_2 = \\beta\\, i_1$, $u_1 = 0$ → $H = \\begin{bmatrix}0&0\\\\\\beta&0\\end{bmatrix}$\n- **VCVS**: $u_2 = \\mu\\, u_1$, $i_1 = 0$ → $H\' = \\begin{bmatrix}0&0\\\\\\mu&0\\end{bmatrix}$\n- **CCVS**: $u_2 = r\\, i_1$, $u_1 = 0$ → $R = \\begin{bmatrix}0&0\\\\r&0\\end{bmatrix}$\n\nFür Faktor $\\neq 0$ weder passiv noch reziprok. Mit Faktor $\\to \\infty$ → Nullor.',
      moreLabel: 'Vier Typen',
    },
    {
      term: 'Gesteuerte Quellen',
      img: 'schaltbilder/gesteuerte-quellen.svg',
      def: 'VCCS, CCCS, VCVS, CCVS: Steuerzweig Leerlauf oder Kurzschluss, gesteuerter Zweig abhängige Quelle.',
    },
    {
      term: 'VCCS',
      def: 'Voltage Controlled Current Source (spannungsgesteuerte Stromquelle): $i_2 = g\\,u_1$, Eingang Leerlauf ($i_1 = 0$). Steilheit $g$.',
    },
    {
      term: 'CCCS',
      def: 'Current Controlled Current Source (stromgesteuerte Stromquelle): $i_2 = \\beta\\, i_1$, Eingang Kurzschluss ($u_1 = 0$). Stromverstärkung $\\beta$.',
    },
    {
      term: 'VCVS',
      def: 'Voltage Controlled Voltage Source (spannungsgesteuerte Spannungsquelle): $u_2 = \\mu\\, u_1$, Eingang Leerlauf ($i_1 = 0$). Spannungsverstärkung $\\mu$.',
    },
    {
      term: 'CCVS',
      def: 'Current Controlled Voltage Source (stromgesteuerte Spannungsquelle): $u_2 = r\\, i_1$, Eingang Kurzschluss ($u_1 = 0$). Transferwiderstand $r$.',
    },
    {
      term: 'Nullor',
      def: 'Zweitor mit $u_1 = 0$ und $i_1 = 0$, keine Aussage über $u_2$, $i_2$.\n- **Eingang:** Nullator\n- **Ausgang:** Norator\n\nKettenmatrix $A = \\boldsymbol{0}$.',
      more: '- Grenzfall aller gesteuerten Quellen für $g, \\beta, \\mu, r \\to \\infty$\n- von den sechs Zweitormatrizen existiert nur die Kettenmatrix (Nullmatrix → Name)\n- lineares Modell des idealen Operationsverstärkers',
      moreLabel: 'Details',
    },
    {
      term: 'Nullor',
      img: 'schaltbilder/nullor.svg',
      def: 'Nullor-Ersatzschaltung: Nullator am Tor 1, Norator am Tor 2.',
    },
    {
      term: 'Idealer Übertrager',
      def: 'Verlustloses und reziprokes Zweitor:\n- $u_1 = \\ddot u\\, u_2$\n- $i_2 = -\\ddot u\\, i_1$\n\n$\\ddot u$: Übersetzungsverhältnis (Windungszahlverhältnis).',
      more: '$$H = \\begin{bmatrix}0 & \\ddot u\\\\ -\\ddot u & 0\\end{bmatrix} \\qquad A = \\begin{bmatrix}\\ddot u & 0\\\\ 0 & \\frac{1}{\\ddot u}\\end{bmatrix}$$\n- $H$ schiefsymmetrisch; $G$ und $R$ existieren nicht\n- gilt auch für Gleichgrößen (Idealisierung!)\n- umkehrbar für $\\ddot u = \\pm 1$\n- Abschluss mit $R$: am Tor 1 wirkt $R_{\\text{ein}} = \\ddot u^2 R$ → Positiv-Immittanz-Konverter (PIK)',
      moreLabel: 'Matrizen',
    },
    {
      term: 'Idealer Übertrager',
      img: 'schaltbilder/uebertrager.svg',
      def: 'Übersetzungsverhältnis $\\ddot u : 1$, sekundär mit $\\mathcal{F}$ abgeschlossen.',
    },
    {
      term: 'Gyrator',
      def: 'Verlustloses Zweitor, für das $G$ und $R$ existieren: $R = \\begin{bmatrix}0 & -R_d\\\\ R_d & 0\\end{bmatrix}$. Wandelt einen Zweipol in seinen dualen (Dualwandler).',
      more: '- $G = R^{-1} = \\begin{bmatrix}0 & G_d\\\\ -G_d & 0\\end{bmatrix}$, $G_d = 1/R_d$ (Gyrationsleitwert)\n- Kettenmatrix $A = \\begin{bmatrix}0 & R_d\\\\ G_d & 0\\end{bmatrix}$, $\\det A = -1$; keine Hybridmatrizen\n- Abschluss mit $R$: $R_{\\text{ein}} = \\frac{R_d^2}{R}$ (duales Element)\n- antireziprok und antimetrisch; Positiv-Immittanz-Inverter (PII)\n- Realisierung: zwei VCCS parallel oder zwei CCVS in Serie mit entgegengesetztem Steuerfaktor',
      moreLabel: 'Matrizen',
    },
    {
      term: 'Gyrator',
      img: 'schaltbilder/gyrator.svg',
      def: 'Gyrator mit Gyrationswiderstand $R_d$, abgeschlossen mit $\\mathcal{F}$ – am Tor 1 wirkt $\\mathcal{F}^d$.',
    },
    {
      term: 'Negativ-Immittanz-Konverter (NIK)',
      def: 'Aktives Zweitor, das einen positiven in einen negativen Widerstand wandelt: Abschluss mit $R$ ergibt am Tor 1 $R_{\\text{ein}} = -k^2 R$.',
      more: '$$H = \\begin{bmatrix}0 & -k\\\\ -k & 0\\end{bmatrix} \\qquad A = \\begin{bmatrix}-k & 0\\\\ 0 & \\frac{1}{k}\\end{bmatrix}$$\n- weder spannungs- noch stromgesteuert ($G$, $R$ existieren nicht)\n- aktiv, antireziprok, für $|k| = 1$ symmetrisch\n- $k = 1$: Kennlinie an der $i_1$-Achse gespiegelt, $k = -1$: an der $u_1$-Achse\n- Immittanz = Impedanz + Admittanz',
      moreLabel: 'Matrizen',
    },
    {
      term: 'NIK',
      img: 'schaltbilder/nik.svg',
      def: 'Nullor-Realisierung eines NIK mit $k = -1$: Nullator oben, zwei gleiche Widerstände $R$, Norator zur Masse.',
    },
    {
      term: 'Torbedingung bei Zweitorschaltungen',
      def: 'Die Zusammenfassungsregeln (Matrizen addieren) gelten nur, wenn an allen Teilzweitoren die Torbedingungen erfüllt sind; erzwingbar mit idealem 1:1-Übertrager.',
    },
    {
      term: 'Parallelschaltung von Zweitoren',
      def: 'Eingänge parallel, Ausgänge parallel: $\\boldsymbol{u}$ gleich, Ströme addieren sich → $G_\\mathcal{G} = G_1 + G_2$.',
    },
    {
      term: 'Parallelschaltung von Zweitoren',
      img: 'schaltbilder/parallelschaltung-zweitore.svg',
      def: 'Beide Torpaare parallel: Leitwertsmatrizen addieren.',
    },
    {
      term: 'Serienschaltung von Zweitoren',
      def: 'Eingänge in Serie, Ausgänge in Serie: Ströme gleich, Spannungen addieren sich → $R_\\mathcal{G} = R_1 + R_2$.',
    },
    {
      term: 'Serienschaltung von Zweitoren',
      img: 'schaltbilder/serienschaltung-zweitore.svg',
      def: 'Beide Torpaare in Serie: Widerstandsmatrizen addieren.',
    },
    {
      term: 'Hybride Zweitorschaltungen',
      def: '- **Serien-Parallel** (Eingänge Serie, Ausgänge parallel): $H_\\mathcal{G} = H_1 + H_2$\n- **Parallel-Serien** (Eingänge parallel, Ausgänge Serie): $H\'_\\mathcal{G} = H\'_1 + H\'_2$',
    },
    {
      term: 'Hybride Zweitorschaltungen',
      img: 'schaltbilder/hybride-schaltungen.svg',
      def: 'Links Serien-Parallel ($H$ addieren), rechts Parallel-Serien ($H\'$ addieren).',
    },
    {
      term: 'Kettenschaltung',
      def: 'Ausgang von $\\mathcal{F}_1$ an Eingang von $\\mathcal{F}_2$: Kettenmatrizen multiplizieren, $A_\\mathcal{G} = A_1 A_2$. Torbedingungen innen automatisch erfüllt.',
      calc: '- Kettenmatrizen $A_1$, $A_2$ der Teilzweitore bestimmen\n- in Reihenfolge multiplizieren: $A = A_1 A_2$',
      more: '- deshalb das Minuszeichen in der Kettenbeschreibung: $\\begin{bmatrix}u_1\\\\ i_1\\end{bmatrix} = A\\begin{bmatrix}u_2\\\\ -i_2\\end{bmatrix}$\n- nichtlinear: Verkettung der Funktionen $\\boldsymbol{a}_\\mathcal{G} = \\boldsymbol{a}_1 \\circ \\boldsymbol{a}_2$\n- inverse Kettenmatrix: umgekehrte Reihenfolge, $A\'_\\mathcal{G} = A\'_2 A\'_1$',
      moreLabel: 'Methode',
    },
    {
      term: 'Kettenschaltung',
      img: 'schaltbilder/kettenschaltung.svg',
      def: 'Zwei Zweitore in Kette: $A_\\mathcal{G} = A_{\\mathcal{F}_1} A_{\\mathcal{F}_2}$.',
    },

    { chapter: '5 Operationsverstärker' },
    {
      term: 'Operationsverstärker (Op-Amp)',
      def: 'Hochwertiger, integrierter Differenzverstärker; ursprünglich für analoge Rechenoperationen (Analogrechner). Eines der wichtigsten Bauelemente der Elektronik.',
    },
    {
      term: 'Vierpoliges Op-Amp-Symbol',
      def: 'Versorgungsspannungen $U_{B\\pm}$ werden ins Element übernommen, ein Anschluss liegt fest auf Masse. So sind die Torbedingungen erfüllt und der Arbeitspunkt liegt im Ursprung.',
    },
    {
      term: 'Op-Amp-Symbol',
      img: 'schaltbilder/opamp-symbol.svg',
      def: 'Vierpoliges Symbol: invertierender (−) und nichtinvertierender (+) Eingang, Ausgang, Masse.',
    },
    {
      term: 'Differenzspannung $u_d$',
      def: 'Spannung am Eingangstor des Op-Amps: $u_d = u_{1+} - u_{1-}$.',
    },
    {
      term: 'Offsetspannung und Offsetstrom',
      def: 'Imperfektionen realer Op-Amps durch Unsymmetrien, modelliert durch externe Quellen:\n- **Offsetspannung** $U_{\\text{offset}}$ ≈ 1 mV\n- **Offsetstrom** $I_{\\text{offset}} = I_{1+} - I_{1-}$ ≈ 20 nA',
    },
    {
      term: 'Idealer Op-Amp',
      def: 'Kennlinie mit drei Ästen ($A_0 \\to \\infty$): (I) $u_2 = -U_{\\text{sat}}$ für $u_d < 0$, (II) $|u_2| \\le U_{\\text{sat}}$ für $u_d = 0$, (III) $u_2 = +U_{\\text{sat}}$ für $u_d > 0$.',
      more: '- Eingangsleitwert vernachlässigt: $i_+ = i_- = 0$\n- Ausgangswiderstand vernachlässigt\n- Offset eliminiert, Kennlinie geht durch den Ursprung\n- Symbol mit $\\infty$ gekennzeichnet\n\nAnalyse: für jeden der drei Bereiche lösen und prüfen, ob die Lösung die Bereichsungleichung erfüllt.',
      moreLabel: 'Methode',
    },
    {
      term: 'Sättigungsbereich',
      def: 'Äste (I) und (III) des idealen Op-Amps: Eingang = Leerlauf, Ausgang = Spannungsquelle $\\mp U_{\\text{sat}}$.',
    },
    {
      term: 'Op-Amp in Sättigung',
      img: 'schaltbilder/opamp-saettigung.svg',
      def: 'Ersatzschaltbilder: (I) $u_d < 0 \\Rightarrow u_2 = -U_{\\text{sat}}$, (III) $u_d > 0 \\Rightarrow u_2 = +U_{\\text{sat}}$.',
    },
    {
      term: 'Nullormodell des Op-Amps',
      def: 'Im linearen Bereich (II): $u_d = 0$ und $i_+ = i_- = 0$ → Eingang = Nullator, Ausgang = Norator. Gilt nur bei Rückkopplung vom Ausgang auf den Eingang.',
    },
    {
      term: 'Nullormodell des Op-Amps',
      img: 'schaltbilder/opamp-nullormodell.svg',
      def: 'Linearer Bereich: $u_d = 0$, $i_\\pm = 0$; $u_2$ und $i_2$ beliebig.',
    },
    {
      term: 'Komparator',
      def: 'Op-Amp ohne Rückkopplung als Vergleicher:\n- $u_2 = +U_{\\text{sat}}$ für $u_{1+} > u_{1-}$\n- $u_2 = -U_{\\text{sat}}$ für $u_{1+} < u_{1-}$',
    },
    {
      term: 'Invertierender Verstärker',
      def: 'Eingang über $R_1$ an den invertierenden Eingang, Rückkopplung $R_0$, (+) auf Masse: $v_u = \\frac{u_0}{u_1} = -\\frac{R_0}{R_1}$.',
      calc: 'Verstärkung mit dem Nullormodell:\n- Nullator: $u_d = 0$ → (−)-Eingang liegt auf Masse (virtuelle Masse)\n- $i_- = 0$ → durch $R_1$ und $R_0$ fließt derselbe Strom $i = u_1 / R_1$\n- $u_2 = -R_0\\, i$ → $v_u = -\\frac{R_0}{R_1}$',
      more: '- Nullor: $u_d = 0$ → invertierender Eingang ist virtuelle Masse\n- $i_1 = \\frac{u_1}{R_1}$, derselbe Strom fließt durch $R_0$: $u_0 = -R_0\\, i_1$\n- mehrere Eingänge: $u_0 = -R_0\\left(\\frac{u_1}{R_1} + \\frac{u_2}{R_2} + \\dots\\right)$\n- bei endlicher Verstärkung $A_0$ weicht $v_u$ nur minimal ab (z. B. 0,1 %)\n- **Polung wichtig:** bei vertauschten Eingängen nur Sättigung stabil, der lineare Arbeitspunkt ist instabil',
      moreLabel: 'Herleitung',
    },
    {
      term: 'Invertierender Verstärker',
      img: 'schaltbilder/invertierender-verstaerker.svg',
      def: '$u_0 = -\\frac{R_0}{R_1}\\, u_1$; weitere Eingänge über $R_2, \\dots$ möglich (Summierer).',
    },
    {
      term: 'Nichtinvertierender Verstärker',
      def: 'Eingang direkt an (+), Spannungsteiler $R_0$/$R_1$ vom Ausgang an (−): $v_u = 1 + \\frac{R_0}{R_1}$. Ausgang hat dasselbe Vorzeichen wie der Eingang.',
      calc: '- Nullator: $u_d = 0$ → am (−)-Eingang liegt $u_1$\n- Spannungsteiler am Ausgang: $u_1 = u_2 \\frac{R_1}{R_0 + R_1}$\n- umstellen: $v_u = \\frac{u_2}{u_1} = 1 + \\frac{R_0}{R_1}$',
    },
    {
      term: 'Nichtinvertierender Verstärker',
      img: 'schaltbilder/nichtinvertierender-verstaerker.svg',
      def: '$u_0 = \\left(1 + \\frac{R_0}{R_1}\\right) u_1$, Eingangsstrom $i_1 = 0$.',
    },
    {
      term: 'Spannungsfolger',
      def: 'Nichtinvertierender Verstärker mit $v_u = 1$ ($R_0 = 0$, $R_1 \\to \\infty$): $u_0 = u_1$.\n- belastet die Quelle nicht ($i_1 = 0$)\n- liefert beliebige Ausgangsströme (Impedanzwandler)',
    },
    {
      term: 'Spannungsfolger',
      img: 'schaltbilder/spannungsfolger.svg',
      def: 'Ausgang direkt auf (−) zurückgeführt: $u_0 = u_1$.',
    },
    {
      term: 'Op-Amp-NIK (negativer Widerstand)',
      def: 'Op-Amp mit zwei gleichen Widerständen $R$ und Last $R_L$: Der Eingang verhält sich wie $-R_L$. Je nach Eingangspolung entsteht eine S- oder N-Kennlinie.',
    },
    {
      term: 'S- und N-Kennlinie',
      def: 'Kennlinien realer negativer Widerstände mit Op-Amp:\n- **S-Kennlinie:** stromgesteuert, kurzschlussinstabil, leerlaufstabil\n- **N-Kennlinie:** spannungsgesteuert, leerlaufinstabil, kurzschlussstabil',
    },
    {
      term: 'Op-Amp-Realisierung stückweise linearer Widerstände',
      def: 'Mit Op-Amp und pn-Diode lassen sich ideale Diode, konkaver und konvexer Widerstand sowie S-/N-Kennlinien sehr gut nachbilden.',
    },
    {
      term: 'Lineare Op-Amp-Schaltung',
      def: 'Durch die Beschaltung ist sichergestellt, dass der Op-Amp nur im linearen Bereich arbeitet – er kann allein durch einen Nullor modelliert werden.',
      calc: '- Op-Amp durch Nullor ersetzen (Eingang Nullator, Ausgang Norator)\n- Nullator: $u_d = 0$ und $i_+ = i_- = 0$ ansetzen\n- KCL an den Eingangsknoten aufstellen\n- nach der Ausgangsspannung auflösen',
    },
    {
      term: 'Virtuelle Masse',
      def: 'Liegt (+) auf Masse, so liegt wegen des Nullators auch (−) auf Massepotential – ohne Strom zur Masse ableiten zu können.',
    },
    {
      term: 'Virtuelle Masse',
      img: 'schaltbilder/virtuelle-masse.svg',
      def: 'Knoten 1 liegt auf dem Potential von Knoten 0, nimmt aber keinen Strom auf.',
    },
    {
      term: 'Summierer',
      def: 'Kombination aus invertierendem und nichtinvertierendem Verstärker: bildet eine beliebige Linearkombination der Eingangsspannungen.',
      more: '- Eingänge $u_1, \\dots, u_n$ über $G_1, \\dots, G_n$ an (−) → negative Koeffizienten\n- Eingänge $u_1\', \\dots, u_m\'$ über $G_1\', \\dots, G_m\'$ an (+) → positive Koeffizienten\n- Potential $u_z$ an (+) aus KCL, wegen Nullator auch an (−)\n- KCL am (−)-Eingang liefert $u_0$ als Linearkombination',
      moreLabel: 'Methode',
    },
    {
      term: 'Summierer',
      img: 'schaltbilder/summierer.svg',
      def: 'Eingänge mit Leitwerten $G_k$ an (−) und $G\'_k$ an (+), Rückkopplung $G_0$.',
    },
    {
      term: 'Gesteuerte Quellen mit Op-Amps',
      def: 'Alle vier gesteuerten Quellen sind mit Op-Amps realisierbar, wenn je ein Pol von Ein- und Ausgang auf Masse liegt; meist braucht man zwei Op-Amps.',
      more: '- **VCVS** mit $\\mu = 1 + \\frac{R_0}{R_1} > 1$: nichtinvertierender Verstärker\n- **VCVS** mit $\\mu < 0$: Spannungsfolger in Kette mit invertierendem Verstärker\n- **CCVS** mit $r < 0$: invertierender Verstärker ohne Eingangswiderstand (Transimpedanz)\n- **VCCS**, **CCCS** analog über Nullor-Realisierungen\n- **Gyrator**: NIK in Kette mit einem Negativ-Immittanz-Inverter (NII)',
      moreLabel: 'Übersicht',
    },

    { chapter: '6 Resistive Mehrtore' },
    {
      term: 'Resistives Mehrtor (p-Tor)',
      def: 'Gedächtnislose „Black Box“ mit $2p$ Klemmen, beschrieben durch Torspannungsvektor $\\boldsymbol{u}$ und Torstromvektor $\\boldsymbol{i}$. Betriebsraum hat die Dimension $p$.',
      more: '- ein $(p+1)$-Pol kann stets als $p$-Tor aufgefasst werden, nicht umgekehrt\n- Beschreibungen wie bei Zweitoren, nur „2“ durch $p$ ersetzen: $\\mathcal{F} = \\operatorname{Kern}[M, N]$ mit $\\operatorname{Rang}[M,N] = p$\n- Kettenbeschreibung nur bei gerader Torzahl $p = 2m$ (Eingänge $a$, Ausgänge $b$)',
      moreLabel: 'Details',
    },
    {
      term: 'Mehrtor-Übertrager',
      def: 'Verlustloses und reziprokes Mehrtor. Die Hybridmatrix ist schiefsymmetrisch mit Null-Hauptdiagonalblöcken: $H = \\begin{bmatrix}\\boldsymbol{0} & H_{a,b}\\\\ -H_{a,b}^{\\mathrm{T}} & \\boldsymbol{0}\\end{bmatrix}$.',
    },
    {
      term: 'Zirkulator',
      def: 'Verlustloses, nicht reziprokes Mehrtor (v. a. Mikrowellentechnik): Leistung von Tor 1 geht zu Tor 2, von Tor 2 zu Tor 3, usw.',
      more: 'Dreitor-Zirkulator:\n$$R = \\begin{bmatrix}0 & R & -R\\\\ -R & 0 & R\\\\ R & -R & 0\\end{bmatrix}$$\n- $R = -R^{\\mathrm{T}}$ → verlustlos, nicht reziprok\n- Anwendung: Senden und Empfangen über dieselbe Antenne\n- realisierbar mit einem Gyrator; $p$-Tor-Zirkulatoren aus mehreren Dreitor-Zirkulatoren',
      moreLabel: 'Methode',
    },
    {
      term: 'Zirkulator',
      img: 'schaltbilder/zirkulator.svg',
      def: 'Drei-Tor-Zirkulator mit Quelle an Tor 1 und Abschlusswiderständen $R$.',
    },
    {
      term: 'Multiplizierer',
      def: 'Nichtlineares Dreitor, Baustein von Analogrechnern:\n- $u_3 = \\frac{u_1 u_2}{U_M}$ mit Multipliziererkonstante $U_M$\n- Eingangsströme $i_1 = i_2 = 0$',
    },
    {
      term: 'Multiplizierer',
      img: 'schaltbilder/multiplizierer.svg',
      def: '$u_3 = \\frac{u_1 \\cdot u_2}{U_M}$, $i_1 = i_2 = 0$.',
    },
    {
      term: 'Dividierer',
      def: 'Nichtlineares Dreitor: $u_3 = U_D \\frac{u_1}{u_2}$; realisierbar mit einem Multiplizierer im Rückkoppelzweig eines Op-Amps.',
    },
    {
      term: 'Dividierer',
      img: 'schaltbilder/dividierer.svg',
      def: '$u_3 = U_D\\, \\frac{u_1}{u_2}$, $i_1 = i_2 = 0$.',
    },

    { chapter: '7 Allgemeine Analyseverfahren' },
    {
      term: 'Allgemeine Analyseverfahren',
      def: 'Systematische Methoden, um Ströme und Spannungen eines Netzwerks aus Verbindungsstruktur (Kirchhoff) und Elementcharakteristiken zu berechnen – von Hand oder per Rechner.',
    },
    {
      term: 'Netzwerkgraph',
      def: 'Gerichteter Graph mit $n$ Knoten und $b$ Zweigen (Kanten), der nur die Verbindungsstruktur beschreibt; die Zweigrichtung gibt die (assoziierten) Zählpfeile an.',
    },
    {
      term: 'Zweigspannung und Zweigstrom',
      def: 'Spannung bzw. Strom eines Zweigs (Kante) des Netzwerkgraphen, bezogen auf die Zweigrichtung: Vektoren $\\boldsymbol{u}, \\boldsymbol{i} \\in \\mathbb{R}^b$.',
    },
    {
      term: 'Baum',
      def: 'Teilgraph, der zusammenhängend ist, alle $n$ Knoten enthält und keine Schleifen hat.\n- $n - 1$ Baumzweige\n- die übrigen $b - (n-1)$ Zweige sind Verbindungskanten',
    },
    {
      term: 'Baumzweige und Verbindungskanten',
      def: '- **Baumzweige** (twigs): die $n - 1$ Kanten des Baums\n- **Verbindungskanten** (links): die $s = b - (n - 1)$ restlichen Kanten',
    },
    {
      term: 'Anzahl unabhängiger Kirchhoff-Gleichungen',
      def: 'Genau $n - 1$ unabhängige KCL- und $s = b - (n-1)$ unabhängige KVL-Gleichungen – zusammen $b$. Die übrigen $b$ Gleichungen liefern die Elemente ($2b$ Unbekannte).',
      more: 'Konstruktion mit einem Baum:\n- erst Baumzweige, dann Verbindungskanten nummerieren\n- **KVL:** je eine Schleife pro Verbindungskante, nur über Baumzweige geschlossen, Richtung der Verbindungskante → $s$ Gleichungen\n- **KCL:** je ein Superknoten, dessen Hülle genau ein Baumzweig durchstößt, Richtung des Baumzweigs → $n-1$ Gleichungen',
      moreLabel: 'Methode',
    },
    {
      term: 'Mascheninzidenzmatrix $B$',
      def: 'Koeffizientenmatrix der unabhängigen KVL-Gleichungen: $B\\boldsymbol{u} = [B_t, \\boldsymbol{1}_s]\\boldsymbol{u} = \\boldsymbol{0}$. Vollrang $s$ wegen der Einheitsmatrix im Verbindungskanten-Teil.',
    },
    {
      term: 'Kirchhoff-Gleichungen zu einem Baum',
      def: '- **KVL:** $[B_t, \\boldsymbol{1}_s]\\,\\boldsymbol{u} = \\boldsymbol{0}$\n- **KCL:** $[\\boldsymbol{1}_{n-1}, -B_t^{\\mathrm{T}}]\\,\\boldsymbol{i} = \\boldsymbol{0}$, denn es gilt immer $A_l = -B_t^{\\mathrm{T}}$',
    },
    {
      term: 'Nullraum- und Bildraum-Darstellung (Kirchhoff)',
      def: '- **Nullraum:** $B\\boldsymbol{u} = \\boldsymbol{0}$, $A\\boldsymbol{i} = \\boldsymbol{0}$\n- **Bildraum:** $\\boldsymbol{u} = A^{\\mathrm{T}}\\boldsymbol{u}_k$, $\\boldsymbol{i} = B^{\\mathrm{T}}\\boldsymbol{i}_m$\n\nBeide sind nicht eindeutig.',
    },
    {
      term: 'Knoteninzidenzmatrix $A$',
      def: '$(n-1) \\times b$-Matrix der KCL-Gleichungen ohne Bezugsknoten: $a_{\\beta\\alpha} = +1$, wenn Zweig $\\alpha$ von Knoten $\\beta$ ausgeht, $-1$, wenn er hinführt, sonst 0.',
      more: '- KCL in Nullraum-Darstellung: $A\\,\\boldsymbol{i} = \\boldsymbol{0}$\n- KVL in Bildraum-Darstellung: $\\boldsymbol{u} = A^{\\mathrm{T}}\\boldsymbol{u}_k$ (Zweigspannung = Differenz der Knotenspannungen)\n- ergänzt man die Zeile des Bezugsknotens, enthält jede Spalte genau eine $+1$ und eine $-1$ → komplette Graphstruktur\n- einfach aufzustellen, auch per Rechner; kein Baum nötig',
      moreLabel: 'Methode',
    },
    {
      term: 'Knotenspannungsvektor $\\boldsymbol{u}_k$',
      def: 'Vektor der $n - 1$ Knotenspannungen gegen den Bezugsknoten. Alle Zweigspannungen folgen daraus: $\\boldsymbol{u} = A^{\\mathrm{T}} \\boldsymbol{u}_k$.',
    },
    {
      term: 'Tellegen’scher Satz',
      def: 'Jeder Zweigspannungsvektor, der das KVL erfüllt, ist orthogonal zu jedem Zweigstromvektor, der das KCL erfüllt: $\\boldsymbol{u}^{\\mathrm{T}} \\boldsymbol{i} = 0$ – sogar für verschiedene Netzwerke gleicher Struktur.',
      more: 'Beweis: $\\boldsymbol{u}^{\\mathrm{T}}\\boldsymbol{i} = \\boldsymbol{u}_k^{\\mathrm{T}} A\\, \\boldsymbol{i} = 0$ wegen $A\\boldsymbol{i} = \\boldsymbol{0}$.\n\nFolgerungen:\n- Spannungsraum $\\mathcal{F}_u = \\operatorname{Bild}(A^{\\mathrm{T}})$, Dimension $n-1$\n- Stromraum $\\mathcal{F}_i = \\operatorname{Kern}(A)$, Dimension $b-(n-1)$\n- $\\mathcal{F}_u \\perp \\mathcal{F}_i$, zusammen ganz $\\mathbb{R}^b$\n- von KVL, KCL und Tellegen folgt jedes aus den beiden anderen',
      moreLabel: 'Folgerungen',
    },
    {
      term: 'Tableau-Gleichungssystem',
      def: '$2b$ Gleichungen für $2b$ Unbekannte:\n- $b$ Kirchhoff-Gleichungen\n- $b$ Elementgleichungen $M\\boldsymbol{u} + N\\boldsymbol{i} = \\boldsymbol{e}$\n\nEindeutig lösbar, wenn $\\det T \\neq 0$.',
      more: '$$\\begin{bmatrix} B & \\boldsymbol{0} \\\\ \\boldsymbol{0} & A \\\\ M & N \\end{bmatrix} \\begin{bmatrix}\\boldsymbol{u}\\\\ \\boldsymbol{i}\\end{bmatrix} = \\begin{bmatrix}\\boldsymbol{0}\\\\ \\boldsymbol{0}\\\\ \\boldsymbol{e}\\end{bmatrix}$$\n- $\\boldsymbol{e}$: Erregungsvektor (alle unabhängigen Quellen)\n- nur Zweipole: $M$, $N$ diagonal; Mehrtore: blockdiagonal\n- ohne Einschränkungen anwendbar, ideal für Rechner (dünn besetzte Matrix)',
      moreLabel: 'Aufbau',
    },
    {
      term: 'Erregungsvektor $\\boldsymbol{e}$',
      def: 'Vektor auf der rechten Seite der Elementgleichungen $M\\boldsymbol{u} + N\\boldsymbol{i} = \\boldsymbol{e}$, der alle unabhängigen Quellen enthält.',
    },
    {
      term: 'Knotenspannungsanalyse',
      def: 'KCL in Nullraum- ($A\\boldsymbol{i} = \\boldsymbol{0}$) und KVL in Bildraum-Darstellung ($\\boldsymbol{u} = A^{\\mathrm{T}}\\boldsymbol{u}_k$) mit den Knotenspannungen als zusätzlichen Variablen. Kein Baum nötig.',
      more: '- formal: $n-1$ zusätzliche Leerlauf-Messzweige zum Bezugsknoten (Sternbaum)\n- Knotentableausystem: $2b + (n-1)$ Gleichungen für $2b + (n-1)$ Unbekannte\n- für jede Schaltung mit linearen Elementen anwendbar',
      moreLabel: 'Methode',
    },
    {
      term: 'Maschenstromanalyse',
      def: 'Dual zur Knotenspannungsanalyse: KVL in Nullraum- ($B\\boldsymbol{u} = \\boldsymbol{0}$), KCL in Bildraum-Darstellung ($\\boldsymbol{i} = B^{\\mathrm{T}}\\boldsymbol{i}_m$) mit Maschenströmen. Nur für planare Netzwerke.',
      calc: '- planares Netzwerk: je Masche (Fenster) einen Maschenstrom mit Richtung festlegen\n- KVL je Masche aufstellen; Zweigströme = Summe der anliegenden Maschenströme\n- Gleichungssystem nach den Maschenströmen lösen\n- Zweigströme und -spannungen daraus berechnen',
      more: '- **Masche:** elementare Schleife eines planaren Graphen ($s$ Stück)\n- Kantenstrom = Summe der anliegenden Maschenströme (negativ bei entgegengesetzter Orientierung)\n- Maschentableausystem: $2b + s$ Gleichungen\n- nicht planare Netzwerke lassen sich mit idealen 1:1-Übertragern planar machen',
      moreLabel: 'Methode',
    },
    {
      term: 'Planares Netzwerk',
      def: 'Netzwerk, dessen Graph sich überkreuzungsfrei in der Ebene zeichnen lässt. Seine $s$ elementaren Schleifen heißen Maschen.',
    },
    {
      term: 'Maschenstrom',
      def: 'Zusätzliche, teils fiktive Variable je Masche (Richtung der Masche); jeder Zweigstrom ist die vorzeichenbehaftete Summe der anliegenden Maschenströme.',
    },
    {
      term: 'Nichtlineares Tableau',
      def: 'Bei $p$ nichtlinearen Zweigen:\n- $2b - p$ lineare Gleichungen (Kirchhoff + lineare Elemente)\n- $p$ nichtlineare Gleichungen $\\boldsymbol{f}(\\boldsymbol{u}, \\boldsymbol{i}) = \\boldsymbol{0}$\n\nLösung meist numerisch.',
    },
    {
      term: 'Newton-Raphson-Algorithmus',
      def: 'Iteratives Nullstellen-Suchverfahren: Tangente im aktuellen Schätzwert mit der Achse schneiden, $x^{(j+1)} = x^{(j)} - \\frac{f(x^{(j)})}{f\'(x^{(j)})}$.',
      more: 'Mehrdimensional mit der Jacobimatrix $J$:\n$$\\boldsymbol{x}^{(j+1)} = \\boldsymbol{x}^{(j)} - J^{-1}(\\boldsymbol{x}^{(j)})\\, \\boldsymbol{f}(\\boldsymbol{x}^{(j)})$$\n- lokales Verfahren: Startwert entscheidend, findet nur eine von mehreren Lösungen, kann divergieren\n- langsame Konvergenz, wenn die Steigung an der Nullstelle verschwindet\n- konvergiert immer bei konvexem/konkavem $f$ mit genau einer Nullstelle\n- schaltungstechnisch: wiederholte Analyse eines linearen Netzwerks, in dem jedes nichtlineare Element durch seine affine Linearisierung ersetzt ist',
      moreLabel: 'Methode',
    },
    {
      term: 'Reduzierte Knotenspannungsanalyse',
      def: 'Gleichungssystem nur in den Knotenspannungen: $G_k\\, \\boldsymbol{u}_k = \\boldsymbol{i}_q$ mit $G_k = A G A^{\\mathrm{T}}$.\n- Voraussetzung: alle Elemente spannungsgesteuert ($N$ invertierbar)',
      calc: '- Spannungsquellen mit Serienwiderstand in Stromquellen umwandeln\n- $G_k$ und $\\boldsymbol{i}_q$ aufstellen\n- $G_k \\boldsymbol{u}_k = \\boldsymbol{i}_q$ lösen\n- Zweigspannungen aus Knotenspannungen: $u_{\\alpha\\beta} = u_\\alpha - u_\\beta$',
      more: 'Herleitung aus dem Knotentableau:\n- Elemente: $\\boldsymbol{i} = G\\boldsymbol{u} + \\boldsymbol{i}_0$ mit Kantenleitwertsmatrix $G = -N^{-1}M$ und $\\boldsymbol{i}_0 = N^{-1}\\boldsymbol{e}$\n- KVL: $\\boldsymbol{u} = A^{\\mathrm{T}}\\boldsymbol{u}_k$\n- KCL: $A\\boldsymbol{i} = \\boldsymbol{0}$\n$$\\Rightarrow\\; \\underbrace{A G A^{\\mathrm{T}}}_{G_k}\\, \\boldsymbol{u}_k = \\underbrace{-A\\, \\boldsymbol{i}_0}_{\\boldsymbol{i}_q}$$\nJede Zeile ist das KCL eines Knotens, ausgedrückt durch Knotenspannungen.',
      moreLabel: 'Herleitung',
    },
    {
      term: 'Knotenleitwertsmatrix $G_k$',
      def: '$(n-1)\\times(n-1)$-Matrix der reduzierten Knotenspannungsanalyse, $G_k = A G A^{\\mathrm{T}}$; direkt aufstellbar nach einfachen Regeln.',
      calc: 'Aufstellen (nur spannungsgesteuerte Elemente):\n- Bezugsknoten wählen, übrige Knoten nummerieren\n- **Diagonale** $g_{kk}$: Summe aller Leitwerte am Knoten $k$\n- **außerhalb** $g_{kl}$: minus Summe der Leitwerte zwischen $k$ und $l$\n- **rechte Seite** $i_{q,k}$: Summe der in Knoten $k$ hineinfließenden Quellströme',
      more: '- Leitwert zwischen Knoten $\\alpha$ und Masse: $+G$ auf Diagonalelement $(\\alpha, \\alpha)$\n- Leitwert zwischen $\\alpha$ und $\\beta$: $+G$ auf $(\\alpha,\\alpha)$ und $(\\beta,\\beta)$, $-G$ auf $(\\alpha,\\beta)$ und $(\\beta,\\alpha)$\n- VCCS: gesteuerter Strom durch Knotenspannungen ausdrücken (Spalten = steuernde Knoten) und in die KCL-Zeilen der Ausgangsknoten eintragen\n- Quellenvektor $\\boldsymbol{i}_q$: in den Knoten hineinfließender Quellstrom $+$, herausfließender $-$',
      moreLabel: 'Regeln',
    },
    {
      term: 'Knoten-Stromquellenvektor $\\boldsymbol{i}_q$',
      def: 'Rechte Seite der reduzierten Knotenspannungsanalyse: Quellstrom in einen Knoten hinein → positiver Eintrag, heraus → negativer Eintrag.',
    },
    {
      term: 'Reduzierte Maschenstromanalyse',
      def: 'Dual zur reduzierten Knotenspannungsanalyse: für planare Netzwerke mit nur stromgesteuerten Elementen ($M$ invertierbar) – $s \\times s$-Maschenwiderstandsmatrix und Maschen-Spannungsquellenvektor.',
    },
    {
      term: 'Nicht spannungsgesteuerte Elemente in $G_k$',
      def: 'Spannungsquellen, VCVS, CCVS, CCCS, Übertrager und Op-Amps müssen erst umgeformt werden: Quellenumwandlung, Ohm’sches Gesetz, Dualwandlung mit Gyratoren oder Nullor-Einbau.',
      more: '- **Quellenumwandlung:** Spannungsquelle mit Serienwiderstand → Stromquelle mit Parallelleitwert (Zwischenknoten verschwindet)\n- **Ohm’sches Gesetz:** Steuerstrom durch einen Widerstand als Spannung ausdrücken (CCCS → VCCS)\n- **Dualwandlung:** Gyrator vor ein stromgesteuertes Tor schalten → spannungsgesteuert (VCVS, CCCS: +1 Knoten, CCVS: +2 Knoten)\n- **Übertrager:** durch zwei Gyratoren in Kette ersetzen\n- **Op-Amp:** Nullator/Norator einbauen',
      moreLabel: 'Methoden',
    },
    {
      term: 'Dualwandlung (Analyse)',
      def: 'Jedes stromgesteuerte Tor wird durch einen vorgeschalteten Gyrator zu einem spannungsgesteuerten Tor und kann dann in $G_k$ eingetragen werden.',
    },
    {
      term: 'Nullor-Einbau in $G_k$',
      def: 'Zuerst $G_k^0$ mit Leerläufen statt Nullator/Norator aufstellen, dann:\n- **Nullator** zwischen $\\alpha$, $\\beta$: Spalten $\\alpha$ und $\\beta$ addieren\n- **Norator** zwischen $\\gamma$, $\\delta$: Zeilen $\\gamma$ und $\\delta$ addieren (Superknoten)',
      more: '- Nullator erzwingt $u_{k\\alpha} = u_{k\\beta}$ → Spalten zusammenfassen, eine Unbekannte weniger; liegt $\\beta$ auf Masse, entfällt Spalte $\\alpha$\n- Norator: Strom beliebig → KCL der beiden Knoten zu einer Superknotengleichung addieren; liegt ein Pol auf Masse, einfach Zeile $\\gamma$ streichen\n- jeder Nullator kostet eine Spalte, jeder Norator eine Zeile → nur paarweise (Nullor) bleibt $G_k$ quadratisch',
      moreLabel: 'Methode',
    },

    { chapter: '8 Netzwerkeigenschaften' },
    {
      term: 'Duales Netzwerk',
      def: 'Ströme und Spannungen werden über $R_d$ vertauscht: Knotengleichungen ↔ Maschengleichungen. Rein galvanisch nur für planare Netzwerke möglich.',
      more: 'Konstruktion für planare Netzwerke:\n- jede Masche → ein Knoten (auch die äußere Masche)\n- jeder Knoten → eine Masche\n- Serienschaltung ↔ Parallelschaltung\n- jedes Element durch sein duales ersetzen (z. B. Spannungsquelle ↔ Stromquelle, $R$ ↔ $G$, $C$ ↔ $L$)\n\nNicht planare Netzwerke vorher mit idealen Übertragern planar machen.',
      moreLabel: 'Konstruktion',
    },
    {
      term: 'Substitutionstheorem',
      def: 'Ist $\\mathcal{N}_1$ spannungsgesteuert (bzw. stromgesteuert), kann das angeschlossene Netzwerk $\\mathcal{N}_2$ durch die Spannungsquelle $u(t)$ (bzw. Stromquelle $i(t)$) ersetzt werden, ohne dass sich in $\\mathcal{N}_1$ etwas ändert.',
      more: '- gilt auch für nichtlineare, zeitvariante Netzwerke und sinngemäß für Mehrtore\n- Voraussetzung: das Gesamtnetzwerk ist eindeutig lösbar\n- Achtung: ist $\\mathcal{N}_1$ nicht spannungsgesteuert, kann die Spannungsquellen-Substitution mehrdeutige Lösungen erzeugen',
      moreLabel: 'Details',
    },
    {
      term: 'Superpositionsprinzip',
      def: 'In einem linearen, eindeutig lösbaren Netzwerk ist jede Spannung und jeder Strom die Summe der Reaktionen auf die einzelnen unabhängigen Quellen.',
      calc: '- nur für lineare Netzwerke\n- jeweils **eine** unabhängige Quelle aktiv lassen, alle anderen nullsetzen (Spannungsquelle → Kurzschluss, Stromquelle → Leerlauf)\n- gesuchte Größe für jede Quelle einzeln berechnen\n- Teilergebnisse addieren',
      more: '- Beweis über die Tableaumatrix: $\\begin{bmatrix}\\boldsymbol{u}\\\\ \\boldsymbol{i}\\end{bmatrix} = T^{-1}\\begin{bmatrix}\\boldsymbol{0}\\\\ \\boldsymbol{e}\\end{bmatrix}$ ist linear in $\\boldsymbol{e}$\n- Vorgehen: jeweils eine Quelle behalten, alle anderen durch **Nullquellen** ersetzen\n- Spannungsquelle → Kurzschluss, Stromquelle → Leerlauf\n- Teilantworten addieren',
      moreLabel: 'Methode',
    },
    {
      term: 'Differenzverstärker',
      def: 'Op-Amp mit $R_1, R_2$ am (−)- und Teiler $R_3, R_4$ am (+)-Eingang. Für $\\frac{R_1}{R_2} = \\frac{R_3}{R_4}$ gilt $u_a = \\frac{R_2}{R_1}(u_{02} - u_{01})$.',
      more: 'Mit Superposition:\n- nur $u_{01}$: invertierender Verstärker, $u_{a1} = -\\frac{R_2}{R_1}u_{01}$\n- nur $u_{02}$: Spannungsteiler + nichtinvertierender Verstärker, $u_{a2} = \\frac{R_4}{R_3 + R_4}\\left(1 + \\frac{R_2}{R_1}\\right)u_{02}$\n- $u_a = u_{a1} + u_{a2}$',
      moreLabel: 'Herleitung',
    },
    {
      term: 'Differenzverstärker',
      img: 'schaltbilder/differenzverstaerker.svg',
      def: 'Für $R_1/R_2 = R_3/R_4$: $u_a = \\frac{R_2}{R_1}(u_{02} - u_{01})$.',
    },
    {
      term: 'Zweipolersatzschaltungen',
      def: 'Jede lineare, resistive, intern eindeutig lösbare Schaltung mit einem Klemmenpaar verhält sich wie eine lineare Quelle: Helmholtz/Thévenin- oder Mayer/Norton-Ersatzzweipol.',
      calc: 'Ersatzspannungsquelle bestimmen:\n- Leerlaufspannung $u_0$ berechnen\n- Innenwiderstand $R_i$ berechnen (Quellen nullsetzen oder $u_0/i_0$)\n- Ersatz: $u_0$ in Serie mit $R_i$ (bzw. Stromquelle $i_0 = u_0/R_i$ parallel zu $R_i$)',
      more: '- **Thévenin:** Spannungsquelle $u_0$ in Serie mit $R_i$: $u = u_0 + R_i\\, i$ (für $m \\neq 0$)\n- **Norton:** Stromquelle $i_0$ parallel zu $G_i$ (für $n \\neq 0$)\n- Bestimmung: Leerlaufspannung $u_0$ und Kurzschlussstrom $i_0$ messen, $R_i = -\\frac{u_0}{i_0}$ (Vorzeichen je nach Zählpfeil)\n- oder: alle unabhängigen Quellen durch Nullquellen ersetzen und von außen erregen (gesteuerte Quellen bleiben!)\n- für $G_i \\neq 0$ und $R_i \\neq 0$ existieren beide',
      moreLabel: 'Methode',
    },
    {
      term: 'Thévenin- und Norton-Ersatzzweipol',
      img: 'schaltbilder/zweipolersatzschaltungen.svg',
      def: 'Oben: Spannungsquelle $u_0$ mit $R_i$ (Helmholtz/Thévenin). Unten: Stromquelle $i_0$ mit $G_i$ (Mayer/Norton).',
    },
    {
      term: 'Innenwiderstand bestimmen',
      def: '- **Methode 1:** unabhängige Quellen durch Nullquellen ersetzen (gesteuerte bleiben!), von außen mit $u$ erregen, $i$ messen: $R_i = u/i$\n- **Methode 2:** aus Leerlaufspannung und Kurzschlussstrom',
      calc: '- **über Quellen:** unabhängige Quellen durch Nullquellen ersetzen ($u_Q \\to$ Kurzschluss, $i_Q \\to$ Leerlauf), gesteuerte bleiben; Ersatzwiderstand an den Klemmen berechnen\n- **über Kennwerte:** $R_i = u_0 / i_0$',
    },
    {
      term: 'Passivität zusammengesetzter Netzwerke',
      def: 'Ein Ein- oder Mehrtor, das innen nur aus passiven Elementen besteht, ist selbst passiv (Beweis mit dem Tellegen’schen Satz).',
    },
    {
      term: 'Strikt inkrementale Passivität',
      def: 'Für je zwei verschiedene Betriebspunkte gilt $(\\boldsymbol{u}\' - \\boldsymbol{u}\'\')^{\\mathrm{T}}(\\boldsymbol{i}\' - \\boldsymbol{i}\'\') > 0$ – der Betriebsraum ist strikt monoton zunehmend (Sekanten mit positiver Steigung).',
      more: '- impliziert **nicht** Passivität: inkremental passive Elemente können aktiv sein, passive können inkremental aktiv sein (Tunneldiode)\n- lineare passive Elemente sind immer auch inkremental passiv\n- Netzwerk nur aus strikt inkremental passiven Elementen → selbst strikt inkremental passiv\n- wichtig für Stabilität und eindeutige Lösbarkeit',
      moreLabel: 'Eigenschaften',
    },
    {
      term: 'Eindeutigkeit bei inkremental passiven Netzwerken',
      def: 'Besteht ein Netzwerk nur aus strikt inkremental passiven Elementen, hat es höchstens eine Lösung. Mit Quellen gilt das weiter, solange keine Schleife nur aus Spannungsquellen und keine Schnittmenge nur aus Stromquellen besteht.',
    },

    { chapter: '9 Reaktive Netzwerkelemente' },
    {
      term: 'Reaktanz (reaktives Netzwerkelement)',
      def: 'Oberbegriff für kapazitive und induktive Elemente – Elemente, die Energie speichern können und deshalb ein Gedächtnis haben.',
    },
    {
      term: 'Ladung und Fluss',
      def: 'Zusätzliche Betriebsgrößen:\n- **Ladung** $q(t) = \\int_{-\\infty}^{t} i(\\tau)\\,\\mathrm{d}\\tau$, Einheit Coulomb ($1\\,\\text{C} = 1\\,\\text{As}$)\n- **Fluss** $\\Phi(t) = \\int_{-\\infty}^{t} u(\\tau)\\,\\mathrm{d}\\tau$, Einheit Weber ($1\\,\\text{Wb} = 1\\,\\text{Vs}$)',
      more: 'Mit Bezugszeitpunkt $t_0$:\n$$q(t) = q(t_0) + \\int_{t_0}^{t} i(\\tau)\\,\\mathrm{d}\\tau, \\qquad \\Phi(t) = \\Phi(t_0) + \\int_{t_0}^{t} u(\\tau)\\,\\mathrm{d}\\tau$$\nUmgekehrt: $i = \\frac{\\mathrm{d}q}{\\mathrm{d}t}$, $u = \\frac{\\mathrm{d}\\Phi}{\\mathrm{d}t}$.',
      moreLabel: 'Definition',
    },
    {
      term: 'Kapazitives Eintor',
      def: 'Durch eine Beziehung zwischen Ladung $q(t)$ und Spannung $u(t)$ zum selben Zeitpunkt beschrieben: Kennlinie in der $u$-$q$-Ebene, $f_C(u, q) = 0$.',
    },
    {
      term: 'Induktives Eintor',
      def: 'Durch eine Beziehung zwischen Fluss $\\Phi(t)$ und Strom $i(t)$ zum selben Zeitpunkt beschrieben: Kennlinie in der $i$-$\\Phi$-Ebene, $f_L(i, \\Phi) = 0$.',
    },
    {
      term: 'Nichtlineare Kapazität und Induktivität',
      img: 'schaltbilder/nichtlineare-c-l.svg',
      def: 'Elementsymbole allgemeiner (nichtlinearer) kapazitiver und induktiver Eintore.',
    },
    {
      term: 'Gesteuerte Reaktanzen',
      def: '- **Kapazität:** spannungsgesteuert $q = \\hat q(u)$ oder ladungsgesteuert $u = \\hat u(q)$\n- **Induktivität:** stromgesteuert $\\Phi = \\hat\\Phi(i)$ oder flussgesteuert $i = \\hat\\imath(\\Phi)$',
    },
    {
      term: 'Beispiele nichtlinearer Reaktanzen',
      def: 'Kondensator mit ferroelektrischem Dielektrikum, Spule mit ferromagnetischem Kern, Varaktordiode, Josephson-Kontakt.',
    },
    {
      term: 'Memristor',
      def: 'Viertes algebraisches Eintor: Beziehung zwischen Fluss $\\Phi$ und Ladung $q$, Kennlinie in der $\\Phi$-$q$-Ebene, $f_M(\\Phi, q) = 0$. „Memory Resistor“ (Chua, 1971).',
    },
    {
      term: 'Algebraisches Netzwerkelement',
      def: 'Element, für das mindestens eine der vier konstituierenden Funktionen $f_R(u,i)$, $f_C(u,q)$, $f_L(i,\\Phi)$, $f_M(\\Phi,q)$ existiert.',
      more: '- Nullator, Norator, Leerlauf, Kurzschluss: resistiv, kapazitiv, induktiv und memristiv zugleich\n- Spannungsquellen: resistiv und kapazitiv\n- Stromquellen: resistiv und induktiv\n- gleichartige algebraische Elemente lassen sich rein algebraisch zusammenfassen (z. B. $C$ + Spannungsquellen + Nullatoren/Noratoren = ein kapazitives Mehrtor)',
      moreLabel: 'Mehrfachcharakter',
    },
    {
      term: 'Dualität von Kapazität und Induktivität',
      def: 'Mit $u \\to R_d\\,i$, $i \\to u/R_d$ wird $q \\to \\Phi/R_d$ und $\\Phi \\to R_d\\, q$.\n- Kapazitäten und Induktivitäten sind zueinander dual\n- Dualwandlung mit einem Gyrator',
      more: '- duale Kennlinie: von der $u$-$q$- in die $i$-$\\Phi$-Ebene übertragen und Achsen mit $R_d$ umrechnen\n- lineare Elemente: $C$ ist dual zu $L^d = R_d^2\\, C$, $\\;L$ dual zu $C^d = \\frac{L}{R_d^2}$\n- daher reicht im Prinzip ein Typ von Energiespeicher (mit Gyrator)',
      moreLabel: 'Details',
    },
    {
      term: 'Lineare Kapazität',
      def: '$q(t) = C\\,u(t)$, also $i = C\\frac{\\mathrm{d}u}{\\mathrm{d}t}$. Einheit Farad: $1\\,\\text{F} = 1\\,\\frac{\\text{C}}{\\text{V}} = 1\\,\\frac{\\text{As}}{\\text{V}}$.',
      more: 'Integralform:\n$$u(t) = u(t_0) + \\frac{1}{C}\\int_{t_0}^{t} i(\\tau)\\,\\mathrm{d}\\tau$$\nDifferentialform:\n$$i(t) = C\\,\\frac{\\mathrm{d}u(t)}{\\mathrm{d}t}$$',
      moreLabel: 'Gleichungen',
    },
    {
      term: 'Lineare Induktivität',
      def: '$\\Phi(t) = L\\,i(t)$, also $u = L\\frac{\\mathrm{d}i}{\\mathrm{d}t}$. Einheit Henry: $1\\,\\text{H} = 1\\,\\frac{\\text{Wb}}{\\text{A}} = 1\\,\\frac{\\text{Vs}}{\\text{A}}$.',
      more: 'Integralform:\n$$i(t) = i(t_0) + \\frac{1}{L}\\int_{t_0}^{t} u(\\tau)\\,\\mathrm{d}\\tau$$\nDifferentialform:\n$$u(t) = L\\,\\frac{\\mathrm{d}i(t)}{\\mathrm{d}t}$$',
      moreLabel: 'Gleichungen',
    },
    {
      term: 'Lineare Kapazität und Induktivität',
      img: 'schaltbilder/lineare-c-l.svg',
      def: 'Elementsymbole: links Kapazität $C$, rechts Induktivität $L$.',
    },
    {
      term: 'Streng lineare Reaktanz',
      def: 'Kennlinie ist ein Unterraum der $u$-$q$- bzw. $i$-$\\Phi$-Ebene:\n- Dimension 0: Nullator\n- Dimension 1: lineare Kapazität bzw. Induktivität\n- Dimension 2: Norator',
    },
    {
      term: 'Gedächtnis reaktiver Elemente',
      def: 'Das Verhalten hängt vom Verlauf der Klemmengrößen zu früheren Zeitpunkten ab; die ganze Vorgeschichte steckt im aktuellen Zustand, z. B. $u_C(t_1)$. Anwendung: DRAM.',
    },
    {
      term: 'Kapazität mit Anfangsspannung',
      def: 'Eine Kapazität $C$ mit $u(t_0) = u_0$ ist äquivalent zu einer zum Zeitpunkt $t_0$ ungeladenen Kapazität $C$ in Serie mit einer Spannungsquelle $u_0$.',
    },
    {
      term: 'Kapazität mit Anfangsladung',
      img: 'schaltbilder/kapazitaet-anfangsladung.svg',
      def: 'Ersatzschaltbild: zum Zeitpunkt $t_0$ ungeladene Kapazität in Serie mit Spannungsquelle $u_0$.',
    },
    {
      term: 'Induktivität mit Anfangsstrom',
      def: 'Dual zur Kapazität: Eine Induktivität $L$ mit $i(t_0) = i_0$ ist äquivalent zu einer stromlosen Induktivität $L$ parallel zu einer Stromquelle $i_0$.',
    },
    {
      term: 'Induktivität mit Anfangsstrom',
      img: 'schaltbilder/induktivitaet-anfangsstrom.svg',
      def: 'Ersatzschaltbild: stromlose Induktivität parallel zu Stromquelle $i_0$.',
    },
    {
      term: 'Stetigkeitsregel',
      def: '- **Kapazität:** Spannung ist stetig, solange der Strom beschränkt ist\n- **Induktivität:** Strom ist stetig, solange die Spannung beschränkt ist',
      more: 'Beweis für die Kapazität:\n$$|u_C(t_0 + \\Delta t) - u_C(t_0)| \\le \\frac{1}{C}\\,\\Delta t \\cdot \\max|i_C| \\;\\to\\; 0 \\quad (\\Delta t \\to 0)$$\nGilt auch für nichtlineare Kapazitäten mit stetiger Kennlinie. Bei überidealisierten Schaltungen (unbeschränkter Strom) kann sie verletzt sein.',
      moreLabel: 'Beweis',
    },
    {
      term: 'Verlustfreiheit reaktiver Elemente',
      def: 'Im stationären Betriebspunkt ($u$, $q$ konstant) fließt bei einer Kapazität keine Leistung ($i = 0$). Energie wird nur beim Wechsel des Betriebspunkts aufgenommen oder abgegeben.',
      more: 'Energie beim Übergang $P_1 \\to P_2$ (ladungsgesteuert, $u = \\chi(q)$):\n$$W_C(q_1, q_2) = \\int_{q_1}^{q_2} \\chi(q)\\,\\mathrm{d}q$$\n= Fläche zwischen Kennlinie und $q$-Achse; unabhängig vom zeitlichen Verlauf.\n\n- bei periodischem Verlauf: Energiezufuhr pro Periode $= 0$ → **verlustlos**\n- jede gesteuerte zweipolige Reaktanz (insbesondere jede lineare zeitinvariante) ist verlustlos\n- Hysterese-Kennlinie: nicht verlustlos, aber passiv',
      moreLabel: 'Energie',
    },
    {
      term: 'Gespeicherte Energie',
      def: 'Bezug: Relaxationspunkt im Ursprung.\n- **Kapazität:** $E_C = \\frac{1}{2} C u^2 = \\frac{q^2}{2C}$\n- **Induktivität:** $E_L = \\frac{1}{2} L i^2 = \\frac{\\Phi^2}{2L}$',
      calc: '- **Kapazität:** Spannung $u$ bestimmen, $E_C = \\frac{1}{2} C u^2$\n- **Induktivität:** Strom $i$ bestimmen, $E_L = \\frac{1}{2} L i^2$',
    },
    {
      term: 'Relaxationspunkt (Ruhepunkt)',
      def: 'Punkt der Kennlinie mit geringstem Energieniveau (bei linearer Kapazität der Ursprung, $u = 0$); dort hat die Kapazität ihre gesamte Energie abgegeben.',
    },
    {
      term: 'Lineare zeitvariante Kapazität',
      def: '$q(t) = C(t)\\,u(t)$, also $i(t) = C(t)\\,\\dot u(t) + \\dot C(t)\\,u(t)$. Über die Änderung von $C(t)$ wird mechanisch Energie zu- oder abgeführt (z. B. Plattenabstand).',
    },
    {
      term: 'Parallelschaltung von Kapazitäten',
      def: '- Kapazitäten addieren sich: $C = C_1 + C_2$ (wie Leitwerte)\n- Anfangsspannungen werden als Spannungsquellen in Serie modelliert',
      calc: '- Kapazitäten addieren: $C = C_1 + C_2$',
    },
    {
      term: 'Serienschaltung von Kapazitäten',
      def: '- Kapazität: $C = C_1 \\parallel C_2 = \\frac{C_1 C_2}{C_1 + C_2}$ (wie Leitwerte in Serie)\n- Anfangsspannungen addieren sich: $u_0 = u_{01} + u_{02}$',
      calc: '- $C = \\frac{C_1 C_2}{C_1 + C_2}$ (wie Leitwerte in Serie)\n- Anfangsspannungen addieren: $u_0 = u_{01} + u_{02}$',
    },
    {
      term: 'Zusammenschaltung von Induktivitäten',
      def: 'Dual zu Kapazitäten: Serie $L = L_1 + L_2$, parallel $L = L_1 \\parallel L_2$ (wie Widerstände).',
    },
    {
      term: 'Rechenregel reine C- oder L-Netzwerke',
      def: 'Nach Berücksichtigung der Anfangswerte durch Quellen rechnet man wie im resistiven Netzwerk gleicher Struktur: Kapazitäten wie Leitwerte, Induktivitäten wie Widerstände.',
    },
    {
      term: 'Kapazitives Mehrtor',
      def: 'Beschreibung über Spannungs- und Ladungsvektoren: $f_C(\\boldsymbol{u}, \\boldsymbol{q}) = \\boldsymbol{0}$, linear z. B. $\\boldsymbol{q} = C\\,\\boldsymbol{u}$ mit Kapazitätsmatrix $C$. Jedes Netzwerk aus Kapazitäten ist ein kapazitives Mehrtor.',
    },
    {
      term: 'Reaktive Beschreibung resistiver Zweitore',
      def: 'Zerfällt die Beschreibung in $f_1(\\boldsymbol{u}) = 0$ und $f_2(\\boldsymbol{i}) = 0$ (mindestens eine streng linear), kann man über die Zeit integrieren: Nullor, Übertrager und NIK sind zugleich resistiv, kapazitiv, induktiv und memristiv; der Gyrator ist memristiv.',
    },
    {
      term: 'Fest gekoppelter Übertrager',
      def: 'Induktives Zweitor: idealer Übertrager, an einem Tor mit einer Induktivität beschaltet.',
    },

    { chapter: '10 Komplexe Wechselstromrechnung' },
    {
      term: 'Komplexe Wechselstromrechnung',
      def: 'Verfahren zur Analyse linearer, zeitinvarianter dynamischer Schaltungen mit sinusförmiger Erregung im eingeschwungenen Zustand (steady state) mit komplexen Zeigern.',
    },
    {
      term: 'Sinusförmige Größe',
      def: '$a(t) = A_m \\cos(\\omega t + \\alpha)$ mit Amplitude $A_m$, Kreisfrequenz $\\omega$ (rad/s) und Anfangsphase $\\alpha$. Frequenz $f = \\frac{\\omega}{2\\pi}$ in Hertz.',
    },
    {
      term: 'Eingeschwungener Zustand (steady state)',
      def: 'Zustand nach Abklingen aller Einschwingvorgänge (Transienten). In einer linearen Schaltung mit Sinusquellen der Frequenz $\\omega$ sind dann alle Größen sinusförmig mit derselben Frequenz.',
      more: '- lineare Elemente und Kirchhoff-Gesetze ändern Sinusform und $\\omega$ nicht, nur Amplitude und Phase\n- z. B. Ableitung: $\\frac{\\mathrm{d}}{\\mathrm{d}t}A_m\\cos(\\omega t + \\alpha) = \\omega A_m \\cos(\\omega t + \\alpha + \\tfrac{\\pi}{2})$\n- Quellen mit verschiedenen Frequenzen: Superposition der einzelnen Anteile\n- Einschwingvorgänge: Vorlesung Systemtheorie',
      moreLabel: 'Begründung',
    },
    {
      term: 'Komplexer Zeiger',
      def: 'Zu $a(t) = A_m\\cos(\\omega t + \\alpha)$ gehört der Zeiger $\\underline{A} = A_m\\, e^{j\\alpha}$. Rückweg: $a(t) = \\operatorname{Re}\\{\\underline{A}\\, e^{j\\omega t}\\}$.',
      calc: '- **Zeitfunktion → Zeiger:** Amplitude $A_m$ und Phase $\\alpha$ ablesen, $\\underline{A} = A_m e^{j\\alpha}$\n- **Zeiger → Zeitfunktion:** $a(t) = \\operatorname{Re}\\{\\underline{A}\\, e^{j\\omega t}\\} = |\\underline{A}| \\cos(\\omega t + \\arg \\underline{A})$',
      more: '- $A_m = |\\underline{A}|$, $\\alpha = \\arg(\\underline{A})$\n- Beweis mit Euler: $e^{j\\varphi} = \\cos\\varphi + j\\sin\\varphi$\n\nDrei Hilfssätze:\n- **Eindeutigkeit:** $a(t) = b(t)\\;\\forall t \\Leftrightarrow \\underline{A} = \\underline{B}$\n- **Linearität:** Zeiger einer Linearkombination = gleiche Linearkombination der Zeiger\n- **Differentiation:** $\\frac{\\mathrm{d}a}{\\mathrm{d}t} \\;\\leftrightarrow\\; j\\omega\\,\\underline{A}$',
      moreLabel: 'Hilfssätze',
    },
    {
      term: 'Differentiationsregel für Zeiger',
      def: 'Der Ableitung eines Sinussignals entspricht der mit $j\\omega$ multiplizierte Zeiger: $\\dot a(t) \\leftrightarrow j\\omega\\,\\underline{A}$. Differentialgleichungen werden so zu algebraischen Gleichungen (Polynome in $j\\omega$).',
    },
    {
      term: 'Elementgleichungen in Zeigerdarstellung',
      def: '- **Widerstand:** $\\underline{U} = R\\,\\underline{I}$\n- **Leitwert:** $\\underline{I} = G\\,\\underline{U}$\n- **Kapazität:** $\\underline{I} = j\\omega C\\,\\underline{U}$\n- **Induktivität:** $\\underline{U} = j\\omega L\\,\\underline{I}$',
      calc: 'Netzwerk im eingeschwungenen Zustand berechnen:\n- alle Quellen als Zeiger schreiben\n- $R$, $j\\omega L$, $\\frac{1}{j\\omega C}$ wie Widerstände behandeln\n- mit den bekannten Regeln (Teiler, Knotenanalyse) komplex rechnen\n- Ergebnis-Zeiger in Zeitfunktion zurückwandeln',
    },
    {
      term: 'R, G, C und L',
      img: 'schaltbilder/zeiger-r-g-c-l.svg',
      def: '$\\underline{U}_R = R\\underline{I}_R$, $\\;\\underline{I}_G = G\\underline{U}_G$, $\\;\\underline{I}_C = j\\omega C\\,\\underline{U}_C$, $\\;\\underline{U}_L = j\\omega L\\,\\underline{I}_L$.',
    },
    {
      term: 'Memristor in der Wechselstromrechnung',
      def: 'Linearer Memristor $\\Phi = K q$ wird abgeleitet zu $u = K\\,i$. Da Anfangswerte im eingeschwungenen Zustand keine Rolle spielen, gibt es dort keinen Unterschied zum Widerstand.',
    },
    {
      term: 'Kirchhoff-Gesetze in Zeigerdarstellung',
      def: 'Gelten unverändert für die Zeiger: $A\\,\\underline{\\boldsymbol{I}} = \\boldsymbol{0}$, $\\underline{\\boldsymbol{U}} = A^{\\mathrm{T}} \\underline{\\boldsymbol{U}}_k$, $B\\,\\underline{\\boldsymbol{U}} = \\boldsymbol{0}$ (Eindeutigkeits- und Linearitätssatz).',
    },
    {
      term: 'Tableau in Zeigerdarstellung',
      def: 'Elementgleichungen $(M_0 + j\\omega M_1)\\underline{\\boldsymbol{U}} + (N_0 + j\\omega N_1)\\underline{\\boldsymbol{I}} = \\underline{\\boldsymbol{E}}$: algebraisches System mit komplexen Koeffizienten – für jede Frequenz $\\omega$ neu zu lösen (Frequenzgang).',
    },
    {
      term: 'Momentanleistung',
      def: 'Augenblickliche Leistung $p(t) = u(t)\\,i(t)$. Bei Sinusgrößen: $p(t) = \\frac{U_m I_m}{2}\\left[\\cos(\\alpha_U - \\alpha_I) + \\cos(2\\omega t + \\alpha_U + \\alpha_I)\\right]$.',
    },
    {
      term: 'Wirkleistung',
      def: 'Mittelwert der Momentanleistung über eine Periode: $P_W = \\frac{1}{T}\\int_0^T p(t)\\,\\mathrm{d}t = U_{\\text{eff}} I_{\\text{eff}} \\cos(\\alpha_U - \\alpha_I)$.',
      calc: '- Effektivwerte $U_{\\text{eff}}$, $I_{\\text{eff}}$ bestimmen\n- Phasenverschiebung $\\varphi = \\alpha_U - \\alpha_I$ bestimmen\n- $P = U_{\\text{eff}} I_{\\text{eff}} \\cos\\varphi$',
    },
    {
      term: 'Effektivwert',
      def: 'Gleichwert, der in einem Ohm’schen Widerstand dieselbe mittlere Leistung erzeugt: bei Sinusgrößen $U_{\\text{eff}} = \\frac{U_m}{\\sqrt 2}$, $I_{\\text{eff}} = \\frac{I_m}{\\sqrt 2}$.',
      calc: '- bei Sinusgrößen: Amplitude durch $\\sqrt{2}$ teilen: $A_{\\text{eff}} = \\frac{A_m}{\\sqrt{2}}$',
    },
    {
      term: 'Blindleistung',
      def: '$P_B = U_{\\text{eff}} I_{\\text{eff}} \\sin(\\alpha_U - \\alpha_I)$. Liefert keinen Beitrag zur Stromwärme, ist aber v. a. in der Energietechnik wichtig.',
      calc: '- Effektivwerte und $\\varphi = \\alpha_U - \\alpha_I$ bestimmen\n- $P_B = U_{\\text{eff}} I_{\\text{eff}} \\sin\\varphi$',
    },
    {
      term: 'Komplexe Leistung',
      def: '$\\underline{S} = \\frac{1}{2}\\underline{U}\\,\\underline{I}^* = U_{\\text{eff}} I_{\\text{eff}}\\, e^{j(\\alpha_U - \\alpha_I)} = P_W + j P_B$: Realteil Wirkleistung, Imaginärteil Blindleistung.',
      more: '- hängt nur von der Phasendifferenz $\\alpha_U - \\alpha_I$ ab, nicht von den willkürlichen Anfangsphasen\n- Leistung ist ein Produkt zweier Zeitfunktionen → die Zeiger-Hilfssätze gelten hier nicht direkt\n- deshalb der konjugiert komplexe Strom $\\underline{I}^*$',
      moreLabel: 'Details',
    },

    { chapter: 'A Anhang: Mathematische Grundlagen' },
    {
      term: 'Graph',
      def: 'Struktur $G(N, B)$ aus einer Knotenmenge $N$ (nodes) und einer Kanten- bzw. Zweigmenge $B$ (edges, branches); jede Kante ist ein Paar von Knoten.',
    },
    {
      term: 'Schlinge',
      def: 'Kante, die einen Knoten mit sich selbst verbindet (self-loop). Ein Graph ohne Schlingen heißt schlingenfrei.',
    },
    {
      term: 'Teilgraph',
      def: 'Graph $G_t(N_t, B_t)$, dessen Knoten- und Kantenmengen Teilmengen von $G$ sind ($N_t \\subseteq N$, $B_t \\subseteq B$).',
    },
    {
      term: 'Zusammenhängender Graph',
      def: 'Graph, dessen Knoten sich nicht in zwei Mengen aufteilen lassen, zwischen denen keine Kante verläuft. Sonst: unzusammenhängend, zerlegbar in zusammenhängende Komponenten.',
    },
    {
      term: 'Schnittmenge',
      def: 'Minimale Kantenmenge, deren Entfernen einen zusammenhängenden Graphen in zwei Komponenten zerfallen lässt; jede einzelne Kante daraus verbindet sie wieder.',
    },
    {
      term: 'Gerichteter Graph (Digraph)',
      def: 'Graph, dessen Kanten geordnete Paare $(n_a, n_b)$ mit Anfangs- und Endknoten sind (Pfeil).',
    },
    {
      term: 'Bezugsknoten',
      def: 'In jeder zusammenhängenden Komponente ein besonders ausgezeichneter Knoten (meist höchste Nummer, Massesymbol). Beim zusammengehängten Graphen werden alle Bezugsknoten zu einem vereinigt.',
    },
    {
      term: 'Schleife (Graph)',
      def: 'Zusammenhängender, schlingenfreier Graph, in dem jeder Knoten mit genau zwei Kanten verbunden ist.',
    },
    {
      term: 'Baum (Graphentheorie)',
      def: 'Zusammenhängender Graph, der durch Entfernen jeder einzelnen Kante unzusammenhängend wird. Ein maximaler Baum überdeckt alle Knoten des Graphen.',
    },
    {
      term: 'Sternbaum',
      def: 'Baum, dessen Kanten alle im Bezugsknoten enden – Grundlage der Knotenspannungsanalyse.',
    },
    {
      term: 'Inzidenzmatrix $A_0$',
      def: '$n \\times b$-Matrix:\n- $+1$, wenn Kante $j$ in Knoten $i$ beginnt\n- $-1$, wenn sie dort endet\n- sonst 0\n\nOhne die Zeile des Bezugsknotens: reduzierte Inzidenzmatrix $A$ mit vollem Rang.',
      calc: '- Zeile je Knoten, Spalte je Zweig\n- $+1$, wo der Zweig beginnt; $-1$, wo er endet; sonst 0\n- reduzierte Matrix $A$: Zeile des Bezugsknotens streichen',
    },
    {
      term: 'Taylor-Approximation',
      def: 'Annäherung $f(x) = T_r(x, X) + R_r(x, X)$ durch ein Polynom um die Stützstelle $X$; für $r = 1$ die lineare Approximation $f(x) \\approx f(X) + f\'(X)(x - X)$.',
      more: 'Restglied nach Lagrange ($\\xi$ zwischen $x$ und $X$):\n$$R_1(x, X) = \\frac{f\'\'(\\xi)}{2}(x - X)^2$$\nDie Näherung ist umso genauer, je kleiner $\\Delta x = x - X$ ist – Grundlage der Kleinsignalnäherung.',
      moreLabel: 'Restglied',
    },
    {
      term: 'Gradient',
      def: 'Vektor der partiellen Ableitungen einer Funktion $f(\\boldsymbol{x})$: $\\nabla f = \\left[\\frac{\\partial f}{\\partial x_1}, \\dots, \\frac{\\partial f}{\\partial x_n}\\right]^{\\mathrm{T}}$; damit lässt sich die Tangentialebene angeben.',
    },
    {
      term: 'Spur',
      def: 'Summe der Diagonalelemente einer quadratischen Matrix: $\\operatorname{tr}(A) = \\sum_i a_{ii}$.',
    },
    {
      term: 'Vektorraum und Unterraum',
      def: '- **Vektorraum:** Menge, die unter Addition und Skalarmultiplikation abgeschlossen ist\n- **Unterraum:** Teilmenge mit dieser Eigenschaft',
    },
    {
      term: 'Linearkombination',
      def: 'Ausdruck $c_1\\boldsymbol{a}_1 + \\dots + c_n\\boldsymbol{a}_n = A\\boldsymbol{c}$; die Menge aller Linearkombinationen ist die lineare Hülle der Vektoren.',
    },
    {
      term: 'Bild (Spaltenraum)',
      def: '$\\operatorname{Bild}(A) = \\{A\\boldsymbol{c}\\}$: Raum aller Linearkombinationen der Spalten von $A$.',
    },
    {
      term: 'Kern (Nullraum)',
      def: '$\\operatorname{Kern}(B) = \\{\\boldsymbol{x} \\mid B\\boldsymbol{x} = \\boldsymbol{0}\\}$: Lösungsmenge des homogenen Gleichungssystems.',
      calc: '- $A\\boldsymbol{x} = \\boldsymbol{0}$ mit Gauß lösen\n- freie Variablen als Parameter\n- Lösung als Linearkombination schreiben → Basisvektoren des Kerns',
    },
    {
      term: 'Lineare Abhängigkeit',
      def: 'Vektoren sind linear abhängig, wenn $c_1\\boldsymbol{a}_1 + \\dots + c_n\\boldsymbol{a}_n = \\boldsymbol{0}$ mit nicht allen $c_i = 0$ möglich ist; sonst linear unabhängig.',
    },
    {
      term: 'Basis und Dimension',
      def: '- **Basis:** linear unabhängige Vektoren, die einen Raum aufspannen\n- **Dimension:** Anzahl der Basisvektoren (gleich für jede Basis)',
    },
    {
      term: 'Rang einer Matrix',
      def: 'Maximale Anzahl linear unabhängiger Spalten (= Zeilen) von $A$. Für $A \\in \\mathbb{R}^{m \\times n}$: $\\dim \\operatorname{Bild}(A) = r$, $\\dim \\operatorname{Kern}(A) = n - r$.',
      calc: '- Matrix in Zeilenstufenform bringen\n- Nicht-Nullzeilen zählen',
    },
    {
      term: 'Orthogonalität',
      def: 'Zwei Vektoren sind orthogonal, wenn ihr Skalarprodukt verschwindet: $\\boldsymbol{a}^{\\mathrm{T}}\\boldsymbol{b} = 0$. $\\operatorname{Bild}(A^{\\mathrm{T}}) \\perp \\operatorname{Kern}(A)$ – Grundlage des Tellegen’schen Satzes.',
    },
    {
      term: 'Eigenwert und Eigenvektor',
      def: '$A\\boldsymbol{x} = \\lambda\\boldsymbol{x}$ mit $\\boldsymbol{x} \\neq \\boldsymbol{0}$:\n- $\\lambda$ ist Eigenwert, $\\boldsymbol{x}$ Eigenvektor\n- Eigenwerte = Nullstellen von $c(\\lambda) = \\det(A - \\lambda\\boldsymbol{1})$',
      calc: '- charakteristisches Polynom $\\det(A - \\lambda \\boldsymbol{1}) = 0$ aufstellen\n- Nullstellen $\\lambda$ = Eigenwerte\n- je Eigenwert $\\text{kern}(A - \\lambda \\boldsymbol{1})$ bestimmen → Eigenvektoren',
      more: '- Eigenraum: alle Eigenvektoren zu $\\lambda_i$ (Unterraum)\n- algebraische Vielfachheit: Vielfachheit als Nullstelle\n- geometrische Vielfachheit: $n - \\operatorname{Rang}(A - \\lambda_i\\boldsymbol{1})$\n- **diagonalisierbar**, wenn es $n$ linear unabhängige Eigenvektoren gibt: $A = X\\Lambda X^{-1}$\n- sonst Jordan-Normalform mit Hauptvektoren\n- $A + \\alpha\\boldsymbol{1}$ hat Eigenwerte $\\lambda_i + \\alpha$',
      moreLabel: 'Details',
    },
    {
      term: 'Quadratische Form und Definitheit',
      def: '$h = \\boldsymbol{x}^{\\mathrm{T}}A\\boldsymbol{x}$:\n- **positiv definit:** $h > 0$ für alle $\\boldsymbol{x} \\neq \\boldsymbol{0}$\n- **positiv semidefinit:** $h \\ge 0$\n- **indefinit:** beide Vorzeichen möglich\n\nBei schiefsymmetrischem $A$ ist immer $h = 0$.',
    },
    // @@ENDE@@
  ],
});
