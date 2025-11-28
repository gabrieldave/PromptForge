import React from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { guideContent } from "@/lib/guide-content";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Wand2, BookOpen } from "lucide-react";

export function Sidebar() {
  const [location] = useLocation();

  const SidebarContent = () => (
    <div className="py-6 flex flex-col h-full">
      <div className="px-6 mb-8 border-b border-sidebar-border/50 pb-6">
        <Link href="/">
          <a className="cursor-pointer group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                <Wand2 className="w-5 h-5 text-white" />
              </div>
              <h1 className="font-serif text-2xl font-bold gradient-text">
                PromptForge
              </h1>
            </div>
            <p className="text-xs text-muted-foreground ml-13 font-medium">
              Forja Prompts Perfectos
            </p>
          </a>
        </Link>
      </div>

      <div className="px-4 mb-6">
        <Link href="/builder">
          <a className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all relative overflow-hidden group",
            location === "/builder" 
              ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary border border-primary/50 shadow-lg shadow-primary/20" 
              : "bg-background/50 backdrop-blur-sm text-sidebar-foreground hover:bg-background/70 hover:text-primary border border-transparent hover:border-primary/30"
          )}>
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
              location === "/builder" 
                ? "bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30" 
                : "bg-secondary group-hover:bg-primary/10"
            )}>
              <Wand2 className={cn("w-4 h-4", location === "/builder" ? "text-white" : "text-muted-foreground group-hover:text-primary")} />
            </div>
            <span>Constructor de Prompts</span>
          </a>
        </Link>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="mb-4 px-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
          Guía Teórica
        </div>
        <div className="space-y-1">
          <Link href="/">
             <a className={cn(
               "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all mb-2",
               location === "/" && window.location.hash === ""
                 ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary border border-primary/30"
                 : "text-muted-foreground hover:text-foreground hover:bg-background/50"
             )}>
               <div className={cn(
                 "w-6 h-6 rounded-md flex items-center justify-center",
                 location === "/" && window.location.hash === ""
                   ? "bg-gradient-to-br from-primary to-accent"
                   : "bg-secondary"
               )}>
                 <BookOpen className={cn("w-3.5 h-3.5", location === "/" && window.location.hash === "" ? "text-white" : "text-muted-foreground")} />
               </div>
               Inicio Guía
             </a>
          </Link>
          
          {guideContent.map((section) => (
            <div key={section.id}>
              <Link href={`/#${section.id}`}>
                <a
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all mb-2",
                    location === "/" && window.location.hash === `#${section.id}`
                      ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary border border-primary/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  )}
                >
                  {section.icon && (
                    <div className={cn(
                      "w-6 h-6 rounded-md flex items-center justify-center",
                      location === "/" && window.location.hash === `#${section.id}`
                        ? "bg-gradient-to-br from-primary to-accent"
                        : "bg-secondary"
                    )}>
                      <section.icon className={cn("w-3.5 h-3.5", location === "/" && window.location.hash === `#${section.id}` ? "text-white" : "text-muted-foreground")} />
                    </div>
                  )}
                  {section.title}
                </a>
              </Link>

              {section.subsections && location === "/" && (
                <div className="pl-9 space-y-1 border-l border-border/50 ml-4 mb-4">
                  {section.subsections.map((sub) => (
                    <Link key={sub.id} href={`/#${sub.id}`}>
                      <a
                        className={cn(
                          "block px-3 py-1.5 rounded-md text-xs transition-all ml-4",
                          window.location.hash === `#${sub.id}`
                            ? "text-primary font-semibold bg-primary/10 border border-primary/30"
                            : "text-muted-foreground hover:text-foreground hover:bg-background/30"
                        )}
                      >
                        {sub.title}
                      </a>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="mt-auto px-6 pt-6 border-t border-sidebar-border/50">
        <div className="text-xs text-muted-foreground rounded-lg bg-background/30 backdrop-blur-sm p-3 border border-border/30">
          <p>© 2025 PromptForge</p>
          <p className="mt-1 opacity-60">Versión 2.0.0</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 fixed inset-y-0 left-0 z-30 modern-sidebar">
        <SidebarContent />
      </aside>

      {/* Mobile Trigger */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <button className="bg-primary text-primary-foreground p-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 bg-sidebar border-r border-sidebar-border">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
