#!/usr/bin/env node
// Construye todo lo que la web necesita a partir de la especificación y de la carpeta scripts/:
//   1. js/data.js       ← estilos, acentos, temas y plantillas de prompt (desde prompt-spec.md)
//   2. scripts/scripts.js y scripts/index.json ← guiones listos validados (tools/index-scripts.js)
// Uso: node tools/build.js
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { leer } = require("./read-spec.js");

const D = leer();
const out = path.join(__dirname, "..", "js", "data.js");
fs.writeFileSync(out, `// Generado por tools/build.js desde prompt-spec.md (${D.version}) — no editar a mano.\nwindow.DATOS = ${JSON.stringify(D, null, 1)};\n`);
console.log(`js/data.js: especificación ${D.version}, ${D.order.length} estilos, ${D.accents.es.length + D.accents.en.length} acentos, ${D.topics.length} temas`);

try {
  process.stdout.write(execFileSync("node", [path.join(__dirname, "index-scripts.js")], { encoding: "utf8" }));
} catch (e) {
  process.stdout.write(e.stdout || "");
  console.error("Hay guiones con errores o avisos: revisa la salida de arriba.");
  process.exit(1);
}
