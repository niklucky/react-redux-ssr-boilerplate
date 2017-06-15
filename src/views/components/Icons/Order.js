import React from 'react';
import PropTypes from 'prop-types';

const OrderOutline = props => (
  <svg viewBox="0 0 50 50">
    <g>
      <polygon
        fill={props.color}
        points="21.3,14.6 21.3,3.4 21.3,2 21.3,0 7,14.6 9,14.6"
      />
      <path
        fill={props.color}
        d="M25.3,0v2v1.4v13.2c0,1.1-0.9,2-2,2h-0.6H9H7C7,24.9,7,50,7,50h36V0C43,0,30.7,0,25.3,0z"
      />
    </g>
  </svg>

);

OrderOutline.propTypes = {
  color: PropTypes.string.isRequired
};

export default OrderOutline;
