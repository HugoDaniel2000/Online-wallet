import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense } from '../actions';

class ExpensesTable extends React.Component {
  // constructor() {
  //   super();

  //   // this.getCurrencyName = this.getCurrencyName.bind(this);
  //   // this.getUsedExchange = this.getUsedExchange.bind(this);
  // }

  getCurrencyName = (expense) => {
    const { currency, exchangeRates } = expense;
    return exchangeRates[currency].name;
  }

  getUsedExchange = (expense) => {
    const { currency, exchangeRates } = expense;
    console.log(expense);
    return Number(exchangeRates[currency].ask).toFixed(2);
  }

  getConvertedValue = (expense) => {
    const { currency, exchangeRates, value } = expense;
    console.log(expense);
    return Number(exchangeRates[currency].ask * value).toFixed(2);
  }

  render() {
    const { expenses, removeExpenseId } = this.props;
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
                    <td>{ parseFloat(Number(expense.value).toFixed(2))}</td>
                    <td>{ this.getCurrencyName(expense) }</td>
                    <td>{ this.getUsedExchange(expense) }</td>
                    <td>{ this.getConvertedValue(expense) }</td>
                    <td>Real</td>
                    <td>
                      <button
                        type="button"
                        onClick={ () => { } }
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={ () => removeExpenseId(expense.id) }
                        data-testid="delete-btn"
                      >
                        Excluir

                      </button>
                    </td>
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

const mapDispatchToProps = (dispatch) => ({
  removeExpenseId: (expense) => dispatch(removeExpense(expense)),
});
ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf.isRequired,
  removeExpenseId: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
