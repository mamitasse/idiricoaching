//reducerRedux/authReducer.js
import { LOGIN_SUCCESS, LOGIN_FAIL } from '../actionRedux/actionsType';

const initialState = {
  token: null,
  user: null,
  error: null,
  coachInfo: null,
  availableSlots: [], // Initialisé comme un tableau vide
};


const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        error: null,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
