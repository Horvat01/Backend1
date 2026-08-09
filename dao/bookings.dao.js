import { BookingModel } from './models/booking.model.js';

export const create = async (bookingData) => {
    return BookingModel.create(bookingData);
};

export const getById = async (id) => {
    return BookingModel.findById(id);
};

export const update = async (id, bookingData) => {
    return BookingModel.findByIdAndUpdate(
        id,
        bookingData,
        {
            new: true,
            runValidators: true
        }
    );
};
