const Sequelize = require('sequelize');

const db = require('../util/database');

const OrderItem = db.define('order_item', {
   order_item_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },
   quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
   }
});

module.exports = OrderItem;