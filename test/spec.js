const { expect } = require('chai');
const User = require('../server/db/User.js');

describe('Initial Test', () => {
  it('adds 1 and 1 to make 2', () => {
    expect(1 + 1).to.equal(2);
  });
});

describe('User Model', () => {
  const newUser = new User({
    email: 'test@email.com',
    password: '1234',
    phoneNumber: '1234567890',
    firstName: 'Jane',
    lastName: 'Doe',
  });
  it('has an email attribute', () => {
    expect(newUser.email).to.equal('test@email.com');
  });
  it('has a password attribute', () => {
    expect(newUser.password).to.equal('1234');
  });
  it('has a phoneNumber attribute', () => {
    expect(newUser.phoneNumber).to.equal('1234567890');
  });
  it('has a firstName attribute', () => {
    expect(newUser.firstName).to.equal('Jane');
  });
  it('has a lastName attribute', () => {
    expect(newUser.lastName).to.equal('Doe');
  });
  it('has a fullName virtual attirbute that combines first and last names', () => {
    expect(newUser.fullName).to.equal('Jane Doe');
    expect(newUser.hasOwnProperty('fullName')).to.equal(false);
  });
  it('has an isAdmin property that defaults to false', () => {
    expect(newUser.isAdmin).to.equal(false);
  });
});
