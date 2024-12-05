'use strict';
const {
  Model
} = require('sequelize');

/**
 * Types are currently dynamic, but should probably be defined through a configuration object later
 * single-elimination
 * robin-single-elimination
 *
 * Future config object might look like -
 * config: {
 * type: robin to single, robin to double, etc.
 * player cutoff, top 16
 * number of robin rounds: 10
 * }
 *
 * For now, going to hard code these things.
 */
module.exports = (sequelize, DataTypes) => {
  class Tournament extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tournament.hasMany(models.Round, {
        foreignKey: 'tournamentId',
        as: 'rounds'
      })
    }
  };
  Tournament.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    playoffCutoff: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tournament',
  });
  return Tournament;
};
