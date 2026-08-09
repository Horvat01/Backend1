import { BookingModel } from '../models/booking.model.js';

export class BookingMongoDao {

    async getAll() {
        return BookingModel.find()
            .populate('services.service')
            .lean();
    }

    async create(data) {
        return BookingModel.create(data);
    }

    async getById(id, { populate = false } = {}) {
        const query = BookingModel.findById(id);

        if (populate) {
            query.populate('services.service');
        }

        return query.lean();
    }

    async update(id, data) {
        return BookingModel.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        ).lean();
    }

    async delete(id) {
        return BookingModel.findByIdAndDelete(id).lean();
    }
}

export const bookingMongoDao = new BookingMongoDao();

