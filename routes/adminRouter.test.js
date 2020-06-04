
const request = require('supertest');
const server = require('../api/server.js');
const token = require('./token.js');
//Test Data
let counter = 10;
// token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImZiOGNhNWI3ZDhkOWE1YzZjNjc4ODA3MWU4NjZjNmM0MGYzZmMxZjkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiOTk2OTk3OTMyNDUzLTJnaGE1Njg1cjRpZW0yMjdjYmM0dmpmcDFzbWUxazJ0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiOTk2OTk3OTMyNDUzLTJnaGE1Njg1cjRpZW0yMjdjYmM0dmpmcDFzbWUxazJ0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA2NTAxMTYyNTc4OTk2NDQzNzE2IiwiZW1haWwiOiJ2YW5zaGlrYXB1bmRpcjkyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiblNjV1BpZWNRODB4SnZGOU9TS0FHQSIsIm5hbWUiOiJWYW5zaGlrYSBQdW5kaXIiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDUuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1JY1g0cWdVMGxYTS9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BTVp1dWNteGFqWmFsUGUxeDFFdjN6Q0tfa2dvaHJ3SGh3L3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJWYW5zaGlrYSIsImZhbWlseV9uYW1lIjoiUHVuZGlyIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE1OTEyMTgxODIsImV4cCI6MTU5MTIyMTc4MiwianRpIjoiY2I2YzIwZDg2OWZmZjQ3OWFkNTk4ODIwYjJjYTk2OTZmOGY4NzIwMSJ9.jOwgEveZ2KEHCZ6mlTU09fZaSnfWKS08EJsQ6_KI3tkIgejjmxJwB77yu8--WytzMWRx3Y5GbmMy1Qnn6hEszH0jfa5Dg0qGWOkf5vj63ouuHBoNOknv7cQRIyBd4gVKbdTueO20L0_WJDXFkmlqo2A7S4Th1DbK1xx6ajLC8ZbYO7SbfT92VGEbKb1zw_Rd3obxlvHgj3dsAoQLAGaBTRsh8mTEVhsNtEU0AyhiJ_XUrvc9kNLIjl2QPx6Fj8X1fO4w7THW7s1kEwlO9PP4B0f5_heY9PPWNnLZOZN8OlG095ojcnQaOw93paJG9ibbYMHniT7Jg-RIl7QDMnjjJQ';

adminInfo = {
    name: 'Vanshika Pundir',
    email: 'vanshikapundir92@gmail.com',
    googleId: '106501162578996443716'
};
newAdminInfo = {
    name: `Test Admin ${counter}`,
    email: 'test_admin@gmail.com',
    googleId: `test123${counter}`
}


// test cases
describe('testing admin router', function(){

    describe('post admin', function(){

        // 1. happy case - new admin with new googleID
        // it('should successfully post the admin info', function(){
        //     return request(server)
        //         .post('/api/admin')
        //         .send(newAdminInfo)
        //         .set('authorization', token)
        //         .then(res => {
        //             // status 200
        //             expect(res.status).toBe(200);

        //             // message
        //             expect(res.body.message).toBe('admin posted')

        //             // adminId
        //             expect(res.body.adminId).toBeDefined();
        //             return counter++;
        //         })
        // });

        // 2. happy case - returning admin with existing googleID
        it('should successfully post the admin info', function(){
            return request(server)
                .post('/api/admin')
                .send(adminInfo)
                .set('authorization', token)
                .then(res => {
                    // status 200
                    expect(res.status).toBe(200);

                    // message
                    expect(res.body.message).toBe('admin exists in database')

                    // adminId
                    expect(res.body.adminId).toBeDefined();
                })
        })
    })

})


