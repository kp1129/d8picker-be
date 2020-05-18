
const request = require('supertest');
const server = require('../api/server.js');

// test data
testGoogleID = 123;
testTemplate = {
    title: 'test Template',
    notes: 'test notes',
    starttime: '123',
    endtime: '123'
}

testTemplateID = '';
describe('testing template router', () => {

    // describe('post template', function(){
    //     // happy test
    //     it('should successfully post the template info', function(){
    //         return request(server)
    //             .post('/api/template')
    //             .send({...testTemplate, googleID: testGoogleID})
    //             .then(res => {
    //                 // status 201
    //                 expect(res.status).toBe(201);

    //                 // message
    //                 expect(res.body.message).toBe('template created successfully');
    //             })
    //     })
    // })

    describe('get all templates', () => {
        // happy test -  everything works fine
        it('should successfully get the templates when googleID is valid', function() {
            return request(server)
                .get(`/api/template/${testGoogleID}`)
                .then(res => {
                    // status
                    expect(res.status).toBe(200);

                    // template check
                    expect(res.body.templates[0].title).toBe(testTemplate.title);

                    // get templateID
                    testTemplateID = res.body.templates[0].id;
                });
        });

        // happy test - everything works fine - message: "no templates"
        it.todo('should return the message when no template exist for this googleID');

        // error testing - googleID is invalid
        it.todo('should return error when googleID is invalid');
    })
})