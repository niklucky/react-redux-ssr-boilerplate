import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { login, logError } from '../../../redux/reducers/auth';
import { Row, Column, Input, Button } from '../../shared';

import styles from './Login.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  componentWillMount() {
    const { userId, redirectUrl } = this.props.auth;
    if (userId !== null) {
      this.props.pushState(!redirectUrl ? '/' : redirectUrl);
    }
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { username, password } = this.state;
    if (username === '' || password === '') {
      this.props.logError('login', 'Все поля обязательны для заполнения');
    } else {
      this.props.login(this.state);
    }
  };

  render() {
    const {username, password} = this.state;
    return (
      <Row fixed>
        <Column sm={1} md={2} lg={2} />
        <Column xs={12} sm={11} md={10} lg={10} >
          <div className={styles.form}>
            <h1>Войти в личный кабинет</h1>
            {this.props.auth.error && this.props.auth.error.login && (
              <div className={styles.error}>
                {this.props.auth.error.login}
              </div>
            )}
            <Input
              label="Логин (эл. почта)"
              value={username}
              onChange={value => this.handleChange('username', value)}
              maxLength={32}
            />
            <Input
              label="Пароль"
              type="password"
              value={password}
              onChange={value => this.handleChange('password', value)}
              maxLength={32}
            />
            <div className={styles.login}>
              <Button type="smallCta" value="Войти" onClick={this.handleSubmit} />
              <span>&nbsp;&nbsp;или&nbsp;&nbsp;</span>
              <Link to={'/register'}>Зарегистрироваться</Link>
            </div>
            <div className={styles.forgotPass} >
              <Link to={'/forgot-password'}>Забыли пароль?</Link>
            </div>
          </div>
        </Column>
      </Row>
    );
  }
}
Login.propTypes = {
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  pushState: PropTypes.func.isRequired,
  logError: PropTypes.func.isRequired
};

export default connect(
  state => ({ auth: state.auth }),
  { login, logError, pushState: push }
)(Login);
