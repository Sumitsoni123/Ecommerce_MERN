import React from 'react';
import Menu from './Menu';
import '../style.css';

const Layout = ({ title = "Title", description = "descp", classname, children }) => {
    return (
        <>
            <Menu />
            <div>
                <div className="jumbotron">
                    <h2>{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={classname}>{children}</div>
            </div>
        </>
    );
};

export default Layout;
