// load environment properties from a .env file for local development
require('dotenv').config();
const app = require('./app.js');

const port = process.env.PORT || 3000;

app.listen(port);
console.log('listening at:', port); // eslint-disable-line
