# Teleprompter para clonar tu voz — Especificación v1.4

Documento de definición. **No cambia el código todavía**: describe la quest, el formato de marcado, los prompts y los 10 estilos de narración en español e inglés, para implementarlos después.

**Contenido**
0. [Cambios por versión](#0-cambios-por-versión)
1. [Decisiones tomadas](#1-decisiones-tomadas)
2. [La quest (cuestionario inicial)](#2-la-quest-cuestionario-inicial)
3. [Formato de marcado (ES / EN)](#3-formato-de-marcado-es--en)
4. [Acentos](#4-acentos)
5. [Duración, secciones y largo](#5-duración-secciones-y-largo)
6. [Prompt base — Español](#6-prompt-base--español)
7. [Base prompt — English](#7-base-prompt--english)
8. [Los 10 estilos de narración](#8-los-10-estilos-de-narración)
9. [Los temas de cada estilo](#9-los-temas-de-cada-estilo)
10. [Validación del guion pegado](#10-validación-del-guion-pegado)
11. [Historial de pruebas](#11-historial-de-pruebas)
12. [Pendientes](#12-pendientes)
13. [Biblioteca de guiones listos](#13-biblioteca-de-guiones-listos)
14. [La web](#14-la-web)

---

## 0. Cambios por versión

### v1.4

Ajustes a partir de las pruebas de Meditación (inglés) y Comercial (español) con ChatGPT y Gemini (sección 11). La idea central: **el prompt final no debe contradecirse**.

| # | Problema encontrado | Cambio |
|---|---|---|
| 1 | ChatGPT puso exclamaciones en la Meditación: siguió la regla del prompt base en vez de la del estilo. | Las reglas que cambian según el estilo salen del prompt base y pasan a ser **variables** que la web rellena (sección 5): `{REGLA_FRASES}`, `{CONTENIDO_MINIMO}` y `{LIMITE_PAUSAS}`. El prompt armado ya no tiene reglas que choquen. |
| 2 | ChatGPT repitió la misma estructura en los 8 anuncios del Comercial (y Gemini, en menor medida, también). Parte del problema era nuestro: el bloque Comercial imponía un orden fijo. | Nueva variable `{REGLA_VARIEDAD}`: en Comercial, Reels y Noticiero pide abrir cada sección de un modo distinto y no repetir el orden de tipos de frase. El bloque Comercial ahora dice qué elementos lleva cada anuncio, no en qué orden (salvo el llamado, siempre al final). El validador avisa si detecta una plantilla repetida. |
| 3 | Comercial y Reels piden frases de 12 y 10 palabras, pero el prompt base pedía mezclar frases "medianas de 12 a 18". | El largo y la mezcla de frases dependen del estilo (`{REGLA_FRASES}`). |
| 4 | Noticiero pedía "1 exclamación" en el bloque y "al menos 2" en el prompt base. | Noticiero: como máximo 1 exclamación; las preguntas son opcionales. |

La línea "si el estilo contradice alguna regla, manda el estilo" se mantiene solo como respaldo.

### v1.3

Ajustes a partir de la prueba v1.2 con ChatGPT y Gemini (sección 11). Qwen queda fuera de las pruebas.

| # | Problema encontrado | Cambio |
|---|---|---|
| 1 | ChatGPT puso `[sube]` antes del "?" y Gemini borró los signos de pregunta. | El prompt muestra un ejemplo: `¿Qué hay en el fondo del mar? [sube]` (primero el signo, después el comando). |
| 2 | El largo pedido no cuadraba con las secciones cortas del Documental (preguntas y cierre). | En los estilos con secciones cortas, la línea de largo (`{LARGO}`) dice cuáles son cortas y **suma secciones completas** para llegar al total. Documental rápido: 6 secciones (2 cortas + 4 completas). |
| 3 | Gemini no puso exclamaciones. | "Al menos 2 frases completas entre ¡ y !". |
| 4 | Faltó el sonido "gl" en todas las pruebas. | Ejemplos de "gl" que sirven para cualquier tema: siglo, regla, iglú, inglés. |

### v1.2

Ajustes a partir de la prueba v1.1 con ChatGPT, Gemini y Qwen (sección 11). La lección principal: **las IAs cumplen cantidades concretas, pero no proporciones**.

| # | Problema encontrado | Cambio |
|---|---|---|
| 1 | "Un énfasis cada 2 o 3 frases" no se respetó: ChatGPT y Qwen pusieron muy pocos; Gemini, uno en cada frase. | El énfasis se pide como **cantidad por sección** (`{ENFASIS}`, por ejemplo "3 o 4"), según el estilo. Se quitaron las proporciones de los bloques de estilo. |
| 2 | Gemini volvió a entregar la mitad del largo. | El largo también se pide en **frases por sección** (`{FRASES}`, por ejemplo "9 a 11"); a las IAs les resulta más fácil contar frases que palabras. |
| 3 | Qwen escribió 70 frases muy cortas y entrecortadas. | "Varía el largo de las frases: mezcla cortas (5 a 8 palabras) y medianas (12 a 18)." |
| 4 | Gemini y Qwen metieron a la fuerza las palabras del acento y los ejemplos de sonidos ("la gente científica", "queda mucha plata por invertir"). | Esas palabras son **solo referencia**: usarlas si encajan natural, no hace falta usarlas todas, no copiar los ejemplos de sonidos. |
| 5 | `[pausa]` en casi todas las líneas (Gemini) y `[baja]` en todas las frases del cierre (ChatGPT). | **Límites de marcas:** máximo 2 `[pausa]` y 2 `[respira]` por sección; `[baja]` solo en la última frase de la sección; `[sube]` solo en preguntas. El estilo puede pedir más (Meditación). |
| 6 | El bloque Documental pedía "frases terminadas en [baja]" en plural. | Ahora dice: "su **última frase** termina en [baja]". |

### v1.1

Ajustes a partir de las pruebas v1 con Gemini y ChatGPT (sección 11).

| # | Problema encontrado | Cambio |
|---|---|---|
| 1 | Gemini puso el énfasis casi siempre en la última palabra; ChatGPT puso muy pocos. | El prompt pide **un énfasis cada 2 o 3 frases**, en la palabra que carga el sentido, con un ejemplo bien hecho y uno mal hecho. Cada estilo puede pedir más o menos. |
| 2 | Gemini entregó la mitad del largo pedido. | El largo se pide **por sección** ("5 secciones de unas 110 palabras") y se le pide a la IA contar antes de entregar. Cada estilo tiene sus palabras por sección. |
| 3 | Gemini puso `[baja]` en líneas sueltas antes de la frase. | `[sube]` y `[baja]` van **siempre al final de la línea**, con ejemplo. |
| 4 | ChatGPT escribió como texto, no como habla (11 adverbios en -mente, palabras rebuscadas, adjetivos repetidos). | Nueva sección del prompt: **Escribe como se habla**. |
| 5 | ChatGPT ignoró el acento chileno. | La guía de acentos ahora trae palabras que **usar y evitar**. |
| 6 | Ninguna IA puso exclamaciones; faltó el sonido "gl". | Cantidades concretas (2 preguntas, 2 exclamaciones, 1 enumeración) y **una palabra de ejemplo por sonido**. |
| 7 | ChatGPT separó cada 2 frases con líneas en blanco (que antes significaban pausa larga). | **Las líneas en blanco ya no hacen pausa**: solo separan. Las pausas se marcan con `[pausa]`. |
| 8 | Ambas IAs incluyeron datos dudosos. | "Si no estás seguro de una cifra, no la pongas o redondéala." |
| 9 | La regla de exclamaciones chocaba con Meditación; Comercial y Reels no cabían en 3–6 secciones. | **El estilo manda sobre el prompt base**. Cantidad de secciones según el estilo. |
| 10 | Casos sin definir. | Tramos en varias líneas (sí, dentro de la sección), `[pausa]` en línea propia (sí), énfasis + pronunciación (`**Tajumulco{ta-hu-MUL-co}**`), una sola `@fuerza` por sección. |

---

## 1. Decisiones tomadas

- **Solo teleprompter.** La grabación se hace en Audacity (u otro programa); la web incluye una guía de grabación.
- **Camino principal: guiones listos.** Para los 5 temas de cada estilo, la web entrega guiones ya escritos, validados y revisados (sección 13): la persona solo elige y lee. Generar el guion con su IA queda como opción para temas propios.
- **Opción secundaria: el guion lo escribe la IA del usuario** (ChatGPT, Claude, Gemini…) con un prompt que arma la web. La web no llama a ninguna IA: costo cero.
- **Un prompt por estilo.** Si el usuario elige varios estilos, recibe un prompt por cada uno y graba cada guion en una sesión aparte.
- **Bilingüe.** La web, los prompts, los estilos y los temas existen en español e inglés.
- **El idioma del prompt = el idioma del clon** (no el de la web). La IA escribe mejor cuando las instrucciones están en el mismo idioma que el resultado.
- **Énfasis con `**`**, todo lo demás con palabras entre corchetes. Las IAs ya escriben `**` de forma natural.
- **La IA entrega el guion dentro de un bloque de código**, para que al copiarlo no se pierdan los `**` ni los `[pausa]`.
- **El bloque del estilo manda sobre las reglas generales** del prompt base.
- **Las líneas en blanco no hacen pausa.** Las IAs separan párrafos por costumbre; las pausas solo se marcan con `[pausa]`.

---

## 2. La quest (cuestionario inicial)

### Paso 1 — Idioma de la web / Website language
- Español · English

### Paso 2 — Idioma y acento del clon / Clone language and accent

| ES | EN |
|---|---|
| **¿En qué idioma hablará tu clon?** | **What language will your clone speak?** |
| Español · Inglés · Ambos | Spanish · English · Both |
| Luego: elige tu acento (ver sección 4) | Then: choose your accent (see section 4) |
| *Si eliges ambos, recibirás los prompts en los dos idiomas y grabarás cada idioma en sesiones separadas.* | *If you choose both, you'll get prompts in both languages and record each language in separate sessions.* |

### Paso 3 — Estilo / Style (selección múltiple)

| ES | EN |
|---|---|
| **¿Cómo quieres que hable tu clon?** Elige uno o más estilos. | **How should your clone sound?** Pick one or more styles. |
| Atajo: **Ya tengo mi guion** → ir directo a pegarlo. | Shortcut: **I already have my script** → go straight to pasting it. |

Cada estilo se muestra como una tarjeta con su nombre, para qué sirve y la frase de ejemplo de la sección 8.

**Aviso (siempre visible en este paso):**

> ⚠️ **Ojo: tu clon hablará como lo grabes.** Elige el estilo de los videos que vas a hacer. Si eliges varios, recibirás **un prompt por estilo** y grabarás cada uno en una sesión aparte, para que tu voz se mantenga pareja.

> ⚠️ **Heads up: your clone will sound the way you record it.** Pick the style of the content you'll create. If you pick several, you'll get **one prompt per style** and record each one in its own session, so your voice stays consistent.

### Paso 4 — Tema / Topic

| ES | EN |
|---|---|
| **¿De qué quieres hablar?** Elige un tema sugerido o escribe el tuyo. | **What do you want to talk about?** Pick a suggested topic or write your own. |

Tres caminos:

| Opción | ES | EN | Qué pasa |
|---|---|---|---|
| Tema sugerido | **Usar un guion listo** | **Use a ready-made script** | Si existe guion listo para ese estilo e idioma (sección 13), va directo al teleprompter. **Es el camino principal.** |
| Tema propio | **Escribir sobre mi tema** | **Write about my own topic** | Sigue al paso 5 y recibe el prompt para su IA. |
| Guion propio | **Ya tengo mi guion** | **I already have my script** | Lo pega y se revisa. |

Si el estilo elegido todavía no tiene guiones listos, los temas sugeridos también llevan al prompt.

Cada estilo tiene sus propios 5 temas (sección 9). Si se eligen varios estilos, el paso muestra un grupo de temas por estilo, y se elige uno en cada grupo. El tema propio, si se escribe, sirve para todos los estilos.

### Paso 5 — Tipo de clon / Clone type

| ES | EN |
|---|---|
| **Clon rápido:** unos 4 minutos por estilo. Ideal para probar. | **Quick clone:** about 4 minutes per style. Great for trying it out. |
| **Clon profesional:** 30 minutos o más, en partes de unos 10 minutos. Mejor calidad. | **Professional clone:** 30 minutes or more, in parts of about 10 minutes. Better quality. |
| *Revisa cuánto audio pide el servicio que usarás para clonar tu voz.* | *Check how much audio your voice-cloning service requires.* |

### Paso 6 — Tus prompts / Your prompts

| ES | EN |
|---|---|
| 1. Copia el prompt. | 1. Copy the prompt. |
| 2. Pégalo en tu IA (ChatGPT, Claude, Gemini…). | 2. Paste it into your AI (ChatGPT, Claude, Gemini…). |
| 3. Copia el guion con el botón **copiar** del bloque de código. | 3. Copy the script using the code block's **copy** button. |
| 4. Pégalo aquí y presiona **Revisar guion**. | 4. Paste it here and press **Check script**. |
| *Clon profesional: cuando termines una parte, escribe en el mismo chat el mensaje de continuación que te damos.* | *Professional clone: when you finish a part, send the continuation message we give you in the same chat.* |

---

## 3. Formato de marcado (ES / EN)

El teleprompter acepta los comandos en **ambos idiomas** como sinónimos.

| Español | English | Qué hace / What it does |
|---|---|---|
| `# Título` | `# Title` | Nueva sección / New section |
| `@fuerza 1-5` | `@energy 1-5` | Energía de toda la sección (justo debajo del título) / Energy for the whole section (right below the title) |
| `> nota` | `> note` | Indicación para quien lee; no se lee en voz alta / Reader direction; not read aloud |
| `**palabra**` | `**word**` | Palabra fuerte de la frase (máx. 1 por frase) / Strong word in the sentence (max 1) |
| `,` `.` `?` `!` | `,` `.` `?` `!` | Pausas y entonación automáticas / Automatic pauses and intonation |
| `[pausa]` · `[pausa 2s]` | `[pause]` · `[pause 2s]` | Pausa extra; al final de una frase o en línea propia / Extra pause; at the end of a sentence or on its own line |
| `[respira]` | `[breathe]` | Tomar aire; igual que la pausa / Take a breath; same as pause |
| `[lento]…[/lento]` | `[slow]…[/slow]` | Tramo lento / Slow passage |
| `[rápido]…[/rápido]` | `[fast]…[/fast]` | Tramo rápido / Fast passage |
| `[suave]…[/suave]` | `[soft]…[/soft]` | Tramo suave / Soft passage |
| `[fuerte]…[/fuerte]` | `[loud]…[/loud]` | Tramo con más energía / High-energy passage |
| `[sube]` | `[up]` | Entonación que sube; **al final de la pregunta, después del "?"** / Rising intonation; **at the end of the question, after the "?"** |
| `[baja]` | `[down]` | Entonación que baja; **siempre al final de la línea** / Falling intonation; **always at the end of the line** |
| `palabra{pro-nun-CIA}` | `word{pro-NUN-ci-a-tion}` | Pronunciación, sílaba tónica en mayúsculas / Pronunciation, stressed syllable in capitals |

**Reglas de combinación**
- Los tramos (`[lento]`, `[suave]`, etc.) **pueden abarcar varias líneas**, pero deben cerrarse dentro de la misma sección. Se pueden anidar si se cierran en orden inverso: `[lento][suave]…[/suave][/lento]`.
- Énfasis + pronunciación: `**Tajumulco{ta-hu-MUL-co}**`.
- **Una sola `@fuerza` por sección.** Si una parte necesita otra energía, va en otra sección.

**Límites (salvo que el estilo pida otra cosa)**
- Como máximo **2 `[pausa]` y 2 `[respira]` por sección**. Con más, se pierde el efecto.
- `[baja]` solo en la **última frase de una sección**.
- `[sube]` solo en **preguntas**, después del signo: `¿Qué hay en el fondo del mar? [sube]`.
- Énfasis: la cantidad por sección que indique el estilo (sección 8), nunca más de uno por frase.

**Pausas automáticas:** coma = corta · punto = media · cambio de sección = "Respira". **Las líneas en blanco no agregan pausa.**
**Entonación automática:** `¿…?` / `?` → sube · última frase de la sección → baja (salvo que se marque otra cosa).

---

## 4. Acentos

El texto de "Usa / Evita" se inserta en el prompt como `{GUIA_ACENTO}` / `{ACCENT_GUIDE}`. El acento se nota sobre todo al hablar; en el texto, lo importante es que **no suene ajeno** (por ejemplo, un chileno leyendo "carro" o "vosotros").

### Español

| Acento | Trato | Usa | Evita | Solo en Podcast y Reels |
|---|---|---|---|---|
| Chileno | Tú | harto, al tiro, auto, celular, computador, plata, "fíjate que" | carro, computadora, platicar, vosotros, voseo | cachai, po, bacán, fome |
| Latino neutro | Tú / ustedes | auto, celular, computadora, dinero | modismos regionales, vosotros, voseo | — |
| Mexicano | Tú / ustedes | carro, platicar, ahorita, celular, computadora, padre (bueno) | vosotros, voseo | chido, neta, güey |
| Rioplatense | Vos / ustedes | vos tenés, mirá, auto, plata, celular, computadora | tú, vosotros | che, re (re lindo), copado |
| Colombiano | Tú o usted | carro, celular, computador, plata, de una | vosotros, voseo | bacano, parce, chévere |
| España | Tú / vosotros | móvil, ordenador, coche, conducir, vale, vosotros | carro, celular, computadora, ustedes informal | mola, tío, guay |

Texto que se inserta, por ejemplo para chileno:
> `Trato de tú. Palabras de referencia (úsalas solo si encajan natural; no hace falta usarlas todas): harto, al tiro, auto, celular, computador, plata, "fíjate que". Evita: carro, computadora, platicar, vosotros, voseo.` (+ en Podcast y Reels: `Puedes usar con moderación: cachai, po, bacán, fome.`)

En inglés: `Reference words (use them only if they fit naturally; you don't need all of them): …`

### English

| Accent | Use | Avoid | Podcast & Reels only |
|---|---|---|---|
| American (US) | apartment, elevator, cell phone, vacation, feet, miles, Fahrenheit; US spelling (color) | flat, lift, mobile, holiday, metres | gonna, wanna, awesome, y'all |
| British (UK) | flat, lift, mobile, holiday, metres, Celsius; UK spelling (colour) | apartment, elevator, cell phone, vacation, feet | brilliant, cheers, mate, quite good |
| Neutral / International | plain international vocabulary, metric units | regional slang and idioms | — |

---

## 5. Duración, secciones y largo

Cada estilo tiene un **ritmo** (ppm = palabras por minuto), unas **palabras por sección**, unas **frases por sección** y una **cantidad de énfasis por sección**. Las frases y los énfasis se piden como cantidades porque las IAs cuentan mejor frases que palabras y no respetan proporciones.

- `palabras = minutos × ppm`
- `secciones = palabras ÷ palabras por sección` (redondeado)
- **Estilos con secciones cortas** (Documental: preguntas al inicio y cierre al final; Suspenso: cierre al final): cada sección corta cuenta como unas 50 palabras, y el resto se reparte en secciones completas.
  `completas = (palabras − 50 × cortas) ÷ palabras por sección` (redondeado) · `secciones = completas + cortas`
  En el clon profesional, cada parte lleva sus propias secciones cortas, como un mini episodio.

### Línea de largo (`{LARGO}` / `{LENGTH}`)

| Caso | ES | EN |
|---|---|---|
| Sin secciones cortas | `{SECCIONES} secciones. Cada sección tiene {FRASES} frases (unas {PALABRAS_SECCION} palabras).` | `{SECTIONS} sections. Each section has {SENTENCES} sentences (about {SECTION_WORDS} words).` |
| Documental | `{SECCIONES} secciones: la primera (preguntas) y la última (cierre) son cortas; cada una de las otras {COMPLETAS} tiene {FRASES} frases (unas {PALABRAS_SECCION} palabras).` | `{SECTIONS} sections: the first (questions) and the last (closing) are short; each of the other {FULL} has {SENTENCES} sentences (about {SECTION_WORDS} words).` |
| Suspenso | `{SECCIONES} secciones: la última es muy corta; cada una de las otras {COMPLETAS} tiene {FRASES} frases (unas {PALABRAS_SECCION} palabras).` | `{SECTIONS} sections: the last one is very short; each of the other {FULL} has {SENTENCES} sentences (about {SECTION_WORDS} words).` |

| Estilo | ppm | Palabras por sección | Frases por sección `{FRASES}` | Énfasis por sección `{ENFASIS}` | Clon rápido (4 min) | Parte profesional (10 min) |
|---|---|---|---|---|---|---|
| 1 Documental | 140 | 110 | 9 a 11 | 3 o 4 | 560 → 6 secciones (2 cortas + 4) | 1 400 → 14 secciones (2 cortas + 12) |
| 2 Noticiero | 155 | 125 (una nota) | 9 a 11 | 3 o 4 | 620 → 5 | 1 550 → 12 |
| 3 Audiolibro | 130 | 130 | 10 a 13 | 2 o 3 | 520 → 4 | 1 300 → 10 |
| 4 Podcast | 145 | 115 | 9 a 12 | 2 o 3 | 580 → 5 | 1 450 → 13 |
| 5 Comercial | 165 | 80 (un anuncio) | 9 a 11 | 5 a 7 | 660 → 8 | 1 650 → 21 |
| 6 Tutorial | 130 | 105 | 8 a 10 | 3 o 4 | 520 → 5 | 1 300 → 12 |
| 7 Motivacional | 140 | 110 | 12 a 15 | 6 a 8 | 560 → 5 | 1 400 → 13 |
| 8 Suspenso | 120 | 120 | 11 a 13 | 2 o 3 | 480 → 5 (1 corta + 4) | 1 200 → 11 (1 corta + 10) |
| 9 Reels | 170 | 100 (un clip) | 13 a 16 | 6 a 9 | 680 → 7 | 1 700 → 17 |
| 10 Meditación | 100 | 80 | 8 a 10 | 0 o 1 | 400 → 5 | 1 000 → 13 |

- **Clon profesional:** 3 partes por defecto (≈ 30 min por estilo), ampliable a 6 (≈ 60 min).
- El ppm también es la **velocidad inicial del teleprompter** para ese estilo.
- **Nota de implementación:** hoy el tiempo de cada palabra se calcula con 2,2 sílabas por palabra, que vale para español. En inglés las palabras son más cortas (≈ 1,4–1,5 sílabas), así que ese valor debe depender del idioma.

### Variables por estilo

Estas reglas cambian según el estilo, así que no van fijas en el prompt base: la web las rellena. Así el prompt armado nunca se contradice. Si una variable queda vacía, la web quita su línea.

**`{REGLA_FRASES}` / `{SENTENCE_RULE}`**

| Estilos | ES | EN |
|---|---|---|
| Todos, salvo Comercial y Reels | Frases simples y directas, de 20 palabras como máximo. Varía el largo: mezcla frases cortas (5 a 8 palabras) y medianas (12 a 18). | Simple, direct sentences of 20 words max. Vary the length: mix short sentences (5 to 8 words) and medium ones (12 to 18). |
| Comercial | Frases simples y directas, de 12 palabras como máximo. Varía el largo: mezcla frases muy cortas (3 a 6 palabras) y cortas (7 a 12). | Simple, direct sentences of 12 words max. Vary the length: mix very short sentences (3 to 6 words) and short ones (7 to 12). |
| Reels | Frases simples y directas, de 10 palabras como máximo. Varía el largo: mezcla frases muy cortas (3 a 5 palabras) y cortas (6 a 10). | Simple, direct sentences of 10 words max. Vary the length: mix very short sentences (3 to 5 words) and short ones (6 to 10). |

**`{CONTENIDO_MINIMO}` / `{MIN_CONTENT}`**

| Estilos | ES | EN |
|---|---|---|
| Documental, Podcast, Tutorial, Motivacional | Incluye al menos 2 preguntas, 2 frases completas entre ¡ y ! y 1 enumeración ("A, B y C"). | Include at least 2 questions, 2 full sentences ending with ! and 1 list ("A, B and C"). |
| Noticiero | Incluye 1 enumeración ("A, B y C") y como máximo 1 frase entre ¡ y !. Las preguntas son opcionales. | Include 1 list ("A, B and C") and at most 1 sentence ending with !. Questions are optional. |
| Audiolibro | Incluye al menos 1 pregunta, 2 exclamaciones dentro de los diálogos y 1 enumeración ("A, B y C"). | Include at least 1 question, 2 exclamations inside the dialogue and 1 list ("A, B and C"). |
| Comercial | Incluye al menos 1 pregunta en total, 1 frase entre ¡ y ! en cada anuncio y 1 enumeración de beneficios en cada anuncio. | Include at least 1 question overall, 1 sentence ending with ! in each ad and 1 list of benefits in each ad. |
| Suspenso | Incluye al menos 2 preguntas sin respuesta, 1 enumeración ("A, B y C") y como máximo 1 frase entre ¡ y !. | Include at least 2 unanswered questions, 1 list ("A, B and C") and at most 1 sentence ending with !. |
| Reels | Incluye al menos 1 pregunta, 2 frases completas entre ¡ y ! y 1 enumeración ("A, B y C"). | Include at least 1 question, 2 full sentences ending with ! and 1 list ("A, B and C"). |
| Meditación | Incluye al menos 2 preguntas suaves y 1 enumeración ("A, B y C"). No uses exclamaciones: ningún ¡ ni !. | Include at least 2 gentle questions and 1 list ("A, B and C"). Don't use exclamations: no ! at all. |

**`{LIMITE_PAUSAS}` / `{PAUSE_LIMIT}`**

| Estilos | ES | EN |
|---|---|---|
| Todos, salvo los de abajo | Como máximo 2 [pausa] y 2 [respira] por sección. | At most 2 [pause] and 2 [breathe] per section. |
| Noticiero | Usa [pausa] solo entre notas: como máximo 1 por sección, al final. | Use [pause] only between items: at most 1 per section, at the end. |
| Reels | Casi sin pausas: como máximo 1 [pausa] por clip. | Almost no pauses: at most 1 [pause] per clip. |
| Meditación | Usa [respira] cada 2 o 3 frases y [pausa 3s] al final de cada sección. | Use [breathe] every 2 or 3 sentences and [pause 3s] at the end of each section. |

**`{REGLA_VARIEDAD}` / `{VARIETY_RULE}`**

| Estilos | ES | EN |
|---|---|---|
| Comercial, Reels, Noticiero | Varía la forma entre secciones: abre cada una de un modo distinto (pregunta, dato, exclamación o escena) y no repitas el mismo orden de tipos de frase. | Vary the shape between sections: open each one differently (question, fact, exclamation or scene) and don't repeat the same order of sentence types. |
| Los demás | *(vacía: se quita la línea)* | *(empty: the line is removed)* |

### Texto de parte (`{PARTE}` / `{PART}`)

Vacío en el clon rápido. En el profesional:

- **ES:** `Esta es la parte 1 de {TOTAL}. Cubre solo una parte del tema; las siguientes las pediré después y no deben repetir ideas ni frases.`
- **EN:** `This is part 1 of {TOTAL}. Cover only one part of the topic; I'll ask for the next parts later, and they must not repeat ideas or sentences.`

### Mensaje de continuación

- **ES:** `Continúa con la parte {N} de {TOTAL}: {LARGO} Cada sección con {ENFASIS} palabras con **. Mismas reglas y mismo formato. No repitas ideas ni frases de las partes anteriores. Entrega solo el guion, dentro de un bloque de código.`
- **EN:** `Continue with part {N} of {TOTAL}: {LENGTH} Each section with {EMPHASIS} words marked with **. Same rules and same format. Don't repeat ideas or sentences from previous parts. Return only the script, inside a code block.`

---

## 6. Prompt base — Español

Variables: `{IDIOMA}` `{ACENTO}` `{GUIA_ACENTO}` `{ESTILO}` `{BLOQUE_ESTILO}` `{TEMA}` `{LARGO}` `{ENFASIS}` `{PALABRAS}` `{MINUTOS}` `{PARTE}` · por estilo (sección 5): `{REGLA_FRASES}` `{CONTENIDO_MINIMO}` `{REGLA_VARIEDAD}` `{LIMITE_PAUSAS}`

```
Eres guionista experto en locución. Escribe un guion para que una persona lo lea
en voz alta y grabe su voz para crear un clon de voz con IA.

DATOS
- Idioma: {IDIOMA}
- Acento: {ACENTO}. {GUIA_ACENTO}
- Estilo: {ESTILO}
- Tema: {TEMA}
- Largo: {LARGO}
  En total, unas {PALABRAS} palabras ≈ {MINUTOS} minutos.
  Cuenta las frases de cada sección antes de entregar.
{PARTE}

CÓMO DEBE SONAR ESTE ESTILO
{BLOQUE_ESTILO}
Si el estilo contradice alguna regla de abajo, manda el estilo.

ESCRIBE COMO SE HABLA
- {REGLA_FRASES}
- Como máximo 2 adverbios terminados en "-mente" en todo el guion.
- Evita palabras de texto escrito (conforme, asimismo, considerablemente,
  "podemos mencionar") y no repitas el mismo adjetivo.
- {CONTENIDO_MINIMO}
- {REGLA_VARIEDAD}
- Usa, de forma natural, al menos una palabra con cada sonido:
  r inicial, rr, ñ, ll/y, j/ge/gi, ch, x, z/ce/ci, tr, bl, pl, cr, gl, pr, fr, dr.
  Ejemplos de referencia: río, tierra, año, lluvia, gente, noche, examen, cielo,
  tren, blanco, planeta, cristal, siglo (o regla, iglú, inglés), profundo, frío, piedra.
  No copies estos ejemplos: busca palabras que encajen con el tema.
- Las palabras de la guía de acento son referencia: úsalas solo si encajan natural.
- Escribe números, siglas y símbolos como se pronuncian ("mil trescientos", "por ciento").
- Usa datos generales correctos. Si no estás seguro de una cifra, no la pongas
  o redondéala con "cerca de".
- No inventes hechos sobre personas reales ni uses marcas comerciales reales.
- Nada de emojis, títulos decorativos ni acotaciones entre paréntesis.

ÉNFASIS
- En cada sección, marca con **palabra** exactamente {ENFASIS} palabras.
  Nunca más de una por frase; las demás frases van sin énfasis.
- Elige la palabra que carga el sentido: un dato, un contraste o algo nuevo.
  No la pongas por defecto al final de la frase.
  Bien: La presión es **mil** veces mayor que en la superficie.
  Mal:  La presión es mil veces mayor que en la **superficie**.

FORMATO OBLIGATORIO (el teleprompter lo lee automáticamente)
- # Título de sección   → una por cada sección pedida
- @fuerza 1-5           → justo debajo de cada título; vale para toda la sección
                          (si una parte necesita otra energía, haz otra sección)
- > nota                → una indicación breve para quien lee (no se lee en voz alta)
- [pausa] o [pausa 2s]  → pausa extra; al final de una frase o en su propia línea
- [respira]             → dónde tomar aire
- Pausas: {LIMITE_PAUSAS}
- [lento]...[/lento]  [rápido]...[/rápido]  [suave]...[/suave]  [fuerte]...[/fuerte]
                        → pueden abarcar varias líneas, cerrándose en la misma sección
- [sube]                → solo en preguntas, después del signo:
                          ¿Qué hay en el fondo del mar? [sube]
- [baja]                → solo al final de la última frase de una sección
                          Ejemplo: Y ahora ya sabes por qué. [baja]
- palabra{pro-nun-CIA}  → solo para nombres difíciles, sílaba tónica en mayúsculas;
                          con énfasis: **Tajumulco{ta-hu-MUL-co}**
- Una frase por línea. Las líneas en blanco solo separan; no hacen pausa.
- No uses ningún otro símbolo ni comando, y escríbelos exactamente así.

Entrega SOLO el guion, dentro de un bloque de código, sin explicaciones antes ni después.
```

---

## 7. Base prompt — English

Variables: `{LANGUAGE}` `{ACCENT}` `{ACCENT_GUIDE}` `{STYLE}` `{STYLE_BLOCK}` `{TOPIC}` `{LENGTH}` `{EMPHASIS}` `{WORDS}` `{MINUTES}` `{PART}` · per style (section 5): `{SENTENCE_RULE}` `{MIN_CONTENT}` `{VARIETY_RULE}` `{PAUSE_LIMIT}`

```
You are an expert voice-over scriptwriter. Write a script for a person to read aloud
and record their voice to create an AI voice clone.

DETAILS
- Language: {LANGUAGE}
- Accent: {ACCENT}. {ACCENT_GUIDE}
- Style: {STYLE}
- Topic: {TOPIC}
- Length: {LENGTH}
  In total, about {WORDS} words ≈ {MINUTES} minutes.
  Count the sentences in each section before you answer.
{PART}

HOW THIS STYLE SHOULD SOUND
{STYLE_BLOCK}
If the style contradicts any rule below, the style wins.

WRITE THE WAY PEOPLE SPEAK
- {SENTENCE_RULE}
- No more than 3 adverbs ending in "-ly" in the whole script.
- Avoid formal written words (furthermore, moreover, considerably,
  "it is worth mentioning") and don't repeat the same adjective.
- {MIN_CONTENT}
- {VARIETY_RULE}
- Naturally use at least one word with each sound:
  voiced th, voiceless th, r, l, v, b, sh, ch, j, zh, ng, w, wh,
  long and short vowels, and diphthongs.
  Reference examples: this, think, river, light, voice, blue, shell, chair, jump,
  measure, sing, water, whale, sheep, ship, now, boy.
  Don't copy these examples: find words that fit the topic.
- The accent guide words are a reference: use them only if they fit naturally.
- Write numbers, acronyms and symbols as spoken ("thirteen hundred", "percent").
- Use correct general facts. If you're not sure about a number, leave it out
  or round it with "about".
- Don't invent facts about real people or use real brand names.
- No emojis, decorative headings or stage directions in parentheses.

EMPHASIS
- In each section, mark exactly {EMPHASIS} words with **word**.
  Never more than one per sentence; the other sentences have no emphasis.
- Pick the word that carries the meaning: a fact, a contrast or something new.
  Don't put it at the end of the sentence by default.
  Good: The pressure is a **thousand** times greater than at the surface.
  Bad:  The pressure is a thousand times greater than at the **surface**.

REQUIRED FORMAT (the teleprompter reads it automatically)
- # Section title       → one for each requested section
- @energy 1-5           → right below each title; applies to the whole section
                          (if a part needs different energy, make another section)
- > note                → a short direction for the reader (not read aloud)
- [pause] or [pause 2s] → extra pause; at the end of a sentence or on its own line
- [breathe]             → where to take a breath
- Pauses: {PAUSE_LIMIT}
- [slow]...[/slow]  [fast]...[/fast]  [soft]...[/soft]  [loud]...[/loud]
                        → may span several lines, closing within the same section
- [up]                  → only on questions, after the question mark:
                          What's at the bottom of the sea? [up]
- [down]                → only at the end of the last sentence of a section
                          Example: And now you know why. [down]
- word{pro-NUN-ci-a-tion} → only for hard names, stressed syllable in capitals;
                          with emphasis: **Tajumulco{ta-hu-MUL-co}**
- One sentence per line. Blank lines only separate; they don't add a pause.
- Don't use any other symbol or command, and write them exactly as shown.

Return ONLY the script, inside a code block, with no explanation before or after.
```

---

## 8. Los 10 estilos de narración

Cada estilo tiene: nombre ES/EN, ppm, fuerza, frases y énfasis por sección, el bloque que se inserta en el prompt (`{BLOQUE_ESTILO}` / `{STYLE_BLOCK}`) y un ejemplo para la tarjeta de la quest. Las cantidades de frases y énfasis no van en el bloque: entran al prompt base a través de `{LARGO}` y `{ENFASIS}` (sección 5).

### Resumen

| # | ES | EN | ppm | Fuerza | Frases por sección | Énfasis por sección | Exclamaciones | Para qué sirve el clon |
|---|---|---|---|---|---|---|---|---|
| 1 | Documental | Documentary | 140 | 3–5 | 9 a 11 | 3 o 4 | ≥ 2 | YouTube explicativo, divulgación |
| 2 | Noticiero | News | 155 | 4 | 9 a 11 | 3 o 4 | ≤ 1 | Noticias, informes, resúmenes |
| 3 | Audiolibro | Audiobook | 130 | 2–4 | 10 a 13 | 2 o 3 | ≥ 2 (en diálogos) | Cuentos, libros, historias |
| 4 | Podcast | Podcast | 145 | 3–4 | 9 a 12 | 2 o 3 | ≥ 2 | Podcasts, voz casual |
| 5 | Comercial | Commercial | 165 | 5 | 9 a 11 | 5 a 7 | ≥ 1 por anuncio | Anuncios, promociones |
| 6 | Tutorial | Tutorial | 130 | 3 | 8 a 10 | 3 o 4 | ≥ 2 | Cursos, explicaciones paso a paso |
| 7 | Motivacional | Motivational | 140 | 3–5 | 12 a 15 | 6 a 8 | ≥ 2 | Charlas, contenido inspirador |
| 8 | Suspenso | Mystery | 120 | 2–4 | 11 a 13 | 2 o 3 | ≤ 1 | Misterio, casos, historias de intriga |
| 9 | Reels | Social media | 170 | 5 | 13 a 16 | 6 a 9 | ≥ 2 | TikTok, Shorts, Reels |
| 10 | Meditación | Calm | 100 | 1–2 | 8 a 10 | 0 o 1 | 0 | Relajación, guías para dormir |

---

### 1. Documental · Documentary — 140 ppm · fuerza 3–5

**ES — bloque**
> Tono de divulgación con seguridad, como un canal de YouTube explicativo. La primera sección (@fuerza 5) contiene solo 2 a 4 preguntas que enganchen, cada una terminada en [sube]; puede ser más corta que las demás. Las secciones del medio (@fuerza 4) explican con frases que avanzan hacia el dato clave, marcado con **. Pon [pausa] antes de cifras o datos sorprendentes. Incluye al menos una enumeración de lugares o nombres propios. La última sección (@fuerza 3) es corta e invita a seguir el canal; su última frase termina en [baja].

**EN — block**
> Confident explainer tone, like an educational YouTube channel. The first section (@energy 5) contains only 2 to 4 hook questions, each ending in [up]; it can be shorter than the others. The middle sections (@energy 4) explain with sentences that build toward the key fact, marked with **. Add [pause] before surprising numbers or facts. Include at least one list of places or proper names. The last section (@energy 3) is short and invites the listener to follow the channel; its last sentence ends in [down].

**Ejemplo / Example**
```
¿Por qué el océano es **salado**? [sube]
Cada año, los ríos arrastran [pausa] **millones** de toneladas de sal hacia el mar.
```
```
Why is the ocean **salty**? [up]
Every year, rivers carry [pause] **millions** of tons of salt into the sea.
```

---

### 2. Noticiero · News — 155 ppm · fuerza 4

**ES — bloque**
> Tono de noticiero: claro, neutral y con autoridad, sin opinar. Cada sección es una nota breve sobre el tema (@fuerza 4); la primera abre con un titular. La primera frase de cada nota resume lo esencial. Marca con ** cifras, nombres y fechas clave. Ritmo constante: usa [pausa] solo entre notas. Usa datos generales y verificables o hechos claramente ficticios; nunca atribuyas hechos inventados a personas o instituciones reales. Como máximo 1 exclamación en todo el guion. La última nota cierra con una despedida de noticiero.

**EN — block**
> News anchor tone: clear, neutral and authoritative, with no opinions. Each section is a short news item about the topic (@energy 4); the first one opens with a headline. The first sentence of each item sums up the essentials. Mark key numbers, names and dates with **. Keep a steady pace: use [pause] only between items. Use general, verifiable facts or clearly fictional events; never attribute invented facts to real people or institutions. At most 1 exclamation in the whole script. The last item closes with a newscast sign-off.

**Ejemplo / Example**
```
Buenas noches. Esta semana, la temperatura del océano alcanzó un nuevo **récord**.
Según los científicos, subió cerca de **un grado** en diez años.
```
```
Good evening. This week, ocean temperatures reached a new **record**.
According to scientists, they rose about **one degree** in ten years.
```

---

### 3. Audiolibro · Audiobook — 130 ppm · fuerza 2–4

**ES — bloque**
> Narración de cuento o audiolibro, con un narrador en tercera persona y uno o dos personajes. La historia, basada en el tema, debe tener inicio, conflicto y desenlace. Incluye diálogos cortos entre comillas para que quien lee cambie levemente el tono; las exclamaciones van en los diálogos. Usa [suave] en los momentos íntimos y [pausa 2s] en los giros de la historia. El énfasis va solo en las palabras que cambian el rumbo de la historia. Fuerza 2 en la primera sección, 4 en la sección del clímax y 2 en la última.

**EN — block**
> Storytelling or audiobook narration, with a third-person narrator and one or two characters. The story, based on the topic, must have a beginning, a conflict and a resolution. Include short dialogue lines in quotes so the reader can shift tone slightly; exclamations go in the dialogue. Use [soft] in intimate moments and [pause 2s] at the story's turning points. Emphasis goes only on words that change the course of the story. Energy 2 in the first section, 4 in the climax section and 2 in the last one.

**Ejemplo / Example**
```
Esa noche, Clara bajó al muelle [suave]sin hacer ruido[/suave].
"¿Escuchaste eso?", susurró. [pausa 2s] El agua se movía **sola**.
```
```
That night, Clara walked down to the pier [soft]without a sound[/soft].
"Did you hear that?" she whispered. [pause 2s] The water was moving **on its own**.
```

---

### 4. Podcast · Podcast — 145 ppm · fuerza 3–4

**ES — bloque**
> Tono conversacional, como si hablaras con un amigo en un podcast. Primera persona, frases naturales y alguna muletilla suave ("mira", "la verdad", "o sea"), como máximo una cada tres frases. Puedes usar con moderación los modismos del acento. Incluye preguntas al oyente ("¿te ha pasado?") y una anécdota breve. El énfasis va donde la emoción lo pide. Usa [pausa] como pausa para pensar antes de una opinión. Fuerza 3 en todas las secciones, salvo una de 4 en el momento más emotivo. La última sección invita a comentar.

**EN — block**
> Conversational tone, like talking to a friend on a podcast. First person, natural sentences and a few soft fillers ("look", "honestly", "I mean"), no more than one every three sentences. You may use the accent's casual expressions in moderation. Include questions to the listener ("has that ever happened to you?") and a short anecdote. Emphasis goes where the emotion calls for it. Use [pause] as a thinking pause before an opinion. Energy 3 in every section, except one at 4 for the most emotional moment. The last section invites comments.

**Ejemplo / Example**
```
Mira, la primera vez que vi el mar de noche, [pausa] me dio harto **miedo**.
¿A ti te ha pasado? [sube]
```
```
Look, the first time I saw the ocean at night, [pause] it honestly **scared** me.
Has that ever happened to you? [up]
```

---

### 5. Comercial · Commercial — 165 ppm · fuerza 5

**ES — bloque**
> Locución publicitaria con mucha energía. Inventa un producto o servicio ficticio relacionado con el tema (nunca marcas reales). Cada sección es un anuncio distinto de unos 30 segundos, con estos elementos: gancho, problema, solución, beneficios en enumeración y llamado a la acción. El llamado va siempre al final; el orden de los demás puede cambiar de un anuncio a otro. Frases de 12 palabras como máximo. Marca con ** el beneficio o la palabra que vende. Al menos una exclamación por anuncio. Usa [fuerte] en el llamado a la acción y [rápido] para una frase legal breve al final ("Aplican condiciones"). Fuerza 5 en todas las secciones.

**EN — block**
> High-energy advertising voice-over. Invent a fictional product or service related to the topic (never real brands). Each section is a different ad of about 30 seconds, with these elements: hook, problem, solution, list of benefits and call to action. The call to action always comes last; the order of the others can change from ad to ad. Sentences of 12 words max. Mark the benefit or selling word with **. At least one exclamation per ad. Use [loud] on the call to action and [fast] for a short legal line at the end ("Terms apply"). Energy 5 in every section.

**Ejemplo / Example**
```
¿Cansado de un café **amargo**? [sube]
[fuerte]¡Pruébalo hoy mismo![/fuerte] [rápido]Aplican condiciones.[/rápido]
```
```
Tired of **bitter** coffee? [up]
[loud]Try it today![/loud] [fast]Terms apply.[/fast]
```

---

### 6. Tutorial · Tutorial — 130 ppm · fuerza 3

**ES — bloque**
> Tono educativo, claro y paciente, como un profesor que explica paso a paso. Convierte el tema en algo que el oyente pueda entender o hacer, explicado en pasos ("primero", "segundo", "por último"). Marca con ** la acción o el concepto clave de cada paso. Pon [pausa] entre pasos. Incluye al menos una advertencia ("ojo con…") dentro de [fuerte]...[/fuerte]. La última sección es un resumen. Fuerza 3 en todas las secciones.

**EN — block**
> Educational tone, clear and patient, like a teacher explaining step by step. Turn the topic into something the listener can understand or do, explained in steps ("first", "second", "finally"). Mark the key action or concept of each step with **. Add [pause] between steps. Include at least one warning ("be careful with…") inside [loud]...[/loud]. The last section is a summary. Energy 3 in every section.

**Ejemplo / Example**
```
Primero, **activa** la ubicación del celular y espera unos segundos. [pausa]
[fuerte]Ojo: dentro de un edificio, la señal puede fallar.[/fuerte]
```
```
First, **turn on** location on your phone and wait a few seconds. [pause]
[loud]Careful: inside a building, the signal may fail.[/loud]
```

---

### 7. Motivacional · Motivational — 140 ppm · fuerza 3–5

**ES — bloque**
> Discurso motivacional que crece de menos a más. Usa el tema como metáfora de superación. Frases cortas y repeticiones intencionales ("No es fácil. No es rápido. Pero es posible."). Marca con ** la palabra que carga la emoción. Pon [pausa 2s] después de cada idea fuerte. Fuerza 3 en la primera sección, 4 en las del medio y 5 en la última. Cierra con una frase memorable dentro de [fuerte].

**EN — block**
> Motivational speech that builds from low to high. Use the topic as a metaphor for overcoming challenges. Short sentences and intentional repetition ("It's not easy. It's not fast. But it's possible."). Mark the word that carries the emotion with **. Add [pause 2s] after each strong idea. Energy 3 in the first section, 4 in the middle ones and 5 in the last. Close with a memorable line inside [loud].

**Ejemplo / Example**
```
No es fácil. No es rápido. Pero es **posible**. [pausa 2s]
[fuerte]¡Hoy empieza tu viaje![/fuerte]
```
```
It's not easy. It's not fast. But it's **possible**. [pause 2s]
[loud]Your journey starts today![/loud]
```

---

### 8. Suspenso · Mystery — 120 ppm · fuerza 2–4

**ES — bloque**
> Narración de misterio o suspenso, sin violencia explícita. Construye tensión con detalles sensoriales: sonidos, sombras, silencios. Usa [lento] y [suave] en los momentos de tensión y [pausa 2s] antes de cada revelación. El énfasis va solo en la palabra que inquieta. Como máximo 1 exclamación en todo el guion. Incluye preguntas sin respuesta terminadas en [sube]. Fuerza 2 en las primeras secciones, 4 en la sección de la revelación y 2 en una última sección muy corta.

**EN — block**
> Mystery or suspense narration, with no graphic violence. Build tension with sensory details: sounds, shadows, silences. Use [slow] and [soft] in tense moments and [pause 2s] before each reveal. Emphasis goes only on the unsettling word. At most 1 exclamation in the whole script. Include unanswered questions ending in [up]. Energy 2 in the first sections, 4 in the reveal section and 2 in a very short last section.

**Ejemplo / Example**
```
[lento]A dos mil metros de profundidad, no llega la luz.[/lento]
Y sin embargo, [pausa 2s] algo **brilla**. ¿Qué es? [sube]
```
```
[slow]Two thousand meters down, no light can reach.[/slow]
And yet, [pause 2s] something **glows**. What is it? [up]
```

---

### 9. Reels · Social media — 170 ppm · fuerza 5

**ES — bloque**
> Locución para videos cortos de redes sociales. Cada sección es un clip independiente de 30 a 45 segundos. Cada clip abre con un gancho en la primera línea ("Nadie te cuenta esto sobre…"). Frases de 10 palabras como máximo, ritmo rápido y casi sin pausas; usa [rápido] en datos encadenados. Puedes usar con moderación los modismos del acento. Cierra cada clip con un llamado ("Síguenos para más"). Fuerza 5 en todas las secciones.

**EN — block**
> Voice-over for short social media videos. Each section is a standalone clip of 30 to 45 seconds. Each clip opens with a hook on the first line ("Nobody tells you this about…"). Sentences of 10 words max, fast pace and almost no pauses; use [fast] for chained facts. You may use the accent's casual expressions in moderation. Close each clip with a call to action ("Follow for more"). Energy 5 in every section.

**Ejemplo / Example**
```
Nadie te cuenta esto sobre el **café**.
[rápido]Nació en Etiopía, viajó a Yemen y conquistó el mundo.[/rápido]
```
```
Nobody tells you this about **coffee**.
[fast]It was born in Ethiopia, traveled to Yemen and conquered the world.[/fast]
```

---

### 10. Meditación · Calm — 100 ppm · fuerza 1–2

**ES — bloque**
> Guía de relajación o meditación, con voz suave y lenta. Segunda persona e imperativos amables ("respira", "suelta", "imagina"). Usa el tema como paisaje para imaginar. Usa [lento] y [suave] en casi todo el guion, [respira] cada 2 o 3 frases y [pausa 3s] al final de cada sección. Sin exclamaciones. Casi sin énfasis. Fuerza 1 o 2 en todas las secciones. La última sección vuelve lentamente al presente.

**EN — block**
> Relaxation or meditation guide, with a soft, slow voice. Second person and gentle imperatives ("breathe", "let go", "imagine"). Use the topic as a landscape to imagine. Use [slow] and [soft] in almost the whole script, [breathe] every 2 or 3 sentences and [pause 3s] at the end of each section. No exclamations. Almost no emphasis. Energy 1 or 2 in every section. The last section slowly returns to the present.

**Ejemplo / Example**
```
[lento][suave]Cierra los ojos. Imagina el mar en calma.[/suave][/lento]
[respira] Siente cómo cada ola se lleva un poco de **cansancio**.
```
```
[slow][soft]Close your eyes. Imagine a calm sea.[/soft][/slow]
[breathe] Feel each wave carry away a little **tiredness**.
```

---

## 9. Los temas de cada estilo

Cada estilo tiene **sus propios 5 temas**, pensados para ese estilo: así, al elegir otro estilo no aparecen los mismos temas contados de otra forma. Los guiones listos (sección 13) siguen exactamente estos temas, y el número del archivo es el número del tema.

En la quest, el paso del tema muestra los 5 temas de cada estilo elegido. El usuario también puede escribir su propio tema. Los productos, ligas, ciudades y personajes de los temas son inventados: nunca marcas ni personas reales.

| Estilo | # | ES | EN |
|---|---|---|---|
| Documental | 1 | **El océano profundo:** animales, presión y oscuridad. | **The deep ocean:** creatures, pressure and darkness. |
| Documental | 2 | **La historia del chocolate:** del cacao maya a la tableta. | **The history of chocolate:** from Maya cacao to the bar. |
| Documental | 3 | **El desierto de Atacama:** el lugar más seco del planeta. | **The Atacama Desert:** the driest place on the planet. |
| Documental | 4 | **Cómo sabe tu celular dónde estás:** satélites y señales. | **How your phone knows where you are:** satellites and signals. |
| Documental | 5 | **Los nervios del primer día:** qué pasa en el cuerpo y cómo calmarlos. | **First-day nerves:** what happens in your body and how to calm them. |
| Noticiero | 1 | **El clima de la semana:** el pronóstico de una ciudad inventada, día por día. | **This week's weather:** the forecast for a made-up city, day by day. |
| Noticiero | 2 | **La final del campeonato:** un partido decisivo de una liga inventada. | **The championship final:** a deciding match in a made-up league. |
| Noticiero | 3 | **La lluvia de estrellas de esta noche:** qué es, a qué hora y cómo verla. | **Tonight's meteor shower:** what it is, when and how to see it. |
| Noticiero | 4 | **El nuevo tren de la ciudad:** la inauguración de una línea en una ciudad inventada. | **The city's new train:** the opening of a line in a made-up city. |
| Noticiero | 5 | **Noticiero de Villa Serena:** las noticias pequeñas de un pueblo inventado. | **The Villa Serena newscast:** the small news of a made-up town. |
| Audiolibro | 1 | **La guardiana del faro:** una noche de tormenta y un barco perdido. | **The lighthouse keeper:** a stormy night and a lost ship. |
| Audiolibro | 2 | **El reloj que se atrasaba:** un relojero y un reloj con un secreto. | **The clock that ran late:** a watchmaker and a clock with a secret. |
| Audiolibro | 3 | **La carta que llegó cuarenta años tarde:** un cartero y un amor antiguo. | **The letter that arrived forty years late:** a mail carrier and an old love. |
| Audiolibro | 4 | **El perro que esperaba en la estación:** una amistad de todos los días. | **The dog who waited at the station:** an everyday friendship. |
| Audiolibro | 5 | **La niña que coleccionaba nubes:** un cuento para soñar. | **The girl who collected clouds:** a story for dreaming. |
| Podcast | 1 | **Cocinando con mi abuela:** recetas, recuerdos y desastres en la cocina. | **Cooking with my grandma:** recipes, memories and kitchen disasters. |
| Podcast | 2 | **Mi primera mascota:** lo que aprendí cuidando a otro ser. | **My first pet:** what I learned caring for another living being. |
| Podcast | 3 | **Cómo dejé de dejarlo todo para mañana:** mi pelea con la procrastinación. | **How I stopped putting everything off:** my fight with procrastination. |
| Podcast | 4 | **Mi peor corte de pelo:** una historia de vergüenza y risa. | **My worst haircut:** a story of embarrassment and laughter. |
| Podcast | 5 | **Aprender algo nuevo de grande:** tocar un instrumento después de los treinta. | **Learning something new as an adult:** picking up an instrument after thirty. |
| Comercial | 1 | **Una heladería artesanal:** sabores, ingredientes y el local. | **An artisan ice cream shop:** flavors, ingredients and the shop. |
| Comercial | 2 | **Un gimnasio de barrio:** clases, horarios y comunidad. | **A neighborhood gym:** classes, schedules and community. |
| Comercial | 3 | **Zapatillas para correr:** comodidad, diseño y duración. | **Running shoes:** comfort, design and durability. |
| Comercial | 4 | **Un viaje en tren:** paisajes, comodidad y destinos. | **A train journey:** scenery, comfort and destinations. |
| Comercial | 5 | **Una app para aprender idiomas:** lecciones cortas, práctica y progreso. | **A language-learning app:** short lessons, practice and progress. |
| Tutorial | 1 | **Cómo hacer pan casero:** ingredientes, amasado y horneado. | **How to make homemade bread:** ingredients, kneading and baking. |
| Tutorial | 2 | **Un huerto en el balcón:** macetas, tierra, riego y primeras cosechas. | **A balcony garden:** pots, soil, watering and first harvests. |
| Tutorial | 3 | **Cómo grabar tu voz en casa:** el lugar, el micrófono y la grabación. | **How to record your voice at home:** the room, the microphone and the recording. |
| Tutorial | 4 | **Cómo armar una mochila de viaje:** qué llevar y cómo ordenarlo. | **How to pack a travel backpack:** what to bring and how to organize it. |
| Tutorial | 5 | **Cómo cuidar plantas de interior:** luz, agua y errores comunes. | **How to care for houseplants:** light, water and common mistakes. |
| Motivacional | 1 | **Empezar de nuevo:** cuando un plan se cae y hay que volver a empezar. | **Starting over:** when a plan falls apart and you begin again. |
| Motivacional | 2 | **El poder de los pasos pequeños:** hábitos que lo cambian todo. | **The power of small steps:** habits that change everything. |
| Motivacional | 3 | **Fallar sin rendirse:** lo que enseñan los errores. | **Failing without giving up:** what mistakes teach you. |
| Motivacional | 4 | **Tu primera carrera:** del sillón a la meta. | **Your first race:** from the couch to the finish line. |
| Motivacional | 5 | **Cuidar tu energía:** descanso, límites y prioridades. | **Protecting your energy:** rest, boundaries and priorities. |
| Suspenso | 1 | **La casa del final de la calle:** una luz que se enciende en una casa vacía. | **The house at the end of the street:** a light that turns on in an empty house. |
| Suspenso | 2 | **El tren que no aparece en el horario:** un viaje nocturno que no debería existir. | **The train that isn't on the schedule:** a night trip that shouldn't exist. |
| Suspenso | 3 | **La llamada de las tres de la mañana:** una voz conocida desde un número imposible. | **The three a.m. call:** a familiar voice from an impossible number. |
| Suspenso | 4 | **El pueblo que desapareció del mapa:** un lugar que nadie recuerda. | **The town that vanished from the map:** a place nobody remembers. |
| Suspenso | 5 | **El retrato del ático:** una pintura que parece cambiar. | **The portrait in the attic:** a painting that seems to change. |
| Reels | 1 | **Datos curiosos del cuerpo humano:** lo que tu cuerpo hace sin que lo notes. | **Fun facts about the human body:** what your body does without you noticing. |
| Reels | 2 | **Animales con superpoderes:** habilidades reales que parecen ficción. | **Animals with superpowers:** real abilities that sound like fiction. |
| Reels | 3 | **Trucos de cocina:** atajos simples que funcionan. | **Kitchen hacks:** simple shortcuts that work. |
| Reels | 4 | **Inventos que nacieron por accidente:** errores que cambiaron el mundo. | **Inventions born by accident:** mistakes that changed the world. |
| Reels | 5 | **Récords de la naturaleza:** lo más alto, lo más rápido y lo más antiguo. | **Nature's records:** the tallest, the fastest and the oldest. |
| Meditación | 1 | **Lluvia en la ventana:** escuchar la lluvia desde un lugar seguro. | **Rain on the window:** listening to the rain from a safe place. |
| Meditación | 2 | **Un campo de lavanda:** caminar despacio bajo el sol de la tarde. | **A lavender field:** a slow walk under the afternoon sun. |
| Meditación | 3 | **Una noche estrellada:** mirar el cielo y soltar el día. | **A starry night:** looking at the sky and letting go of the day. |
| Meditación | 4 | **Relajar el cuerpo para dormir:** un recorrido de la cabeza a los pies. | **Relaxing your body for sleep:** a journey from head to toe. |
| Meditación | 5 | **Un río de montaña:** el agua que corre y se lleva las preocupaciones. | **A mountain river:** running water that carries your worries away. |

---|---|---|
| 1 | **El océano profundo:** animales, presión, oscuridad. | **The deep ocean:** creatures, pressure, darkness. |
| 2 | **La historia de algo cotidiano:** el café, la bicicleta o el chocolate. | **The story of an everyday thing:** coffee, the bicycle or chocolate. |
| 3 | **Un viaje por un lugar:** la Patagonia, una gran ciudad o un desierto. | **A journey through a place:** Patagonia, a big city or a desert. |
| 4 | **Cómo funciona la tecnología de todos los días:** la ubicación del celular, el wifi o la cámara. | **How everyday technology works:** phone location, wifi or the camera. |
| 5 | **Una anécdota personal ficticia:** un primer día de trabajo o un viaje que salió mal. | **A fictional personal story:** a first day at work or a trip that went wrong. |

El usuario también puede escribir su propio tema. Los temas son generales a propósito: cada bloque de estilo le indica a la IA cómo adaptarlos (por ejemplo, Comercial inventa un producto ficticio y Meditación lo usa como paisaje).

---

## 10. Validación del guion pegado

Al presionar **Revisar guion**, el teleprompter revisa el texto y muestra avisos. Solo los **errores** impiden empezar; los avisos se pueden ignorar.

| Revisión | Tipo | Aviso ES | Warning EN |
|---|---|---|---|
| `**` o `[tramo]` sin cerrar, o cerrados en otro orden | Error | Falta cerrar una marca. | A mark isn't closed. |
| `@fuerza` fuera de 1–5 o directiva desconocida | Error | Fuerza o directiva no válida. | Invalid energy or directive. |
| Hay dígitos (`1.300`, `25%`) | Aviso | Escribe los números en palabras. | Write numbers out in words. |
| Siglas en mayúsculas (`ONU`) | Aviso | Revisa cómo se pronuncia esta sigla. | Check how this acronym is pronounced. |
| Frase más larga que el máximo del estilo (20; 12 en Comercial; 10 en Reels) | Aviso | Frase muy larga: agrega una coma o divídela. | Sentence too long: add a comma or split it. |
| Más de un `**` en una frase | Aviso | Deja solo una palabra fuerte por frase. | Keep only one strong word per sentence. |
| **Énfasis por sección fuera de lo pedido** (±1) | Aviso | Esta sección tiene pocos (o demasiados) énfasis. | This section has too few (or too many) emphases. |
| **Ningún énfasis en todo el guion** (en estilos que los piden) | Aviso, en lugar de los avisos por sección | Los asteriscos se perdieron al copiar el texto con formato: usa el botón Copiar del bloque de código. | The asterisks were lost when copying formatted text: use the code block's Copy button. |
| **Frases por sección fuera de lo pedido** (±2) | Aviso | Esta sección es más corta (o larga) que lo pedido. | This section is shorter (or longer) than requested. |
| **Más de 2 `[pausa]` en una sección** (salvo Meditación) | Aviso | Demasiadas pausas: se pierde el efecto. | Too many pauses: they lose their effect. |
| **Más de 2 `[baja]` en una sección** | Aviso | Usa `[baja]` solo en la última frase. | Use `[down]` only on the last sentence. |
| **`[sube]` en una frase que no es pregunta** | Aviso | Revisa si de verdad debe subir. | Check whether it should really rise. |
| **Comando mal escrito** (`[llento]`) | Aviso | ¿Quisiste decir `[lento]`? | Did you mean `[slow]`? |
| **≥ 80 % de los énfasis en la última palabra** | Aviso | El énfasis parece puesto en automático al final de la frase. | Emphasis looks automatic, always at the end. |
| **`[sube]` / `[baja]` solo o al inicio de la línea** | Aviso | Debe ir al final de la frase que modifica. | It must go at the end of the sentence it changes. |
| **Más de 2 adverbios en -mente** (3 en -ly) | Aviso | Suena a texto escrito: simplifica estas palabras. | Sounds written, not spoken: simplify these words. |
| **Menos exclamaciones o preguntas que las pedidas** | Aviso | Faltan exclamaciones (o preguntas). | Missing exclamations (or questions). |
| **Secciones o palabras lejos de lo pedido** (±1 sección, ±15 % palabras) | Aviso | El guion es más corto (o largo) que lo pedido. | The script is shorter (or longer) than requested. |
| **Estructura repetida**: ≥ 75 % de las secciones con la misma secuencia de tipos de frase, o varias posiciones que abren casi siempre con la misma palabra | Aviso | Las secciones siguen la misma plantilla: conviene más variedad para el clon. | The sections follow the same template: more variety helps the clone. |
| Faltan sonidos del idioma | Aviso | Faltan palabras con estos sonidos: … | Missing words with these sounds: … |
| Comando desconocido (`[gritar]`) | Aviso | Comando no reconocido; se mostrará como texto. | Unknown command; it will be shown as text. |
| Sección sin `@fuerza` | Aviso | Se usará fuerza 3. | Energy 3 will be used. |
| Texto antes de la primera sección o marcas ` ``` ` | Aviso | Parece que se copió texto extra de la IA. | It looks like extra AI text was copied. |
| Emojis | Aviso | Se quitarán los emojis. | Emojis will be removed. |

---

## 11. Historial de pruebas

### Prueba con el prompt v1 — Documental · español · chileno · "El océano profundo" · 560 palabras

| | Gemini | ChatGPT |
|---|---|---|
| Errores de formato | 0 | 0 |
| Largo | 300 (−46 %) | 587 (+5 %) |
| Énfasis | 24, 22 al final de la frase | 6 en total |
| `[sube]` / `[baja]` | `[baja]` suelto en líneas aparte | Bien ubicados |
| Exclamaciones | 0 | 0 |
| Acento chileno | Algo ("auto", "computadores") | Nada, neutro y formal |
| Suena hablado | Más o menos | Poco (11 adverbios en -mente) |
| Datos | "Presión atmosférica", cifras fuera de contexto | Casi todos bien (Marianas: unos 10 900 m, no "más de 11 000") |

Los problemas encontrados dieron origen a los cambios de la sección 0.

Los guiones de esta prueba y el validador están en las carpetas `tests/` y `tools/`.

### Prueba con el prompt v1.1 — mismo caso, con ChatGPT, Gemini y Qwen

Prompt: `tests/prompts/v1.1-documentary-es.txt`. Revisión con:

```
node tools/validate-script.js <guion.txt> --lang es --style documentary --words 560 --sections 5
```

| | ChatGPT | Gemini | Qwen |
|---|---|---|---|
| Errores de formato | 0 | 0 | 0 (pero escribió `[llento]`) |
| Largo (560) | 475 (−15 %) | 294 (−47 %) | **518 (−8 %)** |
| Secciones (5) | 5 ✓ | 5 ✓ | 5 ✓ |
| Énfasis | 5 en 43 frases (pocos) | 32 en 32 frases (todas) | 8 en 70 frases (pocos) |
| Énfasis al final | Ya no | Ya no (13 de 32) | Ya no |
| Exclamaciones (≥ 2) | **2 ✓** | 1 | 0 |
| Adverbios en -mente (≤ 2) | **✓ (antes 11)** | ✓ | ✓ |
| Acento chileno | **Natural** ("fíjate que", "harto", "auto") | Forzado ("plata" y "computador" metidos) | Forzado ("al tiro", "celular", "computador" metidos) |
| `[sube]` / `[baja]` | `[baja]` en 8 frases seguidas | `[baja]` bien ubicado; `[pausa]` en casi todas las líneas | `[sube]` en una frase que no es pregunta |
| Suena hablado | Sí | Más o menos | Frases muy cortas y entrecortadas (70 frases) |
| Datos | Correctos | Exageraciones ("aplasta un auto al instante") | Un error ("cascos de cristal" en submarinos) |

**Lo que funcionó:** las reglas con **cantidades concretas** se cumplieron (exclamaciones y adverbios en ChatGPT). El énfasis ya no se pone en automático al final. Ninguna IA dejó `[sube]` o `[baja]` sueltos.

**Lo que no funcionó:**
1. **"Un énfasis cada 2 o 3 frases" no se respeta**: dos IAs ponen muy pocos y Gemini pone uno en cada frase. Las reglas en forma de proporción fallan; las cantidades concretas funcionan.
2. **Gemini sigue entregando la mitad del largo**, aunque se pida por sección. Las IAs cuentan mal palabras; contar frases les resulta más fácil.
3. **Efecto lista de compras:** Gemini y Qwen metieron a la fuerza las palabras de la guía de acento y algunos ejemplos de sonidos ("la gente científica", "queda mucha plata por invertir").
4. **Exceso de marcas:** `[pausa]` en casi todas las líneas (Gemini) y `[baja]` en todas las frases del cierre (ChatGPT). Parte del problema es nuestro: el bloque Documental pide "frases terminadas en [baja]" en plural.

**Cambios propuestos para v1.2** (aplicados; ver sección 0):
- Énfasis como cantidad: "**3 o 4 palabras con ** por sección**" (según el estilo).
- Largo en frases además de palabras: "cada sección con **9 a 11 frases** de unas 11 palabras".
- "Las palabras de la guía de acento y los ejemplos de sonidos son **referencia**: úsalas solo si encajan natural; no copies los ejemplos."
- Límites de marcas: como máximo 2 `[pausa]` por sección; `[baja]` solo en la última frase de la sección; `[sube]` solo en preguntas.
- Corregir el bloque Documental: "la última frase termina en [baja]".

El validador ya revisa los nuevos casos: `[sube]` en frases que no son preguntas, demasiadas pausas por sección y más de 2 `[baja]` por sección.

### Prueba con el prompt v1.2 — mismo caso, con ChatGPT y Gemini

Prompt: `tests/prompts/v1.2-documentary-es.txt`. Qwen no se probó en esta ronda.

| | ChatGPT v1.1 → **v1.2** | Gemini v1.1 → **v1.2** |
|---|---|---|
| Errores de formato | 0 → **0** | 0 → **0** |
| Énfasis por sección (3 o 4) | 1 → **3 en todas ✓** | 8–9 → **2–4 ✓** |
| `[pausa]` por sección (≤ 2) | ✓ → **✓** | 8–9 → **≤ 2 ✓** |
| `[baja]` solo al final | 8 en el cierre → **1 ✓** | 4 → **1 ✓** |
| Frases por sección (9 a 11) | — → **10–12 ✓** | — → **10 ✓** |
| Largo (560) | 475 → 466 | 294 → 335 |
| Exclamaciones (≥ 2) | 2 → **3 ✓** | 1 → 0 |
| Preguntas con `[sube]` | ✓ → `[sube]` **antes** del "?" | ✓ → **quitó los "?"** de 2 preguntas |
| Acento chileno | Natural → neutro (sin palabras chilenas, pero nada ajeno) | Forzado → más natural ("harto", "al tiro", "cordillera") |
| Datos y redacción | Correctos; un error de concordancia ("lo pequeño que somos") | Frases sin sentido ("cazar o **chocar** con otros de su especie"), notas contradictorias |

**Lo que funcionó:** las cantidades por sección. Por primera vez **las dos IAs** respetaron los énfasis, las pausas, los `[baja]` y las frases por sección. Gemini dejó de marcar cada frase y de poner `[pausa]` en cada línea.

**Lo que falta:**
1. **`[sube]` mal escrito en las dos IAs**, de formas distintas: ChatGPT lo puso antes del "?" (`llegar [sube]?`) y Gemini borró los signos de pregunta. El prompt dice dónde va `[sube]` pero no muestra un ejemplo con el signo.
2. **El largo pedido no cuadra con nuestra propia estructura.** El Documental pide que la primera sección (preguntas) y la última (cierre) sean cortas, pero el cálculo de 560 palabras suponía 5 secciones completas. Con 2 secciones cortas y 3 completas, lo esperable son unas 450 palabras: **ChatGPT (466) cumplió**; Gemini (335) sigue un 25 % corto porque escribe frases más breves.
3. **Gemini sigue sin exclamaciones** (0 de 2), aunque ChatGPT sí las pone.
4. **Falta el sonido "gl" en todas las pruebas.** El ejemplo "glaciar" no encaja con el tema del océano y, como pedimos no copiar ejemplos, la IA no busca otro.

**Cambios propuestos para v1.3** (aplicados; ver sección 0):
- Ejemplo de pregunta en el prompt: `¿Qué hay en el fondo del mar? [sube]` (primero el signo, después `[sube]`).
- En los estilos con secciones cortas (Documental y Suspenso), la línea de largo dice cuáles son cortas y **suma secciones completas** para llegar al total. Ejemplo para Documental (560): "6 secciones: la primera (preguntas) y la última (cierre) son cortas; las otras 4 tienen 9 a 11 frases".
- Exclamaciones más concretas: "Escribe al menos 2 frases completas entre ¡ y !".
- Más ejemplos de "gl" que encajen en cualquier tema (siglo, regla, iglú, inglés).

**Conclusión hasta ahora:** después de tres rondas, **ChatGPT es la IA más confiable**: respeta el formato, escribe natural y no inventa datos. Gemini mejora con cada versión, pero su redacción sigue siendo menos cuidada.

### Prueba con el prompt v1.3 — mismo caso, con ChatGPT y Gemini

Prompt: `tests/prompts/v1.3-documentary-es.txt`. Revisión con:

```
node tools/validate-script.js <guion.txt> --lang es --style documentary --words 560 --sections 6
```

| | ChatGPT | Gemini |
|---|---|---|
| Errores de formato | 0 | 0 |
| Preguntas con `[sube]` después del "?" | **✓ (arreglado)** | **✓ (arreglado)** |
| Exclamaciones (≥ 2) | 2 ✓ | **2 ✓ (antes 0)** |
| Énfasis por sección (3 o 4) | 3–4 ✓ | 2–4 ✓ |
| Pausas y `[baja]` | ✓ | ✓ |
| Secciones (6) | 5 ❌ (unió preguntas e introducción) | 5 ❌ (solo 3 secciones completas) |
| Largo (560) | **489 ✓** (−13 %) | 445 (−21 %; antes −40 %) |
| Sonido "gl" | Falta | Falta (y "dr") |
| Acento chileno | Neutro | Natural ("fíjate que", "al tiro", "harto") |
| Datos | Correctos | Un error ("el calamar vampiro" no es un gigante) y una cifra discutible ("noventa por ciento") |
| Redacción | Buena | **Buena (ya sin frases sin sentido)** |

**Lo que funcionó:** el ejemplo de `[sube]` arregló las preguntas en las dos IAs, y la regla "frases completas entre ¡ y !" hizo que Gemini pusiera exclamaciones por primera vez.

**Lo que no funcionó:**
- **Ninguna IA hizo 6 secciones.** Las dos hicieron 5. ChatGPT volvió a mezclar las preguntas con una introducción narrativa en la primera sección (también lo hizo en la v1.1).
- **El sonido "gl" sigue faltando** después de cuatro rondas, aunque se den ejemplos. El validador ahora lo marca como menor cuando faltan uno o dos sonidos: se pueden cubrir en otro guion de la misma sesión.
- Gemini pone pronunciación a nombres fáciles (`Atacama{a-ta-CA-ma}`). No molesta, pero sobra.

### Evolución del Documental en las cuatro versiones

| | v1 | v1.1 | v1.2 | v1.3 |
|---|---|---|---|---|
| ChatGPT: avisos del validador | 6 | 6 | 6 | **2** |
| Gemini: avisos del validador | 16 | 11 | 7 | **3** |
| ChatGPT: largo | 587 | 475 | 466 | 489 |
| Gemini: largo | 300 | 294 | 335 | **445** |

(Avisos contados con el validador actual, para comparar todas las versiones con la misma vara.)

### Prueba de otros estilos con el prompt v1.3 — pendiente

Dos estilos con reglas muy distintas al Documental, en otro idioma, otro acento y otros temas, para ver si el prompt funciona fuera del caso con que lo ajustamos.

| | Meditación | Comercial |
|---|---|---|
| Prompt | `tests/prompts/v1.3-calm-en.txt` | `tests/prompts/v1.3-commercial-es.txt` |
| Idioma y acento | Inglés, US | Español, latino neutro |
| Tema | Un viaje por un lugar | La historia de algo cotidiano |
| Estructura | 5 secciones de 8 a 10 frases (≈ 400 palabras) | 8 anuncios de 9 a 11 frases (≈ 660 palabras) |
| Qué pone a prueba | Que **el estilo mande sobre el prompt base**: sin exclamaciones (el base pide 2), muchas pausas (el base limita a 2), 0 o 1 énfasis | Frases de 12 palabras como máximo, 5 a 7 énfasis por sección, una exclamación por anuncio, `[fuerte]` y `[rápido]`, producto ficticio |
| Revisión | `--lang en --style calm --words 400 --sections 5` | `--lang es --style commercial --words 660 --sections 8` |

#### Resultado: Meditación en inglés

| | Gemini | ChatGPT |
|---|---|---|
| Errores de formato | 0 | 0 |
| Avisos del validador | **1** (falta "zh") | 2 (exclamaciones y falta "zh") |
| Largo (400) | **405 ✓** | 450 ✓ (+12 %) |
| Secciones y frases | 5 de 8 ✓ | 5 de 9 a 11 ✓ |
| Énfasis (0 o 1 por sección) | 1 en total ✓ | 1 por sección ✓ |
| Exclamaciones (el estilo pide 0; el base, 2) | **0: ganó el estilo ✓** | **2: ganó el prompt base ❌** |
| Pausas y respiraciones (el estilo pide muchas; el base, máximo 2) | Muchas: ganó el estilo ✓ | Muchas: ganó el estilo ✓ |
| Tramos `[slow][soft]` en varias líneas | ✓ | ✓ |
| Preguntas con `[up]` | ✓ | ✓ |
| Detalles | Mete "sixty degrees Fahrenheit" (palabra de la guía de acento, forzada en una meditación) | Títulos con "Section 1:" (sobra, pero no se lee en voz alta) |

**Lo que muestra:**
1. **Gemini lo hizo mejor que ChatGPT en este estilo**, al revés que en el Documental. No conviene recomendar una sola IA para todo.
2. **"Si el estilo contradice una regla, manda el estilo" no es confiable**: ChatGPT siguió la regla base de 2 exclamaciones en una meditación. Mejor que **el prompt final no tenga contradicciones**.
3. "zh" en inglés falta igual que "gl" en español: los sonidos más raros se saltan aunque se den ejemplos.

**Cambio propuesto para v1.4** (aplicado; ver secciones 0 y 5): sacar del prompt base las reglas que cambian según el estilo y convertirlas en variables, para que la web arme un prompt sin contradicciones:
- `{CONTENIDO_MINIMO}`: en la mayoría, "al menos 2 preguntas, 2 frases entre ¡ y ! y 1 enumeración"; en Meditación, "al menos 2 preguntas suaves y 1 enumeración; **ninguna exclamación**"; en Suspenso, "como máximo 1 exclamación"; en Noticiero, "1 exclamación".
- `{LIMITE_PAUSAS}`: "como máximo 2 por sección", salvo Meditación ("`[respira]` cada 2 o 3 frases y `[pausa 3s]` al final de cada sección").
- `{LARGO_FRASE}`: 20 palabras, o 12 en Comercial y 10 en Reels.
- Con esto, la línea "si el estilo contradice alguna regla, manda el estilo" queda solo como respaldo.
- **Anti-repetición** (agregado tras la prueba de Comercial): en Comercial, Reels y Noticiero, "Varía la estructura entre secciones: no abras dos secciones de la misma forma ni repitas el mismo orden de frases".

#### Resultado: Comercial en español

| | ChatGPT | Gemini |
|---|---|---|
| Errores de formato | 0 | 0 |
| Avisos del validador | **1** (faltan "gl" y "dr") | 2 (dos anuncios con 3 énfasis) |
| Largo (660) | 609 ✓ | **647 ✓** |
| Anuncios y frases | 8 de 10 frases ✓ | 8 de 10 frases ✓ |
| Frases de máximo 12 palabras | ✓ | ✓ |
| Énfasis por anuncio (5 a 7) | 5–6 ✓ | 3–5 (algo bajo) |
| Exclamación por anuncio | 2 por anuncio ✓ | 1 por anuncio ✓ |
| `[fuerte]` en el llamado y `[rápido]` en la frase legal | ✓ | ✓ |
| Productos ficticios | ✓ (Aurora, Raíz, Rumbo…) | ✓ (Café Sol Radiante, Expreso Veloz…) |
| Usa el tema ("la historia de…") | Poco | **Sí: cada anuncio abre con un dato histórico** |
| Variedad entre anuncios | **Baja: los 8 siguen la misma plantilla** (pregunta → problema → "¡Descubre X!" → "Disfruta A, B y C" → llamado) | Buena: aperturas distintas |
| Detalles | — | Afirmaciones de salud dudosas ("algo lleno de químicos", "nutrición natural"); repite "entero" en una frase |

**Lo que muestra:**
1. **El Comercial funciona bien en las dos IAs**: formato, largo, frases cortas, `[fuerte]` y `[rápido]` sin errores.
2. **ChatGPT repite la misma plantilla en los 8 anuncios.** Para entrenar un clon, 8 frases con la misma melodía aportan menos variedad que 8 distintas. Falta una regla anti-repetición en los estilos de muchas secciones (Comercial, Reels, Noticiero).
3. Las dos IAs hicieron un producto distinto por anuncio. El bloque no lo define; para entrenar la voz da igual, así que se puede dejar libre.

#### Conclusión de las pruebas de estilos
El prompt v1.3 **funciona en los tres estilos probados** (Documental, Meditación y Comercial), en los dos idiomas y con tres acentos: los seis guiones tienen 0 errores de formato. Quedan dos problemas de fondo, que se resuelven con la v1.4:
- Las **contradicciones entre el prompt base y el estilo** (ChatGPT puso exclamaciones en la Meditación).
- La **repetición de estructura** en estilos con muchas secciones.

Ninguna IA gana en todo: ChatGPT fue mejor en el Documental, Gemini en la Meditación y empataron en el Comercial. La web no debería recomendar una sola.

### Prueba con el prompt v1.4 — pendiente
Repetir con **ChatGPT** los dos casos donde falló:
- Meditación en inglés (`tests/prompts/v1.4-calm-en.txt`): ¿deja de poner exclamaciones?
- Comercial en español (`tests/prompts/v1.4-commercial-es.txt`): ¿varía la estructura entre anuncios?

Opcional: repetirlos también con Gemini para confirmar que no empeoró.

Desde la v1.4, los prompts de prueba se arman con `tools/build-prompt.js`, que lee esta especificación (plantillas, bloques de estilo, números, variables, acentos y temas). Así no se desvían de lo que dice el documento, y sirve de prototipo para el armado de prompts en la web:

```
node tools/build-prompt.js --style calm --lang en --accent "American (US)" --topic 3 --out tests/prompts/v1.4-calm-en.txt
```

El script también imprime el comando de revisión que corresponde.

**Conclusión:** con la v1.3, **las dos IAs entregan guiones que se pueden grabar**. Los defectos que quedan son menores y el botón **Revisar guion** los muestra. Seguir ajustando el Documental tiene poco retorno; **el riesgo ahora es que solo hemos probado un estilo y un idioma**. El siguiente paso es probar otros estilos con reglas distintas antes de dar el prompt por terminado.

---

## 12. Pendientes

**Hecho** (ver secciones 13 y 14): v1.4 aplicada · 100 guiones listos (ES y EN, los 10 estilos, cada uno con sus propios 5 temas) · la web completa (quest bilingüe, armado de prompts, revisión de guiones pegados, teleprompter conectado) · guía de grabación con Audacity · política de privacidad. La web no recomienda una sola IA: ofrece ChatGPT, Claude y Gemini y confía en la revisión del guion.

**Necesita a una persona:**
- **Probar el prompt v1.4 con ChatGPT** (Meditación en inglés y Comercial en español): requiere una sesión iniciada. Los prompts están en `tests/prompts/v1.4-*.txt`.
- **Leer en voz alta** al menos un guion listo de cada estilo y corregir lo que suene raro al decirlo (el validador no ve eso).
- **Datos de publicación:** correo de contacto en `privacy.html`, dominio propio y licencia del código (sección 14).
- Confirmar los 10 estilos (alternativa propuesta: **Corporativo / asistente virtual**, en lugar de Suspenso o Meditación) y los ppm de cada uno después de leerlos.

**Decisiones abiertas:**
- Insistir o no en las 6 secciones del Documental cuando lo genera una IA (por ejemplo, con una estructura numerada), o aceptar que haga 5.
- Variantes de los guiones listos en rioplatense (voseo) y español de España (vosotros), si hay demanda.
- Versión de unos 6 minutos de cada guion, para que un solo estilo alcance los 30 minutos de un clon profesional.
- Anuncios (AdSense): activar recién con contenido y visitas, y nunca en el modo grabación. Revisar los términos del programa de afiliados de ElevenLabs (aviso de afiliado, uso de la marca).

---

## 13. Biblioteca de guiones listos

Guiones ya escritos para los 5 temas de cada estilo. La persona elige estilo y tema, y lee: sin prompt, sin IA, sin revisar nada.

### Por qué
- Quita el paso más difícil (ir a una IA, copiar, pegar y revisar).
- La calidad se controla **una vez**, antes de publicar: formato, énfasis, largo, datos y redacción.
- Los sonidos difíciles ("gl", "dr", "x") se pueden asegurar a propósito; las IAs los saltaban en todas las pruebas.
- Que muchas personas lean el mismo texto no afecta al clon: el servicio aprende la voz, no las palabras.
- Cada guion puede tener su propia página, útil para SEO.

### Estructura
```
scripts/
  index.json                     ← lista para la web (lo genera tools/index-scripts.js)
  scripts.js                     ← paquete para el teleprompter (también lo genera)
  es/ y en/                      ← mismos nombres de archivo en los dos idiomas
    documentary/1-deep-ocean.txt … 5-first-day-nerves.txt
    podcast/1-fear-of-the-deep-sea.txt … 5-the-trip-that-went-wrong.txt
    commercial/1-deep-ocean.txt … 5-first-day-at-work.txt
    calm/1-calm-ocean.txt … 5-before-a-big-day.txt
  examples/01-copper.txt         ← el guion original del canal
```
Todos los nombres de carpetas y archivos van en inglés. Las claves internas de los estilos también: documentary, news, audiobook, podcast, commercial, tutorial, motivational, mystery, social y calm (en la especificación se siguen escribiendo con su nombre en español; `tools/read-spec.js` hace la traducción).
El número del archivo es el tema de la sección 9. Para revalidar todo y regenerar el índice:
```
node tools/index-scripts.js
```

El mismo comando genera `scripts/scripts.js`, el paquete que lee `teleprompter.html`. Es un `.js` (y no los `.txt` sueltos) porque así funciona también abriendo la página con doble clic: el navegador no deja leer archivos de texto locales, pero sí cargar un script. **Después de editar cualquier guion, hay que volver a correrlo** para que el teleprompter vea el cambio. El paquete incluye además `scripts/examples/01-copper.txt`, el guion original del canal convertido al formato nuevo.

### En el teleprompter
- Selector arriba: los 10 estilos en el idioma de la interfaz y en el otro, Ejemplos (el del cobre) y **Pegar un guion…** (el camino "Ya tengo mi guion"; el texto pegado queda guardado en ese navegador).
- Al elegir un guion, la velocidad inicial es la del estilo (de 100 ppm en Meditación a 170 ppm en Reels).
- Pausas: coma 0,25 s y punto 0,45 s, sin cajita; `[pausa]` 1 s (o lo indicado) y `[respira]` 0,9 s, con cajita (punteada para respirar); cambio de sección 1,8 s.
- Tramos: `[lento]` estira las palabras un 35 % y `[rápido]` las acorta un 25 %; los cuatro tramos se marcan con una etiqueta de color al empezar.
- La versión anterior, con el guion del cobre escrito dentro del código, quedó respaldada en `teleprompter-original.html`.

### Criterios de calidad (todos los guiones listos deben cumplirlos)
1. **0 errores y 0 avisos** en el validador, con los parámetros de su estilo.
2. **Español neutro**: tuteo, vocabulario internacional (auto, celular, computadora), sin modismos regionales. El acento lo pone la voz, no el texto. Rioplatense (voseo) y España (vosotros) quedan como variantes futuras.
3. **Narrador sin género gramatical**: nada de "estoy cansado/a", "me quedé quieto/a". Cualquier persona debe poder leerlo tal cual. (Ejemplo: "Llegué temblando de frío" en vez de "Llegué empapado").
4. **Datos revisados**: cifras generales y verificables; en caso de duda, redondear o sacar el dato.
5. **Productos ficticios** en los comerciales, sin marcas reales.

### La biblioteca completa

Cada estilo tiene 5 guiones, uno por tema (sección 9), en español y en inglés: **100 guiones** (unos 374 minutos de lectura) más el del cobre. Los temas son distintos en cada estilo, así que al cambiar de estilo no se repite el mismo contenido contado de otra forma.

| Estilo | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Documental | El océano profundo | La historia del chocolate | El desierto de Atacama | Cómo sabe tu celular dónde estás | Los nervios del primer día |
| Noticiero | El clima de la semana en Puerto Alba | La final de la Liga Femenina del Valle | La lluvia de estrellas de esta noche | El nuevo tren de Valle Hondo | Noticiero de Villa Serena |
| Audiolibro | La guardiana del faro | El reloj que se atrasaba | La carta que llegó cuarenta años tarde | El perro que esperaba en la estación | La niña que coleccionaba nubes |
| Podcast | Cocinando con mi abuela | Mi primera mascota | Cómo dejé de dejarlo todo para mañana | Mi peor corte de pelo | Aprender piano después de los treinta |
| Comercial (8 anuncios) | Heladería Copo Sur | Gimnasio La Cuadra | Zapatillas Zancada | Tren Valle Azul | App Charla |
| Tutorial | Pan casero | Huerto en el balcón | Grabar tu voz en casa | Mochila de viaje | Plantas de interior |
| Motivacional | Empezar de nuevo | El poder de los pasos pequeños | Fallar sin rendirse | Tu primera carrera | Cuidar tu energía |
| Suspenso | La casa del final de la calle | El tren que no aparece en el horario | La llamada de las tres de la mañana | El pueblo que desapareció del mapa | El retrato del ático |
| Reels (7 clips) | Datos curiosos del cuerpo humano | Animales con superpoderes | Trucos de cocina | Inventos que nacieron por accidente | Récords de la naturaleza |
| Meditación | Lluvia en la ventana | Un campo de lavanda | Una noche estrellada | Relajar el cuerpo para dormir | Un río de montaña |

- Los 100 pasan el validador con 0 errores y 0 avisos.
- **Inventado a propósito:** las ciudades y ligas del Noticiero (Puerto Alba, Valle Hondo, Villa Serena, la Liga Femenina del Valle) y todas las marcas de los comerciales. Las noticias ficticias lo dicen en voz alta, para que nunca se atribuyan a personas o lugares reales.
- **Datos reales:** Documental, la lluvia de estrellas y los Reels usan datos generales y verificables (cifras redondeadas). Los inventos por accidente nombran a sus inventores reales con hechos conocidos.
- **Narrador sin género gramatical** en los textos en primera persona (Podcast y Motivacional). En Audiolibro y Suspenso narra una tercera persona y los personajes sí tienen nombre y género.
- **Duración:** los 5 guiones de un estilo suman unos 36 a 40 minutos de lectura. Alcanzan para un clon profesional (30 minutos) con un solo estilo.

### Lo que aprendimos escribiéndolos
Los guiones los escribió Claude con las mismas reglas del prompt, y **cayó en los mismos errores que las IAs**, tanda tras tanda:
- La primera versión casi siempre quedó corta (un 10–25 % bajo el largo pedido), sobre todo en Noticiero, Meditación y Motivacional.
- En Comercial, Suspenso y Reels, más del 80 % de los énfasis quedó en la última palabra de la frase. Hubo que moverlos a la palabra importante.
- En Comercial y Reels, varias frases pasaron el límite de 10 o 12 palabras.

El validador detectó todo y se corrigió antes de publicar. Confirma que el validador es indispensable, incluso para guiones "propios", y que el idioma tiende a poner la fuerza al final de la frase.

### Pendientes de la biblioteca
- **Leerlos en voz alta** y corregir lo que suene raro al decirlo (el validador no ve eso).
- Variantes rioplatense y España, si hay demanda.

---

### Clásicos de dominio público

Además de los guiones listos, Audiolibro y Suspenso tienen **5 cuentos clásicos por idioma** (20 en total), de 10 a 24 minutos cada uno. Están en `scripts/<idioma>/classics/<estilo>/` y sus metadatos en `scripts/classics.json`.

| | Audiolibro | Suspenso |
|---|---|---|
| ES | El alacrán de fray Gómez y La camisa de Margarita (Ricardo Palma) · El rey burgués, El sátiro sordo y El rubí (Rubén Darío) | Los ojos verdes, El monte de las ánimas y La ajorca de oro (Bécquer) · El talismán (Emilia Pardo Bazán) · El caso de la señorita Amelia (Rubén Darío) |
| EN | The Gift of the Magi y The Last Leaf (O. Henry) · The Selfish Giant y The Nightingale and the Rose (Oscar Wilde) · The Story of the Good Little Boy (Mark Twain) | The Oval Portrait, The Cask of Amontillado y The Masque of the Red Death (Poe) · The Open Window (Saki) · An Inhabitant of Carcosa (Ambrose Bierce) |

- **Dominio público en todas partes:** obras publicadas antes de 1931 de autores que murieron hace más de 100 años (así también cubren la regla de 100 años de México). En cada idioma solo hay textos originales, nunca traducciones, porque una traducción tiene sus propios derechos.
- **Fuente:** Wikisource. Se agregaron solo las divisiones en partes (unas 250 palabras), la fuerza de cada parte y una nota inicial con autor y obra. El texto no se cambió, salvo la ortografía antigua en español ("á" → "a", "fué" → "fue") y un error de transcripción ("se haban" → "se liaban" en Los ojos verdes).
- **Sin violencia explícita:** se descartaron The Tell-Tale Heart, The Boarded Window y La resucitada por sus descripciones gráficas o su final, y se reemplazaron por The Oval Portrait, An Inhabitant of Carcosa y La ajorca de oro.
- **Validación:** solo se exigen 0 errores de formato. Las reglas de largo, frases y énfasis de los guiones listos no aplican a un texto original, así que los clásicos no llevan énfasis marcados.
- **En la web:** el teleprompter los muestra en grupos aparte ("Clásicos · Audiolibro · ES", etc.) con el autor junto al título, y el plan de la quest los ofrece debajo de los guiones de Audiolibro y Suspenso.

## 14. La web

Sitio estático, sin servidor ni cuentas: se puede abrir con doble clic o publicar tal cual en GitHub Pages, Netlify o Cloudflare Pages.

### Páginas
| Archivo | Qué es |
|---|---|
| `index.html` | Inicio y **quest** (idioma y acento del clon, estilos, tema, tipo de clon) → plan con guiones listos o prompts para la IA |
| `teleprompter.html` | El teleprompter: guiones listos, guion propio pegado (con revisión), interfaz ES/EN |
| `guide.html` | Guía de grabación con Audacity (ES/EN) |
| `privacy.html` | Política de privacidad (ES/EN); falta el correo de contacto |
| `teleprompter-original.html` | Respaldo de la primera versión (guion del cobre escrito en el código) |

### Cómo se conectan
- **Quest → teleprompter:** `teleprompter.html?script=<id>` abre un guion listo; `teleprompter.html?paste=1&style=…&lang=…&words=…&sections=…` abre el cuadro para pegar, ya configurado para revisar con lo que se pidió.
- **Revisión al pegar:** con errores no deja usarlo; con solo avisos, muestra la lista y ofrece "Usar igual".
- **Idioma de la interfaz:** se elige en cualquier página y se recuerda en el navegador (`tp.ui`). Es independiente del idioma del clon.

### Código compartido (`js/`)
| Archivo | Qué hace | Lo usan |
|---|---|---|
| `js/data.js` | Estilos, acentos, temas, plantillas y variables de esta especificación (generado) | quest, teleprompter |
| `js/prompt.js` | Arma el prompt para la IA | quest y `tools/build-prompt.js` |
| `js/validator.js` | Revisa un guion (mensajes ES/EN) | teleprompter y `tools/validate-script.js` |
| `js/quest.js` | La quest de la página de inicio | `index.html` |
| `js/site.js` | Cambio de idioma de la guía y la privacidad | `guide.html`, `privacy.html` |
| `js/links.js` | Enlaces de afiliado (hoy: ElevenLabs). Cambiar un enlace aquí lo actualiza en todo el sitio | todas las páginas |
| `css/site.css` | Estilos comunes del sitio | inicio, guía, privacidad |

La web y las herramientas de `tools/` usan **los mismos módulos**, así que el prompt que se prueba es exactamente el que entrega la web.

### Construir
```
node tools/build.js
```
Genera `js/data.js` desde esta especificación y valida y empaqueta todos los guiones (`scripts/scripts.js` e `scripts/index.json`). Si algún guion tiene errores o avisos, lo muestra y termina con error. **Hay que correrlo después de editar la especificación o cualquier guion.**

### Para publicar
1. Agregar un correo de contacto en `privacy.html`.
2. Elegir licencia: sin licencia, el código queda "todos los derechos reservados"; con MIT, cualquiera puede reutilizarlo y venderlo.
3. Subir la carpeta a un repositorio y activar GitHub Pages (o Netlify / Cloudflare Pages). Las carpetas `tools/` y `tests/` no se usan en la web; se puede dejar o excluir.
4. Para AdSense hace falta dominio propio; antes de agregar anuncios, actualizar la política de privacidad y nunca mostrar anuncios en `teleprompter.html`.

### Enlaces de afiliado
El enlace de referidos de ElevenLabs está en `js/links.js` y aparece, siempre con el aviso "enlace de afiliado", en:
- el teleprompter: al final del guion ("¿Terminaste de grabar?") y en el panel "Listo para grabar", nunca mientras se lee;
- el plan del inicio, como último paso ("Cuando termines de grabar");
- la guía de grabación, en el paso 6 ("Subir y clonar").

La política de privacidad ya lo menciona. Los enlaces se abren en otra pestaña y llevan `rel="sponsored"`.
