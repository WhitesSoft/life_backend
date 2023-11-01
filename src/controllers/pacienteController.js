const pacienteService = require('../services/pacienteService')

exports.getAll = async (req, res) => {
    try {
        const pacientes = await pacienteService.getAllPacientes();
        res.status(200).send(JSON.stringify(pacientes));
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: "Error al obtener los pacientes." }));
    }
};

exports.getById = async (req, res) => {
    try {
        const paciente = await pacienteService.getPacienteById(req.params.id);
        if (paciente) {
            res.status(200).send(JSON.stringify(paciente));
        } else {
            res.status(404).send(JSON.stringify({ message: "Paciente no encontrado." }));
        }
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: "Error al obtener el paciente." }));
    }
};


exports.create = async (req, res) => {
    try {
        const paciente = await pacienteService.createPaciente(req.body);
        res.status(201).send(JSON.stringify({message: "Paciente creado con exito!", paciente: paciente}));
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: "Error al crear el paciente." }));
    }
}

exports.update = async (req, res) => {
    try {
        const paciente = await pacienteService.updatePaciente(req.params.id, req.body);
        if (paciente) {
            res.status(200).send(JSON.stringify("Paciente modificado exitosamente"));
        } else {
            res.status(404).send(JSON.stringify({ message: "Paciente no encontrado." }));
        }
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: "Error al actualizar el paciente." }));
    }
};


exports.remove = async (req, res) => {
    try {
        const paciente = await pacienteService.deletePaciente(req.params.id);
        if (paciente) {
            res.status(200).send(JSON.stringify("Paciente eliminado correctamente"));
        } else {
            res.status(404).send(JSON.stringify("No existe el paciente"));
        }
    } catch (error) {
        res.status(500).send(JSON.stringify("Error al eliminar el paciente."));
    }
};