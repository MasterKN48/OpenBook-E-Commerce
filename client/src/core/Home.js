import React, { useState, useEffect, Fragment } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from './Card';
import Search from './Search';

const Home = () => {
  const [productBySell,setProductBySell]=useState([]);
  const [productByArrival,setProductByArrival]=useState([]);
  // eslint-disable-next-line
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
        <div className="ui segment">
            <div className="ui active inverted dimmer">
                <div className="ui large text loader">Loading</div>
            </div>
        </div>
    );
  return (
    <Layout title="OpenBook" logo='true' className='container-fluid' description="Online World to buy Books">
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