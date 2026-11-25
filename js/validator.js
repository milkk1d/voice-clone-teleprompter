// Revisa un guion con el formato de la especificación (secciones 3, 5 y 10).
// Funciona en el navegador (window.Validador) y en Node (require). Mensajes en español o inglés.
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.Validador = factory();
})(typeof self !== "undefined" ? self : this, function () {
  // Perfil de cada estilo (especificación v1.4, secciones 5 y 8): largo máximo de frase, frases y énfasis por sección,
  // exclamaciones [mín, máx], preguntas mínimas, máximo de [pausa] por sección (manyPauses = sin límite).
  // firstShort / lastShort: la primera o la última sección pueden ser más cortas.
  const STYLES = {
    documentary:  { max: 20, frases: [9, 11],  emph: [3, 4], excl: [2, Infinity], q: 2, firstShort: true, lastShort: true },
    news:         { max: 20, frases: [9, 11],  emph: [3, 4], excl: [0, 1], q: 0, maxPauses: 1 },
    audiobook:    { max: 20, frases: [10, 13], emph: [2, 3], excl: [2, Infinity], q: 1 },
    podcast:      { max: 20, frases: [9, 12],  emph: [2, 3], excl: [2, Infinity], q: 2 },
    commercial:   { max: 12, frases: [9, 11],  emph: [5, 7], excl: [1, Infinity], q: 1, exclPerSection: true },
    tutorial:     { max: 20, frases: [8, 10],  emph: [3, 4], excl: [2, Infinity], q: 2 },
    motivational: { max: 20, frases: [12, 15], emph: [6, 8], excl: [2, Infinity], q: 2 },
    mystery:      { max: 20, frases: [11, 13], emph: [2, 3], excl: [0, 1], q: 2, lastShort: true },
    social:       { max: 10, frases: [13, 16], emph: [6, 9], excl: [2, Infinity], q: 1, maxPauses: 1 },
    calm:         { max: 20, frases: [8, 10],  emph: [0, 1], excl: [0, 0], q: 2, manyPauses: true },
  };
  const KNOWN = ["pausa", "pause", "respira", "breathe", "sube", "baja", "up", "down", "lento", "slow", "rápido", "rapido", "fast", "suave", "soft", "fuerte", "loud"];
  const SPANS = { lento: "lento", slow: "lento", "rápido": "rápido", rapido: "rápido", fast: "rápido", suave: "suave", soft: "suave", fuerte: "fuerte", loud: "fuerte" };
  const SINGLE = /^(?:(?:pausa|pause)(?:\s+\d+(?:[.,]\d+)?\s*s)?|respira|breathe|sube|baja|up|down)$/i;
  const ADV = {
    es: { re: /\p{L}{3,}mente(?![\p{L}])/gu, skip: new Set(["demente", "clemente", "vehemente"]), max: 2, label: "-mente" },
    en: { re: /\p{L}{2,}ly(?![\p{L}])/gu, skip: new Set(["only", "family", "early", "daily", "holy", "reply", "supply", "belly", "jelly", "ugly", "lonely", "friendly", "lovely", "likely", "silly", "jolly", "rely", "italy", "july", "lily", "fly", "butterfly", "jellyfish", "holy", "apply", "ally", "rally", "bully", "fully", "gently", "assembly"]), max: 3, label: "-ly" },
  };
  // "gently" y "fully" se excluyen porque son normales en guiones de calma; el resto son palabras que terminan en -ly sin ser adverbios.
  const SOUNDS = {
    es: { "r fuerte inicial": /(^|\s)r/, rr: /rr/, "ñ": /ñ/, ll: /ll/, "y consonante": /(^|\s)y[aeiouáéíóú]|[aeiou]y[aeiou]/, j: /j/, "ge/gi": /g[eiéí]/, ch: /ch/, x: /x/, z: /z/, "ce/ci": /c[eiéí]/, tr: /tr/, bl: /bl/, pl: /pl/, cr: /cr/, gl: /gl/, pr: /pr/, fr: /fr/, dr: /dr/ },
    en: { th: /th/, sh: /sh/, ch: /ch/, "j / soft g": /j|g[ei]/, "zh (measure)": /[aeiou]sure|[aeiou]sion|sual|zure/, ng: /ng/, w: /(^|\s)w/, wh: /wh/, v: /v/, r: /r/, l: /l/ },
  };

  const M = {
    es: {
      unclosed: (raw, t) => `Falta cerrar [${raw}] en la sección "${t}".`,
      noEnergy: (t) => `La sección "${t}" no tiene @fuerza; se usará 3.`,
      manyPauses: (t, n, m) => `La sección "${t}" tiene ${n} [pausa]: con tantas, se pierde el efecto (máximo ${m} en este estilo).`,
      manyDown: (t, n) => `La sección "${t}" tiene ${n} [baja]: úsalo solo en la última frase.`,
      noExclSection: (t) => `La sección "${t}" no tiene exclamación.`,
      fence: "Se copiaron las marcas del bloque de código (```); se ignoran.",
      energyOutside: "@fuerza fuera de una sección.",
      energyPlace: "@fuerza no está justo debajo del título.",
      energyTwice: "Hay más de una @fuerza en la sección; se usará la última.",
      energyRange: "La fuerza debe ir de 1 a 5.",
      unknownDirective: (t) => `Directiva desconocida: ${t}`,
      preamble: "Hay texto antes de la primera sección (¿texto extra de la IA?).",
      unknownCmd: (c, s) => `Comando no reconocido: [${c}] (se mostrará como texto).${s ? ` ¿Quisiste decir [${s}]?` : ""}`,
      retakePlace: (c) => `[${c}] va al comienzo de la línea; en otro lugar no marca nada.`,
      closesNothing: (c) => `[${c}] cierra algo que no estaba abierto.`,
      mismatch: (c, raw, l) => `[${c}] no coincide con [${raw}] abierto en la línea ${l}.`,
      aloneTone: (c) => `[${c}] está solo o al inicio: debe ir al final de la frase que modifica.`,
      upBefore: (c) => `[${c}] va antes del signo "?": debe ir después de la pregunta.`,
      upNotQ: (c) => `[${c}] en una frase que no es pregunta (¿falta el signo "?"): revisa si de verdad debe subir.`,
      pron: (w) => `Pronunciación mal escrita: ${w} (usa sílabas con guiones y la tónica en mayúsculas).`,
      kwOpen: "Hay un ** sin cerrar.",
      digits: "Hay números en cifras: escríbelos en palabras.",
      acronym: (a) => `Sigla "${a}": revisa cómo se pronuncia.`,
      emoji: "Hay emojis: se quitarán.",
      twoKw: (e) => `Frase con ${e} palabras fuertes; deja solo una.`,
      long: (w, m) => `Frase de ${w} palabras (máximo ${m} en este estilo).`,
      repeated: (top, n, pos) => `Estructura repetida: ${top} de ${n} secciones siguen la misma secuencia de frases${pos ? ` y ${pos} posiciones abren casi siempre con la misma palabra` : ""}. Para el clon conviene más variedad.`,
      emphCount: (t, e, a, b) => `La sección "${t}" tiene ${e} énfasis; se pidieron ${a} a ${b}.`,
      noEmph: "No hay ninguna palabra marcada con **. Si copiaste el guion desde el chat de la IA, lo más probable es que los asteriscos se perdieran al copiar el texto con formato (se ven como negrita). Usa el botón Copiar del bloque de código, o pídele a la IA que entregue el guion dentro de un bloque de código.",
      sentCount: (t, s, a, b) => `La sección "${t}" tiene ${s} frases; se pidieron ${a} a ${b}.`,
      sections: (n, m) => `Tiene ${n} secciones; se pidieron ${m}.`,
      length: (w, m) => `Largo: ${w} palabras; se pidieron unas ${m} (±15 %).`,
      fewQ: (n, m) => `Tiene ${n} preguntas; este estilo pide al menos ${m}.`,
      fewExcl: (n, m) => `Tiene ${n} exclamaciones; este estilo pide al menos ${m}.`,
      manyExcl: (n, m) => `Tiene ${n} exclamaciones; este estilo permite como máximo ${m}.`,
      noList: "No se detectó ninguna enumeración (del tipo «A, B y C»).",
      adverbs: (n, l, m, list) => `${n} adverbios en ${l} (máximo ${m}): ${list}. Suena a texto escrito.`,
      emphEnd: (a, b) => `${a} de ${b} énfasis están en la última palabra de la frase: parece puesto en automático, no en la palabra importante.`,
      sounds: (list, minor) => `Sonidos que faltan: ${list}.${minor ? " (No es grave: se pueden cubrir en otro guion de la sesión.)" : ""}`,
      empty: "El guion está vacío o no tiene frases para leer.",
    },
    en: {
      unclosed: (raw, t) => `[${raw}] is not closed in section "${t}".`,
      noEnergy: (t) => `Section "${t}" has no @energy; 3 will be used.`,
      manyPauses: (t, n, m) => `Section "${t}" has ${n} [pause]: with so many, they lose their effect (max ${m} for this style).`,
      manyDown: (t, n) => `Section "${t}" has ${n} [down]: use it only on the last sentence.`,
      noExclSection: (t) => `Section "${t}" has no exclamation.`,
      fence: "Code block marks (```) were copied; they will be ignored.",
      energyOutside: "@energy outside a section.",
      energyPlace: "@energy is not right below the title.",
      energyTwice: "More than one @energy in the section; the last one will be used.",
      energyRange: "Energy must be between 1 and 5.",
      unknownDirective: (t) => `Unknown directive: ${t}`,
      preamble: "There is text before the first section (extra text from the AI?).",
      unknownCmd: (c, s) => `Unknown command: [${c}] (it will be shown as text).${s ? ` Did you mean [${s}]?` : ""}`,
      retakePlace: (c) => `[${c}] goes at the start of the line; anywhere else it marks nothing.`,
      closesNothing: (c) => `[${c}] closes something that was not open.`,
      mismatch: (c, raw, l) => `[${c}] doesn't match [${raw}] opened on line ${l}.`,
      aloneTone: (c) => `[${c}] is alone or at the start: it must go at the end of the sentence it changes.`,
      upBefore: (c) => `[${c}] is before the "?": it must go after the question.`,
      upNotQ: (c) => `[${c}] on a sentence that is not a question (missing "?"): check whether it should really rise.`,
      pron: (w) => `Badly written pronunciation: ${w} (use hyphenated syllables with the stressed one in capitals).`,
      kwOpen: "There is an unclosed **.",
      digits: "There are digits: write numbers out in words.",
      acronym: (a) => `Acronym "${a}": check how it is pronounced.`,
      emoji: "There are emojis: they will be removed.",
      twoKw: (e) => `Sentence with ${e} strong words; keep only one.`,
      long: (w, m) => `Sentence of ${w} words (max ${m} for this style).`,
      repeated: (top, n, pos) => `Repeated structure: ${top} of ${n} sections follow the same sentence sequence${pos ? ` and ${pos} positions almost always open with the same word` : ""}. More variety helps the clone.`,
      emphCount: (t, e, a, b) => `Section "${t}" has ${e} emphases; ${a} to ${b} were requested.`,
      noEmph: "No word is marked with **. If you copied the script from the AI chat, the asterisks were most likely lost when copying formatted text (they show up as bold). Use the Copy button on the code block, or ask the AI to return the script inside a code block.",
      sentCount: (t, s, a, b) => `Section "${t}" has ${s} sentences; ${a} to ${b} were requested.`,
      sections: (n, m) => `It has ${n} sections; ${m} were requested.`,
      length: (w, m) => `Length: ${w} words; about ${m} were requested (±15%).`,
      fewQ: (n, m) => `It has ${n} questions; this style asks for at least ${m}.`,
      fewExcl: (n, m) => `It has ${n} exclamations; this style asks for at least ${m}.`,
      manyExcl: (n, m) => `It has ${n} exclamations; this style allows at most ${m}.`,
      noList: "No list was detected (like \"A, B and C\").",
      adverbs: (n, l, m, list) => `${n} adverbs ending in ${l} (max ${m}): ${list}. It sounds written, not spoken.`,
      emphEnd: (a, b) => `${a} of ${b} emphases are on the last word of the sentence: it looks automatic, not on the important word.`,
      sounds: (list, minor) => `Missing sounds: ${list}.${minor ? " (Not serious: another script in the session can cover them.)" : ""}`,
      empty: "The script is empty or has no sentences to read.",
    },
  };

  function lev(a, b) {
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length];
  }
  const suggest = (w) => KNOWN.find((k) => lev(w.toLowerCase(), k) <= 2) || "";

  // o: { lang: "es"|"en", style, words (objetivo), sections (objetivo), ui: idioma de los mensajes }
  function validate(text, o) {
    const LANG = o.lang === "en" ? "en" : "es";
    const STYLE = STYLES[o.style] ? o.style : "documentary";
    const P = STYLES[STYLE];
    const T = M[o.ui === "en" ? "en" : o.ui === "es" ? "es" : LANG];
    const TARGET = Number(o.words || 0), SECTIONS = Number(o.sections || 0);
    const adv = ADV[LANG];
    const issues = [];
    const add = (sev, line, msg) => issues.push({ sev, line, msg });
    const sections = [];
    let cur = null, stack = [], expectEnergy = false, preambleWarned = false;
    let words = 0, sentences = 0, questions = 0, exclam = 0, lists = 0, pauses = 0, emphSent = 0, emphEnd = 0;
    const adverbs = [];
    let corpus = "";

    function closeSection() {
      if (!cur) return;
      stack.forEach((s) => add("error", s.line, T.unclosed(s.raw, cur.title)));
      stack = [];
      if (cur.energy === null) add("aviso", cur.line, T.noEnergy(cur.title));
      const maxP = P.maxPauses ?? 2;
      if (cur.pauses > maxP && !P.manyPauses) add("aviso", cur.line, T.manyPauses(cur.title, cur.pauses, maxP));
      if (cur.down > 2) add("aviso", cur.line, T.manyDown(cur.title, cur.down));
      if (P.exclPerSection && cur.excl < 1) add("aviso", cur.line, T.noExclSection(cur.title));
    }

    String(text || "").replace(/\r/g, "").split("\n").forEach((l, idx) => {
      const n = idx + 1;
      const t = l.trim();
      if (!t) return;
      if (/^```/.test(t)) { add("aviso", n, T.fence); return; }
      if (/^#\s+/.test(t)) {
        closeSection();
        cur = { title: t.replace(/^#\s+/, ""), line: n, energy: null, words: 0, emph: 0, excl: 0, pauses: 0, down: 0, sent: 0, shape: [] };
        sections.push(cur);
        expectEnergy = true;
        return;
      }
      const en = t.match(/^@(fuerza|energy)\s+(\d+)\s*$/i);
      if (en) {
        if (!cur) add("error", n, T.energyOutside);
        else {
          if (!expectEnergy) add("aviso", n, cur.energy === null ? T.energyPlace : T.energyTwice);
          const v = Number(en[2]);
          if (v < 1 || v > 5) add("error", n, T.energyRange);
          cur.energy = v;
        }
        expectEnergy = false;
        return;
      }
      expectEnergy = false;
      if (/^@/.test(t)) { add("error", n, T.unknownDirective(t)); return; }
      if (/^>/.test(t)) return;
      if (!cur && !preambleWarned) { add("aviso", n, T.preamble); preambleWarned = true; }

      for (const m of t.matchAll(/\[([^\]]*)\]/g)) {
        const inner = m[1].trim();
        // [regrabar: motivo] marca una línea para grabarla de nuevo; solo vale al comienzo de la línea
        if (/^(regrabar|retake)\b/i.test(inner)) {
          if (m.index !== 0) add("aviso", n, T.retakePlace(inner.split(/[\s:]/)[0]));
          continue;
        }
        if (inner.startsWith("/")) {
          const name = SPANS[inner.slice(1).toLowerCase()];
          if (!name) { add("aviso", n, T.unknownCmd(inner, suggest(inner.slice(1)))); continue; }
          const top = stack[stack.length - 1];
          if (!top) add("error", n, T.closesNothing(inner));
          else if (top.name !== name) add("error", n, T.mismatch(inner, top.raw, top.line));
          else stack.pop();
        } else if (SPANS[inner.toLowerCase()]) {
          stack.push({ name: SPANS[inner.toLowerCase()], raw: inner, line: n });
        } else if (SINGLE.test(inner)) {
          if (/^paus/i.test(inner)) pauses++;
          if (/^(sube|baja|up|down)$/i.test(inner) && !t.slice(0, m.index).replace(/\[[^\]]*\]/g, "").trim()) add("aviso", n, T.aloneTone(inner));
          if (/^(sube|up)$/i.test(inner) && !t.slice(0, m.index).includes("?")) {
            if (/^\s*\?/.test(t.slice(m.index + m[0].length))) add("aviso", n, T.upBefore(inner));
            else add("aviso", n, T.upNotQ(inner));
          }
          if (cur && /^paus/i.test(inner)) cur.pauses++;
          if (cur && /^(baja|down)$/i.test(inner)) cur.down++;
        } else add("aviso", n, T.unknownCmd(inner, suggest(inner)));
      }
      let txt = t.replace(/\[[^\]]*\]/g, " ");
      for (const m of txt.matchAll(/(\S+?)\{([^}]*)\}/g)) {
        const p = m[2];
        const ok = /^[\p{L}]+(?:-[\p{L}]+)+$/u.test(p) && p.split("-").some((s) => s === s.toUpperCase() && s !== s.toLowerCase());
        if (!ok) add("aviso", n, T.pron(m[0]));
      }
      txt = txt.replace(/\{[^}]*\}/g, "");
      if (((txt.match(/\*\*/g) || []).length) % 2) add("error", n, T.kwOpen);
      if (/\d/.test(txt)) add("aviso", n, T.digits);
      for (const m of txt.matchAll(/(?:^|[^\p{L}])(\p{Lu}{2,})(?=[^\p{L}]|$)/gu)) add("aviso", n, T.acronym(m[1]));
      if (/\p{Extended_Pictographic}/u.test(txt)) add("aviso", n, T.emoji);
      const plain = txt.replace(/\*\*/g, "");
      for (const m of plain.matchAll(adv.re)) if (!adv.skip.has(m[0].toLowerCase())) adverbs.push(m[0].toLowerCase());
      questions += (txt.match(/\?/g) || []).length;
      const ex = (txt.match(/!/g) || []).length;
      exclam += ex;
      if (cur) cur.excl += ex;
      const listRe = LANG === "es" ? /\p{L}+,\s[^,.!?]+\s(y|e|o)\s\p{L}/u : /\p{L}+,\s[^,.!?]+,?\s(and|or)\s\p{L}/u;
      if (listRe.test(plain)) lists++;
      for (const s of txt.split(/(?<=[.!?…])\s+/)) {
        const e = Math.floor((s.match(/\*\*/g) || []).length / 2);
        const w = s.replace(/\*\*/g, "").split(/\s+/).map((x) => x.replace(/[^\p{L}\p{N}'’-]/gu, "")).filter(Boolean).length;
        if (!w) continue;
        sentences++;
        if (e > 1) add("aviso", n, T.twoKw(e));
        if (e > 0) { emphSent++; if (/\*\*[^*]+\*\*[^\p{L}\p{N}]*$/u.test(s.trim())) emphEnd++; }
        if (w > P.max) add("aviso", n, T.long(w, P.max));
        words += w;
        if (cur) {
          cur.words += w; cur.emph += e; cur.sent++;
          const first = (s.replace(/\*\*/g, "").match(/\p{L}+/u) || [""])[0].toLowerCase();
          cur.shape.push((s.trim().match(/[?!]/) || ["."])[0] + first);
        }
      }
      corpus += " " + plain.toLowerCase();
    });
    closeSection();

    if (!sentences) add("error", 0, T.empty);
    if (sections.length >= 4) {
      const types = sections.map((s) => s.shape.map((x) => x[0]).join(""));
      const top = Math.max(...types.map((t) => types.filter((u) => u === t).length));
      const len = Math.min(...sections.map((s) => s.shape.length));
      let samePos = 0;
      for (let i = 0; i < len; i++) {
        const ws = sections.map((s) => s.shape[i].slice(1)).filter((w) => w.length > 3);
        const best = Math.max(0, ...ws.map((w) => ws.filter((v) => v === w).length));
        if (best >= Math.ceil(sections.length / 2)) samePos++;
      }
      if (top / sections.length >= 0.75 || samePos >= 2) add("aviso", 0, T.repeated(top, sections.length, samePos));
    }
    const tol = P.emph[1] <= 1 ? 0 : 1;
    // sin ningún ** en un estilo que los pide: casi siempre se perdieron al copiar el texto con formato desde el chat
    const noEmph = P.emph[0] > 0 && sentences > 0 && sections.every((s) => s.emph === 0);
    if (noEmph) add("aviso", 0, T.noEmph);
    sections.forEach((s, i) => {
      const short = (P.firstShort && i === 0) || (P.lastShort && i === sections.length - 1);
      if (!short && !noEmph && s.emph < P.emph[0] - tol) add("aviso", s.line, T.emphCount(s.title, s.emph, P.emph[0], P.emph[1]));
      if (s.emph > P.emph[1] + tol) add("aviso", s.line, T.emphCount(s.title, s.emph, P.emph[0], P.emph[1]));
      if ((!short && s.sent < P.frases[0] - 2) || s.sent > P.frases[1] + 2) add("aviso", s.line, T.sentCount(s.title, s.sent, P.frases[0], P.frases[1]));
    });
    if (SECTIONS && sections.length !== SECTIONS) add("aviso", 0, T.sections(sections.length, SECTIONS));
    if (TARGET && Math.abs(words - TARGET) / TARGET > 0.15) add("aviso", 0, T.length(words, TARGET));
    if (sentences) {
      if (questions < P.q) add("aviso", 0, T.fewQ(questions, P.q));
      if (exclam < P.excl[0]) add("aviso", 0, T.fewExcl(exclam, P.excl[0]));
      if (exclam > P.excl[1]) add("aviso", 0, T.manyExcl(exclam, P.excl[1]));
      if (!lists && STYLE !== "calm") add("aviso", 0, T.noList);
      if (adverbs.length > adv.max) add("aviso", 0, T.adverbs(adverbs.length, adv.label, adv.max, adverbs.join(", ")));
      if (emphSent >= 5 && emphEnd / emphSent >= 0.8) add("aviso", 0, T.emphEnd(emphEnd, emphSent));
      const missing = Object.entries(SOUNDS[LANG]).filter(([, re]) => !re.test(corpus)).map(([k]) => k);
      if (missing.length) add("aviso", 0, T.sounds(missing.join(", "), missing.length <= 2));
    }
    issues.sort((a, b) => a.line - b.line);
    return {
      issues,
      errors: issues.filter((i) => i.sev === "error").length,
      warnings: issues.filter((i) => i.sev === "aviso").length,
      stats: { words, sentences, questions, exclam, emph: emphSent, pauses, style: STYLE, sections: sections.map((s) => ({ title: s.title, energy: s.energy, words: s.words, emph: s.emph, sent: s.sent })) },
    };
  }

  return { validate, STYLES };
});
