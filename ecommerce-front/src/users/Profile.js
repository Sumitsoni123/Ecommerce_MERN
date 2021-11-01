import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { read, update, updateUser } from './ApiUser';
import Layout from '../core/Layout';
import React, { useEffect, useState } from 'react'

const Profile = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        success: false
    });

    const { token } = isAuthenticated();
    const { name, email, password, error, success } = values;

    const init = userId => {
        // console.log(userId);
        read(userId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, name: data.name, email: data.email });
            }
        });
    };

    useEffect(() => {
        init(match.params.userId);
    }, []);

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(match.params.userId, token, { name, email, password }).then(data => {
            if (data.error) {
                // console.log(data.error);
                alert(data.error);
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        name: data.name,
                        email: data.email,
                        success: true
                    });
                });
            }
        });
    };

    const redirectUser = success => {
        if (success) {
            return <Redirect to="/cart" />;
        }
    };
    const profileUpdate = (name, email, password) => (
        <form action="">
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" onChange={handleChange('name')} value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" className="form-control" onChange={handleChange('email')} value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" className="form-control" onChange={handleChange('password')} value={password} />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    );

    return (
        <Layout title="Profile" description="Update your Profile" classname="container-fluid">
            <h2 className="mb-4">Profile Update</h2>
            {profileUpdate(name, email, password)}
            {redirectUser(success)}
        </Layout>
    );

};

export default Profile;