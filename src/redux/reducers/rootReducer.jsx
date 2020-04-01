import { combineReducers } from 'redux';
import login from './login';
import events from './events';
import inputs from './inputs';
import modals from './modals';

const rootReducer = combineReducers({
  login,
  events,
  inputs,
  modals
});

export default rootReducer;
