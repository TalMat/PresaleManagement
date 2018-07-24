let express =        require('express');
let bodyParser =     require('body-parser');
let path =           require('path');
let cors =           require('cors');
let mongoose =       require('mongoose');
let passport =       require('passport');
let passportConfig = require('./config/passport')(passport);
let session =        require('express-session');
let MongoDBStore =   require('connect-mongodb-session')(session);
let flash =          require('express-flash');

let MONGO_URL = process.env.MONGO_URL;
let SESSION_SECRET = process.env.SESSION_SECRET;
mongoose.Promise = global.Promise;

app = express();

mongoose.connect(MONGO_URL)
    .then( () => {
        console.log('Connected to MongoDB using Mongoose.')
    })
    .catch( err => {
        console.log('Error connecting to MongoDB using Mongoose...');
        console.log(err);
    });

let store = new MongoDBStore( { uri: MONGO_URL, collection: 'sessions'}, function(err){
    if(err){
        console.log('Error, cannot connect to MongoDB to store sessions', err);
    }
});


app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store
}));


app.use( passport.initialize() );
app.use( passport.session() );
app.use( flash() );
app.use( cors() );
app.use( bodyParser.json() );
app.use( bodyParser.text() );
app.use( bodyParser.urlencoded({ extended: true }) );

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/app', express.static(path.join(__dirname, 'app')));

app.use('/api', require('./api/api.js'));
app.use('/', require('./routes.js'));

// 404 - catch and forward
// app.use(function(req, res, next) {
//     let err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.send(err);
//     // res.render('error');
// });

module.exports = app;