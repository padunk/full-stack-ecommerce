const Sequelize = require('sequelize');

const db = require('../util/database');

const User = db.define('user', {
   user_uid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
   },
   first_name: {
      type: Sequelize.STRING(20),
      allowNull: false,
   },
   last_name: {
      type: Sequelize.STRING(20),
      allowNull: false,
   },
   email: {
      type: Sequelize.STRING(30),
      allowNull: true,
   },
   country: {
      type: Sequelize.STRING(20),
      allowNull: false,
   },
   
});

module.exports = User;