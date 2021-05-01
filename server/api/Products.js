const {
  models: { Product },
} = require('../db/index');
const router = require('express').Router();

// Select all products

router.get('/', async (req, res, next) => {
  try {
    allProducts = await Product.findAll();

    res.status(200).send(allProducts);
  } catch (er) {
    next(er);
  }
});

// Products by type

router.get('/Bytype/:type',async(req,res,next)=>{
  try{
  
    const type = await Product.findAll({
      where:{
      type:req.params.type
    }})
    res.status(200).send(type)
  }catch(er){
    next(er)
  }
})

router.get('/Bystyle/:style',async(req,res,next)=>{
  try{
    const type = await Product.findAll({
      style:req.params.style
    })
    res.status(200).send(type)
  }catch(er){
    next(er)
  }
})


//Products by room and style

router.get('/Byroom/:room', async (req, res, next) => {
  try {
    const room = await Product.findAll({
      where: {
        room: req.params.room,
      },
    });
    res.status(200).send(room);
  } catch (er) {
    next(er);
  }
});
router.get('/Byroom/:room/:style', async (req, res, next) => {
  try {
    const room = await Product.findAll({
      where: {
        room: req.params.room,
        style:req.params.style
      },
    });
    res.status(200).send(room);
  } catch (er) {
    next(er);
  }
});



// Single product

router.get('/Byid/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.status(200).send(product);
  } catch (er) {
    next(er);
  }
});

module.exports = router;
