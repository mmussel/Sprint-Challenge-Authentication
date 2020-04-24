const request = require('supertest');
const server = require('../api/server.js');
const db = require('../database/dbConfig.js')

describe('testing the /api/auth endpoints', ()=>{
    
    describe('testing the GET / enpoint', ()=>{
        it('should return a status of 200', ()=>{
            return request(server)
            .get('/api/auth')
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
        it('should return a message in the body saying the api is running', ()=>{
            return request(server)
            .get('/api/auth')
            .then(res => {
                expect(res.body.message).toBe('auth api running')
            })
        })
    })

    describe('tesitng the POST / register endpoint', ()=>{
        it('should return a status of 201', async ()=> {
            await request(server)
            .post('/api/auth/register')
            .send({ username: 'mmussel', password: 'something'})
            .then(res => {
                expect(res.status).toBe(201);
            })
            await db('users').where({username: 'mmussel'}).delete()

        })
        it('should return a the user information', ()=> {
            return request(server)
            .post('/api/auth/register')
            .send({ username: 'mmussel', password: 'something'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        })
    })
    
    describe('tesitng the POST / login endpoint', ()=>{
        it('should return a status of 200', ()=> {
            return request(server)
            .post('/api/auth/login')
            .send({username: "mmussel", password: "something"})
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
        it('should return a a welcome message', ()=> {
            return request(server)
            .post('/api/auth/login')
            .send({username: "mmussel", password: "something"})
            .then(res => {
                expect(res.body.token).toBeTruthy()
            })
        })
    })
})