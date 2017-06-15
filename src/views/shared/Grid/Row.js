import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Grid.scss';

class Row extends Component {
  render() {
    const type = (this.props.fixed) ? 'fixed' : 'fluid';
    const className = [styles.row, styles[type], this.props.className].join(' ');
    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  }
}

Row.propTypes = {
  children: PropTypes.any,
  fixed: PropTypes.bool,
  className: PropTypes.oneOfType([
    PropTypes.string, PropTypes.object
  ]),
};

Row.defaultProps = {
  children: null,
  fixed: true,
  className: '',
};

export default Row;
