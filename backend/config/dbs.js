const { Sequelize } = require('sequelize');

const env = 'development';
const config = require('./config')[env];

const sequelize = new Sequelize(config);
//console.log(sequelize);
module.exports = sequelize;