require('dotenv').config();
require('colors');
const express = require('express');
const { sequelize } = require('./models/index.js');
const config = require('./database/config.js');
const syncMatchPattern = new RegExp(config.syncMatchPattern);
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


sequelize.sync({force: false, match: syncMatchPattern})  // use { force: true } for delete all table then create Or use { alter: true } to avoid dropping tables
.then(() => {
  console.log('Yes Re-Sync Database & tables created!'.bgGreen.black.italic.bold);
})
.catch(err => {
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