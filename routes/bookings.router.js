import { Router } from 'express';

import {
    createBooking,
    getBookingById,
    addServiceToBooking
} from '../controllers/bookings.controller.js';

import { validateBody } from '../middlewares/validateBody.js';
import {createBookingSchema,addServiceToBookingSchema} from '../validations/booking.validation.js';


const router = Router();



router.get('/:bid', getBookingById);

router.post(
    '/',
    validateBody(createBookingSchema),
    createBooking
);

router.post('/:bid/services/:sid',validateBody(addServiceToBookingSchema),addServiceToBooking);

export default router;