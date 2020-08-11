import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart } from "./cartHelpers";
import Card from "./Card";
import Checkout from "./Checkout";
const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const showItems = (items) => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        <div className="row no-guttes">
          {items.map((product, i) => (
            <div key={i} className="col-6 mb-2">
              <Card
                removeButton={true}
                cartButton={false}
                cartUpdate={true}
                product={product}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
    </h2>
  );

  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items. Add remove checkout or continue shopping."
      className="container"
    >
      <div className="my-5">
        <div className="row">
          <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12 mb-2">
            {items.length > 0 ? showItems(items) : noItemsMessage()}
          </div>

          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
            <h3>Checkout</h3>
            <hr />
            <Checkout products={items} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
