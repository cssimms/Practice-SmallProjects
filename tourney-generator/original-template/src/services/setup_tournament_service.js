'use strict';

const _ = require('lodash');
const models = require('../models');
const User = models.User;
const Round = models.Round;

module.exports = class SetupTournamentService {
  constructor(tournament) {
    this.tournament = tournament;
  }

  testThing() {
    return new User().testFn();
  }

  async createRoundsForPlayers(players) {
    const firstRound = await this.createFirstRound(players)
    const rounds = [firstRound]

    let round = firstRound

    let matches;
    //while((matches = await round.getMatches()).length > 1) {
    while(true) {
      matches = await round.getMatches()
      if(matches.length <= 1) break

      const nextRound = await this.createNextRound(round)
      rounds.push(nextRound)

      round = nextRound
    }

    return rounds
  }

  async createFirstRound(players) {
    const round = await this.tournament.createRound({
      number: 1
    })

    const pairings = _.chunk(players, 2)
    for(let pair of pairings) {
      const [homeUserId, awayUserId] = pair.map((p) => p.id)

      await round.createMatch({
        homeUserId,
        awayUserId
      })
    }

    return round
  }

  async createNextRound(lastRound) {
    const lastMatches = await lastRound.getMatches()

    const round = await this.tournament.createRound({
      number: lastRound.number + 1
    })

    const pairings = _.chunk(lastMatches, 2)
    for(let pair of pairings) {
      const match = await round.createMatch()
      for(let lastMatch of pair) {
        await lastMatch.update({nextMatchId: match.id})
      }
    }

    return round;
  }
}
