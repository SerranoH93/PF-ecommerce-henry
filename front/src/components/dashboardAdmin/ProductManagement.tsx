// 'use client';

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import styles from './ProductManagement.module.css';

// interface Product {
//   id: string;
//   name: string;
//   category: string;
//   size: string;
//   color: string;
//   price: number;
//   stock: number;
//   provider: string;
//   addedDate: string;
//   status: string;
// }

// const ProductManagement: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const [newProduct, setNewProduct] = useState<Partial<Product>>({
//     name: '',
//     category: '',
//     size: '',
//     color: '',
//     price: 0,
//     stock: 0,
//     provider: '',
//     addedDate: new Date().toISOString().split('T')[0],
//     status: 'Disponible',
//   });

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('/api/products');
//       setProducts(response.data);
//       setLoading(false);
//     } catch (error) {
//       toast.error('Error fetching products');
//       setLoading(false);
//     }
//   };

//   const addProduct = async (product: Partial<Product>) => {
//     try {
//       await axios.post('http://localhost:3002/products/create', product);
//       toast.success('Product added successfully');
//       fetchProducts();
//       setShowModal(false);
//     } catch (error) {
//       toast.error('Error adding product');
//     }
//   };

//   const updateProduct = async (id: string, updatedProduct: Partial<Product>) => {
//     try {
//       await axios.put(`/api/products/${id}`, updatedProduct);
//       toast.success('Product updated successfully');
//       fetchProducts();
//     } catch (error) {
//       toast.error('Error updating product');
//     }
//   };

//   const deleteProduct = async (id: string) => {
//     try {
//       await axios.delete(`/api/products/${id}`);
//       toast.success('Product deleted successfully');
//       fetchProducts();
//     } catch (error) {
//       toast.error('Error deleting product');
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setNewProduct({ ...newProduct, [name]: value });
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     addProduct(newProduct);
//   };

//   return (
//     <div className={styles.container}>
//       <ToastContainer />
//       <h1 className={styles.title}>Product Management</h1>
//       <button className={styles.addButton} onClick={() => setShowModal(true)}>Add Product</button>
//       {showModal && (
//         <div className={styles.modal}>
//           <div className={styles.modalContent}>
//             <span className={styles.close} onClick={() => setShowModal(false)}>&times;</span>
//             <h2>Add New Product</h2>
//             <form className={styles.form} onSubmit={handleSubmit}>
//               <label className={styles.label}>
//                 Name:
//                 <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} required />
//               </label>
//               <label className={styles.label}>
//                 Category:
//                 <input type="text" name="category" value={newProduct.category} onChange={handleInputChange} required />
//               </label>
//               <label className={styles.label}>
//                 Size:
//                 <input type="text" name="size" value={newProduct.size} onChange={handleInputChange} required />
//               </label>
//               <label className={styles.label}>
//                 Color:
//                 <input type="text" name="color" value={newProduct.color} onChange={handleInputChange} required />
//               </label>
//               <label className={styles.label}>
//                 Price:
//                 <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} required />
//               </label>
//               <label className={styles.label}>
//                 Stock:
//                 <input type="number" name="stock" value={newProduct.stock} onChange={handleInputChange} required />
//               </label>
//               <label className={styles.label}>
//                 Provider:
//                 <input type="text" name="provider" value={newProduct.provider} onChange={handleInputChange} required />
//               </label>
//               <label className={styles.label}>
//                 Added Date:
//                 <input type="date" name="addedDate" value={newProduct.addedDate} onChange={handleInputChange} required />
//               </label>
//               <label className={styles.label}>
//                 Status:
//                 <select name="status" value={newProduct.status} onChange={handleInputChange} required>
//                   <option value="Disponible">Disponible</option>
//                   <option value="Agotado">Agotado</option>
//                 </select>
//               </label>
//               <button className={styles.submitButton} type="submit">Add Product</button>
//             </form>
//           </div>
//         </div>
//       )}
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Category</th>
//             <th>Size</th>
//             <th>Color</th>
//             <th>Price</th>
//             <th>Stock</th>
//             <th>Provider</th>
//             <th>Added Date</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map(product => (
//             <tr key={product.id}>
//               <td>{product.id}</td>
//               <td>{product.name}</td>
//               <td>{product.category}</td>
//               <td>{product.size}</td>
//               <td>{product.color}</td>
//               <td>{product.price}</td>
//               <td>{product.stock}</td>
//               <td>{product.provider}</td>
//               <td>{product.addedDate}</td>
//               <td>{product.status}</td>
//               <td>
//                 <button className={styles.editButton} onClick={() => updateProduct(product.id, {/*...*/})}>Edit</button>
//                 <button className={styles.deleteButton} onClick={() => deleteProduct(product.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProductManagement;