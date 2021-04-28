//Seed file to add initial products to the database
const {
  db,
  // models: { Product, User },
} = require('./index');

//const products = [array of objects]; may want to import this from separate file

db.sync({ force: true })
  // .then(() => {
  //   return Promise.all(
  //     products
  //       .map((product) => new Product(product))
  //       .map((product) => product.save())
  //   );
  // })
  // .then(() => {
  //   console.log('products seeded into db');
  // })
  .then(() => {
    db.close();
    console.log('db seed complete');
  })
  .catch((err) => {
    db.close();
    console.error(err);
  });
