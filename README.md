# Clona tu voz · Teleprompter

**Español** · [English](#english)

Guiones y un teleprompter tipo karaoke para grabar tu voz y clonarla con IA. Cada guion marca qué palabra decir con más fuerza, dónde pausar y cuándo subir la entonación, para que tu grabación salga pareja y natural.

- **Gratis y sin cuentas.** Todo funciona en tu navegador.
- **Tu voz nunca sale de tu computador.** Grabas con tu propio programa (por ejemplo, Audacity).
- **40 guiones listos** en español e inglés: Documental, Podcast, Comercial y Meditación, con 5 temas cada uno.
- **¿Quieres otro tema o estilo?** La web arma un prompt para que tu IA (ChatGPT, Claude, Gemini…) escriba el guion, y lo revisa cuando lo pegas.

## Cómo usarlo en tu computador

1. Descarga el proyecto: botón verde **Code → Download ZIP**, y descomprímelo.
2. Abre **`index.html`** con doble clic.
3. Responde las cuatro preguntas, abre tu guion en el teleprompter y graba en Audacity.

No hace falta instalar nada. Las tipografías se cargan desde internet; sin conexión, la página usa las del sistema.

La [guía de grabación](guia.html) explica cómo preparar el lugar, el micrófono y Audacity.

## Qué hay en la carpeta

| | |
|---|---|
| `index.html` | Inicio y cuestionario: idioma y acento del clon, estilo, tema y tipo de clon |
| `teleprompter.html` | El teleprompter: guiones listos o tu propio guion pegado, con revisión automática |
| `guia.html` | Guía para grabar con Audacity |
| `privacidad.html` | Política de privacidad |
| `guiones/` | Los guiones listos (`.txt`) y sus paquetes para la web |
| `js/`, `css/` | Código y estilos |
| `especificacion-prompts-v1.md` | La especificación: formato de los guiones, los 10 estilos, los prompts y el historial de pruebas |
| `pruebas/` | Herramientas de construcción y las pruebas hechas con ChatGPT y Gemini |

## El formato de los guiones

```
# Título de la sección
@fuerza 4
> Una nota para quien lee (no se lee en voz alta).

¿Sabías que el mar es **salado**? [sube]
Cada año, los ríos arrastran [pausa] **millones** de toneladas de sal.
[lento]Esto se lee más despacio.[/lento] [respira]
```

`**palabra**` es la más fuerte de la frase, `[pausa]` o `[pausa 2s]` pausan, `[respira]` marca dónde tomar aire, `[sube]` y `[baja]` cambian la entonación, y `[lento]`, `[rápido]`, `[suave]` y `[fuerte]` marcan tramos. En inglés: `@energy`, `[pause]`, `[breathe]`, `[up]`, `[down]`, `[slow]`, `[fast]`, `[soft]`, `[loud]`. El detalle está en la sección 3 de la especificación.

## Para quien quiera modificarlo

Necesitas [Node.js](https://nodejs.org/). La especificación es la fuente de verdad: después de cambiarla, o de editar o agregar un guion en `guiones/`, corre:

```bash
node pruebas/construir.js
```

Esto regenera `js/datos.js`, valida todos los guiones y los vuelve a empaquetar para el teleprompter. Otras herramientas:

```bash
node pruebas/validar-guion.js guiones/es/podcast/2-mi-bicicleta.txt --lang es --style podcast --words 580 --sections 5
```

```bash
node pruebas/armar-prompt.js --style documental --lang es --accent "Latino neutro" --topic 1
```

## Licencia

- **Código** (`.html`, `.js`, `.css`): [MIT](LICENSE).
- **Guiones y textos**: [CC BY 4.0](LICENSE-guiones.md). Puedes usarlos y adaptarlos citando la fuente.

¿Encontraste un error o tienes una idea? Escríbela en la pestaña **Issues**.

## Enlaces de afiliado

Algunos enlaces a ElevenLabs son de afiliado: si te suscribes después de hacer clic, el autor recibe una comisión, sin costo extra para ti. Están en `js/enlaces.js` y siempre van marcados como tales.

---

## English

Scripts and a karaoke-style teleprompter to record your voice for AI voice cloning. Each script marks which word to stress, where to pause and when your voice should rise.

- **Free, no accounts:** everything runs in your browser, and your voice never leaves your computer.
- **40 ready-made scripts** in Spanish and English (Documentary, Podcast, Commercial and Calm).
- **Want another topic?** The site builds a prompt for your own AI and checks the script when you paste it.

**To use it:** click **Code → Download ZIP**, unzip it and open **`index.html`**. Use the ES/EN switch at the top. The [recording guide](guia.html) explains how to set up your room, microphone and Audacity.

**License:** code under [MIT](LICENSE); scripts and text under [CC BY 4.0](LICENSE-guiones.md) (credit the source). Bugs and ideas: open an **Issue**.
