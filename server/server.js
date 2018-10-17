let express =           require('express');
let bodyParser =        require('body-parser');
let path =              require('path');
let cors =              require('cors');
let mongoose =          require('mongoose');
let passport =          require('passport');
let passportConfig =    require('./config/passport')(passport);
let session =           require('express-session');
let MongoDBStore =      require('connect-mongodb-session')(session);
let flash =             require('express-flash');
let nte =               require('./native-template-engine');

// Populates env vars if config file is present
let config =            require('./util/env-config');
config.init('../config.json');

// Prints pipe-separated list of arguments followed by date and time
global.logTime = require('./util/logging').logTime;
global.log = console.log;

// Prints Node and Application versions
let displayAppInfo =       require('./util/display-info');
displayAppInfo();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        logTime('Mongoose connected (server.js)')
    })
    .catch(err => {
        logTime('Error connecting Mongoose (server.js)');
        log(err);
    });

app = express();
app.engine('html', nte);
app.set('views', './views');
app.set('view engine', 'html');

// JS HTML template
app.use('/', require('./form-routes'));

// Putting static before sessions prevents
// new sessions when serving static resources
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/app', express.static(path.join(__dirname, 'app')));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: true,
        resave: true,
        cookie: {
            maxAge: 1000 * 60 * 30,
            rolling: true
        },
        store: new MongoDBStore({ uri: process.env.MONGO_URL, collection: 'sessions' }, (err) => {
            err ? logTime('Error connecting MongoDB (sessions)')
                : logTime('MongoDB connected (sessions)');
        })
    })
);

app.use( passport.initialize() );
app.use( passport.session() );
app.use( flash() );
app.use( cors() );
app.use( bodyParser.json() );
app.use( bodyParser.text() );
app.use( bodyParser.urlencoded({ extended: true }) );

app.use('/api', require('./api.js'));
app.use('/', require('./routes.js'));

// 404 - catch and forward
app.use((err, req, res, next) => {
    logTime('Error: 404 page not found', `Original URL: ${req.originalUrl}`);
    log(err);
    res.render('404', { error: err });
});

process.on('uncaughtException', err => {
    logTime('Error: Uncaught error caused application crash');
    log(err);
    throw err;
});

module.exports = app;