const router = require('express').Router();
const Template = require('../model/Template');


// GET global posts
router.get('/', async (req, res) => {
	try {
		const template = await Template.find().limit(10);
		res.status(200).json(template);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});
// POST to DB
router.post('/', async (req, res) => {
	const template = new Template({
		summary: req.body.summary,
    description: req.body.description,
    starttime:req.body.starttime,
    endtime: req.body.endtime,
    googleId: req.body.googleId
	});
	try {
		const savedTemplate = await template.save();
		res.status(201).json(savedTemplate);
	} catch (err) {
    res.status(500).json({ message: err });
	}
});
module.exports = router;
