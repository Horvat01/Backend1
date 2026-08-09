import { Router } from 'express';

import {
    getHome,
    getBookingsView,
    getServicesView,
    getRealtimeServicesView,
    renderBooking
} from '../controllers/views.controller.js';

const router = Router();


router.get('/', getHome);


router.get('/services', getServicesView);


router.get('/realtime-services', getRealtimeServicesView);

router.get('/bookings', getBookingsView);

router.get('/bookings/:bid', renderBooking);

export default router;
