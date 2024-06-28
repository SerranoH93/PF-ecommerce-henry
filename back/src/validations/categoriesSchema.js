const { z } = require('zod');

const categoriesSchema = z.object({
    name: z
        .string({
            required_error: "El Nombre es obligatorio",
        })
        .min(3, {
            message: 'El nombre debe contener al menos 3 caracteres'
        })
        .max(50, {
            message: 'El nombre no debe contener más de 50 caracteres',
        }),
    description: z
        .string({
            required_error: "La descripción es obligatoria",
        })
        .min(20, {
            message: 'La descripción debe tener al menos 20 caracteres'
        })
        .max(150, {
            message: 'La descripción no debe contener más de 50 caracteres',
        }),
})

module.exports = categoriesSchema;