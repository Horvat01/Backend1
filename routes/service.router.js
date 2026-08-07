import { Router } from 'express';
import {
    createService,
    deletedService,
    getServiceById,
    getServices,
    updatedService,
    editService
} from '../controllers/services.controller.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createServiceSchema } from '../validations/service.validation.js';

const router = Router();

router.get('/', getServices);
router.get('/:sid', getServiceById);
router.post('/', validateBody(createServiceSchema), createService);
router.put('/:sid', validateBody(updatedServiceSchema), updatedService);
router.put('/:sid',validateBody(updatedServiceSchema),editService);
router.delete('/:sid', deletedService);

export default router;