const {
  db,
  models: { Product },
} = require('../../server/db/index');
const app = require('../../server/app');
const agent = require('supertest')(app);

describe('Products routes',()=>{
    test('gets all products',async()=>{
      const product = await Product.findAll()
      const response = await agent.get('/api/products').expect(200);
      expect(response.body).toBe(product.length);
      expect(product).toEqual(response.body);
    });
    test('getting the price',async()=>{
      const {id, price} = await Product.findOne()
      const response = await agent.get(`/api/products/${id}`).expect(200);
      expect(response.body.price).toBe(price)
    });
    test('has a width',async()=>{
      const {id, width,height} = await Product.findOne({
          where:{
              color:'taupe'
          }
      });
      const response = await agent.get(`/api/products/${id}`).expect(200);
      expect(response.body.width).toBe(width);
      expect(response.body.heigt).toBe(height);
  
    });
    
  })
  