# lojinha

Sitema de cadastro de clientes, funcionários e produtos.
Pode ser realizada vendas dos produtos, anexando o cliente e o funcionários.

## Esse sistema usar:

- NodeJS (frontend)
- Reackt (backend)
- MySQL (database)

Configurações básicas para criar uma aplicação:

## Backend

#### `server.js`

```
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

# Passe por onde o backend sera entrague
app.use("/entraga1", require("./routes/back1"));
app.use("/entraga2", require("./routes/back2"));

# Passe a porta de saida do backend
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
```

#### `package.json`

```
{
  "name": "nome-do-back",
  "version": "1.0.0",
  "main": "server.js",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "mysql2": "^3.6.0"
  }
}
```

#### `db.js`

```
const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "ip_database",
  user: "username_database",
  password: "userpassword_database",
  database: "name_database",
});

module.exports = connection.promise();
```

#### `routes/back1`

```
const express = require("express");
const router = express.Router();
const db = require("../db");

# Listagem da tabela
router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM table");
  res.json(rows);
});

# Insercao de dados na tabela
router.post("/", async (req, res) => {
  const { dado1, dado2, dado3 } = req.body; # Valores resgatados pela aplicacao
  await db.query(
    "INSERT INTO table (dado1, dado2, dado3) VALUES (?, ?, ?)", # Comando SQL para inserir os dados
    [dado1, dado2, dado3] # Campos da tabela do banco de dados
  );
  res.json({ message: "Dados inseridos" });
});

# Atualização de dados na tabela
router.put("/:id", async (req, res) => {
  const { dado1, dado2, dado3 } = req.body; # Valores resgatados pela aplicacao
  await db.query(
    "UPDATE table SET dado1=?, dado2=?, dado3=? WHERE id_dado=?",
    [dado1, dado2, dado3, req.params.id]
  );
  res.json({ message: "Dado atualizado" });
});

# Delete de dados - Deixa desativo (Melhor pratica)
router.delete("/:id", async (req, res) => {
  await db.query("UPDATE table SET ativo = FALSE WHERE id_dado=?", [
    req.params.id,
  ]);
  res.json({ message: "Dado removido" });
});

module.exports = router;
```

## Frontend

#### `package.json`

```
{
  "name": "nome-aplicacao",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
  "axios": "^1.6.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.x.x",
  "react-scripts": "5.0.1"
},
  "scripts": {
    "start": "react-scripts start"
  }
}
```

#### `public/index.html`

```
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="index.css">
    <title>App</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

#### `public/index.css`

```
/* RESET */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  color: red;
}

...
```

#### `src/api.js`

```
import axios from "axios";

export default axios.create({
  baseURL: "http://ip_backend:porta_backend",
});
```

#### `src/App.js`

```
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Front1 from "./pages/Front2";
import Front2 from "./pages/Front2";

function App() {
  return (
    <BrowserRouter>
      <header>
        <nav>
          <Link to="/">Front1</Link> # Rota para o HTML
          <Link to="/front2">Front2</Link> # Rota para o HTML
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Front1 />} /> # Rota para o qual arquivo deve bater
        <Route path="/Front2" element={<Front2 />} /> # Rota para o qual arquivo deve bater
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

#### `src/index.js`

```
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

#### `src/pages/Front1`

```
import { useEffect, useState } from "react";
import api from "../api";

export default function Front1() {
  const [front1, setFront1] = useState([]);

  useEffect(() => {
    loadFront1();
  }, []);

  async function loadFront1() {
    const res = await api.get("/"); // <-- nome da sua rota
    setHistorico(res.data);
  }

  # Listagem dos dados da tabela

  return (
    <div>
      <h2>Front1</h2>

      <ul>
        {historico.map((item, index) => (
          <li key={index}>
            Dado1: {item.dado1} | 
            Dado2: {item.dado2} | 
            Dado3: {item.dado3} | 
            Dado4: {item.dado4}
          </li>
        ))}
      </ul>
    </div>
  );
}
```
