import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editMode, removeExpense } from '../actions';
import '../css/table.scss';

class ExpensesTable extends React.Component {
  getCurrencyName = (expense) => {
    const { currency, exchangeRates } = expense;
    return exchangeRates[currency].name;
  }

  getUsedExchange = (expense) => {
    const { currency, exchangeRates } = expense;
    return Number(exchangeRates[currency].ask).toFixed(2);
  }

  getConvertedValue = (expense) => {
    const { currency, exchangeRates, value } = expense;
    return Number(exchangeRates[currency].ask * value).toFixed(2);
  }

  render() {
    const { expenses, removeExpenseId, editTable } = this.props;

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
                    <td>{ this.getCurrencyName(expense).split('/', 1) }</td>
                    <td>{ this.getUsedExchange(expense) }</td>
                    <td>{ this.getConvertedValue(expense) }</td>
                    <td>Real</td>
                    <td>
                      <button
                        type="button"
                        onClick={ () => editTable(expense.id) }
                        className="edit-btn"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={ () => removeExpenseId(expense.id) }
                        className="delete-btn"
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
  editTable: (id) => dispatch(editMode(id)),
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf.isRequired,
  removeExpenseId: PropTypes.func.isRequired,
  editTable: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
