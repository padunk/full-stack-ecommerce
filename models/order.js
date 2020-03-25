const Sequelize = require('sequelize');

const db = require('../util/database');

const Order = db.define('order', {
   order_uid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
   }
});

module.exports = Order;