import axios from 'axios';

import { FETCH_USER, FETCH_HOUSE, FETCH_FAILED } from './types';

export const submitLogin = (values) => async (dispatch) => {
	const { data } = await axios.post('/user/login', values);
	console.log({data});
	dispatch({ type: FETCH_USER, payload: data });
	return data;
};

export const submitSignup = (values) => async (dispatch) => {
	console.log('values', values);
	const { data } = await axios.post('/user/register', values);
	dispatch({ type: FETCH_USER, payload: data });
	return data;
};

export const submitLogout = () => async (dispatch) => {
	const { data } = await axios.get('/user/logout');
	dispatch({ type: FETCH_USER, payload: null });
	return data;
};

export const fetchHouse = (values) => async (dispatch) => {
	console.log('values', values);
	const { data } = await axios.get('/house');
	dispatch({ type: FETCH_HOUSE, payload: data.house });
	return data;
};

export const fetchUser = (values) => async (dispatch) => {
	console.log('values', values);
	const { data } = await axios.get('/user', { params: { userId: values } });
	return data;
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

export const fetchAllProfiles = (value) => async dispatch => {
  console.log('value',value)
  const { data } = await axios.get('/profiles/all');
  return data
  // dispatch({ type: FETCH_HOUSE, payload: data });
};

export const documentApprove = (value) => async dispatch => {
  console.log('value',value)
  const { data } = await axios.get('/documents/' + value + '/approve');
  return data
  // dispatch({ type: FETCH_HOUSE, payload: data });
};

export const documentReject = (value) => async dispatch => {
  console.log('value',value)
  const { data } = await axios.post('/documents/' + value._id + '/reject', value);
  return data
  // dispatch({ type: FETCH_HOUSE, payload: data });
};

export const sendReminder = (value) => async dispatch => {
  // /profiles/:userId/sendReminder
  console.log('value',value)
  const { data } = await axios.get('/profiles/' + value + '/sendReminder');
  return data
  // dispatch({ type: FETCH_HOUSE, payload: data });
};

export const sendInvites = (value) => async dispatch => {
  console.log('value',value)
  const { data } = await axios.post('/invites/send', value);
  return data
  // dispatch({ type: FETCH_HOUSE, payload: data });
};

export const getAllInvites = (value) => async dispatch => {
  console.log('value',value)
  const { data } = await axios.get('/invites');
  return data
  // dispatch({ type: FETCH_HOUSE, payload: data });
};

export const rejectProfile = (value) => async dispatch => {
  console.log('value',value)
  const { data } = await axios.post('/profiles/' + value.userId + '/reject', {'feedback':value.feedback});
  return data
  // dispatch({ type: FETCH_HOUSE, payload: data });
};

export const approveProfile = (value) => async dispatch => {
  console.log('value',value)
  const { data } = await axios.get('/profiles/' + value.userId + '/approve');
  return data
  // dispatch({ type: FETCH_HOUSE, payload: data });
};

export const updateProfile = (profileData) => async dispatch => {
  console.log({profileData});
  const { user } = await axios.put('/profile/update', profileData);
  dispatch({ type: FETCH_USER, payload: user });
  return user
};







