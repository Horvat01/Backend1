import * as bookingDao from '../dao/bookings.dao.js';

export const create = async (bookingData) => {
    return bookingDao.create(bookingData);
};

export const getById = async (id) => {
    return bookingDao.getById(id);
};

export const update = async (id, bookingData) => {
    return bookingDao.update(id, bookingData);
};