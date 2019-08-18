import config from 'dotenv';
import express from 'express'
import bodyParser from 'body-parser';
import morgan from 'morgan'

import userRoutes from './server/routes/user_routes'

config.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));

const port = process.env.PORT || 8000;

app.use('/api/v1/users', userRoutes);

// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
   message: 'Welcome to this API.'
}));

app.listen(port, () => {
   console.log(`Server is running on PORT ${port}`);
});

export default app;