const express = require('express');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler.middleware');
const { sequelize, connectToDb } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/nodeweb', routes);
app.use(errorHandler);

const port = process.env.PORT || 7000;

app.listen(port, async () => {
	console.log(`I am listening on port ${port}`);
	await connectToDb();
});
