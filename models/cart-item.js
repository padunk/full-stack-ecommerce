const Sequelize = require('sequelize');

const db = require('../util/database');

const CartItem = db.define('cart_item', {
   cart_item_id: {
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

module.exports = CartItem;