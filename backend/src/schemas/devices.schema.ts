import { z } from 'zod';

export const createDeviceSchema = z.object({
    name: z.string().min(1, 'Name is required').trim(),
    category: z.string().min(1, 'Category is required').trim(),

    serial_number: z.string().trim().optional(),

    status: z.enum(['acquired', 'broken', 'in_repair', 'refurbished', 'listed', 'sold']).default('acquired'),

    purchase_price: z.number().min(0, 'Price cannot be negative').default(0),
    sold_price: z.number().min(0).optional(),
});

export type CreateDeviceInput = z.infer<typeof createDeviceSchema>;