import { Router } from 'express';

import {
    createBooking,
    getBookings,
    getBookingById,
    updateBooking,
    deleteBooking
} from '../controllers/bookings.controller.js';

import { validateBody } from '../middlewares/validateBody.js';
import { createBookingSchema } from '../validations/booking.validation.js';


const router = Router();


router.get('/', getBookings);

router.get('/:bid', getBookingById);

router.post(
    '/',
    validateBody(createBookingSchema),
    createBooking
);

router.put('/:bid', updateBooking);

router.delete('/:bid', deleteBooking);


export default router;