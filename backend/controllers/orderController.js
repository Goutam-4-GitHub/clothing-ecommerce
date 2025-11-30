const { Cart, CartItem, Product, Order, OrderItem, User } = require('../models');
const { sendOrderEmail } = require('../utils/sendEmail');

const createOrder = async (req, res, next) => {
  const t = await Order.sequelize.transaction();
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({
      where: { userId },
      include: [{ model: CartItem, include: [Product] }],
      transaction: t,
      lock: true,
    });

    if (!cart || cart.CartItems.length === 0) {
      await t.rollback();
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Optional: stock validation
    let totalPrice = 0;
    cart.CartItems.forEach((item) => {
      totalPrice += Number(item.price) * item.qty;
    });

    const order = await Order.create(
      {
        userId,
        totalPrice,
      },
      { transaction: t }
    );

    const orderItemsData = cart.CartItems.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      name: item.Product.name,
      size: item.size,
      qty: item.qty,
      price: item.price,
    }));

    const orderItems = await OrderItem.bulkCreate(orderItemsData, {
      transaction: t,
    });

    // Clear cart
    await CartItem.destroy({ where: { cartId: cart.id }, transaction: t });

    await t.commit();

    // send email
    const user = await User.findByPk(userId);
    await sendOrderEmail(order, user, orderItemsData);

    res.status(201).json({ order, items: orderItems });
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

module.exports = { createOrder };
