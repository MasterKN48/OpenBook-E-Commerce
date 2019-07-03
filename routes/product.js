const express = require("express");
const router=express.Router();

const {requireSignin,isAuth,isAdmin}=require('../controllers/auth');
const {userById}=require('../controllers/user');
const {create,productById,photo,listBySearch,listSearch,listCategories,read,remove,update,list,related}=require('../controllers/product');

router.get('/product/:productId',read);
router.post('/product/create/:userId',requireSignin,isAuth,isAdmin,create);
router.delete('/product/:productId/:userId',requireSignin,isAuth,isAdmin,remove)
router.put('/product/:productId/:userId',requireSignin,isAuth,isAdmin,update)

router.get('/products',list);
router.get('/products/related/:productId',related);
router.get('/products/categories',listCategories);
/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */
router.get("/products/search", listSearch);
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId", photo);

router.param("userId",userById);
router.param("productId",productById);
module.exports=router;