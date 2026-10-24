import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { getDevices, getDevice, createDevice, updateDevice, deleteDevice } from '../controllers/devices.controller.js';
import { createDeviceSchema, updateDeviceSchema } from '../schemas/devices.schema.js';

const router = Router();

router.get('/', getDevices);
router.get('/:id', getDevice);
router.post('/', validate(createDeviceSchema), createDevice);
router.patch('/:id', validate(updateDeviceSchema), updateDevice);
router.delete('/:id', deleteDevice);

export default router;