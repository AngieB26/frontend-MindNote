import { CATEGORIES, NoteCategory } from "@/types/note";
import { cn } from "@/lib/utils";
import { Brain, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SidebarProps {
  activeCategory: NoteCategory;
  onCategoryChange: (category: NoteCategory) => void;
  noteCounts: Record<string, number>;
}

export function Sidebar({ activeCategory, onCategoryChange, noteCounts }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8 pl-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">MindNote</h1>
              <p className="text-xs text-muted-foreground">Tu segundo cerebro</p>
            </div>
          </div>

          {/* Categories */}
          <nav className="flex-1 space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Categorías
            </p>
            {CATEGORIES.map((category) => {
              const count = category.value === "all" 
                ? Object.values(noteCounts).reduce((a, b) => a + b, 0)
                : noteCounts[category.value] || 0;
              
              return (
                <button
                  key={category.value}
                  onClick={() => {
                    onCategoryChange(category.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth",
                    activeCategory === category.value
                      ? "bg-accent text-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-base">{category.emoji}</span>
                    {category.label}
                  </span>
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full",
                    activeCategory === category.value
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="pt-6 border-t border-sidebar-border">
            <div className="px-3 py-3 rounded-xl bg-accent/50">
              <p className="text-xs text-muted-foreground mb-1">💡 Tip</p>
              <p className="text-xs text-foreground">
                Conecta IA para resumir y analizar tus notas automáticamente.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
