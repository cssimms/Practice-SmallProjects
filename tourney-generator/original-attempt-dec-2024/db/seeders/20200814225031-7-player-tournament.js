'use strict';

const { User, Tournament } = require('../../src/models')
const SetupTournamentService = require('../../src/services/setup_tournament_service')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const players = await User.bulkCreate([
      {
        name: 'Greg',
        email: 'greg@example.com',
      },

      {
        name: 'Nick',
        email: 'nick@example.com',
      },

      {
        name: 'Benji',
        email: 'benji@example.com',
      },

      {
        name: 'Arie',
        email: 'arie@example.com',
      },

      {
        name: 'Emilio',
        email: 'emilio@example.com',
      },

      {
        name: 'Olivia',
        email: 'olivia@example.com',
      },

      {
        name: 'Lisa',
        email: 'lisa@example.com',
      }
    ])

    const tournament = await Tournament.create({
      name: "Seed Generated Tournament"
    })

    const svc = new SetupTournamentService(tournament)
    await svc.createRoundsForPlayers(players)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
