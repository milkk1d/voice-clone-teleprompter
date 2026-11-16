// Generado por tools/build.js desde prompt-spec.md (v1.4) — no editar a mano.
window.DATOS = {
 "version": "v1.4",
 "order": [
  "documentary",
  "news",
  "audiobook",
  "podcast",
  "commercial",
  "tutorial",
  "motivational",
  "mystery",
  "social",
  "calm"
 ],
 "styles": {
  "documentary": {
   "key": "documentary",
   "num": 1,
   "nombre": {
    "es": "Documental",
    "en": "Documentary"
   },
   "bloque": {
    "es": "Tono de divulgación con seguridad, como un canal de YouTube explicativo. La primera sección (@fuerza 5) contiene solo 2 a 4 preguntas que enganchen, cada una terminada en [sube]; puede ser más corta que las demás. Las secciones del medio (@fuerza 4) explican con frases que avanzan hacia el dato clave, marcado con **. Pon [pausa] antes de cifras o datos sorprendentes. Incluye al menos una enumeración de lugares o nombres propios. La última sección (@fuerza 3) es corta e invita a seguir el canal; su última frase termina en [baja].",
    "en": "Confident explainer tone, like an educational YouTube channel. The first section (@energy 5) contains only 2 to 4 hook questions, each ending in [up]; it can be shorter than the others. The middle sections (@energy 4) explain with sentences that build toward the key fact, marked with **. Add [pause] before surprising numbers or facts. Include at least one list of places or proper names. The last section (@energy 3) is short and invites the listener to follow the channel; its last sentence ends in [down]."
   },
   "ejemplo": {
    "es": "¿Por qué el océano es **salado**? [sube]\nCada año, los ríos arrastran [pausa] **millones** de toneladas de sal hacia el mar.",
    "en": "Why is the ocean **salty**? [up]\nEvery year, rivers carry [pause] **millions** of tons of salt into the sea."
   },
   "uso": {
    "es": "YouTube explicativo, divulgación",
    "en": "Explainer YouTube videos, science content"
   },
   "ppm": 140,
   "wps": 110,
   "frases": {
    "es": "9 a 11",
    "en": "9 to 11"
   },
   "enfasis": {
    "es": "3 o 4",
    "en": "3 or 4"
   },
   "vars": {
    "frases": {
     "es": "Frases simples y directas, de 20 palabras como máximo. Varía el largo: mezcla frases cortas (5 a 8 palabras) y medianas (12 a 18).",
     "en": "Simple, direct sentences of 20 words max. Vary the length: mix short sentences (5 to 8 words) and medium ones (12 to 18)."
    },
    "contenido": {
     "es": "Incluye al menos 2 preguntas, 2 frases completas entre ¡ y ! y 1 enumeración (\"A, B y C\").",
     "en": "Include at least 2 questions, 2 full sentences ending with ! and 1 list (\"A, B and C\")."
    },
    "variedad": {
     "es": "",
     "en": ""
    },
    "pausas": {
     "es": "Como máximo 2 [pausa] y 2 [respira] por sección.",
     "en": "At most 2 [pause] and 2 [breathe] per section."
    }
   }
  },
  "news": {
   "key": "news",
   "num": 2,
   "nombre": {
    "es": "Noticiero",
    "en": "News"
   },
   "bloque": {
    "es": "Tono de noticiero: claro, neutral y con autoridad, sin opinar. Cada sección es una nota breve sobre el tema (@fuerza 4); la primera abre con un titular. La primera frase de cada nota resume lo esencial. Marca con ** cifras, nombres y fechas clave. Ritmo constante: usa [pausa] solo entre notas. Usa datos generales y verificables o hechos claramente ficticios; nunca atribuyas hechos inventados a personas o instituciones reales. Como máximo 1 exclamación en todo el guion. La última nota cierra con una despedida de noticiero.",
    "en": "News anchor tone: clear, neutral and authoritative, with no opinions. Each section is a short news item about the topic (@energy 4); the first one opens with a headline. The first sentence of each item sums up the essentials. Mark key numbers, names and dates with **. Keep a steady pace: use [pause] only between items. Use general, verifiable facts or clearly fictional events; never attribute invented facts to real people or institutions. At most 1 exclamation in the whole script. The last item closes with a newscast sign-off."
   },
   "ejemplo": {
    "es": "Buenas noches. Esta semana, la temperatura del océano alcanzó un nuevo **récord**.\nSegún los científicos, subió cerca de **un grado** en diez años.",
    "en": "Good evening. This week, ocean temperatures reached a new **record**.\nAccording to scientists, they rose about **one degree** in ten years."
   },
   "uso": {
    "es": "Noticias, informes, resúmenes",
    "en": "News, reports, summaries"
   },
   "ppm": 155,
   "wps": 125,
   "frases": {
    "es": "9 a 11",
    "en": "9 to 11"
   },
   "enfasis": {
    "es": "3 o 4",
    "en": "3 or 4"
   },
   "vars": {
    "frases": {
     "es": "Frases simples y directas, de 20 palabras como máximo. Varía el largo: mezcla frases cortas (5 a 8 palabras) y medianas (12 a 18).",
     "en": "Simple, direct sentences of 20 words max. Vary the length: mix short sentences (5 to 8 words) and medium ones (12 to 18)."
    },
    "contenido": {
     "es": "Incluye 1 enumeración (\"A, B y C\") y como máximo 1 frase entre ¡ y !. Las preguntas son opcionales.",
     "en": "Include 1 list (\"A, B and C\") and at most 1 sentence ending with !. Questions are optional."
    },
    "variedad": {
     "es": "Varía la forma entre secciones: abre cada una de un modo distinto (pregunta, dato, exclamación o escena) y no repitas el mismo orden de tipos de frase.",
     "en": "Vary the shape between sections: open each one differently (question, fact, exclamation or scene) and don't repeat the same order of sentence types."
    },
    "pausas": {
     "es": "Usa [pausa] solo entre notas: como máximo 1 por sección, al final.",
     "en": "Use [pause] only between items: at most 1 per section, at the end."
    }
   }
  },
  "audiobook": {
   "key": "audiobook",
   "num": 3,
   "nombre": {
    "es": "Audiolibro",
    "en": "Audiobook"
   },
   "bloque": {
    "es": "Narración de cuento o audiolibro, con un narrador en tercera persona y uno o dos personajes. La historia, basada en el tema, debe tener inicio, conflicto y desenlace. Incluye diálogos cortos entre comillas para que quien lee cambie levemente el tono; las exclamaciones van en los diálogos. Usa [suave] en los momentos íntimos y [pausa 2s] en los giros de la historia. El énfasis va solo en las palabras que cambian el rumbo de la historia. Fuerza 2 en la primera sección, 4 en la sección del clímax y 2 en la última.",
    "en": "Storytelling or audiobook narration, with a third-person narrator and one or two characters. The story, based on the topic, must have a beginning, a conflict and a resolution. Include short dialogue lines in quotes so the reader can shift tone slightly; exclamations go in the dialogue. Use [soft] in intimate moments and [pause 2s] at the story's turning points. Emphasis goes only on words that change the course of the story. Energy 2 in the first section, 4 in the climax section and 2 in the last one."
   },
   "ejemplo": {
    "es": "Esa noche, Clara bajó al muelle [suave]sin hacer ruido[/suave].\n\"¿Escuchaste eso?\", susurró. [pausa 2s] El agua se movía **sola**.",
    "en": "That night, Clara walked down to the pier [soft]without a sound[/soft].\n\"Did you hear that?\" she whispered. [pause 2s] The water was moving **on its own**."
   },
   "uso": {
    "es": "Cuentos, libros, historias",
    "en": "Stories, books, narratives"
   },
   "ppm": 130,
   "wps": 130,
   "frases": {
    "es": "10 a 13",
    "en": "10 to 13"
   },
   "enfasis": {
    "es": "2 o 3",
    "en": "2 or 3"
   },
   "vars": {
    "frases": {
     "es": "Frases simples y directas, de 20 palabras como máximo. Varía el largo: mezcla frases cortas (5 a 8 palabras) y medianas (12 a 18).",
     "en": "Simple, direct sentences of 20 words max. Vary the length: mix short sentences (5 to 8 words) and medium ones (12 to 18)."
    },
    "contenido": {
     "es": "Incluye al menos 1 pregunta, 2 exclamaciones dentro de los diálogos y 1 enumeración (\"A, B y C\").",
     "en": "Include at least 1 question, 2 exclamations inside the dialogue and 1 list (\"A, B and C\")."
    },
    "variedad": {
     "es": "",
     "en": ""
    },
    "pausas": {
     "es": "Como máximo 2 [pausa] y 2 [respira] por sección.",
     "en": "At most 2 [pause] and 2 [breathe] per section."
    }
   }
  },
  "podcast": {
   "key": "podcast",
   "num": 4,
   "nombre": {
    "es": "Podcast",
    "en": "Podcast"
   },
   "bloque": {
    "es": "Tono conversacional, como si hablaras con un amigo en un podcast. Primera persona, frases naturales y alguna muletilla suave (\"mira\", \"la verdad\", \"o sea\"), como máximo una cada tres frases. Puedes usar con moderación los modismos del acento. Incluye preguntas al oyente (\"¿te ha pasado?\") y una anécdota breve. El énfasis va donde la emoción lo pide. Usa [pausa] como pausa para pensar antes de una opinión. Fuerza 3 en todas las secciones, salvo una de 4 en el momento más emotivo. La última sección invita a comentar.",
    "en": "Conversational tone, like talking to a friend on a podcast. First person, natural sentences and a few soft fillers (\"look\", \"honestly\", \"I mean\"), no more than one every three sentences. You may use the accent's casual expressions in moderation. Include questions to the listener (\"has that ever happened to you?\") and a short anecdote. Emphasis goes where the emotion calls for it. Use [pause] as a thinking pause before an opinion. Energy 3 in every section, except one at 4 for the most emotional moment. The last section invites comments."
   },
   "ejemplo": {
    "es": "Mira, la primera vez que vi el mar de noche, [pausa] me dio harto **miedo**.\n¿A ti te ha pasado? [sube]",
    "en": "Look, the first time I saw the ocean at night, [pause] it honestly **scared** me.\nHas that ever happened to you? [up]"
   },
   "uso": {
    "es": "Podcasts, voz casual",
    "en": "Podcasts, casual voice"
   },
   "ppm": 145,
   "wps": 115,
   "frases": {
    "es": "9 a 12",
    "en": "9 to 12"
   },
   "enfasis": {
    "es": "2 o 3",
    "en": "2 or 3"
   },
   "vars": {
    "frases": {
     "es": "Frases simples y directas, de 20 palabras como máximo. Varía el largo: mezcla frases cortas (5 a 8 palabras) y medianas (12 a 18).",
     "en": "Simple, direct sentences of 20 words max. Vary the length: mix short sentences (5 to 8 words) and medium ones (12 to 18)."
    },
    "contenido": {
     "es": "Incluye al menos 2 preguntas, 2 frases completas entre ¡ y ! y 1 enumeración (\"A, B y C\").",
     "en": "Include at least 2 questions, 2 full sentences ending with ! and 1 list (\"A, B and C\")."
    },
    "variedad": {
     "es": "",
     "en": ""
    },
    "pausas": {
     "es": "Como máximo 2 [pausa] y 2 [respira] por sección.",
     "en": "At most 2 [pause] and 2 [breathe] per section."
    }
   }
  },
  "commercial": {
   "key": "commercial",
   "num": 5,
   "nombre": {
    "es": "Comercial",
    "en": "Commercial"
   },
   "bloque": {
    "es": "Locución publicitaria con mucha energía. Inventa un producto o servicio ficticio relacionado con el tema (nunca marcas reales). Cada sección es un anuncio distinto de unos 30 segundos, con estos elementos: gancho, problema, solución, beneficios en enumeración y llamado a la acción. El llamado va siempre al final; el orden de los demás puede cambiar de un anuncio a otro. Frases de 12 palabras como máximo. Marca con ** el beneficio o la palabra que vende. Al menos una exclamación por anuncio. Usa [fuerte] en el llamado a la acción y [rápido] para una frase legal breve al final (\"Aplican condiciones\"). Fuerza 5 en todas las secciones.",
    "en": "High-energy advertising voice-over. Invent a fictional product or service related to the topic (never real brands). Each section is a different ad of about 30 seconds, with these elements: hook, problem, solution, list of benefits and call to action. The call to action always comes last; the order of the others can change from ad to ad. Sentences of 12 words max. Mark the benefit or selling word with **. At least one exclamation per ad. Use [loud] on the call to action and [fast] for a short legal line at the end (\"Terms apply\"). Energy 5 in every section."
   },
   "ejemplo": {
    "es": "¿Cansado de un café **amargo**? [sube]\n[fuerte]¡Pruébalo hoy mismo![/fuerte] [rápido]Aplican condiciones.[/rápido]",
    "en": "Tired of **bitter** coffee? [up]\n[loud]Try it today![/loud] [fast]Terms apply.[/fast]"
   },
   "uso": {
    "es": "Anuncios, promociones",
    "en": "Ads, promotions"
   },
   "ppm": 165,
   "wps": 80,
   "frases": {
    "es": "9 a 11",
    "en": "9 to 11"
   },
   "enfasis": {
    "es": "5 a 7",
    "en": "5 to 7"
   },
   "vars": {
    "frases": {
     "es": "Frases simples y directas, de 12 palabras como máximo. Varía el largo: mezcla frases muy cortas (3 a 6 palabras) y cortas (7 a 12).",
     "en": "Simple, direct sentences of 12 words max. Vary the length: mix very short sentences (3 to 6 words) and short ones (7 to 12)."
    },
    "contenido": {
     "es": "Incluye al menos 1 pregunta en total, 1 frase entre ¡ y ! en cada anuncio y 1 enumeración de beneficios en cada anuncio.",
     "en": "Include at least 1 question overall, 1 sentence ending with ! in each ad and 1 list of benefits in each ad."
    },
    "variedad": {
     "es": "Varía la forma entre secciones: abre cada una de un modo distinto (pregunta, dato, exclamación o escena) y no repitas el mismo orden de tipos de frase.",
     "en": "Vary the shape between sections: open each one differently (question, fact, exclamation or scene) and don't repeat the same order of sentence types."
    },
    "pausas": {
     "es": "Como máximo 2 [pausa] y 2 [respira] por sección.",
     "en": "At most 2 [pause] and 2 [breathe] per section."
    }
   }
  },
  "tutorial": {
   "key": "tutorial",
   "num": 6,
   "nombre": {
    "es": "Tutorial",
    "en": "Tutorial"
   },
   "bloque": {
    "es": "Tono educativo, claro y paciente, como un profesor que explica paso a paso. Convierte el tema en algo que el oyente pueda entender o hacer, explicado en pasos (\"primero\", \"segundo\", \"por último\"). Marca con ** la acción o el concepto clave de cada paso. Pon [pausa] entre pasos. Incluye al menos una advertencia (\"ojo con…\") dentro de [fuerte]...[/fuerte]. La última sección es un resumen. Fuerza 3 en todas las secciones.",
    "en": "Educational tone, clear and patient, like a teacher explaining step by step. Turn the topic into something the listener can understand or do, explained in steps (\"first\", \"second\", \"finally\"). Mark the key action or concept of each step with **. Add [pause] between steps. Include at least one warning (\"be careful with…\") inside [loud]...[/loud]. The last section is a summary. Energy 3 in every section."
   },
   "ejemplo": {
    "es": "Primero, **activa** la ubicación del celular y espera unos segundos. [pausa]\n[fuerte]Ojo: dentro de un edificio, la señal puede fallar.[/fuerte]",
    "en": "First, **turn on** location on your phone and wait a few seconds. [pause]\n[loud]Careful: inside a building, the signal may fail.[/loud]"
   },
   "uso": {
    "es": "Cursos, explicaciones paso a paso",
    "en": "Courses, step-by-step explanations"
   },
   "ppm": 130,
   "wps": 105,
   "frases": {
    "es": "8 a 10",
    "en": "8 to 10"
   },
   "enfasis": {
    "es": "3 o 4",
    "en": "3 or 4"
   },
   "vars": {
    "frases": {
     "es": "Frases simples y directas, de 20 palabras como máximo. Varía el largo: mezcla frases cortas (5 a 8 palabras) y medianas (12 a 18).",
     "en": "Simple, direct sentences of 20 words max. Vary the length: mix short sentences (5 to 8 words) and medium ones (12 to 18)."
    },
    "contenido": {
     "es": "Incluye al menos 2 preguntas, 2 frases completas entre ¡ y ! y 1 enumeración (\"A, B y C\").",
     "en": "Include at least 2 questions, 2 full sentences ending with ! and 1 list (\"A, B and C\")."
    },
    "variedad": {
     "es": "",
     "en": ""
    },
    "pausas": {
     "es": "Como máximo 2 [pausa] y 2 [respira] por sección.",
     "en": "At most 2 [pause] and 2 [breathe] per section."
    }
   }
  },
  "motivational": {
   "key": "motivational",
   "num": 7,
   "nombre": {
    "es": "Motivacional",
    "en": "Motivational"
   },
   "bloque": {
    "es": "Discurso motivacional que crece de menos a más. Usa el tema como metáfora de superación. Frases cortas y repeticiones intencionales (\"No es fácil. No es rápido. Pero es posible.\"). Marca con ** la palabra que carga la emoción. Pon [pausa 2s] después de cada idea fuerte. Fuerza 3 en la primera sección, 4 en las del medio y 5 en la última. Cierra con una frase memorable dentro de [fuerte].",
    "en": "Motivational speech that builds from low to high. Use the topic as a metaphor for overcoming challenges. Short sentences and intentional repetition (\"It's not easy. It's not fast. But it's possible.\"). Mark the word that carries the emotion with **. Add [pause 2s] after each strong idea. Energy 3 in the first section, 4 in the middle ones and 5 in the last. Close with a memorable line inside [loud]."
   },
   "ejemplo": {
    "es": "No es fácil. No es rápido. Pero es **posible**. [pausa 2s]\n[fuerte]¡Hoy empieza tu viaje![/fuerte]",
    "en": "It's not easy. It's not fast. But it's **possible**. [pause 2s]\n[loud]Your journey starts today![/loud]"
   },
   "uso": {
    "es": "Charlas, contenido inspirador",
    "en": "Talks, inspirational content"
   },
   "ppm": 140,
   "wps": 110,
   "frases": {
    "es": "12 a 15",
    "en": "12 to 15"
   },
   "enfasis": {
    "es": "6 a 8",
    "en": "6 to 8"
   },
   "vars": {
    "frases": {
     "es": "Frases simples y directas, de 20 palabras como máximo. Varía el largo: mezcla frases cortas (5 a 8 palabras) y medianas (12 a 18).",
     "en": "Simple, direct sentences of 20 words max. Vary the length: mix short sentences (5 to 8 words) and medium ones (12 to 18)."
    },
    "contenido": {
     "es": "Incluye al menos 2 preguntas, 2 frases completas entre ¡ y ! y 1 enumeración (\"A, B y C\").",
     "en": "Include at least 2 questions, 2 full sentences ending with ! and 1 list (\"A, B and C\")."
    },
    "variedad": {
     "es": "",
     "en": ""
    },
    "pausas": {
     "es": "Como máximo 2 [pausa] y 2 [respira] por sección.",
     "en": "At most 2 [pause] and 2 [breathe] per section."
    }
   }
  },
  "mystery": {
   "key": "mystery",
   "num": 8,
   "nombre": {
    "es": "Suspenso",
    "en": "Mystery"
   },
   "bloque": {
    "es": "Narración de misterio o suspenso, sin violencia explícita. Construye tensión con detalles sensoriales: sonidos, sombras, silencios. Usa [lento] y [suave] en los momentos de tensión y [pausa 2s] antes de cada revelación. El énfasis va solo en la palabra que inquieta. Como máximo 1 exclamación en todo el guion. Incluye preguntas sin respuesta terminadas en [sube]. Fuerza 2 en las primeras secciones, 4 en la sección de la revelación y 2 en una última sección muy corta.",
    "en": "Mystery or suspense narration, with no graphic violence. Build tension with sensory details: sounds, shadows, silences. Use [slow] and [soft] in tense moments and [pause 2s] before each reveal. Emphasis goes only on the unsettling word. At most 1 exclamation in the whole script. Include unanswered questions ending in [up]. Energy 2 in the first sections, 4 in the reveal section and 2 in a very short last section."
   },
   "ejemplo": {
    "es": "[lento]A dos mil metros de profundidad, no llega la luz.[/lento]\nY sin embargo, [pausa 2s] algo **brilla**. ¿Qué es? [sube]",
    "en": "[slow]Two thousand meters down, no light can reach.[/slow]\nAnd yet, [pause 2s] something **glows**. What is it? [up]"
   },
   "uso": {
    "es": "Misterio, casos, historias de intriga",
    "en": "Mystery, cases, intriguing stories"
   },
   "ppm": 120,
   "wps": 120,
   "frases": {
    "es": "11 a 13",
    "en": "11 to 13"
   },
   "enfasis": {
    "es": "2 o 3",
    "en": "2 or 3"
   },
   "vars": {
    "frases": {
     "es": "Frases simples y directas, de 20 palabras como máximo. Varía el largo: mezcla frases cortas (5 a 8 palabras) y medianas (12 a 18).",
     "en": "Simple, direct sentences of 20 words max. Vary the length: mix short sentences (5 to 8 words) and medium ones (12 to 18)."
    },
    "contenido": {
     "es": "Incluye al menos 2 preguntas sin respuesta, 1 enumeración (\"A, B y C\") y como máximo 1 frase entre ¡ y !.",
     "en": "Include at least 2 unanswered questions, 1 list (\"A, B and C\") and at most 1 sentence ending with !."
    },
    "variedad": {
     "es": "",
     "en": ""
    },
    "pausas": {
     "es": "Como máximo 2 [pausa] y 2 [respira] por sección.",
     "en": "At most 2 [pause] and 2 [breathe] per section."
    }
   }
  },
  "social": {
   "key": "social",
   "num": 9,
   "nombre": {
    "es": "Reels",
    "en": "Social media"
   },
   "bloque": {
    "es": "Locución para videos cortos de redes sociales. Cada sección es un clip independiente de 30 a 45 segundos. Cada clip abre con un gancho en la primera línea (\"Nadie te cuenta esto sobre…\"). Frases de 10 palabras como máximo, ritmo rápido y casi sin pausas; usa [rápido] en datos encadenados. Puedes usar con moderación los modismos del acento. Cierra cada clip con un llamado (\"Síguenos para más\"). Fuerza 5 en todas las secciones.",
    "en": "Voice-over for short social media videos. Each section is a standalone clip of 30 to 45 seconds. Each clip opens with a hook on the first line (\"Nobody tells you this about…\"). Sentences of 10 words max, fast pace and almost no pauses; use [fast] for chained facts. You may use the accent's casual expressions in moderation. Close each clip with a call to action (\"Follow for more\"). Energy 5 in every section."
   },
   "ejemplo": {
    "es": "Nadie te cuenta esto sobre el **café**.\n[rápido]Nació en Etiopía, viajó a Yemen y conquistó el mundo.[/rápido]",
    "en": "Nobody tells you this about **coffee**.\n[fast]It was born in Ethiopia, traveled to Yemen and conquered the world.[/fast]"
   },
   "uso": {
    "es": "TikTok, Shorts, Reels",
    "en": "TikTok, Shorts, Reels"
   },
   "ppm": 170,
   "wps": 100,
   "frases": {
    "es": "13 a 16",
    "en": "13 to 16"
   },
   "enfasis": {
    "es": "6 a 9",
    "en": "6 to 9"
   },
   "vars": {
    "frases": {
     "es": "Frases simples y directas, de 10 palabras como máximo. Varía el largo: mezcla frases muy cortas (3 a 5 palabras) y cortas (6 a 10).",
     "en": "Simple, direct sentences of 10 words max. Vary the length: mix very short sentences (3 to 5 words) and short ones (6 to 10)."
    },
    "contenido": {
     "es": "Incluye al menos 1 pregunta, 2 frases completas entre ¡ y ! y 1 enumeración (\"A, B y C\").",
     "en": "Include at least 1 question, 2 full sentences ending with ! and 1 list (\"A, B and C\")."
    },
    "variedad": {
     "es": "Varía la forma entre secciones: abre cada una de un modo distinto (pregunta, dato, exclamación o escena) y no repitas el mismo orden de tipos de frase.",
     "en": "Vary the shape between sections: open each one differently (question, fact, exclamation or scene) and don't repeat the same order of sentence types."
    },
    "pausas": {
     "es": "Casi sin pausas: como máximo 1 [pausa] por clip.",
     "en": "Almost no pauses: at most 1 [pause] per clip."
    }
   }
  },
  "calm": {
   "key": "calm",
   "num": 10,
   "nombre": {
    "es": "Meditación",
    "en": "Calm"
   },
   "bloque": {
    "es": "Guía de relajación o meditación, con voz suave y lenta. Segunda persona e imperativos amables (\"respira\", \"suelta\", \"imagina\"). Usa el tema como paisaje para imaginar. Usa [lento] y [suave] en casi todo el guion, [respira] cada 2 o 3 frases y [pausa 3s] al final de cada sección. Sin exclamaciones. Casi sin énfasis. Fuerza 1 o 2 en todas las secciones. La última sección vuelve lentamente al presente.",
    "en": "Relaxation or meditation guide, with a soft, slow voice. Second person and gentle imperatives (\"breathe\", \"let go\", \"imagine\"). Use the topic as a landscape to imagine. Use [slow] and [soft] in almost the whole script, [breathe] every 2 or 3 sentences and [pause 3s] at the end of each section. No exclamations. Almost no emphasis. Energy 1 or 2 in every section. The last section slowly returns to the present."
   },
   "ejemplo": {
    "es": "[lento][suave]Cierra los ojos. Imagina el mar en calma.[/suave][/lento]\n[respira] Siente cómo cada ola se lleva un poco de **cansancio**.",
    "en": "[slow][soft]Close your eyes. Imagine a calm sea.[/soft][/slow]\n[breathe] Feel each wave carry away a little **tiredness**."
   },
   "uso": {
    "es": "Relajación, guías para dormir",
    "en": "Relaxation, sleep guides"
   },
   "ppm": 100,
   "wps": 80,
   "frases": {
    "es": "8 a 10",
    "en": "8 to 10"
   },
   "enfasis": {
    "es": "0 o 1",
    "en": "0 or 1"
   },
   "vars": {
    "frases": {
     "es": "Frases simples y directas, de 20 palabras como máximo. Varía el largo: mezcla frases cortas (5 a 8 palabras) y medianas (12 a 18).",
     "en": "Simple, direct sentences of 20 words max. Vary the length: mix short sentences (5 to 8 words) and medium ones (12 to 18)."
    },
    "contenido": {
     "es": "Incluye al menos 2 preguntas suaves y 1 enumeración (\"A, B y C\"). No uses exclamaciones: ningún ¡ ni !.",
     "en": "Include at least 2 gentle questions and 1 list (\"A, B and C\"). Don't use exclamations: no ! at all."
    },
    "variedad": {
     "es": "",
     "en": ""
    },
    "pausas": {
     "es": "Usa [respira] cada 2 o 3 frases y [pausa 3s] al final de cada sección.",
     "en": "Use [breathe] every 2 or 3 sentences and [pause 3s] at the end of each section."
    }
   }
  }
 },
 "largo": {
  "normal": {
   "es": "{SECCIONES} secciones. Cada sección tiene {FRASES} frases (unas {PALABRAS_SECCION} palabras).",
   "en": "{SECTIONS} sections. Each section has {SENTENCES} sentences (about {SECTION_WORDS} words)."
  },
  "documentary": {
   "es": "{SECCIONES} secciones: la primera (preguntas) y la última (cierre) son cortas; cada una de las otras {COMPLETAS} tiene {FRASES} frases (unas {PALABRAS_SECCION} palabras).",
   "en": "{SECTIONS} sections: the first (questions) and the last (closing) are short; each of the other {FULL} has {SENTENCES} sentences (about {SECTION_WORDS} words)."
  },
  "mystery": {
   "es": "{SECCIONES} secciones: la última es muy corta; cada una de las otras {COMPLETAS} tiene {FRASES} frases (unas {PALABRAS_SECCION} palabras).",
   "en": "{SECTIONS} sections: the last one is very short; each of the other {FULL} has {SENTENCES} sentences (about {SECTION_WORDS} words)."
  }
 },
 "accents": {
  "es": [
   {
    "nombre": "Chileno",
    "trato": "Tú",
    "usa": "harto, al tiro, auto, celular, computador, plata, \"fíjate que\"",
    "evita": "carro, computadora, platicar, vosotros, voseo",
    "extra": "cachai, po, bacán, fome"
   },
   {
    "nombre": "Latino neutro",
    "trato": "Tú / ustedes",
    "usa": "auto, celular, computadora, dinero",
    "evita": "modismos regionales, vosotros, voseo",
    "extra": ""
   },
   {
    "nombre": "Mexicano",
    "trato": "Tú / ustedes",
    "usa": "carro, platicar, ahorita, celular, computadora, padre (bueno)",
    "evita": "vosotros, voseo",
    "extra": "chido, neta, güey"
   },
   {
    "nombre": "Rioplatense",
    "trato": "Vos / ustedes",
    "usa": "vos tenés, mirá, auto, plata, celular, computadora",
    "evita": "tú, vosotros",
    "extra": "che, re (re lindo), copado"
   },
   {
    "nombre": "Colombiano",
    "trato": "Tú o usted",
    "usa": "carro, celular, computador, plata, de una",
    "evita": "vosotros, voseo",
    "extra": "bacano, parce, chévere"
   },
   {
    "nombre": "España",
    "trato": "Tú / vosotros",
    "usa": "móvil, ordenador, coche, conducir, vale, vosotros",
    "evita": "carro, celular, computadora, ustedes informal",
    "extra": "mola, tío, guay"
   }
  ],
  "en": [
   {
    "nombre": "American (US)",
    "usa": "apartment, elevator, cell phone, vacation, feet, miles, Fahrenheit; US spelling (color)",
    "evita": "flat, lift, mobile, holiday, metres",
    "extra": "gonna, wanna, awesome, y'all"
   },
   {
    "nombre": "British (UK)",
    "usa": "flat, lift, mobile, holiday, metres, Celsius; UK spelling (colour)",
    "evita": "apartment, elevator, cell phone, vacation, feet",
    "extra": "brilliant, cheers, mate, quite good"
   },
   {
    "nombre": "Neutral / International",
    "usa": "plain international vocabulary, metric units",
    "evita": "regional slang and idioms",
    "extra": ""
   }
  ]
 },
 "topics": [
  {
   "n": 1,
   "es": "El océano profundo: animales, presión, oscuridad.",
   "en": "The deep ocean: creatures, pressure, darkness."
  },
  {
   "n": 2,
   "es": "La historia de algo cotidiano: el café, la bicicleta o el chocolate.",
   "en": "The story of an everyday thing: coffee, the bicycle or chocolate."
  },
  {
   "n": 3,
   "es": "Un viaje por un lugar: la Patagonia, una gran ciudad o un desierto.",
   "en": "A journey through a place: Patagonia, a big city or a desert."
  },
  {
   "n": 4,
   "es": "Cómo funciona la tecnología de todos los días: la ubicación del celular, el wifi o la cámara.",
   "en": "How everyday technology works: phone location, wifi or the camera."
  },
  {
   "n": 5,
   "es": "Una anécdota personal ficticia: un primer día de trabajo o un viaje que salió mal.",
   "en": "A fictional personal story: a first day at work or a trip that went wrong."
  }
 ],
 "templates": {
  "es": "Eres guionista experto en locución. Escribe un guion para que una persona lo lea\nen voz alta y grabe su voz para crear un clon de voz con IA.\n\nDATOS\n- Idioma: {IDIOMA}\n- Acento: {ACENTO}. {GUIA_ACENTO}\n- Estilo: {ESTILO}\n- Tema: {TEMA}\n- Largo: {LARGO}\n  En total, unas {PALABRAS} palabras ≈ {MINUTOS} minutos.\n  Cuenta las frases de cada sección antes de entregar.\n{PARTE}\n\nCÓMO DEBE SONAR ESTE ESTILO\n{BLOQUE_ESTILO}\nSi el estilo contradice alguna regla de abajo, manda el estilo.\n\nESCRIBE COMO SE HABLA\n- {REGLA_FRASES}\n- Como máximo 2 adverbios terminados en \"-mente\" en todo el guion.\n- Evita palabras de texto escrito (conforme, asimismo, considerablemente,\n  \"podemos mencionar\") y no repitas el mismo adjetivo.\n- {CONTENIDO_MINIMO}\n- {REGLA_VARIEDAD}\n- Usa, de forma natural, al menos una palabra con cada sonido:\n  r inicial, rr, ñ, ll/y, j/ge/gi, ch, x, z/ce/ci, tr, bl, pl, cr, gl, pr, fr, dr.\n  Ejemplos de referencia: río, tierra, año, lluvia, gente, noche, examen, cielo,\n  tren, blanco, planeta, cristal, siglo (o regla, iglú, inglés), profundo, frío, piedra.\n  No copies estos ejemplos: busca palabras que encajen con el tema.\n- Las palabras de la guía de acento son referencia: úsalas solo si encajan natural.\n- Escribe números, siglas y símbolos como se pronuncian (\"mil trescientos\", \"por ciento\").\n- Usa datos generales correctos. Si no estás seguro de una cifra, no la pongas\n  o redondéala con \"cerca de\".\n- No inventes hechos sobre personas reales ni uses marcas comerciales reales.\n- Nada de emojis, títulos decorativos ni acotaciones entre paréntesis.\n\nÉNFASIS\n- En cada sección, marca con **palabra** exactamente {ENFASIS} palabras.\n  Nunca más de una por frase; las demás frases van sin énfasis.\n- Elige la palabra que carga el sentido: un dato, un contraste o algo nuevo.\n  No la pongas por defecto al final de la frase.\n  Bien: La presión es **mil** veces mayor que en la superficie.\n  Mal:  La presión es mil veces mayor que en la **superficie**.\n\nFORMATO OBLIGATORIO (el teleprompter lo lee automáticamente)\n- # Título de sección   → una por cada sección pedida\n- @fuerza 1-5           → justo debajo de cada título; vale para toda la sección\n                          (si una parte necesita otra energía, haz otra sección)\n- > nota                → una indicación breve para quien lee (no se lee en voz alta)\n- [pausa] o [pausa 2s]  → pausa extra; al final de una frase o en su propia línea\n- [respira]             → dónde tomar aire\n- Pausas: {LIMITE_PAUSAS}\n- [lento]...[/lento]  [rápido]...[/rápido]  [suave]...[/suave]  [fuerte]...[/fuerte]\n                        → pueden abarcar varias líneas, cerrándose en la misma sección\n- [sube]                → solo en preguntas, después del signo:\n                          ¿Qué hay en el fondo del mar? [sube]\n- [baja]                → solo al final de la última frase de una sección\n                          Ejemplo: Y ahora ya sabes por qué. [baja]\n- palabra{pro-nun-CIA}  → solo para nombres difíciles, sílaba tónica en mayúsculas;\n                          con énfasis: **Tajumulco{ta-hu-MUL-co}**\n- Una frase por línea. Las líneas en blanco solo separan; no hacen pausa.\n- No uses ningún otro símbolo ni comando, y escríbelos exactamente así.\n\nEntrega SOLO el guion, dentro de un bloque de código, sin explicaciones antes ni después.",
  "en": "You are an expert voice-over scriptwriter. Write a script for a person to read aloud\nand record their voice to create an AI voice clone.\n\nDETAILS\n- Language: {LANGUAGE}\n- Accent: {ACCENT}. {ACCENT_GUIDE}\n- Style: {STYLE}\n- Topic: {TOPIC}\n- Length: {LENGTH}\n  In total, about {WORDS} words ≈ {MINUTES} minutes.\n  Count the sentences in each section before you answer.\n{PART}\n\nHOW THIS STYLE SHOULD SOUND\n{STYLE_BLOCK}\nIf the style contradicts any rule below, the style wins.\n\nWRITE THE WAY PEOPLE SPEAK\n- {SENTENCE_RULE}\n- No more than 3 adverbs ending in \"-ly\" in the whole script.\n- Avoid formal written words (furthermore, moreover, considerably,\n  \"it is worth mentioning\") and don't repeat the same adjective.\n- {MIN_CONTENT}\n- {VARIETY_RULE}\n- Naturally use at least one word with each sound:\n  voiced th, voiceless th, r, l, v, b, sh, ch, j, zh, ng, w, wh,\n  long and short vowels, and diphthongs.\n  Reference examples: this, think, river, light, voice, blue, shell, chair, jump,\n  measure, sing, water, whale, sheep, ship, now, boy.\n  Don't copy these examples: find words that fit the topic.\n- The accent guide words are a reference: use them only if they fit naturally.\n- Write numbers, acronyms and symbols as spoken (\"thirteen hundred\", \"percent\").\n- Use correct general facts. If you're not sure about a number, leave it out\n  or round it with \"about\".\n- Don't invent facts about real people or use real brand names.\n- No emojis, decorative headings or stage directions in parentheses.\n\nEMPHASIS\n- In each section, mark exactly {EMPHASIS} words with **word**.\n  Never more than one per sentence; the other sentences have no emphasis.\n- Pick the word that carries the meaning: a fact, a contrast or something new.\n  Don't put it at the end of the sentence by default.\n  Good: The pressure is a **thousand** times greater than at the surface.\n  Bad:  The pressure is a thousand times greater than at the **surface**.\n\nREQUIRED FORMAT (the teleprompter reads it automatically)\n- # Section title       → one for each requested section\n- @energy 1-5           → right below each title; applies to the whole section\n                          (if a part needs different energy, make another section)\n- > note                → a short direction for the reader (not read aloud)\n- [pause] or [pause 2s] → extra pause; at the end of a sentence or on its own line\n- [breathe]             → where to take a breath\n- Pauses: {PAUSE_LIMIT}\n- [slow]...[/slow]  [fast]...[/fast]  [soft]...[/soft]  [loud]...[/loud]\n                        → may span several lines, closing within the same section\n- [up]                  → only on questions, after the question mark:\n                          What's at the bottom of the sea? [up]\n- [down]                → only at the end of the last sentence of a section\n                          Example: And now you know why. [down]\n- word{pro-NUN-ci-a-tion} → only for hard names, stressed syllable in capitals;\n                          with emphasis: **Tajumulco{ta-hu-MUL-co}**\n- One sentence per line. Blank lines only separate; they don't add a pause.\n- Don't use any other symbol or command, and write them exactly as shown.\n\nReturn ONLY the script, inside a code block, with no explanation before or after."
 },
 "parte": {
  "es": "Esta es la parte 1 de {TOTAL}. Cubre solo una parte del tema; las siguientes las pediré después y no deben repetir ideas ni frases.",
  "en": "This is part 1 of {TOTAL}. Cover only one part of the topic; I'll ask for the next parts later, and they must not repeat ideas or sentences."
 },
 "continuacion": {
  "es": "Continúa con la parte {N} de {TOTAL}: {LARGO} Cada sección con {ENFASIS} palabras con **. Mismas reglas y mismo formato. No repitas ideas ni frases de las partes anteriores. Entrega solo el guion, dentro de un bloque de código.",
  "en": "Continue with part {N} of {TOTAL}: {LENGTH} Each section with {EMPHASIS} words marked with **. Same rules and same format. Don't repeat ideas or sentences from previous parts. Return only the script, inside a code block."
 }
};
