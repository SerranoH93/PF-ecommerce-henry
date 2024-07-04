import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductSchema } from './productSchema';
import Button from '@/components/Button/Button';
type ProductFormInputs = {
  id?: number;
  name: string;
  description: string;
  price: number;
  gender: string;
  stock: number;
  active: boolean;
  size: number | string;
  images: FileList;
  categoryId: number;
};

interface Category {
  id: number;
  name: string;
}

interface CreateProductProps {
  categories: Category[];
  onClose: () => void;
  product?: ProductFormInputs;
}

const CreateProduct: React.FC<CreateProductProps> = ({ categories, onClose, product }) => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<ProductFormInputs>({
    resolver: zodResolver(ProductSchema),
    defaultValues: product || {
      name: '',
      description: '',
      price: 0,
      gender: '',
      stock: 0,
      active: true,
      size: 0,
      categoryId: 0,
    },
  });

  useEffect(() => {
    if (product) {
      Object.keys(product).forEach(key => {
        setValue(key as keyof ProductFormInputs, product[key as keyof ProductFormInputs]);
      });
    }
  }, [product, setValue]);

  const onSubmit = async (data: ProductFormInputs) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('gender', data.gender);
    formData.append('stock', data.stock.toString());
    formData.append('active', data.active.toString());
    formData.append('size', data.size.toString());
    formData.append('categoryId', data.categoryId.toString());

    if (data.images && data.images.length > 0) {
      formData.append('images', data.images[0]);
    }

    try {
      const response = await fetch(`http://localhost:3002/products/${product?.id ? 'edit' : 'create'}`, {
        method: product?.id ? 'PUT' : 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Product saved successfully!');
        onClose();
      } else {
        alert('Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <h1 className='text-5xl text-center my-10 font-black'>{product ? 'Edit Product' : 'Create New Product'}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name" className='block text-xl font-bold'>Name</label>
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
            <option value="niños" className='text-black'>Niños</option>
            <option value="mujeres" className='text-black'>Mujeres</option>
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
        <div>
          <label htmlFor="active" className='block text-xl font-bold'>Active</label>
          <input type="checkbox" id="active" {...register('active')} className='text-black' />
          {errors.active && <p>{errors.active.message}</p>}
        </div>
        <div>
          <label htmlFor="size" className='block text-xl font-bold'>Size</label>
          <input type="number" id="size" {...register('size', { valueAsNumber: true })} className='text-black' />
          {errors.size && <p>{errors.size.message}</p>}
        </div>
        <div>
          <label htmlFor="categoryId" className='block text-xl font-bold'>Category</label>
          <select id="categoryId" {...register('categoryId', { valueAsNumber: true })} className='text-black'>
            {categories.map(category => (
              <option key={category.id} value={category.id} className='text-black'>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <p>{errors.categoryId.message}</p>}
        </div>
        <div>
          <label htmlFor="images" className='block text-xl font-bold'>Images</label>
          <input type="file" id="images" {...register('images')} onChange={handleImageChange} />
          {errors.images && <p>{errors.images.message}</p>}
        </div>
        {preview && <img src={preview as string} alt="Image preview" />}
        <div>
          <Button type="submit" onClick={() => {}}>Save Product</Button>
          <Button type="button" onClick={onClose}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
