const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const morgan=require('morgan');
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser=require('cookie-parser')
const expressValidator=require('express-validator')
// Routes
const auth=require('./routes/auth');
const user=require('./routes/user');
const category=require('./routes/category');
const product=require('./routes/product');
const braintree=require('./routes/braintree');
const order=require('./routes/order');
// app
const app = express();

// db
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log("DB Connected"));
// middlewares
app.use(morgan('dev')); 
app.use(bodyParser.json()) ;
app.use(cookieParser()); 
app.use(expressValidator());
app.use(cors());
// routes
app.use("/api",auth);
app.use("/api",user);
app.use("/api",category);
app.use("/api",product);
app.use('/api',braintree);
app.use('/api',order);


const port = process.env.PORT || 8000;
app.listen(port, () => `Server running on port ${port} 🔥`);