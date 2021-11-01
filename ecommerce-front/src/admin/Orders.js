import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import Layout from '../core/Layout';
import { getStatusValues, listOrders, updateOrderStatus } from './ApiAdmin';
import moment from 'moment';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);
    const { user, token } = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setOrders(data);
                }
            })
    };

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setStatusValues(data);
            }
        });
    };

    useEffect(() => {
        loadOrders();
        loadStatusValues();
    }, []);

    const showOrdersLength = () => {
        if (orders.length) {
            return (
                <h1 className="text-danger display-2">Total orders :{orders.length}</h1>
            )
        }
    };

    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input
                type="text"
                value={value}
                className="form-control"
                readOnly
            />
        </div>
    );

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value).then(
            data => {
                if (data.error) {
                    console.log("Status update failed");
                } else {
                    loadOrders();
                }
            }
        );
    };

    const showStatus = o => (
        <div className="form-group">
            <h3 className="mark mb-4">Status: {o.status}</h3>
            <select
                className="form-control"
                onChange={e => handleStatusChange(e, o._id)}
            >
                <option>Update Status</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );

    return (
        <Layout classname="container-fluid" title="Orders" description={`Hi, Mr ${user.name} , you can manage all the orders here`} >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showOrdersLength()}
                    {orders.map((o, oIdx) => {
                        return <div className="mt-5" key={oIdx} style={{ borderBottom: '5px solid indigo' }}>
                            <h2 className="mb-5">
                                <span className="bg-primary">
                                    Order id: {o._id}
                                </span>
                            </h2>
                            <ul className="list-group mb-4">
                                <li className="list-group-item">
                                    {showStatus(o)}
                                </li>
                                <li className="list-group-item">
                                    Transaction id: {o.transaction_id}
                                </li>
                                <li className="list-group-item">
                                    Ordered Amount : ${o.amount}
                                </li>
                                <li className="list-group-item">
                                    Ordered by: {o.user.name}
                                </li>
                                <li className="list-group-item">
                                    Ordered On: {moment(o.createdAt).fromNow()}
                                </li>
                                <li className="list-group-item">
                                    Delivery Address: {o.address}
                                </li>
                                <h3 className="mt-4 mb-4 font-italic">
                                    Total products in the order:{" "}
                                    {o.products.length}
                                </h3>
                                {o.products.map((p, pIndex) => (
                                    <div className="mb-4" key={pIndex} style={{ padding: "20px", border: "1px solid indigo" }}>
                                        {showInput("Product name", p.name)}
                                        {showInput("Product price", p.price)}
                                        {showInput("Product total", p.count)}
                                        {showInput("Product Id", p._id)}
                                    </div>
                                ))}
                            </ul>
                        </div>
                    })}
                </div>
            </div>
        </Layout>
    );

}

export default Orders;