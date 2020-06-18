const router = require('express').Router();
const {sendMessage, fetchMessage, deleteMessage} = require('../api/send-sms.js');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post(`/`, async (req, res) => {
    await sendMessage()
    res.status(201).json();
});

router.get(`/`, async(req, res) => {
    await fetchMessage()
    res.status(201).json();
})

module.exports = router;


