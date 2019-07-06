import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import {createCategory} from './apiAdmin';

const AddCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    // destructure user and token from localstorage
    const { user, token } = isAuthenticated();

    const handleChange = e => {
        setError("");
        setName(e.target.value);
    };

    const clickSubmit = e => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        createCategory(user._id,token,{name})
        .then(data =>{
            if(data.error){
                setError(true);
            } else {
                setError("");
                setSuccess(true)
            }
        })
    };
    const showSuccess=()=>{
        if(success){
            return <h3 className="text-success">{name} is created</h3>
        }
    }
    const showError=()=>{
        if(error){
            return <h3 className="text-danger">Category should be unique</h3>
        }
    }
    const goBack=()=>(
        <div className="mb-5">
            <Link to='/admin/dashboard' className='text-warning'>Back to Dashboard</Link>
        </div>
    )
    const newCategoryFom = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                />
            </div>
            <button className="btn btn-outline-primary">Create Category</button>
        </form>
    );

    return (
        <Layout
            title="Add a new category"
            description={`G'day ${user.name}, ready to add a new category?`}
        >
            <div className="row container">
                <div className="col-lg-8 col-sm-8 col-xs-8 col-md-8 offset-md-2 offset-sm-2 offset-xs-2">
                    {showSuccess() || showError()}
                    {newCategoryFom()}
                    {goBack()}
                    </div>

            </div>
        </Layout>
    );
};

export default AddCategory;
