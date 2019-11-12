import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Judge1 from './components/Judge1';
import Judge2 from './components/Judge2';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/'>
                <Judge1 />
            </Route>
            <Route path='/Judge2'>
                <Judge2 />
            </Route>
        </div>
    </Router>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
