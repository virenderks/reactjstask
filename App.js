import React, { useState } from 'react';
import './FoodApp.css';
import burgerImage from './images/burger.jpg';
import pizzaImage from './images/pizza.jpg';
import saladImage from './images/salad.jpg';

const FoodApp = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, { name: item, quantity: 1, price: getItemPrice(item) }]);
  };

  const removeFromCart = (item) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.name !== item);
    setCartItems(updatedCart);
  };

  const incrementQuantity = (item) => {
    const updatedCart = cartItems.map((cartItem) => {
      if (cartItem.name === item) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });
    setCartItems(updatedCart);
  };

  const decrementQuantity = (item) => {
    const updatedCart = cartItems.map((cartItem) => {
      if (cartItem.name === item && cartItem.quantity > 1) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      return cartItem;
    });
    setCartItems(updatedCart);
  };

  const getItemPrice = (item) => {
    // Return the price of the item based on its name
    if (item === 'Burger') {
      return 10;
    } else if (item === 'Pizza') {
      return 12;
    } else if (item === 'Salad') {
      return 8;
    }
    return 0;
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  return (
    <div className="container">
      <h1>Food App</h1>
      <h2>Delicious Food Delivered To You</h2>
      <div className="menu">
        <div className="food-item">
          <img src={burgerImage} alt="Burger" />
          <p>Burger</p>
          <p>Price: $10</p>
          <button onClick={() => addToCart('Burger')}>Add to Cart</button>
        </div>
        <div className="food-item">
          <img src={pizzaImage} alt="Pizza" />
          <p>Pizza</p>
          <p>Price: $12</p>
          <button onClick={() => addToCart('Pizza')}>Add to Cart</button>
        </div>
        <div className="food-item">
          <img src={saladImage} alt="Salad" />
          <p>Salad</p>
          <p>Price: $8</p>
          <button onClick={() => addToCart('Salad')}>Add to Cart</button>
        </div>
      </div>
      <div className="cart">
        <h2>Cart</h2>
        {cartItems.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <div>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  {item.name} - Quantity: {item.quantity} - Price: ${item.price * item.quantity}
                  <button onClick={() => incrementQuantity(item.name)}>+</button>
                  <button onClick={() => decrementQuantity(item.name)}>-</button>
                  <button onClick={() => removeFromCart(item.name)}>Remove</button>
                </li>
              ))}
            </ul>
            <p>Total Price: ${calculateTotalPrice()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodApp;
