var express = require('express');
var cfg = use('Config').http;
class Express {
	constructor() {
		this.app = express();
	}
	boot() {
		var $this = this;
		return new Promise((resolve, reject) => {
			if(!cfg.enabled){
				return resolve();
			}
			this.listen().then(() => {
				console.log('listening');
				resolve();
			});
		})
	}
	listen() {
		return new Promise((resolve, reject) => {
			this.app.listen(cfg.port, resolve);
		})
	}
}

module.exports = new Express();