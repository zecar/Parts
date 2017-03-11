var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Config = use('Config');
var cfg = Config.db;
class DB {
	constructor() {
		this.connection = mongoose.createConnection();
	}
	boot() {
		return this.connect()
	}
	connect() {
		return new Promise((resolve, reject) => {
			if(!cfg.enabled){
				return resolve();
			}
			this.connection.on('error', (err) => {
				reject(err);
			});
			this.connection.on('open', resolve);
			
			this.connection.open(this.getAuthLink());
		});
	}
	getAuthLink() {
		return this.getAuth() + this.getHost() + '/' + cfg.database;
	}
	getAuth() {
		var auth = '';
		if(!cfg.username || cfg.username.length == 0)
			return auth;
		auth = cfg.username;
		if(cfg.password && cfg.password.length > 0)
			auth += ':'+cfg.password;
		return auth+'@';
	}
	getHost() {
		var host = cfg.host + ':' + cfg.port;
		return host;
	}
	registerModels() {
		var fs = require('fs');
		var path = require('path')
		return new Promise((resolve, reject) => {
			fs.readdirSync(path.resolve('./models/')).forEach((modelPath) => {
				if(!fs.lstatSync(path.resolve('./models/'+modelPath)).isDirectory()){
					var model = require(path.resolve('./models/'+modelPath))(mongoose.Schema.Types);
					this.connection.model(capitalizeFirstLetter(modelPath.replace('.js', '')), new mongoose.Schema(model));
				}
			})
			resolve();
		})
	}
	getModel(name) {
		return this.connection.model(name);
	}
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
module.exports = new DB();