import React, { Component, PropTypes } from 'react';

import styles from './scss/ionicons.scss';

class Icon extends Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
  render() {
    const { name, color, size } = this.props;
    return (
      <i
        className={`${styles.icon} ${styles[name]}`}
        style={{ color, fontSize: size }}
        onClick={this.handleClick}
      />
    );
  }
}
Icon.defaultProps = {
  color: '#333333',
  size: '1em',
  onClick: null
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
};

export default Icon;
