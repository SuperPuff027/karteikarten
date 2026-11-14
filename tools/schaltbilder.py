"""Eigene Schaltbilder für das Lernset Schaltungstheorie.

Alle Grafiken sind hier neu gezeichnet (keine Ausschnitte aus dem Skript).
Aufruf aus dem Projektordner:  python tools/schaltbilder.py
"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from schaltbild import SVG, INK

OUT = os.path.join(os.path.dirname(__file__), '..', 'schaltbilder')
FIGS = {}


def fig(name, w, h):
    def deco(fn):
        FIGS[name] = (w, h, fn)
        return fn
    return deco


def eintor_symbol(s, x, top, bot, kind):
    """Senkrechtes Eintor zwischen zwei Klemmen."""
    s.term(x, top); s.term(x, bot)
    getattr(s, kind)(x, top + 3, x, bot - 3)


# ---------------- Kapitel 2 ----------------
@fig('mehrtore-mehrpole', 520, 230)
def _(s):
    # links: n-Tor mit Torpaaren
    s.block(110, 30, 80, 170)
    ys = [(48, 78, '1'), (128, 158, '2'), (182, 196, None)]
    for (ya, yb, n) in [(45, 75, '1'), (115, 145, '2')]:
        for y, nm in ((ya, n), (yb, n + '′')):
            s.line((60, y), (110, y)); s.term(60, y); s.text(44, y, nm, size=17, raw=True)
        s.i_arrow(90, ya, 1, 0, f'i_{n}', off=(0, -11))
        s.i_arrow(80, yb, -1, 0, f'i_{n}', off=(0, 13))
        s.u_arrow(70, ya + 6, yb - 6, f'u_{n}', 'left', lx=-14)
    s.plain(75, 170, '⋮', size=16)
    s.line((60, 185), (110, 185)); s.term(60, 185); s.text(44, 185, 'n', size=17)
    s.text(150, 215, 'n-Tor', size=18)
    # rechts: Dreipol als Zweitor betrieben
    cx, cy = 390, 105
    s.circle(cx, cy, 26)
    s.term(320, 40); s.term(460, 40); s.term(390, 185)
    s.line((320, 40), (cx - 18, cy - 18)); s.line((460, 40), (cx + 18, cy - 18)); s.line((390, 185), (cx, cy + 26))
    s.text(318, 24, '1', size=17, raw=True); s.text(462, 24, '2', size=17, raw=True); s.text(405, 192, '3', size=17, raw=True)
    s.i_arrow(342, 58, 1, 0.8, 'i_1', off=(-14, 8))
    s.i_arrow(438, 58, -1, 0.8, 'i_2', off=(14, 8))
    s.u_arrow(300, 50, 175, 'u_1', 'left')
    s.u_arrow(480, 50, 175, 'u_2', 'right')
    s.line((300, 185), (480, 185), dash=True)
    s.text(390, 215, 'Dreipol als Zweitor', size=18, raw=True)


# ---------------- Kapitel 3 ----------------
@fig('nullator', 420, 190)
def _(s):
    ox, oy = s.axes(30, 20, 170, 150)
    s.dot(ox, oy)
    eintor_symbol(s, 320, 35, 160, 'nullator')
    s.text(345, 97, 'u = 0,  i = 0', 'start', size=18)


@fig('widerstand', 300, 120)
def _(s):
    s.term(30, 50); s.term(270, 50)
    s.resistor(30, 50, 270, 50, 'G')
    s.i_arrow(80, 50, 1, 0, 'i', off=(0, -12))
    s.u_arrow_h(110, 190, 90, 'u', ly=16)


@fig('leerlauf-kurzschluss', 520, 200)
def _(s):
    for k, (x0, lab) in enumerate(((20, '(a) Leerlauf: i = 0'), (280, '(b) Kurzschluss: u = 0'))):
        ox, oy = s.axes(x0, 20, 150, 130)
        if k == 0: s.line((x0 + 4, oy), (x0 + 146, oy), sw=3)
        else: s.line((ox, 26), (ox, 146), sw=3)
        x = x0 + 205
        s.term(x, 40); s.term(x, 140)
        if k == 0:
            s.line((x, 43), (x, 75)); s.line((x, 105), (x, 137))
        else:
            s.line((x, 43), (x, 137))
        s.plain(x0 + 120, 182, lab.split(':')[0], size=17)
        s.text(x0 + 120, 182, '', raw=True)


@fig('schalter', 320, 110)
def _(s):
    s.term(30, 65); s.term(290, 65)
    s.switch(30, 65, 290, 'S(t)')
    s.plain(160, 98, 'S = 1 geschlossen,   S = 0 offen', size=17)


@fig('norator', 420, 190)
def _(s):
    s.rect(30, 20, 170, 150, fill='#d9d9d4', sw=0)
    ox, oy = s.axes(30, 20, 170, 150)
    eintor_symbol(s, 320, 35, 160, 'norator')
    s.plain(345, 97, 'u, i beliebig', 'start', size=18)


@fig('pn-diode-photodiode', 540, 200)
def _(s):
    # (a) pn-Diode
    ox, oy = s.axes(15, 20, 160, 140, oy=125)
    s.path(f'M25,{oy + 4} C{ox},{oy + 3} {ox + 40},{oy} {ox + 52},{oy - 95}')
    s.term(225, 45); s.term(225, 150)
    s.diode(225, 48, 225, 147)
    s.i_arrow(225, 70, 0, 1, 'i', off=(12, 0), anchor='start')
    s.u_arrow(205, 55, 140, 'u', 'left')
    s.plain(100, 185, '(a) pn-Diode', size=17)
    # (b) Photodiode
    ox, oy = s.axes(285, 20, 160, 140, oy=105)
    for k, d in enumerate((0, 22, 44)):
        s.path(f'M295,{oy + 4 + d} C{ox},{oy + 3 + d} {ox + 40},{oy + d} {ox + 52},{oy - 85 + d}', sw=1.3)
    s.term(495, 45); s.term(495, 150)
    s.diode(495, 48, 495, 147)
    s.arrow(522, 70, 507, 88); s.arrow(530, 82, 515, 100)
    s.plain(370, 185, '(b) Photodiode', size=17)


@fig('zener-tunneldiode', 540, 200)
def _(s):
    ox, oy = s.axes(15, 20, 170, 140, oy=95)
    s.path(f'M25,{oy + 55} C55,{oy + 50} 60,{oy + 3} 75,{oy + 2} L{ox},{oy} C{ox + 30},{oy - 2} {ox + 40},{oy - 10} {ox + 55},{oy - 70}')
    s.text(55, oy - 12, 'U_Z', size=17)
    s.term(230, 45); s.term(230, 150); s.diode(230, 48, 230, 147, kind='zener')
    s.plain(100, 185, '(a) Zener-Diode', size=17)
    ox, oy = s.axes(285, 20, 170, 140, oy=130)
    s.path(f'M{ox},{oy} C{ox + 8},{oy - 90} {ox + 25},{oy - 100} {ox + 40},{oy - 45} C{ox + 50},{oy - 25} {ox + 70},{oy - 20} {ox + 85},{oy - 40} C{ox + 95},{oy - 60} {ox + 100},{oy - 85} {ox + 104},{oy - 105}')
    s.term(500, 45); s.term(500, 150); s.diode(500, 48, 500, 147, kind='tunnel')
    s.plain(370, 185, '(b) Tunneldiode', size=17)


@fig('parallel-serie-eintore', 560, 220)
def _(s):
    # (a) Parallelschaltung
    s.term(120, 25); s.term(120, 190)
    s.line((120, 28), (120, 45)); s.line((70, 45), (170, 45)); s.line((70, 170), (170, 170)); s.line((120, 170), (120, 187))
    s.dot(120, 45); s.dot(120, 170)
    s.box1(70, 45, 70, 170, 'F_1', lside=-1)
    s.box1(170, 45, 170, 170, 'F_2', lside=1)
    s.u_arrow(40, 70, 145, 'u', 'left')
    s.plain(120, 210, '(a) Parallelschaltung', size=17)
    # (b) Serienschaltung
    s.term(300, 100); s.term(540, 100)
    s.box1(300, 100, 420, 100, 'F_1')
    s.box1(420, 100, 540, 100, 'F_2')
    s.i_arrow(318, 100, 1, 0, 'i', off=(0, -12))
    s.u_arrow_h(330, 410, 132, 'u_1', ly=14)
    s.u_arrow_h(450, 530, 132, 'u_2', ly=14)
    s.plain(420, 210, '(b) Serienschaltung', size=17)


@fig('strom-spannungsquelle', 540, 200)
def _(s):
    ox, oy = s.axes(15, 20, 160, 140, ox=40, oy=135)
    s.line((40, 70), (165, 70), sw=2.4); s.text(28, 70, 'i_Q', 'end', size=17)
    s.term(225, 40); s.term(225, 155)
    s.isource(225, 43, 225, 152)
    s.i_arrow(225, 135, 0, 1, 'i_Q', off=(10, 0), anchor='start')
    s.plain(110, 188, '(a) Stromquelle', size=17)
    ox, oy = s.axes(285, 20, 160, 140, ox=310, oy=135)
    s.line((400, 28), (400, 150), sw=2.4); s.text(400, 155, 'u_Q', size=17)
    s.term(495, 40); s.term(495, 155)
    s.vsource(495, 43, 495, 152)
    s.u_arrow(470, 70, 125, 'u_Q', 'left')
    s.plain(380, 188, '(b) Spannungsquelle', size=17)


@fig('quellenumwandlung', 560, 190)
def _(s):
    # links: Spannungsquelle mit Innenwiderstand
    s.line((40, 40), (40, 150))
    s.vsource(40, 40, 40, 150, 'u_0', lside=-1)
    s.line((40, 40), (80, 40)); s.resistor(80, 40, 180, 40, 'R')
    s.line((180, 40), (215, 40)); s.term(215, 40); s.line((40, 150), (215, 150)); s.term(215, 150)
    s.port(240, 40, '1'); s.port(240, 150, '2')
    s.u_arrow(200, 55, 135, "u'", 'left')
    s.plain(280, 95, '⇔', size=26)
    # rechts: Stromquelle mit Innenleitwert
    s.line((340, 40), (520, 40)); s.line((340, 150), (520, 150))
    s.isource(340, 40, 340, 150, '-i_0', lside=-1)
    s.dot(420, 40); s.dot(420, 150)
    s.resistor(420, 40, 420, 150, 'G')
    s.term(520, 40); s.term(520, 150)
    s.u_arrow(500, 55, 135, "u'", 'left')
    s.plain(280, 180, 'i_0 = u_0 / R,   G = 1 / R', size=18)


@fig('ideale-diode', 420, 190)
def _(s):
    ox, oy = s.axes(30, 20, 180, 150)
    s.line((36, oy), (ox, oy), (ox, 26), sw=3)
    s.plain(70, oy - 12, 'I', size=17); s.plain(ox + 14, 50, 'II', size=17)
    s.term(320, 35); s.term(320, 160); s.diode(320, 38, 320, 157, kind='ideal')


@fig('einweggleichrichter', 520, 200)
def _(s):
    s.line((50, 40), (50, 160))
    s.vsource(50, 40, 50, 160, 'u_0(t)', lside=-1)
    s.line((50, 40), (90, 40)); s.resistor(90, 40, 190, 40, 'R')
    s.line((190, 40), (450, 40)); s.line((50, 160), (450, 160))
    s.dot(320, 40); s.dot(320, 160)
    s.diode(320, 160, 320, 40, kind='ideal')
    s.resistor(420, 40, 420, 160, 'R', lside=-1)
    s.line((420, 40), (450, 40)); s.term(450, 40); s.term(450, 160)
    s.u_arrow(470, 55, 145, 'u_L(t)', 'right')
    s.u_arrow(280, 60, 140, 'u(t)', 'left')
    s.i_arrow(240, 40, 1, 0, 'i(t)', off=(0, -12))


@fig('kleinsignal-diode', 420, 190)
def _(s):
    s.line((50, 40), (50, 150))
    s.vsource(50, 40, 50, 150, 'Δu_0(t)', lside=-1)
    s.line((50, 40), (110, 40)); s.resistor(110, 40, 230, 40, 'R')
    s.line((230, 40), (300, 40)); s.line((50, 150), (300, 150))
    s.resistor(300, 40, 300, 150, 'G_D', lside=1)
    s.i_arrow(300, 62, 0, 1, 'Δi', off=(12, 0), anchor='start')
    s.u_arrow(275, 60, 130, 'Δu', 'left')


# ---------------- Kapitel 4 ----------------
def twoport(s, x, y, w, h, label, arrows=True, lead=60):
    """Zweitor-Block mit Klemmen 1,1' links und 2,2' rechts. Gibt Klemmenpositionen zurück."""
    s.block(x, y, w, h, label)
    yt, yb = y + 18, y + h - 18
    xl, xr = x - lead, x + w + lead
    for (xa, xb) in ((xl, x), (x + w, xr)):
        s.line((xa, yt), (xb, yt)); s.line((xa, yb), (xb, yb))
    for (xx, yy) in ((xl, yt), (xl, yb), (xr, yt), (xr, yb)):
        s.term(xx, yy)
    if arrows:
        s.i_arrow(xl + 30, yt, 1, 0, 'i_1', off=(0, -13))
        s.i_arrow(xl + 22, yb, -1, 0, 'i_1', off=(0, 15))
        s.i_arrow(xr - 30, yt, -1, 0, 'i_2', off=(0, -13))
        s.i_arrow(xr - 22, yb, 1, 0, 'i_2', off=(0, 15))
        s.u_arrow(xl + 12, yt + 10, yb - 10, 'u_1', 'left', lx=-18)
        s.u_arrow(xr - 12, yt + 10, yb - 10, 'u_2', 'right', lx=18)
    return (xl, yt, yb), (xr, yt, yb)


@fig('zweitor', 400, 160)
def _(s):
    twoport(s, 130, 20, 140, 120, 'Zweitor')
    s.port(48, 38, '1'); s.port(48, 122, "1'"); s.port(352, 38, '2'); s.port(352, 122, "2'")


@fig('gesteuerte-quellen', 430, 380)
def _(s):
    rows = [('VCCS', 'i_2 = g u_1', 'open', 'i'), ('CCCS', 'i_2 = β i_1', 'short', 'i'),
            ('VCVS', 'u_2 = μ u_1', 'open', 'u'), ('CCVS', 'u_2 = r i_1', 'short', 'u')]
    for k, (name, eq, inp, out) in enumerate(rows):
        yt = 20 + k * 95; yb = yt + 55
        s.term(20, yt); s.term(20, yb); s.term(220, yt); s.term(220, yb)
        s.line((20, yt), (70, yt)); s.line((20, yb), (70, yb))
        if inp == 'short':
            s.line((70, yt), (70, yb)); s.i_arrow(70, yt + 22, 0, 1, 'i_1', off=(12, 0), anchor='start')
        else:
            s.u_arrow(45, yt + 10, yb - 10, 'u_1', 'right')
        s.line((140, yt), (220, yt)); s.line((140, yb), (220, yb))
        s.ctrl_source(140, yt, 140, yb, kind=out)
        s.text(250, yt + 12, name, 'start', size=19, raw=True)
        s.text(250, yb - 6, eq, 'start', size=19)


@fig('nullor', 400, 170)
def _(s):
    s.rect(110, 10, 180, 150, dash=True)
    for x in (30, 370):
        s.term(x, 40); s.term(x, 130)
    s.line((30, 40), (150, 40)); s.line((30, 130), (150, 130))
    s.line((250, 40), (370, 40)); s.line((250, 130), (370, 130))
    s.nullator(150, 40, 150, 130); s.norator(250, 40, 250, 130)
    s.u_arrow(55, 52, 118, 'u_1 = 0', 'left'); s.text(60, -4, 'i_1 = 0', size=17)
    s.text(330, -4, 'i_2 beliebig', size=17); s.u_arrow(345, 52, 118, 'u_2', 'left')


@fig('uebertrager', 400, 170)
def _(s):
    for x in (30, 370):
        s.term(x, 40); s.term(x, 130)
    s.line((30, 40), (165, 40), (165, 60)); s.line((30, 130), (165, 130), (165, 110))
    s.line((235, 40), (370, 40)); s.line((235, 60), (235, 40)); s.line((235, 110), (235, 130), (370, 130))
    s.inductor(165, 60, 165, 110); s.inductor(235, 60, 235, 110)
    s.line((193, 55), (193, 115), sw=2); s.line((207, 55), (207, 115), sw=2)
    s.text(200, 18, 'ü : 1', raw=True)
    s.i_arrow(70, 40, 1, 0, 'i_1', off=(0, -13)); s.i_arrow(330, 40, -1, 0, 'i_2', off=(0, -13))
    s.u_arrow(50, 52, 118, 'u_1', 'right'); s.u_arrow(350, 52, 118, 'u_2', 'left')


@fig('gyrator', 400, 170)
def _(s):
    for x in (30, 370):
        s.term(x, 40); s.term(x, 130)
    s.line((30, 40), (170, 40), (170, 130), (30, 130))
    s.line((370, 40), (230, 40), (230, 130), (370, 130))
    s.path('M170,70 A15,15 0 0 1 170,100')
    s.path('M230,70 A15,15 0 0 0 230,100')
    s.arrow(178, 20, 222, 20, 'R_d', ly=-14)
    s.i_arrow(70, 40, 1, 0, 'i_1', off=(0, -13)); s.i_arrow(330, 40, -1, 0, 'i_2', off=(0, -13))
    s.u_arrow(50, 52, 118, 'u_1', 'right'); s.u_arrow(350, 52, 118, 'u_2', 'left')


@fig('nik', 420, 200)
def _(s):
    for x in (20, 400):
        s.term(x, 70); s.term(x, 170)
    s.line((20, 70), (100, 70)); s.line((320, 70), (400, 70)); s.line((20, 170), (400, 170))
    s.dot(100, 70); s.dot(320, 70)
    s.line((100, 70), (100, 25)); s.line((320, 70), (320, 25))
    s.nullator(100, 25, 320, 25)
    s.line((100, 70), (100, 110)); s.line((320, 70), (320, 110))
    s.resistor(100, 110, 210, 110, 'R', lside=-1); s.resistor(210, 110, 320, 110, 'R', lside=-1)
    s.dot(210, 110); s.dot(210, 170)
    s.norator(210, 110, 210, 170)
    s.i_arrow(55, 70, 1, 0, 'i_1', off=(0, -13)); s.i_arrow(365, 70, -1, 0, 'i_2', off=(0, -13))
    s.u_arrow(38, 82, 158, 'u_1', 'right'); s.u_arrow(382, 82, 158, 'u_2', 'left')
    s.text(210, 196, 'NIK mit k = −1', size=17)


def two_boxes(s, x, label1='F_1', label2='F_2'):
    s.block(x, 20, 100, 80, label1, size=18); s.block(x, 140, 100, 80, label2, size=18)
    return (35, 85, 155, 205)   # y: oben/unten von F1, oben/unten von F2


@fig('parallelschaltung-zweitore', 460, 230)
def _(s):
    a1, b1, a2, b2 = two_boxes(s, 180)
    # links: beide Eingänge parallel
    s.line((30, a1), (180, a1)); s.line((30, b2), (180, b2))
    s.dot(120, a1); s.line((120, a1), (120, a2), (180, a2))
    s.dot(90, b2); s.line((90, b2), (90, b1), (180, b1))
    # rechts: beide Ausgänge parallel
    s.line((280, a1), (430, a1)); s.line((280, b2), (430, b2))
    s.dot(340, a1); s.line((340, a1), (340, a2), (280, a2))
    s.dot(370, b2); s.line((370, b2), (370, b1), (280, b1))
    for x, y in ((30, a1), (30, b2), (430, a1), (430, b2)): s.term(x, y)
    s.u_arrow(45, a1 + 15, b2 - 15, 'u_1', 'right'); s.u_arrow(415, a1 + 15, b2 - 15, 'u_2', 'left')


@fig('serienschaltung-zweitore', 460, 230)
def _(s):
    a1, b1, a2, b2 = two_boxes(s, 180)
    s.line((30, a1), (180, a1)); s.line((30, b2), (180, b2))
    s.line((180, b1), (120, b1), (120, a2), (180, a2))
    s.line((280, a1), (430, a1)); s.line((280, b2), (430, b2))
    s.line((280, b1), (340, b1), (340, a2), (280, a2))
    for x, y in ((30, a1), (30, b2), (430, a1), (430, b2)): s.term(x, y)
    s.u_arrow(45, a1 + 15, b2 - 15, 'u_1', 'right'); s.u_arrow(415, a1 + 15, b2 - 15, 'u_2', 'left')
    s.i_arrow(80, a1, 1, 0, 'i_1', off=(0, -13)); s.i_arrow(380, a1, -1, 0, 'i_2', off=(0, -13))


@fig('hybride-schaltungen', 460, 540)
def _(s):
    for k, (title, left_ser) in enumerate((('Serie/Parallel: H addieren', True), ('Parallel/Serie: H′ addieren', False))):
        dy = k * 280
        s.block(180, 20 + dy, 100, 80, 'F_1', size=18); s.block(180, 140 + dy, 100, 80, 'F_2', size=18)
        a1, b1, a2, b2 = 35 + dy, 85 + dy, 155 + dy, 205 + dy
        for side in ('l', 'r'):
            ser = left_ser if side == 'l' else not left_ser
            xo, xb = (30, 180) if side == 'l' else (430, 280)
            xi = 120 if side == 'l' else 340
            xi2 = 90 if side == 'l' else 370
            s.line((xo, a1), (xb, a1)); s.line((xo, b2), (xb, b2))
            if ser:
                s.line((xb, b1), (xi, b1), (xi, a2), (xb, a2))
            else:
                s.dot(xi, a1); s.line((xi, a1), (xi, a2), (xb, a2))
                s.dot(xi2, b2); s.line((xi2, b2), (xi2, b1), (xb, b1))
            s.term(xo, a1); s.term(xo, b2)
        s.text(230, 250 + dy, title, size=19)


@fig('kettenschaltung', 520, 150)
def _(s):
    s.block(120, 20, 100, 110, 'F_1', size=19); s.block(300, 20, 100, 110, 'F_2', size=19)
    for y in (40, 110):
        s.line((40, y), (120, y)); s.line((220, y), (300, y)); s.line((400, y), (480, y))
        s.term(40, y); s.term(480, y)
    s.i_arrow(80, 40, 1, 0, 'i_1', off=(0, -13)); s.i_arrow(440, 40, -1, 0, 'i_2', off=(0, -13))
    s.u_arrow(55, 52, 98, 'u_1', 'right'); s.u_arrow(465, 52, 98, 'u_2', 'left')
    s.u_arrow(260, 52, 98, None)
    s.text(260, 145, 'A = A_1 · A_2', size=18)


# ---------------- Kapitel 5 ----------------
@fig('opamp-symbol', 300, 170)
def _(s):
    (mx, my), (px, py), (ox, oy) = s.opamp(110, 80, gnd=True)
    s.line((40, my), (mx, my)); s.line((40, py), (px, py)); s.term(40, my); s.term(40, py)
    s.line((ox, oy), (240, oy)); s.term(240, oy)
    s.line((110 + 54 * 0.45, 118), (110 + 54 * 0.45, 140)); s.ground(110 + 54 * 0.45, 140)
    s.text(30, my, '−', 'end', raw=True); s.text(30, py, '+', 'end', raw=True)


def opamp_esb(s, x0, sign, cond, tag):
    s.term(x0 + 20, 40); s.term(x0 + 20, 120)
    s.line((x0 + 20, 40), (x0 + 60, 40)); s.line((x0 + 20, 120), (x0 + 60, 120))
    s.text(x0 + 40, 26, 'i_+ = 0', size=17); s.text(x0 + 40, 140, 'i_− = 0', size=17)
    s.u_arrow(x0 + 35, 50, 110, cond, 'right', lx=8)
    s.line((x0 + 190, 60), (x0 + 240, 60)); s.term(x0 + 240, 60)
    s.vsource(x0 + 190, 150, x0 + 190, 60, sign + 'U_{sat}', lside=-1)
    s.ground(x0 + 190, 150)
    s.text(x0 + 140, 195, tag, size=17)


@fig('opamp-saettigung', 280, 420)
def _(s):
    opamp_esb(s, 0, '−', 'u_d < 0', '(I)  u_2 = −U_{sat}')
    s.el.append('<g transform="translate(0,215)">')
    opamp_esb(s, 0, '+', 'u_d > 0', '(III)  u_2 = +U_{sat}')
    s.el.append('</g>')


@fig('opamp-nullormodell', 380, 190)
def _(s):
    s.path('M90,20 L90,170 L240,95 Z', dash=True)
    s.term(30, 60); s.term(30, 130)
    s.line((30, 60), (130, 60)); s.line((30, 130), (130, 130))
    s.nullator(130, 60, 130, 130)
    s.text(18, 60, '+', 'end', raw=True); s.text(18, 130, '−', 'end', raw=True)
    s.u_arrow(55, 70, 120, 'u_d = 0', 'right', lx=8)
    s.line((200, 95), (330, 95)); s.term(330, 95); s.dot(200, 95)
    s.norator(200, 95, 200, 165); s.ground(200, 165)
    s.text(330, 70, 'u_2, i_2 beliebig', size=17)


def inv_amp(s, x=200, y=120, extra=False):
    (mx, my), (px, py), (ox, oy) = s.opamp(x, y, gnd=False)
    s.term(30, my)
    s.resistor(30, my, mx - 30, my, 'R_1')
    s.line((mx - 30, my), (mx, my)); s.dot(mx - 30, my)
    s.line((mx - 30, my), (mx - 30, 40)); s.resistor(mx - 30, 40, ox + 40, 40, 'R_0')
    s.line((ox + 40, 40), (ox + 40, oy)); s.line((ox, oy), (ox + 70, oy)); s.dot(ox + 40, oy); s.term(ox + 70, oy)
    s.line((px, py), (px - 12, py), (px - 12, 200)); s.dot(px - 12, 200)
    s.line((30, 200), (ox + 70, 200)); s.term(30, 200); s.term(ox + 70, 200)
    s.ground(px - 12, 200)
    s.u_arrow(45, my + 15, 190, 'u_1', 'right')
    s.u_arrow(ox + 55, oy + 15, 190, 'u_0', 'left')
    s.i_arrow(70, my, 1, 0, 'i_1', off=(0, 16))
    s.text(mx - 6, my + 24, 'u_d = 0', 'end', size=16)
    return mx, my


@fig('invertierender-verstaerker', 420, 230)
def _(s):
    inv_amp(s)


@fig('nichtinvertierender-verstaerker', 420, 250)
def _(s):
    (mx, my), (px, py), (ox, oy) = s.opamp(150, 80, flip=True, gnd=False)
    # flip: plus oben
    s.term(30, py); s.line((30, py), (px, py))
    s.line((ox, oy), (330, oy)); s.term(370, oy); s.line((330, oy), (370, oy)); s.dot(290, oy)
    s.resistor(290, oy, 290, 160, 'R_0'); s.dot(290, 160)
    s.resistor(290, 160, 290, 230, 'R_1')
    s.line((290, 160), (120, 160), (120, my), (mx, my))
    s.line((30, 230), (370, 230)); s.term(30, 230); s.term(370, 230); s.ground(200, 230)
    s.u_arrow(45, py + 15, 220, 'u_1', 'right')
    s.u_arrow(355, oy + 15, 220, 'u_0', 'left')


@fig('spannungsfolger', 380, 200)
def _(s):
    (mx, my), (px, py), (ox, oy) = s.opamp(140, 80, flip=True, gnd=False)
    s.term(30, py); s.line((30, py), (px, py))
    s.line((ox, oy), (330, oy)); s.term(330, oy); s.dot(ox + 30, oy)
    s.line((ox + 30, oy), (ox + 30, 140), (115, 140), (115, my), (mx, my))
    s.line((30, 180), (330, 180)); s.term(30, 180); s.term(330, 180); s.ground(180, 180)
    s.u_arrow(45, py + 15, 170, 'u_1', 'right'); s.u_arrow(315, oy + 15, 170, 'u_0', 'left')
    s.text(60, py - 16, 'i_1 = 0', size=17)


@fig('virtuelle-masse', 460, 210)
def _(s):
    s.block(20, 30, 150, 140, 'externe\nBeschaltung', size=19)
    (mx, my), (px, py), (ox, oy) = s.opamp(280, 105, gnd=False)
    s.line((170, my), (mx, my)); s.dot(230, my); s.port(230, my - 20, '1')
    s.line((170, 50), (ox + 30, 50), (ox + 30, oy), (ox, oy)); s.port(200, 32, '2')
    s.line((170, 150), (px - 15, 150), (px - 15, py), (px, py)); s.port(200, 168, '0')
    s.ground(250, 150); s.dot(250, 150)
    s.text(365, 190, 'Knoten 1: Potential 0, kein Strom', 'end', size=16)


@fig('summierer', 420, 330)
def _(s):
    (mx, my), (px, py), (ox, oy) = s.opamp(260, 150, gnd=False)
    # Eingänge an (−)
    for y, (g, u) in zip((40, 95), (('G_1', 'u_1'), ('G_2', 'u_2'))):
        s.term(40, y); s.text(30, y, u, 'end'); s.resistor(40, y, 230, y, g); s.dot(230, y)
    s.line((230, 40), (230, my), (mx, my))
    s.line((230, 40), (230, 15)); s.resistor(230, 15, 350, 15, 'G_0'); s.line((350, 15), (350, oy))
    s.line((ox, oy), (390, oy)); s.dot(350, oy); s.term(390, oy); s.text(400, oy, 'u_0', 'start')
    # Eingänge an (+)
    for y, (g, u) in zip((215, 265), (("G'_1", "u'_1"), ("G'_2", "u'_2"))):
        s.term(40, y); s.text(30, y, u, 'end'); s.resistor(40, y, 215, y, g); s.dot(215, y)
    s.line((215, 265), (215, py), (px, py))
    s.resistor(215, 265, 215, 320, "G'_0", lside=1); s.ground(215, 320)
    s.plain(120, 130, '⋮', size=20); s.plain(120, 295, '', size=1)


# ---------------- Kapitel 6 ----------------
@fig('zirkulator', 360, 320)
def _(s):
    cx, cy, r = 180, 160, 50
    s.circle(cx, cy, r)
    s.path(f'M{cx + 22},{cy - 10} A24,24 0 1 1 {cx + 10},{cy - 22}', sw=1.3); s.head(cx + 13, cy - 21, 1, 0.4, size=6)
    import math
    for k, ang in enumerate((180, 60, 300)):
        a = math.radians(ang)
        for off in (-14, 14):
            px, py = -math.sin(a) * off, math.cos(a) * off
            x1, y1 = cx + math.cos(a) * r * 0.92 + px * 0.6, cy - math.sin(a) * r * 0.92 + py * 0.6
            x2, y2 = cx + math.cos(a) * (r + 70) + px, cy - math.sin(a) * (r + 70) + py
            s.line((x1, y1), (x2, y2)); s.term(x2, y2)
        s.port(cx + math.cos(a) * (r + 100), cy - math.sin(a) * (r + 100), str(k + 1))
    s.text(cx, cy + 92 + 2, '', raw=True)


def rechenbaustein(s, symbol):
    s.rect(130, 20, 130, 130)
    s.term(40, 50); s.term(40, 120); s.term(330, 85)
    s.line((40, 50), (130, 50)); s.line((40, 120), (130, 120)); s.line((260, 85), (330, 85))
    s.line((195, 150), (195, 168)); s.ground(195, 168)
    s.text(85, 36, 'i_1 = 0', size=17); s.text(85, 106, 'i_2 = 0', size=17)
    s.text(30, 50, 'u_1', 'end'); s.text(30, 120, 'u_2', 'end')
    symbol()


@fig('multiplizierer', 400, 200)
def _(s):
    def sym():
        s.line((165, 50), (225, 120), sw=2); s.line((225, 50), (165, 120), sw=2)
    rechenbaustein(s, sym)
    s.text(340, 85, 'u_3', 'start'); s.text(195, 205, 'u_3 = u_1 u_2 / U_M', size=18)


@fig('dividierer', 400, 200)
def _(s):
    def sym():
        s.line((165, 85), (225, 85), sw=2.4); s.dot(195, 65); s.dot(195, 105)
    rechenbaustein(s, sym)
    s.text(340, 85, 'u_3', 'start'); s.text(195, 205, 'u_3 = U_D u_1 / u_2', size=18)


# ---------------- Kapitel 8 ----------------
@fig('differenzverstaerker', 460, 260)
def _(s):
    (mx, my), (px, py), (ox, oy) = s.opamp(250, 110, gnd=False)
    s.line((40, 60), (40, 240)); s.line((110, 120), (110, 240))
    s.vsource(40, 240, 40, 60, 'u_{01}', lside=-1)
    s.resistor(40, 60, 210, 60, 'R_1'); s.dot(210, 60)
    s.line((210, 60), (210, my), (mx, my))
    s.line((210, 60), (210, 25)); s.resistor(210, 25, 340, 25, 'R_2'); s.line((340, 25), (340, oy))
    s.line((ox, oy), (400, oy)); s.dot(340, oy); s.term(400, oy)
    s.vsource(110, 240, 110, 120, 'u_{02}', lside=1)
    s.line((110, 120), (110, 120)); s.resistor(110, 120, 200, 120)
    s.text(155, 102, 'R_3'); s.dot(200, 120)
    s.line((200, 120), (200, py), (px, py))
    s.resistor(200, 120, 200, 240, 'R_4', lside=1)
    s.line((40, 240), (400, 240)); s.term(400, 240); s.ground(300, 240)
    s.u_arrow(385, oy + 15, 228, 'u_a', 'left')


@fig('zweipolersatzschaltungen', 460, 330)
def _(s):
    for k, (title, kind) in enumerate((('Helmholtz/Thévenin', 'th'), ('Mayer/Norton', 'no'))):
        dy = k * 165
        s.block(20, 25 + dy, 110, 100, 'linear\n+\nresistiv', size=17)
        s.line((130, 45 + dy), (170, 45 + dy)); s.line((130, 105 + dy), (170, 105 + dy))
        s.term(170, 45 + dy); s.term(170, 105 + dy)
        s.plain(208, 75 + dy, '≡', size=24)
        y1, y2 = 45 + dy, 105 + dy
        if kind == 'th':
            s.line((250, y1), (250, y2)); s.vsource(250, y2, 250, y1, 'u_0', lside=1)
            s.resistor(250, y1, 360, y1, 'R_i')
        else:
            s.line((250, y1), (360, y1)); s.isource(250, y1, 250, y2, 'i_0', lside=1)
            s.dot(330, y1); s.dot(330, y2); s.resistor(330, y1, 330, y2, 'G_i', lside=1)
        s.line((250, y2), (420, y2)); s.line((360, y1), (420, y1)); s.term(420, y1); s.term(420, y2)
        s.u_arrow(405, y1 + 10, y2 - 10, 'u', 'left')
        s.text(230, 12 + dy, title, size=18, raw=True)


# ---------------- Kapitel 9 ----------------
@fig('nichtlineare-c-l', 360, 180)
def _(s):
    for x, kind in ((90, 'c'), (270, 'l')):
        s.term(x, 20); s.term(x, 160)
        s.line((x, 23), (x, 45)); s.line((x, 135), (x, 157))
        s.rect(x - 22, 45, 44, 90); s.rect(x - 22, 123, 44, 12, fill=INK, sw=0)
        if kind == 'c':
            s.line((x, 45), (x, 77)); s.line((x - 14, 77), (x + 14, 77), sw=2.4); s.line((x - 14, 87), (x + 14, 87), sw=2.4); s.line((x, 87), (x, 123))
        else:
            s.line((x, 45), (x, 60)); s.inductor(x, 60, x, 110); s.line((x, 110), (x, 123))
        s.u_arrow(x - 40, 35, 145, 'u(t)', 'left')
        s.i_arrow(x, 150, 0, 1, 'i(t)', off=(12, 0), anchor='start')


@fig('lineare-c-l', 360, 180)
def _(s):
    s.term(90, 20); s.term(90, 160); s.capacitor(90, 23, 90, 157, 'C')
    s.term(270, 20); s.term(270, 160); s.inductor(270, 23, 270, 157, 'L')
    for x in (90, 270):
        s.u_arrow(x - 40, 35, 145, 'u(t)', 'left')
        s.i_arrow(x, 145, 0, 1, 'i(t)', off=(12, 0), anchor='start')


@fig('kapazitaet-anfangsladung', 400, 200)
def _(s):
    s.term(80, 20); s.term(80, 180); s.capacitor(80, 23, 80, 177, 'C')
    s.u_arrow(40, 35, 165, 'u(t)', 'left')
    s.plain(165, 100, '≡', size=26)
    s.term(290, 20); s.term(290, 180)
    s.capacitor(290, 23, 290, 100, 'C'); s.dot(290, 100)
    s.vsource(290, 100, 290, 177, 'u_0', lside=1)
    s.u_arrow(250, 32, 88, 'u_C(t)', 'left')
    s.text(300, 196, 'u_C(t_0) = 0', size=16)


@fig('induktivitaet-anfangsstrom', 420, 200)
def _(s):
    s.term(80, 20); s.term(80, 180); s.inductor(80, 23, 80, 177, 'L')
    s.u_arrow(40, 35, 165, 'u(t)', 'left')
    s.i_arrow(80, 30, 0, 1, 'i(t)', off=(12, 0), anchor='start')
    s.plain(165, 100, '≡', size=26)
    s.term(300, 20); s.term(300, 180)
    s.line((300, 23), (300, 50)); s.line((250, 50), (360, 50)); s.line((300, 150), (300, 177)); s.line((250, 150), (360, 150))
    s.dot(300, 50); s.dot(300, 150)
    s.inductor(250, 50, 250, 150, 'L', lside=-1)
    s.isource(360, 50, 360, 150, 'i_0', lside=1)
    s.i_arrow(360, 135, 0, 1)
    s.i_arrow(300, 35, 0, 1, 'i(t)', off=(12, 0), anchor='start')
    s.text(300, 196, 'i_L(t_0) = 0', size=16)


# ---------------- Kapitel 10 ----------------
@fig('zeiger-r-g-c-l', 580, 180)
def _(s):
    for k, (lab, kind) in enumerate((('R', 'r'), ('G', 'g'), ('C', 'c'), ('L', 'l'))):
        x = 75 + k * 140
        s.term(x, 20); s.term(x, 160)
        if kind in 'rg': s.resistor(x, 23, x, 157, lab)
        elif kind == 'c': s.capacitor(x, 23, x, 157, lab)
        else: s.inductor(x, 23, x, 157, lab)
        s.u_arrow(x - 30, 35, 145, f'u_{lab}', 'left')
        s.i_arrow(x, 45, 0, 1, f'i_{lab}', off=(12, 0), anchor='start')


# ---------------- Ausgabe ----------------
if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    only = sys.argv[1:]
    for name, (w, h, fn) in FIGS.items():
        if only and name not in only:
            continue
        s = SVG(w, h); fn(s); s.save(os.path.join(OUT, name + '.svg'))
    print(len(FIGS), 'Schaltbilder geschrieben')
