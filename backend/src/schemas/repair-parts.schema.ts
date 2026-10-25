import { z } from 'zod';

export const createRepairPartSchema = z.object({
    partId: z.number().int().positive('Part ID must be a positive integer'),
    quantity_used: z.number().int().positive('Quantity used must be at least 1').default(1),
});

export const updateRepairPartSchema = z.object({
    quantity_used: z.number().int().positive('Quantity used must be at least 1').optional(),
});

export type CreateRepairPartInput = z.infer<typeof createRepairPartSchema>;
export type UpdateRepairPartInput = z.infer<typeof updateRepairPartSchema>;