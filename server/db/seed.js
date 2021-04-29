// Seed file to add initial products to the database
const {
  db,
  models: { Product, User },
} = require('./index');
const faker = require('faker');

const { users } = require('./dataForSeeding/users');
const { products } = require('./dataForSeeding/products');

const syncAndSeed = async () => {
  try {
    await db.authenticate;
    await db.sync({ force: true });
    await Promise.all(
      users.map((user) =>
        User.create({
          email: user.email,
          password: user.password,
          phoneNumber: user.phoneNumber,
          firstName: user.firstName,
          lastName: user.lastName,
          isAdmin: user.isAdmin,
        })
      )
    );
    await Promise.all(
      products.map((product) =>
        Product.create({
          name: product.name,
          inventory: product.inventory,
          height: product.height,
          width: product.width,
          depth: product.depth,
          material: product.material,
          color: product.color,
          imageUrl: product.imagerUrl,
          price: product.price,
          description: faker.lorem.paragraphs(3),
          type: product.type,
          style: product.style,
        })
      )
    );

    console.log('products and users seeded into db');
  } catch (er) {
    console.error(er);
  }
};

syncAndSeed();

module.exports = { syncAndSeed };
