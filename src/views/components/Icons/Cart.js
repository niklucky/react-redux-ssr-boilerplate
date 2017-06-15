import React from 'react';
import PropTypes from 'prop-types';

const Cart = props => (
  <svg viewBox="0 0 24 24">
    <path fill={props.color} d="M20.4,6.2c-0.1-0.8-0.8-1.5-1.7-1.5h-1.6C17.1,2.1,14.8,0,12,0S6.9,2.1,6.9,4.7H5.3c-0.9,0-1.7,0.7-1.7,1.5 l-1,16.2C2.5,23.3,3.2,24,4.1,24h15.9c0.9,0,1.6-0.7,1.5-1.5L20.4,6.2z M12,1.3c2,0,3.7,1.5,3.7,3.4H8.3C8.3,2.8,10,1.3,12,1.3z" />
  </svg>
);

Cart.propTypes = {
  color: PropTypes.string.isRequired
};

export default Cart;
