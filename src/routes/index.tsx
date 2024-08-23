import { NewNotes } from '@/components/pages/home/new-notes';
import { Notes } from '@/components/pages/home/notes';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className='p-2'>
      <NewNotes />
      <Notes />
    </div>
  );
}
