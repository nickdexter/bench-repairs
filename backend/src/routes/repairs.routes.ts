import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { createRepair, deleteRepair, getRepair, getRepairs, updateRepair } from '../controllers/repairs.controller.js';
import { createRepairSchema, updateRepairSchema } from '../schemas/repairs.schema.js';

const router = Router();

router.get('/', getRepairs);
router.get('/:id', getRepair);
router.post('/', validate(createRepairSchema), createRepair);
router.patch('/:id', validate(updateRepairSchema), updateRepair);
router.delete('/:id', deleteRepair);

export default router;