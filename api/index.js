import config from 'dotenv-flow';
import express from 'express'
import bodyParser from 'body-parser';
import morgan from 'morgan'
import PassportUtil from '../api/server/utils/passport';
import userRoutes from './server/routes/user_routes'

config.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
if (process.env.NODE_ENV !== 'test') {
   app.use(morgan('combined'));
}

const passportUtil = new PassportUtil(app);

const port = process.env.PORT;

app.use('/api/v1/users', passportUtil.loggedIn, userRoutes);

// when a random route is inputed
app.get('/api', passportUtil.loggedIn, (req, res) => res.status(200).send({
   message: 'Welcome to this API.'
}));

app.listen(port, () => {
   console.log(`Server is running on PORT ${port}`);
});

export default app;