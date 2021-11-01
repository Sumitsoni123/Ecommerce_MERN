import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth/index';

const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const { name, email, password, success, error } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };


    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                } else {
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        success: true
                    })
                }
            });
    };

    const signUpForm = () => {
        return (
            <form>
                <div className="form-group">
                    <label className='text-muted'>Name</label>
                    <input value={name} onChange={handleChange('name')} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label className='text-muted'>Email</label>
                    <input value={email} onChange={handleChange('email')} type="email" className="form-control" />
                </div>
                <div className="form-group">
                    <label className='text-muted'>Password</label>
                    <input value={password} onChange={handleChange('password')} type="password" className="form-control" />
                </div>

                <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
            </form>
        );
    };

    const showError = () => {
        return (
            <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
                {error}
            </div>
        );
    };

    const showSucess = () => {
        return (
            <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
                new Account Created!!.Please <Link to="/signin">Signin</Link>
            </div>
        );
    };

    return (
        <>
            <Layout title="Signup page"
                description="My desc"
                classname="container col-md-8 offset-md-2">
                {showSucess()}
                {showError()}
                {signUpForm()}
                {/* {JSON.stringify(values)} */}
            </Layout>
        </>
    );
};

export default Signup;