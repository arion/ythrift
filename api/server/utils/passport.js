import passport from 'passport'
import gAuth from 'passport-google-oauth2'
import database from '../src/models'

const GoogleStrategy = gAuth.Strategy
const { User } = database

export default class PassportUtil {
  constructor(app) {
    this.initGoogleStrategy();

    this.initMiddlware(app);

    this.initSerializer();
  }

  initGoogleStrategy() {
    passport.use(new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.SCHEME}://${process.env.HOST}/auth/google/callback`
      },
      this._processUser
    ));
  }

  initMiddlware(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/auth/google',
      passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get('/auth/google/callback', 
      passport.authenticate('google', { failureRedirect: '/' }),
      function(req, res) {
          // Successful authentication, redirect home.
          res.redirect('/');
      });

    app.get('/auth/logout', function(req, res){
      req.logout();
      res.redirect('/');
    });
  }

  initSerializer() {
    passport.serializeUser(function(user, done) {
      done(null, user);
    });
    
    passport.deserializeUser(function(user, done) {
      done(null, user);
    });
  }

  loggedIn(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.sendStatus(403);
    }
  }

  _processUser(token, tokenSecret, profile, done) {
    const where = { email: profile.email }

    const defaults = {
      username: profile.displayName,
      token: token, 
      provider: 'google' 
    }

    User.findOrCreate({ where, defaults })
    .spread(user => done(null, user))
    .catch(err => done(err, false))
  }
}
