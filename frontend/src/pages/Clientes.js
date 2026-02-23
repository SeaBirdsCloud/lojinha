import { useEffect, useState } from "react";
import api from "../api";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");

  useEffect(() => {
    loadClientes();
  }, []);

  async function loadClientes() {
    const res = await api.get("/clientes");
    setClientes(res.data);
  }

  async function addCliente() {
    await api.post("/clientes", { nome, cpf });
    loadClientes();
  }

  return (
    <div>
      <h2>Clientes</h2>

      <input placeholder="Nome" onChange={e => setNome(e.target.value)} />
      <input placeholder="CPF" onChange={e => setCpf(e.target.value)} />
      <button onClick={addCliente}>Adicionar</button>

      <ul>
        {clientes.map(c => (
          <li key={c.id_cliente}>{c.nome} - {c.cpf}</li>
        ))}
      </ul>
    </div>
  );
}
