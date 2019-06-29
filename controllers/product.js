const Product = require("../model/Product");
const { errorHandler } = require("../helpers/dbErrorHandler");
const formidable=require('formidable');
const _ =require("lodash");
const fs=require('fs');

exports.productById=(req,res,next,id)=>{
    Product.findById(id).exec((err,product)=>{
        if(err || !product){
            return res.status(400).json({
                error:"Product Not found"
            });
        }
        req.product=product;
        next();
    })
}
exports.read=(req,res)=>{
    req.product.photo=undefined
    return res.json(req.product);
}
exports.create = (req, res) => {
  let form=new formidable.IncomingForm()
  form.keepExtensions=true
  form.parse(req,(err,fields,files)=>{
      if(err){
          return res.status(400).json({
              error:'Image Could not be uploaded'
          })
      }
      // check for fileds
      const {name,description,price,category,quantity,shipping}=fields;
      if(!name || !description || !price || !category || !quantity || !shipping){
          return res.status(400).json({
              error: "All fileds are required"
          });
      }
      let product=new Product(fields)
      if(files.photo){
          //console.log('FILES PHOTO',files.photo) 1kb=100 1mb=100000
          if(files.photo.size >200000){
            return resizeBy.status(400).json({
                error:"Image Size should less then 2mb"
            });
          }

          product.photo.data=fs.readFileSync(files.photo.path)
          product.photo.contentType=files.photo.type
      }
      product.save((err,result)=>{
          if(err){
              return res.status(400).json({
                  error:errorHandler(err)
              })
          }
          res.json(result);
      })
  })
};
