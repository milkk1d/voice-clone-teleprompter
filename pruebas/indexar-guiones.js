#!/usr/bin/env node
// Valida todos los guiones listos y genera guiones/indice.json (lo que leería la web).
// Uso: node pruebas/indexar-guiones.js
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..", "guiones");
// estilo → parámetros de validación (especificación, secciones 5 y 8)
const STYLES = {
  documental: { ppm: 140, words: 560, sections: 6, nombre: "Documental" },
  podcast: { ppm: 145, words: 580, sections: 5, nombre: "Podcast" },
  comercial: { ppm: 165, words: 660, sections: 8, nombre: "Comercial" },
  meditacion: { ppm: 100, words: 400, sections: 5, nombre: "Meditación" },
};
const TITLES = {
  "es/documental/1": "El océano profundo",
  "es/documental/2": "La historia del chocolate",
  "es/documental/3": "El desierto de Atacama",
  "es/documental/4": "Cómo sabe tu celular dónde estás",
  "es/documental/5": "Los nervios del primer día",
  "es/podcast/1": "Mi miedo al mar profundo",
  "es/podcast/2": "Mi bicicleta",
  "es/podcast/3": "Primera vez en la gran ciudad",
  "es/podcast/4": "El wifi de mi casa",
  "es/podcast/5": "El viaje que salió mal",
  "es/comercial/1": "Ocho anuncios del océano profundo",
  "es/comercial/2": "Ocho anuncios de café",
  "es/comercial/3": "Ocho anuncios de la Patagonia",
  "es/comercial/4": "Ocho anuncios para la cámara del celular",
  "es/comercial/5": "Ocho anuncios para el primer día de trabajo",
  "es/meditacion/1": "Un océano en calma",
  "es/meditacion/2": "Una taza de chocolate caliente",
  "es/meditacion/3": "Un bosque del sur",
  "es/meditacion/4": "Soltar el celular",
  "es/meditacion/5": "Antes de un día importante",
  "en/documental/1": "The deep ocean",
  "en/documental/2": "The history of chocolate",
  "en/documental/3": "The Atacama Desert",
  "en/documental/4": "How your phone knows where you are",
  "en/documental/5": "First-day nerves",
  "en/podcast/1": "Why the deep sea scares me",
  "en/podcast/2": "My bike",
  "en/podcast/3": "First time in the big city",
  "en/podcast/4": "My home Wi-Fi",
  "en/podcast/5": "The trip that went wrong",
  "en/comercial/1": "Eight deep-ocean ads",
  "en/comercial/2": "Eight coffee ads",
  "en/comercial/3": "Eight Patagonia ads",
  "en/comercial/4": "Eight phone camera ads",
  "en/comercial/5": "Eight first-day-at-work ads",
  "en/meditacion/1": "A calm ocean",
  "en/meditacion/2": "A cup of hot chocolate",
  "en/meditacion/3": "A southern forest",
  "en/meditacion/4": "Unplugging from your phone",
  "en/meditacion/5": "Before a big day",
};

const items = [];
let problems = 0;
for (const lang of fs.readdirSync(ROOT).filter((d) => fs.statSync(path.join(ROOT, d)).isDirectory())) {
  for (const style of fs.readdirSync(path.join(ROOT, lang))) {
    const P = STYLES[style];
    if (!P) continue;
    for (const file of fs.readdirSync(path.join(ROOT, lang, style)).filter((f) => f.endsWith(".txt")).sort()) {
      const rel = `${lang}/${style}/${file}`;
      const out = execFileSync("node", [path.join(__dirname, "validar-guion.js"), path.join(ROOT, rel),
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
fs.writeFileSync(path.join(ROOT, "indice.json"), JSON.stringify({ generado: new Date().toISOString().slice(0, 10), guiones: items }, null, 2) + "\n");

// Paquete para el teleprompter: un .js que se puede cargar con <script> aunque la página
// se abra con doble clic (file://), donde el navegador no deja leer .txt sueltos.
const PROPIOS = [{ archivo: "propios/01-cobre.txt", titulo: "El cobre de Chile (guion original del canal)", ppm: 140 }];
const bundle = items.map((i) => ({ id: i.id, idioma: i.idioma, estilo: i.estilo, estiloNombre: i.estiloNombre, tema: i.tema,
  titulo: i.titulo, ppm: STYLES[i.estilo].ppm, texto: fs.readFileSync(path.join(ROOT, i.archivo), "utf8").replace(/\r/g, "") }));
for (const p of PROPIOS) {
  const f = path.join(ROOT, p.archivo);
  if (fs.existsSync(f)) bundle.push({ id: p.archivo.replace(/\.txt$/, ""), idioma: "es", estilo: "propio", estiloNombre: "Mis guiones",
    tema: 0, titulo: p.titulo, ppm: p.ppm, texto: fs.readFileSync(f, "utf8").replace(/\r/g, "") });
}
fs.writeFileSync(path.join(ROOT, "guiones.js"), "// Generado por pruebas/indexar-guiones.js — no editar a mano.\nwindow.GUIONES_LISTOS = " + JSON.stringify(bundle, null, 1) + ";\n");
console.log(`guiones/guiones.js: ${bundle.length} guiones empaquetados para el teleprompter`);
console.log(`${items.length} guiones indexados · ${problems} con errores o avisos`);
for (const s of Object.keys(STYLES)) {
  const g = items.filter((i) => i.estilo === s);
  if (g.length) console.log(`  ${s}: ${g.length} guiones · ${g.reduce((a, i) => a + i.minutos, 0).toFixed(1)} min de lectura en total`);
}
process.exit(problems ? 1 : 0);
