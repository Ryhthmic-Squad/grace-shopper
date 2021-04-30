const { expect } = require('chai');
const {
  db,
  models: { Product },
} = require('../../server/db/index');
const app = require('../../server/index');
const agent = require('supertest')(app);

describe('Products route',()=>{
    it('gets all products',async()=>{
      const product = await Product.findAll()
      const response = await agent.get('/api/products').expect(200);
      expect(response.body).to.have.length(product.length);
    });
    it('getting the price',async()=>{
      const {id, price} = Product.findOne({
          where:{
              name:'Niguel Dresser'
          }
      })
      console.log(id)
      const response = await agent.get(`/api/products/dressers/${id}`).expect(200);
      expect(response.body[0].price).to.equal(price)
    });
    it('has a color',async()=>{
      const {id, width} = Product.findOne({
          where:{
              color:'taupe'
          }
      })
      const response = await agent.get(`/api/products/nightstands/${id}`).expect(200);
      expect(response.body).to.have.length(1);
      expect(response.body[0].width).to.equal(width)
  
    });
    
  })
  