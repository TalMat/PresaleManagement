var LocalStrategy = require('passport-local');
var User = require('../models/user');


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
        passReqToCallback: true
    }, function(req, username, password, done){

        //https://nodejs.org/api/process.html#process_process_nexttick_callback_arg
        //Once the current event loop turn runs to completion, call the callback function.
        process.nextTick(function(){

            //Query DB to see if there is already a user with this username
            User.findOne({ 'local.username' : username }, function(err, user){
                if (err) { return done(err); }
                if (user) {
                    return done(null, false, req.flash('signupMsg', 'This username is taken'));
                }

                //If no user, create new User, set username, and hash of password
                var newUser = new User();
                newUser.local.username = username;
                newUser.local.password = newUser.generateHash(password);
                //And save. If no errors, return new User
                newUser.save(function(err){
                    if (err) { return done(err); }
                    return done(null, newUser);
                });
            });
        });
    }));



    // User login
    passport.use('local-login', new LocalStrategy({
        usernameField:'username',
        passwordField:'password',
        passReqToCallback: true
    }, function(req, username, password, done) {

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