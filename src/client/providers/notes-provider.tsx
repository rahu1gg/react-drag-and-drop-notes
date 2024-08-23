import type { noteSchema } from '@/components/pages/home/schema';
import React from 'react';
import type { z } from 'zod';

type NotesProviderState = {
  notes: z.infer<typeof noteSchema>[];
  setNotes: React.Dispatch<React.SetStateAction<z.infer<typeof noteSchema>[]>>;
};

const initialState: NotesProviderState = {
  notes: [],
  setNotes: () => null,
};

const NotesProviderContext = React.createContext<NotesProviderState>(initialState);

export function NotesProvider({ children }: React.PropsWithChildren) {
  const [notes, setNotes] = React.useState<z.infer<typeof noteSchema>[]>(JSON.parse(localStorage.getItem('notes') || '[]'));

  const value = {
    notes,
    setNotes,
  };

  return <NotesProviderContext.Provider value={value}>{children}</NotesProviderContext.Provider>;
}

export function useNotes() {
  const context = React.useContext(NotesProviderContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }

  return context;
}
