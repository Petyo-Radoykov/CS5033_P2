// The CONTROLLER of the system

/*#######################
# IMPORT THE MODULES    #
########################*/

// External packges used
////////////////////////
var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var morgan      = require('morgan');


// Modules and files developed for the specific software system.
////////////////////////////////////////////////////////////////
// The configuration file.
var config = require('./config'); 


// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// use morgan to log requests to the console
app.use(morgan('dev'));

// add a public directory to serve pages from
app.use(express.static('pages'));

// The REST API
// Not Secured
var router_welcome = require('./routes/welcome');
var router_authenticate = require('./routes/authenticate');

// The authentication
var router_middleware = require('./Authentication/middleware');

// The REST API
// Secured
var router_users = require('./routes/user');
var router_user_id = require('./routes/user_id');
var router_booking = require('./routes/booking');
var router_booking_id = require('./routes/booking_id');
var router_user_id_booking_id = require('./routes/user_id_booking_id');
var router_booking_avl = require('./routes/availibility');
var router_record = require('./routes/record');
var router_test = require('./routes/test');




/*#######################
# SET THE SERVER        #
########################*/
// Connects to the database.
mongoose.connect(config.database);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setting the post to 8080
var port = process.env.PORT || 8080;        



/*#######################
# REGISTER THE REST API #
########################*/		
// all of our routes will be prefixed with /api
app.use('/api', router_welcome);
app.use('/api', router_authenticate);

app.use('/api', router_users);

app.use('/api', router_middleware);


app.use('/api', router_user_id);
app.use('/api', router_booking);
app.use('/api', router_booking_id);
app.use('/api', router_user_id_booking_id);
app.use('/api', router_booking_avl);
app.use('/api', router_record);
app.use('/api', router_test);

/*##################
# START THE SERVER #
##################*/
app.listen(port);
console.log('The server could be accessed at http://localhost:' + port);





