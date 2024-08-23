import { useNotes } from '@/client/providers/notes-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generateRandomCoordinates } from '@/lib/utils/generate-random-coordinates';
import React from 'react';

export function NewNotes() {
  const [value, setValue] = React.useState('');
  const { notes, setNotes } = useNotes();
  const [loading, setLoading] = React.useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (value.trim() === '') return;

    setLoading(true);

    const newNote = { id: notes.length + 1, description: value.trim(), coordinates: generateRandomCoordinates() };
    const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    localStorage.setItem('notes', JSON.stringify([...storedNotes, newNote]));

    setNotes((prev) => [...prev, newNote]);
    setValue('');
    setLoading(false);
  }

  return (
    <form className='max-w-[500px] mx-auto py-16 flex items-center justify-center gap-3' onSubmit={handleSubmit}>
      <Input type='text' value={value} onChange={(e) => setValue(e.target.value)} autoComplete='off' placeholder='Add a new note' />
      <Button type='submit' disabled={loading}>
        Add Note
      </Button>
    </form>
  );
}
