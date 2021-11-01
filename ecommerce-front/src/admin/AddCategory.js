import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import Layout from '../core/Layout';
import { createCategory } from './ApiAdmin';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { token, user } = isAuthenticated();

    const handleChange = (e) => {
        setError('');
        setName(e.target.value);
    };

    const clickSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        createCategory(user._id, token, { name })
            .then(data => {
                if (data.error) {
                    setError(true)
                } else {
                    setError('');
                    setSuccess(true);
                }
            });
    };

    const showError = () => {
        if (error) {
            return (
                <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
                    Category name should be unique
                </div>
            );
        }
    };

    const showSucess = () => {
        if (success) {
            return (
                <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
                    new Category : {name} is Created!!
                </div>
            );
        }
    };

    const backBtn = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">goto dashboard</Link>
        </div>
    );

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Enter new Category Name</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus required />
            </div>
            <button className="btn btn-outline-primary">Create</button>
        </form>
    );

    return (
        <Layout classname="container-fluid" title="Add a new Category" description={`Hi, Mr ${user.name} , add new Category`} >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showError()}
                    {showSucess()}
                    {newCategoryForm()}
                    {backBtn()}
                </div>
            </div>
        </Layout>
    );
};

export default AddCategory;