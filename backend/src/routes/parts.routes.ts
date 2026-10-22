import { Router } from 'express';
import { getParts, createPart } from '../controllers/parts.controller.js';

const router = Router();

router.get('/', getParts);
router.post('/', createPart);

export default router;