import type { noteSchema } from '@/components/pages/home/schema';
import type { z } from 'zod';

export const NOTES: z.infer<typeof noteSchema>[] = [
  {
    id: 1,
    description: 'This is a note custom note and drag and drop content for this app and is being stored on localstorage.',
    coordinates: {
      x: 1018,
      y: 298,
    },
  },
  {
    id: 2,
    description: 'Hello world this is a note',
    coordinates: {
      x: 286,
      y: 228,
    },
  },
];
