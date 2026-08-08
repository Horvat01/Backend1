import { bookingsService } from '../services/booking.service.js';


export const createBooking = async (req, res) => {
    try {
        const booking = await bookingsService.createBooking(req.body);

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
        const booking = await bookingsService.getBookingById(
            req.params.bid,
            { populate: true }
        );

        res.status(200).json({
            status: 'success',
            payload: booking
        });

    } catch (error) {
        res.status(404).json({
            status: 'error',
            message: error.message
        });
    }
};


export const addServiceToBooking = async (req, res) => {
    try {
        const booking = await bookingsService.addServiceToBooking(
            req.params.bid,
            req.params.sid
        );

        res.status(200).json({
            status: 'success',
            payload: booking
        });

    } catch (error) {
        res.status(404).json({
            status: 'error',
            message: error.message
        });
    }
};


export const removeServiceFromBooking = async (req, res) => {
    try {
        const booking = await bookingsService.removeServiceFromBooking(
            req.params.bid,
            req.params.sid
        );

        res.status(200).json({
            status: 'success',
            payload: booking
        });

    } catch (error) {
        res.status(404).json({
            status: 'error',
            message: error.message
        });
    }
};


export const updateBooking = async (req, res) => {
    try {
        const booking = await bookingsService.updateBooking(
            req.params.bid,
            req.body
        );

        res.status(200).json({
            status: 'success',
            payload: booking
        });

    } catch (error) {
        res.status(404).json({
            status: 'error',
            message: error.message
        });
    }
};