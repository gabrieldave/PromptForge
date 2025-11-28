import React from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { guideContent } from "@/lib/guide-content";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Sidebar() {
  const [location] = useLocation();

  const SidebarContent = () => (
    <div className="py-6 flex flex-col h-full">
      <div className="px-6 mb-8">
        <h1 className="font-serif text-2xl font-bold text-primary flex items-center gap-2">
          <span className="text-accent text-3xl">✦</span>
          PromptMaster
        </h1>
        <p className="text-xs text-muted-foreground mt-2 font-medium uppercase tracking-wider">
          Guía de Ingeniería de Prompts
        </p>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-6">
          {guideContent.map((section) => (
            <div key={section.id}>
              <Link href={`#${section.id}`}>
                <a
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors mb-2",
                    location === `/${section.id}` || window.location.hash === `#${section.id}`
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/5"
                  )}
                >
                  {section.icon && <section.icon className="w-4 h-4" />}
                  {section.title}
                </a>
              </Link>

              {section.subsections && (
                <div className="pl-9 space-y-1 border-l border-border/50 ml-4">
                  {section.subsections.map((sub) => (
                    <Link key={sub.id} href={`#${sub.id}`}>
                      <a
                        className={cn(
                          "block px-3 py-1.5 text-xs transition-colors rounded-r-md border-l-2 border-transparent -ml-[1px]",
                          window.location.hash === `#${sub.id}`
                            ? "text-primary font-semibold border-primary bg-primary/5"
                            : "text-muted-foreground hover:text-foreground"
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

      <div className="mt-auto px-6 pt-6 border-t border-border">
        <div className="text-xs text-muted-foreground">
          <p>© 2025 PromptMaster</p>
          <p className="mt-1 opacity-60">Versión 1.0.0</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 fixed inset-y-0 left-0 z-30 bg-sidebar border-r border-sidebar-border">
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
