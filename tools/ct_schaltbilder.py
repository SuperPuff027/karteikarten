"""Eigene Schaltbilder und Diagramme für das Lernset Computertechnik.

Alle Grafiken sind hier neu gezeichnet (keine Ausschnitte aus dem Skript).
Aufruf aus dem Projektordner:  python tools/ct_schaltbilder.py [name ...]
"""
import math, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from schaltbild import SVG

OUT = os.path.join(os.path.dirname(__file__), '..', 'schaltbilder')
FIGS = {}


def fig(name, w, h):
    def deco(fn):
        FIGS['ct-' + name] = (w, h, fn)
        return fn
    return deco


# ---------------- Logikgatter (amerikanische Form, Eingänge links) ----------------
def gate(s, kind, x, y, n=2, w=50, h=50):
    """Gatter mit linker Kante bei x, Mitte y. Gibt (Eingangspunkte, Ausgangspunkt) zurück."""
    top, bot = y - h / 2, y + h / 2
    ys = [top + h * (k + 1) / (n + 1) for k in range(n)]
    neg = kind in ('not', 'nand', 'nor', 'xnor')
    base = {'nand': 'and', 'nor': 'or', 'xnor': 'xor', 'not': 'buf'}.get(kind, kind)
    if base == 'buf':
        tw = w * 0.8
        s.path(f'M{x},{top + 6} L{x + tw},{y} L{x},{bot - 6} Z')
        ins, ox = [(x, y)], x + tw
    elif base == 'and':
        r = h / 2
        s.path(f'M{x},{top} L{x + w - r},{top} A{r},{r} 0 0 1 {x + w - r},{bot} L{x},{bot} Z')
        ins, ox = [(x, yy) for yy in ys], x + w
    else:
        c = w * 0.3
        s.path(f'M{x},{top} Q{x + c},{y} {x},{bot} Q{x + w * 0.62},{bot} {x + w},{y} Q{x + w * 0.62},{top} {x},{top} Z')
        dx = -8 if base == 'xor' else 0
        if base == 'xor':
            s.path(f'M{x - 8},{top} Q{x - 8 + c},{y} {x - 8},{bot}')
        ins = []
        for yy in ys:
            t = (yy - top) / h
            ins.append((x + dx + 2 * t * (1 - t) * c, yy))
        ox = x + w
    if neg:
        s.circle(ox + 4, y, 4, sw=1.4)
        ox += 8
    return ins, (ox, y)


def wire(s, *pts):
    s.line(*pts, sw=1.4)


def mux(s, x, y0, y1, w=36, labels=('0', '1'), slant=14):
    """Multiplexer-Trapez: breite Seite links (x, y0..y1)."""
    s.path(f'M{x},{y0} L{x + w},{y0 + slant} L{x + w},{y1 - slant} L{x},{y1} Z')
    n = len(labels)
    pts = []
    for k, lab in enumerate(labels):
        yy = y0 + (y1 - y0) * (k + 1) / (n + 1)
        s.text(x + 9, yy, lab, size=12, anchor='start')
        pts.append((x, yy))
    return pts, (x + w, (y0 + y1) / 2)


def table(s, x0, y0, cols, rows, dx=42, dy=28, size=15):
    """Einfache Wertetabelle: Kopfzeile + Zeilen, Trennlinie unter dem Kopf."""
    for j, c in enumerate(cols):
        s.text(x0 + j * dx, y0, c, size=size)
    s.line((x0 - dx / 2, y0 + dy / 2), (x0 + (len(cols) - 0.5) * dx, y0 + dy / 2), sw=1.0)
    for i, r in enumerate(rows):
        for j, v in enumerate(r):
            s.text(x0 + j * dx, y0 + (i + 1) * dy + 4, v, size=size)


def clk_triangle(s, x, y):
    """Taktflanken-Dreieck an einer unteren Blockkante (y)."""
    s.path(f'M{x - 7},{y} L{x},{y - 10} L{x + 7},{y}')


# ---------------- Kapitel 2 ----------------
@fig('zahlenring', 420, 420)
def _(s):
    cx, cy, r = 210, 210, 140
    s.circle(cx, cy, r, sw=1.4)
    for k in range(16):
        a = math.radians(-90 + 22.5 * k)
        ca, sa = math.cos(a), math.sin(a)
        s.line((cx + (r - 6) * ca, cy + (r - 6) * sa), (cx + (r + 6) * ca, cy + (r + 6) * sa), sw=1.4)
        s.text(cx + (r + 34) * ca, cy + (r + 26) * sa, format(k, '04b'), size=14)
        v = k if k < 8 else k - 16
        s.text(cx + (r - 26) * ca, cy + (r - 24) * sa, str(v).replace('-', '−'), size=15)
    # Grenze zwischen 0111 und 1000 (Überlauf)
    a = math.radians(-90 + 22.5 * 7.5)
    s.line((cx + 45 * math.cos(a), cy + 45 * math.sin(a)), (cx + (r + 4) * math.cos(a), cy + (r + 4) * math.sin(a)), dash=True, sw=1.2)
    s.text(cx, cy - 22, 'Zweier-Komplement', size=15)
    s.text(cx, cy + 2, 'n = 4', size=15)


@fig('ieee754', 600, 150)
def _(s):
    y0, y1 = 40, 85
    s.rect(40, y0, 520, y1 - y0)
    s.line((80, y0), (80, y1)); s.line((240, y0), (240, y1))
    s.text(60, 62, 's', size=18); s.text(160, 62, 'e', size=18); s.text(400, 62, 'f', size=18)
    s.text(46, 26, '31', size=12, anchor='start'); s.text(84, 26, '30', size=12, anchor='start')
    s.text(236, 26, '23', size=12, anchor='end'); s.text(244, 26, '22', size=12, anchor='start')
    s.text(556, 26, '0', size=12, anchor='end')
    s.text(60, 100, '1', size=13); s.text(160, 100, '8 bzw. 11 Bit', size=13); s.text(400, 100, '23 bzw. 52 Bit', size=13)
    s.tex(300, 132, r'$v = (-1)^s \cdot 1{,}f \cdot 2^{e-K}$', size=18)


# ---------------- Kapitel 3 ----------------
@fig('logikgatter', 600, 330)
def _(s):
    items = [('buf', 'Treiber', 'y = a'), ('not', 'Inverter', 'y = ¬a'),
             ('and', 'UND', 'y = a ∧ b'), ('nand', 'NAND', 'y = ¬(a ∧ b)'),
             ('or', 'ODER', 'y = a ∨ b'), ('nor', 'NOR', 'y = ¬(a ∨ b)'),
             ('xor', 'XOR', 'y = a ⊕ b'), ('xnor', 'XNOR', 'y = ¬(a ⊕ b)')]
    for k, (kind, name, frm) in enumerate(items):
        col, row = divmod(k, 4)
        x0, y = 20 + col * 300, 40 + row * 82
        n = 1 if kind in ('buf', 'not') else 2
        ins, out = gate(s, kind, x0 + 34, y, n=n, w=44, h=44)
        for (ix, iy) in ins:
            wire(s, (x0, iy), (ix, iy))
        wire(s, out, (out[0] + 18, y))
        s.text(x0 + 130, y - 11, name, size=16, anchor='start')
        s.text(x0 + 130, y + 13, frm, size=16, anchor='start')


@fig('multiplexer', 620, 240)
def _(s):
    # Symbol
    ins, out = mux(s, 60, 50, 170, w=46)
    for (ix, iy), lab in zip(ins, ('a', 'b')):
        wire(s, (20, iy), (ix, iy)); s.text(8, iy, lab, size=17)
    wire(s, out, (150, out[1])); s.text(164, out[1], 'y', size=17)
    wire(s, (83, 162), (83, 205)); s.text(83, 220, 's', size=17)
    # Gatter-Realisierung
    a_in, a_out = gate(s, 'and', 400, 80)
    b_in, b_out = gate(s, 'and', 400, 160)
    o_in, o_out = gate(s, 'or', 500, 120)
    wire(s, (250, a_in[0][1]), a_in[0]); s.text(238, a_in[0][1], 'a', size=17)
    wire(s, (250, b_in[1][1]), b_in[1]); s.text(238, b_in[1][1], 'b', size=17)
    wire(s, (250, 125), (300, 125)); s.text(238, 125, 's', size=17)
    s.dot(300, 125)
    wire(s, (300, 125), (300, b_in[0][1]), b_in[0])
    wire(s, (300, 125), (300, 100), (318, 100))
    n_in, n_out = gate(s, 'not', 318, 100, n=1, w=40, h=30)
    wire(s, n_out, (378, 100), (378, a_in[1][1]), a_in[1])
    wire(s, a_out, (470, 80), (470, o_in[0][1]), o_in[0])
    wire(s, b_out, (470, 160), (470, o_in[1][1]), o_in[1])
    wire(s, o_out, (590, 120)); s.text(604, 120, 'y', size=17)
    s.text(430, 222, 'y = (a ∧ ¬s) ∨ (b ∧ s)', size=16)


@fig('demultiplexer', 560, 230)
def _(s):
    s.path('M100,70 L150,40 L150,200 L100,170 Z')
    wire(s, (40, 120), (100, 120)); s.text(28, 120, 'x', size=17)
    for k, lab in enumerate('abcd'):
        y = 60 + k * 40
        wire(s, (150, y), (200, y)); s.text(214, y, lab, size=17)
        s.text(146, y, format(k, '02b'), size=11, anchor='end')
    wire(s, (125, 185), (125, 215)); s.line((119, 205), (131, 197), sw=1.2)
    s.text(140, 203, '2', size=12); s.text(125, 228, 's', size=17)
    table(s, 310, 45, ['s', 'a', 'b', 'c', 'd'],
          [['00', 'x', '0', '0', '0'], ['01', '0', 'x', '0', '0'], ['10', '0', '0', 'x', '0'], ['11', '0', '0', '0', 'x']])


@fig('decoder', 560, 230)
def _(s):
    s.block(100, 40, 70, 160, 'Dec', size=16)
    wire(s, (40, 120), (100, 120)); s.line((64, 126), (76, 114), sw=1.2)
    s.text(70, 104, '2', size=12); s.text(28, 120, 's', size=17)
    for k, lab in enumerate('abcd'):
        y = 60 + k * 40
        wire(s, (170, y), (220, y)); s.text(234, y, lab, size=17)
        s.text(164, y, format(k, '02b'), size=11, anchor='end')
    table(s, 320, 45, ['s', 'a', 'b', 'c', 'd'],
          [['00', '1', '0', '0', '0'], ['01', '0', '1', '0', '0'], ['10', '0', '0', '1', '0'], ['11', '0', '0', '0', '1']])


def nor_latch(s, x, r_from, s_from, qx):
    """Zwei rückgekoppelte NOR-Gatter (oben y=70, unten y=190). Gibt nichts zurück."""
    g1_in, g1_out = gate(s, 'nor', x, 70)
    g2_in, g2_out = gate(s, 'nor', x, 190)
    wire(s, r_from, g1_in[0]); wire(s, s_from, g2_in[1])
    fx = g1_out[0] + 32
    wire(s, g1_out, (qx, 70)); s.dot(fx, 70)
    wire(s, (fx, 70), (fx, 110), (x - 22, 110), (x - 22, g2_in[0][1]), g2_in[0])
    wire(s, g2_out, (qx, 190)); s.dot(fx, 190)
    wire(s, (fx, 190), (fx, 150), (x - 12, 150), (x - 12, g1_in[1][1]), g1_in[1])
    s.text(qx + 14, 70, 'Q', size=17)
    s.tex(qx + 14, 190, r'$\overline{Q}$', size=17)
    return g1_in, g2_in


@fig('rs-flipflop', 420, 250)
def _(s):
    g1_in, g2_in = nor_latch(s, 200, (80, 61.7), (80, 198.3), 340)
    s.text(66, 61.7, 'R', size=17); s.text(66, 198.3, 'S', size=17)
    s.text(210, 240, 'S = R = 1 verboten', size=15)


@fig('d-flipflop', 640, 270)
def _(s):
    ar_in, ar_out = gate(s, 'and', 290, 61.7)
    as_in, as_out = gate(s, 'and', 290, 198.3)
    nor_latch(s, 420, ar_out, as_out, 560)
    # D-Eingang
    s.text(30, 30, 'D', size=17)
    wire(s, (45, 30), (160, 30)); s.dot(110, 30)
    n_in, n_out = gate(s, 'not', 160, 30, n=1, w=40, h=30)
    wire(s, n_out, (240, 30), (240, ar_in[0][1]), ar_in[0])
    wire(s, (110, 30), (110, as_in[1][1]), as_in[1])
    # Takt C
    s.text(30, 130, 'C', size=17)
    wire(s, (45, 130), (260, 130)); s.dot(260, 130)
    wire(s, (260, ar_in[1][1]), (260, as_in[0][1]))
    wire(s, (260, ar_in[1][1]), ar_in[1]); wire(s, (260, as_in[0][1]), as_in[0])
    s.text(330, 258, 'C = 1: Q übernimmt D', size=15)


@fig('register', 600, 220)
def _(s):
    xs = [(40, 'n-1'), (160, 'n-2'), (340, '1'), (460, '0')]
    for x, i in xs:
        s.rect(x, 60, 80, 80)
        s.text(x + 18, 76, 'D', size=14); s.text(x + 62, 76, 'Q', size=14)
        clk_triangle(s, x + 40, 140)
        wire(s, (x + 14, 30), (x + 14, 60)); s.text(x + 10, 16, f'd_{{{i}}}', size=15)
        wire(s, (x + 66, 60), (x + 66, 30)); s.text(x + 70, 16, f'q_{{{i}}}', size=15)
        wire(s, (x + 40, 140), (x + 40, 175)); s.dot(x + 40, 175)
    s.text(290, 100, '…', size=20)
    wire(s, (10, 175), (560, 175)); s.text(40, 195, 'clk', size=15)


@fig('halbaddierer', 420, 210)
def _(s):
    x_in, x_out = gate(s, 'xor', 220, 70)
    a_in, a_out = gate(s, 'and', 220, 150)
    s.text(36, 40, 'x_i', size=17); s.text(36, 110, 'y_i', size=17)
    wire(s, (52, 40), (150, 40), (150, x_in[0][1]), x_in[0]); s.dot(110, 40)
    wire(s, (110, 40), (110, a_in[0][1]), a_in[0])
    wire(s, (52, 110), (180, 110), (180, x_in[1][1]), x_in[1]); s.dot(180, 110)
    wire(s, (180, 110), (180, a_in[1][1]), a_in[1])
    wire(s, x_out, (340, 70)); s.text(356, 70, 's_i', size=17)
    wire(s, a_out, (340, 150)); s.text(356, 150, 'c_i', size=17)


@fig('volladdierer', 660, 270)
def _(s):
    x1_in, x1_out = gate(s, 'xor', 200, 70)
    a1_in, a1_out = gate(s, 'and', 200, 150)
    x2_in, x2_out = gate(s, 'xor', 410, 78.3)
    a2_in, a2_out = gate(s, 'and', 410, 180)
    o_in, o_out = gate(s, 'or', 530, 200)
    s.text(30, 40, 'x_i', size=17); s.text(30, 105, 'y_i', size=17)
    wire(s, (46, 40), (130, 40), (130, x1_in[0][1]), x1_in[0]); s.dot(95, 40)
    wire(s, (95, 40), (95, a1_in[0][1]), a1_in[0])
    wire(s, (46, 105), (165, 105), (165, x1_in[1][1]), x1_in[1]); s.dot(165, 105)
    wire(s, (165, 105), (165, a1_in[1][1]), a1_in[1])
    # p = x xor y
    wire(s, x1_out, (x2_in[0][0], x1_out[1])); s.dot(310, 70)
    wire(s, (310, 70), (310, a2_in[0][1]), a2_in[0])
    # Übertrag von rechts oben
    s.text(360, 12, 'c_{i-1}', size=17)
    wire(s, (360, 26), (360, a2_in[1][1]), a2_in[1]); s.dot(360, x2_in[1][1])
    wire(s, (360, x2_in[1][1]), x2_in[1])
    wire(s, x2_out, (630, x2_out[1])); s.text(646, x2_out[1], 's_i', size=17)
    wire(s, a2_out, (490, a2_out[1]), (490, o_in[0][1]), o_in[0])
    wire(s, a1_out, (270, a1_out[1]), (270, 245), (505, 245), (505, o_in[1][1]), o_in[1])
    wire(s, o_out, (630, 200)); s.text(646, 200, 'c_i', size=17)


def va_row(s, xs, y=80, w=80, h=80, label='VA'):
    for x, i in xs:
        s.block(x, y, w, h, label, size=16)
        xa, xb = x + w * 0.25, x + w * 0.75
        wire(s, (xa, y - 45), (xa, y)); s.text(xa, y - 58, f'x_{{{i}}}', size=15)
        wire(s, (xb, y - 45), (xb, y)); s.text(xb, y - 58, f'y_{{{i}}}', size=15)


@fig('ripple-carry', 710, 260)
def _(s):
    xs = [(40, 'n-1'), (200, 'n-2'), (420, '1'), (560, '0')]
    va_row(s, xs, w=100)
    for x, i in xs:
        wire(s, (x + 50, 160), (x + 50, 205)); s.text(x + 50, 222, f's_{{{i}}}', size=15)
    def carry(x1, x2):
        s.line((x1, 120), (x2, 120), sw=1.4); s.head(x2, 120, -1, 0, size=6)
    carry(700, 660); s.text(690, 100, 'c_{-1}', size=15)
    carry(560, 520); carry(420, 380); s.text(350, 120, '…', size=20); carry(322, 300)
    carry(200, 140); carry(40, 4); s.text(22, 100, 'c_{n-1}', size=15)


@fig('carry-look-ahead', 680, 300)
def _(s):
    xs = [(50, '3'), (200, '2'), (350, '1'), (500, '0')]
    va_row(s, xs, y=70, label='VA')
    s.block(30, 200, 590, 50, 'Carry-Look-Ahead-Logik', size=16)
    for x, i in xs:
        wire(s, (x + 20, 150), (x + 20, 200)); s.text(x + 8, 175, f'g_{{{i}}}', size=13, anchor='end')
        wire(s, (x + 60, 150), (x + 60, 200)); s.text(x + 72, 175, f'p_{{{i}}}', size=13, anchor='start')
        cx = x + 106
        s.line((cx, 200), (cx, 110), (x + 80, 110), sw=1.4); s.head(x + 80, 110, -1, 0, size=6)
        s.text(cx + 4, 92, f'c_{{{int(i) - 1}}}', size=13, anchor='start')
    s.line((660, 225), (620, 225), sw=1.4); s.head(620, 225, -1, 0, size=6); s.text(660, 208, 'c_{-1}', size=15)
    s.line((30, 225), (0, 225), sw=1.4); s.head(0, 225, -1, 0, size=6); s.text(12, 260, 'c_3', size=15)
    s.tex(330, 285, r'$c_i = g_i \vee (p_i \wedge g_{i-1}) \vee (p_i \wedge p_{i-1} \wedge g_{i-2}) \vee \ldots$', size=16)


@fig('halbsubtrahierer', 440, 210)
def _(s):
    x_in, x_out = gate(s, 'xor', 240, 70)
    a_in, a_out = gate(s, 'and', 240, 160)
    s.text(36, 40, 'x_i', size=17); s.text(36, 115, 'y_i', size=17)
    wire(s, (52, 40), (170, 40), (170, x_in[0][1]), x_in[0]); s.dot(100, 40)
    wire(s, (100, 40), (100, a_in[0][1]), (140, a_in[0][1]))
    n_in, n_out = gate(s, 'not', 140, a_in[0][1], n=1, w=36, h=26)
    wire(s, n_out, a_in[0])
    wire(s, (52, 115), (205, 115), (205, x_in[1][1]), x_in[1]); s.dot(205, 115)
    wire(s, (205, 115), (205, a_in[1][1]), a_in[1])
    wire(s, x_out, (360, 70)); s.text(376, 70, 'd_i', size=17)
    wire(s, a_out, (360, 160)); s.text(376, 160, 'b_i', size=17)


@fig('seq-multiplizierer', 640, 270)
def _(s):
    s.block(170, 10, 220, 44, 'Multiplikand-Register MR', size=15)
    s.block(190, 100, 180, 44, 'Addierer (n Bit)', size=15)
    s.rect(40, 190, 480, 44); s.line((280, 190), (280, 234))
    s.text(160, 212, 'PR obere Bits', size=15); s.text(400, 212, 'PR untere Bits', size=15)
    s.text(280, 255, 'Produktregister PR (2n + 1 Bit)', size=14)
    s.arrow(280, 54, 280, 100)
    s.line((120, 190), (120, 122), (190, 122), sw=1.2); s.head(190, 122, 1, 0, size=6)
    s.arrow(250, 144, 250, 190)
    s.block(530, 90, 100, 50, 'Steuerung', size=15)
    s.line((510, 234), (510, 250), (600, 250), (600, 140), sw=1.2); s.head(600, 140, 0, -1, size=6)
    s.text(612, 210, 'PR_0', size=14, anchor='start')
    s.arrow(530, 115, 370, 115, 'addieren', ly=-12)
    s.line((560, 140), (560, 170), (520, 170), (520, 190), sw=1.2); s.head(520, 190, 0, 1, size=6)
    s.text(480, 166, '≫ 1', size=14)


# ---------------- Kapitel 4 ----------------
@fig('universalrechner', 720, 380)
def _(s):
    # Befehlszähler, +1, ROM
    s.block(30, 290, 60, 40, 'BZ', size=15); clk_triangle(s, 60, 330)
    s.block(30, 210, 60, 40, '+1', size=15)
    s.arrow(60, 290, 60, 250)
    s.line((30, 230), (12, 230), (12, 310), (30, 310), sw=1.2); s.head(30, 310, 1, 0, size=6)
    s.block(130, 270, 90, 80, 'ROM', size=16)
    s.arrow(90, 310, 130, 310)
    s.text(175, 250, 'Befehlswort', size=13)
    s.text(175, 232, 'K, D, M1…M4', size=13)
    # Registerblock
    s.rect(250, 40, 90, 200)
    for k, lab in enumerate(['R0', 'R1', 'R2', '⋮', 'R7']):
        s.text(295, 62 + k * 38, lab, size=15)
    # Operandenauswahl
    m3, m3o = mux(s, 380, 40, 120, w=34, labels=('', ''))
    m4, m4o = mux(s, 380, 150, 230, w=34, labels=('', ''))
    s.text(397, 80, 'M3', size=12); s.text(397, 190, 'M4', size=12)
    wire(s, (340, 80), (380, 80)); wire(s, (340, 190), (380, 190))
    # Rechenwerke
    s.rect(440, 20, 100, 230, dash=True)
    units = ['ADD', 'SUB', 'MUL', 'DIV', 'SQRT']
    for k, u in enumerate(units):
        s.block(455, 30 + k * 43, 70, 32, u, size=13)
    wire(s, m3o, (446, m3o[1])); wire(s, m4o, (446, m4o[1]))
    # Ergebnisauswahl M2 und M1
    s.path('M570,30 L604,46 L604,224 L570,240 Z'); s.text(587, 135, 'M2', size=12)
    for k in range(5):
        wire(s, (525, 46 + k * 43), (570, 46 + k * 43))
    wire(s, (587, 262), (587, 232)); s.text(587, 276, 'K', size=14)
    s.path('M630,110 L664,126 L664,274 L630,290 Z'); s.text(647, 200, 'M1', size=12)
    wire(s, (604, 135), (630, 135))
    for k, lab in enumerate('abc'):
        y = 180 + k * 30
        wire(s, (606, y), (630, y)); s.text(596, y, lab, size=14)
    # Rückführung in die Register
    s.line((664, 200), (700, 200), (700, 370), (232, 370), (232, 140), (250, 140), sw=1.4)
    s.head(250, 140, 1, 0, size=6)
    # Demultiplexer D: Takt an Zielregister
    s.block(255, 280, 80, 40, 'Demux D', size=13)
    s.arrow(295, 280, 295, 240)
    s.line((380, 300), (335, 300), sw=1.2); s.head(335, 300, -1, 0, size=6)
    s.text(392, 300, '¬clk', size=14, anchor='start')


# ---------------- Kapitel 6 ----------------
@fig('mmix-befehlswort', 560, 190)
def _(s):
    s.rect(40, 40, 480, 50)
    for k, lab in enumerate(['OP', 'X', 'Y', 'Z']):
        if k: s.line((40 + 120 * k, 40), (40 + 120 * k, 90))
        s.text(100 + 120 * k, 65, lab, size=18)
    for x, t, a in ((44, '31', 'start'), (156, '24', 'end'), (164, '23', 'start'), (276, '16', 'end'),
                    (284, '15', 'start'), (396, '8', 'end'), (404, '7', 'start'), (516, '0', 'end')):
        s.text(x, 26, t, size=12, anchor=a)
    for k, lab in enumerate(['Befehl', 'Ziel', 'Quelle', 'Quelle']):
        s.text(100 + 120 * k, 108, lab, size=13)
    s.line((284, 128), (516, 128), sw=1.1); s.text(400, 142, 'YZ', size=13)
    s.line((164, 160), (516, 160), sw=1.1); s.text(340, 174, 'XYZ', size=13)


@fig('mmix-speichersegmente', 560, 330)
def _(s):
    names = [('Text-Segment', 'Befehle, Interrupt-Vektoren'), ('Daten-Segment', 'Heap ↓   ↑ Stack'),
             ('Pool-Segment', 'Parameter, Austausch mit dem Kernel'), ('Stack-Segment', 'Register-Stack'),
             ('Betriebssystem-Segment', 'Kernel Space')]
    addrs = ['#0000…', '#2000…', '#4000…', '#6000…', '#8000…']
    for k, (n, sub) in enumerate(names):
        y = 20 + k * 56
        s.rect(210, y, 250, 56)
        s.text(335, y + 20, n, size=15); s.text(335, y + 40, sub, size=12)
        s.text(200, y + 2, addrs[k], size=13, anchor='end')
    s.text(200, 300, '#FFFF…', size=13, anchor='end')
    s.line((475, 22), (485, 22), (485, 242), (475, 242), sw=1.1); s.text(495, 132, 'User', size=13, anchor='start')
    s.text(495, 270, 'Kernel', size=13, anchor='start')
    s.text(60, 150, 'Programmstart #100', size=12)


@fig('endian', 470, 210)
def _(s):
    s.text(235, 8, '32 Bit Zahl #01234567 bei Adresse 0', size=15)
    cols = [(40, 170, 'Adresse'), (170, 310, 'Big Endian'), (310, 450, 'Little Endian')]
    for x0, x1, h in cols:
        s.rect(x0, 30, x1 - x0, 160)
        s.text((x0 + x1) / 2, 48, h, size=14)
    s.line((40, 64), (450, 64))
    big, little = ['01', '23', '45', '67'], ['67', '45', '23', '01']
    for k in range(4):
        y = 86 + k * 30
        s.text(105, y, f'…{k}', size=15); s.text(240, y, big[k], size=15); s.text(380, y, little[k], size=15)


@fig('stack', 600, 270)
def _(s):
    rows = [('…D8', 'Sicherung $1'), ('…E0', 'Sicherung $2'), ('…E8', '1. Parameter'),
            ('…F0', '2. Parameter'), ('…F8', '3. Parameter')]
    for k, (a, t) in enumerate(rows):
        y = 30 + k * 40
        s.rect(230, y, 190, 40)
        s.text(325, y + 20, t, size=14)
        s.text(220, y + 20, '#3FFF…' + a[1:], size=13, anchor='end')
    s.text(220, 238, '#4000…', size=13, anchor='end')
    s.arrow(490, 50, 422, 50); s.text(500, 50, 'SP', size=16, anchor='start')
    s.line((432, 112), (442, 112), (442, 228), (432, 228), sw=1.1)
    s.text(450, 170, 'vom Aufrufer', size=13, anchor='start')
    s.arrow(80, 220, 80, 40); s.text(70, 130, 'Stack wächst', size=12, anchor='end')


# ---------------- Kapitel 7 ----------------
@fig('pipeline', 660, 190)
def _(s):
    names = [('BH', 'Befehl holen'), ('BD', 'Decodieren'), ('AF', 'Ausführen'), ('SP', 'Speicher'), ('ES', 'Ergebnis schreiben')]
    for k, (a, b) in enumerate(names):
        x = 10 + k * 130
        s.block(x, 60, 100, 60, a, size=18)
        s.text(x + 50, 140, b, size=13)
        if k < 4:
            s.rect(x + 110, 35, 10, 110, fill='#d9d9d6')
            s.arrow(x + 100, 90, x + 110, 90)
            s.arrow(x + 120, 90, x + 130, 90)
    s.text(375, 18, 'Pipeline-Register', size=13)
    s.line((375, 26), (375, 35), sw=1.0)


@fig('pipeline-fuelldiagramm', 660, 250)
def _(s):
    stages = ['BH', 'BD', 'AF', 'SP', 'ES']
    instr = ['ADD', 'SUB', 'MUL', 'DIV', 'LDW']
    x0, dx, y0, dy = 110, 58, 50, 36
    for t in range(9):
        s.text(x0 + t * dx + dx / 2, 24, str(t + 1), size=14)
    s.text(60, 24, 't', size=15)
    for i, name in enumerate(instr):
        y = y0 + i * dy
        s.text(70, y + dy / 2, name, size=14)
        for k, st in enumerate(stages):
            t = i + k
            s.rect(x0 + t * dx, y, dx, dy, sw=1.1)
            s.text(x0 + t * dx + dx / 2, y + dy / 2, st, size=13)
    s.text(x0 + 4.5 * dx, 240, 'nach Takt 5 gefüllt: ein Befehl pro Takt fertig', size=13)


# ---------------- Kapitel 8 ----------------
@fig('speicherhierarchie', 540, 310)
def _(s):
    layers = ['Register', 'L1 Cache', 'L2 Cache', 'L3 Cache', 'Arbeitsspeicher', 'SSD / Festplatte']
    cx = 240
    for i, lab in enumerate(layers):
        y0, y1 = 20 + i * 45, 20 + (i + 1) * 45
        w0, w1 = 40 + i * 34, 40 + (i + 1) * 34
        s.path(f'M{cx - w0},{y0} L{cx + w0},{y0} L{cx + w1},{y1} L{cx - w1},{y1} Z')
        s.text(cx, (y0 + y1) / 2, lab, size=14)
    s.arrow(500, 290, 500, 30); s.text(490, 160, 'schneller', size=13, anchor='end')
    s.arrow(-10, 30, -10, 290); s.text(4, 160, 'mehr Platz', size=13, anchor='start')


@fig('cache-direkt', 640, 330)
def _(s):
    s.rect(60, 20, 460, 40); s.line((300, 20), (300, 60)); s.line((440, 20), (440, 60))
    s.text(180, 40, 'Schlüssel k', size=15); s.text(370, 40, 'Rahmen f', size=15); s.text(480, 40, 'Byte b', size=15)
    # Tag-RAM und Daten
    s.rect(250, 110, 130, 150); s.text(315, 98, 'Tag-RAM', size=14)
    s.line((280, 110), (280, 260), sw=1.1); s.text(265, 122, 'V', size=12)
    s.rect(410, 110, 170, 150); s.text(495, 98, 'Cache-Rahmen', size=14)
    s.rect(250, 172, 330, 22, dash=True, sw=1.1)
    s.line((370, 60), (370, 80), (232, 80), (232, 183), (250, 183), sw=1.2); s.head(250, 183, 1, 0, size=6)
    # Vergleich Schlüssel = Tag
    s.circle(180, 290, 18); s.text(180, 290, '=', size=18)
    s.line((180, 60), (180, 272), sw=1.2); s.head(180, 272, 0, 1, size=6)
    s.line((330, 260), (330, 290), (198, 290), sw=1.2); s.head(198, 290, -1, 0, size=6)
    s.line((162, 290), (90, 290), sw=1.2); s.head(90, 290, -1, 0, size=6); s.text(64, 290, 'Hit', size=15)
    s.line((480, 60), (480, 110), sw=1.2); s.head(480, 110, 0, 1, size=6)
    s.line((540, 260), (540, 300), sw=1.2); s.head(540, 300, 0, 1, size=6); s.text(540, 316, 'Datenwort', size=14)


@fig('cache-set', 620, 250)
def _(s):
    s.rect(60, 20, 460, 40); s.line((300, 20), (300, 60)); s.line((440, 20), (440, 60))
    s.text(180, 40, 'Schlüssel k', size=15); s.text(370, 40, 'Set s', size=15); s.text(480, 40, 'Byte b', size=15)
    for j in range(2):
        x = 180 + j * 170
        s.text(x + 75, 88, f'Rahmen {j + 1}', size=13)
        for i in range(4):
            s.rect(x, 100 + i * 30, 150, 30, sw=1.1)
    for i in range(4):
        s.text(165, 115 + i * 30, f'Set {i}', size=13, anchor='end')
    s.text(310, 238, 'a = 2: Schlüssel wird mit a Tags verglichen', size=13)


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    only = sys.argv[1:]
    for name, (w, h, fn) in FIGS.items():
        if only and name not in only:
            continue
        s = SVG(w, h); fn(s); s.save(os.path.join(OUT, name + '.svg'))
    print(len(FIGS), 'Computertechnik-Schaltbilder geschrieben')
