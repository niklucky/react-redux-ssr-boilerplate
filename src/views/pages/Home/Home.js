import React, { Component } from 'react';
import styles from './Home.scss';

class Home extends Component {
  render() {
    return (
      <div className={styles.container}>
        <h1>Home page</h1>
      </div>
    );
  }
}

Home.propTypes = {
};

Home.defaultProps = {
};

export default Home;
