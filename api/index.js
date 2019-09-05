import config from 'dotenv-flow'
import express from 'express'
import cookieSession from 'cookie-session'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import PassportUtil from '../api/server/utils/passport'

import userRoutes from './server/routes/user_routes'
import accountRoutes from './server/routes/account_routes'
import categoryRoutes from './server/routes/category_routes'

config.config()

const app = express()

app.use(cookieSession({
   name: 'session',
   keys: ['_ythrift_session_'],
 
   // Cookie Options
   maxAge: 24 * 60 * 60 * 1000 * 7 // one week
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
if (process.env.NODE_ENV !== 'test') {
   app.use(morgan('combined'))
}

app.use(express.static('public'))

const passportUtil = new PassportUtil(app)

const port = process.env.PORT

app.use('/api/v1/users', passportUtil.loggedIn, userRoutes)
app.use('/api/v1/account', passportUtil.loggedIn, accountRoutes)
app.use('/api/v1/categories', passportUtil.loggedIn, categoryRoutes)

// when a random route is inputed
app.get('/api', (req, res) => res.status(200).send({
   message: 'Welcome to this API.'
}))

app.listen(port, () => {
   console.log(`Server is running on PORT ${port}`)
})

export default app;