const db = require('../database/database')
const dbPaciente = db.paciente;
const dbHistorial = db.historial_clinico;
const dbConsulta = db.consulta

exports.createHistorialConsulta = async (id, data) => {

    // Verifica si el historial existe
    const historial = await dbHistorial.findByPk(id);

    if (!historial) {
        return null;
    }

    // verifico si el historial ya tiene una consulta asociada
    const existingConsulta = await dbConsulta.findOne({ where: { id_historial: id } });
    if (existingConsulta) {
        throw new Error('Ya existe una consulta asociada para este historial.');
    }

    // Pasamos nuestro id
    data.id_historial = id;

    return await dbConsulta.create(data);
}

exports.getHistorialConsultaById = async (id) => {
    return await dbConsulta.findOne({
        where: { id_historial: id }
    });
};

exports.updateHistorialConsulta = async (id, data) => {
    await dbConsulta.update(data, { where: { id_historial: id } });
    return await dbConsulta.findOne({ where: { id_historial: id } });
};

