const { test } = require('@jest/globals');
const { ValidationError } = require('sequelize');
const {
  models: { User, Product, Review },
} = require('../../server/db');

let newReview;
beforeAll(async () => {
  newReview = new Review({
    rating: 4,
    text: 'This product is pretty good',
  });
  await newReview.save();
});
afterAll(async () => {
  await newReview.destroy();
});
describe('Attributes', () => {
  let reviews;
  beforeAll(async () => {
    reviews = await Review.findAll({ where: { id: newReview.id } });
  });
  describe('Attribute: rating', () => {
    test('has a rating attribute', async () => {
      expect(reviews[0].rating).toBe(4);
    });
    test('rating cannot be lower than 1', async () => {
      try {
        await new Review({ rating: 0, text: 'this should fail' }).save();
        expect(false).toBe(true);
      } catch (err) {
        expect(err instanceof ValidationError).toBe(true);
      }
    });
    test('rating cannot be higher than 5', async () => {
      try {
        await new Review({ rating: 6, text: 'this should also fail' }).save();
        expect(false).toBe(true);
      } catch (err) {
        expect(err instanceof ValidationError).toBe(true);
      }
    });
  });
  describe('Attribute: text', () => {
    test('has a text attribute', () => {
      expect(reviews[0].text).toBe('This product is pretty good');
    });
    test('can be null', async () => {
      try {
        await new Review({ rating: 4 }).save();
      } catch (err) {
        console.error(err);
        expect(false).toBe(true);
      }
      expect(true).toBe(true);
    });
    test('can be empty', async () => {
      try {
        await new Review({ rating: 3 }).save();
      } catch (err) {
        console.error(err);
        expect(false).toBe(true);
      }
      expect(true).toBe(true);
    });
  });
  describe('Attribute: date', () => {
    test('has a date attribute', () => {
      expect(reviews[0].date).toBeTruthy();
    });
    test("defaults to today's date in YYYY-MM-DD format", () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      expect(reviews[0].date).toBe(
        `${year}-${month < 10 ? '0' + month : month}-${day}`
      );
    });
  });
});
describe('Review and User associations', () => {
  let newUser;
  beforeAll(async () => {
    newUser = new User({
      email: 'test@email.com',
      password: '1234',
      phoneNumber: '1234567890',
      firstName: 'Jane',
      lastName: 'Doe',
    });
    await newUser.save();
  });
  afterAll(async () => {
    await newUser.destroy();
  });
  test('Reviews can be linked to a User', async () => {
    try {
      await newUser.addReview(newReview);
    } catch (err) {
      console.error(err);
      expect(false).toBe(true);
    }
    const reviews = await newUser.getReviews();
    expect(reviews.length).toBe(1);
    expect(reviews[0].rating).toBe(4);
  });
  test('Multiple reviews can be linked to a User', async () => {
    const reviewsToLink = Array(3)
      .fill(4)
      .map((rating) => new Review({ rating }));
    await Promise.all(reviewsToLink.map((review) => review.save()));
    try {
      await newUser.addReviews(reviewsToLink);
    } catch (err) {
      console.error(err);
      expect(false).toBe(true);
    }
    const { length } = await newUser.getReviews();
    expect(length).toBe(4);
  });
});
describe('Review and Product associations', () => {
  let newProduct;
  beforeAll(async () => {
    newProduct = await new Product({
      name: 'prod1',
      inventory: 1,
      height: 1,
      width: 1,
      depth: 1,
      material: 'felt',
      color: 'red',
      type: 'chair',
      style: 'modern',
      imageUrl: 'test.png',
      price: 1.11,
      description: 'product 1',
    }).save();
  });
  afterAll(async () => {
    await newProduct.destroy();
  });
  test('Reviews can be linked to a Product', async () => {
    try {
      await newProduct.addReview(newReview);
    } catch (err) {
      console.error(err);
      expect(false).toBe(true);
    }
    const reviews = await newProduct.getReviews();
    expect(reviews.length).toBe(1);
    expect(reviews[0].rating).toBe(4);
  });
  test('Multiple reviews can be linked to a Product', async () => {
    const reviewsToLink = Array(3)
      .fill(4)
      .map((rating) => new Review({ rating }));
    await Promise.all(reviewsToLink.map((review) => review.save()));
    try {
      await newProduct.addReviews(reviewsToLink);
    } catch (err) {
      console.error(err);
      expect(false).toBe(true);
    }
    const { length } = await newProduct.getReviews();
    expect(length).toBe(4);
  });
});
