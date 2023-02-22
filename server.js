const express        = require('express');
const bodyParser     = require('body-parser');
// const validator = require('validator');
// const bcrypt = require('bcryptjs');
const db             = require('./config/db');
const app            = express();
const indexRoute = require('./routes/index');
require('dotenv').config();
const port = 8000;

// db.connection();
db.createConnecton();

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/myapi', indexRoute);

app.listen(port, () => {
  console.log('We are live on ' + port);
});  


