'use strict';
const {
  Model
} = require('sequelize');
const _ = require('lodash')

module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Match.belongsTo(models.Round, {
        foreignKey: 'roundId',
        as: 'round'
      })

      Match.belongsTo(models.User, {
        foreignKey: 'homeUserId',
        as: 'homeUser'
      })

      Match.belongsTo(models.User, {
        foreignKey: 'awayUserId',
        as: 'awayUser'
      })

      Match.belongsTo(models.Match, {
        foreignKey: 'nextMatchId',
        as: 'nextMatch'
      })

      Match.hasMany(models.Match, {
        foreignKey: 'nextMatchId',
        as: 'matches'
      })
    }

    async players() {
      return _.compact([
        await this.getHomeUser(),
        await this.getAwayUser()
      ])
    }
  };
  Match.init({
    roundId: DataTypes.INTEGER,
    homeUserId: DataTypes.INTEGER,
    awayUserId: DataTypes.INTEGER,
    homeScore: DataTypes.INTEGER,
    awayScore: DataTypes.INTEGER,
    nextMatchId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Match',
  });
  return Match;
};
