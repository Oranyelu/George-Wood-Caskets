import React, { useContext } from 'react';
import { ProductContext } from '../ProductProvider';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, checkout } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    checkout();
    navigate('/confirmation');
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
          <button onClick={handleCheckout}>Place Order</button>
        </div>
      )}
      <Link to="/cart">Back to Cart</Link>
    </div>
  );
};

export default Checkout;
