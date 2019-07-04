import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read,listRelated } from "./apiCore";
import Card from './Card';

const Product=(props)=>{
    const [product,setProduct]=useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    // eslint-disable-next-line
    const [error,setError]=useState({});
    const loadSingleProduct=productId=>{
        read(productId).then(data=>{
            if(data.error){
                setError(data.error);
            }else{
                setProduct(data);
                // fetch related
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });

            }
        });
    }
    useEffect(()=>{
        const productId=props.match.params.productId;
        loadSingleProduct(productId);
    },[props]);
    return (
        <Layout title={product && product.name} className='container-fluid' description={product && product.description && product.description.substring(0,80)}>
          <div className="row">
                <div className="col-8">
                    {product && product.description && (
                        <Card product={product} showButton={false} de={true} />
                    )}
                </div>

                <div className="col-4">
                    <h4>Related products</h4>
                    {relatedProduct.map((p, i) => (
                        <div key={i} className="mb-3">
                            <Card  product={p} />
                        </div>
                    ))}
                </div>
          </div>
        </Layout>
      );
};

export default Product;