import { useEffect, useState } from "react";
import api from "../api";

export default function Vendas() {
  const [clientes, setClientes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const [idCliente, setIdCliente] = useState("");
  const [idFuncionario, setIdFuncionario] = useState("");
  const [itens, setItens] = useState([]);

  const vendaInvalida =
    !idCliente || !idFuncionario || itens.length === 0;

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    const c = await api.get("/clientes");
    const f = await api.get("/funcionarios");
    const p = await api.get("/produtos");

    setClientes(c.data);
    setFuncionarios(f.data);
    setProdutos(p.data);
  }

  function adicionarItem(produto) {
    const itemExistente = itens.find(
      item => item.id_produto === produto.id_produto
    );

    if (itemExistente) {
      const novosItens = itens.map(item =>
        item.id_produto === produto.id_produto
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      );
      setItens(novosItens);
    } else {
      setItens([
        ...itens,
        {
          id_produto: produto.id_produto,
          nome: produto.nome,
          quantidade: 1,
          preco_unitario: produto.preco
        }
      ]);
    }
  }

  function removerItem(index) {
    const novosItens = itens.filter((_, i) => i !== index);
    setItens(novosItens);
  }

  function alterarQuantidade(index, quantidade) {
    if (quantidade < 1) return;

    const novosItens = [...itens];
    novosItens[index].quantidade = quantidade;
    setItens(novosItens);
  }

  async function finalizarVenda() {
    if (!idCliente) {
      alert("Selecione um cliente!");
      return;
    }

    if (!idFuncionario) {
      alert("Selecione um funcionário!");
      return;
    }

    if (itens.length === 0) {
      alert("Adicione pelo menos um produto!");
      return;
    }

    await api.post("/vendas", {
      id_cliente: idCliente,
      id_funcionario: idFuncionario,
      itens
    });

    alert("Venda realizada!");
    setItens([]);
    setIdCliente("");
    setIdFuncionario("");
  }

  const total = itens.reduce(
    (acc, item) => acc + item.quantidade * item.preco_unitario,
    0
  );

  return (
    <div>
      <h2>Nova Venda</h2>

      <select onChange={e => setIdCliente(e.target.value)} required>
        <option>Selecione Cliente</option>
        {clientes.map(c => (
          <option key={c.id_cliente} value={c.id_cliente}>
            {c.nome}
          </option>
        ))}
      </select>

      <select onChange={e => setIdFuncionario(e.target.value)} required>
        <option>Selecione Funcionário</option>
        {funcionarios.map(f => (
          <option key={f.id_funcionario} value={f.id_funcionario}>
            {f.nome}
          </option>
        ))}
      </select>

      <h3>Produtos</h3>
      <ul>
        {produtos.map(p => (
          <li key={p.id_produto}>
            {p.nome} - R$ {p.preco}
            <button onClick={() => adicionarItem(p)}>Adicionar</button>
          </li>
        ))}
      </ul>

      <h3>Itens da Venda</h3>
      <ul>
        {itens.map((item, index) => (
          <li key={item.id_produto}>
            {item.nome}
            <input
              type="number"
              value={item.quantidade}
              min="1"
              onChange={e =>
                alterarQuantidade(index, Number(e.target.value))
              }
            />
            Subtotal: R$ {item.quantidade * item.preco_unitario}

            <button onClick={() => removerItem(index)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <h3>Total: R$ {total}</h3>

      <button
        onClick={finalizarVenda}
        disabled={vendaInvalida}
        style={{
          backgroundColor: vendaInvalida ? "#ccc" : "green",
          cursor: vendaInvalida ? "not-allowed" : "pointer"
        }}
      >
        Finalizar Venda
      </button>
    </div>
  );
}
