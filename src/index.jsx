import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import configureStore from './redux/configureStore';
import '@fortawesome/fontawesome-free/js/all';

import './styles/index.scss';
import Login from './componentsContainer/Login';
import PrivateRoute from './componentsReusable/PrivateRoute';
import routes from './routes';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        {routes.map(({ privateRoute, ...r }) =>
          privateRoute ? (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <PrivateRoute key={r.path} {...r} />
          ) : (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Route key={r.path} {...r} />
          ),
        )}
        <Route>
          <Login />
        </Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
