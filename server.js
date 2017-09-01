// load environment properties from a .env file for local development
require('dotenv').load({ silent: true });


const app = require('./app.js');

const port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;

// Deployment tracking
require('cf-deployment-tracker-client').track();

app.listen(port);
console.log('listening at:', port); // eslint-disable-line
