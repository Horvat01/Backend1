import * as bookingRepository from '../repositories/bookings.repository.js';

export const createBooking = async (bookingData) => {
    const newBooking = {
        ...bookingData,
        services: bookingData.services || []
    };

    return bookingRepository.create(newBooking);
};

export const getBookingById = async (id) => {
    return bookingRepository.getById(id);
};

export const addServiceToBooking = async (bookingId, serviceId) => {
    const booking = await bookingRepository.getById(bookingId);

    if (!booking) {
        return null;
    }

    if (!booking.services) {
        booking.services = [];
    }

    const serviceIdNumber = Number(serviceId);

    const existingService = booking.services.find(
        service => service.service === serviceIdNumber
    );

    if (existingService) {
        existingService.quantity += 1;
    } else {
        booking.services.push({
            service: serviceIdNumber,
            quantity: 1
        });
    }

    return bookingRepository.update(bookingId, booking);
};