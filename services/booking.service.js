import * as bookingRepository from '../repositories/bookings.repository.js';

export const getBookings = async () => {
    return bookingRepository.getAll();
};

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

    const existingService = booking.services.find(
        service =>
            service.service._id?.toString() === serviceId.toString() ||
            service.service.toString() === serviceId.toString()
    );

    if (existingService) {
        existingService.quantity += 1;
    } else {
        booking.services.push({
            service: serviceId,
            quantity: 1
        });
    }

    return bookingRepository.update(bookingId, booking);
};

export const updateServiceQuantity = async (bookingId, serviceId, quantity) => {
    const booking = await bookingRepository.getById(bookingId);

    if (!booking) {
        return null;
    }

    if (!booking.services || booking.services.length === 0) {
        return null;
    }

    const existingService = booking.services.find(
        item => String(item.service._id) === String(serviceId)
    );

    if (!existingService) {
        return null;
    }

    existingService.quantity = quantity;

    return bookingRepository.update(bookingId, booking);
};

export const removeServiceFromBooking = async (bookingId, serviceId) => {
    const booking = await bookingRepository.getById(bookingId);

    if (!booking) {
        return null;
    }

    if (!booking.services) {
        return null;
    }

    const serviceIndex = booking.services.findIndex(
        service =>
            service.service._id?.toString() === serviceId.toString() ||
            service.service.toString() === serviceId.toString()
    );

    if (serviceIndex === -1) {
        return null;
    }

    booking.services.splice(serviceIndex, 1);

    return bookingRepository.update(bookingId, booking);
};

export const deleteBooking = async (bookingId) => {
    return bookingRepository.remove(bookingId);
};