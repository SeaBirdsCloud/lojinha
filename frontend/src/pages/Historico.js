import { useEffect, useState } from "react";
import api from "../api";

export default function Historico() {
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    loadHistorico();
  }, []);

  async function loadHistorico() {
    const res = await api.get("/"); // <-- nome da sua rota
    setHistorico(res.data);
  }

  function formatarData(dataISO) {
    const data = new Date(dataISO);
    return data.toLocaleDateString("pt-BR") + " " +
           data.toLocaleTimeString("pt-BR");
  }

  return (
    <div>
      <h2>Histórico</h2>

      <ul>
        {historico.map((item, index) => (
          <li key={index}>
            Cliente: {item.cliente_nome} | 
            Funcionário: {item.funcionario_nome} | 
            Data: {formatarData(item.data_venda)} | 
            Total: R$ {item.total}
          </li>
        ))}
      </ul>
    </div>
  );
}