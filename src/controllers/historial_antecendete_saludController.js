const historialAntecedenteSaludService = require('../services/historial_antecedentes_saludService')

exports.create = async (req, res) => {
    try {
        const antecedente = await historialAntecedenteSaludService.createHistorialAntecedenteSalud(req.params.idHistorial, req.body);

        if (antecedente !== null) {
            res.status(201).send(JSON.stringify({ message: "Antecedente de Salud asociada con exito al historial!" }));
        } else {
            res.status(404).send(JSON.stringify({ message: "No existe el historial" }));
        }

    } catch (error) {
        if (error.message === 'Ya existe un antecedente de salud asociada para este historial.') {
            res.status(400).send(JSON.stringify({ message: error.message }));
        } else {
            res.status(500).send(JSON.stringify({ message: "Error al asociar el antecedente de Salud  al historial." }));
        }
    }
}

exports.getById = async (req, res) => {
    try {
        const antecedente = await historialAntecedenteSaludService.getHistorialAntecendeteById(req.params.id);
        if (antecedente) {
            res.status(200).send(JSON.stringify(antecedente));
        } else {
            res.status(404).send(JSON.stringify({ message: "Antecedente de Salud no encontrado." }));
        }
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: error.error }));
    }
};

exports.update = async (req, res) => {
    try {
        const antecedente = await historialAntecedenteSaludService.updateHistorialAntecedente(req.params.id, req.body);
        if (antecedente) {
            res.status(200).send(JSON.stringify({ message: "Antecedente de Salud modificada exitosamente" }));
        } else {
            res.status(404).send(JSON.stringify({ message: "Antecedente de Salud no encontrado." }));
        }
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: error }));
    }
};

