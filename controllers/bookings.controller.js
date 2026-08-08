import {
    createBooking as createBookingManager,
    getBookingById as getBookingByIdManager,
    addServiceToBooking as addServiceToBookingManager
} from '../managgers/BookingManager.js';

import {
    getServicesById
} from '../managgers/ServiceManagers.js';

export const createBooking = async (req, res) => {
    try {
        const booking = await createBookingManager(req.body);

        res.status(201).json({
            status: 'success',
            payload: booking
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};


export const getBookingById = async (req, res) => {
    try {
        const { bid } = req.params;

        const booking = await getBookingByIdManager(bid);

        if (!booking) {
            return res.status(404).json({
                status: 'error',
                message: 'Reserva no encontrada'
            });
        }

        res.status(200).json({
            status: 'success',
            payload: booking
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};


export const addServiceToBooking = async (req, res) => {
    try {
        const { bid, sid } = req.params;

        const service = await getServicesById(sid);

        if (!service) {
            return res.status(404).json({
                status: 'error',
                message: 'Servicio no encontrado'
            });
        }

        const booking = await addServiceToBookingManager(bid, sid);

        res.status(200).json({
            status: 'success',
            payload: booking
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};