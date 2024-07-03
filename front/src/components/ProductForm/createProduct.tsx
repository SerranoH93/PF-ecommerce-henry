"use client"
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductSchema } from './productSchema'

type ProductFormInputs = {
    name: string;
    description: string;
    price: number;
    gender: string;
    stock: number;
    active: boolean;
    size: number;
    images: FileList;
};

const CreateProduct: React.FC = () => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormInputs>({
    resolver: zodResolver(ProductSchema),
  });

  const onSubmit = async (data: ProductFormInputs) => {
    console.log('onSubmit', data)
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price' , data.price.toString());
    formData.append('gender', data.gender);
    formData.append('stock', data.stock.toString());
    formData.append('active', data.active?.toString() ?? false);
    formData.append('size', data.size.toString());

    if (data.images && data.images.length > 0) {
      formData.append('images', data.images[0]);
    } 

    
    try {
      const response = await fetch('https://pf-ecommerce-henry.onrender.com/products/create', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Product created successfully!');
      } else {
        alert('Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className='flex justify-center flex-col items-center w-full'>
      {/* <p>{JSON.stringify(errors)}</p>  */}
      <h1 className='text-5xl text-center my-10 font-black'>Create New Product</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div >
          <label htmlFor="name" className='block text-xl font-bold '>Name</label>
          <input id="name" {...register('name')} className='text-black' />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="description" className='block text-xl font-bold'>Description</label>
          <textarea id="description" {...register('description')} className='text-black' />
          {errors.description && <p>{errors.description.message}</p>}
        </div>
        <div>
          <label htmlFor="price" className='block text-xl font-bold'>Price</label>
          <input type="number" id="price" {...register('price', { valueAsNumber: true })} className='text-black' />
          {errors.price && <p>{errors.price.message}</p>}
        </div>
        <div>
          <label htmlFor="gender" className='block text-xl font-bold'>Gender</label>
          <select id="gender" {...register('gender')} >
            <option value= "niños" className='text-black'>Niños</option>
            <option value= "mujeres" className='text-black'>Mujeres</option>
            <option value="hombres" className='text-black'>Hombres</option>
            <option value="unisex" className='text-black'>Accesorios</option> 
            <option value="unisex" className='text-black'>Destacados</option>
          </select>
          {errors.gender && <p>{errors.gender.message}</p>}
        </div>
        <div>
          <label htmlFor="stock" className='block text-xl font-bold'>Stock</label>
          <input type="number" id="stock" {...register('stock', { valueAsNumber: true })} className='text-black' />
          {errors.stock && <p>{errors.stock.message}</p>}
        </div>
            <select  ></select>
        <div>
          <label htmlFor="size" className='block text-xl font-bold'>Size</label>
          <input type="number" id="size" {...register('size', { valueAsNumber: true })} className='text-black' />
          {errors.size && <p>{errors.size.message}</p>}
        </div>
        <div>
          <label className='block text-xl font-bold'>Imagen</label>
          <input type="file" id="images" {...register('images')} onChange={handleImageChange}  />
          {errors.images && <p>{errors.images.message}</p>}
          {preview && <img src={preview as string} alt="Image Preview" width="100" />}
        </div>

        <div className='flex justify-center'>
          <button type="submit" className='border-2 bg-violet-700 p-3 my-3 font-black uppercase hover:bg-violet-900'>Create Product</button>
        </div>
      </form>
    </div>
  );
}

export {CreateProduct}


