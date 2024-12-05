const { expect } = require('chai');
const _ = require('lodash');
const faker = require('faker');

const { User, Tournament, Round, Match } = require('../../src/models');

const SetupTournamentService = require('../../src/services/setup_tournament_service');
const { ROUND_ROBIN } = require('../../src/services/constants');

describe("createRoundsForPlayers() with single elimination tourney", function () {
  context("tournament with two players", function () {
    beforeEach(async function () {
      this.tournament = await Tournament.create({ name: "Test Tourney" })

      this.greg = await User.create({ name: "Greg", email: 'greg@example.com' })
      this.nick = await User.create({ name: "Nick", email: 'nick@example.com' })

      this.players = [this.greg, this.nick]
    });

    afterEach(async function () {
      // clean up
      await this.tournament.destroy()
      await this.greg.destroy()
      await this.nick.destroy()
    });

    specify("create a single round and match", async function () {
      service = new SetupTournamentService(this.tournament);
      rounds = await service.createRoundsForPlayers(this.players);

      expect(rounds).to.have.lengthOf(1);

      round = rounds[0];
      //await round.reload({ all: true, nested: true })

      expect(round.tournamentId).to.eql(this.tournament.id);

      matches = await round.getMatches()
      expect(matches).to.have.lengthOf(1);

      match = matches[0]

      //expect(await match.players()).to.have.members([this.greg, this.nick])
      players = await match.players()
      expect(players).to.have.lengthOf(2)
      expect(this.greg.equalsOneOf(players)).to.be.ok
      expect(this.nick.equalsOneOf(players)).to.be.ok
    });
  });

  context("tournament with seven players", function () {
    beforeEach(async function () {
      this.tournament = await Tournament.create({ name: "Tourney" })

      this.players = _.times(7, async () => {
        return await User.create({
          name: faker.name.firstName(),
          email: faker.internet.email()
        })
      });
    });

    afterEach(async function () {
      // clean up
      await this.tournament.destroy()
      await User.destroy({ truncate: true })
      await Round.destroy({ truncate: true })
      await Match.destroy({ truncate: true })
    });

    specify("create a four rounds", async function () {
      const service = new SetupTournamentService(this.tournament);
      const rounds = await service.createRoundsForPlayers(this.players);

      // 7 => 4 => 2 => 1
      expect(rounds).to.have.lengthOf(3);

      const round_1 = rounds[0]
      expect(round_1).to.have.property('number', 1)
      const round_1_matches = await round_1.getMatches()
      expect(round_1_matches).to.have.lengthOf(4)

      const round_2 = rounds[1]
      expect(round_2).to.have.property('number', 2)
      const round_2_matches = await round_2.getMatches()
      expect(round_2_matches).to.have.lengthOf(2)

      const round_3 = rounds[2]
      expect(round_3).to.have.property('number', 3)
      const round_3_matches = await round_3.getMatches()
      expect(round_3_matches).to.have.lengthOf(1)
    });
  });
});

describe("createRoundsForPlayers() with round robin tourney", function () {
  context("tournament with two players", function () {
    beforeEach(async function () {
      this.tournament = await Tournament.create({ name: "Test Tourney", type: ROUND_ROBIN })

      this.greg = await User.create({ name: "Greg", email: 'greg@example.com' })
      this.nick = await User.create({ name: "Nick", email: 'nick@example.com' })

      this.players = [this.greg, this.nick]
    });

    afterEach(async function () {
      // clean up
      await this.tournament.destroy()
      await this.greg.destroy()
      await this.nick.destroy()
    });

    specify("create a single round and match", async function () {
      service = new SetupTournamentService(this.tournament);
      rounds = await service.createRoundsForPlayers(this.players);

      expect(rounds).to.have.lengthOf(1);

      round = rounds[0];
      //await round.reload({ all: true, nested: true })

      expect(round.tournamentId).to.eql(this.tournament.id);

      matches = await round.getMatches()
      expect(matches).to.have.lengthOf(1);

      match = matches[0]

      //expect(await match.players()).to.have.members([this.greg, this.nick])
      players = await match.players()
      expect(players).to.have.lengthOf(2)
      expect(this.greg.equalsOneOf(players)).to.be.ok
      expect(this.nick.equalsOneOf(players)).to.be.ok
    });
  });

  context("tournament with seven players and cutoff of 4", function () {
    beforeEach(async function () {
      this.tournament = await Tournament.create({ name: "Robin w  7 Tourney", type: ROUND_ROBIN, playoffCutoff: 4 })

      this.players = await Promise.all(_.times(7, async () => {
        const user = await User.create({
          name: faker.name.firstName(),
          email: faker.internet.email()
        })
        return user
      }));
    });

    afterEach(async function () {
      // clean up
      await this.tournament.destroy()
      await User.destroy({ truncate: true })
      await Round.destroy({ truncate: true })
      await Match.destroy({ truncate: true })
    });

    specify("create a nine total rounds", async function () {
      const service = new SetupTournamentService(this.tournament);
      const rounds = await service.createRoundsForPlayers(this.players);
      // 6  rounds + (4 players => 2 players => 1) == 8 total rounds, 6 robin and 2 elimination
      // console.log('rounds', rounds.map(async (round) => {
      //   const matches = await round.getMatches()
      //   console.log(`round ${round.number}`, matches)
      // }))

      expect(rounds).to.have.lengthOf(9);
      const lastRoundMatches = await rounds[rounds.length - 1].getMatches()
      expect(lastRoundMatches).to.have.lengthOf(1)
    });
  });
});
