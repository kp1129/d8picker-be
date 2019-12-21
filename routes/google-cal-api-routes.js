const router = require("express").Router();
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

        // If modifying these scopes, delete token.json.
        const SCOPES = ['https://www.googleapis.com/auth/calendar'];
        // The file token.json stores the user's access and refresh tokens, and is
        // created automatically when the authorization flow completes for the first
        // time.
        const TOKEN_PATH = 'token.json';
        
        // Load client secrets from a local file.
    
        
        /**
         * Create an OAuth2 client with the given credentials, and then execute the
         * given callback function.
         * @param {Object} credentials The authorization client credentials.
         * @param {function} callback The callback to call with the authorized client.
         */
        function authorize(credentials, callback) {
          const {client_secret, client_id, redirect_uris} = credentials.installed;
          const oAuth2Client = new google.auth.OAuth2(
              client_id, client_secret, redirect_uris[0]);
        
          // Check if we have previously stored a token.
          fs.readFile(TOKEN_PATH, (err, token) => {
            if (err) return getAccessToken(oAuth2Client, callback);
            oAuth2Client.setCredentials(JSON.parse(token));
            callback(oAuth2Client);
          });
        }
        
        /**
         * Get and store new token after prompting for user authorization, and then
         * execute the given callback with the authorized OAuth2 client.
         * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
         * @param {getEventsCallback} callback The callback for the authorized client.
         */
        function getAccessToken(oAuth2Client, callback) {
          const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
          });
          console.log('Authorize this app by visiting this url:', authUrl);
          const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
          });
          rl.question('Enter the code from that page here: ', (code) => {
            rl.close();
            oAuth2Client.getToken(code, (err, token) => {
              if (err) return console.error('Error retrieving access token', err);
              oAuth2Client.setCredentials(token);
              // Store the token to disk for later program executions
              fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
              });
              callback(oAuth2Client);
            });
          });
        }
        
        /**
         * Lists the next 10 events on the user's primary calendar.
         * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
         */

router.post ('/event/add', async (req,res) =>{
    const {id,summary, location, description } = req.body;
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Calendar API.
      authorize(JSON.parse(content), insertEvent);
    });
   
    try{
        var event = {
          'id':`${id}`,
            'summary': `${summary}`,
            'location': `${location}`,
            'description': `${description}`,
            'start': {
              'dateTime': '2019-12-5T09:00:00-07:00',
              'timeZone': 'America/Los_Angeles',
            },
            'end': {
              'dateTime': '2019-12-5T17:00:00-08:00',
              'timeZone': 'America/Los_Angeles',
            },
            'recurrence': [
              'RRULE:FREQ=MONTHLY;INTERVAL=1;BYDAY=3TH'
            ],
            'attendees': [
              {'email': 'lpage@example.com'},
              {'email': 'sbrin@example.com'},
            ],
            'reminders': {
              'useDefault': false,
              'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10},
              ],
            },
          };

function insertEvent(auth) {
  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.insert({
    auth: auth,
    calendarId: 'primary',
    resource: event,
  }, function(err, event) {
    if (err) {
        res.status(400).json(err.errors)
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    } else {
        res.status(200).json("Event added to calendar sucessfully")
    }
    console.log('Event created: %s', event);
  });
}
 
    } catch (error){
        console.log(error)
    }
		
	})

  router.post ('/event/delete', async (req,res) =>{
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Calendar API.
      authorize(JSON.parse(content), deleteEvent);
    });
    const {id} = req.body;
    try{

function deleteEvent(auth) {
const calendar = google.calendar({version: 'v3', auth});
calendar.events.delete({
  auth: auth,
  calendarId: 'primary',
  eventId: `${id}`,
}, function(err, event) {
  if (err) {
    console.log('There was an error contacting the Calendar service: ' + err);
    return;
  }
  console.log('Event created: %s', event.htmlLink);
});
}
      res.status(200).json({message:"google cal route hit-delete"})
  } catch (error){
      console.log(error)
  }

  })

  router.post ('/event/update', async (req,res) =>{
    const {id, event} = req.body;
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Calendar API.
      authorize(JSON.parse(content), updateEvent);
    });
    try{
      function updateEvent(auth) {
      const calendar = google.calendar({version: 'v3', auth});
      calendar.events.patch({
        auth: auth,
        calendarId: 'primary',
        eventId: `${id}`,
        resource: event,
      }, function(err, event) {
        if (err) {
          console.log('There was an error contacting the Calendar service: ' + err);
          return;
        }
        res.status(200).json(event.data)
      });
      }
    }
    catch{

    }
  })
  
  router.post ('/calendar/add', async (req,res) =>{
    const {summary,colorId} = req.body;
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Calendar API.
      authorize(JSON.parse(content), insertCal);
    });
    try{
      function insertCal(auth) {
      const calendar =  google.calendar({version: 'v3', auth:auth});
      calendar.calendars.insert({
        resource: {
          summary: summary,
          
        },
        colorId: colorId,
      },function(err, cal) {
        if (err) {
          console.log('There was an error contacting the Calendar service: ' + err);
          return;
        }
        res.status(200).json(cal)
      })
      }
    }
    catch{

    }
  })

  router.post ('/calendar/delete', async (req,res) =>{
    const {calID} = req.body;
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Calendar API.
      authorize(JSON.parse(content), deleteCal);
    });
    try{
      function deleteCal(auth) {
      const calendar =  google.calendar({version: 'v3', auth:auth});
      calendar.calendars.delete({
        calendarId: calID,
      },function(err, cal) {
        if (err) {
          console.log('There was an error contacting the Calendar service: ' + err);
          return;
        }
        res.status(200).json(cal)
      })
      }
    }
    catch{

    }
  })

  


module.exports = router;