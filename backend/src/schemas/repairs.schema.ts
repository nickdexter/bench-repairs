import { z } from 'zod';

export const createRepairSchema = z.object({
    device_id: z.number().int().positive('Device ID must be a positive integer'),
    description: z.string().trim().optional(),
    status: z.enum(['queue', 'in_progress', 'completed']).default('queue'),
});

export const updateRepairSchema = z.object({
    description: z.string().trim().optional(),
    status: z.enum(['queue', 'in_progress', 'waiting_for_parts', 'completed']).optional(),
});

export type CreateRepairInput = z.infer<typeof createRepairSchema>;
export type UpdateRepairInput = z.infer<typeof updateRepairSchema>;