import { z } from 'zod';

export const createDeviceSchema = z.object({
    name: z.string().min(1, 'Name is required').trim(),
    category: z.string().min(1, 'Category is required').trim(),

    // Allow empty strings from inputs to become undefined or null safely
    serial_number: z.string().trim().optional().nullable().transform(val => val === '' ? null : val),

    status: z.enum(['acquired', 'broken', 'in_repair', 'refurbished', 'listed', 'sold']).default('acquired'),

    // Use coerce.number() so strings from form inputs are automatically converted
    purchase_price: z.coerce.number().min(0, 'Price cannot be negative').default(0),

    // Use nullable() and optional() so incoming null or empty values pass validation
    sold_price: z.coerce.number().min(0).nullable().optional(),
});

// Dedicated update schema
export const updateDeviceSchema = z.object({
    name: z.string().min(1, 'Name is required').trim().optional(),
    category: z.string().min(1, 'Category is required').trim().optional(),
    serial_number: z.string().trim().optional().nullable().transform(val => val === '' ? null : val),
    status: z.enum(['acquired', 'broken', 'in_repair', 'refurbished', 'listed', 'sold']).optional(),
    purchase_price: z.coerce.number().min(0, 'Price cannot be negative').optional(),
    sold_price: z.coerce.number().min(0).nullable().optional(),
});

export type CreateDeviceInput = z.infer<typeof createDeviceSchema>;
export type UpdateDeviceInput = z.infer<typeof updateDeviceSchema>;