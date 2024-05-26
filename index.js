require('dotenv').config();
require('colors');
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models/index.js');
const config = require('./config/config.js');
const syncMatchPattern = new RegExp(config.syncMatchPattern);
const routerIndex = require('./routes/index.js');
const jsonWebToken = require('./middleware/VerifyJwtToken');
const cors =require('cors');

const app = express();


// app.use(bodyParser.json());
app.use(express.json());

//Fix cors error
app.use(cors({
  origin: "http://localhost:4200"     
  })
);

//Routes  
app.use('/api', routerIndex); // use the consolidated router

// Middleware
app.use(jsonWebToken);

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
