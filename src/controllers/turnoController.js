const turnoService = require('../services/turnoService')

exports.getAll = async (req, res) => {
    try {
        const turnos = await turnoService.getAllTurnos();
        res.status(200).send(turnos);
    } catch (error) {
        res.status(500).send({ message: "Error al obtener los turnos." });
    }
}

exports.getById = async (req, res) => {
    try {
        const turno = await turnoService.getTurnoById(req.params.id);
        if (turno) {
            res.status(200).send(turno);
        } else {
            res.status(404).send({ message: "Turno no encontrado." });
        }
    } catch (error) {
        res.status(500).send({ message: "Error al obtener el turno." });
    }
}

exports.getByIdPaciente = async(req, res) =>{
    try {
        const turno = await turnoService.getTurnoByIdPaciente(req.params.idPaciente);
        if (turno) {
            res.status(200).send(turno);
        } else {
            res.status(404).send({ message: "No existe el paciente" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error al obtener los turnos." });
    }
}

exports.create = async (req, res) => {
    try {

        const turno = await turnoService.createTurno(req.params.idPaciente, req.body);

        if (turno !== null) {
            res.status(201).send({ message: "Turno creado con exito!" });
        } else {
            res.status(404).send({ message: "No existe el paciente" });
        }

    } catch (error) {
        res.status(500).send({ message: "Error al crear el turno." });
    }
}

exports.update = async (req, res) => {
    try {
        const turno = await turnoService.updateTurno(req.params.id, req.body);
        if (turno) {
            res.status(200).send({ message: "Turno modificado exitosamente" });
        } else {
            res.status(404).send({ message: "Turno no encontrado." });
        }
    } catch (error) {
        res.status(500).send({ message: "Error al actualizar el turno." });
    }
};

exports.remove = async (req, res) => {
    try {

        const turno = await turnoService.deleteTurno(req.params.id);
        if (turno) {
            res.status(200).send({ message: "Turno eliminado correctamente" });
        } else {
            res.status(404).send({ message: "No existe el turno" });
        }

    } catch (error) {
        res.status(500).send({ message: "Error al eliminar el turno." });
    }
};