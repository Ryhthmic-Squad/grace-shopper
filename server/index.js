const app = './app.js';
const PORT = process.env.PORT || 3000;
<<<<<<< HEAD
const morgan = require('morgan');

//Body parsing middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

// Routes for products and users

app.use('/api/products', require('./Products'));
app.use('/api/users', require('./Users'));
=======
>>>>>>> 183f698287e580ed8047dad5f8f37dcc38fe59f5

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
