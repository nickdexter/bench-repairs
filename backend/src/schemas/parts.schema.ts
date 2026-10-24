import { z } from 'zod';

export const createPartSchema = z.object({
    name: z.string().min(1, 'Name is required').trim(),
    quantity: z.number().min(0, 'Quantity cannot be negative'),
    cost: z.number().positive('Cost must be greater than zero'),
});

export const updatePartSchema = createPartSchema.partial();

// Export the inferred TypeScript types for controllers to use
export type CreatePartInput = z.infer<typeof createPartSchema>;
export type UpdatePartInput = z.infer<typeof updatePartSchema>;