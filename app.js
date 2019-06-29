const express = require("express");
const app=express()
require('dotenv').config;

app.get('/',(req,res)=>{
    res.send('Hello')
});


const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port} 🔥`);