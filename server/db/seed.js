//Seed file to add initial products to the database
const {
  db,
  models: { User },
} = require('./index');

//const products = [array of objects]; may want to import this from separate file
const { users } = require('./dataForSeeding/users');

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
    console.log('products seeded into db');
  } catch (er) {
    console.error(er);
  }
};

syncAndSeed();

module.exports = { syncAndSeed };
