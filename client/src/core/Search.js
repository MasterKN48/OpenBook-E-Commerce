import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: "",
        search: "",
        results: [],
        searched: false
    });

    const { categories, category, search, results, searched } = data;

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setData({ ...data, categories: data });
            }
        });
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const searchData = () => {
        // console.log(search, category);
        if (search) {
            list({ search: search || undefined, category: category }).then(
                response => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        setData({ ...data, results: response, searched: true });
                    }
                }
            );
        }
    };

    const searchSubmit = e => {
        e.preventDefault();
        searchData();
    };

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value, searched: false });
    };
    const searchMessage=(searched,results)=>{
        if(searched && results.length >0){
            return `Found ${results.length} products`
        }
        if(searched && results.length <1){
            return 'No product found!';
        }
    }
    const searchedProducts = (results = []) => {
        return (
            <div>
                <h4 className="mt-4 mb-4">
                    {searchMessage(searched,results)}
                </h4>
                <div className="row container mb-2">
                    {results.map((product, i) => (
                        <Card key={i} product={product} />
                    ))}
                </div>
            </div>
        );
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <div className="ui fluid action input">
                <input style={{border: '1px solid grey'}} type="search" onChange={handleChange("search")} placeholder="Search..." />
                <select style={{border: '1px solid grey'}} className="ui compact selection dropdown" onChange={handleChange("category")}>
                    <option value="all">All</option>
                    {categories.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                     ))}
                </select>
                <div className="ui button positive" onClick={searchSubmit}>Search</div>
             </div>
        </form>
    );

    return (
        <div className="row container">
            <div className="container mb-3">{searchForm()}</div>
            <div className="container mb-3">
                {searchedProducts(results)}
            </div>
        </div>
    );
};

export default Search;

