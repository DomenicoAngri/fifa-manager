/*******************************
 * Modules requirements
 ********************************/
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./server/configs/routes');
const cors = require('cors');

// TODOPOST - Add documentations on every functions.
// TODOPOST - Review all console log for clear events description.

// TODO - Capire perchè al refresh, in qualsiasi pagina mi trovi, torna alla login e poi se loggati, alla dashboard.

// Dotenv current environment.
if(process.env.ENV === 'production'){
    require('dotenv').config({path: '.env.production'});
}
else{
    require('dotenv').config({path: '.env'});
}

/*******************************
 * Initialize
 ********************************/
const app = express();

// TODO - Config cors for future production environment.
app.use(cors());

// Middleware for initialize bodyParser for JSON.
app.use(bodyParser.json());

// This router will take all request, get and post, for every addresses.
app.use('/api', router);

/*******************************
 * Others
 ********************************/

// DB connection.
if(process.env.ENV === 'local'){
  mongoose.connect(process.env.MONGODB_PATH_LOCAL);
}
else if(process.env.ENV === 'dev'){
  mongoose.connect(process.env.MONGODB_PATH_DEV,{
    user: process.env.MONGODB_USER_DEV,
    pass: process.env.MONGODB_PASS_DEV
  });
}
else{
  mongoose.connect(process.env.MONGODB_PATH_PROD,{
    user: process.env.MONGODB_USER_PROD,
    pass: process.env.MONGODB_PASS_PROD
  });  
}

// Port app listen for CR7.
app.listen(7100);