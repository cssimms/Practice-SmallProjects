const _ = require('lodash');
const models = require('../models')

module.exports = class UpdateMatchScoreService {
  constructor(match) {
    this.match = match
  }

  /**
   *
   * TODO - need to update this to handle victories in the context of a RoundRobin tournament.
   * 1 - get the associated tourney
   * 2 - if tourney is RoundRobin:
   *     if round number is below our threshold (maximum 10 rounds, or enough rounds to face every player)
   *        skip assigning players to any future matches, just update the scores and move on
   *     if round number if above our threshold
   *        calculate standings based on previous matches - start with most number of wins (tie breaker would be TBD)
   *        determine top `playoffCutoff` (N) players, and assign those top N players to the next round. That round should
   *        already be created, but with empty userIds.
   *        then proceed as a regular single-elimination tournament.
   */
  async update({ homeScore, awayScore }) {
    await this.prefetchAssociations()

    await this.match.update({ homeScore, awayScore })

    const nextMatch = this.match.nextMatch;
    console.log('nextMatch', nextMatch)

    if (nextMatch) {
      if (isNaN(awayScore)) {
        await this.assignToNextMatch(this.match.homeUserId, nextMatch)
      } else if (isNaN(homeScore)) {
        await this.assignToNextMatch(this.match.awayUserId, nextMatch)
      } else if (homeScore > awayScore) {
        await this.assignToNextMatch(this.match.homeUserId, nextMatch)
      } else if (awayScore > homeScore) {
        await this.assignToNextMatch(this.match.awayUserId, nextMatch)
      }
    }
  }

  async assignToNextMatch(userId, nextMatch) {
    if (nextMatch.homeUserId) {
      console.log('winner is', userId)
      await nextMatch.update({ awayUserId: userId })
    } else {
      console.log('winner is', userId)
      await nextMatch.update({ homeUserId: userId })
    }
  }

  async prefetchAssociations() {
    await this.match.reload({ include: 'nextMatch' })
  }
}
