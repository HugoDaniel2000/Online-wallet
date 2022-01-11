// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { FAILED_REQUEST, REQUEST_COIN, REQUEST_SUCCESS, SEND_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  exchangeRates: {},
  error: '',
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_COIN:
    return { ...state, isFetching: true };
  case REQUEST_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.payload),
      exchangeRates: { ...action.payload },
      isFetching: false,
    };
  case FAILED_REQUEST:
    return { ...state, error: action.payload, isFetching: false };
  case SEND_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.expenses] };
  default:
    return state;
  }
};
export default walletReducer;
