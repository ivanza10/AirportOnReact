module.exports = {
	client: 'pg',
	connection: {
		host: 'localhost',
		port: '5432',
		user: 'postgres', //Логин для подключения к БД
		password: '1122', //Пароль
		database: 'postgres' //Название БД
	},
	migrations: {
		directory: '../migrations'
	},
	seeds: {
		directory: '../seeds'
	}
}