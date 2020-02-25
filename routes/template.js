const router = require('express').Router();
const template = require('../model/Template');


// GET global posts
router.get('/', async (req, res) => {
	try {
		const template = await Template.find().limit(10);
		res.json(template);
	} catch (err) {
		res.json({ message: err });
	}
});
// POST to DB
router.post('/', async (req, res) => {
	const template = new Template({
		title: req.body.title,
		description: req.body.description
	});
	try {
		const savedTemplate = await template.save();
		res.json(savedTemplate);
	} catch (err) {
		res.json({ message: err });
	}
});
module.exports = router;
