const _ = require('lodash');
const models = require('../models')

module.exports = class TournamentBracketTableBuilder {
  constructor(tournament) {
    this.tournament = tournament;
  }

  /**
   * TODO - Accommidate the non-tree structure of a RoundRobin set of rounds!
   * Could align in a big grid, so would probably be easier than this pseudo-transposing. :)
   * Would need to figure out the best way for a table of RoundRobin games to sit next to the elimination round playoff tournament.
   */

  // Pseudo-transpose the tree of rounds/matches into a 2D array that can be
  // dummly translated into a <table> with rowspan, in order to render the
  // tournament bracket.
  //
  // It's worth noting that this means for Rounds 2 and above, we will "hop"
  // over w^n rows when inserting the cell into our matrix, due to how
  // rowspan works.
  async buildRowsAndCells() {
    await this.prefetchAssociations()
    const rows = [];

    // 1-indexed
    const columns = {}

    const rounds = this.tournament.rounds
    for (let round of rounds) {

      let matches = round.matches

      // consistently order and align with future brackets
      matches = _.sortBy(matches, ['nextMatchId', 'id'])

      const j = round.number - 1
      for (let i = 0; i < matches.length; i++) {
        const match = matches[i]
        const rowspan = Math.pow(2, j)

        const cell = {
          match: match,
          rowspan: rowspan
        }

        if (!rows[i * rowspan]) rows[i * rowspan] = []
        rows[i * rowspan][j] = cell
      }
    }

    return rows
  }

  async prefetchAssociations() {
    await this.tournament.reload({
      include: [{
        model: models.Round,
        as: 'rounds',

        include: [{
          model: models.Match,
          as: 'matches',

          include: [{
            model: models.User,
            as: 'homeUser'
          }, {
            model: models.User,
            as: 'awayUser'
          }]
        }]
      }]
    })
  }
}
