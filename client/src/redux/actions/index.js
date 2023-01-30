import axios from 'axios';

import {
  FETCH_EMPLOYEE,
  FETCH_FAILED,
} from './types';

export const fetchEmployee = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/current_employee');
    dispatch({
      type: FETCH_EMPLOYEE,
      payload: data,
    });
  } catch (err) {
    console.log('Something went wrong', err);
  }
};

export const submitLogin = values => async dispatch => {
  const { data } = await axios.post('/user/login', values);
  dispatch({ type: FETCH_EMPLOYEE, payload: data });
};

export const submitLogout = values => async dispatch => {
  const { data } = await axios.post('/user/logout', values);
  // dispatch({ type: FETCH_USER, payload: data });
};