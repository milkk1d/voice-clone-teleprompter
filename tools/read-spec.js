// Lee prompt-spec.md y devuelve todos los datos que necesitan la web y las herramientas:
// estilos (bloques, ejemplos, números), variables por estilo, acentos, temas, plantillas y textos de partes.
// La especificación es la única fuente de verdad: si cambia el documento, se regenera js/data.js.
const fs = require("fs");
const path = require("path");

const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
const cells = (row) => row.split("|").slice(1, -1).map((c) => c.trim());
const unquote = (s) => s.replace(/^`|`$/g, "");

// Para qué sirve cada estilo, en inglés (la tabla de la especificación solo lo tiene en español).
// Clave interna (en inglés) de cada estilo, a partir de su nombre en español en la especificación.
const KEY = {
  documental: "documentary", noticiero: "news", audiolibro: "audiobook", podcast: "podcast", comercial: "commercial",
  tutorial: "tutorial", motivacional: "motivational", suspenso: "mystery", reels: "social", meditacion: "calm",
};

const USO_EN = {
  documentary: "Explainer YouTube videos, science content",
  news: "News, reports, summaries",
  audiobook: "Stories, books, narratives",
  podcast: "Podcasts, casual voice",
  commercial: "Ads, promotions",
  tutorial: "Courses, step-by-step explanations",
  motivational: "Talks, inspirational content",
  mystery: "Mystery, cases, intriguing stories",
  social: "TikTok, Shorts, Reels",
  calm: "Relaxation, sleep guides",
};

function leer(specPath = path.join(__dirname, "..", "prompt-spec.md")) {
  const L = fs.readFileSync(specPath, "utf8").replace(/\r/g, "").split("\n");
  const fail = (m) => { throw new Error("especificación: " + m); };
  function tableAfter(startRe, from = 0) {
    let i = L.findIndex((l, k) => k >= from && startRe.test(l));
    if (i < 0) fail(`no encontré ${startRe}`);
    while (!L[i].startsWith("|")) i++;
    const rows = [];
    for (i += 2; i < L.length && L[i].startsWith("|"); i++) rows.push(cells(L[i]));
    return rows;
  }
  function block(startRe, endRe) {
    const a = L.findIndex((l) => startRe.test(l)), b = L.findIndex((l, k) => k > a && endRe.test(l));
    if (a < 0 || b < 0) fail(`no encontré la plantilla ${startRe}`);
    return L.slice(a, b + 1).join("\n");
  }

  // 1. estilos (sección 8)
  const styles = {};
  L.forEach((l, i) => {
    const m = l.match(/^### (\d+)\. (.+?) · (.+?) —/);
    if (!m) return;
    const key = KEY[norm(m[2])];
    if (!key) fail(`estilo sin clave en inglés: ${m[2]}`);
    const quote = (label) => { const j = L.findIndex((x, k) => k > i && x.startsWith(label)); return L[j + 1].replace(/^> /, ""); };
    const ej = L.findIndex((x, k) => k > i && x.startsWith("**Ejemplo / Example**"));
    const code = [];
    for (let k = ej + 1; code.length < 2 && k < L.length; k++) {
      if (L[k] === "```") { const e = L.indexOf("```", k + 1); code.push(L.slice(k + 1, e).join("\n")); k = e; }
    }
    styles[key] = { key, num: +m[1], nombre: { es: m[2], en: m[3] }, bloque: { es: quote("**ES — bloque**"), en: quote("**EN — block**") }, ejemplo: { es: code[0], en: code[1] } };
  });
  const keys = Object.keys(styles);
  if (keys.length !== 10) fail(`esperaba 10 estilos y encontré ${keys.length}`);

  // uso (tabla resumen de la sección 8)
  for (const r of tableAfter(/^\| # \| ES \| EN \| ppm/)) {
    const k = KEY[norm(r[1])];
    if (styles[k]) styles[k].uso = { es: r[r.length - 1], en: USO_EN[k] || r[r.length - 1] };
  }

  // 2. números (sección 5)
  for (const r of tableAfter(/^\| Estilo \| ppm \| Palabras por sección/)) {
    const k = KEY[norm(r[0].replace(/^\d+\s+/, ""))];
    if (!styles[k]) continue;
    const tr = (s) => ({ es: s, en: s.replace(/ a /, " to ").replace(/ o /, " or ") });
    Object.assign(styles[k], { ppm: parseInt(r[1]), wps: parseInt(r[2]), frases: tr(r[3]), enfasis: tr(r[4]) });
  }

  // 3. variables por estilo (sección 5)
  function styleVar(header, key) {
    const rows = tableAfter(new RegExp("^\\*\\*`\\{" + header + "\\}`"));
    const isDefault = (c) => /^(todos|los dem)/i.test(norm(c));
    const row = rows.find((r) => !isDefault(r[0]) && r[0].split(/,| y /).map((n) => KEY[norm(n)]).includes(key)) || rows.find((r) => isDefault(r[0]));
    const clean = (t) => (/^\*\(/.test(t) ? "" : t);
    return { es: clean(row[1]), en: clean(row[2]) };
  }
  for (const k of keys) {
    styles[k].vars = {
      frases: styleVar("REGLA_FRASES", k), contenido: styleVar("CONTENIDO_MINIMO", k),
      variedad: styleVar("REGLA_VARIEDAD", k), pausas: styleVar("LIMITE_PAUSAS", k),
    };
  }

  // 4. línea de largo
  const largo = {};
  for (const r of tableAfter(/^### Línea de largo/)) {
    const k = /sin secciones cortas/i.test(r[0]) ? "normal" : KEY[norm(r[0])];
    largo[k] = { es: unquote(r[1]), en: unquote(r[2]) };
  }

  // 5. acentos (sección 4)
  const accStart = L.findIndex((l) => /^## 4\. Acentos/.test(l));
  const accents = {
    es: tableAfter(/^\| Acento \| Trato/, accStart).map((r) => ({ nombre: r[0], trato: r[1], usa: r[2], evita: r[3], extra: r[4] === "—" ? "" : r[4] })),
    en: tableAfter(/^\| Accent \| Use/, accStart).map((r) => ({ nombre: r[0], usa: r[1], evita: r[2], extra: r[3] === "—" ? "" : r[3] })),
  };

  // 6. temas (sección 9)
  const strip = (s) => s.replace(/\*\*/g, "");
  const topics = tableAfter(/^## 9\. Los 5 temas/).map((r) => ({ n: +r[0], es: strip(r[1]), en: strip(r[2]) }));

  // 7. plantillas y textos de partes
  const templates = { es: block(/^Eres guionista experto/, /^Entrega SOLO el guion/), en: block(/^You are an expert voice-over/, /^Return ONLY the script/) };
  const after = (headRe) => {
    const h = L.findIndex((l) => headRe.test(l));
    const pick = (lang) => unquote(L.find((l, k) => k > h && l.startsWith(`- **${lang}:** \``)).replace(`- **${lang}:** `, ""));
    return { es: pick("ES"), en: pick("EN") };
  };
  const parte = after(/^### Texto de parte/);
  const continuacion = after(/^### Mensaje de continuación/);

  const order = keys.sort((a, b) => styles[a].num - styles[b].num);
  return { version: (L[0].match(/v[\d.]+/) || ["?"])[0], order, styles, largo, accents, topics, templates, parte, continuacion };
}

module.exports = { leer, norm, KEY };
