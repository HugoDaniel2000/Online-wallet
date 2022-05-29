import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { sendLogin } from '../actions';
import walletImage from '../images/wallet.png';
import './css/login.scss';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      buttonValidate: true,
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { email, senha } = this.state;
    let { buttonValidate } = this.state;
    const { dispatchEmail } = this.props;
    const numberMaxPassword = 6;
    if (validator.isEmail(email) && senha.length >= numberMaxPassword) {
      buttonValidate = false;
    }
    return (
      <div className="form-login">
        <div className="logo-login">
          <img src={ walletImage } alt="Imagem de uma carteira" />
          <h1>Online Wallet</h1>
        </div>
        <input
          type="email"
          name="email"
          value={ email }
          placeholder="email"
          data-testid="email-input"
          onChange={ this.handleChange }
        />
        <input
          name="senha"
          type="password"
          value={ senha }
          placeholder="senha"
          data-testid="password-input"
          onChange={ this.handleChange }
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ buttonValidate }
            onClick={ () => dispatchEmail(email) }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (email) => dispatch(sendLogin(email)),
});

Login.propTypes = {
  dispatchEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
