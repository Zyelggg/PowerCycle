const clientid = "693946122370-978e7dsvp7s89p2o0peeq8c4k1gek19v.apps.googleusercontent.com";
const clientsecret = "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";
const passport=  require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.use(
	new GoogleStrategy(
	  {
		clientID: clientid,
		clientSecret: clientsecret,
		callbackURL: "/auth/google/callback",
	  },
		function (accessToken, refreshToken, profile, cb,done) {
			// User.findOrCreate({ googleId: profile.id }, function (err, user) {
			// 	return cb(err, user);
			// })
			done(null, profile);
		}
	));
	passport.serializeUser((user, done) => {
		done(null, user);
	  });
	  
	  passport.deserializeUser((user, done) => {
		done(null, user);
	  }); 

