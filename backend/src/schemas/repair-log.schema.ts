import { z } from 'zod';

export const createRepairLogSchema = z.object({
    content: z.string().min(1, 'Content is required').trim(),
});

export const updateRepairLogSchema = z.object({
    content: z.string().min(1, 'Content is required').trim().optional(),
});

export type CreateRepairLogInput = z.infer<typeof createRepairLogSchema>;
export type UpdateRepairLogInput = z.infer<typeof updateRepairLogSchema>;