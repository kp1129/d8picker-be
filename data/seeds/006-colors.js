const uuidv1 = require("uuid/v1");
exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("colors")
		.del()
		.then(function() {
			// Inserts seed entries
			return knex("colors").insert([
				{ color: "#FFC312", uuid: uuidv1() },
				{ color: "#3498db", uuid: uuidv1() },
				{ color: "#9b59b6", uuid: uuidv1() },
				{ color: "#34495e", uuid: uuidv1() },
				{ color: "#e67e22", uuid: uuidv1() },
				{ color: "#95a5a6", uuid: uuidv1() },
				{ color: "#009432", uuid: uuidv1() },
				{ color: "#B53471", uuid: uuidv1() },
				{ color: "#1B1464", uuid: uuidv1() }
			]);
		});
};
