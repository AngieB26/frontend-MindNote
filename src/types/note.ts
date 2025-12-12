export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  isPinned: boolean;
}

export type NoteCategory = 
  | "all"
  | "ideas"
  | "tasks"
  | "meetings"
  | "personal"
  | "work";

export const CATEGORIES: { value: NoteCategory; label: string; emoji: string }[] = [
  { value: "all", label: "Todas", emoji: "📋" },
  { value: "ideas", label: "Ideas", emoji: "💡" },
  { value: "tasks", label: "Tareas", emoji: "✅" },
  { value: "meetings", label: "Reuniones", emoji: "📅" },
  { value: "personal", label: "Personal", emoji: "🏠" },
  { value: "work", label: "Trabajo", emoji: "💼" },
];
