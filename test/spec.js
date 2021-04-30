const { expect } = require('chai');

const { ValidationError } = require('sequelize');
const {
  db,
  models: { User, Address },
} = require('../server/db');
// db.options.logging = true;

describe('Initial Test', () => {
  it('adds 1 and 1 to make 2', () => {
    expect(1 + 1).to.equal(2);
  });
});
