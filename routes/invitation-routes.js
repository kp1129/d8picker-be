const router = require("express").Router();
const Invitations = require("./invitation-model");
const authenticate = require("../auth/authenticate-middleware");
const verify = require("../auth/verify-user-middleware");
router.post("/", [authenticate, verify], async (req, res) => {
	try {
		const invitation = await Invitations.create(req.user.id);

		res.status(200).json({ invitationCode: invitation.invitationCode });
	} catch (err) {
		console.log("create invitation code error", err);
		res
			.status(400)
			.json({ message: "error fetching invitation code", error: `${err}` });
	}
});
module.exports = router;
