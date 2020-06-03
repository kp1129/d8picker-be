const request = require('supertest');
const server = require('../api/server');
const token = require('./token');

const newAdminInfo = {
    name: `Test Admin`,
    email: 'test_admin@gmail.com',
    googleId: `test123`
}
// const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ5MjcxMGE3ZmNkYjE1Mzk2MGNlMDFmNzYwNTIwYTMyYzg0NTVkZmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiOTk2OTk3OTMyNDUzLTJnaGE1Njg1cjRpZW0yMjdjYmM0dmpmcDFzbWUxazJ0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiOTk2OTk3OTMyNDUzLTJnaGE1Njg1cjRpZW0yMjdjYmM0dmpmcDFzbWUxazJ0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA4NDQ1NjA4MDU1NjQ0MzQ4NTA3IiwiZW1haWwiOiJhYmFsYW56YXI3QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiek1ldU95Uzh6ZXlEN2U4OWo3TG91ZyIsIm5hbWUiOiJBbGRhaXIgQmFsYW56YXIiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDQuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1YNjVpOEl5dDZCOC9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BTVp1dWNtU1hyblJWUXRwY2ZiMTNPZ24zeXBTRHdiTmZnL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJBbGRhaXIiLCJmYW1pbHlfbmFtZSI6IkJhbGFuemFyIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE1OTEyMTk1MTcsImV4cCI6MTU5MTIyMzExNywianRpIjoiYWM2ZDMwOWNiMDVhOWM2ZDU1NzExYTQ5OTc5NDM4OTg5YmVjNGRmZiJ9.lTsbQUcB6Vj2SBNd-6DwfSUMHQ7TIuI1o8sDl333VizqqwH0HCxwdHQV75uSo3qkzYcIL4835Vhhyv9TcPgsFbTKVLkWIjGHQh_cfZ9KqTBOmjkoCxH9XdfekKKvE8xvF5wcPTE5mJnPHyI9pnrr9oeLro9hxDEZyZ6egM41d1cMWiatX6rFHQSdPDYrZdlsKYFdsdmFq8ugfAboNqDyE5aG7c2QdKE6krnHEMnyHR6GBtIeZE1QvAT19FkCuzsZ3DvCStMZO1jhJpeYMAQF0cP7ZxgNfkaKryHIbtzSFIvrpXQGRXKhl021zG--q9qb5SkBHzAXowVEqfypu6RsnQ';
const group = {
    groupName: 'Success Group',
    groupDescription: 'This better work', 
};
const contact = {
    firstName: 'Test Contact',
    lastName: 'Test Contact',
    phoneNumber: '0000000000',
    email: 'test@email.com'
};
let testAdminId;
let testContactId;
let testGroupId;
describe('testing groups router', () => {
    describe('get adminId', () => {
        it('should get adminId', function(){
            return request(server)
            .post('/api/admin')
            .send(newAdminInfo)
            .set('authorization', token)
            .then(res => {
                // status 200
                expect(res.status).toBe(200);
                testAdminId = res.body.adminId;
            })
        })
    })
    // POST Groups
    describe('post group', function(){
        // 1. happy case - post group and map it to adminID
        it('should successfully post the group info', function(){
            return request(server)
                    .post('/api/groups')
                    .send({...group, adminId: testAdminId})
                    .set('authorization', token)
                    .then(res => {
                        console.log('from post group test', res.status, res.body);
                        expect(res.status).toBe(201)
                    })
        });
            // 2. error case - invalid adminID in the request
        it('should return error when invalid adminId in the request', function(){
            return request(server)
                    .post('/api/groups')
                    .send({...group, adminId: 100})
                    .set('authorization', token)
                    .then(res => {
                        expect(res.status).toBe(500)
            })
        });
    })
    // GET Groups for adminId
    describe('get all groups', () => {
         // 1. happy case - adminId is valid and admin has groups
        it('should successfully get all groups for provided adminId', function(){
            return request(server)
                    .get('/api/groups')
                    .send({adminId: testAdminId})
                    .set('authorization', token)
                    .then(res => {
                        // console.log('from get groups test', res.status, res.body);
                        expect(res.status).toBe(200)
                        expect(res.body.groups).toBeDefined();
                        testGroupId = res.body.groups[0].id;
                    })
        });
        // 2. happy case - adminId is valid but he does not have any groups
        it('adminId is valid but does not have any groups', function(){
            return request(server)
                    .get('/api/groups')
                    .send({adminId: testAdminId})
                    .set('authorization', token)
                    .then(res => {
                        expect(res.status).toBe(200)
                        expect(res.body.groups).toBeDefined()
                    })
        });
        // 3. error case - invalid adminId
        it('error response when adminId is invalid', function(){
            return request(server)
                    .get('/api/groups')
                    .send({adminId: 100})
                    .set('authorization', token)
                    .then(res => {
                        expect(res.status).toBe(200)
                        expect(res.body.groups).toHaveLength(0)
                    })
        })
    })
    //  POST Contact to the group
    describe('post contact', () => {
        it('should post contact and get id', function(){
            return request(server)
                    .post('/api/contacts')
                    .send({...contact, adminId: testAdminId})
                    .set('authorization', token)
                    .then(res => {
                        expect(res.status).toBe(201)
                        testContactId = res.body[0]
                    })
        })

        // check groups for a particular contact - groups empty
        it('should have the group in the contact info', function(){
            return request(server)
                .get(`/api/contacts/${testContactId}/groups`)
                .send({adminId: testAdminId})
                .set('authorization', token)
                .then(res => {
                    expect(res.body.groups).toHaveLength(0);
                })
        })
        // 1. happy case - valid groupID & contactID
        it('should successfully post relationship to contact_group with valid groupId and contactId', function(){
            return request(server)//
                    .post(`/api/groups/${testGroupId}`)
                    .send({contactId: testContactId, adminId: testAdminId})
                    .set('authorization', token)
                    .then(res => {
                        expect(res.status).toBe(201)
                        expect(res.body.message).toBe('contact added successfylly to the group')
                    })
        })
        // check groups for a particular contact - groups have test group
        it('should have the group in the contact info', function(){
            return request(server)
                .get(`/api/contacts/${testContactId}/groups`)
                .send({adminId: testAdminId})
                .set('authorization', token)
                .then(res => {
                    expect(res.body.groups[0].id).toBe(testGroupId);
                })
        })
        // 2. error case - valid groupID & invalid contactID
        it('error response when groupId is valid but not contactId', function(){
            return request(server)
                    .post(`/api/groups/${testGroupId}`)
                    .send({contactId: '123456', adminId: testAdminId})
                    .set('authorization', token)
                    .then(res => {
                        expect(res.status).toBe(500)
                    })
        })
    })
    // GET group by groupID
    describe('get particular group', () => {
        // 1. happy case - valid groupID - **check for contacts field**
        it('should successfully get group with provided groupId', function(){
            return request(server)
                    .get(`/api/groups/${testGroupId}`)
                    .send({adminId: testAdminId})
                    .set('authorization', token)
                    .then(res => {
                        console.log('####from get group by id######', testGroupId, res.status, res.body)
                        expect(res.status).toBe(200)
                        expect(res.body.id).toBe(testGroupId)
                        expect(res.body.contacts[0].firstName).toBe(contact.firstName);
                    })
        })
        // 2. error case -  invalid groupID
        it('error response when provided with invalid groupId', function(){
            return request(server)
                    .get('/api/groups/99999')
                    .send({adminId: testAdminId})
                    .set('authorization', token)
                    .then(res => {
                        expect(res.status).toBe(500)
                    })
        })
    })
})
// DELETE Contact from a group
    // 1. happy case - valid groupID & contactID and contact in given group
    // 2. error case - valid groupID & contactID , contact not in the group
// PUT group
    // 1. happy case - edit group with valid groupID
    // 2. error case - edit group with invalid adminID
// DELETE group
    // 1. happy case - edit group with valid groupID
    // 2. error case - edit group with invalid adminID


