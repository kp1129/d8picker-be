
# API Documentation

#### 1️⃣ Backend delpoyed at [Heroku](https://lab17-makata.herokuapp.com) <br>

## 1️⃣ Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm start** to start the local server


### Backend framework goes here

Express.JS

-    Simplistic
-    Scaleable 
-    Flexible
-    It's what we know how to use

## 2️⃣ Endpoints



#### Calendar Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/api/users/calendars`  | owners         | Gets all calendars under a user.             |
| POST   | `/api/calendars`        | owners         | Add new Calendar                             |
| PUT    | `/api/calendars/{calendarUuid}` | owners | Update A calendar                            |
| DELETE | `/api/calendars/{calendarUuid}` | owners | Delete A calendar                            |
| PUT    | `/api/calendars/{calendarUuid}?subscribe=true` | owners | Subscribe to a calendar       |
| PUT    | `/api/calendars/{calendarUuid}?subscribe=false`| owners | Unsubscribe to a calendar     |

#### User Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| POST   | `/auth/register`        | none                | Register a new user                                |
| POST   | `/auth/login`           | none                | Login a user                                       |

#### Event Routes

| Method | Endpoint                                      | Access Control      | Description                                        |
| ------ | --------------------------------------------- | ------------------- | -------------------------------------------------- |
| POST   | `/api/calendars/{calendarUuid}/events`        | none                | Create Event                                       |
| GET    | `/api/calendars/{calendarUuid}/events`        | none                | Get All Events                                     |
| PUT    | `/api/events/{eventUuid}/events`              | none                | Update Event                                       |
| DELETE | `/api/events/{eventUuid}`                     | none                | Delete Event                                       |

# Data Model



#### 2️⃣ Calendars

---

```
{
  "calendarName": "string",
  "calendarDescription": "string",
  "calendarColor": "string",
  "isPrivate": true
}
```

#### USERS

---

```
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "username": "string",
  "password": "string"
}
```
#### Events

---

```
{
  "eventTitle": "string",
  "eventNote": "string",
  "eventLocation": "string",
  "startDate": "2019-11-20",
  "endDate": "2019-11-20",
  "startTime": "2019-11-17T10:00:00.000-08:00",
  "endTime": "2019-11-17T11:15:00.000-08:00",
  "isAllDayEvent": true,
  "isRepeatingEvent": true
}
```


## 2️⃣ Actions


`getByCalendarId(calendarId)` -> Returns Calendar

`getByUsersCalendarsId(usersCalendarsId)` -> Returns calendar

`getByUuid(uuid)` -> Returns by uuid

`addDefaultCalendar(userId)` -> Adds Calendar

`add(userId, calendar)` -> Add user to calendar

`remove(calendarId)` -> Deletes Calendar

`update(calendarId, updated)` -> Updates Calendar

`subscribe(calendarId, userId)` -> Subscribes user to Calendar

`unsubscribe(calendarId, userId)` -> Unsubscribes user to Calendar
<br>
<br>
<br>
`get(calendarId)` -> Gets Calendars Events

` getByCalendarsEventsId(calendarsEventsId)` -> Gets specific event

`getById(eventId)` --> Gets Specific Event

`getByUuid(uuid)` -> Gets Event by Uuid

`add(event)` -> Creates Event

`addCalendarsEvents(calendarId, eventId)` -> Creates on the calendar Event

`remove(eventId)` -> Deletes

`update(eventId, changes)` -> Changes Event

## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:
No need for .env file
    
## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](🚫link to your frontend readme here) for details on the fronend of our project.
🚫 Add DS iOS and/or Andriod links here if applicable.
