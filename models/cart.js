const Sequelize = require('sequelize');

const db = require('../util/database');

const Cart = db.define('cart', {
   cart_uid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
   }
});

module.exports = Cart;