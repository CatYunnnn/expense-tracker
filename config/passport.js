const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const userList = require("../models/user");
module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(
    new LocalStrategy({ usernameField: "name" }, (name, password, done) => {
      userList
        .findOne({ name })
        .then((user) => {
          if (user) {
            console.log("find successful");
          }
          if (!user) {
            console.log("not yet");
            return done(null, false, {
              message: "This user haven't registered yet!",
            });
          }
          return bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch) {
              return done(null, false, {
                message: "Password incorrect!",
              });
            }
            return done(null, user);
          });
        })
        .catch((err) => done(err, false));
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    userList
      .findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((err) => done(err, null));
  });
};
