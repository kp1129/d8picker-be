
const app = require('../api/server')  
const supertest = require('supertest');
const request = supertest(app)

// Tests for event Endpoint

describe('GET starting endpoint', () => {
    it('responds with json', function(done) {
        request
            .get('/api/event')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    })
})

describe('POST /event', () => {
    it('addes an event to table', function(done) {
        request
            .post('/api/event/:cal_id/events/')
            .send('eventName=testevent')
            .set('Accept', 'application/json')
            .expect(function(res) {
                res.body.id = '1';
                res.body.eventName= res.body.eventName
            })
            .expect(200,{
                id:'1',
                eventName: 'testevent'
            }, done)
    })
})












// describe("get/:cal_id/events/" , () =>  {
//     it('gets event to calendar', async ()  => {
//         const events = await post(`testingevnt`, demoEvent).expect(200)
//         expect(res.body)
//     })
//     // it('post event to calendar', async ()  => {
    //     const events = await post(`testingevnt`, demoEvent).expect(200)
    //     expect(res.body)
    // })
    
// })


// describe("get/:cal_id/events/:id" , () => {
//     it('gets status code of 200', ()  => {
//     return request(events)
//         .get('/api/event/:cal_id/events/:id')
//         .expect(200)
//         .then(res => {
//             expect(res.status).toBe(200)  
//         })
//     })
//     it('get array from res', ()  => {
//         return request(events)
//         .get('/api/event/:cal_id/events/:id')
//         .expect('Content-Type', /json/)
//         .then(res => {
//             expect(res.body)
//         })
//     })

// })
// describe("post events to array" , () => {
//     it('gets status code of 200', async(done)  => {
//         const post = {

//         }
//     return request(events)
//         .post('/api/event/:cal_id/events/')
//         .expect(200)
//         .then(res => {
//             expect(res.status).toBe(200)  
//         })
//     })
//     it('get array from res', ()  => {
//         return request(events)
//         .get('/api/event/:cal_id/events/:id')
//         .expect('Content-Type', /json/)
//         .then(res => {
//             expect(res.body)
//         })
//     })

// })

// 
