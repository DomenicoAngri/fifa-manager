/*******************************
 * Modules requirements
 ********************************/
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./configs/routes');
const cors = require('cors');
const path = require('path');

// TODO - Add documentations on every functions.
// TODO - Review all console log for clear events description.
// TODO - Handle cache for all entire app.

// Dotenv current environment.
if(process.env.NODE_ENV === 'production'){
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
//app.use(cors());

// Middleware for initialize bodyParser for JSON.
app.use(bodyParser.json());

// ... Other app.use middleware 
// app.use(express.static(path.join(__dirname, "frontend", "build")));
app.use(express.static(path.join(__dirname, "frontend")));

// This router will take all request, get and post, for every addresses.
app.use('/api', router);

/*******************************
 * Others
 ********************************/

// DB connection.
mongoose.connect(process.env.MONGODB_URI);

// if(process.env.ENV === 'local'){
//   mongoose.connect(process.env.MONGODB_PATH);
// }
// else if(process.env.ENV === 'dev'){
//   mongoose.connect(process.env.MONGODB_PATH,{
//     user: process.env.MONGODB_USER,
//     pass: process.env.MONGODB_PASS
//   });
// }
// else{
//   mongoose.connect(process.env.MONGODB_PATH_PROD,{
//     user: process.env.MONGODB_USER,
//     pass: process.env.MONGODB_PASS
//   });  
// }

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

// Port app listen for CR7.
app.listen(process.env.PORT || 7100);