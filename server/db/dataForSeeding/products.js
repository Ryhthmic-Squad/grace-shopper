// product prices, inventory and dimensions are placeholder values based on latest pulled branch for local testing
// do we want to set style in here? suggesting this bc it the code will become lengthy in the seed.js file if we plan on using sequelize magic methods to set type on individual products

// products as object { room: [array of Products],
// set room using magic method
const products = {
  bedroom: [
    {
      name: 'Hartley King Bed',
      inventory: 10,
      height: 40,
      width: 83,
      depth: 89,
      material: 'fabric',
      color: 'grey',
      imageUrl:
        'https://rnb.scene7.com/is/image/roomandboard/?src=ir%7Broomandboardrender/hartley_queen_60_2018?obj=main&sharp=1&src=rpt_declanhaze&obj=material&show&src=drape_material_cc&obj=hboard/40H&show&src=rpt_declanhaze%7D&$prodzoom0$&size=1280,400&scl=1',
      price: 2250,
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
      imageUrl:
        'https://images.hermanmiller.group/m/3effef93d8420f64/W-DWR_2517925_100169751_surf_oak_a.tif?blend-mode=darken&blend=f8f8f8&trim-color=ffffff&trim=color&bg=f8f8f8&auto=format&w=1200&q=68&h=1000',
      price: 1500,
      style: 'contemporary',
      type: 'bed',
    },
    {
      name: 'Kenwood Dresser',
      inventory: 10,
      height: 33,
      width: 84,
      depth: 20,
      material: 'wood',
      color: 'brown',
      imageUrl:
        'https://rnb.scene7.com/is/image/roomandboard/?layer=0&size=1280,400&scl=1&src=899535_wood_SHELL&layer=1&size=1280,400&scl=1&src=899535_base_GP&layer=2&size=1280,400&scl=1&src=899535_pull_GRPH&layer=comp&$prodzoom0$',
      price: 1000,
      style: 'contemporary',
      type: 'dresser',
    },
    {
      name: 'Niguel Dresser',
      inventory: 10,
      height: 33,
      width: 60,
      depth: 18,
      material: 'wood',
      color: 'beige',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0351/7510/4651/products/2021_02_23_LAWSON_FENNING_0179_600x.png?v=1616896702',
      price: 875,
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
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0351/7510/4651/products/2020_06_24_LAWSON_FENNING_0270-3_1200x.png?v=1596131972',
      price: 500,
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
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0153/0623/products/furjarinngdblngy_79afcfea-07a2-41b4-bbea-0a4c3d89ea22.jpg?v=1596828927',
      price: 450,
      style: 'contemporary',
      type: 'nightstand',
    },
    {
      name: 'Nelson Thin Edge King Bed',
      inventory: 10,
      height: 35,
      width: 75,
      depth: 87,
      material: 'wood',
      color: 'brown',
      imageUrl:
        'https://s7d2.scene7.com/is/image/HermanMillerStore/b2c_3x4crop?$image_src=HermanMillerStore/NelsonThinEdgeBed_10001010_Front&$b2c_1200x900_jpeg$',
      price: 2000,
      style: 'modern',
      type: 'bed',
    },
    {
      name: 'Lenia King Bed',
      inventory: 10,
      height: 45,
      width: 79,
      depth: 83,
      material: 'wood',
      color: 'black',
      imageUrl:
        'https://cdn-images.article.com/products/SKU14680/2890x1500/image64105.jpg?fit=max&w=1920&q=80&fm=webp',
      price: 999,
      style: 'modern',
      type: 'bed',
    },
    {
      name: 'Nelson Thin Edge Dresser',
      inventory: 10,
      height: 28.5,
      width: 34,
      depth: 18.5,
      material: 'wood',
      color: 'brown',
      imageUrl:
        'https://images.hermanmiller.group/m/3472754da72a027/W-HM_3654_10001994_walnut_aluminum_f.tif?blend-mode=darken&blend=f8f8f8&trim-color=ffffff&trim=color&bg=f8f8f8&auto=format&w=1200&q=68&h=1000',
      price: 600,
      style: 'modern',
      type: 'dresser',
    },
    {
      name: 'Lenia Dresser',
      inventory: 10,
      height: 32.5,
      width: 63,
      depth: 19,
      material: 'wood',
      color: 'beige',
      imageUrl:
        'https://cdn-images.article.com/products/SKU14674/2890x1500/image62415.jpg?fit=max&w=1920&q=80&fm=webp',
      price: 1100,
      style: 'modern',
      type: 'dresser',
    },
    {
      name: 'Nelson Thin Edge Nightstand',
      inventory: 10,
      height: 23.75,
      width: 18,
      depth: 18.5,
      material: 'wood',
      color: 'brown',
      imageUrl:
        'https://images.hermanmiller.group/m/3cf5eb614ce13485/W-HM_4358_9129742_ash_f.tif?blend-mode=darken&blend=f8f8f8&trim-color=ffffff&trim=color&bg=f8f8f8&auto=format&w=1200&q=68&h=1000',
      price: 850,
      style: 'modern',
      type: 'nightstand',
    },
    {
      name: 'Lenia Nightstand',
      inventory: 10,
      height: 24,
      width: 20,
      depth: 15,
      material: 'wood',
      color: 'beige',
      imageUrl:
        'https://cdn-images.article.com/products/SKU14676/2890x1500/image59616.jpg?fit=max&w=1920&q=80&fm=webp',
      price: 350,
      style: 'modern',
      type: 'nightstand',
    },
    {
      name: 'Cooper Wing Bed',
      inventory: 10,
      height: 54,
      width: 88,
      depth: 87.5,
      material: 'fabric',
      color: 'beige',
      imageUrl:
        'https://bernhardt.com/sites/default/files/product/bernhardt_interiors_cooper_wing_bed_754h66-754fr66_front_1.jpg',
      price: 2125,
      style: 'transitional',
      type: 'bed',
    },
    {
      name: 'Jordan Button-Tufted Wing Bed',
      inventory: 10,
      height: 64,
      width: 88,
      depth: 87.5,
      material: 'fabric',
      color: 'grey',
      imageUrl:
        'https://bernhardt.com/sites/default/files/product/bernhardt_interiors_jordan_bed_64in_front.jpg',
      price: 2550,
      style: 'transitional',
      type: 'bed',
    },
    {
      name: 'Auberge Dresser',
      inventory: 10,
      height: 39,
      width: 68,
      depth: 19,
      material: 'wood',
      color: 'brown',
      imageUrl:
        'https://bernhardt.com/sites/default/files/product/351-044A.jpg',
      price: 1800,
      style: 'transitional',
      type: 'dresser',
    },
    {
      name: 'Domaine Blanc Dresser',
      inventory: 10,
      height: 38,
      width: 68.25,
      depth: 19.25,
      material: 'wood',
      color: 'cream',
      imageUrl: 'https://bernhardt.com/sites/default/files/product/374-052.jpg',
      price: 1600,
      style: 'transitional',
      type: 'dresser',
    },
    {
      name: 'Linea Bachelor Nightstand',
      inventory: 10,
      height: 32,
      width: 38,
      depth: 19,
      material: 'wood',
      color: 'brown',
      imageUrl:
        'https://bernhardt.com/sites/default/files/product/bernhardt_linea_bachelors_chest_384-230b.jpg',
      price: 525,
      style: 'transitional',
      type: 'nightstand',
    },
    {
      name: 'Allure Nightstand',
      inventory: 10,
      height: 29.75,
      width: 35.25,
      depth: 21.25,
      material: 'wood',
      color: 'cream',
      imageUrl:
        'https://bernhardt.com/sites/default/files/product/bernhardt_allure_nightstand_399-229_front.jpg',
      price: 665,
      style: 'transitional',
      type: 'nightstand',
    },
  ],
  living: [
    {
      name: 'Inheritance Armchair',
      inventory: 10,
      height: 25,
      width: 31.5,
      depth: 36,
      material: 'fabric',
      color: 'green',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/1087/6904/products/4e4059512854e5dde797b0ecf867fcde_1400x.jpg?v=1571439012',
      price: 1250,
      style: 'contemporary',
      type: 'chair',
    },
    {
      name: 'Striad Sofa',
      inventory: 10,
      height: 31,
      width: 96,
      depth: 33.75,
      material: 'fabric',
      color: 'grey',
      imageUrl:
        'https://images.hermanmiller.group/m/7c1379668652d21b/W-HM_2518280_100177093_Intaglio_f-jpg.png?blend-mode=darken&blend=f8f8f8&trim-color=ffffff&trim=color&bg=f8f8f8&auto=format&w=1200&q=68&h=1000',
      price: 2000,
      style: 'contemporary',
      type: 'sofa',
    },
    {
      name: 'Modular Sofa',
      inventory: 10,
      height: 32,
      width: 93.75,
      depth: 70.5,
      material: 'fabric',
      color: 'pink',
      imageUrl:
        'https://static.vitra.com/media/asset/1546871/storage/v_fullbleed_1440x/22432915.jpg',
      price: 1800,
      style: 'contemporary',
      type: 'sofa',
    },
    {
      name: 'Cork Table',
      inventory: 10,
      height: 13,
      width: 12.25,
      depth: 12.25,
      material: 'cork',
      color: 'beige',
      imageUrl:
        'https://static.vitra.com/media/asset/3483755/storage/v_fullbleed_1440x/47681118.jpg',
      price: 80,
      style: 'contemporary',
      type: 'table',
    },
    {
      name: 'Grass Hopper Coffee Table',
      inventory: 10,
      height: 39.5,
      width: 140,
      depth: 39.5,
      material: 'stone',
      color: 'white',
      imageUrl:
        'https://content.cylindo.com/api/image/resize?account=4800&id=10128&scene=sku&features=2729079,2729077,2729080&frame=1&size=880&name=Grasshopper%20Low%20Table%20set%20-%20round%20double1&color=FFFFFF&format=JPG',
      price: 825,
      style: 'contemporary',
      type: 'table',
    },
    {
      name: 'Womb Chair',
      inventory: 10,
      height: 35.5,
      width: 40,
      depth: 34,
      material: 'fabric',
      color: 'cream',
      imageUrl:
        'https://content.cylindo.com/api/image/resize?account=4800&id=7801&scene=sku&features=2208336,2208276,2208800&frame=1&size=880&name=Saarinen%20Womb1&color=FFFFFF&format=JPG',
      price: 1225,
      style: 'modern',
      type: 'chair',
    },
    {
      name: 'Shell Chair',
      inventory: 10,
      height: 29,
      width: 36.25,
      depth: 32.75,
      material: 'leather',
      color: 'black',
      imageUrl:
        'https://images.hermanmiller.group/m/3bd69fe3c3ab3c97/W-PD_7345_SHELL_walnut_MATERIAL_leather_UPHOLSTERY_thor_leather_COLOR_black-jpg.png?blend-mode=darken&blend=f8f8f8&trim-color=ffffff&trim=color&bg=f8f8f8&auto=format&w=1200&q=68&h=1000',
      price: 585,
      style: 'modern',
      type: 'chair',
    },
    {
      name: 'Ceni Sofa',
      inventory: 10,
      height: 31,
      width: 83,
      depth: 35,
      material: 'fabric',
      color: 'blue',
      imageUrl:
        'https://cdn-images.article.com/products/SKU419C/2890x1500/image37536.jpg?fit=max&w=2600&q=60&fm=webp',
      price: 995,
      style: 'modern',
      type: 'sofa',
    },
    {
      name: 'Holmes Sofa',
      inventory: 10,
      height: 25,
      width: 89,
      depth: 35,
      material: 'leather',
      color: 'brown',
      imageUrl:
        'https://rnb.scene7.com/is/image/roomandboard/?src=ir%7Broomandboardrender/holmes_sf_80_portofino_lth?obj=main&sharp=1&src=rpt_portofinocognac&obj=material&show&src=drape_material_cc%7D&$prodzoom0$&size=1280,400&scl=1',
      price: 1825,
      style: 'modern',
      type: 'sofa',
    },
    {
      name: 'Eames Coffee Table',
      inventory: 10,
      height: 15.25,
      width: 45,
      depth: 30,
      material: 'wood',
      color: 'brown',
      imageUrl:
        'https://images.hermanmiller.group/m/7f9a262db7582d2d/W-HM_2196956_100085972_walnut_black_vendor_f.png?blend-mode=darken&blend=f8f8f8&trim-color=ffffff&trim=color&bg=f8f8f8&auto=format&w=1200&q=68&h=1000',
      price: 425,
      style: 'modern',
      type: 'table',
    },
    {
      name: 'Noguchi Table',
      inventory: 10,
      height: 15.75,
      width: 50,
      depth: 36,
      material: 'glass',
      color: 'clear',
      imageUrl:
        'https://images.hermanmiller.group/m/529803e89dcc3906/W-PD_6115_COLOR_walnut-jpg.png?blend-mode=darken&blend=f8f8f8&trim-color=ffffff&trim=color&bg=f8f8f8&auto=format&w=1200&q=68&h=1000',
      price: 750,
      style: 'modern',
      type: 'table',
    },
    {
      name: 'Kingston Wing Chair',
      inventory: 10,
      height: 44.5,
      width: 31,
      depth: 37.5,
      material: 'fabric',
      color: 'beige',
      imageUrl:
        'https://bernhardt.com/sites/default/files/product/bernhardt_interiors_kingston_wing_chair_n1712_2857-021_front.jpg',
      price: 550,
      style: 'transitional',
      type: 'chair',
    },
    {
      name: 'Henderson Chair',
      inventory: 10,
      height: 42,
      width: 27.5,
      depth: 37,
      material: 'fabric',
      color: 'cream',
      imageUrl:
        'https://bernhardt.com/sites/default/files/product/N3103_2312002_FrontS_0.jpg',
      price: 325,
      style: 'transitional',
      type: 'chair',
    },
    {
      name: 'Aubree Sofa',
      inventory: 10,
      height: 30,
      width: 83,
      depth: 35.5,
      material: 'fabric',
      color: 'cream',
      imageUrl:
        'https://bernhardt.com/sites/default/files/product/bernhardt_interiors_aubree_sofa_n3597_front_0.jpg',
      price: 2100,
      style: 'transitional',
      type: 'sofa',
    },
    {
      name: 'Palisades Sofa',
      inventory: 10,
      height: 35,
      width: 82.5,
      depth: 39,
      material: 'fabric',
      color: 'grey',
      imageUrl:
        'https://bernhardt.com/sites/default/files/product/n2876-2267-013.jpg',
      price: 1675,
      style: 'transitional',
      type: 'sofa',
    },
    {
      name: 'Avondale Round Metal Cocktail Table',
      inventory: 10,
      height: 18,
      width: 44,
      depth: 44,
      material: 'stone',
      color: 'white',
      imageUrl:
        'https://bernhardt.com/sites/default/files/product/bernhardt_avondale_round_metal_cocktail_table_470-015_front.jpg',
      price: 625,
      style: 'transitional',
      type: 'table',
    },
    {
      name: 'Canyon Ridge Square Cocktail Table',
      inventory: 10,
      height: 18,
      width: 44,
      depth: 44,
      material: 'wood',
      color: 'brown',
      imageUrl:
        'https://bernhardt.com/sites/default/files/product/bernhardt_canyon-ridge_square_cocktail_table_397-011_front-alt.jpg',
      price: 380,
      style: 'transitional',
      type: 'table',
    },
  ],
  dining: [
    {
      name: 'Svelti Dining Chair',
      inventory: 10,
      height: 34,
      width: 18,
      depth: 20.5,
      material: 'polypropylene',
      color: 'green',
      imageUrl:
        'https://cdn-images.article.com/products/SKU3061/2890x1500/image27159.jpg?fit=max&w=930&q=80',
      price: 59,
      style: 'contemporary',
      type: 'chair',
    },
    {
      name: 'Bar Height Stool',
      inventory: 10,
      height: 44.5,
      width: 18.63,
      depth: 23.4,
      material: 'polypropylene',
      color: 'grey',
      imageUrl:
        'https://www.knoll.com/static_resources/images/products/catalog/eco/parts/2BCNX/2BCNX-4_GY_FZ.jpg',
      price: 199,
      style: 'contemporary',
      type: 'chair',
    },
    {
      name: 'Rift Bar Stool',
      inventory: 10,
      height: 37.5,
      width: 19.75,
      depth: 20,
      material: 'polypropylene',
      color: 'white',
      imageUrl:
        'https://hivemodern.com/public_resources/rift-bar-stool-with-seat-cushion-patricia-urquiola-moroso-3.jpg',
      price: 260,
      style: 'contemporary',
      type: 'chair',
    },
    {
      name: 'Krusin Side Chair',
      inventory: 10,
      height: 30.5,
      width: 23.5,
      depth: 21.75,
      material: 'wood',
      color: 'cream',
      imageUrl:
        'https://www.knoll.com/static_resources/images/products/catalog/eco/parts/MK01/MK01-C_ON_~_(K1523)_K152320_FZ.jpg',
      price: 150,
      style: 'contemporary',
      type: 'chair',
    },
    {
      name: 'Coiled Counter Stool',
      inventory: 10,
      height: 26.38,
      width: 16,
      depth: 16,
      material: 'wood',
      color: 'cream',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/1087/6904/products/1e4f356b0fd644ab338e2653e97201b5_800x.jpg?v=1571439030',
      price: 125,
      style: 'contemporary',
      type: 'chair',
    },
    {
      name: '70/70 Table',
      inventory: 10,
      height: 28.75,
      width: 88.6,
      depth: 35.4,
      material: 'wood',
      color: 'brown',
      imageUrl:
        'https://www.knoll.com/static_resources/images/products/catalog/eco/parts/ISM70D8835/ISM70D8835-NBK_WH_FZ.png',
      price: 1125,
      style: 'contemporary',
      type: 'table',
    },
    {
      name: 'Light Table Extending 341e',
      inventory: 10,
      height: 28.9,
      width: 78.75,
      depth: 39.4,
      material: 'wood',
      color: 'brown',
      imageUrl:
        'https://hivemodern.com/public_resources/de-la-espada-matthew-hilton-light-table-341e-1.jpg',
      price: 1625,
      style: 'contemporary',
      type: 'table',
    },
    {
      name: 'Tulip Arm Chair',
      inventory: 10,
      height: 32,
      width: 26,
      depth: 23.25,
      material: 'Fiberglass',
      color: 'grey',
      imageUrl:
        'https://content.cylindo.com/api/image/resize?account=4800&id=7754&scene=sku&features=2177319,2176521,2177291&frame=1&size=880&name=Saarinen%20Tulip%20Fully%20Upholstered%20Arm1&color=FFFFFF&format=JPG',
      price: 325,
      style: 'modern',
      type: 'chair',
    },
    {
      name: 'Cesca Stool',
      inventory: 10,
      height: 42,
      width: 18.1,
      depth: 23.6,
      material: 'steel',
      color: 'cream',
      imageUrl:
        'https://content.cylindo.com/api/image/resize?account=4800&id=9253&scene=sku&features=2372530,2391943,2372535,2372537,2372531&frame=1&size=880&name=Cesca%20Stool%20Caned1&color=FFFFFF&format=JPG',
      price: 95,
      style: 'modern',
      type: 'chair',
    },
    {
      name: 'Bertoia Stool',
      inventory: 10,
      height: 41.25,
      width: 21.75,
      depth: 22,
      material: 'steel',
      color: 'grey',
      imageUrl:
        'https://content.cylindo.com/api/image/resize?account=4800&id=9910&scene=sku&features=2627649,2627341,2627692&frame=32&size=880&name=Bertoia%20Counter-Bar%20Stool,%20Seat%20Pad32&color=FFFFFF&format=JPG',
      price: 275,
      style: 'modern',
      type: 'chair',
    },
    {
      name: 'Wegner Wishbone Chair',
      inventory: 10,
      height: 29,
      width: 22,
      depth: 20,
      material: 'wood',
      color: 'brown',
      imageUrl:
        'https://njmodern.com/media/catalog/product/w/e/westfield-wishbone-chair-upholstered-seat.jpg',
      price: 115,
      style: 'modern',
      type: 'chair',
    },
    {
      name: 'Platner Dining Table',
      inventory: 10,
      height: 27,
      width: 53.75,
      depth: 53.75,
      material: 'glass',
      color: 'clear',
      imageUrl:
        'https://www.knoll.com/static_resources/images/products/catalog/eco/parts/3716T/3716T-N_G2_FZ.jpg',
      price: 2159,
      style: 'modern',
      type: 'table',
    },
    {
      name: 'Saarinen Dining Table',
      inventory: 10,
      height: 28.25,
      width: 84,
      depth: 47,
      material: 'stone',
      color: 'white',
      imageUrl:
        'https://www.knoll.com/static_resources/images/products/catalog/eco/parts/179TO/179TO-2_F2_FZ.jpg',
      price: 3250,
      style: 'modern',
      type: 'table',
    },
    {
      name: 'Clarendon Host Arm Chair',
      inventory: 10,
      height: 42,
      width: 25,
      depth: 27,
      material: 'fabric',
      color: 'brown',
      imageUrl:
        'https://bernhardt.com/sites/default/files/product/2017_Bernhardt_Clarendon_Host_Arm_Chair_377-548_front.jpg',
      price: 140,
      style: 'transitional',
      type: 'chair',
    },
    {
      name: 'Linder Bar Stool',
      inventory: 10,
      height: 29.75,
      width: 20.06,
      depth: 20.06,
      material: 'fabric',
      color: 'brown',
      imageUrl:
        'https://bernhardt.com/sites/default/files/product/bernhardt_interiors_linder_bar_stool_301-580_1196-044_front.jpg',
      price: 85,
      style: 'transitional',
      type: 'chair',
    },
    {
      name: 'East Hampton Oval Back Side Chair',
      inventory: 10,
      height: 38.5,
      width: 20.5,
      depth: 24.5,
      material: 'fabric',
      color: 'cream',
      imageUrl:
        'https://bernhardt.com/sites/default/files/product/bernhardt_east-hampton_oval_back_side_chair_395-561_front.jpg',
      price: 120,
      style: 'transitional',
      type: 'chair',
    },
    {
      name: 'Slope Leather Bar Stool',
      inventory: 10,
      height: 47.38,
      width: 24.5,
      depth: 26,
      material: 'leather',
      color: 'black',
      imageUrl:
        'https://bernhardt.com/sites/default/files/product/bernhardt_interiors_slope_leather_bar_stool_319-586l_front.jpg',
      price: 215,
      style: 'transitional',
      type: 'chair',
    },
    {
      name: 'Canyon Ridge Dining Table',
      inventory: 10,
      height: 30,
      width: 86,
      depth: 46,
      material: 'wood',
      color: 'brown',
      imageUrl:
        'https://bernhardt.com/sites/default/files/product/bernhardt_canyon-ridge_dining_table_397-224-226_front-alt.jpg',
      price: 825,
      style: 'transitional',
      type: 'table',
    },
    {
      name: 'Campania Dining Table',
      inventory: 10,
      height: 30,
      width: 86,
      depth: 46,
      material: 'wood',
      color: 'cream',
      imageUrl: 'https://bernhardt.com/sites/default/files/product/370-222.jpg',
      price: 485,
      style: 'transitional',
      type: 'table',
    },
  ],
  bathroom: [
    {
      name: 'Crew Multiple Wall Hooks',
      inventory: 10,
      height: 8,
      width: 38,
      depth: 2.5,
      material: 'steel',
      color: 'gray',
      imageUrl:
        'https://rnb.scene7.com/is/image/roomandboard/?src=ir%7Broomandboardrender/crew_38w_2-5d_8h?obj=color&show&src=rpt_BPLG%7D&$more$&size=1440,960&scl=1',
      price: 119,
      style: 'contemporary',
      type: 'hooks',
    },
    {
      name: 'Pond Mirror',
      inventory: 10,
      height: 43.25,
      width: 25,
      depth: 0.6,
      material: 'glass',
      color: 'silver',
      imageUrl:
        'https://store.moma.org/dw/image/v2/BBQC_PRD/on/demandware.static/-/Sites-master-moma/default/dwf87686bd/images/152915_a.jpg?sw=626&sh=626&sm=cut',
      price: 179,
      style: 'contemporary',
      type: 'mirror',
    },
    {
      name: 'Kartell Bio Componibili 3 Tier Storage',
      inventory: 10,
      height: 23,
      width: 12.5,
      depth: null,
      material: 'bioplastic',
      color: 'green',
      imageUrl:
        'https://store.moma.org/dw/image/v2/BBQC_PRD/on/demandware.static/-/Sites-master-moma/default/dw664f1010/images/149664_a.jpg?sw=626&sh=626&sm=cut',
      price: 290,
      style: 'contemporary',
      type: 'storage',
    },
    {
      name: 'Hay Shade Waste Bin',
      inventory: 10,
      height: 14.3,
      width: 11.8,
      depth: null,
      material: 'polypropylene',
      color: 'green',
      imageUrl:
        'https://store.moma.org/dw/image/v2/BBQC_PRD/on/demandware.static/-/Sites-master-moma/default/dwc8ec1062/images/200802_a.jpg?sw=626&sh=626&sm=cut',
      price: 40,
      style: 'contemporary',
      type: 'waste',
    },
    {
      name: 'Eames Hang it All ',
      inventory: 10,
      height: 14.5,
      width: 19.5,
      depth: 6.5,
      material: 'steel',
      color: 'maple',
      imageUrl:
        'https://store.moma.org/dw/image/v2/BBQC_PRD/on/demandware.static/-/Sites-master-moma/default/dw118b3dd1/images/139551_a.jpg?sw=626&sh=626&sm=cut',
      price: 295,
      style: 'modern',
      type: 'hooks',
    },
    {
      name: 'Ojai Mirror',
      inventory: 10,
      height: 44,
      width: 36,
      depth: 1.5,
      material: 'glass',
      color: 'walnut',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0351/7510/4651/products/OjaiWallMirror1.png?v=1609906612',
      price: 2175,
      style: 'modern',
      type: 'mirror',
    },
    {
      name: 'Teak Paper Basket',
      inventory: 10,
      height: 13,
      width: 10,
      depth: 10,
      material: 'teak',
      color: 'cinnamon',
      imageUrl:
        'https://chairish-prod.freetls.fastly.net/image/product/sized/342bdaf1-808b-4cae-9079-9eea1eb82c34/mid-century-teak-paper-basket-martin-aberg-servex-rainbow-sweden-1960s-0545?aspect=fit&width=1600&height=1600',
      price: 700,
      style: 'modern',
      type: 'waste',
    },
    {
      name: 'Aubrey Entryway Wall Shelf',
      inventory: 10,
      height: 13,
      width: 10,
      depth: 10,
      material: 'wood',
      color: 'white',
      imageUrl:
        'https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202103/0039/aubrey-entryway-wall-shelf-with-hooks-z.jpg',
      price: 249,
      style: 'transitional',
      type: 'hooks',
    },
    {
      name: 'Lyndale',
      inventory: 10,
      height: 36,
      width: 24,
      depth: 4.5,
      material: 'glass',
      color: 'gold',
      imageUrl:
        'https://rnb.scene7.com/is/image/roomandboard/574006?$prodzoom0$&size=1280,400&scl=1',
      price: 699,
      style: 'transitional',
      type: 'mirror',
    },
    {
      name: 'Dolomiti Trash Bin',
      inventory: 10,
      height: 9.1,
      width: 9.4,
      depth: 9.4,
      material: 'pewter',
      color: 'silver',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/1087/6904/products/f74b43fdc8ddcafa2dbdc38ed96d3928_1400x.jpg?v=1571438933',
      price: 680,
      style: 'transitional',
      type: 'waste',
    },
  ],
};

module.exports = { products };
