// Arma el prompt para la IA a partir de los datos de la especificación (js/data.js).
// Funciona en el navegador (window.Prompt) y en Node (require).
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.Prompt = factory();
})(typeof self !== "undefined" ? self : this, function () {
  const SHORT = { documentary: 2, mystery: 1 }; // secciones cortas de cada estilo (preguntas, cierre)

  function accentGuide(D, lang, accentName, styleKey) {
    const list = D.accents[lang];
    const a = list.find((x) => x.nombre === accentName) || list[0];
    const casual = ["podcast", "social"].includes(styleKey) && a.extra;
    if (lang === "es") {
      let g = `Trato de ${a.trato.toLowerCase().replace(" / ", " y ")}. Palabras de referencia (úsalas solo si encajan natural; no hace falta usarlas todas): ${a.usa}. Evita: ${a.evita}.`;
      if (casual) g += ` Puedes usar con moderación: ${a.extra}.`;
      return { name: a.nombre, guide: g };
    }
    let g = `Reference words (use them only if they fit naturally; you don't need all of them): ${a.usa}. Avoid: ${a.evita}.`;
    if (casual) g += ` You may use in moderation: ${a.extra}.`;
    return { name: a.nombre, guide: g };
  }

  // o: { lang: "es"|"en", style, accent, topic: número 1-5 o texto propio, minutes: 4|10, parts: 1|3|6 }
  function build(D, o) {
    const lang = o.lang === "en" ? "en" : "es";
    const S = D.styles[o.style];
    if (!S) throw new Error("Estilo desconocido: " + o.style);
    const minutes = o.minutes || 4;
    const parts = o.parts || 1;
    const words = minutes * S.ppm;
    const short = SHORT[S.key] || 0;
    const full = Math.round((words - 50 * short) / S.wps);
    const sections = short ? full + short : Math.round(words / S.wps);
    const largoTpl = (D.largo[S.key] || D.largo.normal)[lang];
    const largo = largoTpl
      .replace(/\{(SECCIONES|SECTIONS)\}/, sections).replace(/\{(COMPLETAS|FULL)\}/, full)
      .replace(/\{(FRASES|SENTENCES)\}/, S.frases[lang]).replace(/\{(PALABRAS_SECCION|SECTION_WORDS)\}/, S.wps);
    const acc = accentGuide(D, lang, o.accent, S.key);
    const topicText = typeof o.topic === "number" ? D.topics[o.topic - 1][lang] : String(o.topic || "").trim();
    const parte = parts > 1 ? D.parte[lang].replace("{TOTAL}", parts) : "";
    const v = S.vars;
    const vars = lang === "es"
      ? { IDIOMA: "Español", ACENTO: acc.name, GUIA_ACENTO: acc.guide, ESTILO: S.nombre.es, BLOQUE_ESTILO: S.bloque.es, TEMA: topicText, LARGO: largo, ENFASIS: S.enfasis.es, PALABRAS: words, MINUTOS: minutes, PARTE: parte, REGLA_FRASES: v.frases.es, CONTENIDO_MINIMO: v.contenido.es, REGLA_VARIEDAD: v.variedad.es, LIMITE_PAUSAS: v.pausas.es }
      : { LANGUAGE: "English", ACCENT: acc.name, ACCENT_GUIDE: acc.guide, STYLE: S.nombre.en, STYLE_BLOCK: S.bloque.en, TOPIC: topicText, LENGTH: largo, EMPHASIS: S.enfasis.en, WORDS: words, MINUTES: minutes, PART: parte, SENTENCE_RULE: v.frases.en, MIN_CONTENT: v.contenido.en, VARIETY_RULE: v.variedad.en, PAUSE_LIMIT: v.pausas.en };
    const filled = D.templates[lang].replace(/\{([A-Z_]+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
    const prompt = filled.split("\n").filter((l) => !/^\s*-\s*$/.test(l)).join("\n").replace(/\n{3,}/g, "\n\n") + "\n";
    const continuations = [];
    for (let n = 2; n <= parts; n++) {
      continuations.push(D.continuacion[lang]
        .replace("{N}", n).replace("{TOTAL}", parts).replace(/\{(LARGO|LENGTH)\}/, largo).replace(/\{(ENFASIS|EMPHASIS)\}/, S.enfasis[lang]));
    }
    return { prompt, words, sections, minutes, parts, continuations, style: S.key, lang };
  }

  return { build, accentGuide };
});
