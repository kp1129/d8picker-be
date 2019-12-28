const config = require("../config");
const { db } = config;

module.exports = {
	getAll
};

function getAll() {
	return db("colors").select("color", "uuid");
}
