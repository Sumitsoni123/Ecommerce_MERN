import React, { useState, useEffect } from 'react';
import { getProducts } from './ApiCore';
import Card from './Card';
import { getCart } from './CartHelpers';
import Layout from './Layout';
import { Link } from 'react-router-dom'
import Checkout from './Checkout';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <div>
                <h2>Your Cart has {`${items.length}`} items </h2>
                <hr />
                {items.map((product, i) => (<Card key={i} product={product} showAddToCartBtn={false} cartUpdate={true} showRemoveBtn={true} setRun={setRun} run={run} />))}
            </div>
        );
    };

    const emptyCartMessage = () => (
        <h2>
            Your cart is empty, <br /><Link to="/shop">Continue Shopping</Link>
        </h2>
    );

    return (
        <Layout title="Shopping Cart" description="Manage your cart items.Add remove checkout or continue" classname="container-fluid">
            <div className="row">
                <div className="col-6">
                    {items.length > 0 ? showItems(items) : emptyCartMessage()}
                </div>
                <div className="col-6">
                    <h2 className="mb-4">Your Cart Summary</h2>
                    <hr />
                    <Checkout products={items} />
                </div>
            </div>
        </Layout>
    );

};

export default Cart;