const request = require('supertest')
const app = require('../app')

describe("API de Receitas", () => {
    test("Deve adicionar uma receita em Post", async () => {
        const body = {
            nome: "Bolo de Cenoura",
            ingredientes: ["cenoura", "farinha", "açúcar", "ovos"],
            modoPreparo: "Misture tudo e leve ao forno por 40 minutos.",
            tempoPreparo: 60
        }
        const res = await request(app).post("/api/receitas").send(body)
        expect(res.statusCode).toEqual(201)
        expect(res.body.nome).toBe("Bolo de Cenoura")
    })

    test("Deve retornar 200 em GET /api/receitas", async () => {
        const res = await request(app).get("/api/receitas")
        expect(res.statusCode).toEqual(200)
        expect(Array.isArray(res.body)).toBe(true)
    })

    test("Deve retornar um array receita com id 1744338003564", async () => {
        const res = await request(app).get("/api/receitas/1744338003564")
        expect(res.body.id).toEqual(1744338003564)
    })

    test("Deve retornar um array com nome: bolo de chocolate", async () => {
        const body = {
            nome: "Bolo de Chocolate",
            ingredientes: ["cenoura", "farinha", "açúcar", "ovos"],
            modoPreparo: "Misture tudo e leve ao forno por 40 minutos.",
            tempoPreparo: 60
        }
        const res = await request(app).put("/api/receitas/1744338003564").send(body)
        expect(res.body.nome).toEqual("Bolo de Chocolate")
    })

    test("Deve retornar receita não encontrada", async () => {
        const res = await request(app).delete("/api/receitas/1744338003564")
        
        expect(res.statusCode).toEqual(204)
    })

})