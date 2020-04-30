import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/js/all';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import './styles/index.scss';
import configureStore from './redux/configureStore';
import PrivateRoute from './components/PrivateRoute';
import routes from './routes';
import Judge1 from './components/Judge1';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        {routes.map((r) =>
          r.private ? (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <PrivateRoute {...r} />
          ) : (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Route {...r} />
          ),
        )}
        <Route>
          <Judge1 />
        </Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
