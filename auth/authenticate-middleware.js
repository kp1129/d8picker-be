const jwt = require("jsonwebtoken");
const config = require("../config");
const { secrets } = config;

module.exports = (req, res, next) => {
	const authorizationHeader = req.headers.authorization;

	if (!authorizationHeader) {
		res.status(401).json({ message: "Invalid authorization header." });
	} else {
		const bearer = authorizationHeader.split(" ");
		const token = bearer[1];

		if (token) {
			jwt.verify(token, secrets.jwt, (err, decodedToken) => {
				if (err) {
					console.log(err);
					res.status(401).json({ message: "YOU SHALL NOT PASS!" });
				} else {
					req.user = {
						username: decodedToken.username,
						uuid: decodedToken.uuid
					};

					next();
				}
			});
		} else {
			res.status(500).json({ message: "server error were working on it", err });
		}
	}
};
