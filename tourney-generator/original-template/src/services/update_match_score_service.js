const _ = require('lodash');
const models = require('../models')

module.exports = class UpdateMatchScoreService {
  constructor(match) {
    this.match = match
  }

  async update({homeScore, awayScore}) {
    await this.prefetchAssociations()

    await this.match.update({ homeScore, awayScore })

    const nextMatch = this.match.nextMatch;
    console.log('nextMatch', nextMatch)
    if(nextMatch) {
      if(isNaN(awayScore)) {
        await this.assignToNextMatch(this.match.homeUserId, nextMatch)
      } else if(isNaN(homeScore)) {
        await this.assignToNextMatch(this.match.awayUserId, nextMatch)
      } else if(homeScore > awayScore) {
        await this.assignToNextMatch(this.match.homeUserId, nextMatch)
      } else if(awayScore > homeScore) {
        await this.assignToNextMatch(this.match.awayUserId, nextMatch)
      }
    }
  }

  async assignToNextMatch(userId, nextMatch) {
    if(nextMatch.homeUserId) {
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
