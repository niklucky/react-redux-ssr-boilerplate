import React from 'react';
import PropTypes from 'prop-types';

const ExitOutline = props => (
  <svg viewBox="0 0 56 56">
    <g>
      <path
        fill={props.color}
        d="M38.7,2.5h-27c-0.3,0-0.5,0.2-0.5,0.5s0.2,0.5,0.5,0.5h26.5v43H11.7c-0.3,0-0.5,0.2-0.5,0.5
          s0.2,0.5,0.5,0.5h27c0.3,0,0.5-0.2,0.5-0.5V3C39.2,2.7,39,2.5,38.7,2.5z"
      />
      <path
        fill={props.color}
        d="M11.3,36.9c0.1,0.1,0.3,0.2,0.4,0.2c0.1,0,0.2,0,0.3-0.1c0.2-0.2,0.3-0.5,0.1-0.7L4.3,25.5h21
          c0.3,0,0.5-0.2,0.5-0.5s-0.2-0.5-0.5-0.5h-21l7.8-10.8c0.2-0.2,0.1-0.5-0.1-0.7c-0.2-0.2-0.5-0.1-0.7,0.1L2.9,24.7c0,0,0,0,0,0
          c0,0.1-0.1,0.2-0.1,0.3s0,0.2,0.1,0.3c0,0,0,0,0,0L11.3,36.9z"
      />
    </g>
  </svg>

);

ExitOutline.propTypes = {
  color: PropTypes.string.isRequired
};

export default ExitOutline;
