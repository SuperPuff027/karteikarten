"""Eigene Skizzen für das Lernset Analysis 1 (neu gezeichnet, nicht aus dem Skript).
Aufruf aus dem Projektordner:  python tools/an_schaltbilder.py
"""
import math, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from schaltbild import SVG, INK

OUT = os.path.join(os.path.dirname(__file__), '..', 'schaltbilder')
FIGS = {}


def fig(name, w, h):
    def deco(fn):
        FIGS['an-' + name] = (w, h, fn)
        return fn
    return deco


def axes(s, x0, y0, w, h, ox, oy, xl='x', yl='y'):
    s.line((x0, oy), (x0 + w, oy), sw=1.0); s.head(x0 + w, oy, 1, 0, size=5)
    s.line((ox, y0 + h), (ox, y0), sw=1.0); s.head(ox, y0, 0, -1, size=5)
    s.text(x0 + w - 4, oy + 18, xl, size=16); s.text(ox - 16, y0 + 6, yl, size=16)


@fig('mengenoperationen', 620, 200)
def _(s):
    labels = [r'$A \cap B$', r'$A \cup B$', r'$A \setminus B$']
    for k, lab in enumerate(labels):
        cx = 100 + k * 210; cy = 90; r = 50; d = 32
        a, b = (cx - d, cy), (cx + d, cy)
        # Schraffur über eine clip-freie Näherung: gefüllte Flächen mit Transparenz
        if k == 0:
            s.el.append(f'<path d="M{cx},{cy - 38} A{r},{r} 0 0 1 {cx},{cy + 38} A{r},{r} 0 0 1 {cx},{cy - 38} Z" fill="{INK}" fill-opacity="0.22"/>')
        elif k == 1:
            s.el.append(f'<circle cx="{a[0]}" cy="{cy}" r="{r}" fill="{INK}" fill-opacity="0.22"/>')
            s.el.append(f'<path d="M{cx},{cy - 38} A{r},{r} 0 1 1 {cx},{cy + 38} A{r},{r} 0 0 0 {cx},{cy - 38} Z" fill="{INK}" fill-opacity="0.22"/>')
        else:
            s.el.append(f'<path d="M{cx},{cy - 38} A{r},{r} 0 1 0 {cx},{cy + 38} A{r},{r} 0 0 1 {cx},{cy - 38} Z" fill="{INK}" fill-opacity="0.22"/>')
        s.circle(a[0], cy, r, sw=1.4); s.circle(b[0], cy, r, sw=1.4)
        s.text(a[0] - 30, cy - 52, 'A', size=17); s.text(b[0] + 30, cy - 52, 'B', size=17)
        s.tex(cx, 175, lab, size=18)


@fig('einheitskreis', 360, 340)
def _(s):
    ox, oy, R = 170, 180, 130
    axes(s, 20, 20, 320, 320, ox, oy)
    s.circle(ox, oy, R, sw=1.4)
    x = math.radians(50)
    px, py = ox + R * math.cos(x), oy - R * math.sin(x)
    s.line((ox, oy), (px, py), sw=1.6); s.dot(px, py)
    s.line((px, py), (px, oy), dash=True, sw=1.2)
    s.line((px, py), (ox, py), dash=True, sw=1.2)
    s.path(f'M{ox + 34},{oy} A34,34 0 0 0 {ox + 34 * math.cos(x):.1f},{oy - 34 * math.sin(x):.1f}', sw=1.2)
    s.text(ox + 48, oy - 18, 'x', size=16)
    s.text(px, oy + 20, 'cos x', size=15)
    s.text(ox - 34, py, 'sin x', size=15)
    s.text(px + 34, py - 12, 'P_x', size=16)
    s.text(ox + R + 12, oy + 16, '1', size=15)


@fig('polardarstellung', 360, 300)
def _(s):
    ox, oy = 60, 250
    axes(s, 20, 20, 320, 260, ox, oy, 'Re z', 'Im z')
    phi = math.radians(38); r = 220
    zx, zy = ox + r * math.cos(phi), oy - r * math.sin(phi)
    s.line((ox, oy), (zx, zy), sw=1.8); s.dot(zx, zy)
    s.line((zx, zy), (zx, oy), dash=True, sw=1.2)
    s.line((zx, zy), (ox, zy), dash=True, sw=1.2)
    s.path(f'M{ox + 50},{oy} A50,50 0 0 0 {ox + 50 * math.cos(phi):.1f},{oy - 50 * math.sin(phi):.1f}', sw=1.2)
    s.tex(ox + 70, oy - 18, r'$\varphi$', size=17)
    s.text((ox + zx) / 2 - 12, (oy + zy) / 2 - 14, 'r = |z|', size=16)
    s.text(zx + 8, zy - 16, 'z = x + iy', size=16)
    s.text(zx, oy + 20, 'x', size=16); s.text(ox - 14, zy, 'y', size=16)


@fig('epsilon-umgebung', 560, 220)
def _(s):
    ox, oy = 40, 190
    axes(s, 20, 10, 520, 200, ox, oy, 'n', 'a_n')
    a_y = 100; eps = 34
    s.rect(ox, a_y - eps, 500, 2 * eps, fill='#00000010', sw=0.8)
    s.line((ox, a_y), (540, a_y), dash=True, sw=1.1)
    s.text(ox - 16, a_y, 'a', size=16)
    s.tex(ox - 22, a_y - eps, r'$a{+}\varepsilon$', size=13, anchor='end')
    s.tex(ox - 22, a_y + eps, r'$a{-}\varepsilon$', size=13, anchor='end')
    for n in range(1, 24):
        x = ox + n * 21
        y = a_y + (75 if n % 2 else -70) / n ** 0.8
        s.dot(x, y)
    nx = ox + 8 * 21 + 10
    s.line((nx, 20), (nx, oy), dash=True, sw=1.1)
    s.tex(nx + 6, 24, r'$N_\varepsilon$', size=15, anchor='start')


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    for name, (w, h, fn) in FIGS.items():
        s = SVG(w, h); fn(s); s.save(os.path.join(OUT, name + '.svg'))
    print(len(FIGS), 'Skizzen geschrieben')
