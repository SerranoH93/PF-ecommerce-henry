const { z } = require('zod');

const newProductSchema = z.object({
    name: z
        .string({
            required_error: "El Nombr es obligatorio",
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
    price: z
        .coerce.number({
            requiredError: 'El precio es obligatorio'
        }),
    gender: z
        .string({
            required_error: "El genero es obligatorio",
        })
        .min(3, {
            message: 'Genero debe contener al menos 3 caracteres'
        })
        .max(50, {
            message: 'No más de 50 caracteres',
        }),
    stock: z
        .coerce.number({
            requiredError: 'Stock es obligatorio'
        }),
    active: z.boolean().or(z.string().transform(s => s === 'true')), //! Revisar validación cuando se implemente con el back
    size: z.coerce.number({
            requiredError: 'Talla obligatorio'
        })
})

module.exports = newProductSchema;