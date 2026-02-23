const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM produtos WHERE ativo = 1");
  res.json(rows);
});

router.post("/", async (req, res) => {
  const { nome, descricao, preco, estoque } = req.body;
  await db.query(
    "INSERT INTO produtos (nome, descricao, preco, estoque) VALUES (?, ?, ?, ?)",
    [nome, descricao, preco, estoque]
  );
  res.json({ message: "Produto criado" });
});

router.put("/:id", async (req, res) => {
  const { nome, descricao, preco, estoque } = req.body;
  await db.query(
    "UPDATE produtos SET nome=?, descricao=?, preco=?, estoque=? WHERE id_produto=?",
    [nome, descricao, preco, estoque, req.params.id]
  );
  res.json({ message: "Produto atualizado" });
});

router.delete("/:id", async (req, res) => {
  await db.query("UPDATE produtos SET ativo = FALSE WHERE id_produto=?", [
    req.params.id,
  ]);
  res.json({ message: "Produto removido" });
});

module.exports = router;
