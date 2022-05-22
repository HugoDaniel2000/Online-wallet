import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dispatchCurrencyThunk, finishEdit } from '../actions';

class EditFormWallet extends React.Component {
  constructor() {
    super();
    this.state = {
      currency: 'USD',
      value: 0,
      method: '',
      tag: '',
      description: '',
    };
  }

  componentDidMount() {
    const { dispatchFetchCurrency } = this.props;
    dispatchFetchCurrency();
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  onClick = () => {
    const { dispatchEditTable, exchangeRates, id } = this.props;
    const { value, currency, method, tag, description } = this.state;
    dispatchCurrencyThunk();
    dispatchEditTable(id, {
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    });

    this.setState({
      value: '',
    });
  }

  render() {
    const { value, description } = this.state;
    const { arrayCurrency } = this.props;
    return (
      <div>
        <form>

          <input
            type="number"
            placeholder="valor"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
          <label htmlFor="currency">
            Moeda3
            <select
              data-testid="currency-input"
              name="currency"
              id="currency"
              onChange={ this.handleChange }
            >
              {arrayCurrency === null
                ? null
                : arrayCurrency
                  .filter((currencies) => currencies !== 'USDT')
                  .map((values) => (
                    <option
                      key={ values }
                      data-testid={ values }
                    >
                      {values}
                    </option>
                  ))}
            </select>
          </label>
          <select
            data-testid="method-input"
            name="method"
            onChange={ this.handleChange }
          >
            <option value="">Método de pagamento</option>
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChange }
          >
            <option value="">Tag</option>
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          <input
            type="text"
            placeholder="Descrição"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </form>
        <button
          type="button"
          onClick={ this.onClick }
        >
          Editar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  arrayCurrency: state.wallet.currencies,
  exchangeRates: state.wallet.exchangeRates,
  id: state.wallet.editExpenseId,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchCurrency: () => dispatch(dispatchCurrencyThunk()),
  dispatchEditTable: (id, expense) => dispatch(finishEdit(id, expense)),
});

EditFormWallet.propTypes = {
  dispatchFetchCurrency: PropTypes.func.isRequired,
  arrayCurrency: PropTypes.arrayOf.isRequired,
  dispatchEditTable: PropTypes.func.isRequired,
  exchangeRates: PropTypes.arrayOf.isRequired,
  id: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditFormWallet);
