import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = (productId) => {
    if (window.confirm("Do you want to delete this?")) {
      deleteProduct(productId, user._id, token).then((data) => {
        if (data && data.error) {
          console.log(data.error);
        } else {
          loadProducts();
        }
      });
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);
  const goBack = () => (
    <div className="my-3">
      <Link to="/admin/dashboard" className="text-warning">
        Back to Dashboard
      </Link>
    </div>
  );
  return (
    <Layout
      title="Manage Products"
      description="Perform CRUD on products"
      className="container"
    >
      <div className="my-5">
        <div className="container">
          <h2 className="text-center">Total {products.length} products</h2>
          <hr />
          {goBack()}
          <ul className="list-group">
            {products.map((p, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <strong>{p.name}</strong>
                <Link to={`/admin/product/update/${p._id}`}>
                  <span className="btn btn-outline-success btn-md">Update</span>
                </Link>
                <button
                  onClick={() => destroy(p._id)}
                  className="btn btn-outline-danger btn-md"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProduct;
