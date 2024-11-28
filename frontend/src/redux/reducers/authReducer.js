import { REGISTER_SUCCESS, REGISTER_FAIL } from '../types';

const initialState = {
  user: null,
  error: null,
};

export default function(state = initialState, action) {
  switch(action.type) {
    case REGISTER_SUCCESS:
      return { ...state, user: action.payload, error: null };
    case REGISTER_FAIL:
      return { ...state, user: null, error: action.payload };
    default:
      return state;
  }
};