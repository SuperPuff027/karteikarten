/* Karteikarten – App-Logik
 * Lernsets kommen aus decks.js (window.DECKS) plus eigene Ordner/Karten aus localStorage.
 */
(function () {
  'use strict';

  // ---------- Speicher ----------
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  };

  const COLORS = ['sage', 'rose', 'sky', 'sand', 'lilac', 'mint', 'peach', 'stone'];

  let userFolders = store.get('kk.folders', []);     // [{id, name, color}]
  let ownCards = store.get('kk.cards', {});          // {folderId: [{term, def, more, moreLabel}]}
  let prefs = Object.assign({ reverse: false, shuffle: true, extended: true, smart: true, images: true }, store.get('kk.prefs', {}));
  // Lernstand pro Karte: { s: 'known'|'unsure'|'wrong', lvl: 0..5, t: Zeitstempel }
  let stats = store.get('kk.stats', {});
  // Eigene Änderungen an eingebauten Karten: { editKey: {term, def, more, moreLabel, calc, ex} }
  let edits = store.get('kk.edits', {});

  const state = { view: 'home', folderId: null, newFolder: false, newCard: false, study: null,
    cardIdx: 0, cardSide: 0, cardFlipped: false, editing: false, listScroll: 0 };

  const save = () => { store.set('kk.folders', userFolders); store.set('kk.cards', ownCards); store.set('kk.prefs', prefs); store.set('kk.stats', stats); store.set('kk.edits', edits); };
  const EDIT_FIELDS = ['term', 'use', 'def', 'more', 'moreLabel', 'calc', 'ex'];

  // ---------- Lernstand ----------
  const statKey = (folderId, term, label) => folderId + '|' + term + '|' + (label || '');
  const GRADES = {
    wrong:  { label: 'Nicht gewusst', dot: 'var(--g-wrong)' },
    unsure: { label: 'Unsicher',      dot: 'var(--g-unsure)' },
    known:  { label: 'Gewusst',       dot: 'var(--g-known)' },
  };
  // Wahrscheinlichkeit, dass eine Karte im Durchgang abgefragt wird
  function weight(st) {
    if (!st || st.s === 'wrong') return 1;
    if (st.s === 'unsure') return 0.9;
    return [1, 0.5, 0.3, 0.2, 0.15, 0.1][Math.min(st.lvl, 5)];
  }
  // Reihenfolge: Nicht gewusst → Unsicher → Neu → Gewusst
  const rank = st => !st ? 2 : st.s === 'wrong' ? 0 : st.s === 'unsure' ? 1 : 3;
  function grade(key, g) {
    const prev = stats[key] || { lvl: 0 };
    const lvl = g === 'known' ? Math.min(prev.lvl + 1, 5) : g === 'unsure' ? Math.max(prev.lvl - 1, 0) : 0;
    stats[key] = { s: g, lvl, t: Date.now() };
    save();
  }
  // Lernstand-Schlüssel: Kapitel teilen sich den Lernstand mit ihrem Hauptordner
  const sid = f => f.statId || f.id;

  // Alle Lernkarten eines Ordners (Definition, Vertiefung, Berechnung, Schaltbild); all = Optionen ignorieren
  // Lernkarten, die aus einer Karte entstehen (Definition, Vertiefung, Berechnung, Schaltbild)
  function itemsOf(c, all) {
    const out = [];
    if (c.img) {
      if (all || prefs.images) out.push({ term: c.term, img: c.img, text: c.def || '', label: 'Schaltbild' });
      return out;
    }
    if (c.def) out.push({ term: c.term, text: c.def, ex: c.ex, label: null });
    if (c.more && (all || prefs.extended)) out.push({ term: c.term, text: c.more, label: c.moreLabel || 'Methode' });
    // Rechenweg-Karte: Vorderseite „Begriff: Berechnung“, Rückseite die Schritte
    if (c.calc) out.push({ term: c.term, text: c.calc, ex: c.calcEx, label: 'Berechnung' });
    return out;
  }
  function studyItems(f, all) {
    const id = sid(f), out = [];
    for (const c of cardsOf(f)) out.push(...itemsOf(c, all));
    out.forEach((it, i) => { it.key = statKey(id, it.term, it.label); it.pos = i; });
    return out;
  }
  // Lernstand mitnehmen, wenn Begriff oder Bezeichnung der Vertiefung geändert werden
  function moveStats(id, a, b) {
    const pairs = [[null, null], ['Berechnung', 'Berechnung'], ['Schaltbild', 'Schaltbild'], [a.moreLabel || 'Methode', b.moreLabel || 'Methode']];
    for (const [la, lb] of pairs) {
      const ok = statKey(id, a.term, la), nk = statKey(id, b.term, lb);
      if (ok !== nk && stats[ok] && !stats[nk]) { stats[nk] = stats[ok]; delete stats[ok]; }
    }
  }
  const statItems = f => studyItems(f).map(it => it.key);
  function summary(f) {
    const r = { wrong: 0, unsure: 0, known: 0, neu: 0 };
    for (const k of statItems(f)) { const st = stats[k]; st ? r[st.s]++ : r.neu++; }
    return r;
  }

  // ---------- Daten ----------
  // Lernset aus decks.js: Einträge { chapter: '…' } teilen die Karten in Kapitel-Unterordner
  function parseDeck(d, i) {
    const id = d.id || 'deck-' + i, color = d.color || COLORS[i % COLORS.length];
    const cards = [], chapters = [], seen = {};
    for (const orig of d.cards || []) {
      if (orig.chapter) { chapters.push({ name: orig.chapter, cards: [] }); continue; }
      // Schlüssel für eigene Änderungen: Lernset + ursprünglicher Begriff (+ Nummer bei gleichen Begriffen)
      const base = id + '|' + orig.term + '|' + (orig.img ? 'img' : '');
      const editKey = base + '|' + (seen[base] = (seen[base] || 0) + 1);
      const c = Object.assign({}, orig, edits[editKey] || {}, { orig, editKey, edited: !!edits[editKey] });
      cards.push(c);
      if (chapters.length) chapters[chapters.length - 1].cards.push(c);
    }
    return {
      id, name: d.name, color, cards, builtin: true, description: d.description || '',
      chapters: chapters.map((ch, k) => ({
        id: id + '::' + k, name: ch.name, color, cards: ch.cards, builtin: true,
        parentId: id, statId: id, isChapter: true,
      })),
    };
  }
  function folders() {
    const builtin = (window.DECKS || []).map(parseDeck);
    return builtin.concat(userFolders.map(f => Object.assign({ cards: [], builtin: false, chapters: [] }, f)));
  }
  function folderById(id) {
    for (const f of folders()) {
      if (f.id === id) return f;
      const ch = f.chapters.find(c => c.id === id);
      if (ch) return ch;
    }
    return null;
  }
  function cardsOf(f) {
    const own = f.isChapter ? [] : (ownCards[f.id] || []);
    return f.cards.map(c => Object.assign({}, c, { own: false }))
      .concat(own.map((c, i) => Object.assign({}, c, { own: true, ownIndex: i })));
  }
  function countText(f) {
    const cs = cardsOf(f);
    const terms = cs.filter(c => !c.img && c.def).length, more = cs.filter(c => c.more).length, imgs = cs.filter(c => c.img).length;
    const calcs = cs.filter(c => c.calc).length;
    const parts = [terms + (terms === 1 ? ' Begriff' : ' Begriffe')];
    if (more) parts.push(more + ' Vertiefung' + (more === 1 ? '' : 'en'));
    if (calcs) parts.push(calcs + ' Berechnung' + (calcs === 1 ? '' : 'en'));
    if (imgs) parts.push(imgs + ' Schaltbild' + (imgs === 1 ? '' : 'er'));
    if (f.chapters && f.chapters.length) parts.push(f.chapters.length + ' Kapitel');
    return parts.join(' · ');
  }

  // ---------- Hilfen ----------
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const uid = () => 'f' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

  // Inline-Formatierung: `code`, $Formel$, $$Formel$$ (LaTeX via KaTeX), **fett**
  function fmt(s) {
    const keep = [];
    const hold = html => '\u0000' + (keep.push(html) - 1) + '\u0000';
    let t = String(s == null ? '' : s)
      .replace(/`([^`]+)`/g, (m, c) => hold('<code>' + esc(c) + '</code>'))
      .replace(/\$\$([^$]+?)\$\$|\$([^$\n]+?)\$/g, (m, d, i) => hold(tex(d != null ? d : i, d != null)));
    t = esc(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    return t.replace(/\u0000(\d+)\u0000/g, (m, n) => keep[+n]);
  }
  function tex(src, display) {
    if (window.katex) {
      try { return katex.renderToString(src, { displayMode: display, throwOnError: false, output: 'html' }); } catch (e) {}
    }
    return '<code>' + esc(src) + '</code>'; // Fallback, falls KaTeX nicht geladen ist
  }

  // Minimal-Formatierung: Absätze, "- " Listen, **fett**
  function rich(text) {
    const inline = fmt;
    const blocks = String(text || '').trim().split(/\n\s*\n/);
    const isItem = l => /^\s*[-•]\s+/.test(l);
    return blocks.map(b => {
      // aufeinanderfolgende "- "-Zeilen werden zu einer Liste, der Rest zu Absätzen
      let html = '', para = [], list = [];
      const flushP = () => { if (para.length) html += '<p>' + para.map(inline).join('<br>') + '</p>'; para = []; };
      const flushL = () => { if (list.length) html += '<ul>' + list.map(l => '<li>' + inline(l.replace(/^\s*[-•]\s+/, '')) + '</li>').join('') + '</ul>'; list = []; };
      for (const l of b.split('\n')) {
        if (isItem(l)) { flushP(); list.push(l); } else { flushL(); para.push(l); }
      }
      flushP(); flushL();
      return html;
    }).join('');
  }
  const lengthClass = t => { const n = String(t || '').length; return n > 420 ? 'xlong' : n > 160 ? 'long' : ''; };

  const icon = {
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>',
    chev: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><path d="M9 6l6 6-6 6"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
    pencil: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9a2.1 2.1 0 0 0-4-4L4 16v4z"/><path d="M13.5 6.5l4 4"/></svg>',
  };

  // ---------- Theme ----------
  function currentTheme() {
    const t = document.documentElement.getAttribute('data-theme');
    if (t) return t;
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function toggleTheme() {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    store.set('kk.theme', next);
    updateMetaColor();
    render();
  }
  function updateMetaColor() {
    const m = document.querySelector('meta[name="theme-color"]');
    if (m) m.content = getComputedStyle(document.body).backgroundColor;
  }

  // ---------- Ansichten ----------
  const app = document.getElementById('app');

  function render() {
    document.body.classList.toggle('studying', state.view === 'study' || (state.view === 'card' && !state.editing));
    if (state.view === 'home') app.innerHTML = viewHome();
    else if (state.view === 'folder') app.innerHTML = viewFolder();
    else if (state.view === 'study') app.innerHTML = viewStudy();
    else if (state.view === 'card') app.innerHTML = viewCard();
    const auto = app.querySelector('[autofocus]');
    if (auto) auto.focus();
    fitCards();
  }

  // Lange Texte verkleinern, bis sie auf die Karte passen (Scrollen nur als letzter Ausweg)
  function fitCards() {
    app.querySelectorAll('.face .content').forEach(c => {
      const t = c.firstElementChild; if (!t || t.classList.contains('figure')) return;
      // verfügbarer Platz = Karte minus Innenabstand (nicht die Höhe des Textfelds selbst,
      // sonst würden Formeln mit Brüchen, die etwas über die Zeile ragen, unnötig verkleinert)
      const face = c.parentElement, fs = getComputedStyle(face);
      const avail = face.clientHeight - parseFloat(fs.paddingTop) - parseFloat(fs.paddingBottom);
      t.style.fontSize = '';
      c.style.overflowY = 'visible';
      let size = parseFloat(getComputedStyle(t).fontSize);
      while (t.scrollHeight > avail && size > 11) {
        size -= 0.5; t.style.fontSize = size + 'px';
      }
      c.style.overflowY = t.scrollHeight > avail ? 'auto' : 'visible';
    });
  }
  let resizeTimer;
  addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(fitCards, 100); });

  function themeBtn() {
    return `<button class="icon-btn" data-action="theme" aria-label="Hell/Dunkel">${currentTheme() === 'dark' ? icon.sun : icon.moon}</button>`;
  }

  function folderRow(f) {
    return `<button class="row" data-action="open" data-id="${esc(f.id)}">
      <span class="dot" style="background:var(--d-${f.color})"></span>
      <span class="grow"><div class="title">${esc(f.name)}</div><div class="sub">${countText(f)}</div></span>
      <span class="chev">${icon.chev}</span>
    </button>`;
  }

  function viewHome() {
    const all = folders();
    const builtin = all.filter(f => f.builtin), mine = all.filter(f => !f.builtin);
    return `<div class="menu">
      <div class="topbar"><h1>Karteikarten</h1>${themeBtn()}</div>

      <div class="section-label">Lernsets aus Skripten</div>
      <div class="list">${builtin.length ? builtin.map(folderRow).join('') : '<div class="empty">Noch keine Skripte eingespielt.</div>'}</div>

      <div class="section-label">Eigene Ordner</div>
      <div class="list">${mine.length ? mine.map(folderRow).join('') : '<div class="empty">Noch keine eigenen Ordner.</div>'}</div>

      <div style="margin-top:14px">${state.newFolder ? newFolderForm() : '<button class="btn block" data-action="new-folder">+ Neuer Ordner</button>'}</div>

      ${installBlock()}
    </div>`;
  }

  // ---------- Installation auf dem Home-Bildschirm ----------
  let installPrompt = null;
  const isStandalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = () => /android/i.test(navigator.userAgent);

  addEventListener('beforeinstallprompt', e => { e.preventDefault(); installPrompt = e; if (state.view === 'home') render(); });
  addEventListener('appinstalled', () => { installPrompt = null; state.installHelp = false; if (state.view === 'home') render(); });

  function installBlock() {
    if (isStandalone()) return '';
    let help = '';
    if (state.installHelp) {
      const steps = isIOS()
        ? ['In <strong>Safari</strong> öffnen (ab iOS 16.4 geht auch Chrome).', 'Auf das <strong>Teilen-Symbol</strong> tippen (Quadrat mit Pfeil nach oben).', '<strong>„Zum Home-Bildschirm“</strong> wählen, dann <strong>„Hinzufügen“</strong>.']
        : isAndroid()
          ? ['Oben rechts das <strong>Browser-Menü (⋮)</strong> öffnen.', '<strong>„App installieren“</strong> bzw. <strong>„Zum Startbildschirm hinzufügen“</strong> wählen.', 'Mit <strong>„Installieren“</strong> bestätigen.']
          : ['In Chrome oder Edge in der Adressleiste auf das <strong>Installieren-Symbol</strong> klicken.', 'Oder im Browser-Menü <strong>„App installieren“</strong> wählen.', 'Am Handy: Link öffnen und dort zum Home-Bildschirm hinzufügen.'];
      help = `<div class="form install-help">
        <ol>${steps.map(s => `<li>${s}</li>`).join('')}</ol>
        <div class="actions"><button class="btn ghost" data-action="install-close">Schließen</button></div>
      </div>`;
    }
    return `<div class="section-label">App</div>
      ${help || '<button class="btn block" data-action="install">Auf Home-Bildschirm installieren</button>'}`;
  }

  async function install() {
    if (installPrompt) {
      installPrompt.prompt();
      try { await installPrompt.userChoice; } catch (e) {}
      installPrompt = null; render();
    } else {
      state.installHelp = true; render();
    }
  }

  function newFolderForm() {
    const sel = state.newFolderColor || COLORS[userFolders.length % COLORS.length];
    return `<form class="form" data-form="folder">
      <label>Name<input name="name" placeholder="z. B. Biologie" autofocus required maxlength="60"></label>
      <label>Farbe<div class="swatches">${COLORS.map(c => `<button type="button" class="swatch ${c === sel ? 'on' : ''}" data-action="pick-color" data-color="${c}" style="background:var(--c-${c})" aria-label="${c}"></button>`).join('')}</div></label>
      <div class="actions"><button type="button" class="btn ghost" data-action="cancel-folder">Abbrechen</button><button class="btn primary">Erstellen</button></div>
    </form>`;
  }

  function viewFolder() {
    const f = folderById(state.folderId);
    if (!f) { state.view = 'home'; return viewHome(); }
    const cs = cardsOf(f);
    const total = studyItems(f).length;
    const hasChapters = f.chapters && f.chapters.length;
    const hasImages = cs.some(c => c.img);
    const parent = f.parentId ? folderById(f.parentId) : null;
    const chapterRow = ch => `<button class="row" data-action="open" data-id="${esc(ch.id)}">
        <span class="grow"><div class="title">${esc(ch.name)}</div><div class="sub">${countText(ch)}</div></span>
        <span class="chev">${icon.chev}</span>
      </button>`;
    return `<div class="menu">
      <div class="topbar">
        <div class="left"><button class="icon-btn" data-action="up" aria-label="Zurück">${icon.back}</button>
        <h1>${esc(f.name)}</h1></div>${themeBtn()}
      </div>
      ${parent ? `<p class="muted" style="margin:-14px 4px 0">Kapitel aus ${esc(parent.name)}</p>` : ''}
      ${f.description ? `<p class="muted" style="margin:-14px 4px 0">${esc(f.description)}</p>` : ''}

      <div class="section-label">Richtung</div>
      <div class="segment">
        <button class="${!prefs.reverse ? 'on' : ''}" data-action="pref" data-key="reverse" data-val="0">Begriff → Erklärung</button>
        <button class="${prefs.reverse ? 'on' : ''}" data-action="pref" data-key="reverse" data-val="1">Erklärung → Begriff</button>
      </div>

      <div class="section-label">Optionen</div>
      <div class="stack">
        <div class="segment">
          <button class="${prefs.shuffle ? 'on' : ''}" data-action="pref" data-key="shuffle" data-val="1">Gemischt</button>
          <button class="${!prefs.shuffle ? 'on' : ''}" data-action="pref" data-key="shuffle" data-val="0">Reihenfolge</button>
        </div>
        <div class="segment">
          <button class="${prefs.extended ? 'on' : ''}" data-action="pref" data-key="extended" data-val="1">Mit Vertiefungskarten</button>
          <button class="${!prefs.extended ? 'on' : ''}" data-action="pref" data-key="extended" data-val="0">Nur Definitionen</button>
        </div>
        <div class="segment">
          <button class="${prefs.smart ? 'on' : ''}" data-action="pref" data-key="smart" data-val="1">Schwache bevorzugen</button>
          <button class="${!prefs.smart ? 'on' : ''}" data-action="pref" data-key="smart" data-val="0">Alle Karten</button>
        </div>
        ${hasImages ? `<div class="segment">
          <button class="${prefs.images ? 'on' : ''}" data-action="pref" data-key="images" data-val="1">Mit Schaltbildern</button>
          <button class="${!prefs.images ? 'on' : ''}" data-action="pref" data-key="images" data-val="0">Ohne Schaltbilder</button>
        </div>` : ''}
      </div>

      ${total ? statsBlock(f) : ''}

      <div style="margin-top:22px"><button class="btn primary block" data-action="study" ${total ? '' : 'disabled'}>${hasChapters ? 'Alle Kapitel zusammen lernen' : 'Lernen'}</button></div>

      ${hasChapters ? `<div class="section-label">Kapitel</div>
      <div class="list">${f.chapters.map(chapterRow).join('')}</div>` : `
      <div class="section-label">Karten</div>
      <div class="list">${cs.length ? cs.map((c, i) => `<div class="row card-preview" data-action="view-card" data-idx="${i}" role="button" tabindex="0">
          <span class="dot" style="background:${dotFor(stats[statKey(sid(f), c.term, c.img ? 'Schaltbild' : null)])}"></span>
          <span class="grow"><div class="title">${fmt(c.term)}${c.img ? '<span class="tag">Schaltbild</span>' : ''}${c.more ? `<span class="tag">+ ${esc(c.moreLabel || 'Methode')}</span>` : ''}${c.calc ? '<span class="tag">+ Berechnung</span>' : ''}${c.own ? '<span class="tag">eigene</span>' : ''}${c.edited ? '<span class="tag">bearbeitet</span>' : ''}</div>
          ${c.use ? `<div class="use">→ ${fmt(c.use)}</div>` : ''}
          <div class="sub">${fmt(String(c.def || c.calc || '').replace(/\n+- /g, ' · ').replace(/\n+/g, ' ').replace(/^- /, ''))}</div></span>
          ${c.own ? `<button class="del" data-action="del-card" data-i="${c.ownIndex}" aria-label="Karte löschen">×</button>` : `<span class="chev">${icon.chev}</span>`}
        </div>`).join('') : '<div class="empty">Dieser Ordner ist noch leer.</div>'}</div>`}

      ${f.isChapter || hasChapters ? '' : `<div style="margin-top:14px">${state.newCard ? newCardForm() : '<button class="btn block" data-action="new-card">+ Karte hinzufügen</button>'}</div>`}

      ${!f.builtin ? '<div style="margin-top:30px;text-align:center"><button class="btn ghost danger" data-action="del-folder">Ordner löschen</button></div>' : ''}
    </div>`;
  }

  const dotFor = st => st ? GRADES[st.s].dot : 'transparent';

  function statsBlock(f) {
    const r = summary(f);
    const n = r.wrong + r.unsure + r.known + r.neu;
    const seg = (k, color) => r[k] ? `<i style="flex:${r[k]};background:${color}"></i>` : '';
    const item = (k, label, color) => `<span><span class="dot" style="background:${color}"></span>${r[k]} ${label}</span>`;
    return `<div class="section-label">Lernstand</div>
      <div class="list" style="padding:14px 16px">
        <div class="statbar">${seg('known', 'var(--g-known)')}${seg('unsure', 'var(--g-unsure)')}${seg('wrong', 'var(--g-wrong)')}${seg('neu', 'transparent')}</div>
        <div class="statlegend">
          ${item('known', 'gewusst', 'var(--g-known)')}${item('unsure', 'unsicher', 'var(--g-unsure)')}
          ${item('wrong', 'nicht gewusst', 'var(--g-wrong)')}${item('neu', 'neu', 'transparent')}
        </div>
        ${r.neu < n ? '<button class="linkbtn" data-action="reset-stats">Lernstand zurücksetzen</button>' : ''}
      </div>`;
  }

  function newCardForm() {
    return `<form class="form" data-form="card">
      <label>Begriff<input name="term" autofocus required></label>
      <label>Definition / kurze Erklärung<textarea name="def" rows="3" required></textarea></label>
      <label>Vertiefung (optional – erzeugt eine zweite Karte)<textarea name="more" rows="4"></textarea></label>
      <label>Bezeichnung der Vertiefung<input name="moreLabel" placeholder="Methode"></label>
      <div class="actions"><button type="button" class="btn ghost" data-action="cancel-card">Abbrechen</button><button class="btn primary">Speichern</button></div>
    </form>`;
  }

  // ---------- Lernen ----------
  function buildQueue(f) {
    let items = studyItems(f);

    if (prefs.smart) {
      // Gewusste Karten werden seltener gezogen, Unsichere/Nicht gewusste immer bzw. fast immer
      const picked = items.filter(it => Math.random() < weight(stats[it.key]));
      const min = Math.min(items.length, 5);
      if (picked.length < min) {
        const rest = items.filter(it => !picked.includes(it))
          .sort((a, b) => (stats[a.key] ? stats[a.key].lvl : 0) - (stats[b.key] ? stats[b.key].lvl : 0) || (stats[a.key] ? stats[a.key].t : 0) - (stats[b.key] ? stats[b.key].t : 0));
        picked.push(...rest.slice(0, min - picked.length));
      }
      items = picked;
    }
    if (prefs.shuffle) {
      for (let i = items.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [items[i], items[j]] = [items[j], items[i]]; }
    }
    // Schwache Karten zuerst (innerhalb der Gruppen bleibt gemischt bzw. Reihenfolge)
    if (prefs.smart) items.sort((a, b) => rank(stats[a.key]) - rank(stats[b.key]) || (prefs.shuffle ? 0 : a.pos - b.pos));
    return items;
  }

  function startStudy() {
    const f = folderById(state.folderId);
    const queue = buildQueue(f);
    state.study = { folder: f, queue, total: queue.length, flipped: false, again: 0, first: {}, count: { known: 0, unsure: 0, wrong: 0 } };
    state.view = 'study';
    render();
  }

  const answerButtons = () =>
    `<button class="btn grade" data-action="grade" data-g="wrong"><span class="dot" style="background:${GRADES.wrong.dot}"></span>Nicht gewusst</button>
     <button class="btn grade" data-action="grade" data-g="unsure"><span class="dot" style="background:${GRADES.unsure.dot}"></span>Unsicher</button>
     <button class="btn grade" data-action="grade" data-g="known"><span class="dot" style="background:${GRADES.known.dot}"></span>Gewusst</button>`;
  const flipButton = () => '<button class="btn ghost" data-action="flip">Umdrehen</button>';

  function face(side, item, color, reverse = prefs.reverse) {
    // side: 'front' | 'back'; Inhalt hängt von der Richtung ab
    const showTerm = (side === 'front') !== reverse;
    let inner;
    // kurzes Codebeispiel: immer auf der Rückseite (im umgekehrten Modus also beim Begriff)
    const ex = side === 'back' && item.ex ? `<pre class="ex"><code>${esc(item.ex)}</code></pre>` : '';
    if (showTerm) {
      inner = `<div class="term">${fmt(item.term)}${item.label ? `<span style="font-weight:400;opacity:.55">: ${esc(item.label)}</span>` : ''}</div>`;
      if (ex) inner = `<div class="text">${inner}${ex}</div>`;
    } else if (item.img) {
      inner = `<div class="figure"><img src="${esc(item.img)}" alt="${esc(item.term)}">${item.text ? `<div class="cap">${fmt(item.text)}</div>` : ''}</div>`;
    } else {
      inner = `<div class="text ${lengthClass(item.text)}">${rich(item.text)}${ex}</div>`;
    }
    const corner = showTerm ? (item.label ? 'Begriff · ' + esc(item.label) : 'Begriff') : (item.label ? esc(item.label) : 'Definition');
    return `<div class="face ${side}" style="background:var(--c-${color})">
      <span class="corner">${corner}</span>
      <div class="content">${inner}</div>
      ${side === 'front' ? '<span class="hint">Tippen zum Umdrehen</span>' : ''}
    </div>`;
  }

  function viewStudy() {
    const s = state.study;
    const done = s.total - s.queue.length;
    const bar = `<div class="study-bar">
      <button class="icon-btn" data-action="exit-study" aria-label="Beenden">${icon.close}</button>
      <div class="info">${esc(s.folder.name)} · ${prefs.reverse ? 'Erklärung → Begriff' : 'Begriff → Erklärung'}</div>
      <div class="progress"><i style="width:${s.total ? (done / s.total * 100) : 0}%"></i></div>
      <div class="muted" style="font-size:13px;min-width:52px;text-align:right">${done} / ${s.total}</div>
      ${themeBtn()}
    </div>`;

    if (!s.queue.length) {
      return `<div class="study">${bar}<div class="stage"><div class="done">
        <h2>Geschafft.</h2>
        <div class="muted">${s.total} Karten · ${s.count.known} gewusst · ${s.count.unsure} unsicher · ${s.count.wrong} nicht gewusst</div>
        <div style="display:flex;gap:10px"><button class="btn" data-action="exit-study">Zum Ordner</button><button class="btn primary" data-action="study">Nochmal lernen</button></div>
      </div></div><div class="study-controls"></div></div>`;
    }

    const item = s.queue[0];
    const color = s.folder.color;
    return `<div class="study">${bar}
      <div class="stage">
        <div class="card ${s.flipped ? 'flipped' : ''}" data-action="flip" role="button" aria-label="Karte umdrehen">
          <div class="inner">${face('front', item, color)}${face('back', item, color)}</div>
        </div>
      </div>
      <div class="study-controls">${s.flipped ? answerButtons() : flipButton()}</div>
    </div>`;
  }

  // ---------- Einzelne Karte ansehen und bearbeiten ----------
  function currentCard() {
    const f = folderById(state.folderId);
    if (!f) return {};
    const cs = cardsOf(f);
    return { f, cs, c: cs[state.cardIdx] };
  }
  const sideName = it => it.label || 'Definition';

  function viewCard() {
    const { f, cs, c } = currentCard();
    if (!c) { state.view = f ? 'folder' : 'home'; state.editing = false; return f ? viewFolder() : viewHome(); }
    if (state.editing) return viewEdit(f, c);
    const items = itemsOf(c, true);
    if (!items.length) items.push({ term: c.term, text: '', label: null });
    const k = Math.min(state.cardSide, items.length - 1), item = items[k];
    const i = state.cardIdx;
    const sides = items.length > 1
      ? `<div class="segment">${items.map((it, j) => `<button class="${j === k ? 'on' : ''}" data-action="card-side" data-k="${j}">${esc(sideName(it))}</button>`).join('')}</div>`
      : '<button class="btn ghost" data-action="pv-flip">Umdrehen</button>';
    return `<div class="study">
      <div class="study-bar">
        <button class="icon-btn" data-action="card-back" aria-label="Zurück">${icon.back}</button>
        <div class="info">${esc(f.name)} · Karte ${i + 1} von ${cs.length}${c.edited ? ' · bearbeitet' : ''}</div>
        <button class="icon-btn" data-action="edit-card" aria-label="Karte bearbeiten">${icon.pencil}</button>
      </div>
      <div class="stage">
        <div class="card ${state.cardFlipped ? 'flipped' : ''}" data-action="pv-flip" role="button" aria-label="Karte umdrehen">
          <div class="inner">${face('front', item, f.color, false)}${face('back', item, f.color, false)}</div>
        </div>
      </div>
      <div class="study-controls card-controls">
        <button class="icon-btn" data-action="card-nav" data-d="-1" aria-label="Vorherige Karte" ${i === 0 ? 'disabled' : ''}>${icon.back}</button>
        <div class="sides">${sides}</div>
        <button class="icon-btn" data-action="card-nav" data-d="1" aria-label="Nächste Karte" ${i >= cs.length - 1 ? 'disabled' : ''}>${icon.next}</button>
      </div>
    </div>`;
  }

  function viewEdit(f, c) {
    const rows = v => Math.min(14, Math.max(3, String(v || '').split('\n').length + 1));
    const area = (name, label, v) => `<label>${label}<textarea name="${name}" rows="${rows(v)}">${esc(v || '')}</textarea></label>`;
    const fields = c.img
      ? `<label>Begriff<input name="term" value="${esc(c.term)}" required></label>
         ${area('def', 'Bildunterschrift', c.def)}`
      : `<label>Begriff (Vorderseite)<input name="term" value="${esc(c.term)}" required></label>
         <label>Wofür? (steht in der Kartenliste unter dem Begriff, optional)<input name="use" value="${esc(c.use || '')}" placeholder="z. B. Divergenz zeigen"></label>
         ${area('def', 'Definition / Erklärung (Rückseite)', c.def)}
         ${area('more', 'Vertiefung (optional – eigene Karte)', c.more)}
         <label>Bezeichnung der Vertiefung<input name="moreLabel" value="${esc(c.moreLabel || '')}" placeholder="Methode"></label>
         ${area('calc', 'Berechnung / Rechenweg (optional – eigene Karte)', c.calc)}
         ${area('ex', 'Codebeispiel (optional)', c.ex)}`;
    return `<div class="menu">
      <div class="topbar">
        <div class="left"><button class="icon-btn" data-action="cancel-edit" aria-label="Zurück">${icon.back}</button>
        <h1>Karte bearbeiten</h1></div>
      </div>
      <form class="form" data-form="edit">
        ${fields}
        <p class="muted form-hint">Formeln mit $…$, Listen mit „- “ am Zeilenanfang, **fett**.${c.own ? '' : ' Änderungen an Karten aus Skripten werden nur auf diesem Gerät gespeichert.'}</p>
        <div class="actions"><button type="button" class="btn ghost" data-action="cancel-edit">Abbrechen</button><button class="btn primary">Speichern</button></div>
      </form>
      ${c.edited ? '<div style="margin-top:14px;text-align:center"><button class="btn ghost" data-action="restore-card">Original wiederherstellen</button></div>' : ''}
      ${c.own ? '<div style="margin-top:14px;text-align:center"><button class="btn ghost danger" data-action="del-own-card">Karte löschen</button></div>' : ''}
    </div>`;
  }

  function saveEdit(data) {
    const { f, c } = currentCard(); if (!c) return;
    const upd = {};
    for (const k of EDIT_FIELDS) if (k in data) upd[k] = String(data[k]).replace(/\r\n/g, '\n').trim();
    if (!upd.term || (!c.img && !upd.def)) { alert(c.img ? 'Bitte einen Begriff eingeben.' : 'Begriff und Definition dürfen nicht leer sein.'); return; }
    if (c.own) {
      const list = ownCards[f.id] || [], card = Object.assign({}, list[c.ownIndex]);
      for (const k in upd) { if (upd[k]) card[k] = upd[k]; else delete card[k]; }
      list[c.ownIndex] = card; ownCards[f.id] = list;
    } else {
      // nur speichern, was sich vom Original unterscheidet; ohne Unterschied wird die Änderung entfernt
      const same = Object.keys(upd).every(k => upd[k] === String(c.orig[k] || '').trim());
      if (same) delete edits[c.editKey]; else edits[c.editKey] = upd;
    }
    moveStats(sid(f), c, upd);
    state.editing = false; save(); render();
  }

  function cardNav(d) {
    const { cs } = currentCard(); if (!cs) return;
    const i = state.cardIdx + d;
    if (i < 0 || i >= cs.length) return;
    state.cardIdx = i; state.cardSide = 0; state.cardFlipped = false; render();
  }
  function pvFlip() {
    state.cardFlipped = !state.cardFlipped;
    const card = app.querySelector('.card');
    if (card) card.classList.toggle('flipped', state.cardFlipped);
  }
  function backToFolder() {
    state.view = 'folder'; state.editing = false; render();
    scrollTo(0, state.listScroll || 0);
  }

  function flip() {
    const s = state.study; if (!s || !s.queue.length) return;
    s.flipped = !s.flipped;
    const card = app.querySelector('.card');
    if (card) card.classList.toggle('flipped', s.flipped);
    const ctr = app.querySelector('.study-controls');
    if (ctr) ctr.innerHTML = s.flipped ? answerButtons() : flipButton();
  }

  function answer(g) {
    const s = state.study; if (!s || !s.queue.length || !s.flipped) return;
    const item = s.queue.shift();
    // Für den Lernstand zählt die erste Antwort im Durchgang
    if (!s.first[item.key]) { s.first[item.key] = g; s.count[g]++; grade(item.key, g); }
    if (g !== 'known') {
      // Nicht gewusst kommt bald wieder, Unsicher etwas später
      s.again++;
      const pos = g === 'wrong' ? 2 + Math.floor(Math.random() * 3) : 5 + Math.floor(Math.random() * 4);
      s.queue.splice(Math.min(s.queue.length, pos), 0, item);
    }
    s.flipped = false;
    render(); // neue Karte startet ohne Animation auf der Vorderseite
  }

  // ---------- Ereignisse ----------
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const a = el.dataset.action;
    switch (a) {
      case 'theme': toggleTheme(); break;
      case 'install': install(); break;
      case 'install-close': state.installHelp = false; render(); break;
      case 'open': state.folderId = el.dataset.id; state.view = 'folder'; state.newCard = false; render(); scrollTo(0, 0); break;
      case 'home': state.view = 'home'; render(); break;
      case 'up': {
        const f = folderById(state.folderId);
        if (f && f.parentId) { state.folderId = f.parentId; state.view = 'folder'; }
        else state.view = 'home';
        render(); scrollTo(0, 0);
        break;
      }
      case 'new-folder': state.newFolder = true; state.newFolderColor = null; render(); break;
      case 'cancel-folder': state.newFolder = false; render(); break;
      case 'pick-color':
        state.newFolderColor = el.dataset.color;
        app.querySelectorAll('.swatch').forEach(s => s.classList.toggle('on', s === el));
        break;
      case 'new-card': state.newCard = true; render(); break;
      case 'cancel-card': state.newCard = false; render(); break;
      case 'pref': prefs[el.dataset.key] = el.dataset.val === '1'; save(); render(); break;
      case 'study': startStudy(); break;
      case 'exit-study': state.view = state.folderId ? 'folder' : 'home'; state.study = null; render(); break;
      case 'flip': flip(); break;
      case 'grade': answer(el.dataset.g); break;
      case 'view-card':
        state.listScroll = scrollY;
        state.cardIdx = +el.dataset.idx; state.cardSide = 0; state.cardFlipped = false; state.editing = false;
        state.view = 'card'; render(); scrollTo(0, 0);
        break;
      case 'card-back': backToFolder(); break;
      case 'card-nav': cardNav(+el.dataset.d); break;
      case 'card-side': state.cardSide = +el.dataset.k; state.cardFlipped = false; render(); break;
      case 'pv-flip': pvFlip(); break;
      case 'edit-card': state.editing = true; render(); scrollTo(0, 0); break;
      case 'cancel-edit': state.editing = false; render(); break;
      case 'restore-card': {
        const { f, c } = currentCard();
        if (c && !c.own && confirm('Eigene Änderungen an dieser Karte verwerfen?')) {
          delete edits[c.editKey];
          moveStats(sid(f), c, c.orig);
          state.editing = false; save(); render();
        }
        break;
      }
      case 'del-own-card': {
        const { f, c } = currentCard();
        if (c && c.own && confirm('Diese Karte löschen?')) {
          ownCards[f.id].splice(c.ownIndex, 1); save();
          backToFolder();
        }
        break;
      }
      case 'reset-stats': {
        const f = folderById(state.folderId);
        if (f && confirm(`Lernstand für „${f.name}“ zurücksetzen?`)) {
          for (const it of studyItems(f, true)) delete stats[it.key];
          save(); render();
        }
        break;
      }
      case 'del-card': {
        const list = ownCards[state.folderId] || [];
        if (confirm('Diese Karte löschen?')) { list.splice(+el.dataset.i, 1); ownCards[state.folderId] = list; save(); render(); }
        break;
      }
      case 'del-folder': {
        const f = folderById(state.folderId);
        if (f && confirm(`Ordner „${f.name}“ mit allen Karten löschen?`)) {
          userFolders = userFolders.filter(x => x.id !== f.id);
          delete ownCards[f.id]; save();
          state.view = 'home'; state.folderId = null; render();
        }
        break;
      }
    }
  });

  document.addEventListener('submit', e => {
    const form = e.target; e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    if (form.dataset.form === 'folder') {
      const name = (data.name || '').trim(); if (!name) return;
      const color = state.newFolderColor || COLORS[userFolders.length % COLORS.length];
      userFolders.push({ id: uid(), name, color });
      state.newFolder = false; save(); render();
    } else if (form.dataset.form === 'card') {
      const term = (data.term || '').trim(), def = (data.def || '').trim();
      if (!term || !def) return;
      const card = { term, def };
      if ((data.more || '').trim()) { card.more = data.more.trim(); if ((data.moreLabel || '').trim()) card.moreLabel = data.moreLabel.trim(); }
      (ownCards[state.folderId] = ownCards[state.folderId] || []).push(card);
      save(); render(); // Formular bleibt offen für die nächste Karte
    } else if (form.dataset.form === 'edit') {
      saveEdit(data);
    }
  });

  document.addEventListener('keydown', e => {
    if (e.target.closest('input,textarea')) return;
    // Kartenzeilen sind keine echten Buttons → Enter/Leertaste selbst auslösen
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('.card-preview')) { e.preventDefault(); e.target.click(); return; }
    if (state.view === 'card' && !state.editing) {
      if (e.key === ' ' || e.key === 'Enter') { if (!e.target.closest('button')) { e.preventDefault(); pvFlip(); } }
      else if (e.key === 'ArrowLeft') cardNav(-1);
      else if (e.key === 'ArrowRight') cardNav(1);
      else if (e.key === 'Escape') backToFolder();
      return;
    }
    if (state.view !== 'study') return;
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); }
    else if (e.key === '1' || e.key === 'ArrowLeft') answer('wrong');
    else if (e.key === '2' || e.key === 'ArrowDown') answer('unsure');
    else if (e.key === '3' || e.key === 'ArrowRight') answer('known');
    else if (e.key === 'Escape') { state.view = 'folder'; state.study = null; render(); }
  });

  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { updateMetaColor(); render(); });

  render();
  updateMetaColor();
})();
