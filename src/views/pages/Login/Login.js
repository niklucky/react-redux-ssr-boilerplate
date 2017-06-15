import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { login } from '../../../redux/reducers/auth';
import { Input, Button } from '../../shared';
import styles from './Login.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  componentWillMount() {
    if (this.props.auth.userId !== null) {
      this.props.pushState('/');
    }
  }

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

  handleSubmit = () => {
    this.props.login(this.state);
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.background} />
        <div className={styles.form}>
          <Input label="Login" value={this.state.username} onChange={value => this.handleChange('username', value)} maxLength={32} />
          <Input label="Password" type="password" value={this.state.password} onChange={value => this.handleChange('password', value)} maxLength={32} />

          <Button value="Enter" onClick={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  pushState: PropTypes.func.isRequired
};

export default connect(
  state => ({ auth: state.auth }),
  { login, pushState: push }
)(Login);
