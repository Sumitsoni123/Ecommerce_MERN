import { React, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { signin, authenticate, isAuthenticated } from '../auth/index';

const Signin = () => {

    const [values, setValues] = useState({
        email: 'm@m.com',
        password: '123',
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };


    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            redirectToReferrer: true
                        });
                    });
                }
            });
    };

    const signinForm = () => {
        return (
            <form>
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

    const showLoading = () => {
        loading && (
            <div className="alert alert-info">
                <h2>loading...</h2>
            </div>
        )
    };

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }

        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    };

    return (
        <>
            <Layout title="Signin page"
                description="My desc"
                classname="container col-md-8 offset-md-2">
                {showLoading()}
                {showError()}
                {signinForm()}
                {redirectUser()}
                {/* {JSON.stringify(values)} */}
            </Layout>
        </>
    );
};

export default Signin;