import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ExpensesTable extends React.Component {
  constructor() {
    super();

    this.getCurrencyName = this.getCurrencyName.bind(this);
    this.getUsedExchange = this.getUsedExchange.bind(this);
  }

  getCurrencyName(expense) {
    const { currency, exchangeRates } = expense;
    return exchangeRates[currency].name;
  }

  getUsedExchange(expense) {
    const { currency, exchangeRates } = expense;
    console.log(expense);
    return exchangeRates[currency].name;
  }

  render() {
    const { expenses } = this.props;
    console.log(expenses);

    return (
      <main className="Expenses">
        <table className="ExpensesTable">
          <tbody>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
            {
              expenses.map(
                (expense) => (
                  <tr key={ expense.id }>
                    <td>{ expense.description }</td>
                    <td>{ expense.tag }</td>
                    <td>{ expense.method }</td>
                    <td>{ Number(expense.value).toFixed(2) }</td>
                    <td>{ this.getCurrencyName(expense) }</td>
                    <td>{ this.getUsedExchange(expense) }</td>
                  </tr>
                ),
              )
            }
          </tbody>

        </table>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(ExpensesTable);
