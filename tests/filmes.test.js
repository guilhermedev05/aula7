const request = require('supertest')
const app = require('../app')

describe("API de Livros", () => {
    test("Deve retornar 200 em GET /api/livros", async () => {
        const res = await request(app).get("/api/filmes")
        expect(res.statusCode).toEqual(200)
        expect(Array.isArray(res.body)).toBe(true)
    })

    test("Deve retornar um array filme com id 1", async () => {
        const res = await request(app).get("/api/filmes/1743987212705")
        expect(res.body.id).toBe(1743987212705)
    })
    
    test("Deve retornar um array filme com id 1", async () => {
        const res = await request(app).get("/api/filmes/1743987212705")
        expect(res.body.id).toBe(1743987212705)
    })
})