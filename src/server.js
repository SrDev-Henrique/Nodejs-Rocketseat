// GET, POST, PUT, PATCH, DELETE

// GET => Buscar um recurso do back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar um recurso específico no back-end
// DELETE => Deletar um recurso no back-end

// Cabeçalhos (requisição/resposta) => Metadados

// HTTP Status Code: https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status

// Query Parameters: http://localhost:3333/users?userId=1&name=Henrique (Filtros, paginação, não obrigatório)
// Route Parameters: http://localhost:3333/users/1 (Identificar um recurso)
// Request Body: http://localhost:3333/users (Dados para criação ou atualização de um recurso)

import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path === url;
  });

  return route ? route.handler(req, res) : res.writeHead(404).end("Not Found");

  return res.writeHead(404).end("Not Found");
});

server.listen(3333);
