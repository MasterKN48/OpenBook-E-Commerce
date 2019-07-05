import React from 'react';
import Img from 'react-image'
const ShowImage=({item,url})=>{
    const myComponent = () =>
    <Img
        alt={item.name}
        style={{maxHeight:'40%',maxWidth:'50%'}} 
        className="mb-3"
        src={`api/${url}/photo/${item._id}`}
        loader={
            <div className="ui placeholder">
              <div className="image"></div>
            </div>
        }
    />
        
    return (
        <div className="product-img text-center center">
            {myComponent()}
        </div>
    )
};

export default ShowImage;