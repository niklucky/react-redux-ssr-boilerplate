import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Helmet from 'react-helmet';

import config from '../config';

// import style from '../theme/App.scss';

const style = {};

class App extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.auth.userId === null && nextProps.auth.userId !== null) {
      // login
      this.props.pushState('/');
    } else if (this.props.auth.userId !== null && nextProps.auth.userId === null) {
      // logout
      this.props.pushState('/login');
    }
  }
  render() {
    return (
      <div className={style.container}>
        <Helmet {...config.app.head} />
        {this.props.children}
      </div>
    );
  }
}

App.defaultProps = {
  children: null,
};

App.propTypes = {
  children: PropTypes.object,
  pushState: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

export default connect(
  state => ({ auth: state.auth }),
  { pushState: push }
)(App);
