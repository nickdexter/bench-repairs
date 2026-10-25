import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { createRepair, deleteRepair, getRepair, getRepairs, updateRepair } from '../controllers/repairs.controller.js';
import { createRepairSchema, updateRepairSchema } from '../schemas/repairs.schema.js';
import repairLogsRouter from '../routes/repair-logs.routes.js';
import repairIssuesRouter from '../routes/repair-issues.routes.js';

const router = Router();

router.get('/', getRepairs);
router.get('/:id', getRepair);
router.post('/', validate(createRepairSchema), createRepair);
router.patch('/:id', validate(updateRepairSchema), updateRepair);
router.delete('/:id', deleteRepair);

router.use('/:repairId/logs', repairLogsRouter);
router.use('/:repairId/issues', repairIssuesRouter);

export default router;