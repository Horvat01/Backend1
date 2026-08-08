import { Router } from 'express';

import {
    createBooking,
    getBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
    addServiceToBooking,
    removeServiceFromBooking,
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



router.post('/:bid/services/:sid', addServiceToBooking);


router.delete('/:bid/services/:sid', removeServiceFromBooking);


export default router;