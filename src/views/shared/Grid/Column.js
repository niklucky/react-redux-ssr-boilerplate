import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Grid.scss';

class Column extends Component {
  getClass = () => {
    const { xs, sm, md, lg } = this.props;
    const classNames = [styles.col, this.props.className];
    if (this.props.className) {
      classNames.push(this.props.className);
    }
    if (xs !== null) {
      classNames.push(styles[`xs-${xs}`]);
    }
    if (sm !== null) {
      classNames.push(styles[`sm-${sm}`]);
    }
    if (md !== null) {
      classNames.push(styles[`md-${md}`]);
    }
    if (lg !== null) {
      classNames.push(styles[`lg-${lg}`]);
    }
    return classNames.join(' ');
  };

  render() {
    const styl = {};
    if (this.props.padding) {
      let padding = this.props.padding;
      if (Array.isArray(padding)) {
        padding = this.props.padding.join(' ');
      }
      styl.padding = padding;
    }
    return (
      <div className={this.getClass()} onClick={this.props.onClick}>
        <div className={styles.inner} style={styl}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Column.propTypes = {
  children: PropTypes.any,
  className: PropTypes.oneOfType([
    PropTypes.string, PropTypes.object
  ]),
  padding: PropTypes.oneOfType([
    PropTypes.array, PropTypes.string, PropTypes.number
  ]),
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  onClick: PropTypes.func,
};

Column.defaultProps = {
  children: null,
  size: 12,
  className: '',
  padding: 0,
  xs: null,
  sm: null,
  md: null,
  lg: null,
  onClick: null
};

export default Column;
