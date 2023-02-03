import { combineReducers } from 'redux';
import authReducer from './authReducer';
import houseReducer from './houseReducer';

export default combineReducers({
  auth: authReducer,
  house: houseReducer
});
