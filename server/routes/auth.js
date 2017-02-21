const passport = require('passport'), LocalStrategy = require('passport-local');

const util = require('../util');


module.exports = (data, server) => {
  server.use(passport.initialize());
  server.use(passport.session());
  configurePassport();  

  return (routes) => {
    routes.post('/login',
      passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/',
        failureFlash: true,
      })
    );      

    return routes;
  };

  function configurePassport() {
    passport.use(new LocalStrategy(
      (username, password, done) => {        
        data.User.getUserByUsernameAndPassword({ username, password }).then((user) => {
          if (user !== null) {
            delete user.passwordHash;
            done(null, user);
          } else {
            done(null, false, { message: "Username and password combination could not be found" });
          }          
        }, error => {
          done(null, false, { message: "Error attempting to login" });
        });
      }
    ));

    passport.serializeUser((user, done) => {
      data.User.update({ _id: user._id }, user).then(() => {
        done(null, user.username);
      }, error => {
        done(null, false, { message: "Error serialialising user" });
      });
    });

    passport.deserializeUser((username, done) => {
      data.User.findOne({ username }).then(user => {
        delete user.password;
        done(null, user);
      }, error => {
        done(null, false, { message: "Error deserialialising user" });
      });    
    });
  }
};