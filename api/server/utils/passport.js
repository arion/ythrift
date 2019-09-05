import passport from 'passport'
import gAuth from 'passport-google-oauth2'
import bearerAuth from 'passport-http-bearer'
import database from '../src/models'

import jwt from 'jsonwebtoken'

const GoogleStrategy = gAuth.Strategy
const BearerStrategy = bearerAuth.Strategy

const { User } = database

export default class PassportUtil {
  constructor(app) {
    this.initGoogleStrategy()
    this.initBearerStrategy()

    this.initMiddlware(app)

    this.initSerializer()
  }

  initGoogleStrategy() {
    passport.use(new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.SCHEME}://${process.env.HOST}/auth/google/callback`
      },
      (token, tokenSecret, profile, done) => {
        const where = { email: profile.email }
        const jwtToken = jwt.sign(where, process.env.JWT_SECRET) // week

        const defaults = {
          username: profile.displayName,
          token: token,
          jwtToken,
          provider: 'google' 
        }

        User.findOrCreate({ where, defaults })
          .spread(user => done(null, user))
          .catch(err => done(err, false))
      }
    ))
  }

  initBearerStrategy() {
    passport.use(new BearerStrategy(async (token, done) => {
        const user = await User.findOne({ where: { jwtToken: token } })
        if (user) {
          done(null, user)
        } else {
          return done(null, false)
        }
      })
    )
  }

  initMiddlware(app) {
    app.use(passport.initialize())
    app.use(passport.session())

    app.get('/auth/google',
      passport.authenticate('google', { scope: ['profile', 'email'] }))

    app.get('/auth/google/callback', 
      passport.authenticate('google', { failureRedirect: '/' }),
      function(req, res) {
          // Successful authentication, redirect home.
          res.redirect('/')
      })

    app.get('/auth/logout', function(req, res){
      req.logout()
      res.redirect('/')
    })
  }

  initSerializer() {
    passport.serializeUser(function(user, done) {
      done(null, user)
    })
    
    passport.deserializeUser(function(user, done) {
      done(null, user)
    })
  }

  loggedIn(req, res, next) {
    if (req.user) {
      next()
    } else {
      if (req.header('Authorization')) {
        passport.authenticate('bearer', { session: false })(req, res, next)
      } else {
        res.sendStatus(403)
      }
    }
  }
}
