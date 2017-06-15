import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Table.scss';

class TRow extends Component {
  getClassName = () => {
    const { className, onClick } = this.props;
    const cl = [styles.row];
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
TRow.defaultProps = {
  className: null,
  onClick: null,
};

TRow.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default TRow;
