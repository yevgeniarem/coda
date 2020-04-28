import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers/rootReducer';

export default function configureStore(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // support for Redux dev tools
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(
        reduxImmutableStateInvariant(),
        thunk,
        createLogger({ collapsed: true }),
      ),
    ),
  );
}
