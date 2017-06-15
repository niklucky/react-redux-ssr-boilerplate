import React from 'react';
import PropTypes from 'prop-types';

const Menu = props => (
  <svg viewBox="0 0 24 24">
    <g>
      <line fill="none" stroke={props.color} strokeWidth="3" strokeLinecap="round" x1="1.5" y1="12.5" x2="22.5" y2="12.5" />
      <line fill="none" stroke={props.color} strokeWidth="3" strokeLinecap="round" x1="1.5" y1="5.1" x2="22.5" y2="5.1" />
      <line fill="none" stroke={props.color} strokeWidth="3" strokeLinecap="round" x1="1.5" y1="19.9" x2="22.5" y2="19.9" />
    </g>
  </svg>
);

Menu.propTypes = {
  color: PropTypes.string.isRequired
};

export default Menu;
