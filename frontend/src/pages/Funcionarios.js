import { useEffect, useState } from "react";
import api from "../api";

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    cargo: "",
    salario: "",
    data_admissao: ""
  });

  useEffect(() => {
    loadFuncionarios();
  }, []);

  async function loadFuncionarios() {
    const res = await api.get("/funcionarios");
    setFuncionarios(res.data);
  }

  async function salvar() {
    await api.post("/funcionarios", form);
    setForm({ nome: "", cargo: "", salario: "", data_admissao: "" });
    loadFuncionarios();
  }

  async function remover(id) {
    await api.delete(`/funcionarios/${id}`);
    loadFuncionarios();
  }

  return (
    <div>
      <h2>Funcionários</h2>

      <input placeholder="Nome"
        value={form.nome}
        onChange={e => setForm({ ...form, nome: e.target.value })} />

      <input placeholder="Cargo"
        value={form.cargo}
        onChange={e => setForm({ ...form, cargo: e.target.value })} />

      <input type="number" placeholder="Salário"
        value={form.salario}
        onChange={e => setForm({ ...form, salario: e.target.value })} />

      <input type="date"
        value={form.data_admissao}
        onChange={e => setForm({ ...form, data_admissao: e.target.value })} />

      <button onClick={salvar}>Salvar</button>

      <ul>
        {funcionarios.map(f => (
          <li key={f.id_funcionario}>
            {f.nome} - {f.cargo}
            <button onClick={() => remover(f.id_funcionario)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
