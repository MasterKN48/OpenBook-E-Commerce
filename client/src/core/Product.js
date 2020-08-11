import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  // eslint-disable-next-line
  const [error, setError] = useState({});
  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related
        listRelated(data._id).then((data) => {
          if (data && data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };
  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout
      title={product && product.name}
      className="container"
      description={
        product && product.description && product.description.substring(0, 80)
      }
    >
      <div className="my-5">
        <div align="center" className="container w-50 w-sm-100">
          <div align="left">
            {product && product.description && (
              <Card product={product} showButton={false} de={true} />
            )}
          </div>
          <hr />
          <h3>Related products</h3>
          <br />
        </div>
        <div className="row">
          {relatedProduct && relatedProduct.length === 0 && (
            <div>No Similar Product Found</div>
          )}
          <div className="col-md-4">
            {relatedProduct &&
              relatedProduct.map((p, i) => (
                <div key={i} className="mb-3">
                  <Card product={p} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
