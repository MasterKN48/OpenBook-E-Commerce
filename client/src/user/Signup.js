import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signup } from "../auth";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, success, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  const signUpForm = () => (
    <div className="container w-50 w-sm-100">
      <form className="card" onSubmit={clickSubmit}>
        <div className="card-body">
          <p className="h4 mb-4">Sign Up</p>
          <input
            onChange={handleChange("name")}
            value={name}
            type="text"
            required
            id="defaultLoginFormEmail"
            className="form-control mb-4"
            placeholder="Name"
          />
          <input
            onChange={handleChange("email")}
            value={email}
            type="email"
            required
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
            Sign Up
          </button>
          <p>
            Already a member? <Link to="/signin">Log In</Link>
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

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New account is created. Please <Link to="/signin">Signin</Link>
    </div>
  );

  return (
    <Layout
      title="Signup"
      description="Signup to OpenBook"
      className="container"
    >
      <div className="my-4">
        {showSuccess()}
        {showError()}
        {signUpForm()}
      </div>
    </Layout>
  );
};

export default Signup;
