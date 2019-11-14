const Invitations = require("../routes/invitation-model");
const validateRegistration = (req, res, next) => {
	if (Object.keys(req.body) === 0) {
		res.status(400).json({ message: "auth/missing form information" });
	}

	if (
		!req.body.firstName ||
		!req.body.lastName ||
		!req.body.username ||
		!req.body.email ||
		!req.body.password
	) {
		res
			.status(400)
			.json({ message: "auth/missing one or more request combination." });
	}

	next();
};

const validateInvitationCode = async (req, res, next) => {
	const invitationCode = req.query.invitationCode;

	if (!invitationCode) {
		next();
	}

	const invitation = await Invitations.getBy({ invitationCode });

	if (invitation && !invitation.isUsed) {
		req.body.code = invitationCode;
		next();
	} else {
		res.status(401).json({ message: "The invitation code is invalid." });
	}
};

const validateLogin = (req, res, next) => {};

module.exports = {
	validateRegistration,
	validateLogin,
	validateInvitationCode
};
