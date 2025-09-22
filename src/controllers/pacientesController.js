import dados from "../models/dados.js";

const { pacientes } = dados;

const getAllPacientes = (req, res) => {
  let resultado = pacientes;

  res.status(200).json({
    total: resultado.length,
    data: resultado,
  });
};

const getPacientesById = (req, res) => {
  let id = req.params.id;
  id = parseInt(id);
  const paciente = pacientes.find((paciente) => paciente.id === id);

  if (pacientes) {
    res.status(200).json(paciente);
  } else {
     return res.status(404).json({ 
      success: false,
      message: `Paciente número ${id} não existe`, 
    });
  }
};

const createPacientes = (req, res) => {
  const { nome, cpf, dataNascimento, telefone, endereco, convenio, historico} = req.body;

  if (!nome) {
    return res.status(400).json({
      success: false,
      message: "O nome do Paciente é obrigatório.",
    });
  }

  const novoPaciente = {
    id: pacientes.length + 1,
    nome: nome,
    cpf: cpf,
    dataNascimento: dataNascimento,
    telefone: telefone,
    endereco: endereco,
    convenio: convenio,
    historico: historico
  };

  pacientes.push(novoPaciente);

  res.status(200).json({
    success: true,
    message: "Ficha do Paciente criada com sucesso.",
    paciente: novoPaciente,
  });
};

const deletePaciente = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Número do Paciente não é válido",
    });
  }

  const pacienteParaRemover = pacientes.find((p) => p.id === id);

  if (!pacienteParaRemover) {
    return res.status(404).json({
      success: false,
      message: `Paciente com o número ${id} não existe`,
    });
  }

  const pacientesFiltrados = pacientes.filter((pacientes) => pacientes.id != id);

  pacientes.splice(0, pacientes.length, ...pacientesFiltrados);

  res.status(200).json({
    success: true,
    message: `A ficha do paciente com o número ${id} foi deletada com sucesso.`,
  });
};

const updatePaciente = (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, cpf, dataNascimento, telefone, endereco, convenio, historico } = req.body;
  const idParaEditar = id;

  if (isNaN(idParaEditar)) {
    return res.status(400).json({
      success: false,
      message: "O número deve ser válido.",
    });
  }

  const pacienteExiste = pacientes.find((paciente) => paciente.id === idParaEditar);
  if (!pacienteExiste) {
    return res.status(404).json({
      success: false,
      mesage: `O paciente com o número ${idParaEditar} não existe`,
    });
  }

  const pacienteAualizados = pacientes.map((pacientes) =>
    pacientes.id === idParaEditar
      ? {
          ...pacientes,
          ...(nome && { nome }),
          ...(cpf && { cpf }),
          ...(dataNascimento && { dataNascimento: parseInt(dataNascimento) }),
          ...(telefone && { telefone }),
          ...(endereco && { endereco }),
          ...(convenio && {convenio}),
          ...(historico && {historico})
        }
      : pacientes
  );

  pacientes.splice(0, pacientes.length, ...pacienteAualizados);
  const pacienteEditado = pacientes.find((paciente) => paciente.id === idParaEditar);
  res.status(200).json({
    success: true,
    message: "Dados do paciente aualizados com sucesso.",
    paciente: pacienteEditado,
  });
};

export { getAllPacientes, getPacientesById, createPacientes, deletePaciente, updatePaciente };