import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import styles from './Header.scss';

class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <h4>Header</h4>
      </header>
    );
  }
}

Header.propTypes = {
};

Header.defaultProps = {
};

export default Header;
