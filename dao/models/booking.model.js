import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
    {
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
                service: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Service',
                    required: true
                },

                quantity: {
                    type: Number,
                    required: true,
                    default: 1,
                    min: 1
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

export const BookingModel = mongoose.model('Booking', bookingSchema);
