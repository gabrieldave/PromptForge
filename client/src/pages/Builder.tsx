import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Copy, 
  RotateCcw, 
  Sparkles, 
  Wand2, 
  CheckCircle2, 
  ArrowRight,
  MessageSquare,
  UserCircle,
  FileText,
  Settings,
  LayoutTemplate,
  Zap,
  Brain,
  Target,
  Layers,
  TrendingUp,
  AlertCircle,
  Info,
  Code,
  BookOpen,
  Lightbulb,
  ChevronRight,
  Play
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Técnicas avanzadas basadas en el PDF
type AdvancedTechnique = "none" | "few-shot" | "chain-of-thought" | "react" | "tree-of-thoughts" | "self-consistency";

interface TechniqueConfig {
  id: AdvancedTechnique;
  name: string;
  description: string;
  icon: any;
  color: string;
  examples?: number;
  steps?: number;
}

const techniques: TechniqueConfig[] = [
  {
    id: "none",
    name: "Básico",
    description: "Prompt simple sin técnicas avanzadas",
    icon: MessageSquare,
    color: "gray"
  },
  {
    id: "few-shot",
    name: "Few-Shot Learning",
    description: "Proporciona ejemplos para guiar el modelo",
    icon: Layers,
    color: "blue",
    examples: 3
  },
  {
    id: "chain-of-thought",
    name: "Chain of Thought (CoT)",
    description: "Razonamiento paso a paso explícito",
    icon: Brain,
    color: "purple",
    steps: 5
  },
  {
    id: "react",
    name: "ReAct (Reasoning + Acting)",
    description: "Combina razonamiento con acciones",
    icon: Zap,
    color: "orange"
  },
  {
    id: "tree-of-thoughts",
    name: "Tree of Thoughts",
    description: "Exploración de múltiples líneas de razonamiento",
    icon: TrendingUp,
    color: "green"
  },
  {
    id: "self-consistency",
    name: "Self-Consistency",
    description: "Genera múltiples respuestas y selecciona la más consistente",
    icon: Target,
    color: "red"
  }
];

// Templates profesionales
const professionalTemplates = [
  {
    id: "universal",
    name: "Universal",
    icon: Sparkles,
    description: "Plantilla estándar para cualquier tarea",
    role: "Asistente experto",
    context: "",
    task: "",
    format: "Respuesta clara y concisa"
  },
  {
    id: "coding",
    name: "Desarrollo",
    icon: Code,
    description: "Generación de código y arquitectura",
    role: "Ingeniero de Software Senior con 10+ años de experiencia",
    context: "Estamos construyendo una aplicación moderna usando las mejores prácticas de la industria.",
    task: "Genera código limpio, bien documentado y siguiendo principios SOLID.",
    format: "Código con comentarios explicativos y estructura modular.",
    technique: "chain-of-thought" as AdvancedTechnique
  },
  {
    id: "content",
    name: "Contenido",
    icon: FileText,
    description: "Blogs, redes sociales y copywriting",
    role: "Estratega de Contenido y Copywriter Profesional",
    context: "La audiencia objetivo son profesionales jóvenes y emprendedores.",
    task: "Crea contenido atractivo, persuasivo y optimizado para engagement.",
    format: "Tono profesional pero cercano, con estructura clara y llamados a la acción.",
    technique: "few-shot" as AdvancedTechnique
  },
  {
    id: "analysis",
    name: "Análisis",
    icon: TrendingUp,
    description: "Análisis de datos y extracción de insights",
    role: "Analista de Datos Senior especializado en Business Intelligence",
    context: "Tenemos datos de ventas, marketing y operaciones que necesitan análisis profundo.",
    task: "Identifica patrones, tendencias y oportunidades de mejora.",
    format: "Tabla comparativa, gráficos conceptuales y lista de conclusiones accionables.",
    technique: "chain-of-thought" as AdvancedTechnique
  },
  {
    id: "legal",
    name: "Legal",
    icon: BookOpen,
    description: "Documentos legales y análisis jurídico",
    role: "Abogado Senior especializado en derecho corporativo",
    context: "Necesitamos análisis preciso de documentos legales y contratos.",
    task: "Analiza, resume y proporciona recomendaciones legales.",
    format: "Estructura legal formal con referencias y citas cuando sea apropiado.",
    technique: "react" as AdvancedTechnique
  },
  {
    id: "creative",
    name: "Creativo",
    icon: Lightbulb,
    description: "Ideas, brainstorming y creatividad",
    role: "Director Creativo con experiencia en múltiples industrias",
    context: "Buscamos ideas innovadoras y fuera de lo común.",
    task: "Genera conceptos creativos, únicos y viables.",
    format: "Lista de ideas con descripción breve y potencial de implementación.",
    technique: "tree-of-thoughts" as AdvancedTechnique
  }
];

export default function Builder() {
  const { toast } = useToast();
  
  // Template selection
  const [selectedTemplate, setSelectedTemplate] = useState(professionalTemplates[0]);
  
  // Form state
  const [role, setRole] = useState(professionalTemplates[0].role);
  const [context, setContext] = useState(professionalTemplates[0].context);
  const [task, setTask] = useState(professionalTemplates[0].task);
  const [constraints, setConstraints] = useState("");
  const [format, setFormat] = useState(professionalTemplates[0].format);
  
  // Advanced technique
  const [technique, setTechnique] = useState<AdvancedTechnique>("none");
  const [fewShotExamples, setFewShotExamples] = useState<string[]>(["", "", ""]);
  const [cotSteps, setCotSteps] = useState<string[]>(Array(5).fill(""));
  
  // Hyperparameters
  const [temperature, setTemperature] = useState([0.7]);
  const [topP, setTopP] = useState([0.9]);
  const [frequencyPenalty, setFrequencyPenalty] = useState([0.0]);
  const [presencePenalty, setPresencePenalty] = useState([0.0]);
  const [maxTokens, setMaxTokens] = useState([2000]);
  
  // Advanced options
  const [useSystemMessage, setUseSystemMessage] = useState(true);
  const [enableGrounding, setEnableGrounding] = useState(false);
  const [preventHallucinations, setPreventHallucinations] = useState(true);
  
  // Validation
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Load template
  const handleTemplateChange = (template: typeof professionalTemplates[0]) => {
    setSelectedTemplate(template);
    setRole(template.role);
    setContext(template.context);
    setTask(template.task);
    setFormat(template.format);
    setTechnique(template.technique || "none");
    setConstraints("");
  };

  // Validate prompt
  const validatePrompt = () => {
    const errors: string[] = [];
    
    if (!role.trim()) errors.push("El rol es obligatorio");
    if (!task.trim()) errors.push("La tarea es obligatoria");
    
    if (technique === "few-shot") {
      const validExamples = fewShotExamples.filter(e => e.trim()).length;
      if (validExamples < 2) {
        errors.push("Few-Shot requiere al menos 2 ejemplos");
      }
    }
    
    if (technique === "chain-of-thought") {
      const validSteps = cotSteps.filter(s => s.trim()).length;
      if (validSteps < 3) {
        errors.push("Chain of Thought requiere al menos 3 pasos de razonamiento");
      }
    }
    
    if (temperature[0] > 0.9 && preventHallucinations) {
      errors.push("Temperatura alta puede causar alucinaciones. Considera reducirla.");
    }
    
    setValidationErrors(errors);
    return errors.length === 0;
  };

  // Construct the final prompt
  const constructPrompt = () => {
    let prompt = "";
    
    // System message (if enabled)
    if (useSystemMessage) {
      prompt += `[SISTEMA]\nActúa como: ${role}\n\n`;
    }
    
    // Context
    if (context.trim()) {
      prompt += `[CONTEXTO]\n${context}\n\n`;
    }
    
    // Grounding instruction
    if (enableGrounding) {
      prompt += `[GROUNDING]\nBase tu respuesta ÚNICAMENTE en la información proporcionada en el contexto. Si no tienes información suficiente, indica claramente qué falta.\n\n`;
    }
    
    // Anti-hallucination
    if (preventHallucinations) {
      prompt += `[INSTRUCCIÓN CRÍTICA]\nSolo proporciona información verificada. Si no estás seguro de algo, indica "No tengo información suficiente sobre [tema]". Evita inventar datos, fechas o hechos.\n\n`;
    }
    
    // Few-Shot examples
    if (technique === "few-shot") {
      prompt += `[EJEMPLOS FEW-SHOT]\nA continuación se muestran ${fewShotExamples.filter(e => e.trim()).length} ejemplos de la tarea:\n\n`;
      fewShotExamples.forEach((example, i) => {
        if (example.trim()) {
          prompt += `Ejemplo ${i + 1}:\n${example}\n\n`;
        }
      });
      prompt += `Ahora realiza la tarea siguiendo el mismo formato y estilo:\n\n`;
    }
    
    // Chain of Thought
    if (technique === "chain-of-thought") {
      prompt += `[RAZONAMIENTO PASO A PASO]\nPara resolver esta tarea, sigue estos pasos de razonamiento:\n\n`;
      cotSteps.forEach((step, i) => {
        if (step.trim()) {
          prompt += `Paso ${i + 1}: ${step}\n`;
        }
      });
      prompt += `\nAhora aplica este razonamiento paso a paso:\n\n`;
    }
    
    // ReAct
    if (technique === "react") {
      prompt += `[REACT - REASONING + ACTING]\nPara resolver esta tarea, combina razonamiento con acciones:\n\n`;
      prompt += `Pensamiento: [Analiza el problema]\n`;
      prompt += `Acción: [Qué acción tomar]\n`;
      prompt += `Observación: [Resultado de la acción]\n`;
      prompt += `... (repite hasta resolver)\n\n`;
    }
    
    // Tree of Thoughts
    if (technique === "tree-of-thoughts") {
      prompt += `[TREE OF THOUGHTS]\nExplora múltiples líneas de razonamiento:\n\n`;
      prompt += `1. Línea A: [Primera aproximación]\n`;
      prompt += `2. Línea B: [Segunda aproximación]\n`;
      prompt += `3. Línea C: [Tercera aproximación]\n`;
      prompt += `\nEvalúa cada línea y selecciona la mejor o combínalas:\n\n`;
    }
    
    // Self-Consistency
    if (technique === "self-consistency") {
      prompt += `[SELF-CONSISTENCY]\nGenera 3 respuestas diferentes a esta tarea. Luego, analiza cuál es la más consistente y completa, y presenta esa como respuesta final.\n\n`;
    }
    
    // Main task
    prompt += `[TAREA PRINCIPAL]\n${task}\n\n`;
    
    // Constraints
    if (constraints.trim()) {
      prompt += `[RESTRICCIONES]\n${constraints}\n\n`;
    }
    
    // Format
    if (format.trim()) {
      prompt += `[FORMATO DE SALIDA]\n${format}\n\n`;
    }
    
    return prompt;
  };

  const constructedPrompt = constructPrompt();

  const copyToClipboard = () => {
    if (!validatePrompt()) {
      toast({
        title: "Errores de validación",
        description: "Por favor corrige los errores antes de copiar",
        variant: "destructive"
      });
      return;
    }
    
    navigator.clipboard.writeText(constructedPrompt);
    toast({
      title: "¡Prompt copiado!",
      description: "Listo para usar en ChatGPT, Claude o Gemini.",
    });
  };

  const copyWithHyperparameters = () => {
    if (!validatePrompt()) {
      toast({
        title: "Errores de validación",
        description: "Por favor corrige los errores antes de copiar",
        variant: "destructive"
      });
      return;
    }
    
    const config = `\n\n--- CONFIGURACIÓN DE HIPERPARÁMETROS ---
Temperature: ${temperature[0]}
Top_P: ${topP[0]}
Frequency Penalty: ${frequencyPenalty[0]}
Presence Penalty: ${presencePenalty[0]}
Max Tokens: ${maxTokens[0]}

Nota: Estos parámetros deben configurarse en la API del modelo, no en el prompt.`;
    
    navigator.clipboard.writeText(constructedPrompt + config);
    toast({
      title: "¡Prompt + Config copiado!",
      description: "Incluye la configuración de hiperparámetros.",
    });
  };

  const clearAll = () => {
    setRole("");
    setContext("");
    setTask("");
    setConstraints("");
    setFormat("");
    setTechnique("none");
    setFewShotExamples(["", "", ""]);
    setCotSteps(Array(5).fill(""));
    setValidationErrors([]);
  };

  useEffect(() => {
    validatePrompt();
  }, [role, task, technique, fewShotExamples, cotSteps, temperature, preventHallucinations]);

  const selectedTechniqueConfig = techniques.find(t => t.id === technique);

  return (
    <AppLayout>
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text flex items-center gap-2 sm:gap-3 mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 flex-shrink-0">
                <Wand2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="break-words">PromptForge</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
              Constructor avanzado de prompts con técnicas de ingeniería profesional
            </p>
          </div>
          <Badge variant="outline" className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 border border-primary/30 bg-primary/10 backdrop-blur-sm self-start sm:self-auto">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-primary" />
            v2.0 Pro
          </Badge>
        </div>
      </div>

      {/* Validation Alerts */}
      {validationErrors.length > 0 && (
        <Alert variant="destructive" className="mb-6 border-2 border-destructive bg-transparent">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Errores de validación</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside mt-2">
              {validationErrors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
        {/* LEFT COLUMN: Inputs */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl p-1 gap-1">
              <TabsTrigger value="basic" className="text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white data-[state=active]:shadow-lg">Básico</TabsTrigger>
              <TabsTrigger value="technique" className="text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white data-[state=active]:shadow-lg">Técnica</TabsTrigger>
              <TabsTrigger value="hyperparams" className="text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white data-[state=active]:shadow-lg">Hiperparámetros</TabsTrigger>
              <TabsTrigger value="advanced" className="text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white data-[state=active]:shadow-lg">Avanzado</TabsTrigger>
            </TabsList>

            {/* BASIC TAB */}
            <TabsContent value="basic" className="space-y-6 mt-6">
              {/* Template Selector */}
              <Card className="modern-card p-6 relative overflow-hidden">
                <div className="absolute inset-0 animated-gradient opacity-50" />
                <Label className="text-sm font-bold text-foreground mb-4 block relative z-10 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary glow-primary" />
                  Plantilla Profesional
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {professionalTemplates.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleTemplateChange(t)}
                      className={cn(
                        "flex flex-col items-center p-4 rounded-xl transition-all text-center relative overflow-hidden group",
                        selectedTemplate.id === t.id
                          ? "bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/50 shadow-lg shadow-primary/20"
                          : "bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-background/70"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center mb-2 transition-all",
                        selectedTemplate.id === t.id 
                          ? "bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30" 
                          : "bg-secondary group-hover:bg-primary/10"
                      )}>
                        <t.icon className={cn(
                          "w-5 h-5",
                          selectedTemplate.id === t.id ? "text-white" : "text-muted-foreground group-hover:text-primary"
                        )} />
                      </div>
                      <span className="text-xs font-medium">{t.name}</span>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Input Fields */}
              <div className="space-y-6">
                <Card className="modern-card p-6 space-y-3">
                  <Label className="flex items-center gap-3 text-base font-semibold">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/30">
                      <UserCircle className="w-4 h-4 text-primary" />
                    </div>
                    Rol (Persona)
                    <Badge variant="outline" className="ml-2 text-xs border border-primary/30 bg-primary/10">Requerido</Badge>
                  </Label>
                  <Input 
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Ej. Experto en Marketing Digital con 10 años de experiencia..."
                    className="modern-input"
                  />
                  <p className="text-xs text-muted-foreground">
                    Define quién debe ser la IA. Sé específico sobre experiencia y especialización.
                  </p>
                </Card>

                <Card className="modern-card p-6 space-y-3">
                  <Label className="flex items-center gap-3 text-base font-semibold">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/30">
                      <MessageSquare className="w-4 h-4 text-primary" />
                    </div>
                    Contexto
                  </Label>
                  <Textarea 
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    placeholder="Ej. Estamos lanzando un nuevo producto de café orgánico dirigido a jóvenes profesionales..."
                    className="modern-input"
                  />
                  <p className="text-xs text-muted-foreground">
                    Proporciona antecedentes, audiencia objetivo y cualquier información relevante.
                  </p>
                </Card>

                <Card className="modern-card p-6 space-y-3">
                  <Label className="flex items-center gap-3 text-base font-semibold">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/30">
                      <Target className="w-4 h-4 text-primary" />
                    </div>
                    Tarea Específica
                    <Badge variant="outline" className="ml-2 text-xs border border-primary/30 bg-primary/10">Requerido</Badge>
                  </Label>
                  <Textarea 
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Ej. Genera 5 ideas de nombres para la marca, incluyendo una breve explicación del porqué de cada uno."
                    className="modern-input"
                  />
                  <p className="text-xs text-muted-foreground">
                    Usa verbos de acción claros. Sé específico sobre qué quieres obtener.
                  </p>
                </Card>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <Card className="modern-card p-4 space-y-2">
                    <Label className="flex items-center gap-2 font-semibold">
                      <LayoutTemplate className="w-4 h-4 text-primary" />
                      Formato de Salida
                    </Label>
                    <Input 
                      value={format}
                      onChange={(e) => setFormat(e.target.value)}
                      placeholder="Ej. Tabla Markdown, JSON, Lista numerada..."
                      className="modern-input"
                    />
                  </Card>

                  <Card className="modern-card p-4 space-y-2">
                    <Label className="flex items-center gap-2 font-semibold">
                      <FileText className="w-4 h-4 text-primary" />
                      Restricciones
                    </Label>
                    <Input 
                      value={constraints}
                      onChange={(e) => setConstraints(e.target.value)}
                      placeholder="Ej. Máximo 200 palabras, sin jerga técnica..."
                      className="modern-input"
                    />
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* TECHNIQUE TAB */}
            <TabsContent value="technique" className="space-y-6 mt-6">
              <Card className="modern-card p-6 relative overflow-hidden">
                <div className="absolute inset-0 animated-gradient opacity-30" />
                <Label className="text-base font-bold mb-4 block relative z-10 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary glow-primary" />
                  Técnica Avanzada de Ingeniería
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
                  {techniques.map((t) => {
                    const isSelected = technique === t.id;
                    const colorClasses = {
                      blue: isSelected ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20 ring-2 ring-blue-500/20 text-blue-600" : "",
                      purple: isSelected ? "border-purple-500 bg-purple-50 dark:bg-purple-950/20 ring-2 ring-purple-500/20 text-purple-600" : "",
                      orange: isSelected ? "border-orange-500 bg-orange-50 dark:bg-orange-950/20 ring-2 ring-orange-500/20 text-orange-600" : "",
                      green: isSelected ? "border-green-500 bg-green-50 dark:bg-green-950/20 ring-2 ring-green-500/20 text-green-600" : "",
                      red: isSelected ? "border-red-500 bg-red-50 dark:bg-red-950/20 ring-2 ring-red-500/20 text-red-600" : "",
                      gray: isSelected ? "border-gray-500 bg-gray-50 dark:bg-gray-950/20 ring-2 ring-gray-500/20 text-gray-600" : ""
                    };
                    
                    return (
                    <button
                      key={t.id}
                      onClick={() => setTechnique(t.id)}
                      className={cn(
                        "p-5 rounded-xl transition-all text-left relative overflow-hidden group",
                        isSelected 
                          ? "bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/50 shadow-lg shadow-primary/20" 
                          : "bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-background/70"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-all",
                        isSelected 
                          ? "bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30" 
                          : "bg-secondary group-hover:bg-primary/10"
                      )}>
                        <t.icon className={cn(
                          "w-5 h-5",
                          isSelected ? "text-white" : "text-muted-foreground group-hover:text-primary"
                        )} />
                      </div>
                      <div className="font-bold text-sm mb-2">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.description}</div>
                    </button>
                    );
                  })}
                </div>

                {selectedTechniqueConfig && technique !== "none" && (
                  <Alert className="mb-4 border-2 border-border bg-card">
                    <Info className="h-4 w-4" />
                    <AlertTitle>{selectedTechniqueConfig.name}</AlertTitle>
                    <AlertDescription>
                      {selectedTechniqueConfig.description}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Few-Shot Examples */}
                {technique === "few-shot" && (
                  <div className="space-y-4 mt-6">
                    <Label className="text-sm font-bold">Ejemplos Few-Shot</Label>
                    <p className="text-xs text-muted-foreground mb-4">
                      Proporciona 2-5 ejemplos de entrada/salida para guiar al modelo
                    </p>
                    {fewShotExamples.map((example, i) => (
                      <div key={i} className="space-y-2">
                        <Label className="text-xs">Ejemplo {i + 1}</Label>
                        <Textarea
                          value={example}
                          onChange={(e) => {
                            const newExamples = [...fewShotExamples];
                            newExamples[i] = e.target.value;
                            setFewShotExamples(newExamples);
                          }}
                          placeholder={`Ejemplo ${i + 1}: Entrada → Salida esperada`}
                          className="min-h-[80px] text-sm"
                        />
                      </div>
                    ))}
                    {fewShotExamples.length < 5 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setFewShotExamples([...fewShotExamples, ""])}
                      >
                        + Agregar Ejemplo
                      </Button>
                    )}
                  </div>
                )}

                {/* Chain of Thought Steps */}
                {technique === "chain-of-thought" && (
                  <div className="space-y-4 mt-6">
                    <Label className="text-sm font-bold">Pasos de Razonamiento</Label>
                    <p className="text-xs text-muted-foreground mb-4">
                      Define los pasos lógicos que el modelo debe seguir
                    </p>
                    {cotSteps.map((step, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                          {i + 1}
                        </div>
                        <Input
                          value={step}
                          onChange={(e) => {
                            const newSteps = [...cotSteps];
                            newSteps[i] = e.target.value;
                            setCotSteps(newSteps);
                          }}
                          placeholder={`Paso ${i + 1}: Describe qué hacer en este paso`}
                          className="flex-1"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </TabsContent>

            {/* HYPERPARAMETERS TAB */}
            <TabsContent value="hyperparams" className="space-y-6 mt-6">
              <Card className="modern-card p-6">
                <div className="mb-6 pb-4 border-b border-border/50">
                  <Label className="text-base font-bold mb-2 block flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary glow-primary" />
                    Configuración de Hiperparámetros
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Ajusta estos parámetros según el tipo de tarea. Estos se configuran en la API, no en el prompt.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">
                        Temperature: {temperature[0].toFixed(1)}
                      </Label>
                      <Badge variant={temperature[0] < 0.3 ? "default" : temperature[0] > 0.8 ? "destructive" : "secondary"}>
                        {temperature[0] < 0.3 ? "Preciso" : temperature[0] > 0.8 ? "Creativo" : "Balanceado"}
                      </Badge>
                    </div>
                    <Slider
                      value={temperature}
                      onValueChange={setTemperature}
                      min={0}
                      max={2}
                      step={0.1}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      Bajo (0-0.3): Determinista, preciso. Alto (0.8+): Creativo, variado. Recomendado: 0.7 para tareas generales.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">
                        Top_P (Nucleus Sampling): {topP[0].toFixed(1)}
                      </Label>
                    </div>
                    <Slider
                      value={topP}
                      onValueChange={setTopP}
                      min={0}
                      max={1}
                      step={0.05}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      Controla la diversidad. 0.9 considera el 90% de tokens más probables. Recomendado: 0.9.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">
                        Frequency Penalty: {frequencyPenalty[0].toFixed(1)}
                      </Label>
                    </div>
                    <Slider
                      value={frequencyPenalty}
                      onValueChange={setFrequencyPenalty}
                      min={-2}
                      max={2}
                      step={0.1}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      Penaliza tokens repetidos. Positivo reduce repetición. Recomendado: 0.0-0.5.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">
                        Presence Penalty: {presencePenalty[0].toFixed(1)}
                      </Label>
                    </div>
                    <Slider
                      value={presencePenalty}
                      onValueChange={setPresencePenalty}
                      min={-2}
                      max={2}
                      step={0.1}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      Incentiva nuevos temas. Positivo promueve diversidad temática. Recomendado: 0.0-0.6.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">
                        Max Tokens: {maxTokens[0]}
                      </Label>
                    </div>
                    <Slider
                      value={maxTokens}
                      onValueChange={setMaxTokens}
                      min={100}
                      max={8000}
                      step={100}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      Límite de tokens en la respuesta. Ajusta según la complejidad esperada.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* ADVANCED TAB */}
            <TabsContent value="advanced" className="space-y-6 mt-6">
              <Card className="modern-card p-6 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border/50">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Mensaje de Sistema</Label>
                    <p className="text-xs text-muted-foreground">
                      Usa un bloque [SISTEMA] separado para el rol
                    </p>
                  </div>
                  <Switch
                    checked={useSystemMessage}
                    onCheckedChange={setUseSystemMessage}
                  />
                </div>

                <div className="flex items-center justify-between pb-4 border-b border-border/50">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Grounding (Anclaje a la Verdad)</Label>
                    <p className="text-xs text-muted-foreground">
                      Instruye al modelo a basarse solo en información proporcionada
                    </p>
                  </div>
                  <Switch
                    checked={enableGrounding}
                    onCheckedChange={setEnableGrounding}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Prevenir Alucinaciones</Label>
                    <p className="text-xs text-muted-foreground">
                      Agrega instrucciones explícitas para evitar información inventada
                    </p>
                  </div>
                  <Switch
                    checked={preventHallucinations}
                    onCheckedChange={setPreventHallucinations}
                  />
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* RIGHT COLUMN: Preview */}
        <div className="lg:col-span-5 order-first lg:order-last">
          <div className="sticky top-4 sm:top-6 lg:top-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl font-bold">Vista Previa</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={clearAll} className="h-8 text-xs border-2 border-border hover:border-foreground">
                  <RotateCcw className="w-3 h-3 mr-2" />
                  Limpiar
                </Button>
              </div>
            </div>

            <Card className="modern-card bg-gradient-to-br from-card/90 to-card/70 text-foreground overflow-hidden flex flex-col min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] relative border border-primary/20">
              <div className="absolute inset-0 animated-gradient opacity-30" />
              
              <div className="bg-background/50 backdrop-blur-sm px-6 py-4 border-b border-border/50 flex items-center gap-3 relative z-10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="ml-4 text-xs text-muted-foreground font-mono px-3 py-1.5 rounded-md bg-background/50 border border-border/50">
                  prompt_forge_v2.txt
                </div>
                {selectedTechniqueConfig && technique !== "none" && (
                  <Badge variant="outline" className="ml-auto text-xs border border-primary/30 bg-primary/10">
                    {selectedTechniqueConfig.name}
                  </Badge>
                )}
              </div>

              <div className="p-6 font-mono text-sm leading-relaxed whitespace-pre-wrap flex-1 overflow-y-auto bg-background/30 backdrop-blur-sm relative z-10">
                {constructedPrompt || (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 border border-primary/30 shadow-lg">
                      <Wand2 className="w-10 h-10 text-primary/60" />
                    </div>
                    <p className="text-base">Completa el formulario para ver tu prompt...</p>
                  </div>
                )}
              </div>

              <div className="p-6 bg-background/50 backdrop-blur-sm border-t border-border/50 space-y-3 relative z-10">
                <Button 
                  onClick={copyToClipboard} 
                  className="w-full modern-button"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Prompt
                </Button>
                <Button 
                  onClick={copyWithHyperparameters} 
                  variant="outline"
                  className="w-full"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Copiar + Config
                </Button>
              </div>
            </Card>

            {/* Tips Box */}
            <Card className="modern-card mt-6 p-5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
              <h4 className="text-sm font-bold text-foreground flex items-center gap-2 mb-2 relative z-10">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center border border-primary/30">
                  <Lightbulb className="w-4 h-4 text-primary" />
                </div>
                Tip de Experto
              </h4>
              <p className="text-xs text-muted-foreground relative z-10">
                {technique === "few-shot" && "Proporciona 3-5 ejemplos diversos pero consistentes para mejor aprendizaje."}
                {technique === "chain-of-thought" && "Divide problemas complejos en pasos lógicos claros y secuenciales."}
                {technique === "react" && "Combina razonamiento explícito con acciones concretas para tareas complejas."}
                {technique === "tree-of-thoughts" && "Explora múltiples perspectivas antes de llegar a una conclusión."}
                {technique === "self-consistency" && "Útil para problemas con múltiples respuestas válidas."}
                {technique === "none" && "Para tareas simples, un prompt bien estructurado es suficiente."}
                {!technique && "Usa Grounding cuando tengas información específica que el modelo debe usar."}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
