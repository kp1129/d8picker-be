const request = require('supertest');
const events = require('../api/server')  
// const Events = require('./event-model')

// Tests for getEndpoint

describe("get/:cal_id/events/" , () => {
    it('get array from res', ()  => {
        return request(events)
        .get('/api/event/:cal_id/events/')
        .expect(200)
        .expect('Content-Type', /json/)
        // .expect('Content-Length')
        .then(res => {
            expect(res.body).toBeInstanceOf(Array)  
        })
    })
})

// 
