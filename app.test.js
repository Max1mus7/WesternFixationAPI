import {jest, describe, it, expect} from '@jest/globals';
import request from 'supertest';
import server from './index.js';

jest.setTimeout(5000);

//==================================================================================================================
//                                           Index Router Test
//==================================================================================================================
describe('Index Route(website is live)', () => {
    it('should return 200', async () => {
        const response = await request(server).get('/');
        expect(response.status).toBe(200);
    });
});
//==================================================================================================================
//                                           User Router Tests
//==================================================================================================================
describe('User API Interactions', () => {
    it('Should successfully get all users from the database', async () => {
        const response = await request(server).get('/users');
        expect(response.status).toBe(200);
    });
    it('Should successfully log a user in.', async () => {
        const response = await request(server).post('/users/login').send({
            username: 'TestUser',
            password: 'T3stP@ssw0rd',
        });
        expect(response.status).toBe(200);
    });

    it('Should successfully create a user in the database', async () => {
        const response = await request(server).post('/users/new').send({
            username: 'TestUser',
            password: 'T3stP@ssw0rd',
            email: 'test@test.test',
            role: '2'
        });
        expect(response.status).toBe(201);
    });
    it('Should successfully get a user from the database', async () => {
        const response = await request(server).get('/users/1');
        expect(response.status).toBe(200);
    });
    it('Should successfully update a user in the database', async () => {
        const response = await request(server).put('/users/update/1').send({
            username: 'NewTestUser',
            password: 'T3stP@ssw0rd2.0',
            email: 'test@test.test',
            role: '2'
        });
        expect(response.status).toBe(200);
    });
    it('Should successfully delete a user from the database', async () => {
        const response = await request(server).delete('/users/delete/1');
        expect(response.status).toBe(200);
    });
});