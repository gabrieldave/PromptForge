import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  LayoutTemplate
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Templates based on the guide
const templates = [
  {
    id: "universal",
    name: "Universal",
    icon: Sparkles,
    description: "Estándar para cualquier tarea general",
    role: "Asistente experto",
    context: "",
    task: "",
    format: "Respuesta clara y concisa"
  },
  {
    id: "coding",
    name: "Código",
    icon: CodeTemplate,
    description: "Generación de software y scripts",
    role: "Ingeniero de Software Senior",
    context: "Estamos construyendo una aplicación web moderna usando React y TypeScript.",
    task: "Crea un componente que...",
    format: "Código limpio, comentado y siguiendo principios SOLID."
  },
  {
    id: "content",
    name: "Contenido",
    icon: FileText,
    description: "Blogs, redes sociales y copy",
    role: "Estratega de Contenido y Copywriter",
    context: "La audiencia objetivo son profesionales jóvenes.",
    task: "Escribe un post para LinkedIn sobre...",
    format: "Tono profesional pero cercano, con emojis y saltos de línea."
  },
  {
    id: "analysis",
    name: "Análisis",
    icon: SearchTemplate,
    description: "Resumen y extracción de datos",
    role: "Analista de Datos Senior",
    context: "Tengo el siguiente reporte de ventas...",
    task: "Identifica las 3 tendencias principales...",
    format: "Tabla comparativa y lista de viñetas con conclusiones."
  }
];

function CodeTemplate(props: any) {
  return <Settings {...props} />;
}

function SearchTemplate(props: any) {
  return <LayoutTemplate {...props} />;
}

export default function Builder() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("builder");
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  
  // Form state
  const [role, setRole] = useState(templates[0].role);
  const [context, setContext] = useState(templates[0].context);
  const [task, setTask] = useState(templates[0].task);
  const [constraints, setConstraints] = useState("");
  const [format, setFormat] = useState(templates[0].format);

  // Load template data when selection changes
  const handleTemplateChange = (template: typeof templates[0]) => {
    setSelectedTemplate(template);
    setRole(template.role);
    setContext(template.context);
    setTask(template.task);
    setFormat(template.format);
    setConstraints(""); // Reset constraints as they are usually specific
  };

  // Construct the final prompt
  const constructedPrompt = `Actúa como: ${role || "[ROL]"}

Contexto:
${context || "[CONTEXTO]"}

Tarea Principal:
${task || "[TAREA]"}

Restricciones y Guías:
${constraints || "Sin restricciones específicas."}

Formato de Salida:
${format || "[FORMATO]"}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(constructedPrompt);
    toast({
      title: "¡Prompt copiado!",
      description: "Listo para pegar en ChatGPT o Gemini.",
    });
  };

  const clearAll = () => {
    setRole("");
    setContext("");
    setTask("");
    setConstraints("");
    setFormat("");
  };

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-foreground flex items-center gap-3">
          <Wand2 className="w-8 h-8 text-accent" />
          Constructor de Prompts
        </h1>
        <p className="text-muted-foreground mt-2">
          Crea prompts perfectos paso a paso utilizando la metodología de la guía.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 h-full">
        {/* LEFT COLUMN: Inputs */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Template Selector */}
          <Card className="p-4 border-primary/10 bg-primary/5">
            <Label className="text-xs font-bold text-primary uppercase tracking-wider mb-3 block">
              1. Elige un punto de partida
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleTemplateChange(t)}
                  className={cn(
                    "flex flex-col items-center p-3 rounded-lg border transition-all text-center",
                    selectedTemplate.id === t.id
                      ? "bg-white dark:bg-slate-800 border-primary shadow-sm ring-1 ring-primary/20"
                      : "bg-transparent border-transparent hover:bg-white/50 dark:hover:bg-slate-800/50 hover:border-border"
                  )}
                >
                  <t.icon className={cn(
                    "w-6 h-6 mb-2",
                    selectedTemplate.id === t.id ? "text-primary" : "text-muted-foreground"
                  )} />
                  <span className="text-xs font-medium">{t.name}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Input Fields */}
          <div className="space-y-6">
            <div className="space-y-2 group">
              <div className="flex justify-between">
                <Label className="flex items-center gap-2 text-base font-medium text-foreground">
                  <UserCircle className="w-4 h-4 text-blue-500" />
                  Rol (Persona)
                </Label>
                <span className="text-xs text-muted-foreground hidden group-hover:block animate-in fade-in">
                  ¿Quién debe ser la IA?
                </span>
              </div>
              <Input 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Ej. Experto en Marketing Digital con 10 años de experiencia..."
                className="border-l-4 border-l-blue-500/50 focus-visible:border-l-blue-500 bg-white/50 dark:bg-slate-900/50"
              />
            </div>

            <div className="space-y-2 group">
              <div className="flex justify-between">
                <Label className="flex items-center gap-2 text-base font-medium text-foreground">
                  <MessageSquare className="w-4 h-4 text-green-500" />
                  Contexto
                </Label>
                <span className="text-xs text-muted-foreground hidden group-hover:block animate-in fade-in">
                  Antecedentes, audiencia, objetivos.
                </span>
              </div>
              <Textarea 
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Ej. Estamos lanzando un nuevo producto de café orgánico dirigido a jóvenes profesionales..."
                className="min-h-[80px] border-l-4 border-l-green-500/50 focus-visible:border-l-green-500 bg-white/50 dark:bg-slate-900/50"
              />
            </div>

            <div className="space-y-2 group">
              <div className="flex justify-between">
                <Label className="flex items-center gap-2 text-base font-medium text-foreground">
                  <Settings className="w-4 h-4 text-purple-500" />
                  Tarea Específica
                </Label>
                <span className="text-xs text-muted-foreground hidden group-hover:block animate-in fade-in">
                  Usa verbos de acción claros.
                </span>
              </div>
              <Textarea 
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Ej. Genera 5 ideas de nombres para la marca, incluyendo una breve explicación del porqué de cada uno."
                className="min-h-[80px] border-l-4 border-l-purple-500/50 focus-visible:border-l-purple-500 bg-white/50 dark:bg-slate-900/50"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <div className="flex justify-between">
                  <Label className="flex items-center gap-2 font-medium text-foreground">
                    <LayoutTemplate className="w-4 h-4 text-orange-500" />
                    Formato
                  </Label>
                </div>
                <Input 
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  placeholder="Ej. Tabla Markdown, JSON, Lista..."
                  className="border-l-4 border-l-orange-500/50 focus-visible:border-l-orange-500 bg-white/50 dark:bg-slate-900/50"
                />
              </div>

              <div className="space-y-2 group">
                <div className="flex justify-between">
                  <Label className="flex items-center gap-2 font-medium text-foreground">
                    <FileText className="w-4 h-4 text-red-500" />
                    Restricciones (Opcional)
                  </Label>
                </div>
                <Input 
                  value={constraints}
                  onChange={(e) => setConstraints(e.target.value)}
                  placeholder="Ej. Máximo 200 palabras, sin jerga..."
                  className="border-l-4 border-l-red-500/50 focus-visible:border-l-red-500 bg-white/50 dark:bg-slate-900/50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Preview */}
        <div className="lg:col-span-5">
          <div className="sticky top-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl font-bold text-foreground">Vista Previa</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={clearAll} className="h-8 text-xs">
                  <RotateCcw className="w-3 h-3 mr-2" />
                  Limpiar
                </Button>
              </div>
            </div>

            <Card className="bg-slate-900 text-slate-50 border-slate-800 shadow-2xl overflow-hidden flex flex-col min-h-[500px]">
              {/* Mock Browser/Terminal Header */}
              <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <div className="ml-4 text-xs text-slate-500 font-mono">prompt_v1.txt</div>
              </div>

              {/* Content */}
              <div className="p-6 font-mono text-sm leading-relaxed whitespace-pre-wrap flex-1 opacity-90">
                {role && (
                  <div className="mb-4 animate-in slide-in-from-left-2 duration-300">
                    <span className="text-blue-400 block text-xs uppercase tracking-wider mb-1"># Rol</span>
                    {role}
                  </div>
                )}
                
                {context && (
                  <div className="mb-4 animate-in slide-in-from-left-2 duration-300 delay-75">
                    <span className="text-green-400 block text-xs uppercase tracking-wider mb-1"># Contexto</span>
                    {context}
                  </div>
                )}

                {task && (
                  <div className="mb-4 animate-in slide-in-from-left-2 duration-300 delay-150">
                    <span className="text-purple-400 block text-xs uppercase tracking-wider mb-1"># Tarea</span>
                    {task}
                  </div>
                )}

                {constraints && (
                  <div className="mb-4 animate-in slide-in-from-left-2 duration-300 delay-200">
                    <span className="text-red-400 block text-xs uppercase tracking-wider mb-1"># Restricciones</span>
                    {constraints}
                  </div>
                )}

                {format && (
                  <div className="mb-4 animate-in slide-in-from-left-2 duration-300 delay-300">
                    <span className="text-orange-400 block text-xs uppercase tracking-wider mb-1"># Formato</span>
                    {format}
                  </div>
                )}

                {!role && !context && !task && (
                  <div className="h-full flex flex-col items-center justify-center text-slate-600 italic">
                    <Wand2 className="w-12 h-12 mb-4 opacity-20" />
                    <p>Completa el formulario para ver la magia...</p>
                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div className="p-4 bg-slate-950/50 border-t border-slate-800">
                <Button 
                  onClick={copyToClipboard} 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Prompt
                </Button>
              </div>
            </Card>

            {/* Tips Box */}
            <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/20">
              <h4 className="text-sm font-bold text-accent-foreground flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4" />
                Tip de Experto
              </h4>
              <p className="text-xs text-muted-foreground">
                Recuerda el principio de "Anclaje de la Verdad": Si tienes información específica, pégala en el contexto y dile a la IA que "se base únicamente en la información proporcionada".
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
