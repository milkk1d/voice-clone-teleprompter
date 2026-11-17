# Voice Clone Teleprompter

**English** · [Español](#español)

**▶ Use it online: [milkk1d.github.io/voice-clone-teleprompter](https://milkk1d.github.io/voice-clone-teleprompter/)**

Free scripts and a karaoke-style teleprompter to record your voice for AI voice cloning. Every script marks which word to stress, where to pause and when your voice should rise, so your recording comes out steady and natural.

- **Free, no accounts.** Everything runs in your browser.
- **Your voice never leaves your computer.** You record with your own program (for example, Audacity).
- **100 ready-made scripts** in English and Spanish: all 10 styles (Documentary, News, Audiobook, Podcast, Commercial, Tutorial, Motivational, Mystery, Social media and Calm), each with its own 5 topics.
- **Want another topic or style?** The site builds a prompt for your own AI (ChatGPT, Claude, Gemini…) to write the script, and checks it when you paste it in.

## How to use it on your computer

1. Download the project: green **Code → Download ZIP** button, then unzip it.
2. Open **`index.html`** with a double click.
3. Answer the four questions, open your script in the teleprompter and record in Audacity.

Nothing to install. Fonts load from the internet; offline, the page uses your system fonts. Use the **ES / EN** switch at the top to change the language.

The [recording guide](guide.html) explains how to set up your room, microphone and Audacity.

## What's in the folder

| | |
|---|---|
| `index.html` | Home page and questionnaire: clone language and accent, style, topic and clone type |
| `teleprompter.html` | The teleprompter: ready-made scripts or your own pasted script, with automatic checking |
| `guide.html` | Recording guide for Audacity |
| `privacy.html` | Privacy policy |
| `scripts/` | Ready-made scripts (`.txt`) and their bundles for the site |
| `js/`, `css/` | Code and styles |
| `prompt-spec.md` | The specification: script format, the 10 styles, the prompts and the test history (in Spanish) |
| `tools/` | Build tools: spec reader, prompt builder, script validator |
| `tests/` | The prompts and the results of the tests run with ChatGPT and Gemini |

## Script format

```
# Section title
@energy 4
> A note for the reader (not read aloud).

Why is the ocean **salty**? [up]
Every year, rivers carry [pause] **millions** of tons of salt into the sea.
[slow]This part is read more slowly.[/slow] [breathe]
```

`**word**` is the strongest word in the sentence, `[pause]` or `[pause 2s]` add a pause, `[breathe]` marks where to take a breath, `[up]` and `[down]` change the intonation, and `[slow]`, `[fast]`, `[soft]` and `[loud]` mark passages. Spanish commands work too: `@fuerza`, `[pausa]`, `[respira]`, `[sube]`, `[baja]`, `[lento]`, `[rápido]`, `[suave]`, `[fuerte]`. Details are in section 3 of the specification.

## For developers

You need [Node.js](https://nodejs.org/). The specification is the source of truth: after changing it, or after editing or adding a script in `scripts/`, run:

```bash
node tools/build.js
```

This regenerates `js/data.js`, checks every script and bundles them again for the teleprompter. Other tools:

```bash
node tools/validate-script.js scripts/en/podcast/2-my-bike.txt --lang en --style podcast --words 580 --sections 5
```

```bash
node tools/build-prompt.js --style documentary --lang en --accent "Neutral / International" --topic 1
```

## License

- **Code** (`.html`, `.js`, `.css`): [MIT](LICENSE).
- **Scripts and text**: [CC BY 4.0](LICENSE-scripts.md). You may use and adapt them as long as you credit the source.

Found a bug or have an idea? Open an **Issue**.

## Affiliate links

Some links to ElevenLabs are affiliate links: if you subscribe after clicking, the author earns a commission at no extra cost to you. They live in `js/links.js` and are always labeled as such.

---

## Español

**▶ Úsalo en línea: [milkk1d.github.io/voice-clone-teleprompter](https://milkk1d.github.io/voice-clone-teleprompter/)**

Guiones gratis y un teleprompter tipo karaoke para grabar tu voz y clonarla con IA. Cada guion marca qué palabra decir con más fuerza, dónde pausar y cuándo subir la entonación, para que tu grabación salga pareja y natural.

- **Gratis y sin cuentas.** Todo funciona en tu navegador.
- **Tu voz nunca sale de tu computador.** Grabas con tu propio programa (por ejemplo, Audacity).
- **100 guiones listos** en español e inglés: los 10 estilos (Documental, Noticiero, Audiolibro, Podcast, Comercial, Tutorial, Motivacional, Suspenso, Reels y Meditación), cada uno con sus propios 5 temas.
- **¿Quieres otro tema o estilo?** La web arma un prompt para que tu IA (ChatGPT, Claude, Gemini…) escriba el guion, y lo revisa cuando lo pegas.

### Cómo usarlo en tu computador

1. Descarga el proyecto: botón verde **Code → Download ZIP**, y descomprímelo.
2. Abre **`index.html`** con doble clic.
3. Responde las cuatro preguntas, abre tu guion en el teleprompter y graba en Audacity.

No hace falta instalar nada. Las tipografías se cargan desde internet; sin conexión, la página usa las del sistema. Cambia el idioma con el botón **ES / EN** de arriba.

La [guía de grabación](guide.html) explica cómo preparar el lugar, el micrófono y Audacity.

### El formato de los guiones

```
# Título de la sección
@fuerza 4
> Una nota para quien lee (no se lee en voz alta).

¿Sabías que el mar es **salado**? [sube]
Cada año, los ríos arrastran [pausa] **millones** de toneladas de sal.
[lento]Esto se lee más despacio.[/lento] [respira]
```

`**palabra**` es la más fuerte de la frase, `[pausa]` o `[pausa 2s]` pausan, `[respira]` marca dónde tomar aire, `[sube]` y `[baja]` cambian la entonación, y `[lento]`, `[rápido]`, `[suave]` y `[fuerte]` marcan tramos. El detalle está en la sección 3 de la especificación.

### Para quien quiera modificarlo

Necesitas [Node.js](https://nodejs.org/). La especificación es la fuente de verdad: después de cambiarla, o de editar o agregar un guion en `scripts/`, corre `node tools/build.js`. Regenera `js/data.js`, valida todos los guiones y los vuelve a empaquetar.

### Licencia

- **Código** (`.html`, `.js`, `.css`): [MIT](LICENSE).
- **Guiones y textos**: [CC BY 4.0](LICENSE-scripts.md). Puedes usarlos y adaptarlos citando la fuente.

¿Encontraste un error o tienes una idea? Escríbela en la pestaña **Issues**.

### Enlaces de afiliado

Algunos enlaces a ElevenLabs son de afiliado: si te suscribes después de hacer clic, el autor recibe una comisión, sin costo extra para ti. Están en `js/links.js` y siempre van marcados como tales.
