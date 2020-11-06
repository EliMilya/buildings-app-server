const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

// Options for passport.
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt,
};


// Function to protect routes.
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async function (jwt_payload, done) {
      try {
        const user = await User.findById(jwt_payload.userId).select("email id");

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (e) {
        console.log(e);
      }
    })
  );
};
