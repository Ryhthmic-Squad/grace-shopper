const { DataTypes, Model } = require('sequelize');
const {
  db,
  models: { /* Product, */ Order_Product },
} = require('./index');

class Order extends Model {
  addProduct({ productId, quantity }) {
    // Creating a custom addProduct method that uses an intermediary Order_Products table to capture quantity of each product in an order
    // Product.findByPk(productId)
    //   .then((product) => {
    //     if (product.inventory < quantity) {
    //       throw new Error('Not enought inventory left for that item');
    //     }
    //     const orderProduct = new Order_Product({ quantity });
    //     orderProduct.productId = productId;
    //     orderProduct.orderId = this.orderId;
    //     return orderProduct.save();
    //   })
    //   .then(() => {
    //     console.log(
    //       `Added ${quantity} of product ${productId} to order ${this.orderId}`
    //     );
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }
}
Order.init(
  {
    orderId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM(['CREATED', 'PROCESSING', 'CANCELLED', 'COMPLETED']),
      defaultValue: 'CREATED',
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    products: {
      type: DataTypes.JSON,
    },
  },
  { sequelize: db, modelName: 'orders' }
);

module.exports = Order;
