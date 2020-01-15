// Update with your config settings.
const { knexSnakeCaseMappers } = require('objection')

module.exports = {
	client: 'pg',
	connection: {
		host: 'localhost',
		user: 'postgres',
		password: 'postgres',
		database: 'quanlynhahang'
	},
	...knexSnakeCaseMappers()
};
