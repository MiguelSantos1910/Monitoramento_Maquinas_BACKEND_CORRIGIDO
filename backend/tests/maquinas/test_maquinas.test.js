import request from "supertest"
import { it, expect } from "vitest"
import app from "../../app"

it("POST /api/maquinas/cadastrar-maquinas deve cadastrar uma máquina", async () => {
  const res = await request(app)
    .post("/api/maquinas/cadastrar-maquinas")
    .send({
      nome: "Furadeira",
      modelo: "FX1",
      serie: "12345",
      setor: "Produção",
      status: "Ativa"
    });

  expect(res.status).toBe(201)
  expect(res.body.nome).toBe("Furadeira")
});
