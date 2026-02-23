const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM funcionarios WHERE ativo = 1");
  res.json(rows);
});

router.post("/", async (req, res) => {
  const { nome, cargo, salario, data_admissao } = req.body;
  await db.query(
    "INSERT INTO funcionarios (nome, cargo, salario, data_admissao) VALUES (?, ?, ?, ?)",
    [nome, cargo, salario, data_admissao]
  );
  res.json({ message: "Funcionário criado" });
});

router.delete("/:id", async (req, res) => {
  await db.query("UPDATE funcionarios SET ativo = FALSE WHERE id_funcionario=?", [
    req.params.id,
  ]);
  res.json({ message: "Funcionário removido" });
});

module.exports = router;
