var rawControllers = {};
var controllers = {};
var fs = require('fs');
var path = require('path');
class Controller{
	boot(){
		return new Promise((resolve, reject) => {
			this.loadRawControllers()
				.then(() => this.processControllers())
				.then(() => this.putDependencies())
				.then(resolve)
				.catch(reject)
		})
	}
	loadRawControllers(){
		return new Promise((resolve, reject) => {
			var i = -1;
			var ctrls = fs.readdirSync(path.resolve('./controllers/'));
			var len = ctrls.length;
			if(len == 0){
				return resolve();
			}
			function loadRawController(){
				i++;
				if(len == i){
					return resolve();
				}
				if(!fs.lstatSync(path.resolve('./controllers/'+ctrls[i])).isDirectory()){
					var ctrl = require(path.resolve('./controllers/'+ctrls[i]));
					if(!ctrl.name || ctrl.name.length == 0){
						return reject({
							message: 'Controller name is required'
						})
					}
					rawControllers[ctrl.name] = ctrl;
				}
				loadRawController();
			}
			loadRawController();
		});
	}
	processControllers(){
		return new Promise((resolve, reject) => {
			var i = -1;
			var keys = Object.keys(rawControllers);
			var len = keys.length;
			if(len == 0){
				return resolve();
			}
			var processOne = () => {
				i++;
				if(i == len){
					return resolve();
				}
				this.processController(rawControllers[keys[i]])
					.then(processOne)
					.catch(reject);
			}
			processOne();
		})
	}
	processController(rawController){
		return new Promise((resolve, reject) => {
			var methodsKeys = Object.keys(rawController.methods || {});
			controllers[rawController.name] = {};
			for(var i = 0; i < methodsKeys.length; i++){
				controllers[rawController.name][methodsKeys[i]] = rawController.methods[methodsKeys[i]].bind(controllers[rawController.name])
			}
			var data = rawController.data || {};
			for(var key in data){
				controllers[rawController.name][key] = data[key];
			}
			resolve();
		})
	}
	putDependencies(){
		return new Promise((resolve, reject) => {
			var i = -1;
			var keys = Object.keys(rawControllers);
			var len = keys.length;
			if(len == 0){
				return resolve();
			}
			var putDependenciesInOne = () => {
				i++;
				if(i == len){
					return resolve();
				}
				if(!rawControllers[keys[i]].controllers){
					return putDependenciesInOne();
				}
				var controllerName = '';
				var controllerInstance;
				for (var k = 0; k < rawControllers[keys[i]].controllers.length; k++) {
					controllerName = rawControllers[keys[i]].controllers[i].toLowerCase()+'Controller';
					controllerInstance = this.getInstance(rawControllers[keys[i]].controllers[i]); 
					if(typeof controllerInstance == "undefined"){
						reject({
							message: controllerName+' does not exists'
						})
						k = rawControllers[keys[i]].controllers.length;
						return;
					}
					controllers[keys[i]][controllerName] = controllerInstance;
				}
				putDependenciesInOne();
			}
			putDependenciesInOne();
		})
	}
	getInstance(controllerName){
		return controllers[controllerName];
	}
}
module.exports = new Controller();