import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, removeItem, updateItem } from './CartHelpers';

const Card = ({ product, showProdViewBtn = true, showAddToCartBtn = true, cartUpdate = false, showRemoveBtn = false, setRun = f => f, run = undefined }) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const showViewBtn = showProdViewBtn => {
        return (
            showProdViewBtn && (
                <Link to={`/product/${product._id}`} className="mr-2">
                    <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">View Product</button>
                </Link>
            )
        );
    };

    const showRemoveButton = showRemoveBtn => {
        return (
            showRemoveBtn && (
                <button
                    onClick={() => {
                        removeItem(product._id);
                        setRun(!run); // run useEffect in parent Cart
                    }}
                    className="btn btn-outline-danger mt-2 mb-2">
                    Remove Product
                </button>
            )
        );
    };

    const showCartBtn = showAddToCartBtn => {
        return (
            showAddToCartBtn && (
                <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
                    Add to cart
                </button>
            )
        );
    };

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true);
        })
    }

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    }


    const showStock = (quantity) => {
        return quantity > 0 ? <span className="badge badge-primary badge-pill">In Stock</span> :
            <span className="badge badge-primary badge-pill">Out of Stock</span>
    };

    const handleChange = productId => event => {
        setRun(!run);
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
    }

    const showCartUpdateOption = cartUpdate => {
        return cartUpdate && <div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Adjust Quantity</span>
                </div>
                <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
            </div>
        </div>
    };
    return (
        <>
            <div className="card">
                <div className="card-header name">{product.name}</div>
                <div className="card-body">
                    {shouldRedirect(redirect)}
                    <ShowImage item={product} url="product" />
                    <p className="lead mt-2">{product.description.substring(0, 10)}</p>
                    <p className="black-10">${product.price}</p>
                    <p className="black-9">
                        Category: {product.category && product.category.name}
                    </p>
                    <p className="black-8">
                        Added on {moment(product.createdAt).fromNow()}
                    </p>
                    {showStock(product.quantity)}<br />
                    {showViewBtn(showProdViewBtn)}
                    {showCartBtn(showAddToCartBtn)}
                    {showRemoveButton(showRemoveBtn)}
                    {showCartUpdateOption(cartUpdate)}
                </div>
            </div>
        </>
    );
};

export default Card;



