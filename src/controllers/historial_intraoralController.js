const historialIntraoralService = require('../services/historial_intraoralService')

exports.create = async (req, res) => {
    try {
        const intraoral = await historialIntraoralService.createHistorialIntraoral(req.params.idHistorial, req.body);

        if (intraoral !== null) {
            res.status(201).send(JSON.stringify({ message: "Examen intraoral asociada con exito al historial!" }));
        } else {
            res.status(404).send(JSON.stringify({ message: "No existe el historial" }));
        }

    } catch (error) {
        if (error.message === 'Ya existe un examen intra oral asociada para este historial.') {
            res.status(400).send(JSON.stringify({ message: error.message }));
        } else {
            res.status(500).send(JSON.stringify({ message: "Error al asociar el examen intraoral al historial." }));
        }
    }
}

exports.getById = async (req, res) => {
    try {
        const intraoral = await historialIntraoralService.getHistorialIntraoralById(req.params.id);
        if (intraoral) {
            res.status(200).send(JSON.stringify(intraoral));
        } else {
            res.status(404).send(JSON.stringify({ message: "Examen intraoral no encontrado." }));
        }
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: error.error }));
    }
};

exports.update = async (req, res) => {
    try {
        const intraoral = await historialIntraoralService.updateIntraoral(req.params.id, req.body);
        if (intraoral) {
            res.status(200).send(JSON.stringify({ message: "Examen intraoral modificada exitosamente" }));
        } else {
            res.status(404).send(JSON.stringify({ message: "Examen intraoral no encontrado." }));
        }
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: error }));
    }
};

