import http from "node:http";

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

  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    req.body = null;
  }

  if (method === "GET" && url === "/users") {
    return res
      .setHeader("Content-type", "application/json")
      .end(JSON.stringify(users));
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
