const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);

const Model = Sequelize.Model;

class User extends Model { }

User.init({
  // attributes
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, { sequelize });

module.exports = User;
