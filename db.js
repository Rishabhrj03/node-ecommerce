const { Sequelize } = require('sequelize');

const {
	DB_NAME: database,
	DB_USERNAME: username,
	DB_PASSWORD: password,
	DB_HOST: host,
	DB_DIALECT: dialect,
} = process.env;

console.log('datbase', database);
const sequelize = new Sequelize(database, username, password, {
	host,
	dialect,
});

const connectToDb = async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};

module.exports = { sequelize, connectToDb };
