export const createBookingSchema = {
    validate: (body) => {
        const errors = [];

        if (!body.serviceId) {
            errors.push('serviceId es requerido');
        }

        if (!body.clientName) {
            errors.push('clientName es requerido');
        }

        if (!body.date) {
            errors.push('date es requerido');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }
};
