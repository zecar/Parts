var DB = require('./db.js');
class Model {
	getTypes() {
		return DB.Types;
	}
	getSchema() {
		return DB.Schema;
	}
	register(modelName, modelSchema) {
		DB.model(modelName, modelSchema);
	}
	get(modelName) {
		return DB.model(modelName);
	}
}

module.exports = Model;