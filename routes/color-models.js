const db = require("../data/db-config.js");

module.exports = {
	getAll
};

function getAll() {
	return db("colors").select("color", "uuid");
}
