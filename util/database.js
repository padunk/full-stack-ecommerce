const Sqlze = require("sequelize");

const db = new Sqlze(process.env.POSTGRES_DB);

module.exports = db;
