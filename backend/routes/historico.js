const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  const [rows] = await db.query(`
    SELECT 
      clientes.nome AS cliente_nome,
      funcionarios.nome AS funcionario_nome,
      vendas.data_venda,
      vendas.total
    FROM vendas
    INNER JOIN clientes 
      ON vendas.id_cliente = clientes.id_cliente
    INNER JOIN funcionarios 
      ON funcionarios.id_funcionario = vendas.id_funcionario
  `);

  res.json(rows);
});

module.exports = router;