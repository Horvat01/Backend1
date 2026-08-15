import {
    createBooking as createBookingService,
    getBookingById as getBookingByIdService,
    addServiceToBooking as addServiceToBookingService,
    updateServiceQuantity as updateServiceQuantityService,
    removeServiceFromBooking as removeServiceFromBookingService,
    deleteBooking as deleteBookingService
} from '../services/booking.service.js';

import { getServiceById } from '../services/service.service.js';


export const createBooking = async (req, res) => {
    try {
        const booking = await createBookingService(req.body);

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

        const booking = await getBookingByIdService(bid);

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

        const service = await getServiceById(sid);

        if (!service) {
            return res.status(404).json({
                status: 'error',
                message: 'Servicio no encontrado'
            });
        }

        const booking = await addServiceToBookingService(bid, sid);

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


// PUT /api/bookings/:bid/services/:sid
export const updateServiceQuantity = async (req, res) => {
    try {
        const { bid, sid } = req.params;
        const { quantity } = req.body;

        const booking = await updateServiceQuantityService(
            bid,
            sid,
            quantity
        );

        if (!booking) {
            return res.status(404).json({
                status: 'error',
                message: 'Reserva o servicio no encontrado'
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


// DELETE /api/bookings/:bid/services/:sid
export const removeServiceFromBooking = async (req, res) => {
    try {
        const { bid, sid } = req.params;

        const booking = await removeServiceFromBookingService(
            bid,
            sid
        );

        if (!booking) {
            return res.status(404).json({
                status: 'error',
                message: 'Reserva o servicio no encontrado'
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


// DELETE /api/bookings/:bid
export const deleteBooking = async (req, res) => {
    try {
        const { bid } = req.params;

        const booking = await deleteBookingService(bid);

        if (!booking) {
            return res.status(404).json({
                status: 'error',
                message: 'Reserva no encontrada'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Reserva eliminada correctamente'
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};