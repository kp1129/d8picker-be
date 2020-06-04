
const request = require('supertest');
const server = require('../api/server.js');
const token = require('./token');

// test data
testGoogleID = '106501162578996443716';
// token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImZiOGNhNWI3ZDhkOWE1YzZjNjc4ODA3MWU4NjZjNmM0MGYzZmMxZjkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiOTk2OTk3OTMyNDUzLTJnaGE1Njg1cjRpZW0yMjdjYmM0dmpmcDFzbWUxazJ0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiOTk2OTk3OTMyNDUzLTJnaGE1Njg1cjRpZW0yMjdjYmM0dmpmcDFzbWUxazJ0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA2NTAxMTYyNTc4OTk2NDQzNzE2IiwiZW1haWwiOiJ2YW5zaGlrYXB1bmRpcjkyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiblNjV1BpZWNRODB4SnZGOU9TS0FHQSIsIm5hbWUiOiJWYW5zaGlrYSBQdW5kaXIiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDUuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1JY1g0cWdVMGxYTS9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BTVp1dWNteGFqWmFsUGUxeDFFdjN6Q0tfa2dvaHJ3SGh3L3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJWYW5zaGlrYSIsImZhbWlseV9uYW1lIjoiUHVuZGlyIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE1OTEyMTgxODIsImV4cCI6MTU5MTIyMTc4MiwianRpIjoiY2I2YzIwZDg2OWZmZjQ3OWFkNTk4ODIwYjJjYTk2OTZmOGY4NzIwMSJ9.jOwgEveZ2KEHCZ6mlTU09fZaSnfWKS08EJsQ6_KI3tkIgejjmxJwB77yu8--WytzMWRx3Y5GbmMy1Qnn6hEszH0jfa5Dg0qGWOkf5vj63ouuHBoNOknv7cQRIyBd4gVKbdTueO20L0_WJDXFkmlqo2A7S4Th1DbK1xx6ajLC8ZbYO7SbfT92VGEbKb1zw_Rd3obxlvHgj3dsAoQLAGaBTRsh8mTEVhsNtEU0AyhiJ_XUrvc9kNLIjl2QPx6Fj8X1fO4w7THW7s1kEwlO9PP4B0f5_heY9PPWNnLZOZN8OlG095ojcnQaOw93paJG9ibbYMHniT7Jg-RIl7QDMnjjJQ';
testTemplate = {
    title: 'test Template 453',
    notes: 'test notes',
    starttime: '123',
    endtime: '123'
}

testTemplateID = '';
describe('testing template router', () => {

    describe('post template', function(){
        // happy test
        it('should successfully post the template info', function(){
            return request(server)
                .post('/api/template')
                .send({...testTemplate, googleId: testGoogleID})
                .set('authorization', token)
                .then(res => {
                    // status 201
                    expect(res.status).toBe(201);

                    // message
                    expect(res.body.message).toBe('template created successfully');
                })
        });

        // error - googleID is missing
        it('should return error when template title is missing', function(){
            return request(server)
                .post('/api/template')
                .send({...testTemplate})
                .set('authorization', token)
                .then(res => {
                    // status 500
                    expect(res.status).toBe(500);

                    // error message
                    expect(res.body.errorMessageCatch.code).toBe('SQLITE_CONSTRAINT');
                })
        })
    })

    describe('get all templates', () => {
        // happy test -  everything works fine
        it('should successfully get the templates when googleID is valid', function() {
            return request(server)
                .get(`/api/template/${testGoogleID}`)
                .set('authorization', token)
                .then(res => {
                    // status
                    expect(res.status).toBe(200);

                    // template check
                    expect(res.body.templates[0].title).toBe(testTemplate.title);

                    // get templateID
                    testTemplateID = res.body.templates[0].id;
                });
        });

        // error testing - googleID is invalid
        it.todo('should return error when googleID is invalid');
    })

    describe('delete template', () => {
        it('should delete successfully when templateID is valid', function(){
            return request(server)
                .delete(`/api/template/${testTemplateID}`)
                .set('authorization', token)
                .then(res => {
                    // status
                    expect(res.status).toBe(200);

                    // success message
                    expect(res.body.message).toBe('template deleted successfully');
                });
        });

        // error scenario - templateID is invalid
        it('should throw an error when templateID is invalid', function(){
            return request(server)
                .delete('/api/template/xyz')
                .set('authorization', token)
                .then(res => {
                    // status
                    expect(res.status).toBe(404);

                    // error message
                    expect(res.body.message).toBe('template ID does not exist');
                });
        });
    })
})