import { bookingMongoDao } from '../dao/mongo/booking.mongo.dao.js';

export const getAll = async () => {
    return bookingMongoDao.getAll();
};

export const create = async (bookingData) => {
    return bookingMongoDao.create(bookingData);
};

export const getById = async (id) => {
    return bookingMongoDao.getById(id, {
        populate: true
    });
};

export const update = async (id, bookingData) => {
    return bookingMongoDao.update(id, bookingData);
};

export const remove = async (id) => {
    return bookingMongoDao.delete(id);
};
