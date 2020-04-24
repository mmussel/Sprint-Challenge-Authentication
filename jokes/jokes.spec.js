const request = require('supertest');
const server = require('../api/server.js');
const db = require('../database/dbConfig.js')

describe('testing the server.js',()=>{
    beforeEach(async function (){
        await db('users').truncate();
    })
    describe('testing the jokes enpoint', ()=>{
        it('returns a status of ', async ()=> {
            await request(server)
            .post('/api/auth/register')
            .send({ username: 'dylan31', password: 'something'})
            .then(res => {
                expect(res.status).toBe(201);
            })
            await request(server)
            .post('/api/auth/login')
            .send({ username: 'dylan31', password: 'something'})
            .then(res => {
                return request(server)
                .get('/api/jokes')
                .set({ Authorization :res.body.token})
                .then((res) => {
                    expect(res.status).toBe(200);
                  })
                })
            await db('users').where({username: 'dylan31'}).truncate()

        })
        it('returns a status of ', async ()=> {
            await request(server)
            .post('/api/auth/register')
            .send({ username: 'dylan31', password: 'something'})
            .then(res => {
                expect(res.status).toBe(201);
            })
            await request(server)
            .post('/api/auth/login')
            .send({ username: 'dylan31', password: 'something'})
            .then(res => {
                return request(server)
                .get('/api/jokes')
                .set({ Authorization :res.body.token})
                .then((res) => {
                    expect(res.body).toBeTruthy();
                  })
                })
            await db('users').where({username: 'dylan31'}).truncate()

        })
    })
})