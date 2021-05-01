// Seed file to add initial products and users to the database
const {
  db,
  models: { Product, User, Room },
} = require('./index');
const faker = require('faker');

const { users } = require('./dataForSeeding/users');
const { products } = require('./dataForSeeding/products');

const syncAndSeed = async () => {
  try {
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

    for (const name in products) {
      const room = await Room.create({
        name,
      });
      const productInstances = await Promise.all(
        products[name].map((product) =>
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
      await Promise.all(
        productInstances.map((product) => product.setRoom(room))
      );
    }

    console.log('products and users seeded into db');
    await db.close();
  } catch (er) {
    console.error(er);
  }
};

syncAndSeed();

module.exports = { syncAndSeed };
