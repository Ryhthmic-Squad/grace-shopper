const { expect } = require('chai');
const { ValidationError } = require('sequelize');
const {
  models: { User, Product, Review },
} = require('../../server/db');

describe('Review Model', () => {
  let newReview;
  before(async () => {
    newReview = new Review({
      rating: 4,
      text: 'This product is pretty good',
    });
    await newReview.save();
  });
  after(async () => {
    await newReview.destroy();
  });
  describe('Attribute: rating', () => {
    let reviews;
    before(async () => {
      reviews = await Review.findAll({ where: { id: newReview.id } });
    });
    it('has a rating attribute', async () => {
      expect(reviews[0].rating).to.equal(4);
    });
    it('rating cannot be lower than 1', async () => {
      try {
        await new Review({ rating: 0, text: 'this should fail' }).save();
        expect(false).to.be.true;
      } catch (err) {
        expect(err instanceof ValidationError).to.be.true;
      }
    });
    it('rating cannot be higher than 5', async () => {
      try {
        await new Review({ rating: 6, text: 'this should also fail' }).save();
        expect(false).to.be.true;
      } catch (err) {
        expect(err instanceof ValidationError).to.be.true;
      }
    });
  });
  describe('Attribute: text', () => {
    let reviews;
    before(async () => {
      reviews = await Review.findAll({ where: { id: newReview.id } });
    });
    it('has a text attribute', () => {
      expect(reviews[0].text).to.equal('This product is pretty good');
    });
    it('can be null', async () => {
      try {
        await new Review({ rating: 4 }).save();
      } catch (err) {
        console.error(err);
        expect(false).to.be.true;
      }
      expect(true).to.be.true;
    });
    it('can be empty', async () => {
      try {
        await new Review({ rating: 3 }).save();
      } catch (err) {
        console.error(err);
        expect(false).to.be.true;
      }
      expect(true).to.be.true;
    });
  });
  describe('Attribute: date', () => {
    let reviews;
    before(async () => {
      reviews = await Review.findAll({ where: { id: newReview.id } });
    });
    it('has a date attribute', () => {
      expect(reviews[0].date).to.be.ok;
    });
    it("defaults to today's date in YYYY-MM-DD format", () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      expect(reviews[0].date).to.equal(
        `${year}-${month < 10 ? '0' + month : month}-${day}`
      );
    });
  });
  describe('Review and User associations', () => {
    let newUser;
    before(async () => {
      newUser = new User({
        email: 'test@email.com',
        password: '1234',
        phoneNumber: '1234567890',
        firstName: 'Jane',
        lastName: 'Doe',
      });
      await newUser.save();
    });
    after(async () => {
      await newUser.destroy();
    });
    it('Reviews can be linked to a User', async () => {
      try {
        await newUser.addReview(newReview);
      } catch (err) {
        console.error(err);
        expect(false).to.be.true;
      }
      const reviews = await newUser.getReviews();
      expect(reviews).to.have.length(1);
      expect(reviews[0].rating).to.equal(4);
    });
    it('Multiple reviews can be linked to a User', async () => {
      const reviewsToLink = Array(3)
        .fill(4)
        .map((rating) => new Review({ rating }));
      await Promise.all(reviewsToLink.map((review) => review.save()));
      try {
        await newUser.addReviews(reviewsToLink);
      } catch (err) {
        console.error(err);
        expect(false).to.be.true;
      }
      const reviews = await newUser.getReviews();
      expect(reviews).to.have.length(4);
    });
  });
  describe('Review and Product associations', () => {
    let newProduct;
    before(async () => {
      newProduct = await new Product({
        name: 'prod1',
        inventory: 1,
        width: 1,
        depth: 1,
        height: 1,
        material: 'felt',
        color: 'red',
        imageUrl: 'test.png',
        price: 1.11,
        description: 'product 1',
        type: 'bed',
        style: 'contemporary',
      }).save();
    });
    after(async () => {
      await newProduct.destroy();
    });
    it('Reviews can be linked to a Product', async () => {
      try {
        await newProduct.addReview(newReview);
      } catch (err) {
        console.error(err);
        expect(false).to.be.true;
      }
      const reviews = await newProduct.getReviews();
      expect(reviews).to.have.length(1);
      // expect(reviews[0].rating).to.equal(4);
    });
    it('Multiple reviews can be linked to a Product', async () => {
      const reviewsToLink = Array(3)
        .fill(4)
        .map((rating) => new Review({ rating }));
      await Promise.all(reviewsToLink.map((review) => review.save()));
      try {
        await newProduct.addReviews(reviewsToLink);
      } catch (err) {
        console.error(err);
        expect(false).to.be.true;
      }
      const reviews = await newProduct.getReviews();
      expect(reviews).to.have.length(4);
    });
  });
});
