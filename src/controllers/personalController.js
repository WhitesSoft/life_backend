const personalService = require('../services/personalService')

exports.createAsistente = async (req, res) => {
    try {
        const asistente = await personalService.registrarPersonalAsistente(req.body);
        res.status(200).send(JSON.stringify(asistente));
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: "Error al registrar personal asistente", error: error.message }));
    }
}

exports.createSecretaria = async (req, res) => {
    try {
        const secretaria = await personalService.registrarPersonalSecretaria(req.body);
        res.status(200).send(JSON.stringify(secretaria));
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: "Error al registrar personal secretaria", error: error.message }));
    }
}

exports.getAllPersonal = async (req, res) => {
    try {
        const personal = await personalService.getAllPersonal();
        res.status(200).send(JSON.stringify(personal));
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: "Error al obtener al personal." }));
    }
}

exports.getById = async (req, res) => {
    try {
        const personal = await personalService.getById(req.params.id);
        if (personal) {
            res.status(200).send(JSON.stringify(personal));
        } else {
            res.status(404).send(JSON.stringify({ message: "Personal no encontrado." }));
        }
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: "Error al obtener el personal." }));
    }
};


exports.remove = async (req, res) => {
    try {
        const personal = await personalService.deletePersonal(req.params.id);
        if (personal) {
            res.status(200).send(JSON.stringify("Personal eliminado correctamente"));
        } else {
            res.status(404).send(JSON.stringify("No existe el personal"));
        }
    } catch (error) {
        res.status(500).send(JSON.stringify("Error al eliminar al personal."));
    }
};