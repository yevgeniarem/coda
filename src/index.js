import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/js/all';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles/index.scss';
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';
import Judge1 from './components/Judge1.jsx';
import Judge2 from './components/Judge2.jsx';
import Judge3 from './components/Judge3.jsx';
import Judge4 from './components/Judge4.jsx';
import Judge5 from './components/Judge5.jsx';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/">
          <Judge1 />
        </Route>
        <Route path="/Judge1">
          <Judge1 />
        </Route>
        <Route path="/Judge2">
          <Judge2 />
        </Route>
        <Route path="/Judge3">
          <Judge3 />
        </Route>
        <Route path="/Judge4">
          <Judge4 />
        </Route>
        <Route path="/Judge5">
          <Judge5 />
        </Route>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
