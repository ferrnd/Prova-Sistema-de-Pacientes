import express from "express";
import dotenv from "dotenv";
import pacientesRoutes from "./src/routes/pacientesRoutes.js"
import dados from "./src/models/dados.js";

const { pacientes } = dados;
const serverPort = process.env.PORT || 3000;
const app = express();

app.use(express.json());
dotenv.config();

app.get("/", (req, res) => {
  res.send("🚀 Servidor funcionando...");
});

app.get("/pacientes/convenio/:convenio", (req, res) => {
  let convenio = req.params.convenio.toLocaleLowerCase();
  const paciente = pacientes.filter((p) =>
p.convenio.toLocaleLowerCase().includes(convenio)
  );
  if (pacientes) {
    res.status(200).json(paciente);
  }
  res.status(404)({
    error: "paciente não encontrado.",
  });
});

app.get("/pacientes/endereco/:endereco", (req, res) => {
  let endereco = req.params.endereco.toLocaleLowerCase();
  const paciente = pacientes.filter((p) =>
p.endereco.toLocaleLowerCase().includes(endereco)
  );
  if (pacientes) {
    res.status(200).json(paciente);
  }
  res.status(404)({
    error: "paciente não encontrado.",
  });
});

app.get("/pacientes/historico/:historico", (req, res) => {
  let historico = req.params.historico.toLocaleLowerCase();
  const paciente = pacientes.filter((p) =>
p.historico.toLocaleLowerCase().includes(historico)
  );
  if (pacientes) {
    res.status(200).json(paciente);
  }
  res.status(404)({
    error: "paciente não encontrado.",
  });
});

app.get("/pacientes/idade/crianca/:dataNascimento", (req, res) => {
  let dataNascimento = req.params.dataNascimento.toLocaleLowerCase();
  const paciente = pacientes.filter((p) =>
p.dataNascimento.toLocaleLowerCase().includes(dataNascimento)
  );
  if (pacientes) {
    res.status(200).json(paciente);
  }
  res.status(404)({
    error: "paciente não encontrado.",
  });
});

app.use("/pacientes", pacientesRoutes);

app.listen(serverPort, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});
