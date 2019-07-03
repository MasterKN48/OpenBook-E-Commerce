import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Signup from './Signup';
import Signin from './Signin';
import Home from '../core/Home';
import PrivateRoute from '../auth/PrivateRoute';
import Dashboard from './UserDashboard';
import AdminRoute from '../auth/AdminRoute';
import AdminDashboard from './AdminDashboard';
import AddCategory from '../admin/AddCategory';
import AddProduct from '../admin/AddProduct';

const Routes=()=>{
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoute path="/create/category" exact component={AddCategory} />
                <AdminRoute path="/create/product" exact component={AddProduct} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
