import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Clientes from "./pages/Clientes";
import Produtos from "./pages/Produtos";
import Funcionarios from "./pages/Funcionarios";
import Vendas from "./pages/Vendas";
import Historico from "./pages/Historico"

function App() {
  return (
    <BrowserRouter>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/vendas">Vendas</Link>
          <Link to="/produtos">Produtos</Link> 
          <Link to="/clientes">Clientes</Link>
          <Link to="/funcionarios">Funcionários</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/funcionarios" element={<Funcionarios />} />
        <Route path="/vendas" element={<Vendas />} />
        <Route path="/" element={<Historico />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
