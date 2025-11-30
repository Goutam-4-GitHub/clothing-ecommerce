const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false }, // Men/Women/Kids
  sizes: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false }, // ['S','M','L','XL']
  stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
});

module.exports = Product;
