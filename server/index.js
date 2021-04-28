const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000

//Body parsing middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Routes for products and users

app.use('/api/products',require('./Products'));
app.use('/api/users',require('./Users'));

app.listen(process.env.PORT, ()=>{
    console.log(`App listening on port ${PORT}`);
})