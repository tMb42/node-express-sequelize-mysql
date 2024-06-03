'use strict';

const process = require('process');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../database/config.js')[env];
const db = {};


let sequelize;
if (config.use_env_variable) {
  const dbUrl = config.use_env_variable;
  console.log(`Using database URL from environment variable: ${dbUrl}`);
  if (!dbUrl) {
    throw new Error(`Environment variable ${config.use_env_variable} is not defined`);
  }
  sequelize = new Sequelize(dbUrl, {
    ...config,
    logging: config.logging  // Use logging setting from config
  });
} else {
  console.log(`Using database configuration directly from config file.`);
  sequelize = new Sequelize(
    config.database, 
    config.username, 
    config.password, 
    {
      ...config,
      logging: config.logging  // Use logging setting from config
    }
  );
}

// Debug: Verify sequelize instance creation
console.log("Sequelize instance created:", sequelize);

const matchPattern = config.syncMatchPattern || '.*'; // Default to match all models if not specified

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1 &&
      new RegExp(matchPattern).test(file) // Filter models based on the match pattern
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
