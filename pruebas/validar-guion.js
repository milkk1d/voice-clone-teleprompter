#!/usr/bin/env node
// Validador del formato de guion (usa el mismo módulo que la web: js/validador.js).
// Uso: node validar-guion.js <guion.txt> --lang es|en --style documental --words 560 --sections 5
const fs = require("fs");
const Validador = require("../js/validador.js");

const args = process.argv.slice(2);
const file = args[0];
const opt = (k, d) => { const i = args.indexOf("--" + k); return i >= 0 ? args[i + 1] : d; };
const STYLE = opt("style", "documental");
if (!Validador.STYLES[STYLE]) { console.error(`Estilo desconocido: ${STYLE}. Usa: ${Object.keys(Validador.STYLES).join(", ")}`); process.exit(1); }
const TARGET = Number(opt("words", 0)), SECTIONS = Number(opt("sections", 0));
const r = Validador.validate(fs.readFileSync(file, "utf8"), { lang: opt("lang", "es"), style: STYLE, words: TARGET, sections: SECTIONS, ui: "es" });
const s = r.stats;

console.log(`\n== ${file.split(/[\\/]/).pop()} (estilo: ${STYLE}) ==`);
console.log(`Palabras: ${s.words}${TARGET ? ` (objetivo ${TARGET})` : ""} · Frases: ${s.sentences} · Secciones: ${s.sections.length}${SECTIONS ? ` (objetivo ${SECTIONS})` : ""} · Preguntas: ${s.questions} · Exclamaciones: ${s.exclam} · Énfasis: ${s.emph} · Pausas: ${s.pauses}`);
console.log("Secciones:");
s.sections.forEach((x) => console.log(`  - ${x.title}: fuerza ${x.energy ?? "—"}, ${x.words} palabras, ${x.emph} énfasis`));
console.log(`Errores: ${r.errors} · Avisos: ${r.warnings}`);
r.issues.forEach((i) => console.log(`  [${i.sev}] ${i.line ? "línea " + i.line : "general"}: ${i.msg}`));
