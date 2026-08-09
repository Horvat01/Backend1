import { z } from 'zod';

export const createBookingSchema = z.object({
    clientName: z
        .string()
        .min(2, 'El nombre del cliente es obligatorio'),

    date: z.coerce.date({
        message: 'La fecha es obligatoria'
    }),

    services: z
        .array(
            z.object({
                service: z.string().min(1, 'El servicio es obligatorio'),
                quantity: z
                    .number()
                    .int()
                    .min(1, 'La cantidad debe ser mayor a cero')
            })
        )
        .optional()
        .default([])
});

