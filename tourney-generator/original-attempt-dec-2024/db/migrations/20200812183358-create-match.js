'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roundId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      homeUserId: {
        type: Sequelize.INTEGER
      },
      awayUserId: {
        type: Sequelize.INTEGER
      },
      homeScore: {
        type: Sequelize.INTEGER
      },
      awayScore: {
        type: Sequelize.INTEGER
      },
      nextMatchId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Matches');
  }
};
