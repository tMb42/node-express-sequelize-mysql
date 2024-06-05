require('dotenv').config();
require('colors');
const express = require('express');
const { sequelize } = require('./models/index.js');
const config = require('./config/config.js');
const routerIndex = require('./routes/index.js');
const cors =require('cors');
const path = require('path');

const app = express();

/// Serve static files from the "assets" directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));


app.use(express.json());

//Fix cors error
app.use(cors({
  origin: process.env.FRONT_APP     
  })
);

//Routes  
app.use('/api', routerIndex); // use the consolidated router


sequelize.sync({
  force: config.forceSync || false, // Default to false if not specified
  alter: config.alterSync || false, // Default to false if not specified
  match: new RegExp(config.syncMatchPattern || '.*') // Default to match all models if not specified
}).then(() => {
  console.log('Yes Re-Sync Database & tables created!'.bgGreen.black.italic.bold);
}).catch(err => {
  console.error('error connecting: ' + err.stack.bgRed.white); 
});

app.get('/', (req, res) => {
  res.status(200).send("<h3>Welcome to My BackEnd App Node-Express-Sequelize-MySQL<h3>")
});

// SET App Server connection port
const port = process.env.APP_SERVER_PORT || 3000;

//Listen
app.listen(port, () => {
  console.log(`Express Server Running on port ${port} for NodeJs-Express-Sequelize-MySQL-API @tMb`.rainbow.italic.bgWhite.bold) // rainbow color
});