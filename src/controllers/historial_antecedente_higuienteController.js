const historialAntecedenteHiguieneService = require('../services/historial_antecedentes_higuieneService')

exports.create = async (req, res) => {
    try {
        const higuiene = await historialAntecedenteHiguieneService.createHistorialAntecedenteHiguiene(req.params.idHistorial, req.body);

        if (higuiene !== null) {
            res.status(201).send(JSON.stringify({ message: "Antecedente de higuiene asociada con exito al historial!" }));
        } else {
            res.status(404).send(JSON.stringify({ message: "No existe el historial" }));
        }

    } catch (error) {
        if (error.message === 'Ya existe un antecedente de higuiene asociada para este historial.') {
            res.status(400).send(JSON.stringify({ message: error.message }));
        } else {
            res.status(500).send(JSON.stringify({ message: "Error al asociar el antecedente de higuiene al historial." }));
        }
    }
}

exports.getById = async (req, res) => {
    try {
        const higuiene = await historialAntecedenteHiguieneService.getHistorialAntecedenteHiguieneById(req.params.id);
        if (higuiene) {
            res.status(200).send(JSON.stringify(higuiene));
        } else {
            res.status(404).send(JSON.stringify({ message: "Antecedente de higuiene no encontrado." }));
        }
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: error.error }));
    }
};

exports.update = async (req, res) => {
    try {
        const higuiene = await historialAntecedenteHiguieneService.updateAntecedenteHiguiene(req.params.id, req.body);
        if (higuiene) {
            res.status(200).send(JSON.stringify({ message: "Antecedente de higuiene modificada exitosamente" }));
        } else {
            res.status(404).send(JSON.stringify({ message: "Antecedente de higuiene no encontrado." }));
        }
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: error }));
    }
};

