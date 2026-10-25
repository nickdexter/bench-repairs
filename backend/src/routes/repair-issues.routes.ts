import { Router } from 'express';
import { validate } from '../middleware/validate.js';

import { createRepairIssue, deleteRepairIssue, getRepairIssue, getRepairIssues, updateRepairIssue } from '../controllers/repair-issues.controller.js';
import { createRepairIssueSchema, updateRepairIssueSchema } from '../schemas/repair-issues.schema.js';

const router = Router({ mergeParams: true });

router.get('/', getRepairIssues);
router.get('/:id', getRepairIssue);
router.post('/', validate(createRepairIssueSchema), createRepairIssue);
router.patch('/:id', validate(updateRepairIssueSchema), updateRepairIssue);
router.delete('/:id', deleteRepairIssue);

export default router;