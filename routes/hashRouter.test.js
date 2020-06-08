const request = require('supertest');
const server = require('../api/server');
const token = require('./token');

const testAdminInfo = {
    name: `Test Admin`,
    email: 'test_admin@gmail.com',
    googleId: `test123`
}
const testGroupInfo = {
    groupName: 'Success Group',
    groupDescription: 'This better work', 
};

const testGroupInviteHash = 'TestGroupTestAdminInviteHash';
let testAdminId;
let testGroupId;

describe('hash route testing', () => {
    // Post Admin to the databse
    describe('get adminId', () => {
        it('should get adminId', function(){
            return request(server)
            .post('/api/admin')
            .send(testAdminInfo)
            .set('authorization', token)
            .then(res => {
                // status 200
                expect(res.status).toBe(200);

                // get testAdminId
                testAdminId = res.body.adminId;
            })
        })
    })
    // Post Group to the database
    describe('get groupId', () => {
        it('should get groupId', function(){
            return request(server)
                    .post('/api/groups')
                    .send({...testGroupInfo, adminId: testAdminId})
                    .set('authorization', token)
                    .then(res => {
                        // status 201
                        expect(res.status).toBe(201);
                        testGroupId = res.body[0];
                    })
        })
    })
    // Post GroupInviteHash to the database
    describe('post groupInviteHash', function(){
        // 1. happy case - valid groupId, adminId
        it('should post groupInviteHash successfully', function(){
            return request(server)
                .post('/api/inviteToGroup')
                .send({
                    adminId: testAdminId, 
                    groupId: testGroupId, 
                    groupInviteHash: testGroupInviteHash
                })
                .set('authorization', token)
                .then(res => {
                    console.log('***********', res.status, res.body);
                    // status 201
                    expect(res.status).toBe(201);
                    // success message
                    expect(res.body.message).toBe('group invite hash posted to the database');
                })
        })
        // 2. error case - invalid groupId
        it('should get error when groupId is invalid', function(){
            return request(server)
                .post('/api/inviteToGroup')
                .send({
                    adminId: testAdminId, 
                    groupId: '4567', 
                    groupInviteHash: testGroupInviteHash
                })
                .set('authorization', token)
                .then(res => {
                    // status 404
                    expect(res.status).toBe(404);

                    // error message
                    expect(res.body.error).toBe('invalid group id');
                })
        })
    })
    // Get GroupInfo and AdminInfo using groupInviteHash
    describe('get adminInfo and groupInfo using groupInviteHash', function(){
        it('should post groupInviteHash successfully', function(){
            return request(server)
                .get('/api/inviteToGroup')
                .send({
                    groupInviteHash: testGroupInviteHash
                })
                // .set('authorization', token)
                .then(res => {
                    // status 200
                    expect(res.status).toBe(200);

                    // success message
                    expect(res.body.message).toBe('invite hash found');

                    // adminInfo
                    expect(res.body.adminInfo).toBeDefined();
                    expect(res.body.adminInfo.id).toBe(testAdminId);
                    expect(res.body.adminInfo.name).toBe(testAdminInfo.name);

                    // groupInfo
                    expect(res.body.groupInfo).toBeDefined();
                    expect(res.body.groupInfo.id).toBe(testGroupId);
                    expect(res.body.groupInfo.groupName).toBe(testGroupInfo.groupName);
                })
        })
        // 2. error case - invalid groupInviteHash
        it('should get error when groupInviteHash is not found', function(){
            return request(server)
                .get('/api/inviteToGroup')
                .send({
                    groupInviteHash: 'randomHash'
                })
                // .set('authorization', token)
                .then(res => {
                    // status 404
                    expect(res.status).toBe(404);

                    // error message
                    expect(res.body.error).toBe('invalid group invite hash');
                })
        })
    })
    // Delete the group from the database
    describe('should delete the test group', function(){
        it('should delete successfully when groupID is valid', function() {
            return request(server)
                .delete(`/api/groups/${testGroupId}`)
                .send({adminId: testAdminId})
                .set('authorization', token)
                .then(res => {
                    // status 201
                    expect(res.status).toBe(201)

                    // success message
                    expect(res.body.message).toBe('group deleted successfully!')
                });
        });
    })
})