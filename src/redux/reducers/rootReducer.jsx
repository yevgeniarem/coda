import { combineReducers } from 'redux';
import login from './login';
import events from './events';
import inputs from './inputs';
import modals from './modals';
import routines from './routines';

const rootReducer = combineReducers({
  login,
  events,
  inputs,
  modals,
  routines
});

export default rootReducer;
