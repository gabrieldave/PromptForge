import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { guideContent, GuideContentBlock } from "@/lib/guide-content";
import { PromptExample } from "@/components/ui/PromptExample";
import { HighlightBox } from "@/components/ui/HighlightBox";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";

export default function Guide() {
  const renderContentBlock = (block: GuideContentBlock, index: number) => {
    switch (block.type) {
      case "text":
        return (
          <p key={index} className="text-lg text-muted-foreground leading-relaxed mb-6">
            {block.content}
          </p>
        );
      case "highlight":
        return (
          <HighlightBox
            key={index}
            title={block.title}
            content={block.content}
            icon={block.icon}
          />
        );
      case "prompt":
        return (
          <PromptExample
            key={index}
            title={block.title}
            content={block.content}
            source={block.source}
          />
        );
      case "warning":
        return (
          <div key={index} className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
            <h4 className="font-bold text-red-800 dark:text-red-400 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              {block.title}
            </h4>
            <p className="text-red-700 dark:text-red-300/90">{block.content}</p>
          </div>
        );
      case "process":
        return (
          <div key={index} className="my-10 overflow-x-auto pb-4">
            <div className="flex items-center justify-between min-w-[600px] gap-4">
              {block.steps.map((step, i) => (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center text-center w-32 shrink-0 group">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg shadow-primary/20 mb-3 group-hover:scale-110 transition-transform">
                      {i + 1}
                    </div>
                    <span className="text-sm font-bold text-foreground">{step.title}</span>
                  </div>
                  {i < block.steps.length - 1 && (
                    <ArrowRight className="w-6 h-6 text-muted-foreground/30 shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        );
      case "grid":
        return (
          <div key={index} className={`grid md:grid-cols-${block.columns.length > 2 ? '3' : '2'} gap-6 my-8`}>
            {block.columns.map((col, i) => (
              <div 
                key={i} 
                className={cn(
                  "p-6 rounded-xl border bg-card transition-all hover:shadow-md",
                  col.color === "blue" && "border-blue-100 bg-blue-50/50 dark:bg-blue-950/10 dark:border-blue-900",
                  col.color === "green" && "border-green-100 bg-green-50/50 dark:bg-green-950/10 dark:border-green-900",
                  col.color === "purple" && "border-purple-100 bg-purple-50/50 dark:bg-purple-950/10 dark:border-purple-900",
                  col.color === "orange" && "border-orange-100 bg-orange-50/50 dark:bg-orange-950/10 dark:border-orange-900",
                  col.color === "yellow" && "border-yellow-100 bg-yellow-50/50 dark:bg-yellow-950/10 dark:border-yellow-900",
                  col.color === "teal" && "border-teal-100 bg-teal-50/50 dark:bg-teal-950/10 dark:border-teal-900",
                  !col.color && "border-border"
                )}
              >
                <h4 className={cn(
                  "font-bold mb-3 flex items-center gap-2",
                  col.color === "blue" && "text-blue-700 dark:text-blue-300",
                  col.color === "green" && "text-green-700 dark:text-green-300",
                  col.color === "purple" && "text-purple-700 dark:text-purple-300",
                  col.color === "orange" && "text-orange-700 dark:text-orange-300",
                  col.color === "yellow" && "text-yellow-700 dark:text-yellow-300",
                  col.color === "teal" && "text-teal-700 dark:text-teal-300",
                  !col.color && "text-foreground"
                )}>
                  {col.icon && <span className="text-xl">{col.icon}</span>}
                  {col.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {col.content}
                </p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 mb-12 overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-indigo-600 text-white shadow-xl">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative z-10 px-8 md:px-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold uppercase tracking-widest mb-6">
            Guía Maestra 2025
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 leading-tight">
            PromptForge <br />
            <span className="text-accent italic">El Constructor de Prompts Más Avanzado</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl leading-relaxed">
            Forja prompts perfectos con técnicas avanzadas de ingeniería. 
            Few-shot, Chain of Thought, ReAct y más. Conviértete en un maestro del prompting.
          </p>
        </div>
      </section>

      <div className="space-y-24">
        {guideContent.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-20">
            <div className="flex items-center gap-4 mb-8 border-b border-border pb-4">
              {section.icon && <section.icon className="w-8 h-8 text-primary" />}
              <h2 className="font-serif text-3xl font-bold text-foreground">
                {section.title}
              </h2>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none">
              {section.content.map((block, i) => renderContentBlock(block, i))}
            </div>

            {section.subsections?.map((sub) => (
              <div key={sub.id} id={sub.id} className="mt-16 scroll-mt-24 pl-4 border-l-2 border-border/50">
                <h3 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent"></span>
                  {sub.title}
                </h3>
                
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  {sub.content.map((block, i) => renderContentBlock(block, i))}
                </div>
              </div>
            ))}
          </section>
        ))}
      </div>

      <footer className="mt-24 py-12 border-t border-border text-center">
        <h3 className="font-serif text-xl font-bold mb-4">¿Listo para forjar prompts perfectos?</h3>
        <p className="text-muted-foreground mb-8">
          Usa PromptForge para crear prompts profesionales con técnicas avanzadas.
        </p>
        <div className="flex justify-center gap-4">
          <a href="/builder" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
            Ir al Constructor
          </a>
        </div>
      </footer>
    </AppLayout>
  );
}
