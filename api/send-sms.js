require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN; 

const client = require('twilio')(accountSid, authToken);

client.messages.create({
    to: process.env['MY_PHONE_NUMBER'], // my phone number
    from: process.env['TWILIO_NUMBER'], // assigned twilio phone number
    body: 'Hello from the backend of d8picker!'
})
.then((message) => console.log(message.sid));