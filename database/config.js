require('dotenv').config({
  path: process.env.NODE_ENV === 'development' ? '.env.development' : 
        process.env.NODE_ENV === 'test' ? '.env.test' : 
        '.env.production'
});

const getDatabaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return `${process.env.DB_CONNECTION_DEV}://` +
           `${process.env.DB_USERNAME_DEV}:${process.env.DB_PASSWORD_DEV}` +
           `@${process.env.DB_HOST_DEV}:${process.env.DB_PORT_DEV}` +
           `/${process.env.DB_DATABASE_DEV}`;
  }
  if (process.env.NODE_ENV === 'test') {
    return `${process.env.DB_CONNECTION_TEST}://` +
           `${process.env.DB_USERNAME_TEST}:${process.env.DB_PASSWORD_TEST}` +
           `@${process.env.DB_HOST_TEST}:${process.env.DB_PORT_TEST}` +
           `/${process.env.DB_DATABASE_TEST}`;
  }
  if (process.env.NODE_ENV === 'production') {
    return `${process.env.DB_CONNECTION_PROD}://` +
          `${process.env.DB_USERNAME_PROD}:${process.env.DB_PASSWORD_PROD}` +
          `@${process.env.DB_HOST_PROD}:${process.env.DB_PORT_PROD}` +
          `/${process.env.DB_DATABASE_PROD}`;
  }
  return process.env.DATABASE_URL;
};

module.exports = {
  development: {
    use_env_variable: getDatabaseUrl(),
    username: process.env.DB_USERNAME_DEV,
    password: process.env.DB_PASSWORD_DEV,
    database: process.env.DB_DATABASE_DEV,
    host: process.env.DB_HOST_DEV,
    port: process.env.DB_PORT_DEV,
    dialect: process.env.DB_CONNECTION_DEV,
    syncMatchPattern: '.*',
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
    pool: {
      max: 5,
      idle: 30000,
      acquire: 60000,
    },
    logging: false  // Disable logging for development
  },

  test: {
    use_env_variable: getDatabaseUrl(),
    username: process.env.DB_USERNAME_TEST,
    password: process.env.DB_PASSWORD_TEST,
    database: process.env.DB_DATABASE_TEST,
    host: process.env.DB_HOST_TEST,
    port: process.env.DB_PORT_TEST,
    dialect: process.env.DB_CONNECTION_TEST,
    syncMatchPattern: '.*',

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
    pool: {
      max: 5,
      idle: 30000,
      acquire: 60000,
    },
    logging: true  // Disable logging for tests
  },

  production: {
    use_env_variable: getDatabaseUrl(),
    username: process.env.DB_USERNAME_PROD,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_DATABASE_PROD,
    host: process.env.DB_HOST_PROD,
    port: process.env.DB_PORT_PROD,
    dialect: process.env.DB_CONNECTION_PROD,
    syncMatchPattern: '.*',

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
    pool: {
      max: 5,
      idle: 30000,
      acquire: 60000,
    },
    logging: false  // Disable logging for production
  },
};

