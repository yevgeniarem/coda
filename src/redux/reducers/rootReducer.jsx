import { combineReducers } from 'redux';
import login from './login';
import events from './events';

const rootReducer = combineReducers({
  login,
  events
});

export default rootReducer;
