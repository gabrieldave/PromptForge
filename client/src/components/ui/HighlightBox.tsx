import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface HighlightBoxProps {
  title: string;
  content: string;
  icon?: string | React.ReactNode;
  className?: string;
}

export function HighlightBox({ title, content, icon, className }: HighlightBoxProps) {
  return (
    <div className={cn(
      "relative my-8 p-6 rounded-xl border border-accent/40 bg-gradient-to-br from-amber-50/50 to-yellow-50/30 dark:from-amber-950/20 dark:to-yellow-900/10",
      className
    )}>
      <div className="absolute -top-4 -left-2 bg-background p-2 rounded-full shadow-sm border border-accent/20 text-2xl">
        {typeof icon === "string" ? icon : <Sparkles className="w-6 h-6 text-accent" />}
      </div>
      
      <h4 className="font-serif text-lg font-bold text-foreground mb-3 mt-2 flex items-center gap-2">
        {title}
      </h4>
      
      <p className="text-muted-foreground leading-relaxed">
        {content}
      </p>
    </div>
  );
}
