const express = require('express');

const app = express();
const router = express.Router();
const jade = require('jade');

const methodOverride = require('method-override');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const database_config = require('../config/database')[env];
const sequelize = new Sequelize(database_config);

const path = __dirname + "/views/";
const port = 8080;

const { User, Round, Match, Tournament } = require('./models');
const TournamentBracketTableBuilder = require('./services/tournament_bracket_table_builder');
const UpdateMatchScoreService = require('./services/update_match_score_service');

router.use(function (req, res, next) {
  console.log(req.method + ' ' + req.path);
  next();
});

router.get('/', function(req, res) {
  res.sendFile(path + 'index.html');
});

router.get('/users', function(req, res) {
  User.findAll().then(users => {
    console.log("All users:", JSON.stringify(users, null, 4));
  });

  res.send('ok');
});

router.get('/tournaments', async function(req, res) {
  const tournaments = await Tournament.findAll()
  res.render('tournaments/index', {
    tournaments
  });
})

router.get('/tournaments/:id', async function(req, res) {
  const tournament = await Tournament.findByPk(req.params.id)

  const svc = new TournamentBracketTableBuilder(tournament)
  const rowsAndCells = await svc.buildRowsAndCells()
  const rounds = await tournament.getRounds()

  res.render('tournaments/show', {
    tournament,
    rowsAndCells,
    rounds
  });
});

router.get('/matches/:id/edit', async function(req, res) {
  const match = await Match.findByPk(req.params.id, {
    include: ['homeUser', 'awayUser', {
      model: Round,
      as: 'round',
      include: 'tournament'
    }]
  })

  res.render('matches/edit', { match })
});

router.post('/matches/:id/results', async function(req, res) {
  const match = await Match.findByPk(req.params.id, {
    include: ['homeUser', 'awayUser', {
      model: Round,
      as: 'round',
      include: 'tournament'
    }]
  })

  let homeScore = parseInt(req.body.homeScore)
  let awayScore = parseInt(req.body.awayScore)

  const fail = function(error) {
    res.render('matches/edit', { match, error })
  }

  if(match.homeUser && isNaN(homeScore)) {
    return fail(`Please enter a score for ${match.homeUser.name}.`)
  }

  if(match.awayUser && isNaN(awayScore)) {
    return fail(`Please enter a score for ${match.awayUser.name}.`)
  }

  if(homeScore < 15 && awayScore < 15) {
    return fail('One player needs at least 15 points.')
  }

  if(Math.abs(homeScore - awayScore) < 2) {
    return fail('One player needs to win by 2 points.')
  }

  if(isNaN(homeScore)) homeScore = 0
  if(isNaN(awayScore)) awayScore = 0

  const svc = new UpdateMatchScoreService(match)
  await svc.update({ homeScore, awayScore })

  res.redirect(`/tournaments/${match.round.tournament.id}`)
})

app.use(express.static('public'));
app.use('/', router);

app.set('views', './src/views');
app.set('view engine', 'jade');


app.listen(port, function() {
  console.log('Listening to port '+ port);
});
