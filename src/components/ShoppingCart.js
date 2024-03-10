
import React, { useState } from 'react';

const ShoppingCart = ({
  cart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart, 
}) => {
  const [totalAmount, setTotalAmount] = useState(calculateTotal(cart));

  const recalculateTotal = () => {
    return calculateTotal(cart);
  };
 

  const handlePayment = () => {
    setTotalAmount(0);
    // Clear the entire cart
    clearCart();
  };

  return (
    <div>
      <h1 className='Header'>Shopping Cart</h1>

      <div className="cart-container">
        {cart.map((item) => (
          <div key={item.product.id} className="cart-item">
            <img src={item.product.image} alt="images" className="card-media" />
            <p>{item.product.name}</p>
            <p>${item.product.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => incrementQuantity(item.product)} className="cart-button">+</button>
            <button onClick={() => decrementQuantity(item.product)} className="cart-button">-</button>
            <button onClick={() => removeFromCart(item.product)} className="cart-button">Remove</button>
          </div>
        ))}
      </div>
      
      <p className="cart-total">Total Amount: ${recalculateTotal()}</p>

      {/* Payment button to reset the entire cart */}
      <div className="payment">
      <button onClick={handlePayment} className="payment-button">Proceed to Payment</button>
      </div>
    
    </div>
  );
};

const isNumerical = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

const calculateTotal = (cart) => {
  return cart
    .filter((item) => isNumerical(item.quantity) && isNumerical(item.product.price))
    .reduce((total, item) => total + item.product.price * parseInt(item.quantity), 0)
    .toFixed(2);
};

export default ShoppingCart;

