import React from 'react';
import { Link } from 'react-router-dom';

const Confirmation = () => {
  return (
    <div className="confirmation-page">
      <h1>Order Confirmed!</h1>
      <p>Thank you for your purchase.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default Confirmation;
