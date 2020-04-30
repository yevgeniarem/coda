import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/js/all';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Provider, useSelector } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import './styles/index.scss';
import configureStore from './redux/configureStore';
import Judge1 from './components/Judge1';
import Judge2 from './components/Judge2';
import Judge3 from './components/Judge3';
import Judge4 from './components/Judge4';
import Judge5 from './components/Judge5';

const store = configureStore();

function PrivateRoute({ children, ...rest }) {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/">
          <Judge1 />
        </Route>
        <Route path="/Judge1">
          <Judge1 />
        </Route>
        <PrivateRoute path="/Judge2">
          <Judge2 />
        </PrivateRoute>
        <PrivateRoute path="/Judge3">
          <Judge3 />
        </PrivateRoute>
        <PrivateRoute path="/Judge4">
          <Judge4 />
        </PrivateRoute>
        <PrivateRoute path="/Judge5">
          <Judge5 />
        </PrivateRoute>
        <Route>
          <Judge1 />
        </Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

PrivateRoute.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

serviceWorker.unregister();
