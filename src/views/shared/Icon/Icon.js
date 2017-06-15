import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as icons from '../../components/Icons';
import styles from './Icon.scss';

const svg = (name, size, color, rotate) => {
  const IconComponent = icons[name];

  if (IconComponent === undefined) {
    return null;
  }

  const viewBox = '0 0 512 512';

  return (
    <svg width={size} height={size} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
      <IconComponent color={color} rotate={rotate} />
    </svg>
  );
};

class Icon extends Component {
  render() {
    const { name, color, size, rotate, className } = this.props;
    return (
      <div
        className={[styles.icon, className].join(' ')}
        style={{ width: size, height: size }}
        onClick={this.props.onClick}
      >
        {svg(name, size, color, rotate)}
      </div>
    );
  }
}

Icon.defaultProps = {
  color: '#333333',
  size: 24,
  rotate: 0,
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  className: PropTypes.string,
  rotate: PropTypes.number,
  size: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  onClick: PropTypes.func,
};

export default Icon;
