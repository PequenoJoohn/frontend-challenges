import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import ProductDetail from './pages/Product';

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/product/:id" component={ProductDetail} />
        </Switch>
    );
}