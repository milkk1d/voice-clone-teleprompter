#!/usr/bin/env node
// Construye todo lo que la web necesita a partir de la especificación y de la carpeta guiones/:
//   1. js/datos.js       ← estilos, acentos, temas y plantillas de prompt (desde especificacion-prompts-v1.md)
//   2. guiones/guiones.js y guiones/indice.json ← guiones listos validados (pruebas/indexar-guiones.js)
// Uso: node pruebas/construir.js
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { leer } = require("./leer-especificacion.js");

const D = leer();
const out = path.join(__dirname, "..", "js", "datos.js");
fs.writeFileSync(out, `// Generado por pruebas/construir.js desde especificacion-prompts-v1.md (${D.version}) — no editar a mano.\nwindow.DATOS = ${JSON.stringify(D, null, 1)};\n`);
console.log(`js/datos.js: especificación ${D.version}, ${D.order.length} estilos, ${D.accents.es.length + D.accents.en.length} acentos, ${D.topics.length} temas`);

try {
  process.stdout.write(execFileSync("node", [path.join(__dirname, "indexar-guiones.js")], { encoding: "utf8" }));
} catch (e) {
  process.stdout.write(e.stdout || "");
  console.error("Hay guiones con errores o avisos: revisa la salida de arriba.");
  process.exit(1);
}
