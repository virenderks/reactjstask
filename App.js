import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const tshirts = [
    {
      id: '1',
      name: 'Navy Blue Armani T-shirt',
      description: 'Premium quality navy blue T-shirt by Armani',
      price: 29.99,
      quantity: 10,
    },
    // Add more T-shirt objects here
  ];

  const addToCartHandler = (tshirt) => {
    if (tshirt.quantity > 0) {
      setCartItems((prevCartItems) => [...prevCartItems, tshirt]);
      tshirt.quantity -= 1;
    }
  };

  const showCartHandler = () => {
    setShowCart(true);
  };

  const hideCartHandler = () => {
    setShowCart(false);
  };

  const cartContent = (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <p>Total: ${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}</p>
        </>
      )}
      <button className="order-button">Order</button>
      <button className="close-button" onClick={hideCartHandler}>
        Close
      </button>
    </div>
  );

  return (
    <div>
      {showCart && cartContent}
      <header>
        <h1>T-Shirt Store</h1>
        <button className="cart-button" onClick={showCartHandler}>
          Cart ({cartItems.length})
        </button>
      </header>
      <main>
        <div className="tshirt-container">
          {tshirts.map((tshirt) => (
            <div key={tshirt.id} className="tshirt">
              <h3>{tshirt.name}</h3>
              <p>{tshirt.description}</p>
              <p>Price: ${tshirt.price.toFixed(2)}</p>
              <p>Quantity: {tshirt.quantity}</p>
              <div className="size-buttons">
                <button className="size-button">Small</button>
                <button className="size-button">Medium</button>
                <button className="size-button">Large</button>
              </div>
              <button
                className="add-button"
                onClick={() => addToCartHandler(tshirt)}
                disabled={tshirt.quantity === 0}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>
      <footer>
        <div className="model-box">
          <h3>Model Box</h3>
          <button className="buy-button">Buy Small</button>
          <button className="buy-button">Buy Medium</button>
          <button className="buy-button">Buy Large</button>
          <p>Total Price: ${(cartItems.length * tshirts[0].price).toFixed(2)}</p>
          <button className="order-button">Order</button>
          <button className="cancel-button">Cancel</button>
        </div>
      </footer>
    </div>
  );
};

export default App;
