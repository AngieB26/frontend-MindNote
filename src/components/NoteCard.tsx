import { Note, CATEGORIES } from "@/types/note";
import { Button } from "@/components/ui/button";
import { Pin, Trash2, Edit3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
  index: number;
}

export function NoteCard({ note, onEdit, onDelete, onTogglePin, index }: NoteCardProps) {
  const category = CATEGORIES.find((c) => c.value === note.category);

  return (
    <article
      className={cn(
        "group relative bg-gradient-card rounded-xl border border-border p-5 transition-smooth hover:shadow-medium hover:border-primary/20 cursor-pointer animate-slide-up",
        note.isPinned && "ring-2 ring-primary/20 border-primary/30"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={() => onEdit(note)}
    >
      {/* Pin indicator */}
      {note.isPinned && (
        <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1.5 shadow-glow">
          <Pin className="w-3 h-3" />
        </div>
      )}

      {/* Category badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm bg-accent text-accent-foreground px-2.5 py-1 rounded-md font-medium">
          {category?.emoji} {category?.label}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-smooth">
        {note.title}
      </h3>

      {/* Content preview */}
      <p className="text-muted-foreground text-sm line-clamp-3 mb-4 leading-relaxed">
        {note.content || "Sin contenido..."}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <time className="text-xs text-muted-foreground">
          {formatDistanceToNow(note.updatedAt, { addSuffix: true, locale: es })}
        </time>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-smooth">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin(note.id);
            }}
            className={cn(
              "text-muted-foreground hover:text-primary",
              note.isPinned && "text-primary"
            )}
          >
            <Pin className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(note);
            }}
            className="text-muted-foreground hover:text-primary"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}
