const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require('./models/User.model');

const GOOGLE_CLIENT_ID =
  '936319412824-72e9mboja1ej930qbhhhi4iaoeeie37s.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async function (accessToken, refreshToken, profile, done) {
      const user = await User.findOrCreate({
        where: { id: profile.id.toString(), name: profile.displayName },
        raw: true,
      });
      if (!user) {
        return done(null, false, { message: 'No User Found' });
      }
      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user[0].id);
});

passport.deserializeUser((userId, done) => {
  User.findByPk(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((done) => {
      console.log(done);
    });
});
