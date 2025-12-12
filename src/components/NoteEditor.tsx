import { useState, useEffect } from "react";
import { Note, CATEGORIES, NoteCategory } from "@/types/note";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Save, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface NoteEditorProps {
  note?: Note | null;
  onSave: (title: string, content: string, category: string) => void;
  onUpdate?: (id: string, updates: Partial<Note>) => void;
  onClose: () => void;
}

export function NoteEditor({ note, onSave, onUpdate, onClose }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [category, setCategory] = useState<string>(note?.category || "ideas");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setCategory(note.category);
    }
  }, [note]);

  const handleSave = () => {
    if (note && onUpdate) {
      onUpdate(note.id, { title, content, category });
    } else {
      onSave(title, content, category);
    }
    onClose();
  };

  const filteredCategories = CATEGORIES.filter((c) => c.value !== "all");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-medium animate-scale-in overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              {note ? "Editar nota" : "Nueva nota"}
            </h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </header>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Title */}
          <Input
            placeholder="Título de la nota..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg font-medium h-12"
            autoFocus
          />

          {/* Category selector */}
          <div className="flex flex-wrap gap-2">
            {filteredCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-smooth border",
                  category === cat.value
                    ? "bg-primary text-primary-foreground border-primary shadow-glow"
                    : "bg-secondary text-secondary-foreground border-border hover:border-primary/50"
                )}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <Textarea
            placeholder="Escribe tu nota aquí..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[200px] text-base leading-relaxed"
          />
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-end gap-3 p-4 border-t border-border bg-muted/30">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="glow" onClick={handleSave}>
            <Save className="w-4 h-4" />
            {note ? "Guardar cambios" : "Crear nota"}
          </Button>
        </footer>
      </div>
    </div>
  );
}
