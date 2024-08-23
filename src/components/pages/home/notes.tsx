import { useNotes } from '@/client/providers/notes-provider';
import React from 'react';
import { Note } from './note';

export function Notes() {
  const { notes } = useNotes();
  const parentRef = React.useRef<HTMLDivElement>(null);

  return (
    <div ref={parentRef} className='fixed inset-0 pointer-events-none'>
      {notes.map((note) => {
        return <Note key={note.id} dragConstraintRef={parentRef} {...note} />;
      })}
    </div>
  );
}
