const { expect } = require('chai');
const {
  db,
  models: { Product },
} = require('../../server/db/index');
const app = require('../../server/app');
const agent = require('supertest')(app);

describe('Products route',()=>{
    it('gets all products',async()=>{
      const product = await Product.findAll()
      const response = await agent.get('/api/products').expect(200);
      expect(response.body).to.have.length(product.length);
    });
    it('getting the price',async()=>{
      const {id, price} = await Product.findOne()
      const response = await agent.get(`/api/products/dressers/${id}`).expect(200);
      expect(response.body.price).to.equal(price)
    });
    it('has a width',async()=>{
      const {id, width} = await Product.findOne({
          where:{
              color:'taupe'
          }
      })
      
      const response = await agent.get(`/api/products/nightstands/${id}`).expect(200);
      expect(response.body.width).to.equal(width)
  
    });
    
  })
  