const { expect } = require('chai');
const sinon = require('sinon');

const TournamentBracketTableBuilder = require('../../src/services/tournament_bracket_table_builder')

describe("TournamentBracketTableBuilder#buildRowsAndCells", () => {
  context("a 4 player, single eliminiation tournament", () => {
    // create stub data
    beforeEach(() => {
      this.match_1_1 = { id: 1, nextMatchId: 5 }
      this.match_1_2 = { id: 2, nextMatchId: 5 }
      this.match_1_3 = { id: 3, nextMatchId: 6 }
      this.match_1_4 = { id: 4, nextMatchId: 6 }

      this.round_1 = {
        number: 1,
        matches: [
          this.match_1_1,
          this.match_1_2,
          this.match_1_3,
          this.match_1_4,
        ]
      }

      this.match_2_1 = { id: 5, nextMatchId: 7 }
      this.match_2_2 = { id: 6, nextMatchId: 7 }

      this.round_2 = {
        number: 2,
        matches: [
          this.match_2_1,
          this.match_2_2,
        ]
      }

      this.match_3_1 = { id: 7, nextMatchId: null }

      this.round_3 = {
        number: 3,
        matches: [
          this.match_3_1,
        ]
      }

      this.tournament = {
        rounds: [
          this.round_1,
          this.round_2,
          this.round_3
        ]
      }
    })

    specify("build a 4 player bracket", async () => {
      const svc = new TournamentBracketTableBuilder(this.tournament)
      sinon.stub(svc, 'prefetchAssociations')

      const result = await svc.buildRowsAndCells()

      expect(result).to.eql([
        // First Row
        [
          { match: this.match_1_1, rowspan: 1 },
          { match: this.match_2_1, rowspan: 2 },
          { match: this.match_3_1, rowspan: 4 },
        ],

        // Second Row
        [
          { match: this.match_1_2, rowspan: 1 },
        ],

        // Third Row
        [
          { match: this.match_1_3, rowspan: 1 },
          { match: this.match_2_2, rowspan: 2 },
        ],

        // Forth Row
        [
          { match: this.match_1_4, rowspan: 1 },
        ],
      ]);
    });
  })
})
