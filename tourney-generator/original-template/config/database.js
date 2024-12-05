const base = {
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
}

module.exports = {
  development: {
    ...base,
    database: 'tourney_development'
  },

  test: {
    ...base,
    database: 'tourney_test',
    logging: () => {} // no logging
  },

  production: {
    ...base,
    database: 'tourney_production'
  }
}
