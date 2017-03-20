import React, { Component, PropTypes } from 'react';

import styles from './Badge.scss';

class Badge extends Component {
  render() {
    const { title, color, style } = this.props;
    const className = [styles.container];
    if (color) {
      className.push(styles[color]);
    }
    return (
      <div className={className.join(' ')} style={style}>{title}</div>
    );
  }
}

Badge.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.object,
};

Badge.defaultProps = {
  color: 'gray',
  title: '',
  style: {}
};

export default Badge;
