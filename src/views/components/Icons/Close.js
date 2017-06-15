import React from 'react';
import PropTypes from 'prop-types';

const Close = props => (
  <svg viewBox="0 0 52 52">
    <g>
      <path
        fill={props.color}
        d="M28.4,26l12.1-12.1c0.7-0.7,0.7-1.8,0-2.4c-0.7-0.7-1.8-0.7-2.4,0L26,23.6L13.9,11.5c-0.7-0.7-1.8-0.7-2.4,0
  c-0.7,0.7-0.7,1.8,0,2.4L23.6,26L11.5,38.1c-0.7,0.7-0.7,1.8,0,2.4c0.3,0.3,0.8,0.5,1.2,0.5s0.9-0.2,1.2-0.5L26,28.4l12.1,12.1
  c0.3,0.3,0.8,0.5,1.2,0.5c0.4,0,0.9-0.2,1.2-0.5c0.7-0.7,0.7-1.8,0-2.4L28.4,26z"
      />
    </g>
  </svg>
);

Close.propTypes = {
  color: PropTypes.string.isRequired
};

export default Close;
