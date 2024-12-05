'use strict';
const { User, Tournament } = require('../../src/models');
const { SINGLE_ELIM, ROUND_ROBIN } = require('../../src/services/constants');
const SetupTournamentService = require('../../src/services/setup_tournament_service');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     *
     */
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
    const singleElimTourney = await Tournament.create({
      name: "Single Elimination Tourney",
      type: SINGLE_ELIM
    })

    const roundRobinTourney = await Tournament.create({
      name: "Mixed Tourney",
      type: ROUND_ROBIN,
      playoffCutoff: 4
    })


    const setupSingle = new SetupTournamentService(singleElimTourney)
    const setupRobin = new SetupTournamentService(roundRobinTourney)

    await setupSingle.createRoundsForPlayers(players)
    await setupRobin.createRoundsForPlayers(players)
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
