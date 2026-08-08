import {
    getBookingById,
    createBooking as createBookingManager,
    updateBooking as updateBookingManager
} from '../managers/BookingManager.js';

import {
    getServiceById
} from '../managers/ServiceManager.js';


export const bookingsService = {

    createBooking: async (data) => {
        return await createBookingManager(data);
    },


    getBookingById: async (bid, options = {}) => {
        const booking = await getBookingById(bid, options);

        if (!booking) {
            throw new Error('Reserva no encontrada');
        }

        return booking;
    },


    addServiceToBooking: async (bid, sid) => {

        // Primero verificamos que exista la reserva
        const booking = await getBookingById(bid);

        if (!booking) {
            throw new Error('Reserva no encontrada');
        }


        // Después verificamos que exista el servicio
        const service = await getServiceById(sid);

        if (!service) {
            throw new Error('Servicio no encontrado');
        }


        // Verificamos que el servicio no esté agregado
        if (booking.services?.some(
            serviceId => serviceId.toString() === sid.toString()
        )) {
            throw new Error('El servicio ya está agregado a la reserva');
        }


        // Agregamos el servicio
        booking.services.push(service._id);

        await booking.save();

        return booking;
    },


    removeServiceFromBooking: async (bid, sid) => {

        const booking = await getBookingById(bid);

        if (!booking) {
            throw new Error('Reserva no encontrada');
        }


        const service = await getServiceById(sid);

        if (!service) {
            throw new Error('Servicio no encontrado');
        }


        const serviceExists = booking.services?.some(
            serviceId => serviceId.toString() === sid.toString()
        );

        if (!serviceExists) {
            throw new Error('El servicio no está agregado a la reserva');
        }


        booking.services = booking.services.filter(
            serviceId => serviceId.toString() !== sid.toString()
        );

        await booking.save();

        return booking;
    },


    updateBooking: async (bid, data) => {

        const booking = await getBookingById(bid);

        if (!booking) {
            throw new Error('Reserva no encontrada');
        }

        return await updateBookingManager(bid, data);
    }
};