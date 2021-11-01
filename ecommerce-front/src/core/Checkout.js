import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';
import { createOrder, getBraintreeClientToken, getProducts, processPayment } from './ApiCore';
import Card from './Card';
import Layout from './Layout';
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
import { emptyCart } from './CartHelpers';

const Checkout = ({ products, setRun = f => f, run = undefined }) => {
    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: '',
        loading: false
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if (data.error) {
                setData({ ...data, error: data.error });
            } else {
                setData({ clientToken: data.clientToken });
            }
        });
    };

    useEffect(() => {
        getToken(userId, token);
    }, []);

    const handleAddress = event => {
        setData({ ...data, address: event.target.value });
    };

    const getTotal = () => {
        return products.reduce((currValue, nextVal) => {
            return currValue + nextVal.count * nextVal.price;
        }, 0);
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <button className="btn btn-primary">Sign in to Checkout</button>
        )
    }

    const deliveryAddress = data.address;

    const buy = () => {
        setData({ loading: true });
        // send the nonce to your server
        // nonce = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance
            .requestPaymentMethod()
            .then(data => {
                // console.log(data);
                nonce = data.nonce;
                // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
                // and also total to be charged
                // console.log(
                //     "send nonce and total to process: ",
                //     nonce,
                //     getTotal(products)
                // );
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                };

                processPayment(userId, token, paymentData)
                    .then(response => {
                        console.log(response);
                        // empty cart
                        // create order

                        const createOrderData = {
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            address: deliveryAddress
                        };

                        createOrder(userId, token, createOrderData)
                            .then(response => {
                                emptyCart(() => {
                                    setRun(!run); // run useEffect in parent Cart
                                    console.log('payment success and empty cart');
                                    setData({
                                        loading: false,
                                        success: true
                                    });
                                });
                            })
                            .catch(error => {
                                console.log(error);
                                setData({ loading: false });
                            });
                    })
                    .catch(error => {
                        console.log(error);
                        setData({ loading: false });
                    });
            })
            .catch(error => {
                // console.log("dropin error: ", error);
                setData({ ...data, error: error.message });
            });
    };

    const showError = error => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = success => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            Thanks!! your payment is successfull
        </div>
    );

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: '' })}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <div className="form-group">
                        <label className="text-muted">Delivery Address:</label>
                        <textarea
                            onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="type address here..."
                            required
                        />
                    </div>
                    <DropIn options={{
                        authorization: data.clientToken,
                        paypal: {
                            flow: "vault"
                        }
                    }} onInstance={instance => (data.instance = instance)} />
                    <button onClick={buy} className="btn btn-success btn-block">Pay</button>
                </div>
            ) : null}
        </div>
    );

    const showLoading = loading => loading && <h2 className="text-danger">Loading...</h2>;

    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    );
};

export default Checkout;