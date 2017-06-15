import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import { setCookie, removeCookie } from '../helpers/cookies';
import config from '../config';
import style from '../theme/App.scss';

class App extends Component {
  componentWillMount() {
    if (__CLIENT__) {
      if (this.props.auth.accessToken) {
        setCookie(config.cookie.name, this.props.auth.accessToken, config.cookie.expired);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { userId: currentUserId } = this.props.auth;
    const { userId: nextUserId } = nextProps.auth;

    if (currentUserId === null && nextUserId !== null) {
      // login
      if (__CLIENT__) {
        setCookie(config.cookie.name, nextProps.auth.accessToken, config.cookie.expired);
      }
      this.props.pushState('/');
    } else if (currentUserId !== null && nextUserId === null) {
      // logout
      if (__CLIENT__) {
        removeCookie(config.cookie.name);
      }
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
