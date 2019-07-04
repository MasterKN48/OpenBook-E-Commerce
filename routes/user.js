const express = require("express");
const router=express.Router();
const {requireSignin,isAuth,isAdmin}=require('../controllers/auth');
const {userById,read,update,purchaseHistory}=require('../controllers/user');
//const {userSignupValidator}=require("../validator")
router.get('/secret/:userId',requireSignin,isAuth,isAdmin,(req,res)=>{
    res.json({
        user:req.profile
    });
});

router.get("/user/:userId",requireSignin,isAuth,read);
router.get("/orders/by/user/:userId",requireSignin,isAuth,purchaseHistory);
router.put("/user/:userId", requireSignin,isAuth,update);


router.param('userId',userById);

module.exports=router;