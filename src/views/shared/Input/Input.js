import React, { Component, PropTypes } from 'react';

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
  }
  handleKeyPress = (e) => {
    if (e.keyCode === 27) {
      this.handleBlur();
    }
    if (e.key === 'Enter') {
      if (this.props.onSubmit) {
        this.props.onSubmit(this.state.value);
      }
    }
  }
  handleBlur = () => {
    if (this.props.onBlur) {
      this.props.onBlur(this.state.value);
    }
  }
  render() {
    const style = {};
    if (this.props.size) {
      style.width = this.props.size;
    }
    return (
      <div className={styles.container}>
        <InputLabel label={this.props.label} />
        <input
          className={styles.input}
          type={this.props.type}
          value={this.state.value}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyPress}
          onBlur={this.handleBlur}
          style={style}
        />
      </div>
    );
  }
}
Input.defaultProps = {
  type: 'text',
  size: 'md',
  onSubmit: null,
  onBlur: null
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
};

export default Input;
