const serializeUser = (user, done) => {
  // returns user data to be serialized into session
  done(null, user);
};

module.exports = serializeUser;
