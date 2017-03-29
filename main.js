import React from 'react';

import ReactDOM from 'react-dom';

import App from './App.jsx';

import Home from './Home.jsx';

import Top from './Top.jsx';

import Details from './Details.jsx';

import Search from './Search.jsx';

import { Router, Route, Link, hashHistory, IndexRoute, IndexRedirect } from 'react-router';

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/in_theaters(/:id)" component={Home}>
        </Route>
        <Route path="/coming_soon(/:id)" component={App}>
        </Route>
        <Route path="/top250(/:id)" component={Top}>
        </Route>
        <Route path='/subject(/:id)' component={Details}>
        </Route>
        <Route path="/search(/:id)" component={Search}>
        </Route>
        <Route path="/" component={Home}>
            // <IndexRedirect to="/in_theaters(/:id)" />
        </Route>
    </Router>
), document.getElementById("app"));