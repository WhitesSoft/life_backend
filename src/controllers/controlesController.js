const controlesService = require('../services/controlesService')

exports.getAllByHistorial = async (req, res) => {
    try {
        const controles = await controlesService.getAllControlesByHistorial(req.params.idHistorial);
        if(controles){
            res.status(200).send(JSON.stringify(controles));
        } else {
            res.status(500).send(JSON.stringify({ message: "El historial no existe." }));
        }
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: "Error al obtener los controles del historial." }));
    }
};

exports.getById = async (req, res) => {
    try {
        const control = await controlesService.getControlById(req.params.id);
        if (control) {
            res.status(200).send(JSON.stringify(control));
        } else {
            res.status(404).send(JSON.stringify({ message: "Control no encontrado." }));
        }
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: "Error al obtener el control." }));
    }
};

exports.update = async (req, res) => {
    try {
        const control = await controlesService.updateControl(req.params.id, req.body);
        if (control) {
            res.status(200).send(JSON.stringify("Control modificado exitosamente"));
        } else {
            res.status(404).send(JSON.stringify({ message: "Control no encontrado." }));
        }
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: error.message }));
    }
};


exports.remove = async (req, res) => {
    try {
        const control = await controlesService.deleteControl(req.params.id);
        if (control) {
            res.status(200).send(JSON.stringify({ message: "Control eliminado correctamente" }));
        } else {
            res.status(404).send(JSON.stringify({ message: "No existe el control" }));
        }
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: "Error al eliminar el historial." }));
    }
};
