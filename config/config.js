require('dotenv').config(); // Load existing environment variables

module.exports = {
  development: {
    username: process.env.DB_USERNAME_DEV,
    password: process.env.DB_PASSWORD_DEV,
    database: process.env.DB_DATABASE_DEV,
    host: process.env.DB_HOST_DEV,
    port: process.env.DB_PORT_DEV,
    dialect: process.env.DB_CONNECTION_DEV,
    syncMatchPattern: '.*',                 // Match all models in test environment
    define: {
      underscored: true,
      freezeTableName: false,
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci'
      },
      timestamps: false
    },
    timezone: '+05:30',

    forceSync: false,
    alterSync: false,

    pool: {
      max: 5,
      idle: 30000,
      acquire: 60000,
    },
    logging: false  // Disable logging for development
  },

  test: {
    username: process.env.DB_USERNAME_TEST,
    password: process.env.DB_PASSWORD_TEST,
    database: process.env.DB_DATABASE_TEST,
    host: process.env.DB_HOST_TEST,
    port: process.env.DB_PORT_TEST,
    dialect: process.env.DB_CONNECTION_TEST,
    syncMatchPattern: '.*',                 // Match all models in test environment

    define: {
      underscored: true,
      freezeTableName: false,
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci'
      },
      timestamps: false
    },
    timezone: '+05:30',

    forceSync: true,
    alterSync: false,

    pool: {
      max: 5,
      idle: 30000,
      acquire: 60000,
    },
    logging: false  // Disable logging for tests
  },

  production: {
    username: process.env.DB_USERNAME_PROD,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_DATABASE_PROD,
    host: process.env.DB_HOST_PROD,
    port: process.env.DB_PORT_PROD,
    dialect: process.env.DB_CONNECTION_PROD,
    syncMatchPattern: '.*',                   // Example: Match specific models in production

    define: {
      underscored: true,
      freezeTableName: false,
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci'
      },
      timestamps: false
    },
    timezone: '+05:30',

    forceSync: false,
    alterSync: true,
    pool: {
      max: 5,
      idle: 30000,
      acquire: 60000,
    },
    logging: false  // Disable logging for production
  },
};

