const db = require("../data/db-config.js");
const shortid = require("shortid");
const uuidv1 = require("uuid/v1");
const moment = require("moment");

function get(invitationId) {
	return db("invitations")
		.where({ invitationId })
		.first();
}

function getBy(filter) {
	console.log(filter);
	return db("invitations")
		.where(filter)
		.first();
}

function create(userId) {
	return db("invitations")
		.insert({
			userId,
			invitationCode: shortid.generate(),
			uuid: uuidv1(),
			expired_at: moment()
				.add(2, "hours")
				.toISOString(true)
		})
		.then(ids => {
			return get(ids[0]);
		});
}

module.exports = {
	get,
	getBy,
	create
};
