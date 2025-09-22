import express from "express";
import {
  getAllPacientes,
  getPacientesById,
  createPacientes,
  deletePaciente,
  updatePaciente,
} from "../controllers/pacientesController.js";

const router = express.Router();

router.get("/", getAllPacientes);
router.get("/:id", getPacientesById);
router.post("/", createPacientes);
router.delete("/:id", deletePaciente);
router.put("/:id", updatePaciente);

export default router;