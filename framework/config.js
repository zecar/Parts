var fileConfig = require('./../config/config.js');
class Config {
	constructor() {
		for(var key in fileConfig){
			this[key] = fileConfig[key];
		}
	}
	getValue(key, defaultValue){
		keys = [].concat(key.split('.'));
		var value = fileConfig;
		for (var i = 0; i < keys.length; i++) {
			if(typeof value[keys[i]] !== "undefined"){
				value = value[keys[i]];
			}
			else {
				return defaultValue || null;
			}
		}
		return value;
	}
}
module.exports = new Config();