import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import walletImage from '../images/wallet.png';
import '../css/header.scss';

class Header extends React.Component {
  totalExpensesCalculated = () => {
    const { expenseTotal } = this.props;
    if (expenseTotal.length === 0) {
      return 0;
    }
    const expense = expenseTotal.reduce((acc, cur) => {
      const { value, currency, exchangeRates } = cur;
      return acc + (exchangeRates[currency].ask * value);
    }, 0);
    return expense.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <header>
        <div className="logo">
          <img src={ walletImage } alt="Imagem de uma carteira" />
          <div className="title">
            <h1>Online Wallet</h1>
          </div>
        </div>
        <div className="user">
          <p>{ email }</p>
          <p className="total-field">
            { this.totalExpensesCalculated() }
            {' '}
          </p>
          <p> BRL </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenseTotal: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenseTotal: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Header);
