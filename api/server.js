const express = require('express');
const cors = require('cors');
const helmet = require('helmet');


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

//setting up routes
const userRouter = require('../routes/user-router');
const authRouter = require('../auth/auth-router')
const eventRouter = require('../routes/event-router')
const calendarRouter = require('../routes/calendar-routes')

//routes
server.use('/api/users', userRouter);
server.use('/api/auth', authRouter);
server.use('/api/calendar', calendarRouter)
server.use('/api/events', eventRouter);
// server.use('/api/calendar/:id/admins', adminRouter)
// server.use('/api/calendar/:id/subscribers', subscriberRouter)

//testing server
server.get('/', (req, res) => {
    res.send('api is running')
})

module.exports = server;



