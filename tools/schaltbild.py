"""Kleiner Zeichenbaukasten für Schaltbilder als SVG.

Alle Bauteile werden achsparallel zwischen zwei Punkten gezeichnet.
Linien sind dunkel auf transparentem Grund; die App invertiert sie im Dunkelmodus.
Aufruf:  python tools/schaltbilder.py   (erzeugt schaltbilder/*.svg)
"""
import math, re

INK = '#1d1d1b'
SW = 1.6            # Linienstärke
FONT = "'Times New Roman', 'STIX Two Text', serif"


def fmt_label(s):
    """Mini-Formelsatz: u_1 → u mit tiefgestellter 1, Buchstaben kursiv, Ziffern aufrecht."""
    out = []
    i = 0
    def run(txt, sub=False):
        # Hauptebene: Buchstaben kursiv (Formelzeichen), sonst aufrecht; Indizes aufrecht
        parts = re.findall(r"[A-Za-zα-ωΑ-Ω]+|[^A-Za-zα-ωΑ-Ω]+", txt)
        res = ''
        for p in parts:
            esc = p.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
            # nur kurze Buchstabengruppen (Formelzeichen) kursiv, Wörter aufrecht
            if not sub and re.match(r"[A-Za-zα-ωΑ-Ω]", p) and len(p) <= 2:
                res += f'<tspan font-style="italic">{esc}</tspan>'
            else:
                res += f'<tspan>{esc}</tspan>'
        return res
    while i < len(s):
        if s[i] == '_':
            if i + 1 < len(s) and s[i + 1] == '{':
                j = s.index('}', i)
                body = s[i + 2:j]; i = j + 1
            else:
                body = s[i + 1]; i += 2
            out.append(f'<tspan baseline-shift="sub" font-size="72%">{run(body, True)}</tspan>')
        else:
            j = i
            while j < len(s) and s[j] != '_':
                j += 1
            out.append(run(s[i:j])); i = j
    return ''.join(out)


# ---------- LaTeX-Formelsatz (matplotlib mathtext, Schrift Computer Modern) ----------
try:
    import matplotlib
    matplotlib.rcParams['mathtext.fontset'] = 'cm'
    from matplotlib.textpath import TextPath
    from matplotlib.path import Path
    HAVE_MPL = True
except ImportError:          # ohne matplotlib: einfache Textbeschriftung
    HAVE_MPL = False

SYMBOLS = {'Δ': r'\Delta ', 'β': r'\beta ', 'μ': r'\mu ', 'ü': r'\ddot{u}', '−': '-', '·': r'\cdot ',
           '≡': r'\equiv ', '⇔': r'\Leftrightarrow ', '⋮': r'\vdots ', '∞': r'\infty ', '′': "'", 'é': r'\acute{e}'}


def to_tex(s):
    """Beschriftung in LaTeX übersetzen: Formelzeichen kursiv, Wörter und Wort-Indizes aufrecht."""
    out = []
    i = 0
    def word(w, sub):
        return rf'\mathrm{{{w}}}' if (len(w) >= 3 or (sub and len(w) >= 2)) else w
    def conv(txt, sub=False):
        res = ''
        toks = re.findall(r"[A-Za-zäöüéß]+|\s+|.", txt)
        ops = set('=:+-−·/<>≈,≡⇔')
        for k, tok in enumerate(toks):
            if tok.isspace():
                # Leerzeichen nur zwischen Wörtern/Zeichen behalten; um Operatoren setzt LaTeX selbst Abstände
                prev = toks[k - 1] if k else ''; nxt = toks[k + 1] if k + 1 < len(toks) else ''
                if prev and nxt and prev[-1] not in ops and nxt[0] not in ops: res += r'\ '
                elif prev[-1:] == ',' : res += r'\ '
            elif tok == 'ü': res += SYMBOLS['ü']
            elif re.match(r"[A-Za-zäöüéß]", tok): res += word(tok, sub)
            elif tok == "'": res += "'"
            elif tok in SYMBOLS: res += SYMBOLS[tok]
            elif tok in '%#&$': res += '\\' + tok
            else: res += tok
        return res
    while i < len(s):
        if s[i] == '_':
            if s[i + 1] == '{':
                j = s.index('}', i); body = s[i + 2:j]; i = j + 1
            else:
                body = s[i + 1]; i += 2
            out.append('_{' + conv(body, True) + '}')
        else:
            j = i
            while j < len(s) and s[j] != '_': j += 1
            out.append(conv(s[i:j])); i = j
    return '$' + ''.join(out) + '$'


_CACHE = {}


def tex_svg(x, y, tex, anchor, size):
    key = (tex, size)
    if key not in _CACHE:
        tp = TextPath((0, 0), tex, size=size)
        d = []
        for verts, code in tp.iter_segments():
            pts = [(verts[k], -verts[k + 1]) for k in range(0, len(verts), 2)]
            c = {Path.MOVETO: 'M', Path.LINETO: 'L', Path.CURVE3: 'Q', Path.CURVE4: 'C', Path.CLOSEPOLY: 'Z'}[code]
            d.append(c if c == 'Z' else c + ' '.join(f'{px:.2f},{py:.2f}' for px, py in pts))
        ext = tp.get_extents()
        _CACHE[key] = (' '.join(d), ext.x0, ext.x1)
    d, x0, x1 = _CACHE[key]
    tx = x - (x0 + x1) / 2 if anchor == 'middle' else (x - x0 if anchor == 'start' else x - x1)
    ty = y + size * 0.33          # Grundlinie so, dass die Schrift mittig zur Position steht
    return f'<path transform="translate({tx:.1f},{ty:.1f})" d="{d}" fill="{INK}"/>'


class SVG:
    def __init__(self, w, h):
        self.w, self.h = w, h
        self.el = []

    # ---------- Grundformen ----------
    def line(self, *pts, dash=False, sw=SW):
        d = ' '.join(f'{x:.1f},{y:.1f}' for x, y in pts)
        da = ' stroke-dasharray="5 4"' if dash else ''
        self.el.append(f'<polyline points="{d}" fill="none" stroke="{INK}" stroke-width="{sw}"{da} stroke-linejoin="round" stroke-linecap="round"/>')

    def rect(self, x, y, w, h, dash=False, fill='none', sw=SW):
        da = ' stroke-dasharray="5 4"' if dash else ''
        self.el.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}" stroke="{INK}" stroke-width="{sw}"{da}/>')

    def circle(self, x, y, r, fill='none', sw=SW):
        self.el.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" stroke="{INK}" stroke-width="{sw}"/>')

    def path(self, d, fill='none', sw=SW, dash=False):
        da = ' stroke-dasharray="5 4"' if dash else ''
        self.el.append(f'<path d="{d}" fill="{fill}" stroke="{INK}" stroke-width="{sw}"{da} stroke-linejoin="round" stroke-linecap="round"/>')

    def text(self, x, y, s, anchor='middle', size=20, raw=False):
        """Beschriftung im LaTeX-Stil (Computer Modern, als Vektorpfad eingebettet)."""
        if not s.strip():
            return
        if HAVE_MPL:
            self.el.append(tex_svg(x, y, to_tex(s), anchor, size))
            return
        body = s if raw else fmt_label(s)
        self.el.append(f'<text x="{x}" y="{y}" font-family="{FONT}" font-size="{size}" fill="{INK}" text-anchor="{anchor}" dominant-baseline="middle">{body}</text>')

    def plain(self, x, y, s, anchor='middle', size=17):
        self.text(x, y, s, anchor, size)

    def head(self, x, y, dx, dy, size=7):
        """Gefüllte Pfeilspitze an (x, y), zeigt in Richtung (dx, dy)."""
        l = math.hypot(dx, dy); ux, uy = dx / l, dy / l
        bx, by = x - ux * size * 1.6, y - uy * size * 1.6
        px, py = -uy * size * 0.55, ux * size * 0.55
        self.el.append(f'<polygon points="{x:.1f},{y:.1f} {bx + px:.1f},{by + py:.1f} {bx - px:.1f},{by - py:.1f}" fill="{INK}"/>')

    def arrow(self, x1, y1, x2, y2, label=None, lx=0, ly=0, anchor='middle'):
        self.line((x1, y1), (x2, y2), sw=1.2)
        self.head(x2, y2, x2 - x1, y2 - y1)
        if label:
            self.text((x1 + x2) / 2 + lx, (y1 + y2) / 2 + ly, label, anchor)

    # ---------- Anschlüsse ----------
    def term(self, x, y):
        self.circle(x, y, 3.4, fill='#ffffff', sw=1.3)

    def dot(self, x, y):
        self.el.append(f'<circle cx="{x}" cy="{y}" r="2.9" fill="{INK}"/>')

    def port(self, x, y, s):
        self.circle(x, y, 10, sw=1.1)
        self.text(x, y + 0.5, s, size=15, raw=True)

    def ground(self, x, y):
        self.line((x, y), (x, y + 10))
        self.line((x - 12, y + 10), (x + 12, y + 10), sw=2.6)

    # ---------- Zählpfeile ----------
    def i_arrow(self, x, y, dx, dy, label=None, off=(0, -12), anchor='middle'):
        """Strompfeil als Spitze auf einem Leiter."""
        self.head(x, y, dx, dy, size=6.5)
        if label:
            self.text(x + off[0], y + off[1], label, anchor)

    def u_arrow(self, x, y1, y2, label=None, side='left', lx=None):
        """Senkrechter Spannungspfeil von y1 nach y2 neben einem Bauteil."""
        self.line((x, y1), (x, y2), sw=1.2)
        self.head(x, y2, 0, y2 - y1, size=6)
        if label:
            d = lx if lx is not None else (-6 if side == 'left' else 6)
            self.text(x + d, (y1 + y2) / 2, label, 'end' if side == 'left' else 'start')

    def u_arrow_h(self, x1, x2, y, label=None, ly=14):
        self.line((x1, y), (x2, y), sw=1.2)
        self.head(x2, y, x2 - x1, 0, size=6)
        if label:
            self.text((x1 + x2) / 2, y + ly, label)

    # ---------- Bauteile (zwischen zwei Punkten) ----------
    def _seg(self, x1, y1, x2, y2, length):
        """Leitung bis zum Bauteil, gibt Mittelpunkt und Orientierung zurück."""
        mx, my = (x1 + x2) / 2, (y1 + y2) / 2
        vert = abs(x2 - x1) < 1e-6
        if vert:
            s = 1 if y2 > y1 else -1
            self.line((x1, y1), (mx, my - s * length / 2)); self.line((mx, my + s * length / 2), (x2, y2))
        else:
            s = 1 if x2 > x1 else -1
            self.line((x1, y1), (mx - s * length / 2, my)); self.line((mx + s * length / 2, my), (x2, y2))
        return mx, my, vert, s

    def resistor(self, x1, y1, x2, y2, label=None, lside=1, filled_end=False):
        mx, my, vert, s = self._seg(x1, y1, x2, y2, 36)
        if vert:
            self.rect(mx - 7, my - 18, 14, 36)
            if label: self.text(mx + lside * 14, my, label, 'start' if lside > 0 else 'end')
        else:
            self.rect(mx - 18, my - 7, 36, 14)
            if label: self.text(mx, my - lside * 16, label)
        return mx, my

    def box1(self, x1, y1, x2, y2, label=None, lside=1):
        """Allgemeines Eintor (Rechteck mit gefülltem Ende = Polung)."""
        mx, my, vert, s = self._seg(x1, y1, x2, y2, 36)
        if vert:
            self.rect(mx - 8, my - 18, 16, 36)
            self.rect(mx - 8, my + s * 18 - (0 if s > 0 else -0) - (7 if s > 0 else 0), 16, 7, fill=INK, sw=0)
            if label: self.text(mx + lside * 15, my, label, 'start' if lside > 0 else 'end')
        else:
            self.rect(mx - 18, my - 8, 36, 16)
            self.rect(mx + (11 if s > 0 else -18), my - 8, 7, 16, fill=INK, sw=0)
            if label: self.text(mx, my - lside * 17, label)
        return mx, my

    def vsource(self, x1, y1, x2, y2, label=None, lside=-1):
        mx, my, vert, s = self._seg(x1, y1, x2, y2, 28)
        self.circle(mx, my, 14)
        if vert: self.line((mx, my - 14), (mx, my + 14))
        else: self.line((mx - 14, my), (mx + 14, my))
        if label:
            if vert: self.text(mx + lside * 20, my, label, 'end' if lside < 0 else 'start')
            else: self.text(mx, my - 22, label)
        return mx, my

    def isource(self, x1, y1, x2, y2, label=None, lside=-1):
        mx, my, vert, s = self._seg(x1, y1, x2, y2, 28)
        self.circle(mx, my, 14)
        if vert: self.line((mx - 14, my), (mx + 14, my))
        else: self.line((mx, my - 14), (mx, my + 14))
        if label:
            if vert: self.text(mx + lside * 20, my, label, 'end' if lside < 0 else 'start')
            else: self.text(mx, my - 22, label)
        return mx, my

    def ctrl_source(self, x1, y1, x2, y2, kind='i', label=None, lside=1):
        """Gesteuerte Quelle: Raute; kind 'i' = Strom (Querstrich), 'u' = Spannung (Längsstrich)."""
        mx, my, vert, s = self._seg(x1, y1, x2, y2, 32)
        self.path(f'M{mx},{my - 16} L{mx + 16},{my} L{mx},{my + 16} L{mx - 16},{my} Z')
        if vert:
            if kind == 'i': self.line((mx - 16, my), (mx + 16, my))
            else: self.line((mx, my - 16), (mx, my + 16))
            if label: self.text(mx + lside * 22, my, label, 'start' if lside > 0 else 'end')
        return mx, my

    def nullator(self, x1, y1, x2, y2):
        mx, my, vert, s = self._seg(x1, y1, x2, y2, 34)
        if vert: self.el.append(f'<ellipse cx="{mx}" cy="{my}" rx="8" ry="17" fill="none" stroke="{INK}" stroke-width="{SW}"/>')
        else: self.el.append(f'<ellipse cx="{mx}" cy="{my}" rx="17" ry="8" fill="none" stroke="{INK}" stroke-width="{SW}"/>')
        return mx, my

    def norator(self, x1, y1, x2, y2):
        mx, my, vert, s = self._seg(x1, y1, x2, y2, 34)
        if vert:
            self.path(f'M{mx},{my} C{mx + 15},{my - 6} {mx + 9},{my - 17} {mx},{my - 17} C{mx - 9},{my - 17} {mx - 15},{my - 6} {mx},{my} '
                      f'C{mx + 15},{my + 6} {mx + 9},{my + 17} {mx},{my + 17} C{mx - 9},{my + 17} {mx - 15},{my + 6} {mx},{my}')
        else:
            self.path(f'M{mx},{my} C{mx - 6},{my + 15} {mx - 17},{my + 9} {mx - 17},{my} C{mx - 17},{my - 9} {mx - 6},{my - 15} {mx},{my} '
                      f'C{mx + 6},{my + 15} {mx + 17},{my + 9} {mx + 17},{my} C{mx + 17},{my - 9} {mx + 6},{my - 15} {mx},{my}')
        return mx, my

    def diode(self, x1, y1, x2, y2, kind='normal'):
        """Diode, leitet von (x1,y1) nach (x2,y2) (Dreieck zeigt zum zweiten Punkt)."""
        mx, my, vert, s = self._seg(x1, y1, x2, y2, 22)
        if vert:
            a, b = my - s * 11, my + s * 11
            fill = INK if kind != 'ideal' else 'none'
            self.path(f'M{mx - 12},{a} L{mx + 12},{a} L{mx},{b} Z', fill=fill)
            if kind == 'zener':
                self.line((mx - 14, b - s * 5), (mx - 12, b), (mx + 12, b), (mx + 14, b + s * 5))
            elif kind == 'tunnel':
                self.line((mx - 12, b - s * 5), (mx - 12, b), (mx + 12, b), (mx + 12, b - s * 5))
            else:
                self.line((mx - 12, b), (mx + 12, b))
        else:
            a, b = mx - s * 11, mx + s * 11
            fill = INK if kind != 'ideal' else 'none'
            self.path(f'M{a},{my - 12} L{a},{my + 12} L{b},{my} Z', fill=fill)
            self.line((b, my - 12), (b, my + 12))
        return mx, my

    def capacitor(self, x1, y1, x2, y2, label=None, lside=1):
        mx, my, vert, s = self._seg(x1, y1, x2, y2, 9)
        if vert:
            self.line((mx - 15, my - 4.5), (mx + 15, my - 4.5), sw=2.4)
            self.line((mx - 15, my + 4.5), (mx + 15, my + 4.5), sw=2.4)
            if label: self.text(mx + lside * 22, my, label, 'start' if lside > 0 else 'end')
        else:
            self.line((mx - 4.5, my - 15), (mx - 4.5, my + 15), sw=2.4)
            self.line((mx + 4.5, my - 15), (mx + 4.5, my + 15), sw=2.4)
            if label: self.text(mx, my - 24, label)
        return mx, my

    def inductor(self, x1, y1, x2, y2, label=None, lside=1, loops=4):
        L = 40
        mx, my, vert, s = self._seg(x1, y1, x2, y2, L)
        step = L / loops
        if vert:
            y0 = my - L / 2
            d = f'M{mx},{y0}'
            for k in range(loops):
                d += f' a{step / 2 * 1.4:.1f},{step / 2:.1f} 0 1 1 0,{step:.1f}'
            self.path(d)
            if label: self.text(mx + lside * 20, my, label, 'start' if lside > 0 else 'end')
        else:
            x0 = mx - L / 2
            d = f'M{x0},{my}'
            for k in range(loops):
                d += f' a{step / 2:.1f},{step / 2 * 1.4:.1f} 0 1 1 {step:.1f},0'
            self.path(d)
            if label: self.text(mx, my - 22, label)
        return mx, my

    def switch(self, x1, y, x2, label=None):
        mx = (x1 + x2) / 2
        self.line((x1, y), (mx - 14, y)); self.line((mx + 14, y), (x2, y))
        self.line((mx - 14, y), (mx + 12, y - 12))
        if label: self.text(mx, y - 26, label)

    # ---------- Blöcke ----------
    def block(self, x, y, w, h, label=None, dash=False, size=16):
        self.rect(x, y, w, h, dash=dash)
        if label:
            lines = label.split('\n')
            for k, l in enumerate(lines):
                self.text(x + w / 2, y + h / 2 + (k - (len(lines) - 1) / 2) * (size + 3), l, size=size)

    def opamp(self, x, y, flip=False, gnd=True, w=54, h=60):
        """Op-Amp-Dreieck, linke Kante bei x, Mitte y. Gibt (minus, plus, out) zurück."""
        self.path(f'M{x},{y - h / 2} L{x},{y + h / 2} L{x + w},{y} Z')
        self.text(x + w * 0.42, y + 1, '∞', size=17, raw=True)
        top, bot = (y - h / 4, y + h / 4)
        minus, plus = ((x, top), (x, bot)) if not flip else ((x, bot), (x, top))
        self.plain(x + 8, minus[1], '−', size=14); self.plain(x + 8, plus[1], '+', size=14)
        if gnd:
            gx = x + w * 0.45
            self.line((gx, y + h / 2 - h * 0.45 / 2 + 1), (gx, y + h / 2 + 8))
        return minus, plus, (x + w, y)

    def axes(self, x0, y0, w, h, xl='u', yl='i', ox=None, oy=None):
        """Koordinatenkreuz; (ox, oy) = Ursprung, Standard Mitte."""
        ox = x0 + w / 2 if ox is None else ox
        oy = y0 + h / 2 if oy is None else oy
        self.line((x0, oy), (x0 + w, oy), sw=1.1); self.head(x0 + w, oy, 1, 0, size=5)
        self.line((ox, y0 + h), (ox, y0), sw=1.1); self.head(ox, y0, 0, -1, size=5)
        self.text(x0 + w - 2, oy + 16, xl); self.text(ox - 14, y0 + 4, yl)
        self.text(ox - 10, oy + 14, '0', size=15, raw=True)
        return ox, oy

    def save(self, path):
        body = '\n'.join(self.el)
        # Rand ringsum, damit Beschriftungen am Bildrand nicht abgeschnitten werden
        m = 24
        svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{-m} {-m} {self.w + 2 * m} {self.h + 2 * m}" '
               f'width="{self.w + 2 * m}" height="{self.h + 2 * m}">\n{body}\n</svg>\n')
        open(path, 'w', encoding='utf-8').write(svg)
