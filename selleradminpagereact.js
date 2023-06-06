 import React, { useState, useEffect } from 'react';

const SellerAdminPage = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    
    const storedProducts = JSON.parse(localStorage.getItem('products'));
    if (storedProducts) {
      setProducts(storedProducts);
    }
  }, []);

  useEffect(() => {
    
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleAddProduct = () => {
    
    const newProduct = {
      id: Date.now(),
      name,
      price,
      stock: parseInt(stock),
    };

    
    setProducts([...products, newProduct]);

    
    setName('');
    setPrice('');
    setStock('');
  };

  const handleEditProduct = (productId) => {
    
    const editedProductIndex = products.findIndex((product) => product.id === productId);

    if (editedProductIndex !== -1) {
      
      const updatedProducts = [...products];

      
      updatedProducts[editedProductIndex] = {
        ...updatedProducts[editedProductIndex],
        name,
        price,
        stock: parseInt(stock),
      };

      
      setProducts(updatedProducts);

      
      setName('');
      setPrice('');
      setStock('');
    }
  };

  const handleDeleteProduct = (productId) => {
    
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
  };

  const calculateTotalStockValue = () => {
    
    return products.reduce((total, product) => total + product.price * product.stock, 0);
  };

  return (
    <div>
      <h1>Seller Admin Page</h1>

      <div>
        <h2>Add/Edit Product</h2>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <label>
          Stock:
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
        </label>
        <button onClick={handleAddProduct}>Add Product</button>
        <button onClick={() => handleEditProduct(selectedProductId)}>Edit Product</button>
      </div>

      <div>
        <h2>Product List</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - Price: {product.price} - Stock: {product.stock}
              <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            
