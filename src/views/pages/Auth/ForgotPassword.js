import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { login } from '../../../redux/reducers/auth';
import { Input, Button, Row, Column } from '../../shared';
import styles from './Login.scss';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
  }

  componentWillMount() {
    if (this.props.auth.userId !== null) {
      this.props.pushState('/');
    }
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    this.props.login(this.state);
  };

  render() {
    return (
      <Row>
        <Column sm={1} md={2} lg={2} />
        <Column xs={12} sm={11} md={10} lg={10} >
          <div className={styles.form}>
            <h1>Восстановление пароля</h1>
            <Input
              label="Логин (эл. почта)"
              value={this.state.username}
              onChange={value => this.handleChange('username', value)}
              maxLength={32}
            />
            <Button type={'smallCta'} value="Выслать на почту" onClick={this.handleSubmit} />
            <span className={styles.or}>&nbsp;&nbsp;или&nbsp;&nbsp;</span>
            <Link to={'/register'}>Зарегистрироваться</Link>
          </div>
        </Column>
      </Row>
    );
  }
}
ForgotPassword.propTypes = {
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  pushState: PropTypes.func.isRequired
};

export default connect(
  state => ({ auth: state.auth }),
  { login, pushState: push }
)(ForgotPassword);
