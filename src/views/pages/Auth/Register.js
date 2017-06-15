import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { register, logError } from '../../../redux/reducers/auth';
import { Input, Button, Row, Column } from '../../shared';
import styles from './Login.scss';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        username: {
          value: '',
          label: 'Эл.почта (логин)',
          onValidate: this.validateEmail,
          errorMessage: 'Введите существующий email',
        },
        password: {
          value: '',
          label: 'Пароль',
          type: 'password',
          onValidate: this.validateEmpty,
          errorMessage: 'Введите свой пароль',
        },
        firstName: {
          value: '',
          label: 'Имя',
          onValidate: this.validateEmpty,
          errorMessage: 'Введите свое имя',
        },
        middleName: {
          value: '',
          label: 'Отчество',
        },
        lastName: {
          value: '',
          label: 'Фамилия',
          onValidate: this.validateEmpty,
          errorMessage: 'Введите свою фамилию',
        },
        phone: {
          value: '',
          label: 'Телефон',
          onValidate: this.validatePhone,
          onFormat: this.formatPhone,
          errorMessage: 'Введите телефон',
        }

      },
      isSent: false
    };
  }

  componentWillMount() {
    if (this.props.auth.userId !== null) {
      this.props.pushState('/');
    }
  }

  handleChange = (name, value) => {
    const fields = this.state.fields;
    fields[name].value = value;

    if (fields[name].onFormat) {
      fields[name].value = fields[name].onFormat(value);
    }
    this.setState({ fields });
  };

  validateEmpty = value => (
    value !== undefined && value !== ''
  );

  validateEmail = (email) => {
    /*eslint-disable */
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    /*eslint-enable */
  };

  validatePhone = (phone) => {
    // some validation
    console.log(phone);
    return true;
  };

  formatPhone = (phone) => {
    const text = phone;
    return text.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  };

  resetError = (name) => {
    const fields = this.state.fields;
    fields[name].isValid = null;
    this.setState({ fields });
  };

  validate = (name) => {
    const fields = this.state.fields;

    fields[name].isValid = this.checkValidation(name);
    this.setState({ fields });
    return fields[name].isValid;
  };

  checkValidation = (name) => {
    const fields = this.state.fields;
    if (fields[name].onValidate) {
      return fields[name].onValidate(fields[name].value);
    }
    return null;
  };

  handleSubmit = () => {
    const { fields } = this.state;
    const idx = Object.keys(fields);
    const data = {};
    let isValid = true;

    idx.forEach((name) => {
      const result = this.validate(name);
      if (result === false) {
        isValid = false;
      }
      data[name] = fields[name].value;
    });
    if (isValid !== false) {
      this.setState({ isSent: true });
      this.props.register(data);
    }
  };

  render() {
    const fields = Object.keys(this.state.fields);
    const registerErrorMessage = (this.props.auth.error.register !== null)
      ? this.props.auth.error.register.message
      : '';
    return (
      <Row fixed>
        <Column sm={1} md={2} lg={2} />
        <Column xs={12} sm={11} md={10} lg={10} >
          <div className={styles.form}>
            <h1>Новый аккаунт</h1>
            {registerErrorMessage && this.state.isSent && (
              <div className={styles.error}>
                {registerErrorMessage}
              </div>
            )}
            {fields.map((name) => {
              const field = this.state.fields[name];
              const errorMessage = (field.errorMessage || 'Error!');
              return (
                <Input
                  key={name}
                  label={field.label}
                  value={field.value}
                  type={field.type || 'text'}
                  onChange={value => (this.handleChange(name, value))}
                  onFocus={() => (this.resetError(name))}
                  onBlur={() => (this.validate(name))}
                  errorMessage={(field.isValid === false) ? errorMessage : ''}
                  maxLength={32}
                />
              );
            })}

            <Button type={'smallCta'} value="Зарегистрироваться" onClick={this.handleSubmit} />
            <span>&nbsp;&nbsp;или&nbsp;&nbsp;</span>
            <Link to={'/login'}>Войти</Link>
          </div>
        </Column>
      </Row>
    );
  }
}
Register.propTypes = {
  auth: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  pushState: PropTypes.func.isRequired,
//  logError: PropTypes.func.isRequired
};

export default connect(
  state => ({ auth: state.auth }),
  { register, logError, pushState: push }
)(Register);
