const {
  models: { Cart, Order, User, Product },
} = require('../db/index');
const router = require('express').Router();
const stripe = require('stripe')(
  'sk_test_51InzHlFBTivT4al2MJRUcHa2MkZhq0EijAg3UWMK6RRLwGgfXyald98EmiG9zy6FYhSH1dF5QSpYDHAh41arM9ra00ZtMATlKa'
);

router.post('/', async (req, res) => {
  const session = await stripe.checkout.sessions.create(req.body);
  console.log(req.body);
  res.send({ id: session.id });
});

router.post('/webhook', async (req, res) => {
  let order = { orderNum: '', status: '' };
  const event = req.body;
  if (event.data.object.client_reference_id) {
    order['orderNum'] = event.data.object.client_reference_id;
    order['status'] = event.data.object.payment_status;
  }

  // Handle the event
  console.log(
    `The event type is =====>${event.type}`,
    'The event is =>>>>>>>>>>',
    event.data.object.total_details
  );

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      //const order = await Order.findByPk(req.body.client_reference_id);
      //await order.save({ status: 'COMPLETED' });
      console.log('he');
      console.log('the payment intent =>>>>>>>>>>', paymentIntent);

      break;
    case 'payment_intent.canceled':
      //const order = await Order.findByPk(req.body.client_reference_id);
      //await order.save({ status: 'CANCELLED' });
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached to a Customer!');
      break;
    // ... handle other event types
    case 'checkout.session.completed':
      if (order.orderNum && order.status == 'paid') {
        const user = await User.findByPk(order.orderNum, { include: Cart });
        const cart = await Cart.getWithProducts(user.cart.id);
        const neworder = await Order.create({ status: 'CREATED' });
        await neworder.setUser(user);

        const { cartProducts } = cart;
        for (const cartProduct of cartProducts) {
          const { quantity, product } = cartProduct;
          const { price } = product;
          await neworder.addProduct(product, { through: { quantity, price } });
        }
        console.log(await neworder.getProducts());

        await cart.setProducts([]);
      }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
});

module.exports = router;
