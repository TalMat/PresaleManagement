let LocalStrategy = require('passport-local-roles');
let User = require('../models/user');


module.exports = function(passport) {

    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        })
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        roleField:     'role',
        passReqToCallback: true
    }, function(req, username, password, role, done){

        console.log(`User created: ${username} | Role: ${role}`);

        //Once the current event loop turn runs to completion, call the callback function.
        process.nextTick(function(){

            //Query DB to see if there is already a user with this username
            User.findOne({ 'local.username' : username }, function(err, user){
                if (err) { return done(err); }
                if (user) {
                    return done(null, false, req.flash('signupMsg', 'This username is taken'));
                }

                //If no user, create new User, set username, and hash of password
                let newUser = new User();
                newUser.local.username = username;
                newUser.local.password = newUser.generateHash(password);
                newUser.local.role = role;

                //And save. If no errors, return new User
                newUser.save(function(err){
                    if (err) { return done(err); }
                    return done(null, newUser);
                });

                req.user = newUser;
            });
        });
    }));

    // User login
    passport.use('local-login', new LocalStrategy({
        usernameField:'username',
        passwordField:'password',
        roleField:    'role',
        passReqToCallback: true
    }, function(req, username, password, role, done) {

        process.nextTick(function(){

            // Find the user with this username in DB
            User.findOne({ 'local.username':username }, function(err, user){
                if (err) { return done(err); }

                //If user not found, return error message
                if (!user) {
                    return done(null, false, req.flash('loginMsg', 'Username not found'));
                }

                // Check password - this method is defined in User model
                if (!user.validPassword(password)){
                    return done(null, false, req.flash('loginMsg', 'Password incorrect'));
                }

                // If no errors - username and password valid. Return callback with User object
                return done(null, user);
            });
        });
    }));
};