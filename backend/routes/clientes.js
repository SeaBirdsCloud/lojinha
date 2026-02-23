const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM clientes WHERE ativo = 1");
  res.json(rows);
});

router.post("/", async (req, res) => {
  const { nome, cpf, telefone, email } = req.body;
  await db.query(
    "INSERT INTO clientes (nome, cpf, telefone, email) VALUES (?, ?, ?, ?)",
    [nome, cpf, telefone, email]
  );
  res.json({ message: "Cliente criado" });
});

router.put("/:id", async (req, res) => {
  const { nome, cpf, telefone, email } = req.body;
  await db.query(
    "UPDATE clientes SET nome=?, cpf=?, telefone=?, email=? WHERE id_cliente=?",
    [nome, cpf, telefone, email, req.params.id]
  );
  res.json({ message: "Cliente atualizado" });
});

router.delete("/:id", async (req, res) => {
  await db.query("UPDATE clientes SET ativo = FALSE WHERE id_cliente=?", [
    req.params.id,
  ]);
  res.json({ message: "Cliente removido" });
});

module.exports = router;
