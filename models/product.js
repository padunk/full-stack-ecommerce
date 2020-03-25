const Sequelize = require('sequelize');

const db = require('../util/database');

const Product = db.define('product', {
   product_uid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
   },
   title: {
      type: Sequelize.STRING(50),
      allowNull: false,
   },
   price: {
      type: Sequelize.DOUBLE,
      allowNull: false,
   },
   image_url: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   description: {
      type: Sequelize.TEXT,
      allowNull: false,
   }
});

module.exports = Product;