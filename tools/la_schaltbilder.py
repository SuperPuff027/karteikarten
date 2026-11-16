"""Eigene Skizzen für das Lernset Lineare Algebra 1 (neu gezeichnet, nicht aus dem Skript).
Aufruf aus dem Projektordner:  python tools/la_schaltbilder.py
"""
import math, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from schaltbild import SVG

OUT = os.path.join(os.path.dirname(__file__), '..', 'schaltbilder')
FIGS = {}


def fig(name, w, h):
    def deco(fn):
        FIGS['la-' + name] = (w, h, fn)
        return fn
    return deco


def vec(s, x1, y1, x2, y2, label=None, lx=0, ly=0, dash=False):
    if dash:
        s.line((x1, y1), (x2, y2), dash=True, sw=1.3)
    else:
        s.line((x1, y1), (x2, y2), sw=1.8)
        s.head(x2, y2, x2 - x1, y2 - y1, size=6)
    if label:
        s.text((x1 + x2) / 2 + lx, (y1 + y2) / 2 + ly, label, size=19)


def axes(s, ox, oy, w, h):
    s.line((ox - 20, oy), (ox + w, oy), sw=1.0); s.head(ox + w, oy, 1, 0, size=5)
    s.line((ox, oy + 20), (ox, oy - h), sw=1.0); s.head(ox, oy - h, 0, -1, size=5)


@fig('vektoraddition', 420, 300)
def _(s):
    ox, oy = 40, 270
    axes(s, ox, oy, 360, 260)
    v, w = (220, -60), (70, -170)
    vec(s, ox, oy, ox + v[0], oy + v[1], 'v', 0, 18)
    vec(s, ox, oy, ox + w[0], oy + w[1], 'w', -16, 0)
    vec(s, ox + v[0], oy + v[1], ox + v[0] + w[0], oy + v[1] + w[1], dash=True)
    vec(s, ox + w[0], oy + w[1], ox + v[0] + w[0], oy + v[1] + w[1], dash=True)
    vec(s, ox, oy, ox + v[0] + w[0], oy + v[1] + w[1], 'v + w', -8, -18)


@fig('projektion', 440, 280)
def _(s):
    ox, oy = 30, 240
    # Gerade in Richtung w
    d = (1, -0.32); L = math.hypot(*d); d = (d[0] / L, d[1] / L)
    s.line((ox - 10 * d[0], oy - 10 * d[1]), (ox + 400 * d[0], oy + 400 * d[1]), sw=1.0, dash=True)
    w = (150 * d[0], 150 * d[1])
    v = (240, -200)
    t = v[0] * d[0] + v[1] * d[1]
    p = (t * d[0], t * d[1])
    vec(s, ox, oy, ox + v[0], oy + v[1], 'v', -16, -4)
    vec(s, ox, oy, ox + p[0], oy + p[1], None)
    vec(s, ox, oy, ox + w[0], oy + w[1], 'w', 4, 20)
    s.line((ox + p[0], oy + p[1]), (ox + v[0], oy + v[1]), sw=1.3)
    s.text(ox + p[0] + 30, oy + p[1] + 26, 'proj_w(v)', size=17)
    s.text(ox + (p[0] + v[0]) / 2 + 52, oy + (p[1] + v[1]) / 2, 'v − proj_w(v)', size=16)
    # rechter Winkel
    n = (d[1], -d[0])
    a = (ox + p[0] - 12 * d[0], oy + p[1] - 12 * d[1])
    s.line(a, (a[0] - 12 * n[0], a[1] - 12 * n[1]), (ox + p[0] - 12 * n[0], oy + p[1] - 12 * n[1]), sw=1.1)


@fig('zeilenstufenform', 440, 230)
def _(s):
    rows, cols, cw, ch, x0, y0 = 4, 6, 56, 44, 50, 20
    piv = [0, 2, 3, None]
    s.path(f'M{x0 + 6},{y0} Q{x0 - 6},{y0 + rows * ch / 2} {x0 + 6},{y0 + rows * ch}')
    s.path(f'M{x0 + cols * cw - 6},{y0} Q{x0 + cols * cw + 6},{y0 + rows * ch / 2} {x0 + cols * cw - 6},{y0 + rows * ch}')
    for i in range(rows):
        for j in range(cols):
            x, y = x0 + j * cw + cw / 2, y0 + i * ch + ch / 2
            p = piv[i]
            if p is None or j < p: s.text(x, y, '0', size=17)
            elif j == p:
                s.circle(x, y, 15, sw=1.3); s.tex(x, y, r'$\ne 0$', size=13)
            else:
                s.tex(x, y, r'$\ast$', size=18)
    # Treppenlinie
    s.line((x0, y0 + ch), (x0 + 2 * cw, y0 + ch), (x0 + 2 * cw, y0 + 2 * ch), (x0 + 3 * cw, y0 + 2 * ch),
           (x0 + 3 * cw, y0 + 3 * ch), (x0 + cols * cw, y0 + 3 * ch), dash=True, sw=1.2)
    s.text(220, 215, 'Pivot (erster Eintrag ≠ 0) rutscht nach rechts', size=14)


@fig('markov', 460, 330)
def _(s):
    P = {'A': (230, 60), 'B': (90, 250), 'C': (370, 250)}
    r = 30
    for k, (x, y) in P.items():
        s.circle(x, y, r, sw=1.6); s.text(x, y, k, size=20)

    def edge(a, b, lab, bend=26, lpos=0.5):
        (x1, y1), (x2, y2) = P[a], P[b]
        dx, dy = x2 - x1, y2 - y1; L = math.hypot(dx, dy); ux, uy = dx / L, dy / L
        nx, ny = -uy, ux
        sx, sy = x1 + ux * r + nx * 8, y1 + uy * r + ny * 8
        ex, ey = x2 - ux * r + nx * 8, y2 - uy * r + ny * 8
        cx, cy = (sx + ex) / 2 + nx * bend, (sy + ey) / 2 + ny * bend
        s.path(f'M{sx:.1f},{sy:.1f} Q{cx:.1f},{cy:.1f} {ex:.1f},{ey:.1f}', sw=1.3)
        s.head(ex, ey, ex - cx, ey - cy, size=5)
        s.text((sx + ex) / 2 + nx * (bend * 0.5 + 14), (sy + ey) / 2 + ny * (bend * 0.5 + 14), lab, size=14)

    def loop(k, lab, ang):
        x, y = P[k]; a = math.radians(ang)
        cx, cy = x + math.cos(a) * (r + 18), y + math.sin(a) * (r + 18)
        s.circle(cx, cy, 16, sw=1.3)
        s.text(x + math.cos(a) * (r + 52), y + math.sin(a) * (r + 52), lab, size=14)

    edge('A', 'B', '50 %'); edge('B', 'A', '25 %')
    edge('A', 'C', '50 %'); edge('C', 'A', '25 %')
    edge('B', 'C', '25 %'); edge('C', 'B', '25 %')
    loop('B', '50 %', 180); loop('C', '50 %', 0)


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    for name, (w, h, fn) in FIGS.items():
        s = SVG(w, h); fn(s); s.save(os.path.join(OUT, name + '.svg'))
    print(len(FIGS), 'Skizzen geschrieben')
