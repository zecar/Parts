module.exports = {
	http: {
		enabled: true,
		port: 3333
	},
	https: {
		enabled: false,
		port: 3211,
		credentials: {}
	},
	db: {
		enabled: true,
		username: 'zekes5',
		password: 'zekes5pass',
		host: 'localhost',
		port: 27017,
		database: 'zekes5'
	}
}