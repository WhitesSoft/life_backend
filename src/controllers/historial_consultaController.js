const historialConsultaService = require('../services/historial_consultaService')

exports.create = async (req, res) => {
    try {
        const consulta = await historialConsultaService.createHistorialConsulta(req.params.idHistorial, req.body);

        if (consulta !== null) {
            res.status(201).send(JSON.stringify({ message: "Consulta asociada con exito al historial!" }));
        } else {
            res.status(404).send(JSON.stringify({ message: "No existe el historial" }));
        }

    } catch (error) {
        if (error.message === 'Ya existe una consulta asociada para este historial.') {
            res.status(400).send(JSON.stringify({ message: error.message }));
        } else {
            res.status(500).send(JSON.stringify({ message: "Error al asociar la consulta al historial." }));
        }
    }
}

exports.getById = async (req, res) => {
    try {
        const consulta = await historialConsultaService.getHistorialConsultaById(req.params.id);
        if (consulta) {
            res.status(200).send(JSON.stringify(consulta));
        } else {
            res.status(404).send(JSON.stringify({ message: "Consulta no encontrado." }));
        }
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: error.error }));
    }
};

exports.update = async (req, res) => {
    try {
        const consulta = await historialConsultaService.updateHistorialConsulta(req.params.id, req.body);
        if (consulta) {
            res.status(200).send(JSON.stringify({ message: "Consulta modificada exitosamente" }));
        } else {
            res.status(404).send(JSON.stringify({ message: "Consulta no encontrado." }));
        }
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: error }));
    }
};

