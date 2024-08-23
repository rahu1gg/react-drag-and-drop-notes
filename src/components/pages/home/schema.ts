import { z } from 'zod';

export const noteSchema = z.object({
  id: z.number(),
  description: z.string(),
  coordinates: z.object({
    x: z.number(),
    y: z.number(),
  }),
});
