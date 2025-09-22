import express from "express";
import dotenv from "dotenv";
import pacientesRoutes from "./src/routes/pacientesRoutes.js"
import dados from "./src/models/dados.js";

const { idosos } = dados;
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

app.get("/pacientes/cidade/:endereco", (req, res) => {
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

app.get("/pacientes/idosos/sim", (req, res) => {
  const result = pacientes.filter((p) => p.idoso === true);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404)({
      error: "paciente não encontrado",
    });
  }
});

app.get("/pacientes/adultos/sim", (req, res) => {
  const result = pacientes.filter((p) => p.adulto === true);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404)({
      error: "paciente não encontrado",
    });
  }
});

app.get("/pacientes/jovens/sim", (req, res) => {
  const result = pacientes.filter((p) => p.jovem === true);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404)({
      error: "paciente não encontrado",
    });
  }
});

app.use("/idosos", pacientesRoutes);
app.use("/pacientes", pacientesRoutes);

app.listen(serverPort, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});
