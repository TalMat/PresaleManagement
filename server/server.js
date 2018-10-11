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
let fs =                require('fs');
let nte =               require('./native-template-engine');

let configPath = path.join(__dirname, '../config.json');
fs.existsSync(configPath)
    ? setEnvVarsFromFile(configPath)
    : console.log(`No config file. Configuring ${__filename} with env vars.`);

function setEnvVarsFromFile(filepath){
    let config = JSON.parse(fs.readFileSync(filepath));
    Object.keys(config).forEach(key => {
        process.env[key] = config[key];
    });
}

let MONGO_URL = process.env.MONGO_URL;
let SESSION_SECRET = process.env.SESSION_SECRET;

mongoose.Promise = global.Promise;

app = express();

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB using Mongoose.')
    })
    .catch(err => {
        console.log('Error connecting to MongoDB using Mongoose...');
        console.log(err);
    });

app.engine('html', nte);
app.set('views', './views');
app.set('view engine', 'html');

// JS HTML template
app.use('/girlscouts', (req, res) => {
    res.render('order-page', {
        codeError: 'Redemption code is required',
        showValidation: false,
        formClasses: ''
    })
});

// Putting static before sessions prevents
// new sessions when serving static resources
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/app', express.static(path.join(__dirname, 'app')));

app.use(
    session({
        secret: SESSION_SECRET,
        saveUninitialized: true,
        resave: true,
        cookie: {
            maxAge: 1000 * 60 * 30,
            rolling: true
        },
        store: new MongoDBStore({ uri: MONGO_URL, collection: 'sessions' }, (err) => {
            err ? console.log('Error, cannot connect to MongoDB to store sessions', err)
                : console.log('Successfully connected to MongoDB to store sessions');
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
    console.log(err);
    res.render('404', { error: err });
});

module.exports = app;