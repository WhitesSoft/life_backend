const historialService = require('../services/historialService')

exports.getAll = async (req, res) => {
    try {
        const historiales = await historialService.getAllHistoriales();
        res.status(200).send(JSON.stringify(historiales));
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: "Error al obtener los historiales." }));
    }
};

exports.getById = async (req, res) => {
    try {
        const historial = await historialService.getHistorialById(req.params.id);
        if (historial) {
            res.status(200).send(JSON.stringify(historial));
        } else {
            res.status(404).send(JSON.stringify({ message: "Historial no encontrado." }));
        }
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: "Error al obtener el historial." }));
    }
};

exports.update = async (req, res) => {
    try {
        const historial = await historialService.updateHistorial(req.params.id, req.body);
        if (historial) {
            res.status(200).send(JSON.stringify("Historial modificado exitosamente"));
        } else {
            res.status(404).send(JSON.stringify({ message: "Historial no encontrado." }));
        }
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: "Error al actualizar el historial." }));
    }
};


exports.remove = async (req, res) => {
    try {
        const historial = await historialService.deleteHistorial(req.params.id);
        if (historial) {
            res.status(200).send(JSON.stringify({ message: "Historial eliminado correctamente" }));
        } else {
            res.status(404).send(JSON.stringify({ message: "No existe el historial" }));
        }
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: "Error al eliminar el historial." }));
    }
};