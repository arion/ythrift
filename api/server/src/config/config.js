module.exports = {

  // If using onine database
  // development: {
  //   use_env_variable: 'DATABASE_URL'
  // },

  development: {
    database: 'ythrift_development',
    username: 'postgres',
    password: null,
    host: '127.0.0.1',
    dialect: 'postgres',
    // logging: false,
  },

  test: {
    database: 'ythrift_test',
    username: 'postgres',
    password: null,
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false,
  },

  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  }
};