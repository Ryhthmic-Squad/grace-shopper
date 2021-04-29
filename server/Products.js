/*
const { Product } = require('./db');
const router = require('express').Router();


// Select all products

router.get('/', async (req, res, next) => {
  try {
    allProducts = await Product.findAll();
    res.send(allProducts);
  } catch (er) {
    next(er);
  }
});
// Products by type

router.get('/sofas', async (req, res, next) => {
  try {
    const sofas = await Product.findAll({
      where: {
        type: 'sofa',
      },
    });
    res.send(sofas);
  } catch (er) {
    next(er);
  }
});
router.get('/chairs', async (req, res, next) => {
  try {
    const chairs = await Product.findAll({
      where: {
        type: 'chair',
      },
    });
    res.send(chairs);
  } catch (er) {
    next(er);
  }
});
router.get('/beds', async (req, res, next) => {
  try {
    const beds = await Product.findAll({
      where: {
        type: 'bed',
      },
    });
    res.send(beds);
  } catch (er) {
    next(er);
  }
});
router.get('/dressers', async (req, res, next) => {
  try {
    const dressers = await Product.findAll({
      where: {
        type: 'dresser',
      },
    });
    res.send(dressers);
  } catch (er) {
    next(er);
  }
});
router.get('/nightstands', async (req, res, next) => {
  try {
    const nightstands = await Product.findAll({
      where: {
        type: 'nightstand',
      },
    });
    res.send(nightstands);
  } catch (er) {
    next(er);
  }
});
router.get('/tables', async (req, res, next) => {
  try {
    const tables = await Product.findAll({
      where: {
        type: 'table',
      },
    });
    res.send(tables);
  } catch (er) {
    next(er);
  }
});

//Products by style

router.get('/styles/transitional', async(req,res,next)=>{
    try{
        const transitional = await Product.findAll({
            where:{
                style:'Transitional'
            }
        })
        res.send(transitional)
    }catch(er){
        next(er)
    }
})
router.get('/styles/modern', async(req,res,next)=>{
    try{
        const modern = await Product.findAll({
            where:{
                style:'Modern'
            }
        })
        res.send(modern);
    }catch(er){
        next(er);
    }
})

router.get('/styles/contemporary', async(req,res,next=>{
    try{
        const contemporary = await Product.findAll({
            where:{
                style:'Contemporary'
            }
        })
        res.send(contemporary);
    }catch(er){
        next(er);
    }
}))

//Products by room

router.get('/rooms/dining', async(req,res,next)=>{
    try{
        const dining = await Product.findAll({
            where:{
                type:'Dining'
            }
        })
        res.send(dining)
    }catch(er){
        next(er);
    }
})

router.get('/rooms/bedroom', async(req,res,next)=>{
    try{
        const bedroom = await Product.findAll({
            where:{
                type:'Bedroom'
            }
        })
        res.send(bedroom)
    }catch(er){
        next(er);
    }
})

router.get('/rooms/living', async(req,res,next)=>{
    try{
        const living = await Product.findAll({
            where:{
                type:'Living'
            }
        })
        res.send(Living)
    }catch(er){
        next(er);
    }
})

router.get('/rooms/bathroom', async(req,res,next)=>{
    try{
        const bathroom = await Product.findAll({
            where:{
                type:'Bathroom'
            }
        })
        res.send(bathroom)
    }catch(er){
        next(er);
    }
})

// Single product

router.get('/:uuid', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.uuid);
    res.send(product);
  } catch (er) {
    next(er);
  }
});

// Add product

router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.send(newProduct);
  } catch (er) {
    next(er);
  }
});

// Edit product

router.put(':uuid', async (req, res, next) => {
  try {
    const editProduct = await Product.findByPk(req.params.uuid);
    res.send(await Product.update(req.body));
  } catch (er) {}
});

// Delete product

router.delete('/:uuid', async(req, res, next)=>{
    try{
        const deleteProduct= await Product.findByPk(req.params.uuid)
        await deleteProduct.destroy();

    }catch(er){
        next(er)
    }
})
*/
