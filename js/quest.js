// Quest de la página de inicio: idioma y acento del clon, estilos, tema y tipo de clon → plan de grabación.
// Usa window.DATOS (especificación), window.Prompt (armado de prompts) y window.GUIONES_LISTOS (guiones listos).
(function () {
  const D = window.DATOS;
  const LISTOS = Array.isArray(window.GUIONES_LISTOS) ? window.GUIONES_LISTOS : [];
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const store = {
    get(k, d) { try { const v = localStorage.getItem("tp." + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("tp." + k, JSON.stringify(v)); } catch (e) {} },
  };

  const S = {
    es: {
      brand: "Clona tu voz", navHome: "Inicio", navPrompter: "Teleprompter", navGuide: "Guía de grabación", navPrivacy: "Privacidad",
      heroKicker: "Teleprompter gratis para clonar tu voz",
      heroTitle: "Graba tu voz para clonarla, frase por frase.",
      heroLead: "Elige un estilo, lee un guion pensado para clonar voces y graba con Audacity. Te marcamos qué palabra decir con más fuerza, dónde pausar y cuándo subir la entonación.",
      ctaStart: "Empezar", ctaPrompter: "Abrir el teleprompter",
      howTitle: "Cómo funciona",
      how1: "Elige el idioma, el estilo de tu clon y un tema.",
      how2: "Abre un guion listo en el teleprompter, o genera uno con tu propia IA.",
      how3: "Graba en Audacity mientras lees: el guion sube solo, como un karaoke.",
      how4: "Sube el audio al servicio de clonación de voz que prefieras.",
      whyTitle: "Por qué así",
      why1: "Tu clon habla como lo grabas: un guion bien marcado da una voz pareja y natural.",
      why2: "Cada guion cubre todos los sonidos del idioma y está revisado antes de publicarse.",
      why3: "Todo pasa en tu navegador: no hay cuentas y tu voz nunca sale de tu computador.",
      questKicker: "Tu plan de grabación", questTitle: "Cuatro preguntas y empiezas a grabar",
      planKicker: "Listo para grabar", planTitle: "Tu plan",
      planLead: "Graba cada estilo en una sesión aparte. Antes de empezar, revisa la guía de grabación.",
      footNote: "Hecho para grabar mejor. Sin cuentas, sin subir tu voz.",
      step: "Paso", q1: "¿En qué idioma hablará tu clon?", es: "Español", en: "Inglés", both: "Ambos",
      both_note: "Grabarás cada idioma en sesiones separadas.",
      accentEs: "Acento en español", accentEn: "Acento en inglés",
      q2: "¿Cómo quieres que hable tu clon?", q2hint: "Puedes elegir más de uno.",
      warnStyle: "<b>Ojo: tu clon hablará como lo grabes.</b> Elige el estilo de los videos que vas a hacer. Si eliges varios, grabarás cada uno en una sesión aparte, para que tu voz se mantenga pareja.",
      ready: "Guiones listos",
      q3: "¿De qué quieres hablar?", ownTopic: "Mi propio tema", ownTopicPh: "Por ejemplo: la historia del fútbol en mi ciudad",
      haveScript: "¿Ya tienes tu guion?", haveScriptLink: "Pégalo directo en el teleprompter",
      q4: "¿Qué tipo de clon?", quick: "Clon rápido", quickD: "Unos 4 minutos por estilo. Ideal para probar.",
      pro: "Clon profesional", proD: "30 minutos o más, en partes de unos 10 minutos. Mejor calidad.",
      proNote: "Revisa cuánto audio pide el servicio que usarás para clonar tu voz.",
      seePlan: "Ver mi plan", needStyle: "Elige al menos un estilo.", needTopic: "Escribe tu tema.",
      readyTitle: "Guion listo", open: "Abrir en el teleprompter",
      readyAll: (n, m) => `Los ${n} guiones listos de este estilo suman unos ${m} minutos de lectura.`,
      readyPro: "Para llegar a 30 minutos, suma otro estilo o genera partes nuevas con tu IA (abajo).",
      neutralNote: "Los guiones listos están en español neutro. Si hablas con voseo o con «vosotros», genera uno con tu IA para que el texto calce con tu forma de hablar.",
      genOwn: "¿Prefieres un guion nuevo? Genéralo con tu IA",
      promptTitle: "Prompt para tu IA",
      promptSteps: "Copia el prompt, pégalo en tu IA, copia el guion con el botón del bloque de código y pégalo en el teleprompter.",
      copy: "Copiar prompt", copied: "Copiado ✓", copyCont: "Copiar",
      pasteInPrompter: "Pegar el resultado en el teleprompter",
      contTitle: "Cuando termines cada parte, envía en el mismo chat:",
      part: (n) => `Parte ${n}`,
      length: (w, s, m) => `≈ ${w} palabras · ${s} secciones · ${m} min`,
      parts: (p) => `${p} partes de unos 10 minutos`,
      minutes: "min",
      nextTitle: "Cuando termines de grabar",
      nextText: 'Sube tu audio a <a data-afiliado="elevenlabs">ElevenLabs ↗</a> y crea tu clon de voz. Revisa cuánto audio pide para el tipo de clon que elegiste.',
      affiliate: "Enlace de afiliado: si te suscribes, recibimos una comisión, sin costo extra para ti.",
    },
    en: {
      brand: "Clone your voice", navHome: "Home", navPrompter: "Teleprompter", navGuide: "Recording guide", navPrivacy: "Privacy",
      heroKicker: "Free teleprompter for voice cloning",
      heroTitle: "Record your voice for cloning, line by line.",
      heroLead: "Pick a style, read a script designed for voice cloning and record with Audacity. We mark which word to stress, where to pause and when your voice should rise.",
      ctaStart: "Get started", ctaPrompter: "Open the teleprompter",
      howTitle: "How it works",
      how1: "Choose the language, your clone's style and a topic.",
      how2: "Open a ready-made script in the teleprompter, or generate one with your own AI.",
      how3: "Record in Audacity while you read: the script scrolls by itself, like karaoke.",
      how4: "Upload the audio to the voice-cloning service you prefer.",
      whyTitle: "Why this way",
      why1: "Your clone speaks the way you record it: a well-marked script gives a steady, natural voice.",
      why2: "Every script covers all the sounds of the language and is checked before publishing.",
      why3: "Everything happens in your browser: no accounts, and your voice never leaves your computer.",
      questKicker: "Your recording plan", questTitle: "Four questions and you're ready to record",
      planKicker: "Ready to record", planTitle: "Your plan",
      planLead: "Record each style in a separate session. Before you start, check the recording guide.",
      footNote: "Made to help you record better. No accounts, no uploading your voice.",
      step: "Step", q1: "What language will your clone speak?", es: "Spanish", en: "English", both: "Both",
      both_note: "You'll record each language in separate sessions.",
      accentEs: "Spanish accent", accentEn: "English accent",
      q2: "How should your clone sound?", q2hint: "You can pick more than one.",
      warnStyle: "<b>Heads up: your clone will sound the way you record it.</b> Pick the style of the content you'll create. If you pick several, you'll record each one in its own session, so your voice stays consistent.",
      ready: "Ready-made scripts",
      q3: "What do you want to talk about?", ownTopic: "My own topic", ownTopicPh: "For example: the history of football in my city",
      haveScript: "Already have your script?", haveScriptLink: "Paste it straight into the teleprompter",
      q4: "What kind of clone?", quick: "Quick clone", quickD: "About 4 minutes per style. Great for trying it out.",
      pro: "Professional clone", proD: "30 minutes or more, in parts of about 10 minutes. Better quality.",
      proNote: "Check how much audio your voice-cloning service requires.",
      seePlan: "See my plan", needStyle: "Pick at least one style.", needTopic: "Write your topic.",
      readyTitle: "Ready-made script", open: "Open in the teleprompter",
      readyAll: (n, m) => `The ${n} ready-made scripts for this style add up to about ${m} minutes of reading.`,
      readyPro: "To reach 30 minutes, add another style or generate new parts with your AI (below).",
      neutralNote: "",
      genOwn: "Prefer a new script? Generate it with your AI",
      promptTitle: "Prompt for your AI",
      promptSteps: "Copy the prompt, paste it into your AI, copy the script with the code block's button and paste it into the teleprompter.",
      copy: "Copy prompt", copied: "Copied ✓", copyCont: "Copy",
      pasteInPrompter: "Paste the result into the teleprompter",
      contTitle: "When you finish each part, send this in the same chat:",
      part: (n) => `Part ${n}`,
      length: (w, s, m) => `≈ ${w} words · ${s} sections · ${m} min`,
      parts: (p) => `${p} parts of about 10 minutes`,
      minutes: "min",
      nextTitle: "When you finish recording",
      nextText: 'Upload your audio to <a data-afiliado="elevenlabs">ElevenLabs ↗</a> and create your voice clone. Check how much audio it needs for the clone type you chose.',
      affiliate: "Affiliate link: if you subscribe, we earn a commission at no extra cost to you.",
    },
  };

  let ui = store.get("ui", (navigator.language || "es").toLowerCase().startsWith("es") ? "es" : "en");
  const q = Object.assign({ lang: ui, accent: { es: "Latino neutro", en: "Neutral / International" }, styles: ["documental"], topic: 1, own: "", tipo: "rapido", shown: false }, store.get("quest", {}));
  const t = (k) => S[ui][k];
  const save = () => store.set("quest", q);
  const langs = () => (q.lang === "ambos" ? ["es", "en"] : [q.lang]);

  // ejemplo con el marcado convertido a algo visual sencillo
  function mini(md) {
    return esc(md.split("\n")[0])
      .replace(/\*\*(.+?)\*\*/g, '<span class="kw">$1</span>')
      .replace(/\[(sube|up)\]/g, '<span class="arrow-up">↗</span>').replace(/\[(baja|down)\]/g, "↘")
      .replace(/\[(pausa|pause)[^\]]*\]|\[(respira|breathe)\]/g, '<span class="chip">·</span>')
      .replace(/\[\/?[a-záéíóú]+\]/g, "").replace(/\{[^}]*\}/g, "");
  }

  // frase de ejemplo del inicio: las palabras crecen hacia la subrayada, como en el teleprompter
  const DEMO = { es: ["¿Por", "qué", "el", "mar", "es", "salado"], en: ["Why", "is", "the", "sea", "so", "salty"] };
  function renderDemo() {
    const words = DEMO[ui];
    const sizes = [[0.84, 330], [0.9, 430], [0.97, 530], [1.04, 630], [1.1, 720], [1.18, 800]];
    $("#demoLine").innerHTML = words.map((w, i) => `<span${i === words.length - 1 ? ' class="kw"' : ""} style="font-size:${sizes[i][0]}em;font-weight:${sizes[i][1]}">${esc(w)}</span>`).join(" ")
      + '? <span class="arrow-up">↗</span> <span class="chip">1 s</span>';
  }

  function renderStatic() {
    renderDemo();
    document.documentElement.lang = ui;
    document.querySelectorAll("[data-t]").forEach((el) => { const v = S[ui][el.dataset.t]; if (typeof v === "string") el.textContent = v; });
    document.querySelectorAll(".lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === ui)));
    document.title = ui === "es" ? "Clona tu voz · Teleprompter" : "Clone your voice · Teleprompter";
  }

  function renderQuest() {
    const L = langs();
    const exLang = ui; // los ejemplos de estilo van en el idioma de la página
    const acc = (lang) => `<label class="field">${t(lang === "es" ? "accentEs" : "accentEn")}
      <select data-accent="${lang}">${D.accents[lang].map((a) => `<option ${a.nombre === q.accent[lang] ? "selected" : ""}>${esc(a.nombre)}</option>`).join("")}</select></label>`;
    const readyFor = (style) => LISTOS.some((g) => g.estilo === style && L.includes(g.idioma));
    $("#questBody").innerHTML = `
      <fieldset class="panel stack">
        <legend class="step-head"><span class="kicker">${t("step")} 1</span><h3>${t("q1")}</h3></legend>
        <div class="opts">${[["es", t("es")], ["en", t("en")], ["ambos", t("both")]].map(([v, l]) =>
          `<label class="opt"><input type="radio" name="lang" value="${v}" ${q.lang === v ? "checked" : ""}><span>${l}</span></label>`).join("")}</div>
        ${q.lang === "ambos" ? `<p class="muted">${t("both_note")}</p>` : ""}
        <div class="grid two">${L.map(acc).join("")}</div>
      </fieldset>

      <fieldset class="panel stack">
        <legend class="step-head"><span class="kicker">${t("step")} 2</span><h3>${t("q2")}</h3><span class="muted">${t("q2hint")}</span></legend>
        <p class="note warn">${t("warnStyle")}</p>
        <div class="grid three">${D.order.map((k) => {
          const st = D.styles[k];
          return `<label class="card"><input type="checkbox" name="style" value="${k}" ${q.styles.includes(k) ? "checked" : ""}>
            <span class="top"><span class="name">${esc(st.nombre[ui])}</span><span class="check" aria-hidden="true">✓</span></span>
            <span class="uso">${esc(st.uso[ui])} · ${st.ppm} ppm</span>
            <span class="ej">${mini(st.ejemplo[exLang])}</span>
            ${readyFor(k) ? `<span class="badge">${t("ready")}</span>` : ""}</label>`;
        }).join("")}</div>
      </fieldset>

      <fieldset class="panel stack">
        <legend class="step-head"><span class="kicker">${t("step")} 3</span><h3>${t("q3")}</h3></legend>
        <div class="grid three">${D.topics.map((tp) => {
          const [title, rest] = tp[ui].split(/:\s*/);
          return `<label class="card"><input type="radio" name="topic" value="${tp.n}" ${q.topic === tp.n ? "checked" : ""}>
            <span class="top"><span class="name">${esc(title)}</span><span class="check round" aria-hidden="true">●</span></span>
            <span class="uso">${esc(rest || "")}</span></label>`;
        }).join("")}
          <label class="card"><input type="radio" name="topic" value="propio" ${q.topic === "propio" ? "checked" : ""}>
            <span class="top"><span class="name">${t("ownTopic")}</span><span class="check round" aria-hidden="true">●</span></span>
            <input type="text" id="own" value="${esc(q.own)}" placeholder="${esc(t("ownTopicPh"))}" style="position:static;opacity:1" ${q.topic === "propio" ? "" : "tabindex=\"-1\""}>
          </label>
        </div>
        <p class="muted">${t("haveScript")} <a href="teleprompter.html?pegar=1&idioma=${L[0]}&estilo=${q.styles[0] || "documental"}">${t("haveScriptLink")}</a></p>
      </fieldset>

      <fieldset class="panel stack">
        <legend class="step-head"><span class="kicker">${t("step")} 4</span><h3>${t("q4")}</h3></legend>
        <div class="grid two">
          ${[["rapido", "quick", "quickD"], ["profesional", "pro", "proD"]].map(([v, n, d]) => `<label class="card"><input type="radio" name="tipo" value="${v}" ${q.tipo === v ? "checked" : ""}>
            <span class="top"><span class="name">${t(n)}</span><span class="check round" aria-hidden="true">●</span></span><span class="uso">${t(d)}</span></label>`).join("")}
        </div>
        <p class="muted">${t("proNote")}</p>
      </fieldset>

      <div class="actions"><button type="button" class="btn main" id="seePlan">${t("seePlan")}</button><span id="planHint" class="muted" role="status"></span></div>`;
  }

  function validity() {
    if (!q.styles.length) return t("needStyle");
    if (q.topic === "propio" && !q.own.trim()) return t("needTopic");
    return "";
  }

  function promptBlock(r, lang, style) {
    const id = `p-${lang}-${style}`;
    const paste = `teleprompter.html?pegar=1&idioma=${lang}&estilo=${style}&palabras=${r.words}&secciones=${r.sections}`;
    return `<div class="stack">
      <p class="muted">${t("promptSteps")} <span class="kicker">${r.parts > 1 ? t("parts")(r.parts) : t("length")(r.words, r.sections, r.minutes)}</span></p>
      <textarea class="prompt" id="${id}" readonly spellcheck="false">${esc(r.prompt)}</textarea>
      <div class="actions">
        <button type="button" class="btn main small" data-copy="${id}">${t("copy")}</button>
        <a class="btn small" href="https://chatgpt.com/" target="_blank" rel="noopener">ChatGPT ↗</a>
        <a class="btn small" href="https://claude.ai/new" target="_blank" rel="noopener">Claude ↗</a>
        <a class="btn small" href="https://gemini.google.com/app" target="_blank" rel="noopener">Gemini ↗</a>
        <a class="btn small" href="${paste}">${t("pasteInPrompter")}</a>
      </div>
      ${r.continuations.length ? `<div class="cont"><p class="muted" style="font-family:var(--sans);background:none;border:0;padding:0">${t("contTitle")}</p>${r.continuations.map((c, i) => {
        const cid = `${id}-c${i}`;
        return `<div><span class="kicker" style="min-width:4.5em">${t("part")(i + 2)}</span><p id="${cid}">${esc(c)}</p><button type="button" class="btn small" data-copy="${cid}">${t("copyCont")}</button></div>`;
      }).join("")}</div>` : ""}
    </div>`;
  }

  function renderPlan() {
    const sec = $("#planSection");
    if (!q.shown || validity()) { sec.hidden = true; return; }
    sec.hidden = false;
    const pro = q.tipo === "profesional";
    const items = [];
    for (const lang of langs()) for (const style of q.styles) {
      const st = D.styles[style];
      const r = Prompt.build(D, { lang, style, accent: q.accent[lang], topic: q.topic === "propio" ? q.own : q.topic, minutes: pro ? 10 : 4, parts: pro ? 3 : 1 });
      const ready = LISTOS.filter((g) => g.idioma === lang && g.estilo === style).sort((a, b) => a.tema - b.tema);
      const one = typeof q.topic === "number" ? ready.find((g) => g.tema === q.topic) : null;
      const langName = lang === "es" ? t("es") : t("en");
      let body = "";
      const accentNote = lang === "es" && ready.length && /rioplatense|españa/i.test(q.accent.es) && t("neutralNote") ? `<p class="note">${t("neutralNote")}</p>` : "";
      if (!pro && one) {
        body = `<div class="actions"><span class="badge">${t("readyTitle")}</span><strong>${esc(one.titulo)}</strong></div>
          <div class="actions"><a class="btn main" href="teleprompter.html?guion=${encodeURIComponent(one.id)}">${t("open")}</a></div>${accentNote}
          <details><summary>${t("genOwn")}</summary>${promptBlock(r, lang, style)}</details>`;
      } else if (pro && ready.length) {
        const mins = Math.round(ready.reduce((a, g) => a + g.texto.split(/\s+/).length / g.ppm, 0));
        body = `<p>${t("readyAll")(ready.length, mins)}</p>
          <ul class="clean ready-list">${ready.map((g) => `<li><span>${g.tema}. ${esc(g.titulo)}</span><a href="teleprompter.html?guion=${encodeURIComponent(g.id)}">${t("open")} →</a></li>`).join("")}</ul>
          <p class="muted">${t("readyPro")}</p>${accentNote}
          <details><summary>${t("genOwn")}</summary>${promptBlock(r, lang, style)}</details>`;
      } else {
        body = `<h4 class="kicker" style="margin:0">${t("promptTitle")}</h4>${promptBlock(r, lang, style)}`;
      }
      items.push(`<article class="plan-item"><h3>${esc(st.nombre[ui])} <small>${langName} · ${esc(q.accent[lang])}</small></h3>${body}</article>`);
    }
    items.push(`<article class="plan-item"><h3>${t("nextTitle")}</h3><p>${t("nextText")}</p><p class="muted" style="font-size:13px">${t("affiliate")}</p></article>`);
    $("#plan").innerHTML = items.join("");
    window.aplicarEnlaces?.($("#plan"));
  }

  function renderAll() { renderStatic(); renderQuest(); renderPlan(); }

  // eventos
  document.addEventListener("change", (e) => {
    const el = e.target;
    if (el.name === "lang") q.lang = el.value;
    else if (el.name === "style") q.styles = [...document.querySelectorAll('input[name="style"]:checked')].map((x) => x.value);
    else if (el.name === "topic") q.topic = el.value === "propio" ? "propio" : Number(el.value);
    else if (el.name === "tipo") q.tipo = el.value;
    else if (el.dataset.accent) q.accent[el.dataset.accent] = el.value;
    else return;
    save();
    if (el.name === "lang" || el.name === "topic") renderQuest();
    if (el.name === "topic" && q.topic === "propio") $("#own")?.focus();
    renderPlan();
    $("#planHint").textContent = q.shown ? validity() : "";
  });
  document.addEventListener("input", (e) => {
    if (e.target.id !== "own") return;
    q.own = e.target.value;
    if (q.own && q.topic !== "propio") { q.topic = "propio"; const r = document.querySelector('input[name="topic"][value="propio"]'); if (r) r.checked = true; }
    save();
    renderPlan();
  });
  document.addEventListener("click", async (e) => {
    const langBtn = e.target.closest(".lang button");
    if (langBtn) { ui = langBtn.dataset.lang; store.set("ui", ui); renderAll(); return; }
    if (e.target.id === "seePlan") {
      q.shown = true; save();
      const msg = validity();
      $("#planHint").textContent = msg;
      renderPlan();
      if (!msg) $("#planSection").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      return;
    }
    const copyBtn = e.target.closest("[data-copy]");
    if (copyBtn) {
      const src = document.getElementById(copyBtn.dataset.copy);
      const text = src.value ?? src.textContent;
      try { await navigator.clipboard.writeText(text); }
      catch (err) { if (src.select) { src.select(); document.execCommand("copy"); } }
      const old = copyBtn.textContent;
      copyBtn.textContent = t("copied");
      setTimeout(() => { copyBtn.textContent = old; }, 1600);
    }
  });

  renderAll();
})();
