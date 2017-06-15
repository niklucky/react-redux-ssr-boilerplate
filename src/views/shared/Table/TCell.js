import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Table.scss';

class TCell extends Component {
  getClassName = () => {
    const { type } = this.props;
    const cl = [styles.cell];
    if (type) {
      cl.push(styles[type]);
    }
    return cl.join(' ');
  };

  render() {
    const className = this.getClassName();
    const style = this.props.style;
    if (style.width === undefined) {
      style.flex = 1;
    }
    return (
      <div className={className} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}
TCell.defaultProps = {
  type: null,
  children: null,
  style: {}
};

TCell.propTypes = {
  children: PropTypes.any,
  type: PropTypes.string,
  style: PropTypes.object,
};

export default TCell;
