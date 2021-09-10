exports.userSignupValidator=(req,res,next)=>{
    req.check('name','Name is required').notEmpty()
    req.check('email','Email must be 3 to 32 chars')
        .matches(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
        .withMessage('Email must contain @')
        .isLength({
            min:4,max:35
        });
    req.check('password','Password is Required').notEmpty()
    req.check('password')
        .isLength({min:6})
        .withMessage('Password must be at least 6 chars')
        .matches(/\d/)
        .withMessage("Password must contain a number");
        const errors=req.validationErrors()
        if(errors){
            const firstError=errors.map(error=> error.msg)[0]
            return res.status(400).json({error:firstError});
        }
        next();
}
