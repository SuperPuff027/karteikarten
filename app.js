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
  let prefs = Object.assign({ reverse: false, shuffle: true, extended: true, smart: true }, store.get('kk.prefs', {}));
  // Lernstand pro Karte: { s: 'known'|'unsure'|'wrong', lvl: 0..5, t: Zeitstempel }
  let stats = store.get('kk.stats', {});

  const state = { view: 'home', folderId: null, newFolder: false, newCard: false, study: null };

  const save = () => { store.set('kk.folders', userFolders); store.set('kk.cards', ownCards); store.set('kk.prefs', prefs); store.set('kk.stats', stats); };

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
  function statItems(f) {
    const out = [];
    for (const c of cardsOf(f)) {
      out.push(statKey(f.id, c.term, null));
      if (c.more && prefs.extended) out.push(statKey(f.id, c.term, c.moreLabel || 'Methode'));
    }
    return out;
  }
  function summary(f) {
    const r = { wrong: 0, unsure: 0, known: 0, neu: 0 };
    for (const k of statItems(f)) { const st = stats[k]; st ? r[st.s]++ : r.neu++; }
    return r;
  }

  // ---------- Daten ----------
  function folders() {
    const builtin = (window.DECKS || []).map((d, i) => ({
      id: d.id || 'deck-' + i, name: d.name, color: d.color || COLORS[i % COLORS.length],
      cards: d.cards || [], builtin: true, description: d.description || '',
    }));
    return builtin.concat(userFolders.map(f => Object.assign({ cards: [], builtin: false }, f)));
  }
  const folderById = id => folders().find(f => f.id === id);
  function cardsOf(f) {
    return f.cards.map(c => Object.assign({}, c, { own: false }))
      .concat((ownCards[f.id] || []).map((c, i) => Object.assign({}, c, { own: true, ownIndex: i })));
  }
  function countText(f) {
    const cs = cardsOf(f);
    const more = cs.filter(c => c.more).length;
    return cs.length + (cs.length === 1 ? ' Begriff' : ' Begriffe') + (more ? ' · ' + more + ' Vertiefung' + (more === 1 ? '' : 'en') : '');
  }

  // ---------- Hilfen ----------
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const uid = () => 'f' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

  // Minimal-Formatierung: Absätze, "- " Listen, **fett**
  function rich(text) {
    const inline = s => esc(s)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
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
    document.body.classList.toggle('studying', state.view === 'study');
    if (state.view === 'home') app.innerHTML = viewHome();
    else if (state.view === 'folder') app.innerHTML = viewFolder();
    else if (state.view === 'study') app.innerHTML = viewStudy();
    const auto = app.querySelector('[autofocus]');
    if (auto) auto.focus();
    fitCards();
  }

  // Lange Texte verkleinern, bis sie auf die Karte passen (Scrollen nur als letzter Ausweg)
  function fitCards() {
    app.querySelectorAll('.face .content').forEach(c => {
      const t = c.firstElementChild; if (!t) return;
      t.style.fontSize = '';
      let size = parseFloat(getComputedStyle(t).fontSize);
      while (c.scrollHeight > c.clientHeight + 1 && size > 11) {
        size -= 0.5; t.style.fontSize = size + 'px';
      }
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
    </div>`;
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
    const total = cs.length + (prefs.extended ? cs.filter(c => c.more).length : 0);
    return `<div class="menu">
      <div class="topbar">
        <div class="left"><button class="icon-btn" data-action="home" aria-label="Zurück">${icon.back}</button>
        <h1>${esc(f.name)}</h1></div>${themeBtn()}
      </div>
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
      </div>

      ${total ? statsBlock(f) : ''}

      <div style="margin-top:22px"><button class="btn primary block" data-action="study" ${total ? '' : 'disabled'}>Lernen</button></div>

      <div class="section-label">Karten</div>
      <div class="list">${cs.length ? cs.map(c => `<div class="row card-preview">
          <span class="dot" style="background:${dotFor(stats[statKey(f.id, c.term, null)])}"></span>
          <span class="grow"><div class="title">${esc(c.term)}${c.more ? `<span class="tag">+ ${esc(c.moreLabel || 'Methode')}</span>` : ''}${c.own ? '<span class="tag">eigene</span>' : ''}</div>
          <div class="sub">${esc(String(c.def).replace(/[`*]/g, ''))}</div></span>
          ${c.own ? `<button class="del" data-action="del-card" data-i="${c.ownIndex}" aria-label="Karte löschen">×</button>` : ''}
        </div>`).join('') : '<div class="empty">Dieser Ordner ist noch leer.</div>'}</div>

      <div style="margin-top:14px">${state.newCard ? newCardForm() : '<button class="btn block" data-action="new-card">+ Karte hinzufügen</button>'}</div>

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
    let items = [];
    for (const c of cardsOf(f)) {
      items.push({ term: c.term, text: c.def, label: null });
      if (c.more && prefs.extended) items.push({ term: c.term, text: c.more, label: c.moreLabel || 'Methode' });
    }
    items.forEach((it, i) => { it.key = statKey(f.id, it.term, it.label); it.pos = i; });

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

  function face(side, item, color) {
    // side: 'front' | 'back'; Inhalt hängt von der Richtung ab
    const showTerm = (side === 'front') !== prefs.reverse;
    let inner;
    if (showTerm) {
      inner = `<div class="term">${esc(item.term)}${item.label ? `<span style="font-weight:400;opacity:.55">: ${esc(item.label)}</span>` : ''}</div>`;
    } else {
      inner = `<div class="text ${lengthClass(item.text)}">${rich(item.text)}</div>`;
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
      case 'open': state.folderId = el.dataset.id; state.view = 'folder'; state.newCard = false; render(); scrollTo(0, 0); break;
      case 'home': state.view = 'home'; render(); break;
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
      case 'reset-stats': {
        const f = folderById(state.folderId);
        if (f && confirm(`Lernstand für „${f.name}“ zurücksetzen?`)) {
          for (const k of Object.keys(stats)) if (k.startsWith(f.id + '|')) delete stats[k];
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
    }
  });

  document.addEventListener('keydown', e => {
    if (state.view !== 'study' || e.target.closest('input,textarea')) return;
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
