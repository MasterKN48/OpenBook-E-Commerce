import React, { useState, useEffect, Fragment } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from './Card';
import Search from './Search';
const Home = () => {
  const [productBySell,setProductBySell]=useState([]);
  const [productByArrival,setProductByArrival]=useState([]);
  const [error,setError]=useState(false);
  const [load,setLoad]=useState(false);
  const loadProductBySell=()=>{
      setLoad(true);
      getProducts('sold').then(data =>{
          if(data.error){
              setError(data.error)
          }else{
              setProductBySell(data);
          }
      })
  };
  const loadProductByArrival=()=>{
    getProducts('createdAt').then(data =>{
        if(data.error){
            setError(data.error)
        }else{
            setProductByArrival(data);
            setLoad(false);
        }
    })
};
    useEffect(() => {
        loadProductByArrival();
        loadProductBySell();
    },[])
    const show=()=>(
       <Fragment>
       <h2 className="mb-4">Best Sellers</h2>
        <div className="row">
        {productBySell.map((product,i)=>(
            <div key={i} className="col-4 mb-3">
                <Card product={product}/>
            </div>
        ))}
        </div>
        <h2 className="mb-4">New Arrivals</h2>
        <div className="row">
        {productByArrival.map((product,i)=>(
            <div key={i} className="col-4 mb-3">
                <Card product={product}/>
            </div>
        ))}
        </div>
       </Fragment>
    );
    const loading=()=>(
        <div className="spinner-border text-danger center text-center align-center" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    );
  return (
    <Layout title="Home Page" className='container-fluid' description="Node React E-commerce App">
      <Search />
      {
          load === true ? (
               loading()
          ) : show()
      }
    </Layout>
  );
};

export default Home;