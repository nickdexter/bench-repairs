import { z } from 'zod';

export const createRepairIssueSchema = z.object({
    description: z.string().min(1, 'Description is required').trim(),
    is_resolved: z.boolean().optional()
});

export const updateRepairIssueSchema = z.object({
    description: z.string().min(1, 'Description is required').trim().optional(),
    is_resolved: z.boolean().optional()
});

export type CreateRepairIssueInput = z.infer<typeof createRepairIssueSchema>;
export type UpdateRepairIssueInput = z.infer<typeof updateRepairIssueSchema>;