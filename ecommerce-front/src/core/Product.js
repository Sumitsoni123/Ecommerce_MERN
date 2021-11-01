import React, { useState, useEffect } from 'react';
import { listRelated, read } from './ApiCore';
import Card from './Card';
import Layout from './Layout';
import Search from './Search';

const Product = (props) => {
    const [product, setProduct] = useState();
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // load related prod
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                })
            }
        })
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props])
    return (
        <Layout title={product && product.name} description={product && product.description && product.description.substring(0, 100)} classname="container-fluid">

            <div className="row">
                <div className="col-8">
                    {product && product.description && (<Card product={product} showProdViewBtn={false} />)}
                </div>
                <div className="col-4">
                    <h4>Related Products</h4>
                    {relatedProduct.map((p, i) => (
                        <div key={i} className="mb-3">
                            <Card product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Product;