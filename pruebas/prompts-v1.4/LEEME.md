# Prompts v1.4 para probar en ChatGPT y Gemini

Los 10 estilos en español (acento latino neutro) y en inglés (neutro / internacional), generados desde la especificación v1.4 con `pruebas/armar-prompt.js`. Son exactamente los mismos que entrega la web.

## Cómo probarlos

1. Abre un **chat nuevo** para cada prompt (para que la IA no arrastre la conversación anterior).
2. Copia el archivo completo y pégalo.
3. Copia el guion con el botón **copiar** del bloque de código.
4. Pásame el guion diciendo **de qué IA, estilo e idioma es**. Lo guardo en `pruebas/` y lo reviso con el comando de la tabla (desde la carpeta del proyecto).

## Prioridad 1: estilos que nunca se han probado

Son los que más pueden fallar, porque sus reglas son distintas a todo lo que ya probamos.

| Archivos | Tema | Qué pone a prueba | Revisión (`node pruebas/validar-guion.js <guion> …`) |
|---|---|---|---|
| `noticiero-es.txt` · `noticiero-en.txt` | Tecnología de todos los días | 5 notas breves, como máximo 1 exclamación, 1 pausa por nota, que cada nota abra distinto | `--lang es\|en --style noticiero --words 620 --sections 5` |
| `audiolibro-es.txt` · `audiolibro-en.txt` | Anécdota personal ficticia | Historia con diálogos, exclamaciones dentro de los diálogos, `[suave]` y `[pausa 2s]` en los giros, pocos énfasis (2 o 3) | `--lang es\|en --style audiolibro --words 520 --sections 4` |
| `tutorial-es.txt` · `tutorial-en.txt` | Tecnología de todos los días | Pasos ("primero… por último"), una advertencia dentro de `[fuerte]`, resumen final | `--lang es\|en --style tutorial --words 520 --sections 5` |
| `motivacional-es.txt` · `motivacional-en.txt` | Un viaje por un lugar | Frases cortas y repetidas, 6 a 8 énfasis por sección, fuerza de 3 a 5, cierre dentro de `[fuerte]` | `--lang es\|en --style motivacional --words 560 --sections 5` |
| `suspenso-es.txt` · `suspenso-en.txt` | El océano profundo | 4 secciones más un cierre muy corto, `[lento]` y `[suave]`, como máximo 1 exclamación, preguntas sin respuesta | `--lang es\|en --style suspenso --words 480 --sections 5` |
| `reels-es.txt` · `reels-en.txt` | La historia de algo cotidiano | 7 clips, frases de 10 palabras como máximo, 6 a 9 énfasis por clip, ganchos distintos | `--lang es\|en --style reels --words 680 --sections 7` |

## Prioridad 2: confirmar los arreglos de la v1.4 (en ChatGPT)

| Archivo | Qué confirmar | Revisión |
|---|---|---|
| `meditacion-en.txt` | Que ya **no ponga exclamaciones** (en la v1.3 puso 2) | `--lang en --style meditacion --words 400 --sections 5` |
| `comercial-es.txt` | Que **no repita la misma estructura** en los 8 anuncios | `--lang es --style comercial --words 660 --sections 8` |

## Prioridad 3: el resto, ya probado en versiones anteriores

`documental-es/en`, `podcast-es/en`, `comercial-en`, `meditacion-es`. Sirven para comparar ChatGPT y Gemini en el otro idioma.

| Estilo | Revisión |
|---|---|
| Documental | `--lang es\|en --style documental --words 560 --sections 6` |
| Podcast | `--lang es\|en --style podcast --words 580 --sections 5` |
| Comercial | `--lang es\|en --style comercial --words 660 --sections 8` |
| Meditación | `--lang es\|en --style meditacion --words 400 --sections 5` |

Para regenerar estos archivos después de cambiar la especificación, corre `node pruebas/armar-prompt.js` con el estilo, idioma, acento y tema de la tabla (`--out pruebas/prompts-v1.4/<estilo>-<idioma>.txt`).
