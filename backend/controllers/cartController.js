const { Cart, CartItem, Product } = require('../models');

const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.user.id },
      include: [{ model: CartItem, include: [Product] }],
    });

    res.json(cart || { items: [] });
  } catch (err) {
    next(err);
  }
};

const addToCart = async (req, res, next) => {
  try {
    const { productId, size, qty } = req.body;

    const cart = await Cart.findOne({ where: { userId: req.user.id } });

    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let item = await CartItem.findOne({
      where: { cartId: cart.id, productId, size },
    });

    if (item) {
      item.qty += qty;
      await item.save();
    } else {
      item = await CartItem.create({
        cartId: cart.id,
        productId,
        size,
        qty,
        price: product.price,
      });
    }

    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

const updateCartItem = async (req, res, next) => {
  try {
    const { itemId, qty } = req.body;
    const item = await CartItem.findByPk(itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.qty = qty;
    await item.save();

    res.json(item);
  } catch (err) {
    next(err);
  }
};

const removeCartItem = async (req, res, next) => {
  try {
    const { itemId } = req.body;
    const item = await CartItem.findByPk(itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    await item.destroy();
    res.json({ message: 'Item removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeCartItem };
