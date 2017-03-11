var Express = require('./express.js');
var methods = require('methods');
class Route {
	constructor() {
		methods.forEach((method) => {
			this[method] = (...callbacks) => {
				var route = callbacks.shift();
				callbacks = callbacks.map((cb) => {
					if(cb.constructor === String){
						cb = use(cb);
					}
					return cb;
				})
				callbacks.unshift(route);
				Express.app[method].apply(Express.app, callbacks);
			}
		})
	}
}

module.exports = new Route();