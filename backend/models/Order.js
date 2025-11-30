const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  totalPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  orderDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  status: { type: DataTypes.STRING, defaultValue: 'PLACED' },
});

module.exports = Order;
