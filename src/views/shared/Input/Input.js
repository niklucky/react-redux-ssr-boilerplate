import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputLabel from '../InputLabel';
import styles from './Input.scss';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
    this.props.onChange(value);
  };

  handleKeyPress = (e) => {
    if (e.keyCode === 27) {
      this.handleBlur();
    }
    if (e.key === 'Enter') {
      if (this.props.onSubmit) {
        this.props.onSubmit(this.state.value);
      }
    }
  };

  handleBlur = () => {
    if (this.props.onBlur) {
      this.props.onBlur(this.state.value);
    }
  };

  handleFocus = () => {
    if (this.props.onFocus) {
      this.props.onFocus(this.state.value);
    }
  };

  render() {
    let style = {};
    if (this.props.style) {
      style = this.props.style;
    }
    if (this.props.size) {
      style.width = this.props.size;
    }
    return (
      <div className={styles.container}>
        <InputLabel className={styles.label} label={this.props.label} />
        <input
          className={styles.input}
          type={this.props.type}
          value={this.state.value}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyPress}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          style={style}
        />
        {this.props.errorMessage &&
          <div className={styles.errorMsg}>{this.props.errorMessage}</div>
        }
      </div>
    );
  }
}
Input.defaultProps = {
  type: 'text',
  size: 'md',
  onSubmit: null,
  onBlur: null,
  onFocus: null,
  style: null,
  errorMessage: ''

};

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]).isRequired,
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  style: PropTypes.object,
  errorMessage: PropTypes.string
};

export default Input;
