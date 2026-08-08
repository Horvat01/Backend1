import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
    {
        serviceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
            required: true
        },
        clientName: {
            type: String,
            required: true,
            trim: true
        },
        date: {
            type: Date,
            required: true
        },
        services: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Service'
            }
        ]
    },
    {
        timestamps: true
    }
);

export const BookingModel = mongoose.model('Booking', bookingSchema);