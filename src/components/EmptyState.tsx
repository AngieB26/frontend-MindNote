import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onCreateNote: () => void;
  isFiltered?: boolean;
}

export function EmptyState({ onCreateNote, isFiltered }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in">
      <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-6">
        <FileText className="w-10 h-10 text-muted-foreground" />
      </div>
      
      {isFiltered ? (
        <>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No se encontraron notas
          </h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            Intenta con otros términos de búsqueda o categorías.
          </p>
        </>
      ) : (
        <>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Comienza a capturar tus ideas
          </h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            Crea tu primera nota y organiza tus pensamientos de forma inteligente.
          </p>
          <Button variant="glow" size="lg" onClick={onCreateNote}>
            <Plus className="w-5 h-5" />
            Crear primera nota
          </Button>
        </>
      )}
    </div>
  );
}
