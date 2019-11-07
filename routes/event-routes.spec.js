const request = require('supertest');
const events = require('../api/server')  
// const Events = require('./event-model')

// Tests for getEndpoint

describe("get/:cal_id/events/" , () => {
    it('gets status code of 200', ()  => {
    return request(events)
        .get('/api/event/:cal_id/events/')
        .expect(200)
        .then(res => {
            expect(res.status).toBe(200)  
        })
    })
    it('get array from res', ()  => {
        return request(events)
        .get('/api/event/:cal_id/events/')
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).toBeInstanceOf(Array)  
        })
    })

})
describe("get/:cal_id/events/:id" , () => {
    it('gets status code of 200', ()  => {
    return request(events)
        .get('/api/event/:cal_id/events/:id')
        .expect(200)
        .then(res => {
            expect(res.status).toBe(200)  
        })
    })
    it('get array from res', ()  => {
        return request(events)
        .get('/api/event/:cal_id/events/:id')
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body)
        })
    })

})
describe("post events to array" , () => {
    it('gets status code of 200', async(done)  => {
        const post = {
            
        }
    return request(events)
        .post('/api/event/:cal_id/events/')
        .expect(200)
        .then(res => {
            expect(res.status).toBe(200)  
        })
    })
    it('get array from res', ()  => {
        return request(events)
        .get('/api/event/:cal_id/events/:id')
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body)
        })
    })

})

// 
