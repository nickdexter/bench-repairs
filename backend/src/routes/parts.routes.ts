import { Router } from 'express';
import { getParts, getPart, updatePart, deletePart, updatePartStock, createPart } from '../controllers/parts.controller.js';
import { validate } from '../middleware/validate.js';
import { createPartSchema, updatePartSchema } from '../schemas/parts.schema.js';

const router = Router();

router.get('/', getParts);
router.post('/', validate(createPartSchema), createPart);
router.get('/:id', getPart);
router.patch('/:id', validate(updatePartSchema), updatePart);
router.delete('/:id', deletePart);
router.patch('/:id/stock', updatePartStock);

export default router;