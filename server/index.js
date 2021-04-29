const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000

//Body parsing middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// Routes for products and users

app.use('/api/products',require('./Products'));
app.use('/api/auth',require('./Users'));

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
})
module.exports= app;