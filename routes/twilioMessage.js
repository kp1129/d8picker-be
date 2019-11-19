const router = require('express').Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


router.post('/', async (req, res) => {
    try {
        const { phone } = req.body;
        console.log(phone);
        client.messages
        .create({
           body: 'Invitation to Calendar',
           from: '+12017405267',
           to: `+1${phone}`
         })
        .then(message => console.log(message.sid));
        res.status(200).json("message sent");
    } catch (err) {
        res.status(400).json({ message: 'error sending message', error: `${err}`});
    }
})


  module.exports = router;
