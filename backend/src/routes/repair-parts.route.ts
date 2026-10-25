import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { createRepairPart, deleteRepairPart, getRepairPart, getRepairParts, updateRepairPart } from '../controllers/repair-parts.controller.js';
import { createRepairPartSchema, updateRepairPartSchema } from '../schemas/repair-parts.schema.js';

const router = Router({ mergeParams: true });

router.get('/', getRepairParts);
router.get('/:id', getRepairPart);
router.post('/', validate(createRepairPartSchema), createRepairPart);
router.patch('/:id', validate(updateRepairPartSchema), updateRepairPart);
router.delete('/:id', deleteRepairPart);

export default router;