#!/usr/bin/env node
// Valida todos los guiones listos y genera scripts/index.json (lo que leería la web).
// Uso: node tools/index-scripts.js
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..", "scripts");
// estilo → parámetros de validación (especificación, secciones 5 y 8)
const STYLES = {
  documentary: { ppm: 140, words: 560, sections: 6, nombre: "Documental" },
  news: { ppm: 155, words: 620, sections: 5, nombre: "Noticiero" },
  audiobook: { ppm: 130, words: 520, sections: 4, nombre: "Audiolibro" },
  podcast: { ppm: 145, words: 580, sections: 5, nombre: "Podcast" },
  commercial: { ppm: 165, words: 660, sections: 8, nombre: "Comercial" },
  calm: { ppm: 100, words: 400, sections: 5, nombre: "Meditación" },
};
const TITLES = {
  "es/documentary/1": "El océano profundo",
  "es/documentary/2": "La historia del chocolate",
  "es/documentary/3": "El desierto de Atacama",
  "es/documentary/4": "Cómo sabe tu celular dónde estás",
  "es/documentary/5": "Los nervios del primer día",
  "es/news/1": "El clima de la semana en Puerto Alba",
  "es/news/2": "La final de la Liga Femenina del Valle",
  "es/news/3": "La lluvia de estrellas de esta noche",
  "es/news/4": "El nuevo tren de Valle Hondo",
  "es/news/5": "Noticiero de Villa Serena",
  "es/audiobook/1": "La guardiana del faro",
  "es/audiobook/2": "El reloj que se atrasaba",
  "es/audiobook/3": "La carta que llegó cuarenta años tarde",
  "es/audiobook/4": "El perro que esperaba en la estación",
  "es/audiobook/5": "La niña que coleccionaba nubes",
  "es/podcast/1": "Mi miedo al mar profundo",
  "es/podcast/2": "Mi bicicleta",
  "es/podcast/3": "Primera vez en la gran ciudad",
  "es/podcast/4": "El wifi de mi casa",
  "es/podcast/5": "El viaje que salió mal",
  "es/commercial/1": "Ocho anuncios del océano profundo",
  "es/commercial/2": "Ocho anuncios de café",
  "es/commercial/3": "Ocho anuncios de la Patagonia",
  "es/commercial/4": "Ocho anuncios para la cámara del celular",
  "es/commercial/5": "Ocho anuncios para el primer día de trabajo",
  "es/calm/1": "Un océano en calma",
  "es/calm/2": "Una taza de chocolate caliente",
  "es/calm/3": "Un bosque del sur",
  "es/calm/4": "Soltar el celular",
  "es/calm/5": "Antes de un día importante",
  "en/documentary/1": "The deep ocean",
  "en/documentary/2": "The history of chocolate",
  "en/documentary/3": "The Atacama Desert",
  "en/documentary/4": "How your phone knows where you are",
  "en/documentary/5": "First-day nerves",
  "en/news/1": "This week's weather in Puerto Alba",
  "en/news/2": "The Valley Women's League final",
  "en/news/3": "Tonight's meteor shower",
  "en/news/4": "Valle Hondo's new train",
  "en/news/5": "The Villa Serena newscast",
  "en/audiobook/1": "The lighthouse keeper",
  "en/audiobook/2": "The clock that ran late",
  "en/audiobook/3": "The letter that arrived forty years late",
  "en/audiobook/4": "The dog who waited at the station",
  "en/audiobook/5": "The girl who collected clouds",
  "en/podcast/1": "Why the deep sea scares me",
  "en/podcast/2": "My bike",
  "en/podcast/3": "First time in the big city",
  "en/podcast/4": "My home Wi-Fi",
  "en/podcast/5": "The trip that went wrong",
  "en/commercial/1": "Eight deep-ocean ads",
  "en/commercial/2": "Eight coffee ads",
  "en/commercial/3": "Eight Patagonia ads",
  "en/commercial/4": "Eight phone camera ads",
  "en/commercial/5": "Eight first-day-at-work ads",
  "en/calm/1": "A calm ocean",
  "en/calm/2": "A cup of hot chocolate",
  "en/calm/3": "A southern forest",
  "en/calm/4": "Unplugging from your phone",
  "en/calm/5": "Before a big day",
};

const items = [];
let problems = 0;
for (const lang of fs.readdirSync(ROOT).filter((d) => fs.statSync(path.join(ROOT, d)).isDirectory())) {
  for (const style of fs.readdirSync(path.join(ROOT, lang))) {
    const P = STYLES[style];
    if (!P) continue;
    for (const file of fs.readdirSync(path.join(ROOT, lang, style)).filter((f) => f.endsWith(".txt")).sort()) {
      const rel = `${lang}/${style}/${file}`;
      const out = execFileSync("node", [path.join(__dirname, "validate-script.js"), path.join(ROOT, rel),
        "--lang", lang, "--style", style, "--words", P.words, "--sections", P.sections], { encoding: "utf8" });
      const words = Number(out.match(/Palabras: (\d+)/)[1]);
      const [, errs, warns] = out.match(/Errores: (\d+) · Avisos: (\d+)/).map(Number);
      if (errs || warns) { problems++; console.log(out.trim()); }
      const tema = Number(file.split("-")[0]);
      items.push({
        id: rel.replace(/\.txt$/, ""), idioma: lang, estilo: style, estiloNombre: P.nombre, tema,
        titulo: TITLES[`${lang}/${style}/${tema}`] || file, archivo: rel, palabras: words,
        minutos: Math.round((words / P.ppm) * 10) / 10, errores: errs, avisos: warns,
      });
    }
  }
}
fs.writeFileSync(path.join(ROOT, "index.json"), JSON.stringify({ generado: new Date().toISOString().slice(0, 10), guiones: items }, null, 2) + "\n");

// Paquete para el teleprompter: un .js que se puede cargar con <script> aunque la página
// se abra con doble clic (file://), donde el navegador no deja leer .txt sueltos.
const EXAMPLES = [{ archivo: "examples/01-copper.txt", titulo: "El cobre de Chile (guion original del canal)", ppm: 140 }];
const bundle = items.map((i) => ({ id: i.id, idioma: i.idioma, estilo: i.estilo, estiloNombre: i.estiloNombre, tema: i.tema,
  titulo: i.titulo, ppm: STYLES[i.estilo].ppm, texto: fs.readFileSync(path.join(ROOT, i.archivo), "utf8").replace(/\r/g, "") }));
for (const p of EXAMPLES) {
  const f = path.join(ROOT, p.archivo);
  if (fs.existsSync(f)) bundle.push({ id: p.archivo.replace(/\.txt$/, ""), idioma: "es", estilo: "example", estiloNombre: "Mis guiones",
    tema: 0, titulo: p.titulo, ppm: p.ppm, texto: fs.readFileSync(f, "utf8").replace(/\r/g, "") });
}
fs.writeFileSync(path.join(ROOT, "scripts.js"), "// Generado por tools/index-scripts.js — no editar a mano.\nwindow.GUIONES_LISTOS = " + JSON.stringify(bundle, null, 1) + ";\n");
console.log(`scripts/scripts.js: ${bundle.length} guiones empaquetados para el teleprompter`);
console.log(`${items.length} guiones indexados · ${problems} con errores o avisos`);
for (const s of Object.keys(STYLES)) {
  const g = items.filter((i) => i.estilo === s);
  if (g.length) console.log(`  ${s}: ${g.length} guiones · ${g.reduce((a, i) => a + i.minutos, 0).toFixed(1)} min de lectura en total`);
}
process.exit(problems ? 1 : 0);
