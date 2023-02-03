import axios from 'axios';

import {
  FETCH_EMPLOYEE,
  FETCH_FAILED,
  FETCH_HOUSE
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
  return data
};

export const submitSignup = values => async dispatch => {
  console.log('values',values)
  const { data } = await axios.post('/user/register', values);
  dispatch({ type: FETCH_EMPLOYEE, payload: data });
  return data
};

export const submitLogout = values => async dispatch => {
  const { data } = await axios.post('/user/logout', values);
  return data
  // dispatch({ type: FETCH_USER, payload: data });
};

export const fetchHouse = values => async dispatch => {
  console.log('values',values)
  const { data } = await axios.get('/house' );
  dispatch({ type: FETCH_HOUSE, payload: data.house });
  return data
};

export const fetchUser = values => async dispatch => {
  console.log('values',values)
  const { data } = await axios.get('/user',{params:{userId:values}} );
  return data
  // dispatch({ type: FETCH_HOUSE, payload: data });
};

export const createReport = values => async dispatch => {
  console.log('values',values)
  const { data } = await axios.post('/report/create',values );
  return data
  // dispatch({ type: FETCH_HOUSE, payload: data });
};

export const fetchCommentsBaseReport = values => async dispatch => {
  console.log('values',values)
  const { data } = await axios.get('/reports/' + values + '/comments' );
  // dispatch({ type: FETCH_HOUSE, payload: data });
  return data
};

export const createComment = (reportId, commentData) => async dispatch => {
  console.log('reportId',reportId)
  console.log('commentData',commentData)
  const { data } = await axios.post('/report/' + reportId + '/comment', commentData);
  return data
  // dispatch({ type: FETCH_HOUSE, payload: data });
};

export const updateComment = (commentData) => async dispatch => {
  console.log('commentData',commentData)
  const { data } = await axios.put('/comment/' + commentData._id, commentData);
  return data
  // dispatch({ type: FETCH_HOUSE, payload: data });
};










