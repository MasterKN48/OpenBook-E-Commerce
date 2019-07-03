import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Signup from './Signup';
import Signin from './Signin';
import Home from '../core/Home';
import PrivateRoute from '../auth/PrivateRoute';
import Dashboard from './UserDashboard';

const Routes=()=>{
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
