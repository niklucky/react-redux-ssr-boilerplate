import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Button.scss';


class Button extends Component {
  render() {
    const className = [styles.button, styles[this.props.type]].join(' ');
    return (
      <div
        className={className}
        style={this.props.style}
        onClick={this.props.onClick}
      >
        {this.props.children || this.props.value}
      </div>
    );
  }
}

Button.propTypes = {
  children: PropTypes.any,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object
};

Button.defaultProps = {
  children: null,
  type: 'button',
  style: null,
  value: 'OK'
};

export default Button;
