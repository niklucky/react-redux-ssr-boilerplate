import React from 'react';
import PropTypes from 'prop-types';

const OrderOutline = props => (
  <svg viewBox="0 0 56 56">
    <g>
      <path
        fill={props.color}
        d="M21.2,0L21,0.2c0,0,0,0,0,0l-14,14.3l-0.1,0.1l0,35.4h36.1V0H21.2z M20.9,1.7l0,12.6l-12.3,0L20.9,1.7z
     M42.1,49H7.9l0-33.7l13.5,0c0.3,0,0.5-0.2,0.5-0.5l0-13.8h20.2V49z"
      />
    </g>
  </svg>

);

OrderOutline.propTypes = {
  color: PropTypes.string.isRequired
};

export default OrderOutline;
