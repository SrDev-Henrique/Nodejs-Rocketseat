import http from "node:http";
import { randomUUID } from "node:crypto";
import { json } from "./middlewares/json.js";
import { Database } from "./database.js";

// GET, POST, PUT, PATCH, DELETE

// GET => Buscar um recurso do back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar um recurso específico no back-end
// DELETE => Deletar um recurso no back-end

// Cabeçalhos (requisição/resposta) => Metadados

// HTTP Status Code: https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status

const database = new Database();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  if (method === "GET" && url === "/users") {
    const users = database.select("users");

    return res.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { nome, email } = req.body;

    const user = {
      id: randomUUID(),
      nome,
      email,
    };

    database.insert("users", user);

    return res.writeHead(201).end("Usuário Criado");
  }

  return res.writeHead(404).end("Not Found");
});

server.listen(3333);
