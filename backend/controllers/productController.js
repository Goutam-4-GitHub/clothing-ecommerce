const { Op } = require('sequelize');
const { Product } = require('../models');

const getProducts = async (req, res, next) => {
  try {
    const {
      search,
      category,
      size,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = req.query;

    const where = {};

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    if (category && category !== 'All') {
      where.category = category;
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = minPrice;
      if (maxPrice) where.price[Op.lte] = maxPrice;
    }

    if (size) {
      // sizes is array → check contains
      where.sizes = { [Op.contains]: [size] };
    }

    const offset = (Number(page) - 1) * Number(limit);

    const { rows, count } = await Product.findAndCountAll({
      where,
      limit: Number(limit),
      offset,
    });

    res.json({
      products: rows,
      total: count,
      page: Number(page),
      pages: Math.ceil(count / limit),
    });
  } catch (err) {
    next(err);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

module.exports = { getProducts, getProductById };
