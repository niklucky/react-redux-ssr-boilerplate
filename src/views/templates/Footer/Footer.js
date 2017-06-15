import React, { Component } from 'react';
import styles from './Footer.scss';

class Footer extends Component {
  render() {
    return (
      <footer className={styles.footer}>
        <h4>Footer</h4>
      </footer>
    );
  }
}

Footer.propTypes = {
};

Footer.defaultProps = {
};

export default Footer;
