import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Table.scss';

class THead extends Component {
  getClassName = () => {
    const { className, onClick } = this.props;
    const cl = [styles.headerRow];
    if (className) {
      cl.push(styles[className]);
    }
    if (onClick) {
      cl.push(styles.active);
    }
    return cl.join(' ');
  };

  render() {
    return (
      <div className={this.getClassName()} onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }
}
THead.defaultProps = {
  className: null,
  onClick: null,
};

THead.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default THead;
