'use strict';

const _ = require('lodash');
const models = require('../models');
const { SINGLE_ELIM, ROUND_ROBIN } = require('./constants');
const { max } = require('pg/lib/defaults');
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
    // Tourney type is not required to support legacy models, and if a round robin is already below it's playoff threshold,
    // we will continue as if this is single elimination.
    const legacyTournamentType = this.tournament.type === null
    const roundRobinBelowPlayoffThreshold = this.tournament.playoffCutoff > players.length
    if (this.tournament.type === SINGLE_ELIM || legacyTournamentType || roundRobinBelowPlayoffThreshold) {
      const firstRound = await this.createFirstRound(players)
      const rounds = [firstRound]

      let round = firstRound

      let matches;
      while (true) {
        matches = await round.getMatches()
        if (matches.length <= 1) break

        const nextRound = await this.createNextRound(round)
        rounds.push(nextRound)

        round = nextRound
      }

      return rounds
    } else if (this.tournament.type === ROUND_ROBIN) {
      // We could have the playoff threshold, or we could not ... if not, will be round robin the whole way.
      // We will default to a maximum of ten rounds with "randomized" pairing, but this could be configurable later!
      const MAX_ROUNDS = 10
      const { playoffCutoff } = this.tournament
      const firstRound = await this.createFirstRound(players)
      const rounds = [firstRound]

      let currentRound = firstRound
      let matches

      // Each player should match against each other player, but if there are an odd number of players we need an extra round to
      // account for bye weeks
      const oddNumberOfPlayers = players.length % 2 === 1
      const maximumRobinRounds = oddNumberOfPlayers ? players.length : players.length - 1
      // Go through the robin rounds first
      for (let i = 1; i < maximumRobinRounds; i++) {
        const nextRound = await this.createNextRoundRobin(currentRound, MAX_ROUNDS)
        rounds.push(nextRound)

        currentRound = nextRound
      }

      // Then generate the remaining rounds as single elimination
      while (true) {
        matches = await currentRound.getMatches()
        if (matches.length <= 1) break

        const nextRound = await this.createNextRound(currentRound)
        rounds.push(nextRound)

        currentRound = nextRound
      }

      return rounds
    } else {
      // Unsupported tournament type found
      throw new Error('Found unsupported Tourney type: ', this.tournament.type)
    }
  }

  async createFirstRound(players) {
    const round = await this.tournament.createRound({
      number: 1
    })

    const pairings = _.chunk(players, 2)
    for (let pair of pairings) {
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
    for (let pair of pairings) {
      const match = await round.createMatch()
      for (let lastMatch of pair) {
        await lastMatch.update({ nextMatchId: match.id })
      }
    }

    return round;
  }

  /**
   * GOAL here is to align our matches as two array, one for home and one for away.
   * If we keep the first element of the first array fixed, and rotate the rest of the elements,
   * we whould end up with a unique pairing for the new round, where the pairs are array[0][0] vs array[1][0], etc.
   * source: https://denegames.ca/tournaments/index.html#:~:text=To%20determine%20the%20number%20of,30%2F2%20%3D%2015%20games.
   * Note: this results in 1 always being the "home team", but getting a better algorithm is outside the scope of my day!
   *
   * Example ->
   matches of (1 vs 4), (2 vs 5) and (3 vs 6)
   * [
   *  [1 ,2 ,3],
   *  [4, 5, 6]
   * ]
   * would rotate to
   matches of (1 vs 5), (4 vs 6) and (2 vs 3)
   * [
   * [1, 4, 2],
   * [5, 6, 3]
   * ]
   */
  // TODO - pulling this out into a unit test would be great, but likely needs some mocking for our round models.
  async createNextRoundRobin(lastRound, maxRounds) {
    if (lastRound.number + 1 > maxRounds) {
      return lastRound
    }

    const lastMatches = await lastRound.getMatches()
    const round = await this.tournament.createRound({
      number: lastRound.number + 1
    })

    // TODO - the top-level array is actually not necessary, we can just use the "home" and "away" arrays
    // Create inital 2D array model
    const oldMatchesArray = [[], []]
    lastMatches.forEach((match) => {
      oldMatchesArray[0].push(match.homeUserId)
      oldMatchesArray[1].push(match.awayUserId)
    })

    // Rotate elements other than the first
    const firstAwayTeam = oldMatchesArray[1].shift()
    const newHomeTeams = [oldMatchesArray[0][0], firstAwayTeam, ...oldMatchesArray[0].slice(1, -1)]
    const newAwayTeams = [...oldMatchesArray[1].slice(1), oldMatchesArray[0][oldMatchesArray[0].length - 1]]
    const newMatchesArray = [newHomeTeams, newAwayTeams]

    // Finally, we generate new matches for each of our new pairings
    for (let i = 0; i < newHomeTeams.length; i++) {
      const homeUserId = newHomeTeams[i]
      const awayUserId = newHomeTeams[i]
      await round.createMatch({
        homeUserId,
        awayUserId
      })
    }

    return round;
  }
}
