import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const signInForm = () => (
    <div className="container w-50 w-sm-100">
      <form className="card" onSubmit={clickSubmit}>
        <div className="card-body">
          <p className="h4 mb-4">Log In</p>
          <input
            onChange={handleChange("email")}
            value={email}
            required
            type="email"
            id="defaultLoginFormEmail"
            className="form-control mb-4"
            placeholder="E-mail"
          />
          <input
            onChange={handleChange("password")}
            value={password}
            type="password"
            required
            id="defaultLoginFormPassword"
            className="form-control mb-4"
            placeholder="Password"
          />
          <div className="d-flex justify-content-around">
            <div></div>
          </div>
          <button
            onClick={clickSubmit}
            className="btn btn-outline-info btn-block my-4"
            type="submit"
          >
            Log In
          </button>
          <p>
            Not a member? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Layout
      title="SignIn"
      description="SignIn to OpenBook"
      className="container"
    >
      <div className="my-4">
        {showLoading()}
        {showError()}
        {signInForm()}
        {redirectUser()}
      </div>
    </Layout>
  );
};

export default Signin;
