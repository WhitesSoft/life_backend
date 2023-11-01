const historialExtraoralService = require('../services/historial_extraoralService')

exports.create = async (req, res) => {
    try {
        const extraoral = await historialExtraoralService.createHistorialExtraoral(req.params.idHistorial, req.body);

        if (extraoral !== null) {
            res.status(201).send(JSON.stringify({ message: "Examen extraoral asociada con exito al historial!" }));
        } else {
            res.status(404).send(JSON.stringify({ message: "No existe el historial" }));
        }

    } catch (error) {
        if (error.message === 'Ya existe un examen extraoral asociada para este historial.') {
            res.status(400).send(JSON.stringify({ message: error.message }));
        } else {
            res.status(500).send(JSON.stringify({ message: "Error al asociar el examen extra oral al historial." }));
        }
    }
}

exports.getById = async (req, res) => {
    try {
        const extraoral = await historialExtraoralService.getHistorialExtraoralById(req.params.id);
        if (extraoral) {
            res.status(200).send(JSON.stringify(extraoral));
        } else {
            res.status(404).send(JSON.stringify({ message: "Examen extra oral no encontrado." }));
        }
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: error.error }));
    }
};

exports.update = async (req, res) => {
    try {
        const extraoral = await historialExtraoralService.updateExtraoral(req.params.id, req.body);
        if (extraoral) {
            res.status(200).send(JSON.stringify({ message: "Examen extra oral modificada exitosamente" }));
        } else {
            res.status(404).send(JSON.stringify({ message: "Examen extra oral no encontrado." }));
        }
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: error }));
    }
};

