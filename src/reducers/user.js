/* eslint-disable keyword-spacing */
import { SEND_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
  case SEND_LOGIN:
    return{ email: action.email };
  default:
    return state;
  }
};
export default userReducer;
