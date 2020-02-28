import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/js/all';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import './styles/index.scss';
import configureStore from './redux/configureStore';
import { Provider, useSelector } from 'react-redux';
import Judge1 from './components/Judge1.jsx';
import Judge2 from './components/Judge2.jsx';
import Judge3 from './components/Judge3.jsx';
import Judge4 from './components/Judge4.jsx';
import Judge5 from './components/Judge5.jsx';

const store = configureStore();

function PrivateRoute({ children, ...rest }) {
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location }
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
  document.getElementById('root')
);

serviceWorker.unregister();
