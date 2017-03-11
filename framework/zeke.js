global.use = function(name){
	if(name == 'Config'){
		return Config;
	}
	if(name == 'Route'){
		return require('./route.js');
	}
	if(/^#/.test(name)){
		return DB.getModel(name.replace('#', ''));
	}
	if(/@/.test(name)){
		var parts = name.split('@');
		return Controller.getInstance(parts[0])[parts[1]];
		return require('./../controllers/'+parts[0].toLowerCase())[parts[1]];
	}
	if(/^[A-Z]/.test(name)){
		return Controller.getInstance(name)
		return require('./../controllers/'+name.toLowerCase());
	}
}
var Config = require('./config.js');
var DB = require('./db.js');
var Express = require('./express.js');
var Controller = require('./controller.js');
class Zeke {
	boot() {
		console.log("booting up");
		DB.boot()
			.then(() => DB.registerModels())
			.then(() => Controller.boot())
			.then(() => Express.boot())
			.then(() => this.registerRoutes())
			.then(function(){
				console.log('Up and running')
			}).catch(function(err){
				console.log('Error booting up');
				console.log(err);
			})
	}
	registerRoutes() {
		return new Promise((resolve, reject) => {
			require('./../routes/http.js');
			resolve()
		})
	}
}
var App = new Zeke();
module.exports = App;