import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Toolbar.scss';

class Toolbar extends Component {
  render() {
    return (
      <div className={styles.container}>
        {this.props.children}
      </div>
    );
  }
}

Toolbar.propTypes = {
  children: PropTypes.any.isRequired
};

export default Toolbar;
