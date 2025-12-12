import { useState, useEffect, useCallback } from "react";
import { Note, NoteCategory } from "@/types/note";

const STORAGE_KEY = "mindinote-notes";

const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load notes from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setNotes(parsed.map((note: Note) => ({
          ...note,
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt),
        })));
      } catch (e) {
        console.error("Error parsing notes:", e);
      }
    }
    setIsLoading(false);
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }
  }, [notes, isLoading]);

  const addNote = useCallback((title: string, content: string, category: string = "ideas") => {
    const newNote: Note = {
      id: generateId(),
      title: title || "Sin título",
      content,
      category,
      createdAt: new Date(),
      updatedAt: new Date(),
      isPinned: false,
    };
    setNotes((prev) => [newNote, ...prev]);
    return newNote;
  }, []);

  const updateNote = useCallback((id: string, updates: Partial<Note>) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, ...updates, updatedAt: new Date() }
          : note
      )
    );
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }, []);

  const togglePin = useCallback((id: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, isPinned: !note.isPinned } : note
      )
    );
  }, []);

  const filterNotes = useCallback(
    (category: NoteCategory, searchQuery: string) => {
      return notes
        .filter((note) => {
          const matchesCategory = category === "all" || note.category === category;
          const matchesSearch =
            !searchQuery ||
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.content.toLowerCase().includes(searchQuery.toLowerCase());
          return matchesCategory && matchesSearch;
        })
        .sort((a, b) => {
          if (a.isPinned && !b.isPinned) return -1;
          if (!a.isPinned && b.isPinned) return 1;
          return b.updatedAt.getTime() - a.updatedAt.getTime();
        });
    },
    [notes]
  );

  return {
    notes,
    isLoading,
    addNote,
    updateNote,
    deleteNote,
    togglePin,
    filterNotes,
  };
}
