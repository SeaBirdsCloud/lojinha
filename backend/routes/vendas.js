const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", async (req, res) => {
  const { id_cliente, id_funcionario, itens } = req.body;

  const conn = await db.getConnection();
  await conn.beginTransaction();

  try {
    let total = 0;

    for (let item of itens) {
      total += item.quantidade * item.preco_unitario;
    }

    const [venda] = await conn.query(
      "INSERT INTO vendas (id_cliente, id_funcionario, total) VALUES (?, ?, ?)",
      [id_cliente, id_funcionario, total]
    );

    const id_venda = venda.insertId;

    for (let item of itens) {
      const subtotal = item.quantidade * item.preco_unitario;

      await conn.query(
        "INSERT INTO itens_venda (id_venda, id_produto, quantidade, preco_unitario, subtotal) VALUES (?, ?, ?, ?, ?)",
        [id_venda, item.id_produto, item.quantidade, item.preco_unitario, subtotal]
      );

      await conn.query(
        "UPDATE produtos SET estoque = estoque - ? WHERE id_produto=?",
        [item.quantidade, item.id_produto]
      );
    }

    await conn.commit();
    res.json({ message: "Venda realizada com sucesso" });
  } catch (err) {
    await conn.rollback();
    res.status(500).json(err);
  } finally {
    conn.release();
  }
});

module.exports = router;
