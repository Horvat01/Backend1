import { getServices } from '../services/service.service.js';
import { getBookings } from '../services/booking.service.js';

export const getHome = async (req, res) => {
    try {
        res.render('home', {
            title: 'Inicio'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

export const getBookingsView = async (req, res) => {
    try {
        const bookings = await getBookings();

        res.render('bookings', {
            title: 'Reservas',
            bookings
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

export const getServicesView = async (req, res) => {
    try {
        const result = await getServices({
            page: 1,
            limit: 100
        });

        res.render('services', {
            title: 'Servicios',
            services: result.docs
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};


export const getRealtimeServicesView = async (req, res) => {
    try {
        const result = await getServices({
            page: 1,
            limit: 100
        });

        res.render('realtime-services', {
            title: 'Servicios en tiempo real',
            services: result.docs
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

export const renderBooking = async (req, res) => {
    try {
        const { bid } = req.params;

        res.render('booking', {
            title: 'Detalle de reserva',
            bookingId: bid
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

export const renderServices = async (req, res) => {
    return getServicesView(req, res);
};

export const renderRealtimeServices = async (req, res) => {
    return getRealtimeServicesView(req, res);
};