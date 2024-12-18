'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Round extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Round.belongsTo(models.Tournament, {
        foreignKey: 'tournamentId',
        as: 'tournament'
      })

      Round.hasMany(models.Match, {
        foreignKey: 'roundId',
        as: 'matches'
      })
    }
  };
  Round.init({
    tournamentId: DataTypes.INTEGER,
    number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Round',
  });
  return Round;
};
