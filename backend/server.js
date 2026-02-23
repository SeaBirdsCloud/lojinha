const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/clientes", require("./routes/clientes"));
app.use("/funcionarios", require("./routes/funcionarios"));
app.use("/produtos", require("./routes/produtos"));
app.use("/vendas", require("./routes/vendas"));
app.use("/", require("./routes/historico"));

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
