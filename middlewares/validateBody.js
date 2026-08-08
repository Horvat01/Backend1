export const validateBody = (schema) => {
    return (req, res, next) => {
        const missingFields = schema.required.filter(
            field => !req.body[field]
        );

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: `Faltan campos requeridos: ${missingFields.join(', ')}`
            });
        }

        next();
    };
};