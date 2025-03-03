import http from "node:http";
import { json } from "./middlewares/json.js";

// GET, POST, PUT, PATCH, DELETE

// GET => Buscar um recurso do back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar um recurso específico no back-end
// DELETE => Deletar um recurso no back-end

// Cabeçalhos (requisição/resposta) => Metadados

// HTTP Status Code: https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status

const users = [];

const server = http.createServer(async (req, res) => {
    const { method, url } = req;
    
    await json(req, res);

  if (method === "GET" && url === "/users") {
    return res.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { nome, email } = req.body;

    users.push({
      id: 1,
      nome,
      email,
    });

    return res.writeHead(201).end("Usuário Criado");
  }

  return res.writeHead(404).end("Not Found");
});

server.listen(3333);
