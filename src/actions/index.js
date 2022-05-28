// Coloque aqui suas actions
export const SEND_LOGIN = 'SEND_LOGIN';
export const sendLogin = (email) => ({ type: SEND_LOGIN, email });

export const REQUEST_COIN = 'REQUEST_COIN';
export const requestCoin = () => ({ type: REQUEST_COIN });

export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const requestSuccess = (obj) => ({
  type: REQUEST_SUCCESS,
  payload: obj,
});

export const FAILED_REQUEST = 'FAILED_REQUEST';
export const failedRequest = (error) => ({ type: FAILED_REQUEST, payload: error });

export const SEND_EXPENSE = 'SEND_EXPENSE';
export const sendExpense = (expenses) => ({ type: SEND_EXPENSE, expenses });

export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export function removeExpense(expenseId) {
  return { type: REMOVE_EXPENSE, payload: expenseId };
}

export const ENTER_EDIT_MODE = 'ENTER_EDIT_MODE';
export const editMode = (id) => ({
  type: ENTER_EDIT_MODE,
  id,
});

export const FINISH_EDIT = 'FINISH_EDIT';
export const finishEdit = (id, editedExpense) => (
  {
    type: FINISH_EDIT,
    payload: { id, editedExpense },
  }
);

export const dispatchCoinThunk = () => (dispatch) => {
  dispatch(requestCoin());
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((value) => value.json())
    .then(
      (json) => dispatch(requestSuccess(json)),
      (error) => dispatch(failedRequest(error)),
    );
};
