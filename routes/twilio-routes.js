const router = require('express').Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

//demo public google calendar link https://calendar.google.com/calendar/embed?src=ngv6ia32b26dk4erf960l53f9g%40group.calendar.google.com&ctz=America%2FChicago
//"src" is the calendarID 
// example link: https://calendar.google.com/calendar/embed?src=${interpolatedCalendarID}&ctz=America%2FChicago
router.post('/newSub', async (req, res) => {
    try {
        const { phone, link } = req.body;
        console.log(phone);
        client.messages
        .create({
           body: `This is an automated message from School Calendar. You have been invited to a calendar: ${link}`,
           from: '+19512005627',
           to: `+1${phone}`
         })
        .then(message => console.log(message.sid));
        res.status(200).json("message sent");
    } catch (err) {
        res.status(400).json({ message: 'error sending message', error: `${err}`});
    }
})
router.post('/customNotification', async (req, res) => {
    try {
        const { phone, link, message } = req.body;
        console.log(phone);
        client.messages
        .create({
           body: `${message} Calendar: ${link}`,
           from: '+19512005627',
           to: `+1${phone}`
         })
        .then(message => console.log(message.sid));
        res.status(200).json("message sent");
    } catch (err) {
        res.status(400).json({ message: 'error sending message', error: `${err}`});
    }
})


  module.exports = router;



  // Craig adds phone number to a subscribers table
  // SMS automatically gets sent to newly added subs with calendar link
  // Dialog box with custom message to be able to notify all subscribers of event changes, deletions, updates. 