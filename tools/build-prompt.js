#!/usr/bin/env node
// Arma un prompt leyendo directamente la especificación (usa el mismo módulo que la web: js/prompt.js).
// Uso: node build-prompt.js --style calm --lang en --accent "American (US)" --topic 3 [--min 4] [--parts 1] [--out archivo.txt]
const fs = require("fs");
const { leer, norm, KEY } = require("./read-spec.js");
const Prompt = require("../js/prompt.js");

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf("--" + k); return i >= 0 ? args[i + 1] : d; };
const D = leer();
const rawStyle = norm(opt("style", "documentary"));
const style = KEY[rawStyle] || rawStyle; // acepta la clave en inglés o el nombre en español
const lang = opt("lang", "es");
const topicArg = opt("topic", "1");
const r = Prompt.build(D, {
  lang, style,
  accent: opt("accent", lang === "es" ? "Chileno" : "American (US)"),
  topic: /^\d+$/.test(topicArg) ? Number(topicArg) : topicArg,
  minutes: Number(opt("min", 4)),
  parts: Number(opt("parts", 1)),
});
const OUT = opt("out", "");
if (OUT) fs.writeFileSync(OUT, r.prompt); else process.stdout.write(r.prompt);
r.continuations.forEach((c, i) => console.error(`Continuación ${i + 2}: ${c}`));
console.error(`Revisión: node validate-script.js <guion.txt> --lang ${lang} --style ${style} --words ${r.words} --sections ${r.sections}`);
