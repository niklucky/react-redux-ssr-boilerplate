import React, { Component } from 'react';
// import { Row, Column } from '../../shared';
import styles from './NotFound.scss';

class NotFound extends Component {
  render() {
    return (
      <div className={styles.background}>
        <h1 className={styles.fourzerofour}>404</h1>
      </div>
    );
  }
}

NotFound.propTypes = {
};

NotFound.defaultProps = {
};

export default NotFound;
