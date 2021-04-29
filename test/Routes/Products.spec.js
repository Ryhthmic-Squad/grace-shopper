const { expect } = require('chai');
const {
  db,
  models: { Product },
} = require('../../server/db/index');
const app = require('../../server/index');
const agent = require('supertest')(app);

describe('Products route',()=>{
    let sofa, chair, nightstand
    beforeEach(async()=>{
      //Create the products
      sofa = new Product({
        name:'theestallion',
        inventory:10,
        height:30.2,
        width:20.3,
        depth:12.3,
        material:'leather',
        color:'beige',
        imageUrl:'www.randomimage.com/1234',
        price:345.23,
        description:'comfy beige couch',
        type:'sofa'
      });
      sofa.save();
      chair = new Product({
        name:'elseat',
        inventory:2,
        height:30.2,
        width:20.3,
        depth:12.3,
        material:'wood',
        color:'brown',
        imageUrl:'www.randomimage.com/1234',
        price:50.00,
        description:'for sitting',
        type:'chair'
      })
      chair.save();
      nightstand = new Product({
        name:'thenight',
        inventory:23,
        height:30.2,
        width:20.3,
        depth:12.3,
        material:'wood',
        color:'white',
        imageUrl:'www.randomimage.com/1234',
        price:34.00,
        description:'Set your items aside',
        type:'nightstand'
      })
      nightstand.save()
    });
    afterEach(async () => {
      await sofa.destroy();
      await chair.destroy();
      await nightstand.destroy();
    });
    
    it('gets all products',async()=>{
      
      const response = await agent.get('/api/products').expect(200);
      expect(response.body).to.have.length(3);
    });
    it('has one chair',async()=>{
      const response = await agent.get('/api/products/chairs').expect(200);
      expect(response.body[0].material).to.equal('wood')
    });
    it('has one sofa',async()=>{
      const response = await agent.get('/api/products/sofas').expect(200);
      expect(response.body).to.have.length(1);
      expect(response.body[0].name).to.equal('theestallion')
  
    });
    
  })
  