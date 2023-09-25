let supertest = require('supertest');
let { app } = require('../server/server');
let router = require('../services/services');
app.use('/api', router);

// Mock de seguridad
let jwt = require('jsonwebtoken');
jest.mock('jsonwebtoken', () => ({
    verify: jest.fn().mockReturnValue(true)
}))

// Mock llamados a BD
let { Persona } = require('../models/entity');
jest.mock('../models/entity', () => ({
    Persona: {
        find: jest.fn().mockReturnValue([
            {
                "estado": true,
                "_id": "607620acce323b3b54b94d99",
                "nombre": "Ednoa",
                "age": 3
            },
            {
                "estado": true,
                "_id": "6074a26d1c527d249449af39",
                "nombre": "Gladys",
                "age": 68,
                "fecha": "2021-04-12T04:00:00.000Z"
            }
        ])
    }
}))

describe('set api', () => {
    it('test timeout', async () => {
        let response = await supertest(app).get('/api/timenow');
        expect(response.status).toBe(200);
    })

    it('test hola-mundo', async () => {
        let response = await supertest(app).get('/api/hola-mundo').set('Authorization', `2vF9R25iN6VvLdlFA`);;
        expect(response.status).toBe(200);
    })

    it('test get all', async () => {
        let response = await supertest(app).get('/api/all').set('Authorization', `2vF9R25iN6VvLdlFA`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.text).toBeDefined();
    })
})