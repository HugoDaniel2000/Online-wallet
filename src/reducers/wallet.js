// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  FAILED_REQUEST,
  REMOVE_EXPENSE,
  REQUEST_COIN,
  REQUEST_SUCCESS,
  SEND_EXPENSE,
} from '../actions';

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
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  default:
    return state;
  }
};
export default walletReducer;

// if (action.type === REMOVE_EXPENSE) {
//   const { expenses } = state.wallet;
//   return {
//     ...state,
//     wallet: {
//       ...state.wallet,
//       expenses: expenses.filter((expense) => expense.id !== action.payload),
//     },
//   };
// }
