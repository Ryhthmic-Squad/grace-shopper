// product prices, inventory and dimensions are placeholder values based on latest pulled branch for local testing
// do we want to set style in here? suggesting this bc it the code will become lengthy in the seed.js file if we plan on using sequelize magic methods to set type on individual products

// products as object { room: [array of Products],
// set room using magic method
const products = [
  {
    name: 'Hartley King Bed',
    inventory: 10,
    height: 40,
    width: 83,
    depth: 89,
    material: 'fabric',
    color: 'grey',
    imagerUrl:
      'https://rnb.scene7.com/is/image/roomandboard/?src=ir%7Broomandboardrender/hartley_queen_60_2018?obj=main&sharp=1&src=rpt_declanhaze&obj=material&show&src=drape_material_cc&obj=hboard/40H&show&src=rpt_declanhaze%7D&$prodzoom0$&size=1280,400&scl=1',
    price: 2250.00,
    style: 'contemporary',
    type: 'bed',
  },
  {
    name: 'Miro King Bed',
    inventory: 10,
    height: 36.6,
    width: 71,
    depth: 92.1,
    material: 'wood',
    color: 'brown',
    imagerUrl:
      'https://images.hermanmiller.group/m/3effef93d8420f64/W-DWR_2517925_100169751_surf_oak_a.tif?blend-mode=darken&blend=f8f8f8&trim-color=ffffff&trim=color&bg=f8f8f8&auto=format&w=1200&q=68&h=1000',
    price: 1500.00,
    style: 'contemporary',
    type: 'bed',
  },
  {
    name: 'Niguel Dresser',
    inventory: 10,
    height: 33,
    width: 60,
    depth: 18,
    material: 'wood',
    color: 'beige',
    imagerUrl:
      'https://cdn.shopify.com/s/files/1/0351/7510/4651/products/2021_02_23_LAWSON_FENNING_0179_600x.png?v=1616896702',
    price: 875.00,
    style: 'contemporary',
    type: 'dresser',
  },
  {
    name: 'Kenwood Dresser',
    inventory: 10,
    height: 33,
    width: 84,
    depth: 20,
    material: 'wood',
    color: 'brown',
    imagerUrl:
      'https://rnb.scene7.com/is/image/roomandboard/?layer=0&size=1280,400&scl=1&src=899535_wood_SHELL&layer=1&size=1280,400&scl=1&src=899535_base_GP&layer=2&size=1280,400&scl=1&src=899535_pull_GRPH&layer=comp&$prodzoom0$',
    price: 1000.00,
    style: 'contemporary',
    type: 'dresser',
  },
  {
    name: 'Niguel Nightstand',
    inventory: 10,
    height: 24,
    width: 24,
    depth: 18,
    material: 'wood',
    color: 'brown',
    imagerUrl:
      'https://cdn.shopify.com/s/files/1/0351/7510/4651/products/2020_06_24_LAWSON_FENNING_0270-3_1200x.png?v=1596131972',
    price: 500.00,
    style: 'contemporary',
    type: 'nightstand',
  },
  {
    name: 'Copenhagen Nightstand',
    inventory: 10,
    height: 25,
    width: 26,
    depth: 20,
    material: 'wood',
    color: 'taupe',
    imagerUrl:
      'https://www.roomandboard.com/catalog/bedroom/nightstands/copenhagen-nightstands',
    price: 450.00,
    style: 'contemporary',
    type: 'nightstand',
  },
];

module.exports = { products };
