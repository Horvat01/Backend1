import { Router } from 'express';

import {
    createBooking,
    getBookingById,
    addServiceToBooking,
    updateServiceQuantity,
    removeServiceFromBooking,
    deleteBooking
} from '../controllers/bookings.controller.js';

import { validateBody } from '../middlewares/validateBody.js';

import {
    createBookingSchema,
    addServiceToBookingSchema,
    updateBookingServiceSchema
} from '../validations/booking.validation.js';

const router = Router();

// Obtener reserva
router.get('/:bid', getBookingById);

// Crear reserva
router.post(
    '/',
    validateBody(createBookingSchema),
    createBooking
);

// Agregar un servicio a una reserva
router.post(
    '/:bid/services/:sid',
    validateBody(addServiceToBookingSchema),
    addServiceToBooking
);

// Actualizar 
router.put(
    '/:bid/services/:sid',
    validateBody(updateBookingServiceSchema),
    updateServiceQuantity
);

// Eliminar un servicio 
router.delete(
    '/:bid/services/:sid',
    removeServiceFromBooking
);

// Eliminar 
router.delete(
    '/:bid',
    deleteBooking
);

export default router;