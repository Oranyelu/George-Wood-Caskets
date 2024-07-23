import React, { useContext } from 'react';
import { ProductContext } from '../ProductProvider';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart } = useContext(ProductContext);

  return (
    <div className="cart-page">
      <h1>Cart</h1>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
      {cart.length > 0 && (
        <Link to="/checkout">Proceed to Checkout</Link>
      )}
      <Link to="/">Back to Products</Link>
    </div>
  );
};

export default Cart;
