const Users = require("../routes/user-model");
const { OAuth2Client } = require("google-auth-library");
const verifyExistingGoogleUser = async (req, res, next) => {
	const { idToken } = req.body;

	const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

	const ticket = await client.verifyIdToken({
		idToken: idToken,
		audience: process.env.GOOGLE_CLIENT_ID
	});
	const payload = ticket.getPayload();
	const externalId = payload["sub"];

	const user = await Users.getBy({ externalId, externalType: "google" });

	if (user) {
		req.existingAccount = true;
		req.body.externalId = user.externalId;
		req.body.email = user.email;
		req.body.username = user.username;
		req.body.firstName = user.firstName;
		req.body.lastName = user.lastName;
		req.body.uuid = user.uuid;
	} else {
		req.existingAccount = false;
		req.body.externalId = externalId;
		req.body.email = payload["email"];
	}

	next();
};

module.exports = verifyExistingGoogleUser;
