var restify     =   require('restify');
var mongojs     =   require('mongojs');
var morgan      =   require('morgan');

// Connection to DB: 1) Internal Mongo db, 2) External MongoLab db
//var db          =   mongojs('baseApp', ['appUsers','baseAppLists']);
var db          =   mongojs('mongodb://admin:password@ds051848.mongolab.com:51848/baseapp', ['appUsers','baseAppLists']);

var server      =   restify.createServer();
 
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(morgan('dev')); // LOGGER
 
// CORS
server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
 
server.listen(process.env.PORT || 9804, function () {
    console.log("Server started @ ",process.env.PORT || 9804);
});

// Js files to db collections links
var manageUsers = require('./auth/manageUser')(server, db);
var manageLists =   require('./baseAppList/manageBaseAppList')(server, db);