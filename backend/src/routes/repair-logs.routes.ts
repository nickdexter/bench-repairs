import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { createRepairLogSchema, updateRepairLogSchema } from '../schemas/repair-log.schema.js';
import { createRepairLog, deleteRepairLog, getRepairLog, getRepairLogs, updateRepairLog } from '../controllers/repair-log.controller.js';

const router = Router({ mergeParams: true });

router.get('/', getRepairLogs);
router.get('/:id', getRepairLog);
router.post('/', validate(createRepairLogSchema), createRepairLog);
router.patch('/:id', validate(updateRepairLogSchema), updateRepairLog);
router.delete('/:id', deleteRepairLog);

export default router;