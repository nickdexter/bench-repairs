import { Router } from 'express';
import { getParts, getPart, updatePart, deletePart, updatePartStock, createPart } from '../controllers/parts.controller.js';

const router = Router();

router.get('/', getParts);
router.post('/', createPart);
router.get('/:id', getPart);
router.patch('/:id', updatePart);
router.delete('/:id', deletePart);
router.patch('/:id/stock', updatePartStock);

export default router;