import { z } from 'zod';

const ProductSchema = z.object({
    images: z.instanceof(FileList),
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
            message: 'La descripción no debe contener más de 150 caracteres',
        }),
    price: z
        .number({
            required_error: 'El precio es obligatorio'
        }),
    gender: z
        .string({
            required_error: "El género es obligatorio",
        })
        .min(3, {
            message: 'El género debe contener al menos 3 caracteres'
        })
        .max(50, {
            message: 'El género no debe contener más de 50 caracteres',
        }),
    stock: z
        .number({
            required_error: 'El stock es obligatorio'
        }),
  //   active: z.boolean().or(z.string().transform(s => s === 'true')),
    size: z.number({
        required_error: 'La talla es obligatoria'
    })
});

export {ProductSchema};
