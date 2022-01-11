import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">
          { this.totalExpensesCalculated() }
        </p>
        <span data-testid="header-currency-field">BRL</span>
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
