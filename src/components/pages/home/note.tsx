import { useNotes } from '@/client/providers/notes-provider';
import { animate, motion } from 'framer-motion';
import React from 'react';
import { z } from 'zod';
import { noteSchema } from './schema';

export function Note({
  id,
  description,
  coordinates: { x, y },
  dragConstraintRef,
}: z.infer<typeof noteSchema> & { dragConstraintRef: React.RefObject<HTMLDivElement> }) {
  const noteRef = React.useRef<React.ElementRef<typeof motion.div>>(null);
  const { setNotes } = useNotes();

  function handleDragEnd() {
    if (!noteRef.current || !dragConstraintRef.current) return;

    const rect = noteRef.current.getBoundingClientRect();

    // Check if there is an overlapping note
    function getAllSiblings(element: HTMLElement) {
      const children = [...(element.parentElement?.children || [])];
      return children.filter((child) => child !== element);
    }

    const isOverlapping = getAllSiblings(noteRef.current).some((sibling) => {
      const sibblingRect = sibling.getBoundingClientRect();

      const overlap = !(
        rect.right < sibblingRect.left ||
        rect.left > sibblingRect.right ||
        rect.bottom < sibblingRect.top ||
        rect.top > sibblingRect.bottom
      );
      return overlap;
    });

    if (isOverlapping) {
      // Rest to initial position
      animate(noteRef.current, { x, y }, { duration: 0.5 });
      return;
    }

    const style = window.getComputedStyle(noteRef.current);
    const { m41: translateX, m42: translateY } = new DOMMatrixReadOnly(style.transform);

    setNotes((prev) =>
      prev.map((note) => {
        if (note.id === id) return { ...note, coordinates: { x: translateX, y: translateY } };
        return note;
      }),
    );

    const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    const result = z.array(noteSchema).safeParse(storedNotes);

    if (!result.success) return;

    const newNotes = result.data.map((note) => {
      if (note.id === id) return { ...note, coordinates: { x: translateX, y: translateY } };
      return note;
    });
    localStorage.setItem('notes', JSON.stringify(newNotes));
  }

  return (
    <motion.div
      ref={noteRef}
      className='hover:cursor-grab active:cursor-grabbing bg-muted/80 rounded-md p-3 text-sm w-96 absolute left-0 top-0 pointer-events-auto'
      initial={{ x, y, opacity: 0 }}
      animate={{ opacity: 1 }}
      dragMomentum={false}
      dragConstraints={dragConstraintRef}
      onDragEnd={handleDragEnd}
      drag
    >
      <div>
        <p>📌 {description}</p>
      </div>
    </motion.div>
  );
}
