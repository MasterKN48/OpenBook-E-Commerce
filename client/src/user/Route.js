import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NotFound from "../assets/404.webp";
import PrivateRoute from "../auth/PrivateRoute";

const Signup = lazy(() => import("./Signup"));
const Signin = lazy(() => import("./Signin"));
const Home = lazy(() => import("../core/Home"));
const Shop = lazy(() => import("../core/Shop"));
const Cart = lazy(() => import("../core/Cart"));
const Product = lazy(() => import("../core/Product"));
const Dashboard = lazy(() => import("./UserDashboard"));
const Profile = lazy(() => import("./Profile"));
const AdminRoute = lazy(() => import("../auth/AdminRoute"));
const AdminDashboard = lazy(() => import("./AdminDashboard"));
const AddCategory = lazy(() => import("../admin/AddCategory"));
const Orders = lazy(() => import("../admin/Order"));
const AddProduct = lazy(() => import("../admin/AddProduct"));
const ManageProduct = lazy(() => import("../admin/ManageProduct"));
const UpdateProduct = lazy(() => import("../admin/UpdateProduct"));

const NoMatchPage = () => {
  return (
    <div id="error">
      <img src={NotFound} alt="404" style={{ height: "90vh" }} />
    </div>
  );
};

const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div align="center" className="mt-4">
            <div className="spinner-border text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }
      >
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/shop" component={Shop} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/cart" component={Cart} />
          <Route path="/product/:productId" component={Product} />
          <PrivateRoute path="/user/dashboard" component={Dashboard} />
          <PrivateRoute path="/profile/:userId" component={Profile} />
          <AdminRoute path="/admin/dashboard" component={AdminDashboard} />
          <AdminRoute path="/create/category" component={AddCategory} />
          <AdminRoute path="/create/product" component={AddProduct} />
          <AdminRoute path="/admin/orders" component={Orders} />
          <AdminRoute path="/admin/products" component={ManageProduct} />
          <AdminRoute
            path="/admin/product/update/:productId"
            component={UpdateProduct}
          />
          <Route component={NoMatchPage} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
