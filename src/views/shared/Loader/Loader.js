import React, { Component } from 'react';
import styles from './Loader.scss';

class Loader extends Component {
  render() {
    return (
      <div style={{ minHeight: '600px', width: '100%' }}>
        <div className={styles.loader} />
        <div className={styles.loaderInner} />
        <div className={styles.loaderGrey} />
        <div className={styles.loaderScale} />
      </div>
    );
  }
}

Loader.defaultProps = {
};

Loader.propTypes = {
};

export default Loader;
