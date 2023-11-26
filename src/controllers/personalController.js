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

exports.update = async (req, res) => {
    try {
        const personal = await personalService.updatePersonal(req.params.id, req.body);
        if (personal) {
            res.status(200).send(JSON.stringify("Personal modificado exitosamente"));
        } else {
            res.status(404).send(JSON.stringify({ message: "Personal no encontrado." }));
        }
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: "Error al actualizar el personal." }));
    }
}


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

exports.controlarAsistencia = async (req, res) => {
    try {
        const { fecha, estado_asistencia } = req.body;
        const idPersonal = req.params.idPersonal;
        const asistencia = await personalService.controlarAsistencia(idPersonal, fecha, estado_asistencia);
        if (asistencia) {
            res.status(200).send(JSON.stringify({message: "Asistencia agregada"}));
        } else {
            res.status(404).send(JSON.stringify({ message: "No existe el personal" }));
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.pagosPersonal = async (req, res) => {
    try {
        const pago = await personalService.pagosPersonal(req.params.idPersonal, req.body.motivo);
        if (pago) {
            res.status(200).send(JSON.stringify({message: "Pago realizado con exito"}));
        } else {
            res.status(404).send(JSON.stringify({ message: "No existe el personal" }));
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}