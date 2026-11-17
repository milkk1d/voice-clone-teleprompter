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
  tutorial: { ppm: 130, words: 520, sections: 5, nombre: "Tutorial" },
  motivational: { ppm: 140, words: 560, sections: 5, nombre: "Motivacional" },
  mystery: { ppm: 120, words: 480, sections: 5, nombre: "Suspenso" },
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
  "es/podcast/1": "Cocinando con mi abuela",
  "es/podcast/2": "Mi primera mascota",
  "es/podcast/3": "Cómo dejé de dejarlo todo para mañana",
  "es/podcast/4": "Mi peor corte de pelo",
  "es/podcast/5": "Aprender piano después de los treinta",
  "es/commercial/1": "Ocho anuncios de la heladería Copo Sur",
  "es/commercial/2": "Ocho anuncios del gimnasio La Cuadra",
  "es/commercial/3": "Ocho anuncios de las zapatillas Zancada",
  "es/commercial/4": "Ocho anuncios del Tren Valle Azul",
  "es/commercial/5": "Ocho anuncios de la app Charla",
  "es/tutorial/1": "Cómo hacer pan casero",
  "es/tutorial/2": "Un huerto en el balcón",
  "es/tutorial/3": "Cómo grabar tu voz en casa",
  "es/tutorial/4": "Cómo armar una mochila de viaje",
  "es/tutorial/5": "Cómo cuidar plantas de interior",
  "es/motivational/1": "Empezar de nuevo",
  "es/motivational/2": "El poder de los pasos pequeños",
  "es/motivational/3": "Fallar sin rendirse",
  "es/motivational/4": "Tu primera carrera",
  "es/motivational/5": "Cuidar tu energía",
  "es/mystery/1": "La casa del final de la calle",
  "es/mystery/2": "El tren que no aparece en el horario",
  "es/mystery/3": "La llamada de las tres de la mañana",
  "es/mystery/4": "El pueblo que desapareció del mapa",
  "es/mystery/5": "El retrato del ático",
  "es/calm/1": "Lluvia en la ventana",
  "es/calm/2": "Un campo de lavanda",
  "es/calm/3": "Una noche estrellada",
  "es/calm/4": "Relajar el cuerpo para dormir",
  "es/calm/5": "Un río de montaña",
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
  "en/podcast/1": "Cooking with my grandma",
  "en/podcast/2": "My first pet",
  "en/podcast/3": "How I stopped putting everything off",
  "en/podcast/4": "My worst haircut",
  "en/podcast/5": "Learning piano after thirty",
  "en/commercial/1": "Eight ads for Copo Sur ice cream",
  "en/commercial/2": "Eight ads for La Cuadra Gym",
  "en/commercial/3": "Eight ads for Zancada running shoes",
  "en/commercial/4": "Eight ads for the Blue Valley Train",
  "en/commercial/5": "Eight ads for the Charla app",
  "en/tutorial/1": "How to make homemade bread",
  "en/tutorial/2": "A balcony garden",
  "en/tutorial/3": "How to record your voice at home",
  "en/tutorial/4": "How to pack a travel backpack",
  "en/tutorial/5": "How to care for houseplants",
  "en/motivational/1": "Starting over",
  "en/motivational/2": "The power of small steps",
  "en/motivational/3": "Failing without giving up",
  "en/motivational/4": "Your first race",
  "en/motivational/5": "Protecting your energy",
  "en/mystery/1": "The house at the end of the street",
  "en/mystery/2": "The train that isn't on the schedule",
  "en/mystery/3": "The three a.m. call",
  "en/mystery/4": "The town that vanished from the map",
  "en/mystery/5": "The portrait in the attic",
  "en/calm/1": "Rain on the window",
  "en/calm/2": "A lavender field",
  "en/calm/3": "A starry night",
  "en/calm/4": "Relaxing your body for sleep",
  "en/calm/5": "A mountain river",
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
