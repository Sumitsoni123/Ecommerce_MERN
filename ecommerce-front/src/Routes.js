import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './users/Signup';
import Signin from './users/Signin';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './users/Userdashboard';
import Profile from './users/Profile';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './users/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Shop from './core/Shop';
import Product from './core/Product';
import Cart from './core/Cart';
import Orders from './admin/Orders';
import ManageProducts from './admin/ManageProducts';
import { updateCategory } from './admin/ApiAdmin';
import UpdateProduct from './admin/UpdateProduct';

const Routes = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/shop' exact component={Shop} />
                    <Route path='/signin' exact component={Signin} />
                    <Route path='/signup' exact component={Signup} />
                    <PrivateRoute path='/user/dashboard' exact component={Dashboard} />
                    <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
                    <AdminRoute path='/create/category' exact component={AddCategory} />
                    <AdminRoute path='/create/product' exact component={AddProduct} />
                    <Route path='/product/:productId' exact component={Product} />
                    <Route path='/cart' exact component={Cart} />
                    <AdminRoute path='/admin/orders' exact component={Orders} />
                    <PrivateRoute path='/profile/:userId' exact component={Profile} />
                    <PrivateRoute path="/admin/products" exact component={ManageProducts} />
                    <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
                    <AdminRoute path="/admin/category/update/:categoryId" exact component={updateCategory} />
                </Switch>
            </BrowserRouter>
        </>
    );
};

export default Routes;