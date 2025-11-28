import { BookOpen, Lightbulb, Shield, Code, Terminal, Layers, Compass, Star } from "lucide-react";

export interface GuideSection {
  id: string;
  title: string;
  icon?: any;
  content: GuideContentBlock[];
  subsections?: GuideSection[];
}

export type GuideContentBlock = 
  | { type: "text"; content: string }
  | { type: "highlight"; title: string; content: string; icon?: string }
  | { type: "prompt"; title?: string; content: string; source?: string }
  | { type: "grid"; columns: { title: string; content: string; icon?: string; color?: string }[] }
  | { type: "process"; steps: { title: string; description?: string }[] }
  | { type: "warning"; title: string; content: string };

export const guideContent: GuideSection[] = [
  {
    id: "introduction",
    title: "Introducción",
    icon: BookOpen,
    content: [
      {
        type: "highlight",
        title: "La comunicación efectiva con IA: una disciplina estructurada",
        content: "La comunicación efectiva con modelos de lenguaje de gran escala (LLMs) como Gemini y ChatGPT no es un acto de magia, sino una disciplina estructurada conocida como ingeniería de prompts. Esta práctica es la habilidad definitiva que separa a los usuarios que obtienen resultados consistentes de aquellos que se frustran con respuestas vagas.",
        icon: "✨"
      },
      {
        type: "grid",
        columns: [
          {
            title: "El Prompt Perfecto",
            content: "En su núcleo, un 'prompt' es la instrucción, pregunta o entrada que se proporciona a un modelo de IA. La calidad de la salida depende directamente de la claridad, el contexto y la estructura de esta instrucción inicial.",
            color: "blue"
          },
          {
            title: "Transformación del Usuario",
            content: "Dominar el arte de crear prompts transforma al usuario de un espectador pasivo en un director activo capaz de orquestar el potencial completo de la IA para una multitud de tareas.",
            color: "purple"
          }
        ]
      }
    ]
  },
  {
    id: "fundamentals",
    title: "Principios Fundamentales",
    icon: Layers,
    subsections: [
      {
        id: "clarity-specificity",
        title: "Claridad y Especificidad",
        content: [
          {
            type: "text",
            content: "La claridad y la especificidad son los cimientos sobre los cuales se construye cualquier prompt exitoso. Un LLM interpreta las instrucciones con una literalidad que requiere que el usuario sea explícito y detallado."
          },
          {
            type: "warning",
            title: "La vaguedad es el enemigo",
            content: "Un prompt como 'escribe algo sobre marketing' es demasiado abierto y probablemente generará una respuesta genérica y poco útil."
          },
          {
            type: "prompt",
            title: "Ejemplo de prompt específico",
            content: "Redacta un artículo de blog de 800 palabras sobre las últimas 5 tendencias de marketing digital en 2025 para pequeñas empresas, incluyendo ejemplos prácticos y un tono profesional pero accesible.",
            source: "CNET Prompting Hacks"
          },
          {
            type: "grid",
            columns: [
              {
                title: "Definir Objetivos",
                content: "Desglosa la solicitud en componentes básicos: quién, qué, dónde, cuándo y por qué.",
                color: "blue"
              },
              {
                title: "Evitar Ambigüedad",
                content: "Evita términos vagos como 'interesante' o 'bueno'. Sé específico sobre el tono y formato.",
                color: "green"
              }
            ]
          }
        ]
      },
      {
        id: "context-power",
        title: "Poder del Contexto",
        content: [
          {
            type: "text",
            content: "El contexto es el alma de un prompt efectivo. Proporcionar información de fondo, asignar roles y ofrecer ejemplos son técnicas poderosas."
          },
          {
            type: "highlight",
            title: "Role-Playing: Asignación de Roles",
            content: "La técnica de 'role-playing' guía el comportamiento y estilo del LLM. Al comenzar con 'Actúa como...', se proporciona una 'persona' que adoptar.",
            icon: "🎭"
          },
          {
            type: "prompt",
            title: "Ejemplo de role-playing",
            content: "Actúa como un profesor de física explicando un concepto a estudiantes de secundaria. Explica la gravedad de manera simple usando analogías y ejemplos cotidianos."
          },
          {
            type: "highlight",
            title: "Few-Shot Prompting",
            content: "Proporcionar uno o varios ejemplos de la tarea deseada antes de la solicitud real sirve como plantilla que guía al modelo sobre el formato y estilo esperado.",
            icon: "💡"
          }
        ]
      },
      {
        id: "structure-format",
        title: "Estructura y Formato",
        content: [
          {
            type: "text",
            content: "Un prompt bien organizado ayuda al modelo a procesar la información de manera más eficiente."
          },
          {
            type: "grid",
            columns: [
              {
                title: "Delimitadores",
                content: "Usa comillas triples, guiones o etiquetas XML para separar secciones.",
                icon: "Code"
              },
              {
                title: "Formato de Salida",
                content: "Especifica JSON, tablas Markdown o listas como formato esperado.",
                icon: "Table"
              },
              {
                title: "Pasos Secuenciales",
                content: "Desglosa tareas complejas en pasos lógicos y secuenciales.",
                icon: "ListOrdered"
              }
            ]
          },
          {
            type: "prompt",
            title: "Ejemplo de estructura con delimitadores",
            content: `<contexto>
  Eres un analista de datos trabajando para una empresa de comercio electrónico.
</contexto>

<tarea>
  Analiza el siguiente conjunto de datos de ventas y proporciona un resumen de las 3 principales tendencias.
</tarea>

<formato_de_salida>
  Proporciona tu respuesta en una lista con viñetas.
</formato_de_salida>`
          }
        ]
      },
      {
        id: "continuous-improvement",
        title: "Mejora Continua",
        content: [
          {
            type: "text",
            content: "La creación de un prompt perfecto es un proceso iterativo. La primera respuesta es solo el punto de partida."
          },
          {
            type: "process",
            steps: [
              { title: "Prompt Inicial" },
              { title: "Análisis de Respuesta" },
              { title: "Ajuste y Refinamiento" },
              { title: "Prompt Optimizado" }
            ]
          },
          {
            type: "grid",
            columns: [
              {
                title: "Análisis Crítico",
                content: "Analiza la respuesta: ¿Fue demasiado larga o corta? ¿El tono fue adecuado? ¿Faltó información clave?",
                color: "green"
              },
              {
                title: "Experimentación",
                content: "Prueba diferentes enfoques: few-shot prompting, diferentes delimitadores, ajuste de parámetros.",
                color: "orange"
              }
            ]
          }
        ]
      }
    ],
    content: []
  },
  {
    id: "advanced-techniques",
    title: "Técnicas Avanzadas",
    icon: Compass,
    subsections: [
      {
        id: "control-parameters",
        title: "Control de Parámetros",
        content: [
          {
            type: "text",
            content: "Existen 'parámetros ocultos' que pueden ser influenciados a través del lenguaje natural para controlar el razonamiento y la verbosidad."
          },
          {
            type: "grid",
            columns: [
              {
                title: "Modulando la Profundidad",
                content: "Instrucciones como 'Piensa detenidamente' o 'Razona paso a paso' inducen una cadena de pensamiento más profunda.",
                color: "yellow"
              },
              {
                title: "Ajustando la Longitud",
                content: "Controla la extensión con instrucciones como 'Dame la conclusión en 100 palabras o menos'.",
                color: "purple"
              }
            ]
          }
        ]
      },
      {
        id: "truth-anchoring",
        title: "Anclaje de la Verdad",
        content: [
          {
            type: "warning",
            title: "El Desafío de las Alucinaciones",
            content: "Los LLMs pueden generar información plausible pero incorrecta. Las técnicas de anclaje de la verdad buscan mitigar este problema."
          },
          {
            type: "grid",
            columns: [
              {
                title: "Bloques de Verdad",
                content: "Pega documentos completos y usa la directiva: 'Estás obligado al siguiente bloque de verdad. No lo contradigas.'",
                color: "blue"
              },
              {
                title: "Rúbricas de Autoevaluación",
                content: "Pide al modelo que genere sus propios criterios de evaluación y se evalúe a sí mismo.",
                color: "green"
              }
            ]
          }
        ]
      },
      {
        id: "coaching-techniques",
        title: "Coaching Dinámico",
        content: [
          {
            type: "highlight",
            title: "Coaching Contrastivo",
            content: "Muestra al modelo un ejemplo de lo que NO se quiere antes de pedir la versión correcta.",
            icon: "⚖️"
          },
          {
            type: "prompt",
            content: "Aquí tienes un ejemplo de un resumen de producto que es demasiado genérico y aburrido: [ejemplo malo]. Ahora, escribe un resumen para el mismo producto que sea específico, emocionante y que realmente venda las ventajas únicas."
          },
          {
            type: "grid",
            columns: [
              {
                title: "Comandos en Vivo",
                content: "Cambia el modo de pensamiento: 'Ahora cambia al modo análisis lógico' o 'Modo creativo'.",
                color: "teal"
              },
              {
                title: "Actualizaciones de Estado",
                content: "Pide actualizaciones de progreso después de cada paso principal.",
                color: "orange"
              }
            ]
          }
        ]
      }
    ],
    content: []
  },
  {
    id: "practical-applications",
    title: "Aplicaciones Prácticas",
    icon: Star,
    content: [
      {
        type: "grid",
        columns: [
          {
            title: "Creación de Contenido",
            content: "Transforma ideas vagas en contenido específico. Ejemplo: 'Crea un plan de contenidos para Instagram con tabla de 12 ideas'.",
            color: "blue"
          },
          {
            title: "Desarrollo de Software",
            content: "Genera código de calidad. Ejemplo: 'Crea una API REST en Python con autenticación JWT y documentación Swagger'.",
            color: "purple"
          }
        ]
      },
      {
        type: "highlight",
        title: "Estructura de Prompt Universal",
        content: "1. Rol (Quién eres) 2. Contexto (Fondo) 3. Tarea (Qué hacer) 4. Formato (Cómo entregar)",
        icon: "🚀"
      },
      {
        type: "prompt",
        title: "Plantilla Universal",
        content: `Actúa como [ROL/EXPERTO]. 
El contexto es [CONTEXTO/ANTECEDENTES]. 
Tu tarea es [TAREA ESPECÍFICA]. 
Proporciona el resultado en [FORMATO DE SALIDA DESCRITO].`
      },
      {
        type: "prompt",
        title: "Ejemplo Completo",
        content: "Actúa como un chef profesional experto en cocina mediterránea. El contexto es que necesitamos planificar un menú de cena romántica para dos personas, una de las cuales es vegetariana. Tu tarea es crear un menú completo de 3 platos (entrante, principal y postre) que sea elegante pero fácil de preparar. Proporciona el resultado en una tabla con columnas para cada plato, ingredientes, tiempo de preparación y pasos simplificados."
      }
    ]
  }
];
