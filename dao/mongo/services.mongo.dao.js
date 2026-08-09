import { ServiceModel } from '../models/service.model.js';

export class ServicesMongoDao {

    async getAll({
        category,
        available,
        page = 1,
        limit = 10,
        sort
    } = {}) {

        const filter = {};

        if (category) {
            filter.category = category;
        }

        if (available !== undefined) {
            filter.available = available === 'true';
        }

        let sortOption = {};

        if (sort === 'asc') {
            sortOption = { price: 1 };
        }

        if (sort === 'desc') {
            sortOption = { price: -1 };
        }

        page = Number(page);
        limit = Number(limit);

        const skip = (page - 1) * limit;

        const totalDocs = await ServiceModel.countDocuments(filter);

        const services = await ServiceModel
            .find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(limit)
            .lean();

        const totalPages = Math.ceil(totalDocs / limit);

        return {
            docs: services,
            totalPages,
            page,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < totalPages ? page + 1 : null
        };
    }

    async getById(id) {
        return ServiceModel.findById(id).lean();
    }

    async create(data) {
        return ServiceModel.create(data);
    }

    async update(id, data) {
        return ServiceModel
            .findByIdAndUpdate(
                id,
                data,
                {
                    new: true,
                    runValidators: true
                }
            )
            .lean();
    }

    async delete(id) {
        return ServiceModel
            .findByIdAndDelete(id)
            .lean();
    }
}

export const servicesMongoDao = new ServicesMongoDao();


