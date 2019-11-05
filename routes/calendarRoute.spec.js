const request = require("supertest");
const server = require("../api/server.js");     
const Calendar = require("../routes/calendar-model.js");

// Tests for getEndpoint

describe("/" , () => {
    it('returns 200 status', ()  => {
        return request(server)
        .get('/')
        .then(res => {
            expect(res.status).toBe(200);
        })
    })
})    

// Tests for Post 

describe("/" , () => {
    it("should return request status 200" , async () => {
        const tstResult = await request(server)
        .post("/api/calendars/")
        .send({calendarName : "first Calendar" ,  
        calendarDescription : "Description for Calendar 1"
    })
       expect(tstResult.status).toBe(200);
    })
})  

// for status code 500
describe("/" , () => { 
    it("returns status 500" , async() => {
        const response = await request(server) 
        .post("/api/calendars/")
        .send({calendaName : "hello" ,
        calendaDescription : 99999
     })
        expect(response.status).toBe(500);
    })

})  
