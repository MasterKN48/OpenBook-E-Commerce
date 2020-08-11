import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]); // eslint-disable-next-line
  const [error, setError] = useState(false); // eslint-disable-next-line
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [size, setSize] = useState(0);
  const init = () => {
    getCategories().then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredResults = (newFilters) => {
    // console.log(newFilters);
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };
  const loadMore = () => {
    let toSkip = skip + limit;

    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else {
        if (data) {
          setFilteredResults([...filteredResults, ...data.data]);
          setSize(data.size);
          setSkip(0);
        }
      }
    });
  };
  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Load More
        </button>
      )
    );
  };
  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters); // eslint-disable-next-line
  }, []);

  const handleFilters = (filters, filterBy) => {
    // console.log("SHOP", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <Layout
      title="Shop Page"
      description="Search and find books of your choice"
      className="container"
    >
      <div className="my-4">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 mb-2">
            <div className="ui vertical menu">
              <div className="item">
                <div className="header">Filter by categories</div>
                <div className="menu">
                  <Checkbox
                    categories={categories}
                    handleFilters={(filters) =>
                      handleFilters(filters, "category")
                    }
                  />
                </div>
              </div>
              <div className="item">
                <div className="header">Filter by price range</div>
                <div className="menu">
                  <RadioBox
                    prices={prices}
                    handleFilters={(filters) => handleFilters(filters, "price")}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
            <h2 className="mb-2">Products</h2>
            <div className="row">
              {filteredResults.map((product, i) => (
                <div
                  key={i}
                  className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-3"
                >
                  <Card product={product} />
                </div>
              ))}
            </div>
            <hr />
            {loadMoreButton()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
