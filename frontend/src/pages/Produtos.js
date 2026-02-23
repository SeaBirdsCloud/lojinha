import { useEffect, useState } from "react";
import api from "../api";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    estoque: ""
  });

  useEffect(() => {
    loadProdutos();
  }, []);

  async function loadProdutos() {
    const res = await api.get("/produtos");
    setProdutos(res.data);
  }

  async function salvar() {
    await api.post("/produtos", form);
    setForm({ nome: "", descricao: "", preco: "", estoque: "" });
    loadProdutos();
  }

  async function remover(id) {
    await api.delete(`/produtos/${id}`);
    loadProdutos();
  }

  return (
    <div>
      <h2>Produtos</h2>

      <input placeholder="Nome"
        value={form.nome}
        onChange={e => setForm({ ...form, nome: e.target.value })} />

      <input placeholder="Descrição"
        value={form.descricao}
        onChange={e => setForm({ ...form, descricao: e.target.value })} />

      <input type="number" placeholder="Preço"
        value={form.preco}
        onChange={e => setForm({ ...form, preco: e.target.value })} />

      <input type="number" placeholder="Estoque"
        value={form.estoque}
        onChange={e => setForm({ ...form, estoque: e.target.value })} />

      <button onClick={salvar}>Salvar</button>

      <ul>
        {produtos.map(p => (
          <li key={p.id_produto}>
            {p.nome} - R$ {p.preco} - Estoque: {p.estoque}
            <button onClick={() => remover(p.id_produto)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
