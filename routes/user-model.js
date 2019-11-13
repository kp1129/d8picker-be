const db = require("../data/db-config.js");

module.exports = {
	add,
	get,
	getById,
	getByUuid,
	find,
	getBy,
	update,
	remove
};

function get() {
	return db("users").select("id", "username", "password");
}
function getBy(filter) {
	return db("users").where(filter);
}

function getByUuid(uuid) {
	return db("users")
		.where(uuid)
		.first();
}

function find(userId, password) {
	return db("users")
		.where({ username: userId })
		.orWhere({ email: userId })
		.andWhere({ password })
		.first();
}
function add(user) {
	return db("users")
		.insert(user, "id")
		.then(ids => {
			const [id] = ids;
			return getById(id);
		});
}
function getById(id) {
	return db("users")
		.where({ id })
		.first();
}

function update(changes, id) {
	return db("users")
		.where("id", id)
		.update(changes)
		.then(count => {
			count > 0 ? this.get(id) : null;
		});
}
function remove(id) {
	return db("users")
		.where("id", id)
		.del();
}
