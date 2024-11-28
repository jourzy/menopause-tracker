import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL } from '../types';

export const register = (userData) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:5000/register', userData);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: REGISTER_FAIL, payload: err.response.data });
  }
};